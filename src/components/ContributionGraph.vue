<script setup lang="ts">
import { computed } from 'vue'
import { useGithubStore } from '../stores/githubStore'

const store = useGithubStore()

// Build a 52-week × 7-day grid using repos' updated_at as a rough proxy for activity.
// Since GitHub's contribution API requires authentication, we use repo update dates.
const WEEKS = 52
const DAYS = 7

interface DayCell {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

const cells = computed<DayCell[][]>(() => {
  // Build a map of date → activity count from repo updated_at
  const activityMap = new Map<string, number>()

  for (const repo of store.repos) {
    const d = repo.updated_at.split('T')[0]
    activityMap.set(d, (activityMap.get(d) ?? 0) + 1)
  }

  // Start from 52 weeks ago (Sunday)
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - WEEKS * DAYS + 1)
  // Align to Sunday
  startDate.setDate(startDate.getDate() - startDate.getDay())

  const grid: DayCell[][] = []
  let cursor = new Date(startDate)

  for (let w = 0; w < WEEKS; w++) {
    const week: DayCell[] = []
    for (let d = 0; d < DAYS; d++) {
      const dateStr = cursor.toISOString().split('T')[0]
      const count = activityMap.get(dateStr) ?? 0
      week.push({ date: dateStr, count, level: toLevel(count) })
      cursor.setDate(cursor.getDate() + 1)
    }
    grid.push(week)
  }

  return grid
})

function toLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count === 1) return 1
  if (count <= 3) return 2
  if (count <= 6) return 3
  return 4
}

const levelColors: Record<number, string> = {
  0: 'fill-gray-100 dark:fill-gray-700',
  1: 'fill-green-200 dark:fill-green-900',
  2: 'fill-green-400 dark:fill-green-700',
  3: 'fill-green-500 dark:fill-green-500',
  4: 'fill-green-600 dark:fill-green-400',
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

const monthPositions = computed(() => {
  const positions: { label: string; x: number }[] = []
  let lastMonth = -1
  cells.value.forEach((week, wi) => {
    const month = new Date(week[0].date).getMonth()
    if (month !== lastMonth) {
      positions.push({ label: MONTH_LABELS[month], x: wi * 14 })
      lastMonth = month
    }
  })
  return positions
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 overflow-x-auto">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">레포 활동 그래프</h3>

    <div v-if="store.repos.length > 0">
      <svg
        :width="WEEKS * 14 + 30"
        :height="DAYS * 14 + 24"
        class="overflow-visible"
      >
        <!-- Month labels -->
        <g transform="translate(30, 0)">
          <text
            v-for="pos in monthPositions"
            :key="pos.label + pos.x"
            :x="pos.x"
            y="12"
            class="fill-gray-400 dark:fill-gray-500"
            font-size="10"
          >{{ pos.label }}</text>
        </g>

        <!-- Day labels -->
        <g transform="translate(0, 16)">
          <text
            v-for="(label, di) in DAY_LABELS"
            :key="di"
            x="0"
            :y="di * 14 + 10"
            class="fill-gray-400 dark:fill-gray-500"
            font-size="9"
            text-anchor="start"
          >{{ label }}</text>
        </g>

        <!-- Cells -->
        <g transform="translate(30, 16)">
          <g v-for="(week, wi) in cells" :key="wi">
            <rect
              v-for="(day, di) in week"
              :key="day.date"
              :x="wi * 14"
              :y="di * 14"
              width="11"
              height="11"
              rx="2"
              :class="levelColors[day.level]"
            >
              <title>{{ day.date }}: {{ day.count }} repos updated</title>
            </rect>
          </g>
        </g>
      </svg>

      <!-- Legend -->
      <div class="flex items-center gap-1 mt-2 text-xs text-gray-400 dark:text-gray-500">
        <span>적음</span>
        <svg width="66" height="11">
          <rect v-for="(lv, i) in [0,1,2,3,4]" :key="lv" :x="i * 14" y="0" width="11" height="11" rx="2"
            :class="levelColors[lv]" />
        </svg>
        <span>많음</span>
      </div>
    </div>

    <div v-else class="text-center text-gray-400 dark:text-gray-500 text-sm py-8">
      활동 정보 없음
    </div>
  </div>
</template>
