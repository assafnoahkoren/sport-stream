import { useAppMutation } from "@sport-stream/common";
import { Database } from "@sport-stream/common/src/database.types";
import supabase from "../supabase";
import { UseMutationOptions } from "react-query";

export const useMutation_updateContent = () => useAppMutation({
  mutationFn: async (content: Database['public']['Tables']['content']['Update']) => {
    const { data, error } = await supabase.from('content').upsert(content).select();
    return data;
  },
})

export const useMutation_deleteContent = () => useAppMutation({
  mutationFn: async (id: string) => {
    const { data, error } = await supabase.from('content').delete().eq('id', id);
    return data;
  },
})

export const useMutation_createContent = () => useAppMutation({
  mutationFn: async (content: Database['public']['Tables']['content']['Insert']) => {
    const { data, error } = await supabase.from('content').insert(content).select();
    return data;
  },
})

export const useMutation_upsertContent = (
  onSuccess: (data: Array<Database['public']['Tables']['content']['Row']>
  ) => void) => useAppMutation({
  mutationFn: async (content: Database['public']['Tables']['content']['Insert']) => {
    const { data, error } = await supabase.from('content').upsert(content).select();
    return data;
  },
  onSuccess: (data, variables, context) => {
    console.log('onSuccess', data, variables, context);
    
    if (!data) return;
    onSuccess(data);
  },
})
