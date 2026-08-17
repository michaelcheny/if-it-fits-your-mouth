# If It Fits Your Mouth

A macronutrient calculator for flexible dieting (IIFYM). Uses the Mifflin-St Jeor equation to estimate BMR, then TDEE and daily macro targets based on your weight-change goal.

## Stack

- React 19 + TypeScript 5
- Vite 6 (dev server + production build)
- Vitest for tests
- Plain CSS with custom properties (no preprocessor)

## Getting started

```bash
npm install
npm run dev        # start dev server at http://localhost:5173
```

## Scripts

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Start the Vite dev server             |
| `npm run build`     | Type-check and build for production   |
| `npm run preview`   | Preview the production build locally  |
| `npm test`          | Run the Vitest test suite             |
| `npm run typecheck` | Run TypeScript type checking only     |

## Usage

1. Click the donut on the landing page to open the stats form.
2. Enter gender, age, height, weight, and activity level.
3. Adjust the goal slider on the results page (−2 to +2 lbs/week) — calories and macros update live.
4. Press `Esc` anywhere to open the command palette for navigation and theme switching.

Your stats and theme persist in `localStorage`, so they survive a page reload.

## Themes

Light, Dark, Monokai, Dracula (default), and Soft Tone — switch via the command palette (`Esc`).
