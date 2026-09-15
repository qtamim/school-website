"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { PAGE_TRANSITION } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

type Phase = "idle" | "covering" | "waiting" | "revealing";

const COVER_MS = PAGE_TRANSITION.cover * 1000;
const REVEAL_MS = PAGE_TRANSITION.reveal * 1000;
const WAIT_TIMEOUT_MS = 2500;

/**
 * A direction-aware navy curtain that wipes start→end between routes.
 * Header and footer stay mounted outside this wrapper; only the page swaps.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const reduced = usePrefersReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const destination = useRef<string | null>(null);
  const phaseRef = useRef<Phase>("idle");
  const firstRoute = useRef(true);
  phaseRef.current = phase;

  const covering = phase === "covering" || phase === "waiting";

  const reveal = useCallback(() => {
    destination.current = null;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setPhase("revealing");
  }, []);

  const begin = useCallback(
    (href: string) => {
      if (reduced || phaseRef.current !== "idle") {
        router.push(href);
        return;
      }
      destination.current = href;
      setPhase("covering");
      router.push(href, { scroll: false });
    },
    [reduced, router]
  );

  useEffect(() => {
    firstRoute.current = false;
  }, []);

  useEffect(() => {
    if (reduced) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      if (!isInternalNavigation(anchor)) return;

      const next = new URL(anchor.href, window.location.href);
      const href = `${next.pathname}${next.search}`;
      if (href === `${window.location.pathname}${window.location.search}`) return;

      event.preventDefault();
      event.stopPropagation();
      begin(href);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [begin, reduced]);

  useEffect(() => {
    if (phase !== "covering") return;
    const timer = window.setTimeout(() => {
      const href = destination.current;
      if (
        href &&
        window.location.pathname === new URL(href, window.location.origin).pathname
      ) {
        reveal();
        return;
      }
      setPhase("waiting");
    }, COVER_MS);
    return () => window.clearTimeout(timer);
  }, [phase, reveal]);

  useEffect(() => {
    if (!destination.current) return;
    const dest = new URL(destination.current, window.location.origin);
    if (pathname !== dest.pathname) return;
    if (phaseRef.current !== "waiting") return;
    reveal();
  }, [pathname, reveal]);

  useEffect(() => {
    if (phase !== "waiting") return;
    const timer = window.setTimeout(reveal, WAIT_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [phase, reveal]);

  useEffect(() => {
    if (phase !== "revealing") return;
    const timer = window.setTimeout(() => setPhase("idle"), REVEAL_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    const busy = phase !== "idle";
    document.body.toggleAttribute("aria-busy", busy);
    document.documentElement.classList.toggle("overflow-hidden", busy);
    return () => {
      document.body.removeAttribute("aria-busy");
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [phase]);

  return (
    <>
      <div
        key={pathname}
        className={cn("flex flex-col gap-gutter", !firstRoute.current && "page-enter")}
      >
        {children}
      </div>

      {phase !== "idle" && (
        <div
          className={cn(
            "fixed inset-0 z-[80]",
            covering ? "pointer-events-auto" : "pointer-events-none"
          )}
          aria-hidden
        >
          <div
            className={cn(
              "page-curtain-panel relative h-full w-full bg-deep",
              !covering && "is-revealing"
            )}
          >
            <span
              className={cn(
                "absolute inset-y-0 flex",
                covering ? "end-0" : "start-0"
              )}
            >
              {covering ? (
                <>
                  <span className="h-full w-[100px] bg-ocean-dark" />
                  <span className="h-full w-2.5 bg-grass" />
                </>
              ) : (
                <>
                  <span className="h-full w-2.5 bg-grass" />
                  <span className="h-full w-[100px] bg-ocean-dark" />
                </>
              )}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

function isInternalNavigation(anchor: HTMLAnchorElement) {
  if (anchor.hasAttribute("download")) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.origin !== window.location.origin) return false;
  const rel = anchor.getAttribute("rel") ?? "";
  if (rel.includes("external")) return false;
  return Boolean(anchor.pathname);
}
