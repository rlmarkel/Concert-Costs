import { Music } from "lucide-react";
import { AuthForm } from "@/components/AuthForm";
import { ThemeSelector } from "@/components/ThemeSelector";
import { PageTransition } from "@/components/PageTransition";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/25 via-base-200 to-secondary/20">
      <div
        className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"
        aria-hidden
      />

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-6">
        <span className="text-sm font-semibold tracking-wide text-base-content/80">
          Concert Cost Tracker
        </span>
        <ThemeSelector className="max-w-[10rem]" />
      </header>

      <PageTransition>
        <section className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 pb-20 pt-4 lg:flex-row lg:items-center lg:justify-between lg:pt-8">
          <article className="max-w-xl text-center lg:text-left">
            <p className="mb-4 inline-flex animate-pulse items-center gap-2 rounded-full border border-base-300 bg-base-100/80 px-4 py-1.5 text-sm shadow-sm backdrop-blur">
              <Music className="h-4 w-4 text-primary" aria-hidden />
              Your concerts, your costs, your fun
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Concert Cost Tracker
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-base-content/80">
              Remember every show you attend — what you spent, how long you
              stayed, and how much fun you had. See which concerts were worth
              every penny.
            </p>
          </article>

          <AuthForm />
        </section>
      </PageTransition>
    </main>
  );
}
