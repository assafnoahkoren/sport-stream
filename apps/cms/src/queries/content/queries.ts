import { useQuery } from 'react-query';
import supabase from '../supabase';
import { Database } from '@sport-stream/common/src/database.types';
import { useAppQuery } from '@sport-stream/common';

export const useQuery_getContentById = (id?: number | null) => {
  return useAppQuery({
    queryKey: ['content', id],
    queryFn: async () => {
      const { data } = await supabase.from('content').select('*').eq('id', id!).single();
      return data;
    },
    enabled: !!id,
  });
};

export const useQuery_allContent = () => {
  return useAppQuery({
    queryKey: ['contents'],
    queryFn: async () => {
      const { data } = await supabase.from('content').select('*');
      return data;
    },
  });
};