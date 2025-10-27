/**
 * POST /api/payment/webhook
 *
 * Stripe webhook handler for payment events.
 * CRITICAL: Verifies webhook signature to prevent spoofing.
 *
 * Handles:
 * - payment_intent.succeeded
 * - payment_intent.payment_failed
 * - payment_intent.canceled
 * - payment_intent.processing
 */

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'
import {
  verifyStripeWebhook,
  mapStripeStatusToPaymentStatus,
  extractPaymentMethodDetails,
  STRIPE_WEBHOOK_EVENTS,
  isPaymentIntentEvent,
} from '@/features/payment/lib/stripe'
import { PaymentStatus } from '@/features/payment/types/payment.types'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    // Get raw body and signature
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      console.error('Webhook error: Missing stripe-signature header')
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = verifyStripeWebhook(body, signature)
    } catch (error) {
      console.error('Webhook signature verification failed:', error)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    console.log(`Webhook received: ${event.type}`, {
      eventId: event.id,
      created: event.created,
    })

    // Handle payment intent events
    if (isPaymentIntentEvent(event)) {
      const paymentIntent = event.data.object
      await handlePaymentIntentEvent(event.type, paymentIntent)
    }

    // Return 200 to acknowledge receipt
    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

/**
 * Handle payment intent events
 */
async function handlePaymentIntentEvent(
  eventType: string,
  paymentIntent: Stripe.PaymentIntent
): Promise<void> {
  const stripePaymentId = paymentIntent.id

  // Find payment record in database
  const payment = await prisma.payment.findUnique({
    where: { stripePaymentId },
  })

  if (!payment) {
    console.warn(`Payment not found for Stripe PaymentIntent: ${stripePaymentId}`)
    return
  }

  // Map Stripe status to our PaymentStatus
  const status = mapStripeStatusToPaymentStatus(paymentIntent.status)

  // Extract payment method details
  const paymentMethodDetails = extractPaymentMethodDetails(paymentIntent)

  // Update payment record based on event type
  switch (eventType) {
    case STRIPE_WEBHOOK_EVENTS.PAYMENT_INTENT_SUCCEEDED:
      console.log(`Payment succeeded: ${payment.invoiceNumber}`)

      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.SUCCEEDED,
          completedAt: new Date(),
          metadata: {
            ...(typeof payment.metadata === 'object' && payment.metadata !== null ? payment.metadata : {}),
            paymentMethod: paymentMethodDetails?.formatted || 'Card',
            last4: paymentMethodDetails?.last4 || null,
            brand: paymentMethodDetails?.brand || null,
            stripeStatus: paymentIntent.status,
          },
        },
      })

      // TODO: Phase 4 - Send email receipt
      // TODO: Phase 4 - Generate invoice PDF

      break

    case STRIPE_WEBHOOK_EVENTS.PAYMENT_INTENT_FAILED:
      console.log(`Payment failed: ${payment.invoiceNumber}`)

      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.FAILED,
          metadata: {
            ...(typeof payment.metadata === 'object' && payment.metadata !== null ? payment.metadata : {}),
            failureReason: paymentIntent.last_payment_error?.message || 'Unknown',
            stripeStatus: paymentIntent.status,
          },
        },
      })

      break

    case STRIPE_WEBHOOK_EVENTS.PAYMENT_INTENT_CANCELED:
      console.log(`Payment canceled: ${payment.invoiceNumber}`)

      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.CANCELED,
          metadata: {
            ...(typeof payment.metadata === 'object' && payment.metadata !== null ? payment.metadata : {}),
            stripeStatus: paymentIntent.status,
          },
        },
      })

      break

    case STRIPE_WEBHOOK_EVENTS.PAYMENT_INTENT_PROCESSING:
      console.log(`Payment processing: ${payment.invoiceNumber}`)

      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.PROCESSING,
          metadata: {
            ...(typeof payment.metadata === 'object' && payment.metadata !== null ? payment.metadata : {}),
            stripeStatus: paymentIntent.status,
          },
        },
      })

      break

    default:
      console.log(`Unhandled event type: ${eventType}`)
  }
}

// Disable body parsing to get raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
}

// Set runtime to Edge for faster webhook processing
export const runtime = 'edge'
