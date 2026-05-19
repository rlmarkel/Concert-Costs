import { getUserConcerts } from "@/lib/concerts";
import { ConcertsList } from "@/components/ConcertsList";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { PageTransition } from "@/components/PageTransition";

export default async function MyConcertsPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string; highlight?: string }>;
}) {
  const { state, highlight } = await searchParams;
  const concerts = await getUserConcerts();

  return (
    <PageTransition>
      <div className="space-y-8">
        <PageHeader
          title="My Concerts"
          subtitle="Every show you have logged, with costs and fun scores."
          action={{ href: "/add", label: "Add concert" }}
        />

        {concerts.length === 0 ? (
          <EmptyState variant="concerts" />
        ) : (
          <ConcertsList
            concerts={concerts}
            stateFilter={state}
            highlightId={highlight}
          />
        )}
      </div>
    </PageTransition>
  );
}
