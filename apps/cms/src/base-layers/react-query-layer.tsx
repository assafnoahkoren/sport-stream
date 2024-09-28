import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

interface ReactQueryClientProviderProps {
  children: ReactNode;
}

export const ReactQueryLayer = ({ children }: ReactQueryClientProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
