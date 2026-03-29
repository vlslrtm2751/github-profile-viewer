<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ message: string }>()

const isRateLimit = computed(() => props.message.includes('Rate limit'))
const isNotFound = computed(() => props.message.includes('찾을 수 없습니다'))
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-4 py-16 text-center"
  >
    <!-- Rate Limit Icon -->
    <div v-if="isRateLimit" class="text-yellow-500">
      <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
      <h3 class="text-xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">Rate Limit 초과</h3>
    </div>

    <!-- Not Found Icon -->
    <div v-else-if="isNotFound" class="text-gray-400">
      <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <h3 class="text-xl font-bold text-gray-600 dark:text-gray-300 mt-2">유저를 찾을 수 없음</h3>
    </div>

    <!-- Network Error Icon -->
    <div v-else class="text-red-500">
      <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-xl font-bold text-red-600 dark:text-red-400 mt-2">오류 발생</h3>
    </div>

    <p class="text-gray-500 dark:text-gray-400 max-w-sm text-sm">{{ message }}</p>
  </div>
</template>
