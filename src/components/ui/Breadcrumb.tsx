import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      className={`flex items-center space-x-2 text-sm text-neutral-600 ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight size={16} className="mx-2 text-neutral-400" />
            )}
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="hover:text-amber-700 transition-colors duration-200 hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  index === items.length - 1
                    ? "text-neutral-800 font-medium"
                    : ""
                }
                aria-current={index === items.length - 1 ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
