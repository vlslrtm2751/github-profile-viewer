/**
 * Formats a number to abbreviated form: 1200 → "1.2k", 1200000 → "1.2M"
 */
export function formatNumber(n: number): string {
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (n >= 1_000) {
    return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'k'
  }
  return String(n)
}

/**
 * Formats an ISO date string to a relative time string in Korean.
 * e.g. "2년 전", "3개월 전", "1일 전"
 */
export function formatDate(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  const diffMonth = Math.floor(diffDay / 30)
  const diffYear = Math.floor(diffDay / 365)

  if (diffYear >= 1) return `${diffYear}년 전`
  if (diffMonth >= 1) return `${diffMonth}개월 전`
  if (diffDay >= 1) return `${diffDay}일 전`
  if (diffHour >= 1) return `${diffHour}시간 전`
  if (diffMin >= 1) return `${diffMin}분 전`
  return '방금 전'
}
