"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useProjectTransition } from "./ProjectTransitionProvider";

type ProjectTransitionLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "className" | "onClick"
> & {
  href: string;
  mediaSrc: string;
  mediaAlt: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

function shouldUseNativeNavigation(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey
  );
}

export function ProjectTransitionLink({
  href,
  mediaSrc,
  mediaAlt,
  className,
  ariaLabel,
  children,
  ...rest
}: ProjectTransitionLinkProps) {
  const router = useRouter();
  const { transitionTo } = useProjectTransition();

  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (shouldUseNativeNavigation(event)) {
      return;
    }

    const media = event.currentTarget.querySelector<HTMLElement>("[data-media]");
    if (!media) {
      return;
    }

    event.preventDefault();
    router.prefetch(href);
    await transitionTo(href, { src: mediaSrc, alt: mediaAlt, rect: media.getBoundingClientRect() }, () => {
      router.push(href);
    });
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
