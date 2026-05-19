import { createClient } from "@/lib/supabase/server";
import { withMetrics } from "@/lib/concert-calculations";
import type { ConcertRow } from "@/lib/database.types";
import type { ConcertWithMetrics } from "@/types/concert";

export async function getUserConcerts(): Promise<ConcertWithMetrics[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("concerts")
    .select("*")
    .order("concert_date", { ascending: false });

  if (error) {
    console.error("Failed to load concerts:", error.message);
    return [];
  }

  return ((data ?? []) as ConcertRow[]).map(withMetrics);
}
