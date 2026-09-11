/**
 * Integración con el blog oficial de EHC Group (WordPress).
 *
 * Estrategia de red (1 sola request):
 * GET /wp-json/wp/v2/posts?per_page=6&orderby=date&order=desc&_embed=wp:term,wp:featuredmedia
 * - `per_page=6` + orden desc: la API devuelve solo las 6 más recientes.
 * - `_embed=wp:term,wp:featuredmedia`: categorías e imagen destacada viajan
 *   en la misma respuesta (sin `_fields`, que vacía `_embedded`).
 */

export const BLOG_URL = 'https://blog.ehcgroup.io'

const POSTS_URL = `${BLOG_URL}/wp-json/wp/v2/posts?per_page=6&orderby=date&order=desc&_embed=wp:term,wp:featuredmedia`

interface WPRendered {
  rendered: string
  protected?: boolean
}

interface WPTerm {
  id: number
  name: string
  slug: string
  taxonomy: string
}

interface WPMediaSize {
  source_url: string
  width: number
  height: number
}

interface WPFeaturedMedia {
  id: number
  source_url: string
  alt_text: string
  media_details?: {
    sizes?: Record<string, WPMediaSize>
  }
}

interface WPPost {
  id: number
  date: string
  link: string
  title: WPRendered
  excerpt: WPRendered
  featured_media: number
  _embedded?: {
    'wp:term'?: WPTerm[][]
    'wp:featuredmedia'?: WPFeaturedMedia[]
  }
}

export interface NewsImage {
  src: string
  alt: string
}

export interface NewsArticle {
  id: number
  title: string
  excerpt: string
  dateLabel: string
  link: string
  category: string
  image: NewsImage | null
}

/**
 * Decodifica entidades HTML y elimina etiquetas de forma segura.
 * DOMParser no ejecuta scripts: no se usa dangerouslySetInnerHTML.
 */
export function decodeHtml(html: string): string {
  if (typeof DOMParser === 'undefined') {
    return html.replace(/<[^>]*>/g, ' ')
  }
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim()
}

function cleanExcerpt(raw: string): string {
  return decodeHtml(raw)
    .replace(/\s*[.…]\s*$/, '')
    .replace(/\s*\[\u2026\]\s*$/, '')
    .trim()
}

export function formatPostDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
    .format(d)
    .replace(/\./g, '')
    .replace(/,/g, '')
    .toUpperCase()
}

function pickCategory(terms?: WPTerm[][]): string {
  if (!terms) return 'EHC'
  for (const group of terms) {
    for (const term of group ?? []) {
      if (term?.taxonomy === 'category' && term.name) {
        return decodeHtml(term.name)
      }
    }
  }
  return 'EHC'
}

function pickImage(media?: WPFeaturedMedia[]): NewsImage | null {
  const item = media?.[0]
  if (!item) return null
  const sizes = item.media_details?.sizes
  const src =
    sizes?.medium_large?.source_url ?? sizes?.medium?.source_url ?? item.source_url
  if (!src) return null
  return { src, alt: item.alt_text?.trim() || 'Imagen destacada del artículo' }
}

export async function fetchLatestPosts(signal?: AbortSignal): Promise<NewsArticle[]> {
  const res = await fetch(POSTS_URL, { signal, headers: { Accept: 'application/json' } })
  if (!res.ok) {
    throw new Error(`WordPress respondió ${res.status}`)
  }
  const posts = (await res.json()) as WPPost[]
  if (!Array.isArray(posts)) {
    throw new Error('Respuesta inesperada de WordPress')
  }
  return posts.slice(0, 6).map((post) => ({
    id: post.id,
    title: decodeHtml(post.title?.rendered ?? ''),
    excerpt: cleanExcerpt(post.excerpt?.rendered ?? ''),
    dateLabel: formatPostDate(post.date),
    link: post.link,
    category: pickCategory(post._embedded?.['wp:term']),
    image: pickImage(post._embedded?.['wp:featuredmedia']),
  }))
}
