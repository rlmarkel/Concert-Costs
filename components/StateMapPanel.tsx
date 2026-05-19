import Link from "next/link";
import { formatDate } from "@/lib/concert-calculations";
import { stateDisplayName, type UsStateCode } from "@/lib/us-states";
import type { ConcertWithMetrics } from "@/types/concert";
import { ExternalLink, X } from "lucide-react";

type StateMapPanelProps = {
  state: UsStateCode;
  concerts: ConcertWithMetrics[];
  onClose: () => void;
};

export function StateMapPanel({ state, concerts, onClose }: StateMapPanelProps) {
  return (
    <div
      className="card-elevated absolute bottom-3 left-3 right-3 z-[1000] max-h-[45vh] overflow-hidden border border-base-300 bg-base-100 shadow-xl sm:left-auto sm:right-4 sm:top-4 sm:bottom-auto sm:w-80"
      role="dialog"
      aria-label={`Concerts in ${stateDisplayName(state)}`}
    >
      <div className="flex items-center justify-between border-b border-base-300 px-4 py-3">
        <h3 className="font-semibold">{stateDisplayName(state)}</h3>
        <button
          type="button"
          className="btn btn-ghost btn-xs btn-circle"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {concerts.length === 0 ? (
        <p className="px-4 py-6 text-sm text-base-content/60">
          No concerts logged in this state yet.
        </p>
      ) : (
        <ul className="max-h-[calc(45vh-3.5rem)] overflow-y-auto px-2 py-2">
          {concerts.map((concert) => (
            <li
              key={concert.id}
              className="rounded-lg px-2 py-2 hover:bg-base-200"
            >
              <div className="flex items-start justify-between gap-2">
                <Link
                  href={`/concerts?state=${state}&highlight=${concert.id}`}
                  className="min-w-0 flex-1 text-sm hover:text-primary"
                >
                  <span className="font-medium">{concert.concert_name}</span>
                  <span className="mt-0.5 block text-xs text-base-content/60">
                    {formatDate(concert.concert_date)}
                  </span>
                </Link>
                <Link
                  href={`/concerts/${concert.id}`}
                  className="btn btn-ghost btn-xs shrink-0 gap-1"
                  title="Open full details"
                >
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
