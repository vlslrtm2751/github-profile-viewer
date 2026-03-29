<script setup lang="ts">
import { ref, watch } from 'vue'
import { useGithubStore } from '../stores/githubStore'
import { useSearchHistory } from '../composables/useSearchHistory'

const store = useGithubStore()
const { getHistory } = useSearchHistory()

const query = ref('')
const showDropdown = ref(false)
const history = ref<string[]>(getHistory())

function refreshHistory() {
  history.value = getHistory()
}

function search(username?: string) {
  const target = username ?? query.value.trim()
  if (!target) return
  query.value = target
  showDropdown.value = false
  store.searchUser(target)
}

function selectHistory(username: string) {
  query.value = username
  search(username)
}

function onFocus() {
  refreshHistory()
  showDropdown.value = true
}

function onBlur() {
  setTimeout(() => {
    showDropdown.value = false
  }, 150)
}

watch(query, () => {
  if (query.value) {
    refreshHistory()
    showDropdown.value = true
  }
})

const filteredHistory = () =>
  history.value.filter((h) =>
    query.value ? h.toLowerCase().includes(query.value.toLowerCase()) : true
  )
</script>

<template>
  <div class="relative w-full max-w-xl mx-auto">
    <div class="flex gap-2">
      <input
        v-model="query"
        type="text"
        placeholder="GitHub 유저명을 입력하세요..."
        class="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        @keydown.enter="search()"
        @focus="onFocus"
        @blur="onBlur"
      />
      <button
        :disabled="store.isLoading || !query.trim()"
        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-xl transition"
        @click="search()"
      >
        <span v-if="store.isLoading" class="flex items-center gap-2">
          <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          검색 중
        </span>
        <span v-else>검색</span>
      </button>
    </div>

    <!-- History Dropdown -->
    <div
      v-if="showDropdown && filteredHistory().length > 0"
      class="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg overflow-hidden"
    >
      <ul>
        <li
          v-for="item in filteredHistory()"
          :key="item"
          class="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
          @mousedown.prevent="selectHistory(item)"
        >
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="flex-1 text-sm">{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
