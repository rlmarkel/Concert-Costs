import Link from "next/link";

export default function ConcertNotFound() {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <h1 className="text-2xl font-bold">Concert not found</h1>
      <p className="mt-2 text-base-content/70">
        This concert may have been removed or you do not have access.
      </p>
      <Link href="/concerts" className="btn btn-primary btn-md mt-6">
        Back to My Concerts
      </Link>
    </div>
  );
}
