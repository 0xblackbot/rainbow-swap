## Project Overview and Structure
Rainbow Swap frontend (Vite + React + TypeScript) with smart contracts in FunC.
- `src/` app code
- `public/` static assets
- `contracts/` smart contracts (touch only when requested)
- `docs/` project docs and diagrams
- `dist/` build output (generated)

## Build and Test Commands
```bash
yarn
yarn start
yarn build
yarn lint
yarn ts
```

## Helpful CLI Tools and MCP Servers
- CLI: `yarn start`, `yarn build`, `yarn lint`, `yarn ts`
- MCP: Context7 (use for external library/API docs when adding new integrations)

## Workflow for Implementing a Feature
1) Locate the relevant UI in `src/` and confirm existing patterns.
2) Implement with TypeScript and functional components; reuse existing styles.
3) Add loading/error states for async UI.
4) Verify with `yarn ts` and `yarn lint`.

## Policies and Conventions
- Prefer TypeScript for new code.
- Keep shared UI in `src/components/` and feature logic in `src/features/` (if present).
- Avoid new dependencies unless necessary; explain why.
- Preserve the current visual language; verify at 360px and 1280px widths.

## Pointers to Task-Specific Guidance
- `README.md` for setup and overall context
- `docs/TMA-development.md` for TMA workflow
- `contracts/` for smart contract details

## Gotchas Codex Has Hit
- Keep this section updated in PRs when agent mistakes recur.
