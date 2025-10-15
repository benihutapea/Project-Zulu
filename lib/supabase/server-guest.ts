import type { Database } from "@/app/types/database.types"
import { createServerClient, type SupabaseClient } from "@supabase/ssr"
import { isSupabaseEnabled } from "./config"

export type TypedSupabaseClient = SupabaseClient<Database>

export async function createGuestServerClient(): Promise<TypedSupabaseClient | null> {
  if (!isSupabaseEnabled) {
    return null
  }

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!,
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
    }
  )
}
