/**
 * Payment Validation Schemas
 *
 * Zod schemas for validating payment requests, checkout forms,
 * and API inputs with type-safe error messages.
 *
 * @module validation
 */

import { z } from 'zod'
import { Currency, PaymentProvider, PaymentStatus } from '../types/payment.types'

/**
 * Billing address validation schema
 */
export const billingAddressSchema = z.object({
  line1: z.string().min(1, 'Address line 1 is required').max(100),
  line2: z.string().max(100).optional(),
  city: z.string().min(1, 'City is required').max(50),
  state: z.string().max(50).optional(),
  postalCode: z.string().min(1, 'Postal code is required').max(20),
  country: z.string().length(2, 'Country must be 2-letter code (e.g., US)'),
})

/**
 * Email validation
 */
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email address')
  .max(254, 'Email too long')

/**
 * Payment amount validation (in cents)
 */
export const amountSchema = z
  .number()
  .int('Amount must be an integer (cents)')
  .positive('Amount must be positive')
  .min(50, 'Minimum amount is $0.50')
  .max(100000000, 'Maximum amount is $1,000,000')

/**
 * Currency validation
 */
export const currencySchema = z.nativeEnum(Currency, {
  errorMap: () => ({ message: 'Invalid currency' }),
})

/**
 * Payment provider validation
 */
export const paymentProviderSchema = z.nativeEnum(PaymentProvider, {
  errorMap: () => ({ message: 'Invalid payment provider' }),
})

/**
 * Create payment request validation
 */
export const createPaymentRequestSchema = z.object({
  amount: amountSchema,
  currency: currencySchema,
  description: z.string().max(500).optional(),
  customerEmail: emailSchema,
  customerName: z.string().min(1).max(100).optional(),
  metadata: z.record(z.unknown()).optional(),
})

/**
 * Checkout form validation
 */
export const checkoutFormSchema = z.object({
  email: emailSchema,
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  billingAddress: billingAddressSchema,
  currency: currencySchema,
  provider: paymentProviderSchema,
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
})

/**
 * Payment confirmation validation
 */
export const paymentConfirmationSchema = z.object({
  paymentId: z.string().cuid('Invalid payment ID'),
  provider: paymentProviderSchema,
  providerPaymentId: z.string().min(1, 'Provider payment ID required'),
})

/**
 * Webhook signature validation
 */
export const webhookSignatureSchema = z.object({
  signature: z.string().min(1, 'Webhook signature required'),
  timestamp: z.number().positive(),
})

/**
 * Invoice number validation
 */
export const invoiceNumberSchema = z
  .string()
  .regex(/^INV-\d{8}-[A-Z0-9]{5}$/, 'Invalid invoice number format')

/**
 * Payment status validation
 */
export const paymentStatusSchema = z.nativeEnum(PaymentStatus)

/**
 * Helper: Validate payment amount
 */
export function validatePaymentAmount(amount: number): {
  valid: boolean
  error?: string
} {
  try {
    amountSchema.parse(amount)
    return { valid: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.errors[0]?.message }
    }
    return { valid: false, error: 'Invalid amount' }
  }
}

/**
 * Helper: Validate email
 */
export function validateEmail(email: string): {
  valid: boolean
  error?: string
} {
  try {
    emailSchema.parse(email)
    return { valid: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.errors[0]?.message }
    }
    return { valid: false, error: 'Invalid email' }
  }
}

/**
 * Helper: Validate currency
 */
export function validateCurrency(currency: string): {
  valid: boolean
  error?: string
} {
  try {
    currencySchema.parse(currency)
    return { valid: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.errors[0]?.message }
    }
    return { valid: false, error: 'Invalid currency' }
  }
}

/**
 * Helper: Sanitize metadata (remove sensitive data)
 */
export function sanitizeMetadata(
  metadata: Record<string, unknown>
): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {}
  const blockedKeys = ['password', 'secret', 'token', 'key', 'apiKey']

  for (const [key, value] of Object.entries(metadata)) {
    const lowerKey = key.toLowerCase()
    const isBlocked = blockedKeys.some((blocked) => lowerKey.includes(blocked))

    if (!isBlocked) {
      sanitized[key] = value
    }
  }

  return sanitized
}

/**
 * Type exports for validated data
 */
export type BillingAddress = z.infer<typeof billingAddressSchema>
export type CreatePaymentRequest = z.infer<typeof createPaymentRequestSchema>
export type CheckoutForm = z.infer<typeof checkoutFormSchema>
export type PaymentConfirmation = z.infer<typeof paymentConfirmationSchema>
