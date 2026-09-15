import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Centres content on the 1240px design grid. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("container-page", className)} {...props} />;
}
