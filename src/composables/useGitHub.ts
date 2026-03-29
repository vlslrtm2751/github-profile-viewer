import type { GitHubUser, GitHubRepo } from '../types'

const BASE = 'https://api.github.com'

async function fetchWithRateLimit(url: string): Promise<unknown> {
  const res = await fetch(url)

  const remaining = res.headers.get('X-RateLimit-Remaining')
  const reset = res.headers.get('X-RateLimit-Reset')

  if (res.status === 403) {
    const resetTime = reset
      ? new Date(Number(reset) * 1000).toLocaleTimeString()
      : '잠시 후'
    throw new Error(`Rate limit 초과. ${resetTime} 이후 재시도해 주세요.`)
  }

  if (res.status === 404) {
    throw new Error('USER_NOT_FOUND')
  }

  if (!res.ok) {
    throw new Error(`API 오류: ${res.status} ${res.statusText}`)
  }

  if (remaining !== null && Number(remaining) <= 5) {
    console.warn(`[GitHub API] Rate limit 임박: 남은 요청 수 ${remaining}`)
  }

  return res.json()
}

export function useGitHub() {
  async function fetchUser(username: string): Promise<GitHubUser> {
    return fetchWithRateLimit(`${BASE}/users/${encodeURIComponent(username)}`) as Promise<GitHubUser>
  }

  async function fetchRepos(username: string): Promise<GitHubRepo[]> {
    return fetchWithRateLimit(
      `${BASE}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
    ) as Promise<GitHubRepo[]>
  }

  return { fetchUser, fetchRepos }
}
