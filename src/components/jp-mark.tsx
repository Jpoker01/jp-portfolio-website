import { Button } from "@/components/ui/button";

// The chosen JP mark treatment. Styles live in src/styles.css under .jp-treatment-*.
const JP_STYLE = "offset";

export function JpMark({ onBackToTop }: { onBackToTop: () => void }) {
  return (
    <Button onClick={onBackToTop} aria-label="Back to top" className="jp-mark text-ink-50">
      <span className={`jp-treatment jp-treatment-${JP_STYLE}`} aria-hidden="true">
        <span className="jp-letter jp-letter-j">J</span>
        <span className="jp-letter jp-letter-p">P</span>
      </span>
    </Button>
  );
}
