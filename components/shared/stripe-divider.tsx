import { cn } from "@/lib/utils";

type StripeDividerProps = {
  /** Which physical edge carries the short lighter segment. */
  accent?: "left" | "right";
  className?: string;
};

/**
 * The 10px two-tone bar that caps the hero and the footer.
 * Kept on physical edges so it matches the Figma frame in both directions.
 */
export function StripeDivider({ accent = "left", className }: StripeDividerProps) {
  return (
    <div aria-hidden className={cn("flex h-[10px] w-full", className)} dir="ltr">
      {accent === "left" ? (
        <>
          <span className="w-[100px] shrink-0 bg-ocean" />
          <span className="flex-1 bg-ocean-dark" />
        </>
      ) : (
        <>
          <span className="flex-1 bg-ocean-dark" />
          <span className="w-[100px] shrink-0 bg-ocean" />
        </>
      )}
    </div>
  );
}
