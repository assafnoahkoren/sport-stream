import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Database } from '@sport-stream/common/src/database.types';
import supabase from '../supabase';

type GameCategoryInsert = Database['public']['Tables']['games']['Insert'];
type GameCategoryUpdate = Database['public']['Tables']['games']['Update'];

export const useMutation_insertGame = () => {
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
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};

export const useMutation_updateGame = () => {
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
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
};
