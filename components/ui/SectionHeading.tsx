import { MotionHeading } from "./MotionEffects";

export function SectionHeading({
  id,
  label,
  title,
  subtitle,
  align = "left",
  dark = false,
  titleClassName = "",
}: {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  titleClassName?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      <MotionHeading
        label={label}
        title={title}
        titleId={id}
        dark={dark}
        titleClassName={titleClassName}
      />
      {subtitle ? (
        <p className={`mt-4 text-base leading-relaxed ${dark ? "text-on-navy/85" : "text-muted"}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
