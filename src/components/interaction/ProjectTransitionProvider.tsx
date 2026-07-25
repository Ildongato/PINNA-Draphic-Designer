"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import styles from "./ProjectTransitionProvider.module.css";

type TransitionMedia = {
  src: string;
  alt: string;
  rect: DOMRect;
};

type TransitionContextValue = {
  transitionTo: (href: string, media: TransitionMedia, navigate: () => void) => Promise<void>;
};

const ProjectTransitionContext = createContext<TransitionContextValue | null>(null);

type OverlayState = {
  src: string;
  alt: string;
  rect: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
};

function getDestinationRect() {
  const pageX = Math.max(18, Math.min(window.innerWidth * 0.028, 56));
  const top = Math.max(76, Math.min(window.innerHeight * 0.14, 118));
  const width = window.innerWidth - pageX * 2;
  const height = Math.min(window.innerHeight * 0.72, width * 0.72);

  return { left: pageX, top, width, height };
}

function decodeImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.src = src;
    image.decode().then(() => resolve(), () => resolve());
  });
}

export function ProjectTransitionProvider({ children }: { children: React.ReactNode }) {
  const [overlay, setOverlay] = useState<OverlayState | null>(null);
  const cloneRef = useRef<HTMLDivElement | null>(null);
  const runningRef = useRef(false);
  const cleanupRef = useRef<number | null>(null);

  const clearOverlay = useCallback(() => {
    if (cleanupRef.current !== null) {
      window.clearTimeout(cleanupRef.current);
      cleanupRef.current = null;
    }
    runningRef.current = false;
    setOverlay(null);
  }, []);

  const transitionTo = useCallback(
    async (href: string, media: TransitionMedia, navigate: () => void) => {
      if (runningRef.current) {
        navigate();
        return;
      }

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        navigate();
        return;
      }

      runningRef.current = true;
      await decodeImage(media.src);

      setOverlay({
        src: media.src,
        alt: media.alt,
        rect: {
          left: media.rect.left,
          top: media.rect.top,
          width: media.rect.width,
          height: media.rect.height
        }
      });

      window.requestAnimationFrame(() => {
        const node = cloneRef.current;

        if (!node) {
          clearOverlay();
          navigate();
          return;
        }

        const from = media.rect;
        const to = getDestinationRect();
        const animation = node.animate(
          [
            { transform: "translate3d(0, 0, 0) scale(1)", opacity: 1 },
            {
              transform: `translate3d(${to.left - from.left}px, ${to.top - from.top}px, 0) scale(${to.width / from.width}, ${to.height / from.height})`,
              opacity: 1
            }
          ],
          {
            duration: 760,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "forwards"
          }
        );

        const routeTimer = window.setTimeout(navigate, 110);
        cleanupRef.current = window.setTimeout(clearOverlay, 1500);

        const finish = () => {
          window.clearTimeout(routeTimer);
          node
            .animate([{ opacity: 1 }, { opacity: 0 }], {
              duration: 220,
              easing: "linear",
              fill: "forwards"
            })
            .finished.then(clearOverlay, clearOverlay);
        };

        const readyHandler = () => finish();
        window.addEventListener("pinna:project-hero-ready", readyHandler, { once: true });

        animation.finished.catch(() => {
          window.removeEventListener("pinna:project-hero-ready", readyHandler);
          clearOverlay();
        });
      });
    },
    [clearOverlay]
  );

  return (
    <ProjectTransitionContext.Provider value={{ transitionTo }}>
      {children}
      {overlay ? (
        <div className={styles.overlay} aria-hidden="true">
          <div
            ref={cloneRef}
            className={styles.clone}
            style={{
              left: overlay.rect.left,
              top: overlay.rect.top,
              width: overlay.rect.width,
              height: overlay.rect.height
            }}
          >
            <img src={overlay.src} alt={overlay.alt} />
          </div>
        </div>
      ) : null}
    </ProjectTransitionContext.Provider>
  );
}

export function useProjectTransition() {
  const context = useContext(ProjectTransitionContext);

  if (!context) {
    throw new Error("useProjectTransition must be used inside ProjectTransitionProvider");
  }

  return context;
}
