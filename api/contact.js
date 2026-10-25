const MAX_LENGTHS = {
  name: 80,
  email: 200,
  subject: 150,
  message: 3500,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
  const origin = req.headers.origin || ''
  setCors(res, origin)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return res.status(500).json({ error: 'Telegram integration is not configured' })
  }

  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' })
  }

  const fields = {}
  for (const key of Object.keys(MAX_LENGTHS)) {
    fields[key] = clean(body?.[key])
  }

  if (!fields.name || !fields.email || !fields.subject || !fields.message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  if (!EMAIL_PATTERN.test(fields.email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  for (const [key, max] of Object.entries(MAX_LENGTHS)) {
    if (fields[key].length > max) {
      return res.status(400).json({ error: `${key} is too long` })
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
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      },
    )

    const telegramResult = await telegramResponse.json()

    if (!telegramResponse.ok || !telegramResult.ok) {
      return res.status(502).json({
        error: 'Telegram API error',
        details: telegramResult.description || 'Unknown Telegram error',
      })
    }

    return res.status(200).json({ success: true })
  } catch {
    return res.status(502).json({ error: 'Could not reach Telegram' })
  }
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

function setCors(res, origin) {
  const allowed = String(process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)

  const allowOrigin = !allowed.length || allowed.includes(origin) ? origin || '*' : 'null'

  res.setHeader('Access-Control-Allow-Origin', allowOrigin)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Max-Age', '86400')
  res.setHeader('Vary', 'Origin')
}
