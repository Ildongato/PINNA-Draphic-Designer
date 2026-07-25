"use client";

import { useEffect, useRef } from "react";
import styles from "./PinnaField.module.css";

const curves = [
  { d: "M34 24 C 260 -4, 520 73.5, 900 47.5", width: 3.5, opacity: 0.42 },
  { d: "M34 46 C 278 18, 568 107.5, 900 81.5", width: 2, opacity: 0.52 },
  { d: "M34 68 C 296 40, 616 141.5, 900 115.5", width: 2, opacity: 0.62 },
  { d: "M34 90 C 314 62, 552 175.5, 900 149.5", width: 2, opacity: 0.72 },
  { d: "M34 112 C 332 84, 600 149.5, 900 123.5", width: 3.5, opacity: 0.82 },
  { d: "M34 134 C 260 106, 536 183.5, 900 157.5", width: 2, opacity: 0.42 },
  { d: "M34 156 C 278 128, 584 217.5, 900 191.5", width: 2, opacity: 0.52 },
  { d: "M34 178 C 296 150, 520 251.5, 900 225.5", width: 2, opacity: 0.62 },
  { d: "M34 200 C 314 172, 568 225.5, 900 199.5", width: 3.5, opacity: 0.72 },
  { d: "M34 222 C 332 194, 616 259.5, 900 233.5", width: 2, opacity: 0.82 },
  { d: "M34 244 C 260 216, 552 293.5, 900 267.5", width: 2, opacity: 0.42 },
  { d: "M34 266 C 278 238, 600 327.5, 900 301.5", width: 2, opacity: 0.52 },
  { d: "M34 288 C 296 260, 536 301.5, 900 275.5", width: 3.5, opacity: 0.62 },
  { d: "M34 310 C 314 282, 584 335.5, 900 309.5", width: 2, opacity: 0.72 },
  { d: "M34 332 C 332 304, 520 369.5, 900 343.5", width: 2, opacity: 0.82 },
  { d: "M34 354 C 260 326, 568 403.5, 900 377.5", width: 2, opacity: 0.42 },
  { d: "M34 376 C 278 348, 616 377.5, 900 351.5", width: 3.5, opacity: 0.52 },
  { d: "M34 398 C 296 370, 552 411.5, 900 385.5", width: 2, opacity: 0.62 },
  { d: "M34 420 C 314 392, 600 445.5, 900 419.5", width: 2, opacity: 0.72 },
  { d: "M34 442 C 332 414, 536 479.5, 900 453.5", width: 2, opacity: 0.82 },
  { d: "M34 464 C 260 436, 584 453.5, 900 427.5", width: 3.5, opacity: 0.42 },
  { d: "M34 486 C 278 458, 520 487.5, 900 461.5", width: 2, opacity: 0.52 }
];

export function PinnaField({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);
  const visible = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    const fieldNode: HTMLDivElement = node;

    const canMove =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canMove) {
      return;
    }

    function write() {
      frame.current = null;
      if (!visible.current || document.hidden) {
        return;
      }

      current.current.x += (target.current.x - current.current.x) * 0.14;
      current.current.y += (target.current.y - current.current.y) * 0.14;
      fieldNode.style.setProperty("--field-x-a", `${(current.current.x * 0.45).toFixed(2)}px`);
      fieldNode.style.setProperty("--field-y-a", `${(current.current.y * 0.35).toFixed(2)}px`);
      fieldNode.style.setProperty("--field-x-b", `${(current.current.x * -0.35).toFixed(2)}px`);
      fieldNode.style.setProperty("--field-y-b", `${(current.current.y * 0.5).toFixed(2)}px`);
      fieldNode.style.setProperty("--field-x-c", `${(current.current.x * 0.25).toFixed(2)}px`);
      fieldNode.style.setProperty("--field-y-c", `${(current.current.y * -0.45).toFixed(2)}px`);

      if (Math.abs(target.current.x - current.current.x) > 0.04 || Math.abs(target.current.y - current.current.y) > 0.04) {
        frame.current = window.requestAnimationFrame(write);
      }
    }

    function schedule() {
      if (frame.current === null) {
        frame.current = window.requestAnimationFrame(write);
      }
    }

    function onPointerMove(event: PointerEvent) {
      const rect = fieldNode.getBoundingClientRect();
      target.current = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 16,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 16
      };
      schedule();
    }

    function onPointerLeave() {
      target.current = { x: 0, y: 0 };
      schedule();
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry?.isIntersecting ?? false;
      fieldNode.dataset.active = String(visible.current);
      if (visible.current) {
        schedule();
      }
    });

    observer.observe(fieldNode);
    fieldNode.addEventListener("pointermove", onPointerMove, { passive: true });
    fieldNode.addEventListener("pointerleave", onPointerLeave);

    return () => {
      observer.disconnect();
      fieldNode.removeEventListener("pointermove", onPointerMove);
      fieldNode.removeEventListener("pointerleave", onPointerLeave);
      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return (
    <div className={`${styles.field} ${className ?? ""}`} ref={ref} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 540" fill="none">
        <path d="M34 16V520" stroke="currentColor" strokeWidth="5" />
        {curves.map((curve, index) => (
          <path
            key={curve.d}
            className={`${styles.line} ${index % 3 === 0 ? styles.lineA : index % 3 === 1 ? styles.lineB : styles.lineC}`}
            d={curve.d}
            stroke="currentColor"
            strokeWidth={curve.width}
            opacity={curve.opacity}
          />
        ))}
      </svg>
    </div>
  );
}
