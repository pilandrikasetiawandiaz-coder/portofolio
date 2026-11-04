import type { Dictionary } from "./types";

/** English dictionary. Must mirror the structure of id.ts exactly (enforced by `Dictionary`). */
export const en: Dictionary = {
  meta: {
    title: "Diaz Pilandrika Setiawan — Digital Solutions & Cloud Infrastructure",
    description:
      "Portfolio of Diaz Pilandrika Setiawan — an IT student focused on System Administration, Network Engineering, and Cloud & DevOps.",
    tagline: "Digital Solutions & Cloud Infrastructure",
    ogLocale: "en_US",
  },
  common: {
    skipToContent: "Skip to content",
    contentPending: "Content coming soon",
  },
  nav: {
    items: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      blog: "Blog",
      contact: "Contact",
    },
    mainAria: "Main navigation",
    footerAria: "Footer navigation",
    homeAria: "Back to home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    downloadCv: "Download CV",
    preferences: "Language & theme",
  },
  controls: {
    languageAria: "Change language",
    languageNames: { id: "Bahasa Indonesia (ID)", en: "English (EN)" },
    themeAria: "Change theme",
    themeToDark: "Switch to dark mode",
    themeToLight: "Switch to light mode",
  },
  hero: {
    label: "CLOUD & NETWORK ENGINEER",
    intro:
      "IT student focused on two fields: **Cloud Computing** and **Network Engineering**. In cloud, I build infrastructure on AWS with Terraform and CI/CD. In networking, I configure routing, VLANs, and firewalls on MikroTik and Cisco.",
    roles: ["Network Engineer", "Cloud Engineer", "DevOps Enthusiast"],
    photoAlt: "Profile photo of Diaz Pilandrika Setiawan",
    photoPlaceholder: "Profile Photo",
    photoPlaceholderAria: "Profile photo placeholder",
    ctaPrimary: "View Projects",
    ctaSecondary: "Download CV",
    ctaTertiary: "Get in Touch",
  },
  about: {
    label: "A Little About Me",
    title: "About Me",
    paragraph:
      "IT student with a primary interest in Cloud Computing, Artificial Intelligence, and Network Engineering. I learn to build cloud infrastructure on AWS with Terraform and CI/CD, configure networks using MikroTik and Cisco, and explore practical uses of AI. Alongside that, I enjoy learning web development so that what I build can be used right away. Committed to growing into a dependable young talent in information technology.",
    info: [
      { label: "Status", value: "Student" },
      { label: "Field", value: "Cloud, AI & Network Engineering" },
      { label: "Location", value: "Bandung, Indonesia" },
      { label: "Email", value: "pilandrikasetiawandiaz@gmail.com", href: "mailto:pilandrikasetiawandiaz@gmail.com" },
    ],
  },
  skills: {
    label: "Skills & Tools",
    title: "Technical Expertise",
    subtitle: "Technologies I use hands-on in labs, network simulations, and my personal homelab.",
    groups: [
      { id: "cloud", title: "Cloud Computing", tags: ["AWS (Primary)", "GCP"] },
      {
        id: "devops",
        title: "DevOps",
        tags: [
          "Docker",
          "Kubernetes",
          "Terraform",
          "GitHub Actions",
          "CI/CD",
          "Infrastructure as Code",
          "Networking Fundamentals",
          "Infrastructure Troubleshooting",
          "Git & GitHub",
        ],
      },
      {
        id: "network",
        title: "Network Engineering",
        tags: [
          "Cisco Packet Tracer",
          "MikroTik",
          "IPv4",
          "OSPF (Single & Multi-Area)",
          "VLAN Trunking",
          "Inter-VLAN Routing",
          "ACL",
          "NAT",
          "EtherChannel",
          "STP",
          "Tunneling",
        ],
      },
      {
        id: "system",
        title: "System Administration",
        tags: ["Linux CLI", "Ubuntu Server", "Proxmox VE", "Nginx"],
      },
      {
        id: "soft",
        title: "Soft Skills",
        tags: ["Problem solving", "Communication", "Teamwork", "Documentation", "Adaptability"],
      },
    ],
  },
  projects: {
    label: "Projects",
    title: "Featured Projects",
    subtitle: "Quality over quantity — a few selected works.",
    placeholderName: "Project Name",
    placeholderCategory: "Category",
    placeholderThumbnail: "Project Thumbnail",
    placeholderThumbnailAria: "Project thumbnail placeholder",
    thumbnailAlt: (name) => `Preview of ${name}`,
    caseBrief: "Problem",
    caseProcess: "Process",
    caseResult: "Outcome",
    tagsAria: "Technologies",
    detail: "Implementation Details",
    repo: "Repository",
    linkAria: (label, name, available) => `${label} — ${name}${available ? "" : " (not available yet)"}`,
    // TODO: fill in real project copy — empty strings render as skeletons.
    items: {
      p1: { title: "", category: "", description: "", brief: "", process: "", result: "" },
      p2: { title: "", category: "", description: "", brief: "", process: "", result: "" },
      p3: { title: "", category: "", description: "", brief: "", process: "", result: "" },
      p4: { title: "", category: "", description: "", brief: "", process: "", result: "" },
    },
  },
  experience: {
    label: "Experience",
    title: "My Journey",
    subtitle: "Learning milestones and achievements over time.",
    highlightLabel: "Goal / Milestone",
    placeholderYear: "Year",
    placeholderTitle: "Experience Title",
    achievementAria: "Achievement",
    items: {
      e1: {
        title: "August 2026::3rd Place, Networking, NCC UTI",
        description:
          "My first competition. Won 3rd place in the Networking category at NCC UTI 2026, which kicked off my journey in networking competitions.",
      },
      e2: {
        title: "September 2026::Olimpiade Jaringan MikroTik (OJM) Competitor",
        description:
          "Competed in the Olimpiade Jaringan MikroTik (OJM), a MikroTik-based networking competition, to gain more competition experience and test my skills beyond my own learning environment.",
      },
      e3: {
        title: "October 2026::IONIC Competitor, Networking",
        description:
          "Competed in IONIC 2026 in the Networking field as a two-person team, handling the routing part of a Cisco Packet Tracer topology.",
      },
      e4: { title: "", description: "" },
    },
  },
  blog: {
    label: "Blog & News",
    title: "Latest Updates",
    subtitle: "Press coverage, achievements, and recent activities.",
    emptyText: "No news yet — coming soon.",
    dateLocale: "en-US",
    placeholderTitle: "News Headline",
    placeholderSource: "Source",
    placeholderDate: "Date",
    placeholderThumbnail: "News Image",
    placeholderThumbnailAria: "News image placeholder",
    thumbnailAlt: (title) => `Image for: ${title}`,
    readMore: "Read more",
    readMoreAria: (title, available, external) =>
      `Read more: ${title}${available ? (external ? " (opens in a new tab)" : "") : " (not available yet)"}`,
    // TODO: fill in news items — empty strings render as skeletons.
    items: {
      b1: { title: "", excerpt: "", source: "" },
      b2: { title: "", excerpt: "", source: "" },
      b3: { title: "", excerpt: "", source: "" },
    },
  },
  contact: {
    label: "Collaboration & Consulting",
    title: "Contact",
    text: "Need help setting up a network, servers, or cloud infrastructure for your school or business? Tell me what you need, and I'll get back to you as soon as possible.",
    whatsappSr: "(WhatsApp)",
    socialAria: "Social media",
    form: {
      aria: "Contact form",
      name: "Name",
      email: "Email",
      message: "Message",
      namePlaceholder: "Full name",
      emailPlaceholder: "name@domain.com",
      messagePlaceholder: "Tell me about your needs…",
      submit: "Send Message",
      sending: "Sending…",
      success: "Thank you! Your message has been sent.",
      sendAnother: "Send another message",
      errors: {
        name: "Name must be at least 2 characters.",
        email: "Please enter a valid email address.",
        message: "Message must be at least 10 characters.",
      },
    },
  },
};
