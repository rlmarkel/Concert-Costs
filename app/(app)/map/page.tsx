import { ConcertMapClient } from "@/components/ConcertMapClient";
import { PageHeader } from "@/components/PageHeader";
import { PageTransition } from "@/components/PageTransition";
import { getUserConcerts } from "@/lib/concerts";

export default async function ConcertMapPage() {
  const concerts = await getUserConcerts();

  return (
    <PageTransition>
      <div className="space-y-8">
        <PageHeader
          title="Concert Map"
          subtitle="Hover or tap a state to see concerts you logged there."
        />
        <ConcertMapClient concerts={concerts} />
      </div>
    </PageTransition>
  );
}
