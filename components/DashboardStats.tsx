"use client";

import {
  DollarSign,
  Music,
  Sparkles,
  Clock,
  TrendingUp,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { formatCurrency, dashboardSummary, truncateLabel } from "@/lib/concert-calculations";
import type { ConcertWithMetrics } from "@/types/concert";
import { StaggerChildren, StaggerItem } from "@/components/PageTransition";

function HeroStat({
  title,
  value,
  desc,
  icon: Icon,
}: {
  title: string;
  value: string;
  desc: string;
  icon: LucideIcon;
}) {
  return (
    <article className="card-elevated border border-primary/20 bg-gradient-to-br from-primary/10 to-base-100 p-6">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-base-content/60">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold leading-tight">{value}</p>
          <p className="mt-1 text-sm text-base-content/70">{desc}</p>
        </div>
        <div className="rounded-box bg-primary/15 p-3">
          <Icon className="h-6 w-6 text-primary" aria-hidden />
        </div>
      </div>
    </article>
  );
}

function MiniStat({
  title,
  value,
  desc,
  icon: Icon,
}: {
  title: string;
  value: string;
  desc: string;
  icon: LucideIcon;
}) {
  return (
    <article className="card-elevated p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0 text-primary opacity-80" aria-hidden />
        <p className="text-xs font-medium text-base-content/60">{title}</p>
      </div>
      <p className="mt-2 text-lg font-semibold leading-tight" title={value}>
        {value}
      </p>
      <p className="mt-1 text-xs text-base-content/60">{desc}</p>
    </article>
  );
}

export function DashboardStats({ concerts }: { concerts: ConcertWithMetrics[] }) {
  const summary = dashboardSummary(concerts);

  if (!summary) {
    return null;
  }

  const hero = [
    {
      title: "Total spent",
      value: formatCurrency(summary.totalSpent),
      desc: "Across all concerts",
      icon: DollarSign,
    },
    {
      title: "Total concerts",
      value: String(summary.totalConcerts),
      desc: "Shows you've logged",
      icon: Music,
    },
    {
      title: "Avg fun rating",
      value: `${summary.avgFun.toFixed(1)} / 10`,
      desc: "How much fun on average",
      icon: Sparkles,
    },
  ];

  const mini = [
    {
      title: "Avg cost per concert",
      value: formatCurrency(summary.avgCost),
      desc: "Typical night out",
      icon: DollarSign,
    },
    {
      title: "Avg cost per hour",
      value: formatCurrency(summary.avgCostPerHour),
      desc: "Across all shows",
      icon: Clock,
    },
    {
      title: "Best value",
      value: truncateLabel(summary.bestValue.concert_name, 22),
      desc: `${summary.bestValue.funPointsPer100.toFixed(2)} Fun Pts / $100`,
      icon: Trophy,
    },
    {
      title: "Most expensive",
      value: truncateLabel(summary.mostExpensive.concert_name, 22),
      desc: formatCurrency(summary.mostExpensive.totalCost),
      icon: TrendingUp,
    },
    {
      title: "Highest fun",
      value: truncateLabel(summary.highestFun.concert_name, 22),
      desc: `${summary.highestFun.fun_rating}/10 rating`,
      icon: Sparkles,
    },
  ];

  return (
    <StaggerChildren className="space-y-6">
      <StaggerItem>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {hero.map((stat) => (
            <HeroStat key={stat.title} {...stat} />
          ))}
        </div>
      </StaggerItem>
      <StaggerItem>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {mini.map((stat) => (
            <MiniStat key={stat.title} {...stat} />
          ))}
        </div>
      </StaggerItem>
    </StaggerChildren>
  );
}
