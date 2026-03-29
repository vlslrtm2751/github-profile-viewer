<script setup lang="ts">
import { ref } from 'vue'
import { useGithubStore } from './stores/githubStore'
import SearchBar from './components/SearchBar.vue'
import ProfileCard from './components/ProfileCard.vue'
import RepoList from './components/RepoList.vue'
import LanguageChart from './components/LanguageChart.vue'
import ContributionGraph from './components/ContributionGraph.vue'
import SearchHistory from './components/SearchHistory.vue'
import ErrorMessage from './components/ErrorMessage.vue'

const store = useGithubStore()
const darkMode = ref(false)

const activeTab = ref<'repos' | 'chart' | 'graph'>('repos')
</script>

<template>
  <div :class="['min-h-screen transition-colors duration-300', darkMode ? 'dark bg-gray-900' : 'bg-gray-50']">
    <!-- Header -->
    <header class="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub Profile Viewer
        </h1>
        <button
          class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          :title="darkMode ? '라이트 모드' : '다크 모드'"
          @click="darkMode = !darkMode"
        >
          <svg v-if="darkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <!-- Search -->
      <SearchBar />

      <!-- Search History -->
      <SearchHistory />

      <!-- Loading Skeleton -->
      <div v-if="store.isLoading" class="space-y-4 animate-pulse">
        <div class="h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
        <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
      </div>

      <!-- Error -->
      <ErrorMessage v-else-if="store.error" :message="store.error" />

      <!-- Content -->
      <template v-else-if="store.user">
        <ProfileCard :user="store.user" />

        <!-- Tabs -->
        <div class="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <button
            v-for="tab in [{ id: 'repos', label: '레포지토리' }, { id: 'chart', label: '언어 차트' }, { id: 'graph', label: '활동 그래프' }]"
            :key="tab.id"
            :class="[
              'flex-1 py-2 text-sm font-medium rounded-lg transition',
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            ]"
            @click="activeTab = tab.id as 'repos' | 'chart' | 'graph'"
          >
            {{ tab.label }}
          </button>
        </div>

        <RepoList v-if="activeTab === 'repos'" />
        <LanguageChart v-else-if="activeTab === 'chart'" />
        <ContributionGraph v-else-if="activeTab === 'graph'" />
      </template>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <svg class="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600 mb-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        <p class="text-gray-500 dark:text-gray-400">GitHub 유저명을 검색해 보세요</p>
      </div>
    </main>
  </div>
</template>
