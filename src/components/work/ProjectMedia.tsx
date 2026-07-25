"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { assetPath } from "@/lib/assets";
import styles from "./ProjectMedia.module.css";

type CSSVars = CSSProperties & {
  "--media-bg"?: string;
};

export type ProjectMediaProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  backgroundColor?: string;
  ratio?: string;
  objectPosition?: string;
  sizes: string;
  eager?: boolean;
  className?: string;
};

export function ProjectMedia({
  src,
  alt,
  width,
  height,
  backgroundColor = "#f4f3ee",
  ratio,
  objectPosition = "50% 50%",
  sizes,
  eager = false,
  className
}: ProjectMediaProps) {
  const [failed, setFailed] = useState(false);
  const imageSrc = assetPath(failed ? "/brand/media-fallback.svg" : src);

  return (
    <figure
      className={`${styles.media} ${className ?? ""}`}
      data-media
      data-reveal
      data-fallback={failed}
      style={
        {
          aspectRatio: ratio ?? `${width} / ${height}`,
          objectPosition,
          "--media-bg": backgroundColor
        } as CSSVars
      }
    >
      <Image
        className={styles.image}
        src={imageSrc}
        alt={failed ? `${alt}. Image unavailable.` : alt}
        width={width}
        height={height}
        sizes={sizes}
        style={{ objectPosition }}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        unoptimized={failed}
        onError={() => setFailed(true)}
      />
      {failed ? <figcaption className={`${styles.fallbackLabel} mono`}>Media unavailable</figcaption> : null}
    </figure>
  );
}
