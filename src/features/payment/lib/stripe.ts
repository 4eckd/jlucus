/**
 * Stripe Payment Gateway Utilities
 *
 * Server-side and client-side Stripe integration helpers
 * for payment processing, webhook handling, and error management.
 *
 * @module stripe
 */

import Stripe from 'stripe'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import {
  PaymentStatus,
  PaymentProvider,
  Currency,
  PaymentError,
  PaymentErrorCode,
} from '../types/payment.types'

/**
 * Initialize Stripe client (server-side)
 * Use this only in API routes or server components
 */
export function getStripeClient(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    throw new Error(
      'STRIPE_SECRET_KEY is not configured. Please add it to your .env file.'
    )
  }

  return new Stripe(secretKey, {
    apiVersion: '2024-12-18.acacia',
    typescript: true,
  })
}

/**
 * Initialize Stripe.js (client-side)
 * Use this in React components
 */
let stripePromise: ReturnType<typeof loadStripe> | null = null

export function getStripeJs() {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

    if (!publishableKey) {
      throw new Error(
        'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not configured. Please add it to your .env file.'
      )
    }

    stripePromise = loadStripe(publishableKey)
  }

  return stripePromise
}

/**
 * Create Stripe Elements options with theme
 */
export function getStripeElementsOptions(
  amount: number,
  currency: Currency
): StripeElementsOptions {
  return {
    mode: 'payment',
    amount,
    currency: currency.toLowerCase(),
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#10b981', // Green primary color (matches portfolio theme)
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: 'var(--font-roboto), system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
      rules: {
        '.Input': {
          border: '1px solid #e5e7eb',
          boxShadow: 'none',
        },
        '.Input:focus': {
          border: '1px solid #10b981',
          boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
        },
        '.Label': {
          fontSize: '14px',
          fontWeight: '500',
          marginBottom: '8px',
        },
      },
    },
  }
}

/**
 * Create a payment intent on Stripe
 */
export async function createStripePaymentIntent(params: {
  amount: number
  currency: Currency
  customerEmail: string
  description?: string
  metadata?: Record<string, string>
}): Promise<Stripe.PaymentIntent> {
  const stripe = getStripeClient()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: params.amount,
    currency: params.currency.toLowerCase(),
    receipt_email: params.customerEmail,
    description: params.description,
    metadata: {
      ...params.metadata,
      customerEmail: params.customerEmail,
    },
    automatic_payment_methods: {
      enabled: true,
    },
  })

  return paymentIntent
}

/**
 * Retrieve a payment intent from Stripe
 */
export async function retrieveStripePaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent> {
  const stripe = getStripeClient()
  return await stripe.paymentIntents.retrieve(paymentIntentId)
}

/**
 * Confirm a payment intent (server-side confirmation)
 */
export async function confirmStripePaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent> {
  const stripe = getStripeClient()
  return await stripe.paymentIntents.confirm(paymentIntentId)
}

/**
 * Verify Stripe webhook signature
 * CRITICAL: Always verify signatures to prevent webhook spoofing
 */
