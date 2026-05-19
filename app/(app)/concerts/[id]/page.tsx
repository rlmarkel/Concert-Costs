import { notFound } from "next/navigation";
import { ConcertDetailView } from "@/components/ConcertDetailView";
import { PageHeader } from "@/components/PageHeader";
import { PageTransition } from "@/components/PageTransition";
import { getConcertById } from "@/lib/concerts";

export default async function ConcertDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const concert = await getConcertById(id);

  if (!concert) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl space-y-6">
        <PageHeader
          title="Concert details"
          subtitle={concert.concert_name}
          action={{ href: "/concerts", label: "Back to list" }}
        />
        <ConcertDetailView concert={concert} />
      </div>
    </PageTransition>
  );
}
