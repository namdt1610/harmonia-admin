import { useGetOverviewQuery } from '../api'

export function useAnalyticsOverview() {
  const { data, isLoading } = useGetOverviewQuery()
  return { overview: data, isLoading }
}