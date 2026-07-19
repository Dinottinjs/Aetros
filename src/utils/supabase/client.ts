import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const safeUrl = supabaseUrl.startsWith('http') ? supabaseUrl : 'http://localhost';
  
  return createBrowserClient(
    safeUrl,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy_key'
  )
}
