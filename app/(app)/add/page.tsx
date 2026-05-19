import { AddConcertForm } from "@/components/AddConcertForm";
import { PageHeader } from "@/components/PageHeader";
import { PageTransition } from "@/components/PageTransition";

export default function AddConcertPage() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <PageHeader
          title="Add Concert"
          subtitle="Log a show you attended — details, costs, and how much fun you had."
        />
        <AddConcertForm />
      </div>
    </PageTransition>
  );
}
