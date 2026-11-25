import type { ButtonHTMLAttributes } from "react";

export function Button({ className = "", type = "button", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={`inline-flex items-center justify-center gap-2 rounded-sm border border-ink-700 bg-ink-900 text-ink-200 transition-colors hover:bg-ink-800 hover:text-ink-50 disabled:cursor-not-allowed disabled:opacity-40 ${className}`} {...props} />;
}