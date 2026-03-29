<script setup lang="ts">
import type { GitHubUser } from '../types'
import { formatNumber, formatDate } from '../utils/helpers'

defineProps<{ user: GitHubUser }>()
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col sm:flex-row gap-6">
    <!-- Avatar -->
    <a :href="user.html_url" target="_blank" rel="noopener noreferrer" class="flex-shrink-0">
      <img
        :src="user.avatar_url"
        :alt="user.login"
        class="w-28 h-28 rounded-full ring-4 ring-blue-100 dark:ring-blue-900 hover:ring-blue-400 transition"
      />
    </a>

    <!-- Info -->
    <div class="flex-1 min-w-0">
      <div class="flex flex-wrap items-center gap-3 mb-1">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white truncate">
          {{ user.name ?? user.login }}
        </h2>
        <a
          :href="user.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >@{{ user.login }}</a>
      </div>

      <p v-if="user.bio" class="text-gray-600 dark:text-gray-300 mb-3 text-sm leading-relaxed">
        {{ user.bio }}
      </p>

      <div class="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span v-if="user.location" class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {{ user.location }}
        </span>
        <a
          v-if="user.blog"
          :href="user.blog.startsWith('http') ? user.blog : `https://${user.blog}`"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          {{ user.blog }}
        </a>
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          가입일: {{ formatDate(user.created_at) }}
        </span>
      </div>

      <!-- Stats -->
      <div class="flex flex-wrap gap-6">
        <div class="text-center">
          <div class="text-xl font-bold text-gray-900 dark:text-white">{{ formatNumber(user.public_repos) }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">레포지토리</div>
        </div>
        <div class="text-center">
          <div class="text-xl font-bold text-gray-900 dark:text-white">{{ formatNumber(user.followers) }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">팔로워</div>
        </div>
        <div class="text-center">
          <div class="text-xl font-bold text-gray-900 dark:text-white">{{ formatNumber(user.following) }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">팔로잉</div>
        </div>
      </div>
    </div>
  </div>
</template>
