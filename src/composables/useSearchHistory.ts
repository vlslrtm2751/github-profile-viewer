const STORAGE_KEY = 'github-search-history'
const MAX_HISTORY = 10

export function useSearchHistory() {
  function getHistory(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as string[]) : []
    } catch {
      return []
    }
  }

  function addToHistory(username: string): void {
    const history = getHistory().filter((h) => h !== username)
    history.unshift(username)
    if (history.length > MAX_HISTORY) history.length = MAX_HISTORY
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }

  function removeFromHistory(username: string): void {
    const history = getHistory().filter((h) => h !== username)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }

  function clearHistory(): void {
    localStorage.removeItem(STORAGE_KEY)
  }

  return { getHistory, addToHistory, removeFromHistory, clearHistory }
}
