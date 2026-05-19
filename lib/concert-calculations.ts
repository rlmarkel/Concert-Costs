import type { Concert, ConcertWithMetrics } from "@/types/concert";
import { COST_CATEGORIES, type CostCategoryKey } from "@/types/concert";

export function totalCost(concert: Pick<Concert, CostCategoryKey>): number {
  return (
    Number(concert.ticket_cost) +
    Number(concert.ticket_fees) +
    Number(concert.parking_cost) +
    Number(concert.food_drink_cost) +
    Number(concert.merchandise_cost) +
    Number(concert.lodging_cost) +
    Number(concert.travel_cost) +
    Number(concert.other_cost)
  );
}

export function costPerHour(concert: Concert): number {
  const hours = Number(concert.hours_at_event);
  const total = totalCost(concert);
  if (hours <= 0) return 0;
  return total / hours;
}

export function funPointsPer100(concert: Concert): number {
  const total = totalCost(concert);
  if (total <= 0) return 0;
  return (concert.fun_rating / total) * 100;
}

export function withMetrics(concert: Concert): ConcertWithMetrics {
  return {
    ...concert,
    totalCost: totalCost(concert),
    costPerHour: costPerHour(concert),
    funPointsPer100: funPointsPer100(concert),
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function truncateLabel(text: string, max = 18): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
}

export function getTopCostCategories(
  concert: Concert,
  limit = 3
): { label: string; amount: number }[] {
  return COST_CATEGORIES.map(({ key, label }) => ({
    label,
    amount: Number(concert[key]),
  }))
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
}

export function aggregateCategorySpending(concerts: Concert[]) {
  return COST_CATEGORIES.map(({ key, label }) => ({
    category: label,
    amount: concerts.reduce((sum, c) => sum + Number(c[key]), 0),
  })).filter((item) => item.amount > 0);
}

export function dashboardSummary(concerts: ConcertWithMetrics[]) {
  if (concerts.length === 0) {
    return null;
  }

  const totalSpent = concerts.reduce((sum, c) => sum + c.totalCost, 0);
  const avgCost = totalSpent / concerts.length;
  const avgFun =
    concerts.reduce((sum, c) => sum + c.fun_rating, 0) / concerts.length;
  const avgCostPerHour =
    concerts.reduce((sum, c) => sum + c.costPerHour, 0) / concerts.length;

  const bestValue = [...concerts].sort(
    (a, b) => b.funPointsPer100 - a.funPointsPer100
  )[0];
  const mostExpensive = [...concerts].sort(
    (a, b) => b.totalCost - a.totalCost
  )[0];
  const highestFun = [...concerts].sort(
    (a, b) => b.fun_rating - a.fun_rating
  )[0];

  return {
    totalConcerts: concerts.length,
    totalSpent,
    avgCost,
    avgFun,
    avgCostPerHour,
    bestValue,
    mostExpensive,
    highestFun,
  };
}
