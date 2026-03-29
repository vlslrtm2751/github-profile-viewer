<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSearchHistory } from '../composables/useSearchHistory'
import { useGithubStore } from '../stores/githubStore'

const store = useGithubStore()
const { getHistory, removeFromHistory, clearHistory } = useSearchHistory()

const history = ref<string[]>(getHistory())

function refresh() {
  history.value = getHistory()
}

function select(username: string) {
  store.searchUser(username)
}

function remove(username: string) {
  removeFromHistory(username)
  refresh()
}

function clear() {
  clearHistory()
  refresh()
}

onMounted(() => {
  refresh()
})
</script>

<template>
  <div v-if="history.length > 0" class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">최근 검색</h3>
      <button
        class="text-xs text-gray-400 hover:text-red-500 transition"
        @click="clear"
      >모두 삭제</button>
    </div>

    <ul class="flex flex-wrap gap-2">
      <li
        v-for="item in history"
        :key="item"
        class="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200"
      >
        <button class="hover:text-blue-600 dark:hover:text-blue-400 transition" @click="select(item)">
          {{ item }}
        </button>
        <button
          class="ml-1 text-gray-400 hover:text-red-500 transition text-xs"
          @click="remove(item)"
        >×</button>
      </li>
    </ul>
  </div>
</template>
