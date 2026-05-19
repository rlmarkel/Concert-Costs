"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

const THEMES = [
  "light",
  "dark",
  "cupcake",
  "synthwave",
  "retro",
  "forest",
  "aqua",
  "lofi",
  "cyberpunk",
] as const;

const STORAGE_KEY = "concert-cost-theme";

export function ThemeSelector({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) ?? "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  function handleChange(next: string) {
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <label className={`form-control w-full max-w-xs ${className}`}>
      <div className="label py-0">
        <span className="label-text flex items-center gap-1 text-xs">
          <Palette className="h-3.5 w-3.5" />
          Theme
        </span>
      </div>
      <select
        className="select select-bordered select-sm w-full"
        value={theme}
        onChange={(e) => handleChange(e.target.value)}
        aria-label="Choose app theme"
      >
        {THEMES.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </label>
  );
}
