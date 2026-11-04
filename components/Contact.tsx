"use client";

import { Mail, Phone } from "lucide-react";
import { contact } from "@/data/content";
import { useT } from "@/i18n/LanguageProvider";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./ui/BrandIcons";

const socialIcons = { linkedin: LinkedinIcon, github: GithubIcon, instagram: InstagramIcon };

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
                <li>
                  <a href={`mailto:${contact.email}`} className="group inline-flex items-center gap-3 rounded-lg text-on-navy hover:text-gold">
                    <span className="grid size-10 place-items-center rounded-xl bg-on-navy/10 text-gold">
                      <Mail className="size-4" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-sm">{contact.email}</span>
                  </a>
                </li>
                <li>
                  <a href={contact.whatsappHref} className="group inline-flex items-center gap-3 rounded-lg text-on-navy hover:text-gold">
                    <span className="grid size-10 place-items-center rounded-xl bg-on-navy/10 text-gold">
                      <Phone className="size-4" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-sm">{contact.phone}</span>
                    <span className="sr-only">{c.whatsappSr}</span>
                  </a>
                </li>
              </ul>

              <ul className="mt-8 flex gap-3 lg:mt-auto lg:pt-10" aria-label={c.socialAria}>
                {contact.socials.map((s) => {
                  const Icon = socialIcons[s.icon];
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        aria-label={s.label}
                        className="grid size-11 place-items-center rounded-full border border-on-navy/30 text-on-navy transition-transform hover:-translate-y-1 hover:rotate-3 hover:border-gold hover:bg-gold hover:text-navy"
                      >
                        <Icon className="size-[18px]" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
