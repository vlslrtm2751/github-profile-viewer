<script setup lang="ts">
import type { GitHubRepo } from '../types'
import { formatNumber, formatDate } from '../utils/helpers'

defineProps<{ repo: GitHubRepo }>()

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Vue: 'bg-green-500',
  Python: 'bg-blue-400',
  Java: 'bg-red-500',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-600',
  'C++': 'bg-pink-500',
  C: 'bg-gray-500',
  CSS: 'bg-purple-500',
  HTML: 'bg-orange-400',
  Shell: 'bg-green-600',
  Ruby: 'bg-red-600',
  PHP: 'bg-indigo-500',
  Swift: 'bg-orange-500',
  Kotlin: 'bg-violet-500',
}

function langColor(lang: string): string {
  return LANGUAGE_COLORS[lang] ?? 'bg-gray-400'
}
</script>

<template>
  <a
    :href="repo.html_url"
    target="_blank"
    rel="noopener noreferrer"
    class="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition"
  >
    <div class="flex items-start justify-between gap-2 mb-2">
      <h3 class="font-semibold text-blue-600 dark:text-blue-400 truncate text-sm">{{ repo.name }}</h3>
    </div>

    <p v-if="repo.description" class="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
      {{ repo.description }}
    </p>

    <!-- Topics -->
    <div v-if="repo.topics.length > 0" class="flex flex-wrap gap-1 mb-3">
      <span
        v-for="topic in repo.topics.slice(0, 4)"
        :key="topic"
        class="px-2 py-0.5 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
      >
        {{ topic }}
      </span>
    </div>

    <!-- Stats row -->
    <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
      <span v-if="repo.language" class="flex items-center gap-1">
        <span :class="['w-2.5 h-2.5 rounded-full', langColor(repo.language)]" />
        {{ repo.language }}
      </span>
      <span class="flex items-center gap-1">
        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        {{ formatNumber(repo.stargazers_count) }}
      </span>
      <span class="flex items-center gap-1">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        {{ formatNumber(repo.forks_count) }}
      </span>
      <span class="ml-auto">업데이트: {{ formatDate(repo.updated_at) }}</span>
    </div>
  </a>
</template>
