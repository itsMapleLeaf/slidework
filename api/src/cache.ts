const CACHE_TIME_MILLIS = 1000 * 60 * 15 // 15 minutes

class CacheEntry<T> {
  constructor(public key: string, public value: T, public timestamp: number) {}
}

export class Cache<T = unknown> {
  private entries = new Set<CacheEntry<T>>()

  add(key: string, value: T) {
    const entry = new CacheEntry(key, value, Date.now())
    this.entries.add(entry)

    setTimeout(() => {
      this.entries.delete(entry)
    }, CACHE_TIME_MILLIS)
  }

  get(key: string) {
    return [...this.entries].find((e) => e.key === key)?.value
  }

  clear() {
    this.entries.clear()
  }
}
