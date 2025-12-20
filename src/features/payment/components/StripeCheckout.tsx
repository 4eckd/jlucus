/**
 * StripeCheckout Component
 *
 * Renders Stripe Elements Payment Element with form validation
 * and payment confirmation handling.
 */

'use client'

import { useState, FormEvent } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useStripePayment } from '../hooks/useStripePayment'

interface StripeCheckoutProps {
  /** Amount in cents */
  amount: number
  /** Currency code */
  currency: string
  /** Customer email */
  customerEmail: string
  /** Callback on successful payment */
  onSuccess?: (paymentId: string) => void
  /** Callback on payment error */
  onError?: (error: string) => void
}

export function StripeCheckout({
  amount,
  currency,
  customerEmail,
  onSuccess,
  onError,
}: StripeCheckoutProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { confirmPayment, isConfirming, error } = useStripePayment()

  const [paymentError, setPaymentError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      setPaymentError('Payment system not ready. Please wait...')
      return
    }

    setPaymentError(null)

    // Get return URL for success redirect
    const returnUrl = `${window.location.origin}/checkout/success?email=${encodeURIComponent(customerEmail)}`

    const result = await confirmPayment(returnUrl)

    if (result.success) {
      onSuccess?.(customerEmail)
    } else if (result.error) {
      setPaymentError(result.error)
      onError?.(result.error)
    }
  }

  const displayError = paymentError || error?.message

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Stripe Payment Element */}
      <div className="rounded-lg border border-gray-200 p-4">
        <PaymentElement
          options={{
            layout: 'tabs',
            fields: {
              billingDetails: {
                email: 'never', // Email already collected
                address: {
                  country: 'auto',
                },
              },
            },
          }}
        />
      </div>

      {/* Error Message */}
      {displayError && (
        <div
          className="rounded-lg bg-red-50 p-4 text-sm text-red-800"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <svg
              className="h-5 w-5 flex-shrink-0 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="font-medium">Payment Error</p>
              <p className="mt-1">{displayError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isConfirming}
        className="
          w-full rounded-lg bg-[var(--color-primary)] px-6 py-3
          font-semibold text-white transition-all
          hover:bg-[var(--color-primary-hover)]
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50
        "
        aria-busy={isConfirming}
      >
        {isConfirming ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing Payment...
          </span>
        ) : (
          `Pay ${new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency.toUpperCase(),
          }).format(amount / 100)}`
        )}
      </button>

      {/* Security Notice */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span>Secure payment powered by Stripe</span>
      </div>
    </form>
  )
}
