/**
 * Replace custom @img/ image references in Markdown with a fully qualified URL.
 * Leaves the content untouched when the base URL is not available.
 */
export function resolveMarkdownImages(markdown: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_OMM_IMAGES_BASE_URL
  if (!baseUrl) return markdown

  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl

  return markdown.replace(/@img\/[^\s)]+/g, match => {
    const imagePath = match.replace(/^@img\//, '')
    return `${normalizedBaseUrl}/${imagePath}`
  })
}
