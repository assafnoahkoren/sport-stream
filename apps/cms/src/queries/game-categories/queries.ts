import { useQuery } from '@tanstack/react-query';
import { Database } from '../../../../common/src/database.types';
import { useSupabaseClient } from '../../base-layers/supabase-layer';

type GameCategory = Database['public']['Tables']['game_categories']['Row'];

export const useQuery_getAllGameCategories = () => {
  const supabase = useSupabaseClient();

  return useQuery<GameCategory[], Error>({
    queryKey: ['gameCategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('game_categories')
        .select('*');

      if (error) throw error;
      return data;
    },
  });
};

export const useQuery_getGameCategoryById = (id: number | null) => {
  const supabase = useSupabaseClient();

  return useQuery<GameCategory | null, Error>({
    queryKey: ['gameCategory', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('game_categories')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};
