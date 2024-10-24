import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Database } from '../../../../common/src/database.types';
import { useSupabaseClient } from '../../base-layers/supabase-layer';

type GameCategoryInsert = Database['public']['Tables']['game_categories']['Insert'];
type GameCategoryUpdate = Database['public']['Tables']['game_categories']['Update'];

export const useMutation_insertGameCategory = () => {
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

  return useMutation<GameCategoryInsert, Error, GameCategoryInsert>({
    mutationFn: async (newGameCategory) => {
      const { data, error } = await supabase
        .from('game_categories')
        .insert(newGameCategory)
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['gameCategories']);
    },
  });
};

export const useMutation_updateGameCategory = () => {
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

  return useMutation<GameCategoryUpdate, Error, { id: number; updates: GameCategoryUpdate }>({
    mutationFn: async ({ id, updates }) => {
      const { data, error } = await supabase
        .from('game_categories')
        .update(updates)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['gameCategories']);
    },
  });
};
