export default function MapLoading() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="space-y-2">
        <div className="skeleton h-8 w-48" />
        <div className="skeleton h-4 w-72 max-w-full" />
      </div>
      <div className="card-elevated overflow-hidden border border-base-300">
        <div className="skeleton min-h-[420px] w-full sm:min-h-[520px]" />
      </div>
    </div>
  );
}
