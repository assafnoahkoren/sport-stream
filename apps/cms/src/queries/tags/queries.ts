import { useAppQuery } from "@sport-stream/common";
import supabase from "../supabase";

export const useQuery_getTagById = (id?: number | null) => {
  return useAppQuery({
    queryKey: ['tag', id],
    queryFn: async () => {
      const { data } = await supabase.from('tags').select('*').eq('id', id!).single();
      return data;
    },
    enabled: !!id,
  });
};

export const useQuery_allTags = () => {
  return useAppQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data } = await supabase.from('tags').select('*');
      return data;
    },
  });
};

export const useQuery_getTagsByType = (type: string) => {
  return useAppQuery({
    queryKey: ['tags', type],
    queryFn: async () => {
      const { data } = await supabase.from('tags').select('*').eq('type', type);
      return data;
    },
    enabled: !!type,
  });
};
