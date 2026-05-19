import { getUserConcerts } from "@/lib/concerts";
import { ConcertCard } from "@/components/ConcertCard";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { PageTransition, StaggerChildren, StaggerItem } from "@/components/PageTransition";

export default async function MyConcertsPage() {
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
          <StaggerChildren className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {concerts.map((concert) => (
              <StaggerItem key={concert.id}>
                <ConcertCard concert={concert} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}
      </div>
    </PageTransition>
  );
}
