// ============================================================
// highlightTitle — XSS-safe title gradient helper
// ============================================================
// i18n messages are plain text (no HTML) to avoid XSS. Section
// and page titles that need a gradient word are split into two
// plain-text keys: `<section>.title` and `<section>.titleHighlight`.
// This helper escapes all text and wraps the FIRST occurrence of
// the highlight substring in the gradient span, so the word order
// stays correct in every language (en/km differ in word order).
// ============================================================

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function highlightTitle(text, highlight) {
  const safeText = String(text || '')
  if (!highlight) return escapeHtml(safeText)

  const safeHighlight = String(highlight)
  const index = safeText.indexOf(safeHighlight)

  // Translation drift / missing highlight -> render plain text.
  if (index === -1) return escapeHtml(safeText)

  return (
    escapeHtml(safeText.slice(0, index)) +
    '<span class="text-gradient">' +
    escapeHtml(safeHighlight) +
    '</span>' +
    escapeHtml(safeText.slice(index + safeHighlight.length))
  )
}