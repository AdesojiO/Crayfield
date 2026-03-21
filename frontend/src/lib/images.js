/**
 * Centralised image config.
 * Swap any URL here with a real Crayfield product photo when assets are ready.
 * Placeholder images from picsum.photos (reliable for development).
 */
export const IMAGES = {
  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: 'https://picsum.photos/seed/hero/1200/900',

  // ── Products ──────────────────────────────────────────────────────────────
  groundCrayfish: 'https://picsum.photos/seed/ground/800/800',
  wholeCrayfish:  'https://picsum.photos/seed/whole/800/800',
  bulkCrayfish:   'https://picsum.photos/seed/bulk/800/800',
  spicesMarket:   'https://picsum.photos/seed/spices/800/800',

  // ── Recipes ───────────────────────────────────────────────────────────────────
  // Local images: save files to src/assets/ with these exact names:
  //   egusi-soup.jpg  |  jollof-rice.jpg  |  ogbono-stew.jpg
  // then uncomment the imports at the top of this file and replace the strings below.
  egusiSoup:  '/src/assets/egusi-soup.jpg',
  jollofRice: '/src/assets/jollof-rice.jpg',
  ogbonoStew: '/src/assets/ogbono-stew.jpg',

  // ── Brand / About ─────────────────────────────────────────────────────────
  marketStall: 'https://picsum.photos/seed/market/1200/900',
  wholesale:   'https://picsum.photos/seed/wholesale/1000/750',
}

/** Helper: add width/height overrides to any image URL */
export const imgUrl = (url, w, h) => {
  const u = new URL(url)
  u.searchParams.set('w', w)
  if (h) u.searchParams.set('h', h)
  return u.toString()
}
