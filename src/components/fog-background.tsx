import { useEffect, useRef, useState } from "react";

type VantaFog = (options: Record<string, unknown>) => { destroy: () => void };

// Vanta FOG recoloured to the site's greys (base black, highlights at #2e2e2e).
const FOG_OPTIONS = {
  mouseControls: false,
  touchControls: false,
  gyroControls: false,
  baseColor: 0x000000,
  lowlightColor: 0x050505,
  midtoneColor: 0x141414,
  highlightColor: 0x2e2e2e,
  blurFactor: 0.7,
  speed: 0.6,
  zoom: 0.8,
};

/**
 * Full-page animated fog behind all content.
 *
 * The CSS haze renders first (server render, reduced motion, no WebGL). On the client,
 * three.js and Vanta FOG load in a separate chunk and fade in over the haze.
 */
export function FogBackground() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let effect: { destroy: () => void } | null = null;
    let cancelled = false;

    // Dynamic imports keep three.js out of the main bundle and out of the server render.
    Promise.all([import("three"), import("vanta/dist/vanta.fog.min")])
      .then(([THREE, vanta]) => {
        const el = hostRef.current;
        if (cancelled || !el) return;
        // The vanta build is CommonJS marked __esModule. Depending on the bundler's interop
        // (Vite dev vs. production build), the function arrives as default or default.default.
        const mod = vanta.default as unknown as VantaFog | { default: VantaFog };
        const FOG = typeof mod === "function" ? mod : mod.default;
        effect = FOG({ el, THREE, ...FOG_OPTIONS });
        // Vanta logs and gives up without a canvas when WebGL is unavailable; keep the CSS haze then.
        if (el.querySelector("canvas")) setReady(true);
      })
      .catch(() => {
        // Chunk failed to load: the CSS haze stays.
      });

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, []);

  return (
    <>
      <div ref={hostRef} className={`fog-webgl${ready ? " is-ready" : ""}`} aria-hidden="true" />
      <div className={`fog-layer${ready ? " is-faded" : ""}`} aria-hidden="true">
        <div className="fog-haze fog-haze-a" />
        <div className="fog-haze fog-haze-b" />
        <div className="fog-grain" />
      </div>
    </>
  );
}
