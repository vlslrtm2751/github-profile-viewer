<script setup lang="ts">
import { useGithubStore } from '../stores/githubStore'
import RepoCard from './RepoCard.vue'

const store = useGithubStore()
</script>

<template>
  <div>
    <!-- Controls -->
    <div class="flex flex-wrap gap-3 mb-4">
      <!-- Search -->
      <input
        v-model="store.repoSearch"
        type="text"
        placeholder="레포지토리 검색..."
        class="flex-1 min-w-[180px] px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- Language Filter -->
      <select
        v-model="store.filterLanguage"
        class="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option v-for="lang in store.languageList" :key="lang" :value="lang">
          {{ lang === 'all' ? '모든 언어' : lang }}
        </option>
      </select>

      <!-- Sort -->
      <select
        v-model="store.sortBy"
        class="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="stars">Stars 순</option>
        <option value="updated">최근 업데이트 순</option>
        <option value="name">이름 순</option>
      </select>
    </div>

    <!-- Result Count -->
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
      {{ store.filteredRepos.length }}개의 레포지토리
    </p>

    <!-- Repo Grid -->
    <div v-if="store.filteredRepos.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <RepoCard v-for="repo in store.filteredRepos" :key="repo.id" :repo="repo" />
    </div>

    <div v-else class="py-12 text-center text-gray-400 dark:text-gray-500 text-sm">
      검색 결과가 없습니다.
    </div>
  </div>
</template>
