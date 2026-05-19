"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { friendlyAuthError } from "@/lib/friendly-errors";

type Mode = "login" | "signup";

export function AuthForm() {
  const router = useRouter();
  const supabase = createClient();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (mode === "signup") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      setLoading(false);
      if (signUpError) {
        toast.error(friendlyAuthError(signUpError.message));
        return;
      }
      toast.success(
        "Account created! If email confirmation is on, check your inbox, then log in."
      );
      setMode("login");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (signInError) {
      toast.error(friendlyAuthError(signInError.message));
      return;
    }
    toast.success("Welcome back!");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <article className="card-elevated w-full max-w-md border border-base-300/50 shadow-xl">
      <section className="card-body">
        <h2 className="card-title text-2xl">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="text-sm text-base-content/70">
          {mode === "login"
            ? "Log in to track your concerts and spending."
            : "Sign up free to start logging concerts."}
        </p>

        <div className="tabs tabs-boxed mt-3 bg-base-200 p-1">
          <button
            type="button"
            className={`tab flex-1 transition-colors ${mode === "login" ? "tab-active" : ""}`}
            onClick={() => setMode("login")}
          >
            Log in
          </button>
          <button
            type="button"
            className={`tab flex-1 transition-colors ${mode === "signup" ? "tab-active" : ""}`}
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-[5.5rem_1fr] items-center gap-3">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="input input-bordered input-md w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="grid grid-cols-[5.5rem_1fr] items-center gap-3">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input input-bordered input-md w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-md w-full active:scale-[0.98]"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Please wait…
              </>
            ) : mode === "login" ? (
              "Log in"
            ) : (
              "Sign up"
            )}
          </button>
        </form>
      </section>
    </article>
  );
}
