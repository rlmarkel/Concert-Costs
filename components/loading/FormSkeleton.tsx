export function FormSkeleton() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton h-96 rounded-box" />
      ))}
      <div className="skeleton h-14 rounded-btn" />
    </div>
  );
}
