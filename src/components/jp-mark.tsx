import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// The chosen JP mark treatment. Styles live in src/styles.css under .jp-treatment-*.
const JP_STYLE = "offset";

export function JpMark({ onBackToTop }: { onBackToTop: () => void }) {
  const [revolving, setRevolving] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const handleClick = () => {
    window.clearTimeout(timer.current);
    setRevolving(true);
    // Safety net: the class must come off even if no animationend ever arrives.
    timer.current = window.setTimeout(() => setRevolving(false), 1150);
    onBackToTop();
  };

  return (
    <Button
      onClick={handleClick}
      aria-label="Back to top"
      className="jp-mark text-ink-50"
    >
      <span
        className={`jp-treatment jp-treatment-${JP_STYLE}${revolving ? " jp-revolving" : ""}`}
        aria-hidden="true"
        onAnimationEnd={() => {
          window.clearTimeout(timer.current);
          setRevolving(false);
        }}
      >
        <span className="jp-orbit jp-orbit-j">
          <span className="jp-letter jp-letter-j">
            <span className="jp-glyph">J</span>
          </span>
        </span>
        <span className="jp-orbit jp-orbit-p">
          <span className="jp-letter jp-letter-p">
            <span className="jp-glyph">P</span>
          </span>
        </span>
      </span>
    </Button>
  );
}
