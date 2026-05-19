import Link from "next/link";
import { BarChart3, ListMusic, Music2, PlusCircle } from "lucide-react";

type EmptyStateVariant = "dashboard" | "concerts" | "generic";

const copy: Record<
  EmptyStateVariant,
  { title: string; description: string; icon: typeof Music2 }
> = {
  dashboard: {
    title: "No concerts logged yet",
    description:
      "Add your first concert to start seeing your dashboard, stats, and charts.",
    icon: BarChart3,
  },
  concerts: {
    title: "Your concert list is empty",
    description:
      "Every show you log will show up here with costs, fun scores, and value metrics.",
    icon: ListMusic,
  },
  generic: {
    title: "No concerts logged yet",
    description:
      "Add your first concert to start seeing your dashboard.",
    icon: Music2,
  },
};

export function EmptyState({
  variant = "generic",
}: {
  variant?: EmptyStateVariant;
}) {
  const { title, description, icon: Icon } = copy[variant];

  return (
    <article className="card-elevated border border-dashed border-base-300">
      <section className="card-body items-center py-14 text-center">
        <div className="rounded-full bg-primary/10 p-5">
          <Icon className="h-12 w-12 text-primary" aria-hidden />
        </div>
        <h2 className="mt-4 text-xl font-bold">{title}</h2>
        <p className="mt-2 max-w-md text-base-content/70">{description}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/add"
            className="btn btn-primary btn-md gap-2 active:scale-95"
          >
            <PlusCircle className="h-4 w-4" />
            Add your first concert
          </Link>
          <Link
            href="/dashboard"
            className="btn btn-ghost btn-md active:scale-95"
          >
            Back to dashboard
          </Link>
        </div>
      </section>
    </article>
  );
}
