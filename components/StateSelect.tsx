import { US_STATE_OPTIONS } from "@/lib/us-states";

type StateSelectProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
};

export function StateSelect({
  id = "state",
  value,
  onChange,
  required = true,
  className = "select select-bordered select-md w-full",
}: StateSelectProps) {
  return (
    <select
      id={id}
      className={className}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    >
      <option value="" disabled>
        Select a state
      </option>
      {US_STATE_OPTIONS.map(({ value: code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
}
