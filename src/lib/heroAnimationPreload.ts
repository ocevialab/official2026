import landscapeAnimationUrl from '../assets/lottie/0607.json?url'
import portraitAnimationUrl from '../assets/lottie/0608.json?url'

const LANDSCAPE_ANIMATION = landscapeAnimationUrl
const PORTRAIT_ANIMATION = portraitAnimationUrl

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