export function verifyStripeWebhook(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const stripe = getStripeClient()
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    throw new Error(
      'STRIPE_WEBHOOK_SECRET is not configured. Webhooks cannot be verified.'
    )
  }

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    )
    return event
  } catch (error) {
    throw new Error(
      `Webhook signature verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Map Stripe payment intent status to our PaymentStatus enum
 */
export function mapStripeStatusToPaymentStatus(
  stripeStatus: Stripe.PaymentIntent.Status
): PaymentStatus {
  switch (stripeStatus) {
    case 'requires_payment_method':
    case 'requires_confirmation':
    case 'requires_action':
      return PaymentStatus.PENDING

    case 'processing':
      return PaymentStatus.PROCESSING

    case 'succeeded':
      return PaymentStatus.SUCCEEDED

    case 'canceled':
      return PaymentStatus.CANCELED

    case 'requires_capture':
      return PaymentStatus.PROCESSING

    default:
      return PaymentStatus.FAILED
  }
}

/**
 * Handle Stripe error and convert to user-friendly PaymentError
 */
export function handleStripeError(error: unknown): PaymentError {
  if (error instanceof Stripe.errors.StripeError) {
    switch (error.type) {
      case 'StripeCardError':
        return {
          code: PaymentErrorCode.CARD_DECLINED,
          message: error.message || 'Your card was declined. Please try another payment method.',
          details: error.code,
          retryable: true,
        }

      case 'StripeInvalidRequestError':
        return {
          code: PaymentErrorCode.INVALID_AMOUNT,
          message: 'Invalid payment request. Please check the payment details.',
          details: error.message,
          retryable: false,
        }

      case 'StripeAPIError':
      case 'StripeConnectionError':
        return {
          code: PaymentErrorCode.NETWORK_ERROR,
          message: 'Network error. Please check your connection and try again.',
          details: error.message,
          retryable: true,
        }

      case 'StripeRateLimitError':
        return {
          code: PaymentErrorCode.RATE_LIMIT_EXCEEDED,
          message: 'Too many requests. Please wait a moment and try again.',
          details: error.message,
          retryable: true,
        }

      default:
        return {
          code: PaymentErrorCode.PROCESSING_ERROR,
          message: error.message || 'Payment processing error. Please try again.',
          details: error.type,
          retryable: true,
        }
    }
  }

  // Unknown error
  return {
    code: PaymentErrorCode.UNKNOWN_ERROR,
    message: 'An unexpected error occurred. Please try again.',
    details: error instanceof Error ? error.message : 'Unknown error',
    retryable: true,
  }
}

/**
 * Format card brand for display
 */
export function formatCardBrand(brand: string): string {
  const brandMap: Record<string, string> = {
    visa: 'Visa',
    mastercard: 'Mastercard',
    amex: 'American Express',
    discover: 'Discover',
    diners: 'Diners Club',
    jcb: 'JCB',
    unionpay: 'UnionPay',
  }

  return brandMap[brand.toLowerCase()] || brand.charAt(0).toUpperCase() + brand.slice(1)
}

/**
 * Extract payment method details from payment intent
 */
export function extractPaymentMethodDetails(
  paymentIntent: Stripe.PaymentIntent
): {
  brand: string
  last4: string
  formatted: string
} | null {
  const paymentMethod = paymentIntent.payment_method

  if (
    typeof paymentMethod === 'object' &&
    paymentMethod !== null &&
    'card' in paymentMethod
  ) {
    const card = paymentMethod.card
    if (card) {
      return {
        brand: card.brand || 'card',
        last4: card.last4 || '0000',
        formatted: `${formatCardBrand(card.brand || 'card')} ****${card.last4 || '0000'}`,
      }
    }
  }

  return null
}

/**
 * Check if Stripe is configured
 */
export function isStripeConfigured(): boolean {
  return !!(
    process.env.STRIPE_SECRET_KEY &&
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  )
}

/**
 * Get Stripe environment mode (test or live)
 */
export function getStripeMode(): 'test' | 'live' {
  const secretKey = process.env.STRIPE_SECRET_KEY
  return secretKey?.startsWith('sk_test_') ? 'test' : 'live'
}

/**
 * Stripe webhook event types we handle
 */
export const STRIPE_WEBHOOK_EVENTS = {
  PAYMENT_INTENT_SUCCEEDED: 'payment_intent.succeeded',
  PAYMENT_INTENT_FAILED: 'payment_intent.payment_failed',
  PAYMENT_INTENT_CANCELED: 'payment_intent.canceled',
  PAYMENT_INTENT_PROCESSING: 'payment_intent.processing',
} as const

/**
 * Type guard for Stripe PaymentIntent events
 */
export function isPaymentIntentEvent(
  event: Stripe.Event
): event is Stripe.Event & { data: { object: Stripe.PaymentIntent } } {
  return event.type.startsWith('payment_intent.')
}
