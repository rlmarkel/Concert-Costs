"use client";

import Link from "next/link";
import {
  formatCurrency,
  formatDate,
  getTopCostCategories,
  totalCost,
} from "@/lib/concert-calculations";
import { stateDisplayName, normalizeState } from "@/lib/us-states";
import type { ConcertWithMetrics } from "@/types/concert";
import { ExternalLink, MapPin, Pencil, Star } from "lucide-react";
import { motion } from "framer-motion";

function FunRatingBar({ rating }: { rating: number }) {
  const pct = (rating / 10) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-base-content/60">
        <span>Fun</span>
        <span className="font-medium text-base-content">{rating}/10</span>
      </div>
      <progress
        className="progress progress-primary mt-1 h-2 w-full"
        value={pct}
        max={100}
        aria-label={`Fun rating ${rating} out of 10`}
      />
    </div>
  );
}

function CostBreakdown({ concert }: { concert: ConcertWithMetrics }) {
  const categories = getTopCostCategories(concert, 4);
  const total = totalCost(concert) || 1;

  if (categories.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60">
        Cost breakdown
      </p>
      {categories.map((cat) => {
        const pct = Math.round((cat.amount / total) * 100);
        return (
          <div key={cat.label} className="space-y-0.5">
            <div className="flex justify-between text-xs">
              <span>{cat.label}</span>
              <span className="text-base-content/70">
                {formatCurrency(cat.amount)} ({pct}%)
              </span>
            </div>
            <progress
              className="progress progress-secondary h-1.5 w-full"
              value={pct}
              max={100}
            />
          </div>
        );
      })}
    </div>
  );
}

export function ConcertCard({
  concert,
  highlighted = false,
}: {
  concert: ConcertWithMetrics;
  highlighted?: boolean;
}) {
  const stateCode = normalizeState(concert.state);
  const stateLabel = stateCode
    ? stateDisplayName(stateCode)
    : concert.state;

  return (
    <motion.article
      id={`concert-${concert.id}`}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`card-interactive border-l-4 border-l-primary scroll-mt-28 ${
        highlighted
          ? "ring-2 ring-primary ring-offset-2 ring-offset-base-100"
          : ""
      }`}
    >
      <section className="card-body gap-4">
        <header className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h2 className="card-title text-lg leading-tight">
              <Link
                href={`/concerts/${concert.id}`}
                className="hover:text-primary"
              >
                {concert.concert_name}
              </Link>
            </h2>
            <p className="text-sm text-base-content/70">{concert.artist}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <Link
              href={`/concerts/${concert.id}`}
              className="btn btn-ghost btn-xs btn-square"
              title="Full details"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href={`/concerts/${concert.id}/edit`}
              className="btn btn-ghost btn-xs btn-square"
              title="Edit concert"
            >
              <Pencil className="h-4 w-4" />
            </Link>
            <span className="badge badge-primary gap-1">
              <Star className="h-3 w-3" />
              {concert.fun_rating}/10
            </span>
          </div>
        </header>

        <p className="flex items-center gap-1 text-sm text-base-content/80">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden />
          <span className="truncate">
            {concert.venue} · {concert.city}, {stateLabel}
          </span>
        </p>
        <p className="text-sm font-medium">{formatDate(concert.concert_date)}</p>

        <FunRatingBar rating={concert.fun_rating} />

        <div className="stats stats-vertical bg-base-200/80 shadow-none sm:stats-horizontal">
          <div className="stat py-2 px-3">
            <div className="stat-title text-xs">Total cost</div>
            <div className="stat-value text-base">
              {formatCurrency(concert.totalCost)}
            </div>
          </div>
          <div className="stat py-2 px-3">
            <div className="stat-title text-xs">Cost / hour</div>
            <div className="stat-value text-base">
              {formatCurrency(concert.costPerHour)}
            </div>
          </div>
          <div className="stat py-2 px-3">
            <div className="stat-title text-xs">Fun Pts / $100</div>
            <div className="stat-value text-base">
              {concert.totalCost > 0
                ? concert.funPointsPer100.toFixed(2)
                : "N/A"}
            </div>
          </div>
        </div>

        <CostBreakdown concert={concert} />

        {concert.notes && (
          <p className="rounded-lg border border-base-300 bg-base-200/50 p-3 text-sm italic text-base-content/80">
            {concert.notes}
          </p>
        )}
      </section>
    </motion.article>
  );
}
