import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const origin = req.headers.origin || 'https://omni-site-phi.vercel.app'

  const session = await stripe.checkout.sessions.create({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ui_mode: 'embedded' as any,
    line_items: [{
      price_data: {
        currency: 'brl',
        product_data: {
          name: 'Omni',
          description: 'Inteligência para o seu negócio',
        },
        unit_amount: 99700,
      },
      quantity: 1,
    }],
    mode: 'payment',
    return_url: `${origin}/?session_id={CHECKOUT_SESSION_ID}`,
  })

  res.json({ clientSecret: session.client_secret })
}
