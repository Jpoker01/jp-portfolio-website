# AGENTS.md

- Portfolio content lives in the data arrays at the top of `src/routes/index.tsx`
  (`PROJECTS`, `SKILL_GROUPS`, `EXPERIENCE`). Edit content there, not inside the JSX.
- `EXPERIENCE` is one entry per employer: `company`, `location`, `period` (the overall
  range) and a `roles` array of sub-roles ordered newest first. Keep that shape so the
  timeline renderer keeps working; add a new employer as a new entry, not a new role.
- Every section reuses `SectionLabel` and the shared container (`max-w-6xl` outer,
  `max-w-4xl` inner) so headings, padding, dividers and tag chips stay identical.
- Content changes must not alter visuals: fonts, colours, animations and spacing are
  fixed by the owner. Verify with a desktop and a phone-width screenshot before reporting.
