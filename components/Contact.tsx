"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { contact } from "@/data/contact";
import { useT } from "@/i18n/LanguageProvider";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./ui/BrandIcons";

const socialLinks = [
  { label: "GitHub", href: contact.github, Icon: GithubIcon },
  { label: "LinkedIn", href: contact.linkedin, Icon: LinkedinIcon },
  { label: "Instagram", href: contact.instagram, Icon: InstagramIcon },
];

export function Contact() {
  const { t } = useT();
  const c = t.contact;
  return (
    <section id="kontak" aria-labelledby="kontak-title" className="scroll-mt-24 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="relative isolate overflow-hidden rounded-[24px] border border-contact-border bg-gradient-to-br from-contact-from to-contact-to p-6 sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-gold/15 blur-3xl"
          />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-gold/60 to-transparent" />

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="flex flex-col">
              <SectionHeading id="kontak-title" label={c.label} title={c.title} dark />
              <p className="mt-4 max-w-md leading-relaxed text-on-navy/80">{c.text}</p>

              <ul className="mt-8 space-y-3">
                {contact.email ? (
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="group flex w-fit max-w-full min-w-0 items-center gap-3 rounded-lg text-on-navy hover:text-gold"
                    >
                      <span className="grid size-10 place-items-center rounded-xl bg-on-navy/10 text-gold">
                        <Mail className="size-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 break-all font-mono text-sm">{contact.email}</span>
                    </a>
                  </li>
                ) : null}
                {contact.location ? (
                  <li className="inline-flex items-center gap-3 rounded-lg text-on-navy">
                    <span className="grid size-10 place-items-center rounded-xl bg-on-navy/10 text-gold">
                      <MapPin className="size-4" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-sm">{contact.location}</span>
                  </li>
                ) : null}
                {contact.whatsappDisplay && contact.whatsappNumber ? (
                  <li>
                    <a
                      href={`https://wa.me/${contact.whatsappNumber}`}
                      className="group inline-flex items-center gap-3 rounded-lg text-on-navy hover:text-gold"
                    >
                      <span className="grid size-10 place-items-center rounded-xl bg-on-navy/10 text-gold">
                        <Phone className="size-4" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-sm">{contact.whatsappDisplay}</span>
                      <span className="sr-only">{c.whatsappSr}</span>
                    </a>
                  </li>
                ) : null}
              </ul>

              <ul className="mt-8 flex gap-3 lg:mt-auto lg:pt-10" aria-label={c.socialAria}>
                {socialLinks.filter((social) => social.href).map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="grid size-11 place-items-center rounded-full border border-on-navy/30 text-on-navy transition-transform hover:-translate-y-1 hover:rotate-3 hover:border-gold hover:bg-gold hover:text-navy"
                      >
                        <Icon className="size-[18px]" />
                      </a>
                    </li>
                ))}
              </ul>
            </div>

            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
