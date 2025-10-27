/**
 * Payment Gateway Type Definitions
 *
 * Supports Stripe and PayPal payment integrations with multi-currency support,
 * invoice generation, and email receipts.
 *
 * @module payment.types
 */

/**
 * Payment processing status
 */
export enum PaymentStatus {
  /** Payment intent created, awaiting processing */
  PENDING = 'PENDING',
  /** Payment is being processed by provider */
  PROCESSING = 'PROCESSING',
  /** Payment completed successfully */
  SUCCEEDED = 'SUCCEEDED',
  /** Payment failed (declined card, insufficient funds, etc.) */
  FAILED = 'FAILED',
  /** Payment canceled by user */
  CANCELED = 'CANCELED',
  /** Payment refunded (full or partial) */
  REFUNDED = 'REFUNDED',
}

/**
 * Payment gateway provider
 */
export enum PaymentProvider {
  /** Stripe card payments (supports 3D Secure) */
  STRIPE = 'STRIPE',
  /** PayPal checkout */
  PAYPAL = 'PAYPAL',
}

/**
 * Supported currencies
 */
export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CAD = 'CAD',
}

/**
 * Currency display symbols
 */
export const CurrencySymbol: Record<Currency, string> = {
  [Currency.USD]: '$',
  [Currency.EUR]: '€',
  [Currency.GBP]: '£',
  [Currency.CAD]: 'CA$',
}

/**
 * Customer billing address
 */
export interface BillingAddress {
  /** Address line 1 (required) */
  line1: string
  /** Address line 2 (optional - apt, suite, etc.) */
  line2?: string
  /** City */
  city: string
  /** State/Province (optional) */
  state?: string
  /** Postal/ZIP code */
  postalCode: string
  /** ISO country code (e.g., 'US', 'GB') */
  country: string
}

/**
 * Payment customer information
 */
export interface PaymentCustomer {
  /** Customer email (required for receipt) */
  email: string
  /** Customer full name (optional) */
  name?: string
  /** Billing address (optional, but recommended) */
  billingAddress?: BillingAddress
}

/**
 * Payment intent creation request
 */
export interface CreatePaymentRequest {
  /** Amount in smallest currency unit (cents for USD, pence for GBP) */
  amount: number
  /** Currency code */
  currency: Currency
  /** Payment description (shown on invoice) */
  description?: string
  /** Customer email address */
  customerEmail: string
  /** Customer name (optional) */
  customerName?: string
  /** Custom metadata (e.g., service type, project ID) */
  metadata?: Record<string, unknown>
}

/**
 * Stripe payment intent response
 */
export interface StripePaymentIntent {
  /** Payment record ID from database */
  id: string
  /** Stripe PaymentIntent client secret (for frontend) */
  clientSecret: string
  /** Amount in cents */
  amount: number
  /** Currency code */
  currency: Currency
  /** Current status */
  status: PaymentStatus
}

/**
 * PayPal order response
 */
export interface PayPalOrderResponse {
  /** Payment record ID from database */
  id: string
  /** PayPal order ID */
  orderId: string
  /** Amount in currency units (e.g., 100.00 for $100) */
  amount: number
  /** Currency code */
  currency: Currency
  /** Current status */
  status: PaymentStatus
}

/**
 * Complete payment record from database
 */
export interface PaymentRecord {
  /** Unique payment ID (CUID) */
  id: string

  /** Payment details */
  amount: number
  currency: string
  status: PaymentStatus
  provider: PaymentProvider

  /** Provider-specific IDs */
  stripePaymentId?: string | null
  paypalOrderId?: string | null

  /** Customer information */
  customerEmail: string
  customerName?: string | null
  billingAddress?: BillingAddress | null

  /** Invoice */
  invoiceNumber: string
  invoiceUrl?: string | null

  /** Additional info */
  description?: string | null
  metadata?: Record<string, unknown> | null

