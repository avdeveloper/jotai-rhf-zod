# Take-Home Exercise: User Preferences Panel

## Overview

Build a small page that lets a user set and persist two preferences: a text
color and a theme. This is a state-architecture exercise — the UI is
intentionally simple so we can focus on *how* you structure state, not how
much of it there is.

## What to build

**Page background** driven by resolved theme:
- `light` → `lightyellow`
- `dark` → `dimgray`
- `system` → resolve via the OS setting (`prefers-color-scheme`), and update
  live if the OS theme changes while the tab is open

**A centered form** with two fields:
1. **Text color** — a text input for a hex color code (e.g. `#1a1a1a`).
   Once valid, apply it as the text color for the form's own labels/text.
2. **Theme** — a radio group: Light / Dark / System.

**Hex validation** is asynchronous. You're given a mock API below — treat it
as a real network call (i.e., don't just inline a regex and call it done, even
though the mock's implementation happens to use one under the hood).

```js
// mockApi.js — provided
export async function validateHexColor(hex) {
  await new Promise((resolve) => setTimeout(resolve, 400)) // simulated latency
  const isValid = /^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)
  return isValid ? true : 'Enter a valid hex color (e.g. #1a1a1a)'
}
```

**Persistence:** preferences (`textColor`, `theme`) should survive a page
reload via `localStorage`.

**Form library:** use React Hook Form for the form itself and Jotai for the
persisted preference state. The form should be prefilled from whatever was
last saved.

## Constraints

- Use `atomWithStorage` from `jotai/utils` for persistence — don't hand-roll
  `localStorage.getItem`/`setItem` calls.
- Use React Hook Form for field state, validation, and submit handling.
- Preferences should only be written to storage on submit, not on every
  keystroke or radio change.
- No required UI framework — plain CSS/inline styles are fine. We're not
  grading visual polish.

## Suggested time box

45–60 minutes.

## Starter files provided

```
preferences-exercise/
├── mockApi.js       (given, above)
├── App.jsx           (empty shell, renders <PreferencesForm />)
└── PreferencesForm.jsx  (empty, yours to build)
```

---

## Interviewer notes (do not share with candidate)

This exercise is designed to surface a specific, common anti-pattern: syncing
Jotai atom state and RHF field state via `useEffect`. Watch for it.

### What we're evaluating

- [ ] **No `useEffect` mirroring form state into an atom or vice versa.**
      The atom seeds `defaultValues` once; RHF owns the live field values.
      A `useEffect(() => setAtom(watch()), [watch()])`-shaped bug is the main
      thing this exercise is built to catch.
- [ ] **System theme resolved via `matchMedia`, live-updating.** A candidate
      who only reads `matchMedia(...).matches` once on mount (no listener)
      has a working-enough but incomplete solution — worth a follow-up
      question rather than an auto-fail.
- [ ] **Hex validation treated as genuinely async** — a loading/pending state
      or disabled submit while the check is in flight, not a blocking call
      that freezes the UI. Bonus point if they debounce or scope it to
      onBlur rather than firing on every keystroke.
- [ ] **Validation architecture is deliberate**, whether that's a zod async
      `.refine` at submit, a manual onBlur handler with local hint state, or
      both — ask them to explain the tradeoff rather than scoring one
      approach as strictly correct.
- [ ] **Save happens once, at submit** — not written to storage on every
      radio click or keystroke.
- [ ] **Reasonable separation** between the API call (`validateHexColor`) and
      whatever orchestrates calling it — doesn't need to be a formal
      multi-layer architecture for something this small, but the API call
      shouldn't be tangled directly into JSX event handlers with no
      separation at all.

### Good follow-up questions

- "What would you change if this preferences panel needed to be correct on
  the very first server-rendered paint, in a Next.js app?" (Tests whether
  they know `atomWithStorage`/localStorage don't exist on the server — good
  candidates will mention cookies or a server-read value as the alternative.)
- "What happens right now if the user is on the system theme and their OS
  switches from light to dark while this tab is open?" (Tests whether their
  `matchMedia` subscription is live or a one-time read.)
- "Why might we validate the hex code with an API call instead of just a
  regex?" (Looking for: reserved/branded colors, palette restrictions,
  accessibility contrast checks against the background — anything that shows
  they get *why* this is plausible as a real API, not just following
  instructions.)
