import { useQuery } from '@tanstack/react-query';
import { Database } from '../../../../common/src/database.types';
import supabase from "../supabase";

type GameCategory = Database['public']['Tables']['games']['Row'];

export const useQuery_getAllGameCategories = () => {

  return useQuery<GameCategory[], Error>({
    queryKey: ['gameCategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*');

      if (error) throw error;
      return data;
    },
  });
};

export const useQuery_getGameCategoryById = (id: number | null) => {
  return useQuery<GameCategory | null, Error>({
    queryKey: ['gameCategory', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};
