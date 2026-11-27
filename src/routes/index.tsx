import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { JpMark } from "@/components/jp-mark";
import {
  Menu,
  X,
  ArrowUpRight,
  ArrowDown,
  Code2,
  Brain,
  Server,
  Cpu,
  Zap,
  Wrench,
  Github,
  FileText,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jiří Pokorný - AI Engineer" },
      {
        name: "description",
        content: "I build AI applications in Python, from raw data to a deployed product.",
      },
      { property: "og:title", content: "Jiří Pokorný - AI Engineer" },
      {
        property: "og:description",
        content: "I build AI applications in Python, from raw data to a deployed product.",
      },
      { property: "og:url", content: "https://jiripokorny.com/" },
      { property: "og:image", content: "https://jiripokorny.com/og-image.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://jiripokorny.com/og-image.png" },
    ],
  }),
  component: Index,
});

// ─── Data ──────────────────────────────────────────────────────────────────

const NAV = [
  { id: "work", label: "Projects" },
  { id: "skills", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const PROJECTS = [
  {
    title: "Authorship Verification System",
    tag: "Master's Thesis",
    image: "/verifyauthor-card.jpg",
    description:
      "End-to-end authorship verification system for English texts. Several hundred experiments across BoW/TF-IDF, graph-based, transformer (Longformer) and LLM approaches, with Optuna searching through thousands of preprocessing, feature and model pipelines. Best result F1 92.38%. The live web app (FastAPI + React) serves a lightweight logistic-regression model, small and cheap to run.",
    stack: ["Python", "transformers", "Longformer", "Optuna", "FastAPI", "React", "TypeScript"],
    links: [
      { label: "Live demo", url: "https://www.verifyauthor.dev" },
      { label: "GitHub", url: "https://github.com/Jpoker01/ai-authorship-verification" },
    ],
  },
  {
    title: "ATACA Incident Classification",
    tag: "Bachelor's Thesis · SAP",
    image: null,
    description:
      "Binary classification of SAP customer incidents at sentence level, built on real production incident data. Systematic comparison of dataset balancing methods, vector representations and classifiers, traditional vs. modern approaches.",
    stack: ["Python", "scikit-learn", "TF-IDF", "NLP", "SAP"],
    links: [{ label: "GitHub", url: "https://github.com/Jpoker01/bachelor_thesis" }],
  },
];

const SKILL_GROUPS = [
  { icon: Code2, label: "Languages", items: ["Python", "C++", "TypeScript"] },
  {
    icon: Brain,
    label: "AI & NLP",
    items: ["scikit-learn", "NLTK", "spaCy", "gensim", "transformers", "Optuna"],
  },
  { icon: Cpu, label: "Data", items: ["pandas", "NumPy", "SciPy", "PostgreSQL"] },
  {
    icon: Server,
    label: "Backend & Web",
    items: ["FastAPI", "Django", "React"],
  },
  { icon: Zap, label: "Cloud & DevOps", items: ["Azure", "Docker", "Kubernetes"] },
  {
    icon: Wrench,
    label: "Tools & Practices",
    items: ["Git", "Linux", "CI/CD"],
  },
];

// One entry per employer. `role` + `company` form the heading ("Associate
// Developer at SAP"); each item in `roles` is a focus area within that job.
const EXPERIENCE = [
  {
    role: "Associate Developer",
    company: "SAP",
    location: "Brno, Czech Republic",
    period: "Jun 2022 - Feb 2026",
    roles: [
      {
        title: "Enterprise Apps",
        period: "Sep 2024 - Feb 2026 · Full-time",
        description:
          "Developed features for SAP S/4HANA applications across the backend (ABAP) and frontend (SAPUI5, Fiori). Debugged and resolved production issues in live customer systems.",
        stack: ["ABAP", "SAPUI5", "Fiori"],
      },
      {
        title: "ML Engineering",
        period: "Jun 2022 - Sep 2024",
        description:
          "Built an NLP classifier that classifies SAP customer incidents, trained on real production incident data. This work became the foundation of my bachelor's thesis (see ATACA in Selected Projects). Alongside the thesis work, I handled other data and modelling tasks for the team.",
        stack: ["Python", "NLP", "scikit-learn", "Text Classification"],
      },
    ],
  },
];

// ─── Hooks ─────────────────────────────────────────────────────────────────

// Scroll reveal. An element is revealed once its top passes a line 80px above the
// bottom of the viewport, including when it was scrolled past in one jump (fast
// flick, nav link, reload mid-page). An IntersectionObserver misses those cases,
// because the element is never inside its root between two rendered frames.
const REVEAL_OFFSET = 80;
const pendingReveals = new Set<HTMLElement>();
let revealFrame = 0;

function checkReveals() {
  revealFrame = 0;
  const line = window.innerHeight - REVEAL_OFFSET;
  pendingReveals.forEach((el) => {
    if (el.getBoundingClientRect().top < line) {
      el.classList.add("in-view");
      pendingReveals.delete(el);
    }
  });
  if (pendingReveals.size === 0) detachRevealListeners();
}

function detachRevealListeners() {
  window.removeEventListener("scroll", scheduleRevealCheck);
  window.removeEventListener("resize", scheduleRevealCheck);
}

function scheduleRevealCheck() {
  // At most one layout read per frame, however many scroll events arrive.
  if (!revealFrame) revealFrame = window.requestAnimationFrame(checkReveals);
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (pendingReveals.size === 0) {
      window.addEventListener("scroll", scheduleRevealCheck, { passive: true });
      window.addEventListener("resize", scheduleRevealCheck);
    }
    pendingReveals.add(el);
    scheduleRevealCheck();
    return () => {
      pendingReveals.delete(el);
      if (pendingReveals.size === 0) detachRevealListeners();
    };
  }, []);
  return ref;
}