  /** Timestamps */
  createdAt: Date
  updatedAt: Date
  completedAt?: Date | null
}

/**
 * Payment confirmation result
 */
export interface PaymentConfirmation {
  /** Payment record ID */
  paymentId: string
  /** Payment status */
  status: PaymentStatus
  /** Invoice number */
  invoiceNumber: string
  /** Invoice download URL */
  invoiceUrl?: string
  /** Customer email (for display) */
  customerEmail: string
  /** Amount paid */
  amount: number
  /** Currency */
  currency: Currency
  /** Completion timestamp */
  completedAt?: Date
}

/**
 * Stripe webhook event payload
 */
export interface StripeWebhookEvent {
  /** Event type (e.g., 'payment_intent.succeeded') */
  type: string
  /** Event data */
  data: {
    object: {
      id: string
      amount: number
      currency: string
      status: string
      metadata?: Record<string, string>
    }
  }
}

/**
 * Invoice generation data
 */
export interface InvoiceData {
  /** Invoice number (auto-generated) */
  invoiceNumber: string
  /** Payment ID reference */
  paymentId: string
  /** Issue date */
  date: Date

  /** Customer details */
  customerName: string
  customerEmail: string
  billingAddress?: BillingAddress

  /** Line items */
  items: InvoiceLineItem[]

  /** Financial totals */
  subtotal: number
  tax?: number
  total: number
  currency: Currency

  /** Payment info */
  paymentMethod: string // e.g., "Visa ending in 4242"
  paymentStatus: PaymentStatus
  paidDate?: Date
}

/**
 * Invoice line item
 */
export interface InvoiceLineItem {
  /** Item description */
  description: string
  /** Quantity */
  quantity: number
  /** Unit price in currency units */
  unitPrice: number
  /** Total (quantity * unitPrice) */
  total: number
}

/**
 * Email receipt data
 */
export interface EmailReceiptData {
  /** Recipient email */
  to: string
  /** Customer name */
  customerName: string
  /** Invoice number */
  invoiceNumber: string
  /** Amount paid */
  amount: number
  /** Currency */
  currency: Currency
  /** Payment date */
  date: Date
  /** Invoice download URL */
  invoiceUrl: string
  /** Payment method (e.g., "Visa ****4242") */
  paymentMethod: string
}

/**
 * Payment error codes
 */
export enum PaymentErrorCode {
  /** Card declined */
  CARD_DECLINED = 'CARD_DECLINED',
  /** Insufficient funds */
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  /** Invalid card details */
  INVALID_CARD = 'INVALID_CARD',
  /** Payment processing error */
  PROCESSING_ERROR = 'PROCESSING_ERROR',
  /** Network/connection error */
  NETWORK_ERROR = 'NETWORK_ERROR',
  /** Invalid amount */
  INVALID_AMOUNT = 'INVALID_AMOUNT',
  /** Unsupported currency */
  UNSUPPORTED_CURRENCY = 'UNSUPPORTED_CURRENCY',
  /** Rate limit exceeded */
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  /** Unknown error */
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Payment error with user-friendly message
 */
export interface PaymentError {
  /** Error code */
  code: PaymentErrorCode
  /** User-facing error message */
  message: string
  /** Technical details (for logging) */
  details?: string
  /** Retry allowed */
  retryable: boolean
}

/**
 * Checkout form data
 */
export interface CheckoutFormData {
  /** Customer email */
  email: string
  /** Customer name */
  name: string
  /** Billing address */
  billingAddress: BillingAddress
  /** Selected currency */
  currency: Currency
  /** Payment provider (Stripe or PayPal) */
  provider: PaymentProvider
  /** Agree to terms */
  agreedToTerms: boolean
}

/**
 * Currency conversion rate (future enhancement)
 */
export interface CurrencyRate {
  /** Base currency */
  from: Currency
  /** Target currency */
  to: Currency
  /** Exchange rate */
  rate: number
  /** Last updated */
  updatedAt: Date
}
