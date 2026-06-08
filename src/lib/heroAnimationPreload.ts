const LANDSCAPE_ANIMATION = '/animations/hero.json'
const PORTRAIT_ANIMATION = '/animations/hero-mobile.json'

const cache = new Map<string, Promise<object>>()

export function preloadHeroAnimation(path: string): Promise<object> {
  const cached = cache.get(path)
  if (cached) return cached

  const request = fetch(path)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load ${path}`)
      return res.json() as Promise<object>
    })
    .catch((error) => {
      cache.delete(path)
      throw error
    })

  cache.set(path, request)
  return request
}

export function preloadAllHeroAnimations() {
  preloadHeroAnimation(LANDSCAPE_ANIMATION)
  preloadHeroAnimation(PORTRAIT_ANIMATION)
}

export { LANDSCAPE_ANIMATION, PORTRAIT_ANIMATION }
