"use client";

import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";
import {
  orderLabel,
  SORT_FIELDS,
  type SortField,
  type SortState,
} from "@/lib/sort-concerts";

type ConcertSortBarProps = {
  count: number;
  sort: SortState;
  onFieldChange: (field: SortField) => void;
  onDirectionToggle: () => void;
};

export function ConcertSortBar({
  count,
  sort,
  onFieldChange,
  onDirectionToggle,
}: ConcertSortBarProps) {
  const label = orderLabel(sort.field, sort.direction);
  const isDescending = sort.direction === "desc";

  return (
    <div className="rounded-box border border-base-300/80 bg-base-100 p-4 shadow-sm">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <p className="text-sm font-semibold">
          {count} concert{count === 1 ? "" : "s"}
        </p>
        <p className="text-xs text-base-content/60">Sort & order</p>
      </div>

      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-base-content/50">
        Sort by
      </p>
      <div className="flex flex-wrap gap-2">
        {SORT_FIELDS.map(({ field, label: fieldLabel }) => {
          const active = sort.field === field;
          return (
            <button
              key={field}
              type="button"
              onClick={() => onFieldChange(field)}
              className={`btn btn-sm rounded-full transition-all ${
                active
                  ? "btn-primary"
                  : "btn-ghost border border-base-300 bg-base-200/50 hover:border-primary/40"
              }`}
              aria-pressed={active}
            >
              {fieldLabel}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-end border-t border-base-300/60 pt-4">
        <button
          type="button"
          onClick={onDirectionToggle}
          className="btn btn-outline btn-sm gap-2 active:scale-95"
          aria-label={`Change order. Currently ${label}. Click to reverse.`}
        >
          {isDescending ? (
            <ArrowDownWideNarrow className="h-4 w-4" aria-hidden />
          ) : (
            <ArrowUpWideNarrow className="h-4 w-4" aria-hidden />
          )}
          {label}
        </button>
      </div>
    </div>
  );
}
