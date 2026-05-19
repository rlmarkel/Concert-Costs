import type { ConcertRow } from "@/lib/database.types";

export type Concert = ConcertRow;

export type ConcertWithMetrics = Concert & {
  totalCost: number;
  costPerHour: number;
  funPointsPer100: number;
};

export const COST_CATEGORIES = [
  { key: "ticket_cost", label: "Tickets" },
  { key: "ticket_fees", label: "Ticket fees" },
  { key: "parking_cost", label: "Parking" },
  { key: "food_drink_cost", label: "Food & drink" },
  { key: "merchandise_cost", label: "Merchandise" },
  { key: "lodging_cost", label: "Hotel / lodging" },
  { key: "travel_cost", label: "Travel / gas" },
  { key: "other_cost", label: "Other" },
] as const;

export type CostCategoryKey = (typeof COST_CATEGORIES)[number]["key"];
