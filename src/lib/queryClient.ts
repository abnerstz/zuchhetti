import { QueryClient } from '@tanstack/react-query';
import { QUERY_CONFIG } from './constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.STALE_TIME,
      gcTime: QUERY_CONFIG.CACHE_TIME,
      retry: QUERY_CONFIG.RETRY,
      refetchOnWindowFocus: QUERY_CONFIG.REFETCH_ON_WINDOW_FOCUS,
    },
    mutations: {
      retry: false,
    },
  },
});
