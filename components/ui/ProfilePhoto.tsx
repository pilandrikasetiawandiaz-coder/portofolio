"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/content";
import { profilePhotoVariants } from "@/lib/motion";
import { TiltCard } from "./MotionPrimitives";

const blurDataURL =
  "data:image/jpeg;base64,/9j/2wBDABcQERQRDhcUEhQaGBcbIjklIh8fIkYyNSk5UkhXVVFIUE5bZoNvW2F8Yk5QcptzfIeLkpSSWG2grJ+OqoOPko3/2wBDARgaGiIeIkMlJUONXlBejY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY3/wAARCAAkABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAEDBQQC/8QAIBAAAgMAAQQDAAAAAAAAAAAAAAECAxEEEhMhQQUxUf/EABYBAQEBAAAAAAAAAAAAAAAAAAEAAv/EABcRAQEBAQAAAAAAAAAAAAAAAAABAhH/2gAMAwEAAhEDEQA/AM7iSnc8ZqVcTPMjM+PeXI3O4liKpMa0lgDnn0ALHpp7HJ6fw7Z2JTRVOLlzW0j1ZBqzcKnK1zfoFfU/QFnrpjFKe55KLm9YBaMTWk4AA0w//9k=";

export function ProfilePhoto({
  src,
  alt,
  placeholderLabel,
  placeholderAria,
}: {
  src: string;
  alt: string;
  placeholderLabel: string;
  placeholderAria: string;
}) {
  const [failed, setFailed] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-0 isolate">
      <div aria-hidden="true" className="profile-photo-glow absolute -inset-5 -z-10 rounded-[2rem]" />
      <div aria-hidden="true" className="profile-photo-frame absolute -bottom-3 -right-3 -z-10 aspect-[4/5] w-full rounded-3xl border" />
      <TiltCard className="relative z-0 isolate overflow-hidden rounded-3xl" maxTilt={5}>
        <motion.div
          className="relative aspect-[4/5] overflow-hidden rounded-3xl border bg-navy-800 shadow-[var(--shadow-soft)]"
          style={{ borderColor: "var(--profile-photo-border)" }}
          variants={profilePhotoVariants}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
        >
          {!failed ? (
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="(max-width: 768px) 80vw, 420px"
              placeholder="blur"
              blurDataURL={blurDataURL}
              className="object-cover"
              style={{ objectPosition: "50% 22%" }}
              onError={() => setFailed(true)}
            />
          ) : (
            <div
              role="img"
              aria-label={placeholderAria}
              className="hero-placeholder-glow flex h-full flex-col items-center justify-center gap-3"
            >
              <span className="grid size-24 place-items-center rounded-full border border-gold/50 text-3xl font-bold text-gold">
                {site.initials}
              </span>
              <span className="micro-label font-mono text-on-navy/60">{placeholderLabel}</span>
            </div>
          )}
        </motion.div>
      </TiltCard>
    </div>
  );
}
