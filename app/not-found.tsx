import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-panel relative w-full max-w-xl overflow-hidden rounded-3xl border border-dark-4/60 p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-accent-cool/10 blur-3xl" />
        <div className="relative flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary-500/30 bg-dark-3/80">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-primary-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <div>
              <h2 className="text-heading3-bold text-light-1">Page not found</h2>
              <p className="text-base-regular text-light-3">
                We couldn&apos;t find that page. It may have been moved or removed.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-primary-500 px-6 py-2 text-base-semibold text-light-1 transition-all duration-200 hover:bg-primary-500/80 hover:shadow-lg hover:shadow-primary-500/25 active:scale-95"
            >
              Back to Relay
            </Link>
            <span className="text-subtle-medium text-light-4">Return home and pick up where you left off.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
