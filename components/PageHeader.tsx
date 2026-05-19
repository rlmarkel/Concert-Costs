import Link from "next/link";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: {
    href: string;
    label: string;
  };
};

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="page-title">{title}</h2>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {action && (
        <Link href={action.href} className="btn btn-primary btn-md shrink-0">
          {action.label}
        </Link>
      )}
    </header>
  );
}
