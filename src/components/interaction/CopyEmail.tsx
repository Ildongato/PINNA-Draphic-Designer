"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CopyEmail.module.css";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  async function copyEmail() {
    setCopied(true);
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => setCopied(false), 1200);

    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Keep the visual confirmation responsive even when clipboard permissions are strict.
    }
  }

  return (
    <span className={styles.wrap}>
      <button className={styles.button} type="button" onClick={copyEmail}>
        Copy email
      </button>
      <span className={styles.status} aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </span>
  );
}
