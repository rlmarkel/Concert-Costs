"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { totalCost } from "@/lib/concert-calculations";
import { friendlyDbError } from "@/lib/friendly-errors";
import { FormField, SectionHeader } from "@/components/FormField";
import { MoneyInput } from "@/components/MoneyInput";
import type { ConcertInsert } from "@/lib/database.types";

const emptyForm = {
  concert_name: "",
  artist: "",
  venue: "",
  city: "",
  state: "",
  concert_date: "",
  distance_from_home: "0",
  hours_at_event: "3",
  ticket_cost: "0",
  ticket_fees: "0",
  parking_cost: "0",
  food_drink_cost: "0",
  merchandise_cost: "0",
  lodging_cost: "0",
  travel_cost: "0",
  other_cost: "0",
  fun_rating: "7",
  notes: "",
};

const COST_FIELDS = [
  ["ticket_cost", "Ticket cost"],
  ["ticket_fees", "Ticket fees"],
  ["parking_cost", "Parking cost"],
  ["food_drink_cost", "Food and drink"],
  ["merchandise_cost", "Merchandise"],
  ["lodging_cost", "Hotel or lodging"],
  ["travel_cost", "Travel or gas"],
  ["other_cost", "Other cost"],
] as const;

export function AddConcertForm() {
  const supabase = createClient();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const liveTotal = useMemo(() => {
    return totalCost({
      ticket_cost: Number(form.ticket_cost) || 0,
      ticket_fees: Number(form.ticket_fees) || 0,
      parking_cost: Number(form.parking_cost) || 0,
      food_drink_cost: Number(form.food_drink_cost) || 0,
      merchandise_cost: Number(form.merchandise_cost) || 0,
      lodging_cost: Number(form.lodging_cost) || 0,
      travel_cost: Number(form.travel_cost) || 0,
      other_cost: Number(form.other_cost) || 0,
    });
  }, [form]);

  function updateField(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("You must be logged in to save a concert.");
      setLoading(false);
      return;
    }

    const payload: ConcertInsert = {
      user_id: user.id,
      concert_name: form.concert_name.trim(),
      artist: form.artist.trim(),
      venue: form.venue.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      concert_date: form.concert_date,
      distance_from_home: Number(form.distance_from_home) || 0,
      hours_at_event: Number(form.hours_at_event) || 1,
      ticket_cost: Number(form.ticket_cost) || 0,
      ticket_fees: Number(form.ticket_fees) || 0,
      parking_cost: Number(form.parking_cost) || 0,
      food_drink_cost: Number(form.food_drink_cost) || 0,
      merchandise_cost: Number(form.merchandise_cost) || 0,
      lodging_cost: Number(form.lodging_cost) || 0,
      travel_cost: Number(form.travel_cost) || 0,
      other_cost: Number(form.other_cost) || 0,
      fun_rating: Number(form.fun_rating),
      notes: form.notes.trim() || null,
    };

    const { error: insertError } = await supabase.from("concerts").insert(payload);

    setLoading(false);

    if (insertError) {
      toast.error(friendlyDbError(insertError.message));
      return;
    }

    toast.success("Concert saved! Check My Concerts or the Dashboard.");
    setForm(emptyForm);
  }

  return (
    <form onSubmit={handleSubmit} className="relative mx-auto max-w-3xl space-y-6">
      <article className="card-elevated">
        <section className="card-body gap-5">
          <SectionHeader
            number={1}
            title="Concert details"
            description="Tell us where you went and when."
          />

          <FormField label="Concert name" htmlFor="concert_name">
            <input
              id="concert_name"
              className="input input-bordered input-md w-full"
              value={form.concert_name}
              onChange={(e) => updateField("concert_name", e.target.value)}
              required
            />
          </FormField>
          <FormField label="Artist or band" htmlFor="artist">
            <input
              id="artist"
              className="input input-bordered input-md w-full"
              value={form.artist}
              onChange={(e) => updateField("artist", e.target.value)}
              required
            />
          </FormField>
          <FormField label="Venue" htmlFor="venue">
            <input
              id="venue"
              className="input input-bordered input-md w-full"
              value={form.venue}
              onChange={(e) => updateField("venue", e.target.value)}
              required
            />
          </FormField>
          <FormField label="City" htmlFor="city">
            <input
              id="city"
              className="input input-bordered input-md w-full"
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
              required
            />
          </FormField>
          <FormField label="State" htmlFor="state">
            <input
              id="state"
              className="input input-bordered input-md w-full"
              value={form.state}
              onChange={(e) => updateField("state", e.target.value)}
              required
            />
          </FormField>
          <FormField label="Concert date" htmlFor="concert_date">
            <input
              id="concert_date"
              type="date"
              className="input input-bordered input-md w-full"
              value={form.concert_date}
              onChange={(e) => updateField("concert_date", e.target.value)}
              required
            />
          </FormField>
          <FormField
            label="Distance from home"
            htmlFor="distance_from_home"
            hint="Miles from your home."
          >
            <input
              id="distance_from_home"
              type="number"
              min="0"
              step="0.1"
              className="input input-bordered input-md w-full"
              value={form.distance_from_home}
              onChange={(e) =>
                updateField("distance_from_home", e.target.value)
              }
            />
          </FormField>
          <FormField
            label="Hours at event"
            htmlFor="hours_at_event"
            hint="Approximate time at the show."
          >
            <input
              id="hours_at_event"
              type="number"
              min="0.5"
              step="0.5"
              className="input input-bordered input-md w-full"
              value={form.hours_at_event}
              onChange={(e) => updateField("hours_at_event", e.target.value)}
              required
            />
          </FormField>
          <FormField label="Notes" htmlFor="notes">
            <textarea
              id="notes"
              className="textarea textarea-bordered w-full"
              rows={3}
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="Memories, surprises, who you went with…"
            />
          </FormField>
        </section>
      </article>

      <article className="card-elevated">
        <section className="card-body gap-5">
          <SectionHeader
            number={2}
            title="Costs"
            description="Enter what you spent. Leave blank fields as zero."
          />

          {COST_FIELDS.map(([key, label]) => (
            <FormField key={key} label={label} htmlFor={key}>
              <MoneyInput
                id={key}
                value={form[key]}
                onChange={(v) => updateField(key, v)}
              />
            </FormField>
          ))}
        </section>
      </article>

      <article className="card-elevated">
        <section className="card-body gap-5">
          <SectionHeader
            number={3}
            title="Fun rating"
            description="1 = Terrible Time, 10 = Best Time Ever."
          />
          <FormField label={`Rating: ${form.fun_rating}`} htmlFor="fun_rating">
            <input
              id="fun_rating"
              type="range"
              min={1}
              max={10}
              step={1}
              className="range range-primary"
              value={form.fun_rating}
              onChange={(e) => updateField("fun_rating", e.target.value)}
            />
            <div className="flex justify-between px-1 text-xs text-base-content/60">
              <span>1 — Terrible Time</span>
              <span>10 — Best Time Ever</span>
            </div>
          </FormField>
        </section>
      </article>

      <div className="sticky bottom-20 z-20 rounded-box border border-primary/30 bg-base-100/95 p-4 shadow-lg backdrop-blur sm:bottom-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase text-base-content/60">
              Total concert cost
            </p>
            <p className="text-2xl font-bold text-primary">
              ${liveTotal.toFixed(2)}
            </p>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-md min-w-[9rem] active:scale-95"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Saving…
              </>
            ) : (
              "Save concert"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
