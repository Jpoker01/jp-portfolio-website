import { createContext, useContext, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { Button } from "./ui/button";

const STYLES = [
  "Roman numerals, Inter light",
  "Roman numerals, JetBrains Mono",
  "Large light serif numerals",
  "Padded mono digits with slash",
  "Dot tally",
  "Greek letters",
  "Alphabet letters",
  "Hairline outlined chip",
  "Raised superscript digit",
  "Digit at the end of the rule",
  "Spelled-out italic serif",
  "Condensed numeral",
];
const ROMAN = ["I", "II", "III", "IV"];
const GREEK = ["α", "β", "γ", "δ"];
const WORDS = ["one", "two", "three", "four"];
const NumberingContext = createContext(0);

export function SectionNumber({ section }: { section: number }) {
  const style = useContext(NumberingContext);
  const index = section - 1;
  const digits = String(section).padStart(2, "0");
  let marker = digits;
  if (style === 0 || style === 1) marker = `${ROMAN[index] ?? section}.`;
  if (style === 2) marker = ROMAN[index] ?? String(section);
  if (style === 3) marker = `${digits}/`;
  if (style === 4) marker = "•".repeat(section);
  if (style === 5) marker = GREEK[index] ?? String(section);
  if (style === 6) marker = `${String.fromCharCode(64 + section)}.`;
  if (style === 10) marker = WORDS[index] ?? String(section);
  return <span aria-hidden="true" data-numbering-style={style + 1} className="section-number">{marker}</span>;
}

export function NumberingPreview({ children }: { children: ReactNode }) {
  const [style, setStyle] = useState(0);
  const [open, setOpen] = useState(true);

  function preview(next: number) {
    setStyle((next + STYLES.length) % STYLES.length);
    // Bring an actual section heading into view when trying styles from the hero.
    const work = document.getElementById("work");
    if (work && work.getBoundingClientRect().top > window.innerHeight - 160) {
      work.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
  }

  return (
    <NumberingContext.Provider value={style}>
      {children}
      <aside aria-label="Section numbering preview" className="numbering-preview fixed bottom-4 right-4 z-50 max-w-[calc(100%-2rem)] font-sans">
        {open ? (
          <div className="w-[340px] max-w-full rounded-sm border border-ink-700 bg-ink-950 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-[13px] font-medium text-ink-200">Section numbering</span>
              <Button aria-label="Hide numbering switcher" title="Hide numbering switcher" className="h-8 w-8 shrink-0" onClick={() => setOpen(false)}><X size={15} /></Button>
            </div>
            <label htmlFor="numbering-style" className="sr-only">Numbering style</label>
            <select id="numbering-style" value={style} onChange={(event) => preview(Number(event.target.value))} className="h-10 w-full min-w-0 rounded-sm border border-ink-700 bg-ink-900 px-2 text-[12px] text-ink-100 focus-visible:outline-ink-400">
              {STYLES.map((name, index) => <option key={name} value={index}>{String(index + 1).padStart(2, "0")} · {name}</option>)}
            </select>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button aria-label="Previous numbering style" title="Previous style" className="h-9 w-9" onClick={() => preview(style - 1)}><ArrowLeft size={16} /></Button>
                <span aria-live="polite" aria-atomic="true" className="w-12 text-center text-[12px] tabular-nums text-ink-400">{style + 1} / 12</span>
                <Button aria-label="Next numbering style" title="Next style" className="h-9 w-9" onClick={() => preview(style + 1)}><ArrowRight size={16} /></Button>
              </div>
              <Button aria-label="Reset to original numbering" title="Reset to original numbering" className="h-9 w-9" onClick={() => preview(0)}><RotateCcw size={15} /></Button>
            </div>
          </div>
        ) : (
          <Button className="h-10 px-3 text-[12px]" onClick={() => setOpen(true)}><SlidersHorizontal size={15} />Numbering</Button>
        )}
      </aside>
    </NumberingContext.Provider>
  );
}