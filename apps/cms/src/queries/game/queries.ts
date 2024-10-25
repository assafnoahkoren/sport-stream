import { useQuery } from '@tanstack/react-query';
import { Database } from '@sport-stream/common/src/database.types';
import supabase from "../supabase";
import { QueryData } from '@supabase/supabase-js';

type GameCategory = Database['public']['Tables']['games']['Row'];

export const useQuery_getAllGame = () => {

  return useQuery<GameCategory[], Error>({
    queryKey: ['games'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*');

      if (error) throw error;
      return data;
    },
  });
};



export const useQuery_getGameById = (id: number | null) => {
  return useQuery<GameCategory | null, Error>({
    queryKey: ['game', id],
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
