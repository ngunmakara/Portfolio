const MAX_LENGTHS = {
  name: 80,
  email: 200,
  subject: 150,
  message: 3500,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''
    const cors = corsHeaders(origin, env)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors })
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, cors)
    }

    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      return json({ error: 'Telegram proxy is not configured' }, 500, cors)
    }

    let body
    try {
      body = await request.json()
    } catch {
      return json({ error: 'Invalid JSON body' }, 400, cors)
    }

    const fields = {}
    for (const key of Object.keys(MAX_LENGTHS)) {
      fields[key] = clean(body?.[key])
    }

    if (!fields.name || !fields.email || !fields.subject || !fields.message) {
      return json({ error: 'All fields are required' }, 400, cors)
    }

    if (!EMAIL_PATTERN.test(fields.email)) {
      return json({ error: 'Invalid email address' }, 400, cors)
    }

    for (const [key, max] of Object.entries(MAX_LENGTHS)) {
      if (fields[key].length > max) {
        return json({ error: `${key} is too long` }, 400, cors)
      }
    }

    const text = [
      '<b>📩 New portfolio message</b>',
      '',
      `<b>Name:</b> ${escapeHtml(fields.name)}`,
      `<b>Email:</b> ${escapeHtml(fields.email)}`,
      `<b>Subject:</b> ${escapeHtml(fields.subject)}`,
      '',
      '<b>Message:</b>',
      escapeHtml(fields.message),
      '',
      '<i>Source: Portfolio website</i>',
    ].join('\n')

    try {
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          }),
        },
      )

      const telegramResult = await telegramResponse.json()

      if (!telegramResponse.ok || !telegramResult.ok) {
        return json(
          {
            error: 'Telegram API error',
            details: telegramResult.description || 'Unknown Telegram error',
          },
          502,
          cors,
        )
      }

      return json({ success: true }, 200, cors)
    } catch {
      return json({ error: 'Could not reach Telegram' }, 502, cors)
    }
  },
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function corsHeaders(origin, env) {
  const allowed = String(env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)

  const allowOrigin = !allowed.length || allowed.includes(origin) ? origin || '*' : 'null'

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

function json(payload, status, cors) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  })
}
