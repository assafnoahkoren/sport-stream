import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types';

// Create a single supabase client for interacting with your database
export const createSupabaseClient = (supabaseUrl: string, supabaseAnonKey: string) => createClient<Database>(supabaseUrl, supabaseAnonKey)

export default {
  createSupabaseClient
}