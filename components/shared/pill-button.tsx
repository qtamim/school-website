import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PillButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** The green call-to-action used by the news and gallery sections. */
export function PillButton({ href, children, className }: PillButtonProps) {
  return (
    <Button
      asChild
      className={cn(
        "h-11 rounded-[12px] bg-grass px-8 text-base font-bold text-white",
        "hover:bg-grass/90 focus-visible:ring-grass/40 sm:text-lg",
        className
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
