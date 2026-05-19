import { redirect } from "next/navigation";
import { Music2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AppNav } from "@/components/AppNav";
import { LogoutButton } from "@/components/LogoutButton";
import { ThemeSelector } from "@/components/ThemeSelector";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-base-300 bg-base-100/95 shadow-sm backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Music2 className="h-6 w-6 text-primary" aria-hidden />
              <div>
                <h1 className="text-lg font-bold leading-tight sm:text-xl">
                  Concert Cost Tracker
                </h1>
                <p className="hidden text-xs text-base-content/60 sm:block">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeSelector className="max-w-[9rem]" />
              <LogoutButton />
            </div>
          </div>
          <nav className="mt-3 hidden sm:block">
            <AppNav />
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 pb-24 sm:pb-8">
        {children}
      </main>

      <div className="sm:hidden">
        <AppNav />
      </div>
    </div>
  );
}

