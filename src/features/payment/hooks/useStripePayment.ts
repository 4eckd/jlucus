/**
 * useStripePayment Hook
 *
 * React hook for managing Stripe payment flow:
 * 1. Create payment intent
 * 2. Confirm payment with Stripe Elements
 * 3. Handle errors and loading states
 */

'use client'

import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { Currency, PaymentError, PaymentErrorCode } from '../types/payment.types'

interface CreatePaymentParams {
  amount: number
  currency: Currency
  customerEmail: string
  customerName?: string
  description?: string
}

interface UseStripePaymentReturn {
  createPayment: (params: CreatePaymentParams) => Promise<{
    paymentId: string
    clientSecret: string
    invoiceNumber: string
  } | null>
  confirmPayment: (returnUrl: string) => Promise<{ success: boolean; error?: string }>
  isCreating: boolean
  isConfirming: boolean
  error: PaymentError | null
  clearError: () => void
}

export function useStripePayment(): UseStripePaymentReturn {
  const stripe = useStripe()
  const elements = useElements()

  const [isCreating, setIsCreating] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [error, setError] = useState<PaymentError | null>(null)

  /**
   * Step 1: Create payment intent on server
   */
  const createPayment = async (
    params: CreatePaymentParams
  ): Promise<{ paymentId: string; clientSecret: string; invoiceNumber: string } | null> => {
    setIsCreating(true)
    setError(null)

    try {
      const response = await fetch('/api/payment/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      const data = await response.json()

      if (!response.ok) {
        setError({
          code: data.code || PaymentErrorCode.PROCESSING_ERROR,
          message: data.error || 'Failed to create payment',
          retryable: data.retryable !== false,
        })
        return null
      }

      return {
        paymentId: data.paymentId,
        clientSecret: data.clientSecret,
        invoiceNumber: data.invoiceNumber,
      }

    } catch (err) {
      setError({
        code: PaymentErrorCode.NETWORK_ERROR,
        message: 'Network error. Please check your connection and try again.',
        retryable: true,
      })
      return null

    } finally {
      setIsCreating(false)
    }
  }

  /**
   * Step 2: Confirm payment with Stripe Elements
   */
  const confirmPayment = async (
    returnUrl: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!stripe || !elements) {
      setError({
        code: PaymentErrorCode.PROCESSING_ERROR,
        message: 'Payment system not loaded. Please refresh the page.',
        retryable: true,
      })
      return { success: false, error: 'Stripe not loaded' }
    }

    setIsConfirming(true)
    setError(null)

    try {
      // Submit the payment elements to Stripe
      const { error: submitError } = await elements.submit()

      if (submitError) {
        setError({
          code: PaymentErrorCode.INVALID_CARD,
          message: submitError.message || 'Invalid payment details',
          retryable: true,
        })
        return { success: false, error: submitError.message }
      }

      // Confirm the payment
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
      })

      if (confirmError) {
        // Payment failed
        const paymentError: PaymentError = {
          code: mapStripeErrorToCode(confirmError.type),
          message: confirmError.message || 'Payment failed',
          details: confirmError.code,
          retryable: confirmError.type !== 'validation_error',
        }

        setError(paymentError)
        return { success: false, error: confirmError.message }
      }

      // Payment succeeded (will redirect to return_url)
      return { success: true }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'

      setError({
        code: PaymentErrorCode.UNKNOWN_ERROR,
        message: 'An unexpected error occurred. Please try again.',
        details: errorMessage,
        retryable: true,
      })

      return { success: false, error: errorMessage }

    } finally {
      setIsConfirming(false)
    }
  }

  const clearError = () => setError(null)

  return {
    createPayment,
    confirmPayment,
    isCreating,
    isConfirming,
    error,
    clearError,
  }
}

/**
 * Map Stripe error type to our PaymentErrorCode
 */
function mapStripeErrorToCode(errorType: string): PaymentErrorCode {
  switch (errorType) {
    case 'card_error':
      return PaymentErrorCode.CARD_DECLINED
    case 'validation_error':
      return PaymentErrorCode.INVALID_CARD
    case 'api_connection_error':
    case 'api_error':
      return PaymentErrorCode.NETWORK_ERROR
    case 'rate_limit_error':
      return PaymentErrorCode.RATE_LIMIT_EXCEEDED
    default:
      return PaymentErrorCode.PROCESSING_ERROR
  }
}
