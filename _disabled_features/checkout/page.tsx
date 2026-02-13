/**
 * Checkout Page
 *
 * Main checkout page with Stripe Elements integration.
 * Supports configurable amount and currency via URL params.
 */

'use client'

import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { useSearchParams } from 'next/navigation'
import { getStripeJs, getStripeElementsOptions } from '@/features/payment/lib/stripe'
import { StripeCheckout } from '@/features/payment/components/StripeCheckout'
import { useStripePayment } from '@/features/payment/hooks/useStripePayment'
import { Currency } from '@/features/payment/types/payment.types'
import { formatCurrency } from '@/features/payment/lib/currency'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const { createPayment, isCreating } = useStripePayment()

  // Get params from URL or use defaults
  const amount = parseInt(searchParams.get('amount') || '10000') // Default: $100.00
  const currency = (searchParams.get('currency') || 'USD') as Currency
  const description = searchParams.get('description') || 'Service Payment'

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentId, setPaymentId] = useState<string | null>(null)
  const [invoiceNumber, setInvoiceNumber] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<'details' | 'payment'>('details')

  const stripePromise = getStripeJs()

  // Handle customer details submission
  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !name) {
      setError('Please provide your email and name.')
      return
    }

    // Create payment intent
    const result = await createPayment({
      amount,
      currency,
      customerEmail: email,
      customerName: name,
      description,
    })

    if (result) {
      setClientSecret(result.clientSecret)
      setPaymentId(result.paymentId)
      setInvoiceNumber(result.invoiceNumber)
      setStep('payment')
    } else {
      setError('Failed to initialize payment. Please try again.')
    }
  }

  const handlePaymentSuccess = () => {
    // Success handling is done by Stripe redirect
    console.log('Payment initiated successfully')
  }

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage)
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
            Checkout
          </h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            Secure payment powered by Stripe
          </p>
        </div>

        {/* Order Summary */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Order Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Description</span>
              <span className="font-medium text-gray-900">{description}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Amount</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(amount, currency)}
              </span>
            </div>
            {invoiceNumber && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Invoice Number</span>
                <span className="font-mono text-xs font-medium text-gray-900">
                  {invoiceNumber}
                </span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-[var(--color-primary)]">
                  {formatCurrency(amount, currency)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800"
            role="alert"
          >
            <p className="font-medium">Error</p>
            <p className="mt-1">{error}</p>
          </div>
        )}

        {/* Step 1: Customer Details */}
        {step === 'details' && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Customer Details
            </h2>
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2
                    focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20
                  "
                  placeholder="you@example.com"
                />
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="
                    mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2
                    focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20
                  "
                  placeholder="John Doe"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isCreating}
                className="
                  w-full rounded-lg bg-[var(--color-primary)] px-6 py-3
                  font-semibold text-white transition-all
                  hover:bg-[var(--color-primary-hover)]
                  focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
                  disabled:cursor-not-allowed disabled:opacity-50
                "
              >
                {isCreating ? 'Processing...' : 'Continue to Payment'}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 'payment' && clientSecret && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Payment Details
            </h2>
            <Elements
              stripe={stripePromise}
              options={getStripeElementsOptions(amount, currency)}
            >
              <StripeCheckout
                amount={amount}
                currency={currency}
                customerEmail={email}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </Elements>
          </div>
        )}

        {/* Test Card Info (only in test mode) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
            <p className="font-medium">Test Mode - Use these test cards:</p>
            <ul className="mt-2 space-y-1 font-mono text-xs">
              <li>✅ Success: 4242 4242 4242 4242</li>
              <li>🔒 3D Secure: 4000 0025 0000 3155</li>
              <li>❌ Declined: 4000 0000 0000 9995</li>
              <li>Any future expiry (e.g., 12/34), any 3-digit CVC</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
