import { getUserConcerts } from "@/lib/concerts";
import { DashboardStats } from "@/components/DashboardStats";
import { DashboardCharts } from "@/components/DashboardCharts";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { PageTransition } from "@/components/PageTransition";

export default async function DashboardPage() {
  const concerts = await getUserConcerts();

  return (
    <PageTransition>
      <div className="space-y-10">
        <PageHeader
          title="Dashboard"
          subtitle="Log what you spend at live shows, rate the fun, and spot your best-value nights."
          action={{ href: "/add", label: "Add concert" }}
        />

        {concerts.length === 0 ? (
          <EmptyState variant="dashboard" />
        ) : (
          <>
            <DashboardStats concerts={concerts} />
            <DashboardCharts concerts={concerts} />
          </>
        )}
      </div>
    </PageTransition>
  );
}
