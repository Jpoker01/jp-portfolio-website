// vanta and three@0.134 ship no TypeScript types; only the parts we call are declared.
declare module "vanta/dist/vanta.fog.min" {
  const FOG: (options: Record<string, unknown>) => { destroy: () => void };
  export default FOG;
}

declare module "three";
