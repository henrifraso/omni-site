import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) return res.status(500).json({ error: 'STRIPE_SECRET_KEY not set' })

    const origin = (req.headers.origin as string) || 'https://omni-site-phi.vercel.app'

    const body = new URLSearchParams({
      'ui_mode': 'embedded_page',
      'mode': 'payment',
      'payment_method_types[0]': 'card',
      'return_url': `${origin}/?session_id={CHECKOUT_SESSION_ID}`,
      'line_items[0][price_data][currency]': 'brl',
      'line_items[0][price_data][product_data][name]': 'Omni',
      'line_items[0][price_data][unit_amount]': '99700',
      'line_items[0][quantity]': '1',
    })

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    })

    const data = await response.json() as Record<string, unknown>

    if (!response.ok) {
      const err = data.error as Record<string, unknown>
      return res.status(response.status).json({ error: err?.message ?? 'Stripe error' })
    }

    res.json({ clientSecret: data.client_secret })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'unknown error'
    res.status(500).json({ error: msg })
  }
}
