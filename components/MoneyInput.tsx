type MoneyInputProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
};

export function MoneyInput({ id, value, onChange }: MoneyInputProps) {
  return (
    <label className="input input-bordered input-md flex w-full items-center gap-2">
      <span className="text-base-content/50">$</span>
      <input
        id={id}
        type="number"
        min="0"
        step="0.01"
        className="grow bg-transparent outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
