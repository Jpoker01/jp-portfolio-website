import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STYLES = [
  { id: "steps", name: "Stepped initials" },
  { id: "circle", name: "Hairline circle" },
  { id: "steps-circle", name: "Stepped in a circle" },
  { id: "stack", name: "Stacked initials" },
  { id: "double-circle", name: "Double ring" },
  { id: "arc", name: "Open ring" },
  { id: "dotted", name: "Dotted ring" },
  { id: "halo", name: "Soft halo" },
  { id: "orbit", name: "Ring with a dot" },
  { id: "eclipse", name: "Eclipse ring" },
  { id: "offset", name: "Raised first letter" },
  { id: "overlap", name: "Overlapped initials" },
  { id: "scale", name: "Large and small" },
  { id: "tilt", name: "Tilted pair" },
  { id: "steps-rule", name: "Stepped with a rule" },
  { id: "disc", name: "Inverted disc" },
  { id: "half", name: "Half disc" },
  { id: "cursor", name: "Terminal cursor" },
] as const;

function Ornament({ style }: { style: string }) {
  switch (style) {
    case "circle":
    case "steps-circle":
    case "steps-rule":
      return <circle cx="26" cy="26" r="21" />;
    case "double-circle":
      return (
        <>
          <circle cx="26" cy="26" r="21" />
          <circle cx="26" cy="26" r="17" />
        </>
      );
    case "arc":
      return <circle cx="26" cy="26" r="21" strokeDasharray="108 24" transform="rotate(-90 26 26)" />;
    case "dotted":
      return <circle cx="26" cy="26" r="21" strokeDasharray="0.4 5.2" strokeLinecap="round" style={{ strokeWidth: 1.6 }} />;
    case "orbit":
      return (
        <>
          <circle cx="26" cy="26" r="21" />
          <circle cx="26" cy="5" r="1.9" fill="var(--color-ink-50)" stroke="none" />
        </>
      );
    case "eclipse":
      return (
        <>
          <defs>
            <linearGradient id="jp-eclipse-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-ink-50)" stopOpacity="0.9" />
              <stop offset="55%" stopColor="var(--color-ink-50)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-ink-50)" stopOpacity="0.06" />
            </linearGradient>
          </defs>
          <circle
            cx="26"
            cy="26"
            r="21"
            style={{ stroke: "url(#jp-eclipse-grad)", strokeWidth: 1.4 }}
          />
        </>
      );
    default:
      return null;
  }
}

function Initials({ style }: { style: string }) {
  return (
    <span className={`jp-treatment jp-treatment-${style}`} aria-hidden="true">
      <svg className="jp-ornament" viewBox="0 0 52 52" fill="none">
        <Ornament style={style} />
      </svg>
      <span className="jp-letter jp-letter-j">J</span>
      <span className="jp-letter jp-letter-p">P</span>
      {style === "cursor" && <span className="jp-cursor">_</span>}
    </span>
  );
}

export function JpStylePreview({ onBackToTop }: { onBackToTop: () => void }) {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(true);
  const active = STYLES[selected] ?? STYLES[0];
  const move = (direction: number) => setSelected((current) => (current + direction + STYLES.length) % STYLES.length);

  return (
    <>
      <Button onClick={onBackToTop} aria-label="Back to top" className="jp-preview-mark text-ink-50">
        <Initials style={active.id} />
      </Button>
      {open ? (
        <aside className="jp-preview-panel" aria-label="JP style preview">
          <div className="flex items-center justify-between gap-3 border-b border-ink-700 px-4 py-2">
            <span className="font-display text-[13px] font-medium text-ink-50">JP styles <span className="text-ink-400">{selected + 1} / {STYLES.length}</span></span>
            <Button onClick={() => setOpen(false)} aria-label="Hide JP style switcher" title="Hide switcher" className="jp-preview-control"><X size={16} /></Button>
          </div>
          <div className="flex items-center justify-between gap-2 px-3 py-2">
            <Button onClick={() => move(-1)} aria-label="Previous JP style" title="Previous style" className="jp-preview-control"><ChevronLeft size={18} /></Button>
            <span className="text-[13px] text-ink-200" aria-live="polite">{active.name}</span>
            <Button onClick={() => move(1)} aria-label="Next JP style" title="Next style" className="jp-preview-control"><ChevronRight size={18} /></Button>
          </div>
          <div className="grid grid-cols-5 gap-1.5 px-3 pb-3">
            {STYLES.map((style, index) => (
              <Button key={style.id} onClick={() => setSelected(index)} aria-label={`${index + 1}. ${style.name}`} aria-pressed={selected === index} title={style.name} className="jp-preview-option">
                <Initials style={style.id} />
                <span className="text-[10px] text-ink-400">{String(index + 1).padStart(2, "0")}</span>
              </Button>
            ))}
          </div>
          <div className="flex justify-end border-t border-ink-700 px-3 py-1">
            <Button onClick={() => setSelected(0)} className="flex min-h-9 items-center gap-2 text-[11px] text-ink-300 hover:text-ink-50"><RotateCcw size={12} />Reset to stepped</Button>
          </div>
        </aside>
      ) : (
        <Button onClick={() => setOpen(true)} aria-label="Open JP style switcher" title="JP styles" className="jp-preview-launcher"><SlidersHorizontal size={18} /></Button>
      )}
    </>
  );
}