function scrollTo(id: string) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth" });
}

// ─── Nav ───────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuToggle.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open ? "bg-background/80 backdrop-blur-xl border-b border-ink-800" : "bg-transparent"
      }`}
    >
      <div className="px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between">
        <JpMark onBackToTop={() => scrollTo("home")} />

        <div className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="group min-h-11 font-heading text-[15px] font-semibold text-ink-50"
            >
              <span className="inline-block transition-transform duration-[340ms] ease-out group-hover:scale-[1.12]">
                {n.label}
              </span>
            </Button>
          ))}
        </div>

        <Button
          ref={menuToggle}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden w-11 h-11 -mr-3 flex items-center justify-center text-ink-400 hover:text-ink-50 transition-colors duration-300"
        >
          {open ? <X className="w-[22px] h-[22px]" /> : <Menu className="w-[22px] h-[22px]" />}
        </Button>
      </div>

      {open && (
        <div id="mobile-menu" className="md:hidden bg-background border-t border-ink-800 px-6 py-4 space-y-1">
          {NAV.map((n) => (
            <Button
              key={n.id}
              onClick={() => {
                scrollTo(n.id);
                setOpen(false);
              }}
              className="group block w-full text-left py-3 font-heading text-[20px] font-semibold text-ink-50"
            >
              <span className="inline-block transition-transform duration-[340ms] ease-out group-hover:scale-[1.12]">
                {n.label}
              </span>
            </Button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="home"
      className="hero-section relative flex flex-col justify-center px-6 md:px-10 lg:px-16 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(255,255,255,0.06), rgba(255,255,255,0.015) 50%, transparent 75%)",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-center lg:text-left lg:gap-14">
        <h1 className="name tracking-tight shrink-0" style={{ lineHeight: 1.02 }}>
        <span className="first font-medium block text-[clamp(42px,11.5vw,64px)]">Jiří</span>
        <span className="surname font-extrabold block text-[clamp(52px,15vw,88px)]">
          Pokorný
        </span>
        <span className="name-shine" aria-hidden="true">
          <span className="first font-medium block text-[clamp(42px,11.5vw,64px)]">Jiří</span>
          <span className="surname font-extrabold block text-[clamp(52px,15vw,88px)]">
            Pokorný
          </span>
        </span>
      </h1>

        <div className="flex flex-col items-center lg:items-start mt-8 lg:mt-0 lg:max-w-[420px]">
        <span className="mt-7 lg:mt-0 uppercase text-[13px] font-medium tracking-[0.18em] text-[#d9d9d9]">
          AI Engineer &middot; Brno, CZ
        </span>

        <p className="mt-6 font-light text-[18px] leading-relaxed text-ink-300 max-w-2xl lg:max-w-sm">
          I build AI applications in Python, from raw data to a deployed product.
        </p>

        <div className="flex items-center justify-center lg:justify-start mt-9 lg:mt-7">
          <Button
            onClick={() => scrollTo("contact")}
            className="group relative inline-flex items-center justify-center px-5 py-3 rounded-sm border border-ink-700 font-display text-[15px] font-medium text-white tracking-normal whitespace-nowrap cursor-pointer"
          >
            <span className="btn-reveal" aria-hidden="true">
              <span>Contact me</span>
            </span>
            <span className="relative [text-shadow:0_0_10px_rgba(255,255,255,0.45)]">Contact me</span>
          </Button>
        </div>
        </div>
      </div>

      <Button
        onClick={() => scrollTo("work")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 cursor-pointer group"
      >
        <span className="font-display text-[15px] font-medium tracking-normal text-white transition-colors duration-300 group-hover:text-ink-300">
          View work
        </span>
        <ArrowDown className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-y-0.5" />
      </Button>
    </section>
  );
}

// ─── Section Label ─────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="section-heading heading-reveal relative mb-14 flex items-baseline gap-4 border-b border-ink-800 pb-5"
    >
      <span className="relative inline-block font-heading text-[21px] md:text-[24px] font-semibold text-ink-50">
        {label}
      </span>
    </div>
  );
}

// ─── Work ──────────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  isFirst,
}: {
  project: (typeof PROJECTS)[number];
  isFirst: boolean;
}) {
  const ref = useReveal<HTMLDivElement>();
  const heading = (
    <>
      <p className="font-sans text-[15px] font-medium tracking-normal text-ink-400 mb-4">
        {project.tag}
      </p>
      <h3 className="text-[18px] md:text-[20px] lg:text-[20px] font-bold text-white tracking-tight leading-[1.1]">
        {project.title}
      </h3>
    </>
  );
  return (
    <div
      ref={ref}
      className={`reveal grid lg:grid-cols-12 gap-x-8 lg:gap-x-12 gap-y-6 ${
        isFirst ? "" : "border-t border-ink-800 pt-16"
      } pb-16`}
    >
      {project.image ? (
        // With an image: heading and description share the left column and
        // the image column starts at the top, next to the heading.
        <div className="lg:col-span-7">
          {heading}
          <p className="mt-6 text-[17px] text-ink-400 leading-relaxed font-light max-w-xl">
            {project.description}
          </p>
        </div>
      ) : (
        // Without an image: heading on its own row, so the tags on the right
        // start level with the first line of the description.
        <>
          <div className="lg:col-span-12">{heading}</div>
          <p className="lg:col-span-7 text-[17px] text-ink-400 leading-relaxed font-light max-w-xl">
            {project.description}
          </p>
        </>
      )}

      <div
        className={`lg:col-span-5 flex flex-col gap-8 mt-2 lg:mt-0 ${
          project.image ? "lg:justify-center" : ""
        }`}
      >
        {project.image && (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            width={480}
            height={250}
            loading="lazy"
            decoding="async"
            className="w-full h-auto border border-ink-800 rounded-sm"
          />
        )}
        <div className="flex flex-wrap gap-x-3 gap-y-3">
          {project.stack.map((s) => (
            <span key={s} className="tag-mark font-sans text-[13px] text-ink-400">
              {s}
            </span>
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="flex items-center gap-4 flex-wrap -ml-2.5">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center px-2.5 py-1.5 rounded-sm font-display text-[15px] font-medium tracking-normal whitespace-nowrap text-white"
              >
                <span className="btn-reveal" aria-hidden="true">
                  <span>
                    {link.label}{" "}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      &#8599;
                    </span>
                  </span>
                </span>
                <span className="relative">
                  {link.label}{" "}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    &#8599;
                  </span>
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="section-pad border-t border-ink-800">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Selected projects" />

        <div className="max-w-4xl mx-auto">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} isFirst={i === 0} />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center border-t border-ink-800 pt-10">
          <a
            href="https://github.com/Jpoker01"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-4 font-display text-[14px] sm:text-[15px] font-medium tracking-normal whitespace-nowrap text-white border border-ink-700 rounded-sm transition-colors duration-400"
          >
            <span className="btn-reveal" aria-hidden="true">
              <Github className="w-[20px] h-[20px]" />
              <span>See more on GitHub</span>
              <ArrowUpRight className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <Github className="relative w-[20px] h-[20px]" />
            <span className="relative">See more on GitHub</span>
            <ArrowUpRight className="relative w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ────────────────────────────────────────────────────────────────

function Skills() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="skills" className="section-pad border-t border-ink-800">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Tech stack" />

        <div
          ref={ref}
          className="reveal skill-grid max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.label}
              className="skill-cell group/cell p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <group.icon
                  className="w-[22px] h-[22px] shrink-0 text-ink-50"
                  strokeWidth={1.5}
                />
                <h3 className="text-[16px] font-semibold tracking-tight text-white">
                  {group.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="tag-mark font-sans text-[13px] text-ink-400">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience ────────────────────────────────────────────────────────────

function ExperienceItem({ job, isFirst }: { job: (typeof EXPERIENCE)[number]; isFirst: boolean }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${isFirst ? "" : "border-t border-ink-800 pt-16"} pb-16`}
    >
      {/* Employer heading — title, then company + location, matching the
          type scale and mono label of ProjectCard. No overall date; the dates
          live on each focus area below. */}
      <div className="mb-12">
        <h3 className="text-[18px] md:text-[20px] lg:text-[20px] font-bold text-white tracking-tight leading-[1.1]">
          {job.role}
        </h3>
        <p className="mt-4 font-sans text-[15px] font-medium tracking-normal text-ink-400">
          {job.company} · {job.location}
        </p>
      </div>

      {/* Focus areas within the job, on a thin timeline in the left gutter. */}
      <div className="relative pl-7 lg:pl-9">
        {job.roles.map((role, ri) => {
          const isLast = ri === job.roles.length - 1;
          return (
            <div
              key={role.period}
              className={`relative grid lg:grid-cols-12 gap-x-8 lg:gap-x-12 gap-y-4 ${
                isLast ? "" : "pb-12"
              }`}
            >
              {/* Timeline dot. The ring masks the connecting line behind it. */}
              <span
                className="absolute -left-7 lg:-left-9 top-[7px] w-[7px] h-[7px] rounded-full bg-ink-400 ring-4 ring-black"
                aria-hidden="true"
              />
              {/* Connecting segment down to the next dot (not after the last). */}
              {!isLast && (
                <span
                  className="absolute left-[-25px] lg:left-[-33px] top-[16px] bottom-[-4px] w-px bg-ink-800"
                  aria-hidden="true"
                />
              )}
              {/* Title and period on their own row, so the description and the
                  tags below them start on the same line. */}
              <div className="lg:col-span-12">
                <h4 className="text-[16px] lg:text-[17px] font-semibold text-white tracking-tight leading-[1.2]">
                  {role.title}
                </h4>
                <p className="mt-2 font-sans text-[14px] text-ink-500 tracking-normal">
                  {role.period}
                </p>
              </div>
              <p className="lg:col-span-7 text-[16px] text-ink-400 font-light leading-relaxed max-w-xl">
                {role.description}
              </p>
              <div className="lg:col-span-5 flex flex-wrap content-start gap-x-3 gap-y-3 mt-1 lg:mt-0">
                {role.stack.map((s) => (
                  <span key={s} className="tag-mark font-sans text-[13px] text-ink-400">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="section-pad border-t border-ink-800">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Experience" />

        <div className="max-w-4xl mx-auto">
          {EXPERIENCE.map((job, i) => (
            <ExperienceItem key={job.company} job={job} isFirst={i === 0} />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center border-t border-ink-800 pt-10">
          <a
            href="/CV_Jiri_Pokorny_EN.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-4 font-display text-[14px] sm:text-[15px] font-medium tracking-normal whitespace-nowrap text-white border border-ink-700 rounded-sm transition-colors duration-400"
          >
            <span className="btn-reveal" aria-hidden="true">
              <FileText className="w-[20px] h-[20px]" />
              <span>Download full CV</span>
              <ArrowUpRight className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <FileText className="relative w-[20px] h-[20px]" />
            <span className="relative">Download full CV</span>
            <ArrowUpRight className="relative w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <Button
      onClick={handleCopy}
      className="relative ml-1 shrink-0 w-8 h-11 flex items-center justify-center text-ink-400 hover:text-ink-50 transition-colors duration-300"
      aria-label={copied ? "Copied" : `Copy ${text}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
      </svg>
      {copied && (
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[11px] text-white bg-ink-800 px-2 py-0.5 rounded whitespace-nowrap pointer-events-none">
          Copied
        </span>
      )}
    </Button>
  );
}

function ContactRow({
  icon,
  label,
  copyText,
  children,
  motion,
}: {
  icon: React.ReactNode;
  label: string;
  copyText?: string;
  children: React.ReactNode;
  motion?: string;
}) {
  const iconSvg = (className: string) => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icon}
    </svg>
  );

  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className={`contact-row relative flex items-center gap-3 min-w-0 ${motion ?? ""}`}>
        <span className="contact-highlight" aria-hidden="true">
          {iconSvg("shrink-0")}
          <span className="text-[18px]">{label}</span>
        </span>
        {iconSvg("shrink-0 text-ink-50")}
        {children}
      </div>
      {copyText && <CopyButton text={copyText} />}
    </div>
  );
}

function Contact() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="contact"
      className="section-pad border-t border-ink-800"
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div ref={ref} className="reveal max-w-6xl mx-auto w-full">
        <SectionLabel label="Contact" />

        <div
          className="flex flex-col md:flex-row md:items-center md:justify-center gap-10 md:gap-[56px]"
          style={{ width: "fit-content", marginLeft: "auto", marginRight: "auto" }}
        >
          <h2 className="slogan-shine relative inline-block text-[18px] font-medium leading-[1.3] md:text-right">
            Let's work together.
          </h2>

          <div
            className="hidden md:block w-px self-stretch"
            style={{ backgroundColor: "#1e1e1e" }}
          />

          <div className="flex flex-col gap-[18px]">
            <ContactRow
              icon={
                <>
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 4.5L12 11.5L22 4.5" />
                </>
              }
              motion="contact-mail"
              copyText="jiripokorny455@gmail.com"
              label="jiripokorny455@gmail.com"
            >
              <a
                href="mailto:jiripokorny455@gmail.com"
                className="contact-link text-[18px] text-ink-300"
              >
                jiripokorny455@gmail.com
              </a>
            </ContactRow>

            <ContactRow
              icon={
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              }
              motion="contact-phone"
              copyText="+420603967651"
              label="+420 603 967 651"
            >
              <a
                href="tel:+420603967651"
                className="contact-link text-[18px] text-ink-300"
              >
                +420 603 967 651
              </a>
            </ContactRow>

            <ContactRow
              icon={
                <>
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </>
              }
              motion="contact-linkedin"
              label="LinkedIn ↗"
            >
              <a
                href="https://www.linkedin.com/in/jpoker01/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link text-[18px] text-ink-300"
              >
                LinkedIn &#8599;
              </a>
            </ContactRow>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="w-full" style={{ borderTop: "1px solid #161616", padding: "20px 40px" }}>
      <div
        className="footer-bar flex items-center justify-between"
        style={{ fontSize: "11px", color: "#5f5f5f" }}
      >
        <span>&copy; {new Date().getFullYear()} Jiří Pokorný</span>
        <span>Brno, Czech Republic</span>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────

function Index() {
  return (
    <div className="min-h-screen">
      <div className="fog-layer" aria-hidden="true">
        <div className="fog-haze fog-haze-a" />
        <div className="fog-haze fog-haze-b" />
        <div className="fog-grain" />
      </div>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
