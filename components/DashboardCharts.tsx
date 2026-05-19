"use client";

import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  aggregateCategorySpending,
  truncateLabel,
} from "@/lib/concert-calculations";
import type { ConcertWithMetrics } from "@/types/concert";
import { StaggerChildren, StaggerItem } from "@/components/PageTransition";

const CHART_COLORS = {
  primary: "oklch(var(--p) / 1)",
  secondary: "oklch(var(--s) / 1)",
  accent: "oklch(var(--a) / 1)",
  success: "oklch(var(--su) / 1)",
};

function ChartCard({
  title,
  children,
  empty,
}: {
  title: string;
  children: ReactNode;
  empty?: boolean;
}) {
  return (
    <article className="card-elevated overflow-hidden">
      <section className="card-body">
        <h3 className="font-semibold">{title}</h3>
        {empty ? (
          <p className="py-12 text-center text-sm text-base-content/60">
            Add concerts to see this chart.
          </p>
        ) : (
          <div className="h-64 w-full min-w-0 overflow-x-auto">{children}</div>
        )}
      </section>
    </article>
  );
}

export function DashboardCharts({
  concerts,
}: {
  concerts: ConcertWithMetrics[];
}) {
  const categoryData = aggregateCategorySpending(concerts);
  const hasConcerts = concerts.length > 0;

  const byConcert = concerts.map((c) => ({
    name: truncateLabel(c.concert_name),
    totalCost: c.totalCost,
    funRating: c.fun_rating,
    funPer100: c.funPointsPer100,
  }));

  return (
    <StaggerChildren className="space-y-4">
      <h3 className="text-lg font-semibold">Charts</h3>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StaggerItem>
          <ChartCard
            title="Spending by cost category"
            empty={categoryData.length === 0}
          >
            {!categoryData.length ? null : (
              <ResponsiveContainer width="100%" height="100%" minWidth={280}>
                <BarChart
                  data={categoryData}
                  margin={{ left: 8, right: 8, bottom: 48 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 11 }}
                    angle={-25}
                    textAnchor="end"
                    interval={0}
                    height={56}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(v: number) => [`$${v.toFixed(2)}`, "Spent"]}
                  />
                  <Bar
                    dataKey="amount"
                    fill={CHART_COLORS.primary}
                    radius={[4, 4, 0, 0]}
                    animationDuration={600}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </StaggerItem>

        <StaggerItem>
          <ChartCard title="Total cost by concert" empty={!hasConcerts}>
            {!hasConcerts ? null : (
              <ResponsiveContainer width="100%" height="100%" minWidth={280}>
                <BarChart
                  data={byConcert}
                  margin={{ left: 8, right: 8, bottom: 44 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    angle={-20}
                    textAnchor="end"
                    height={48}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(v: number) => [`$${v.toFixed(2)}`, "Total"]}
                  />
                  <Bar
                    dataKey="totalCost"
                    fill={CHART_COLORS.secondary}
                    radius={[4, 4, 0, 0]}
                    animationDuration={600}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </StaggerItem>

        <StaggerItem>
          <ChartCard title="Fun rating by concert" empty={!hasConcerts}>
            {!hasConcerts ? null : (
              <ResponsiveContainer width="100%" height="100%" minWidth={280}>
                <BarChart
                  data={byConcert}
                  margin={{ left: 8, right: 8, bottom: 44 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    angle={-20}
                    textAnchor="end"
                    height={48}
                  />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => [v, "Fun rating"]} />
                  <Bar
                    dataKey="funRating"
                    fill={CHART_COLORS.accent}
                    radius={[4, 4, 0, 0]}
                    animationDuration={600}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </StaggerItem>

        <StaggerItem>
          <ChartCard
            title="Fun Points per $100 by concert"
            empty={!hasConcerts}
          >
            {!hasConcerts ? null : (
              <ResponsiveContainer width="100%" height="100%" minWidth={280}>
                <BarChart
                  data={byConcert}
                  margin={{ left: 8, right: 8, bottom: 44 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    angle={-20}
                    textAnchor="end"
                    height={48}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(v: number) => [
                      v.toFixed(2),
                      "Fun Points per $100",
                    ]}
                  />
                  <Bar
                    dataKey="funPer100"
                    fill={CHART_COLORS.success}
                    radius={[4, 4, 0, 0]}
                    animationDuration={600}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </StaggerItem>
      </div>
    </StaggerChildren>
  );
}
