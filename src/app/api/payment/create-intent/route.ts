/**
 * POST /api/payment/create-intent
 *
 * Creates a Stripe PaymentIntent and stores the payment record in the database.
 * Returns the client secret for frontend to complete payment.
 */

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { createStripePaymentIntent, handleStripeError } from '@/features/payment/lib/stripe'
import { createPaymentRequestSchema } from '@/features/payment/lib/validation'
import { generateInvoiceNumber } from '@/features/payment/lib/currency'
import { PaymentStatus, PaymentProvider } from '@/features/payment/types/payment.types'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()

    const validationResult = createPaymentRequestSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid request',
          details: validationResult.error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      )
    }

    const { amount, currency, customerEmail, customerName, description, metadata } = validationResult.data

    // Generate unique invoice number
    const invoiceNumber = generateInvoiceNumber()

    // Create Stripe PaymentIntent
    const stripeMetadata: Record<string, string> = {
      invoiceNumber,
      customerEmail,
      ...(customerName && { customerName }),
      ...(metadata && Object.fromEntries(
        Object.entries(metadata).map(([k, v]) => [k, String(v)])
      )),
    }

    const paymentIntent = await createStripePaymentIntent({
      amount,
      currency,
      customerEmail,
      description: description || `Payment - Invoice ${invoiceNumber}`,
      metadata: stripeMetadata,
    })

    // Store payment record in database
    const payment = await prisma.payment.create({
      data: {
        amount: amount / 100, // Convert cents to decimal
        currency,
        status: PaymentStatus.PENDING,
        provider: PaymentProvider.STRIPE,
        stripePaymentId: paymentIntent.id,
        customerEmail,
        customerName: customerName || null,
        invoiceNumber,
        description: description || null,
        metadata: metadata || null,
      },
    })

    // Return client secret for frontend
    return NextResponse.json({
      paymentId: payment.id,
      clientSecret: paymentIntent.client_secret,
      invoiceNumber: payment.invoiceNumber,
      amount: payment.amount,
      currency: payment.currency,
    })

  } catch (error) {
    console.error('Payment intent creation error:', error)

    const paymentError = handleStripeError(error)

    return NextResponse.json(
      {
        error: paymentError.message,
        code: paymentError.code,
        retryable: paymentError.retryable,
      },
      { status: 500 }
    )
  }
}

// Disable body size limit for payment processing
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
