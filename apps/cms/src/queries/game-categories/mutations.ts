import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Database } from '../../../../common/src/database.types';
import supabase from '../supabase';

type GameCategoryInsert = Database['public']['Tables']['games']['Insert'];
type GameCategoryUpdate = Database['public']['Tables']['games']['Update'];

export const useMutation_insertGameCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<GameCategoryInsert, Error, GameCategoryInsert>({
    mutationFn: async (newGameCategory) => {
      const { data, error } = await supabase
        .from('games')
        .insert(newGameCategory)
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameCategories'] });
    },
  });
};

export const useMutation_updateGameCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<GameCategoryUpdate, Error, { id: number; updates: GameCategoryUpdate }>({
    mutationFn: async ({ id, updates }) => {
      const { data, error } = await supabase
        .from('games')
        .update(updates)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameCategories'] });
    },
  });
};
