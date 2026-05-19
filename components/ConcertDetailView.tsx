import Link from "next/link";
import {
  formatCurrency,
  formatDate,
} from "@/lib/concert-calculations";
import { normalizeState, stateDisplayName } from "@/lib/us-states";
import type { ConcertWithMetrics } from "@/types/concert";
import { COST_CATEGORIES } from "@/types/concert";
import { MapPin, Pencil, Star } from "lucide-react";

export function ConcertDetailView({ concert }: { concert: ConcertWithMetrics }) {
  const stateCode = normalizeState(concert.state);
  const stateLabel = stateCode
    ? `${stateDisplayName(stateCode)} (${stateCode})`
    : concert.state;

  return (
    <article className="card-elevated">
      <section className="card-body gap-6">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="page-title">{concert.concert_name}</h1>
            <p className="page-subtitle">{concert.artist}</p>
          </div>
          <span className="badge badge-primary badge-lg gap-1">
            <Star className="h-4 w-4" />
            {concert.fun_rating}/10 fun
          </span>
        </header>

        <p className="flex items-center gap-2 text-base">
          <MapPin className="h-5 w-5 shrink-0 text-primary" />
          {concert.venue} · {concert.city}, {stateLabel}
        </p>
        <p className="text-lg font-medium">{formatDate(concert.concert_date)}</p>

        <div className="stats stats-vertical w-full bg-base-200/80 shadow-none sm:stats-horizontal">
          <div className="stat">
            <div className="stat-title">Total cost</div>
            <div className="stat-value text-primary">
              {formatCurrency(concert.totalCost)}
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Cost per hour</div>
            <div className="stat-value">{formatCurrency(concert.costPerHour)}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Fun pts / $100</div>
            <div className="stat-value">
              {concert.totalCost > 0
                ? concert.funPointsPer100.toFixed(2)
                : "N/A"}
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Distance from home</div>
            <div className="stat-value text-lg">
              {Number(concert.distance_from_home)} mi
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Hours at event</div>
            <div className="stat-value text-lg">
              {Number(concert.hours_at_event)} hrs
            </div>
          </div>
        </div>

        <div>
          <h2 className="section-heading mb-3">Cost breakdown</h2>
          <ul className="space-y-2">
            {COST_CATEGORIES.map(({ key, label }) => {
              const amount = Number(concert[key]);
              if (amount <= 0) return null;
              return (
                <li
                  key={key}
                  className="flex justify-between rounded-lg bg-base-200/60 px-3 py-2 text-sm"
                >
                  <span>{label}</span>
                  <span className="font-medium">{formatCurrency(amount)}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {concert.notes && (
          <div>
            <h2 className="section-heading mb-2">Notes</h2>
            <p className="rounded-lg border border-base-300 bg-base-200/50 p-4 text-sm">
              {concert.notes}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={`/concerts?state=${concert.state}&highlight=${concert.id}`}
            className="btn btn-primary btn-md"
          >
            View on My Concerts
          </Link>
          <Link
            href={`/concerts/${concert.id}/edit`}
            className="btn btn-outline btn-md gap-2"
          >
            <Pencil className="h-4 w-4" />
            Edit concert
          </Link>
          <Link href="/concerts" className="btn btn-ghost btn-md">
            All concerts
          </Link>
        </div>
      </section>
    </article>
  );
}

