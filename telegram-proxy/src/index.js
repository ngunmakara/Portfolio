export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() })
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() },
      })
    }

    try {
      const { name, email, subject, message } = await request.json()

      if (!name || !email || !subject || !message) {
        return new Response(JSON.stringify({ error: 'All fields are required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders() },
        })
      }

      const text = [
        '📩 NEW PORTFOLIO MESSAGE',
        '',
        `👤 Name: ${name}`,
        `📧 Email: ${email}`,
        `📝 Subject: ${subject}`,
        `💬 Message:\n${message}`,
        '',
        '🌐 Source: Portfolio Website',
      ].join('\n')

      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text,
          }),
        },
      )

      if (!telegramResponse.ok) {
        return new Response(JSON.stringify({ error: 'Telegram API error' }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', ...corsHeaders() },
        })
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() },
      })
    } catch {
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() },
      })
    }
  },
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}
