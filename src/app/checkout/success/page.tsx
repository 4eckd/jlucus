/**
 * Payment Success Page
 *
 * Shown after successful Stripe payment completion.
 * Displays confirmation and next steps.
 */

'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const paymentIntent = searchParams.get('payment_intent')

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Success Icon */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
            Payment Successful!
          </h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            Thank you for your payment
          </p>
        </div>

        {/* Confirmation Details */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Confirmation Details
          </h2>
          <div className="space-y-3">
            {email && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-gray-900">{email}</span>
              </div>
            )}
            {paymentIntent && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment ID</span>
                <span className="font-mono text-xs font-medium text-gray-900">
                  {paymentIntent}
                </span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p>
                  A receipt has been sent to <strong>{email || 'your email'}</strong>.
                  Please check your inbox.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-3 font-semibold text-blue-900">What's Next?</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Check your email for a payment receipt with invoice details
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Download your invoice from the receipt email
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              We'll be in touch shortly to discuss next steps
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="
              flex-1 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-center
              font-semibold text-white transition-all
              hover:bg-[var(--color-primary-hover)]
              focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2
            "
          >
            Return to Homepage
          </Link>
          <a
            href="mailto:contact@jlucus.dev"
            className="
              flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-center
              font-semibold text-gray-700 transition-all
              hover:bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
            "
          >
            Contact Support
          </a>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 space-y-4">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Frequently Asked Questions
          </h3>

          <details className="group rounded-lg border border-gray-200 bg-white p-4">
            <summary className="cursor-pointer font-medium text-gray-900">
              When will I receive my invoice?
            </summary>
            <p className="mt-2 text-sm text-gray-600">
              Your invoice has been automatically generated and emailed to you.
              It should arrive within a few minutes. If you don't see it, please
              check your spam folder.
            </p>
          </details>

          <details className="group rounded-lg border border-gray-200 bg-white p-4">
            <summary className="cursor-pointer font-medium text-gray-900">
              Can I get a refund?
            </summary>
            <p className="mt-2 text-sm text-gray-600">
              Refund requests are evaluated on a case-by-case basis. Please contact
              us at contact@jlucus.dev with your payment ID to discuss refund options.
            </p>
          </details>

          <details className="group rounded-lg border border-gray-200 bg-white p-4">
            <summary className="cursor-pointer font-medium text-gray-900">
              Is my payment information secure?
            </summary>
            <p className="mt-2 text-sm text-gray-600">
              Yes! All payments are processed securely through Stripe. We never store
              your card details on our servers. Stripe is PCI DSS Level 1 certified,
              the highest level of security in the payments industry.
            </p>
          </details>
        </div>
      </div>
    </div>
  )
}
