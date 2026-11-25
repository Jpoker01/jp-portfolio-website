import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STYLES = [
  { id: "glow", name: "Original glow" },
  { id: "underline", name: "Fine underline" },
  { id: "corners", name: "Open corners" },
  { id: "brackets", name: "Quiet brackets" },
  { id: "circle", name: "Hairline circle" },
  { id: "diamond", name: "Diamond seal" },
  { id: "plate", name: "Inset plate" },
  { id: "inverse", name: "Paper stamp" },
  { id: "split", name: "Split initials" },
  { id: "dot", name: "Signature dot" },
  { id: "offset", name: "Offset frames" },
  { id: "rail", name: "Side rail" },
  { id: "outline", name: "Outline letters" },
  { id: "steps", name: "Stepped initials" },
  { id: "shutter", name: "Hover shutter" },
] as const;

function Initials({ style }: { style: string }) {
  return (
    <span className={`jp-treatment jp-treatment-${style}`} aria-hidden="true">
      <svg className="jp-ornament" viewBox="0 0 52 52" fill="none">
        {style === "circle" && <circle cx="26" cy="26" r="22" />}
        {style === "diamond" && <path d="M26 3 49 26 26 49 3 26Z" />}
        {style === "corners" && <path d="M4 17V7h10M38 45h10V35" />}
        {style === "brackets" && <path d="M10 12H5v28h5M42 12h5v28h-5" />}
        {style === "offset" && <><path d="M8 36V8h28" /><path d="M16 44h28V16" /></>}
      </svg>
      <span className="jp-letter jp-letter-j">J</span>
      <span className="jp-letter jp-letter-p">P</span>
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
            <span className="font-display text-[13px] font-medium text-ink-50">JP styles <span className="text-ink-400">{selected + 1} / 15</span></span>
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
            <Button onClick={() => setSelected(0)} className="flex min-h-9 items-center gap-2 text-[11px] text-ink-300 hover:text-ink-50"><RotateCcw size={12} />Reset to original</Button>
          </div>
        </aside>
      ) : (
        <Button onClick={() => setOpen(true)} aria-label="Open JP style switcher" title="JP styles" className="jp-preview-launcher"><SlidersHorizontal size={18} /></Button>
      )}
    </>
  );
}