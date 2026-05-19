import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  children: ReactNode;
  hint?: string;
};

export function FormField({ label, htmlFor, children, hint }: FormFieldProps) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-4">
      <label htmlFor={htmlFor} className="text-sm font-medium sm:pt-2">
        {label}
      </label>
      <div>
        {children}
        {hint && (
          <p className="mt-1.5 text-xs text-base-content/60">{hint}</p>
        )}
      </div>
    </div>
  );
}

export function SectionHeader({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 border-b border-base-300 pb-4">
      <span className="section-number">{number}</span>
      <div>
        <h2 className="section-heading">{title}</h2>
        <p className="mt-1 text-sm text-base-content/70">{description}</p>
      </div>
    </div>
  );
}
