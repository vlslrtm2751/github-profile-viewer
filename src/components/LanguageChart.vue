<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { Chart, ArcElement, DoughnutController, Tooltip, Legend } from 'chart.js'
import { useGithubStore } from '../stores/githubStore'

Chart.register(ArcElement, DoughnutController, Tooltip, Legend)

const store = useGithubStore()
const canvasRef = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

const COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
  '#8B5CF6', '#EC4899', '#6B7280',
]

function buildChart() {
  if (!canvasRef.value) return
  if (chart) {
    chart.destroy()
    chart = null
  }

  const langs = store.topLanguages
  if (!langs.length) return

  chart = new Chart(canvasRef.value, {
    type: 'doughnut',
    data: {
      labels: langs.map((l) => l.name),
      datasets: [
        {
          data: langs.map((l) => l.count),
          backgroundColor: COLORS.slice(0, langs.length),
          borderWidth: 2,
          borderColor: 'transparent',
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 12,
            usePointStyle: true,
            color: window.matchMedia('(prefers-color-scheme: dark)').matches
              ? '#D1D5DB'
              : '#374151',
          },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const total = (ctx.dataset.data as number[]).reduce((a, b) => a + b, 0)
              const pct = Math.round(((ctx.parsed as number) / total) * 100)
              return ` ${ctx.label}: ${ctx.parsed} repos (${pct}%)`
            },
          },
        },
      },
      cutout: '65%',
    },
  })
}

watch(
  () => store.topLanguages,
  async () => {
    await nextTick()
    buildChart()
  },
  { deep: true }
)

onMounted(() => {
  buildChart()
})

onBeforeUnmount(() => {
  chart?.destroy()
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">언어 사용 비율</h3>
    <div v-if="store.topLanguages.length > 0" class="max-w-xs mx-auto">
      <canvas ref="canvasRef" />
    </div>
    <div v-else class="text-center text-gray-400 dark:text-gray-500 text-sm py-8">
      언어 정보 없음
    </div>
  </div>
</template>
