import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GitHubUser, GitHubRepo, SortOption } from '../types'
import { useGitHub } from '../composables/useGitHub'
import { useSearchHistory } from '../composables/useSearchHistory'

export const useGithubStore = defineStore('github', () => {
  // State
  const user = ref<GitHubUser | null>(null)
  const repos = ref<GitHubRepo[]>([])
  const languages = ref<Record<string, number>>({})
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const sortBy = ref<SortOption>('stars')
  const filterLanguage = ref<string>('all')
  const repoSearch = ref('')

  // Getters
  const filteredRepos = computed(() => {
    let result = [...repos.value]

    if (filterLanguage.value !== 'all') {
      result = result.filter((r) => r.language === filterLanguage.value)
    }

    if (repoSearch.value.trim()) {
      const q = repoSearch.value.trim().toLowerCase()
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description ?? '').toLowerCase().includes(q)
      )
    }

    if (sortBy.value === 'stars') {
      result.sort((a, b) => b.stargazers_count - a.stargazers_count)
    } else if (sortBy.value === 'updated') {
      result.sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
    } else if (sortBy.value === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  })

  const languageList = computed(() => {
    return ['all', ...Object.keys(languages.value).sort()]
  })

  const topLanguages = computed(() => {
    const sorted = Object.entries(languages.value).sort(([, a], [, b]) => b - a)
    const top = sorted.slice(0, 6)
    const rest = sorted.slice(6)
    const othersCount = rest.reduce((sum, [, v]) => sum + v, 0)

    const result: Array<{ name: string; count: number }> = top.map(([name, count]) => ({
      name,
      count,
    }))

    if (othersCount > 0) {
      result.push({ name: '기타', count: othersCount })
    }

    return result
  })

  // Actions
  const { fetchUser, fetchRepos } = useGitHub()
  const searchHistory = useSearchHistory()

  async function searchUser(username: string) {
    if (!username.trim()) return

    isLoading.value = true
    error.value = null
    user.value = null
    repos.value = []
    languages.value = {}

    try {
      const [userData, reposData] = await Promise.all([
        fetchUser(username.trim()),
        fetchRepos(username.trim()),
      ])

      user.value = userData
      repos.value = reposData
      aggregateLanguages()
      searchHistory.addToHistory(username.trim())
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'USER_NOT_FOUND') {
          error.value = `사용자 "${username}"를 찾을 수 없습니다.`
        } else {
          error.value = err.message
        }
      } else {
        error.value = '알 수 없는 오류가 발생했습니다.'
      }
    } finally {
      isLoading.value = false
    }
  }

  function aggregateLanguages() {
    const counts: Record<string, number> = {}
    for (const repo of repos.value) {
      if (repo.language) {
        counts[repo.language] = (counts[repo.language] ?? 0) + 1
      }
    }
    languages.value = counts
  }

  function clearUser() {
    user.value = null
    repos.value = []
    languages.value = {}
    error.value = null
    sortBy.value = 'stars'
    filterLanguage.value = 'all'
    repoSearch.value = ''
  }

  return {
    user,
    repos,
    languages,
    isLoading,
    error,
    sortBy,
    filterLanguage,
    repoSearch,
    filteredRepos,
    languageList,
    topLanguages,
    searchUser,
    aggregateLanguages,
    clearUser,
  }
})
