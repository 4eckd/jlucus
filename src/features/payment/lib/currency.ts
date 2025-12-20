/**
 * Currency Formatting and Calculation Utilities
 *
 * Provides type-safe currency formatting, conversion, and calculations
 * with proper decimal precision (no floating point errors).
 *
 * @module currency
 */

import { Currency, CurrencySymbol } from '../types/payment.types'

/**
 * Format amount in smallest currency unit (cents) to display string
 *
 * @param amountInCents - Amount in cents (e.g., 10000 for $100.00)
 * @param currency - Currency code
 * @param includeSymbol - Whether to include currency symbol (default: true)
 * @returns Formatted currency string
 *
 * @example
 * ```ts
 * formatCurrency(10000, Currency.USD) // "$100.00"
 * formatCurrency(10000, Currency.USD, false) // "100.00"
 * formatCurrency(12345, Currency.EUR) // "€123.45"
 * ```
 */
export function formatCurrency(
  amountInCents: number,
  currency: Currency,
  includeSymbol: boolean = true
): string {
  const amount = amountInCents / 100
  const symbol = includeSymbol ? CurrencySymbol[currency] : ''

  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)

  return includeSymbol ? `${symbol}${formatted}` : formatted
}

/**
 * Convert currency display string to cents
 *
 * @param displayAmount - Amount as decimal (e.g., "100.50")
 * @returns Amount in cents (e.g., 10050)
 *
 * @example
 * ```ts
 * toCents("100.50") // 10050
 * toCents("1.23") // 123
 * toCents("0.99") // 99
 * ```
 */
export function toCents(displayAmount: string | number): number {
  const amount = typeof displayAmount === 'string'
    ? parseFloat(displayAmount)
    : displayAmount

  if (isNaN(amount)) {
    throw new Error('Invalid amount format')
  }

  return Math.round(amount * 100)
}

/**
 * Convert cents to decimal amount
 *
 * @param amountInCents - Amount in cents
 * @returns Amount as decimal number
 *
 * @example
 * ```ts
 * fromCents(10050) // 100.50
 * fromCents(123) // 1.23
 * ```
 */
export function fromCents(amountInCents: number): number {
  return amountInCents / 100
}

/**
 * Validate amount is positive and within reasonable bounds
 *
 * @param amountInCents - Amount to validate
 * @param minAmount - Minimum allowed amount in cents (default: 50 = $0.50)
 * @param maxAmount - Maximum allowed amount in cents (default: 100000000 = $1,000,000)
 * @returns True if valid
 * @throws Error if invalid
 */
export function validateAmount(
  amountInCents: number,
  minAmount: number = 50,
  maxAmount: number = 100000000
): boolean {
  if (!Number.isInteger(amountInCents)) {
    throw new Error('Amount must be an integer (cents)')
  }

  if (amountInCents < minAmount) {
    throw new Error(
      `Amount too small. Minimum is ${formatCurrency(minAmount, Currency.USD)}`
    )
  }

  if (amountInCents > maxAmount) {
    throw new Error(
      `Amount too large. Maximum is ${formatCurrency(maxAmount, Currency.USD)}`
    )
  }

  return true
}

/**
 * Calculate tax amount
 *
 * @param amountInCents - Subtotal in cents
 * @param taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @returns Tax amount in cents
 *
 * @example
 * ```ts
 * calculateTax(10000, 0.08) // 800 ($8.00 tax on $100.00)
 * calculateTax(5000, 0.10) // 500 ($5.00 tax on $50.00)
 * ```
 */
export function calculateTax(amountInCents: number, taxRate: number): number {
  return Math.round(amountInCents * taxRate)
}

/**
 * Calculate total with tax
 *
 * @param subtotalInCents - Subtotal before tax
 * @param taxRate - Tax rate as decimal
 * @returns Total amount in cents
 *
 * @example
 * ```ts
 * calculateTotal(10000, 0.08) // 10800 ($108.00 total)
 * ```
 */
export function calculateTotal(
  subtotalInCents: number,
  taxRate: number = 0
): number {
  const tax = calculateTax(subtotalInCents, taxRate)
  return subtotalInCents + tax
}

/**
 * Get currency symbol
 *
 * @param currency - Currency code
 * @returns Currency symbol
 *
 * @example
 * ```ts
 * getCurrencySymbol(Currency.USD) // "$"
 * getCurrencySymbol(Currency.EUR) // "€"
 * ```
 */
export function getCurrencySymbol(currency: Currency): string {
  return CurrencySymbol[currency]
}

/**
 * Validate currency is supported
 *
 * @param currency - Currency code to validate
 * @returns True if supported
 * @throws Error if unsupported
 */
export function validateCurrency(currency: string): currency is Currency {
  const supportedCurrencies = Object.values(Currency)

  if (!supportedCurrencies.includes(currency as Currency)) {
    throw new Error(
      `Unsupported currency: ${currency}. Supported: ${supportedCurrencies.join(', ')}`
    )
  }

  return true
}

/**
 * Format currency for API (Stripe, PayPal)
 * Some APIs use cents, others use decimal amounts
 *
 * @param amountInCents - Amount in cents
 * @param format - API format ('cents' or 'decimal')
 * @returns Formatted amount for API
 *
 * @example
 * ```ts
 * formatForAPI(10000, 'cents') // 10000 (Stripe format)
 * formatForAPI(10000, 'decimal') // "100.00" (PayPal format)
 * ```
 */
export function formatForAPI(
  amountInCents: number,
  format: 'cents' | 'decimal'
): number | string {
  if (format === 'cents') {
    return amountInCents
  }

  return fromCents(amountInCents).toFixed(2)
}

/**
 * Parse amount from API response
 *
 * @param amount - Amount from API (cents or decimal string)
 * @returns Amount in cents
 *
 * @example
 * ```ts
 * parseFromAPI(10000) // 10000
 * parseFromAPI("100.00") // 10000
 * parseFromAPI("100.50") // 10050
 * ```
 */
export function parseFromAPI(amount: number | string): number {
  if (typeof amount === 'number') {
    return amount
  }

  return toCents(amount)
}

/**
 * Create invoice number
 * Format: INV-YYYYMMDD-XXXXX
 *
 * @returns Unique invoice number
 *
 * @example
 * ```ts
 * generateInvoiceNumber() // "INV-20251026-A1B2C"
 * ```
 */
export function generateInvoiceNumber(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  // Generate random 5-character alphanumeric suffix
  const suffix = Math.random().toString(36).substring(2, 7).toUpperCase()

  return `INV-${year}${month}${day}-${suffix}`
}

/**
 * Format payment method for display
 *
 * @param brand - Card brand (e.g., "visa", "mastercard")
 * @param last4 - Last 4 digits of card
 * @returns Formatted payment method string
 *
 * @example
 * ```ts
 * formatPaymentMethod("visa", "4242") // "Visa ****4242"
 * formatPaymentMethod("mastercard", "5555") // "Mastercard ****5555"
 * ```
 */
export function formatPaymentMethod(brand: string, last4: string): string {
  const brandName = brand.charAt(0).toUpperCase() + brand.slice(1)
  return `${brandName} ****${last4}`
}
