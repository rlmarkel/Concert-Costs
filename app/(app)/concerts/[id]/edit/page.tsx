import { notFound } from "next/navigation";
import {
  ConcertForm,
  concertToFormValues,
} from "@/components/ConcertForm";
import { PageHeader } from "@/components/PageHeader";
import { PageTransition } from "@/components/PageTransition";
import { getConcertById } from "@/lib/concerts";
import { normalizeState } from "@/lib/us-states";

export default async function EditConcertPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const concert = await getConcertById(id);

  if (!concert) {
    notFound();
  }

  const values = concertToFormValues(concert);
  const stateCode = normalizeState(concert.state);
  if (stateCode) {
    values.state = stateCode;
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader
          title="Edit concert"
          subtitle={concert.concert_name}
          action={{ href: `/concerts/${id}`, label: "View details" }}
        />
        <ConcertForm mode="edit" concertId={id} initialValues={values} />
      </div>
    </PageTransition>
  );
}
