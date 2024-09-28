import { useAppMutation } from "@sport-stream/common";
import { Database } from "@sport-stream/common/src/database.types";
import supabase from "../supabase";

type Tag = Database['public']['Tables']['tags']['Insert'];

export const useMutation_upsertTag = (onSuccess: (data: Tag[]) => void) => useAppMutation({
  mutationFn: async (tag: Tag) => {
    const { data, error } = await supabase.from('tags').upsert(tag).select();
    return data;
  },
  onSuccess: (data) => {
    if (!data) { return; }
    onSuccess(data);
  },
})