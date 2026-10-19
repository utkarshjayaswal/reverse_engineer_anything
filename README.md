# REA evidence bundle

This repository holds the artifact produced by running REA (Reverse Engineer
Anything) in static-analysis mode against a small demo JavaScript application,
plus the source of that application.

REA is the open-source reverse-engineering CLI + MCP server from the `morluto/rea`
project:

- Source: https://github.com/morluto/rea
- Website: https://rea.tools
- npm package: `rea-agents` (v6.7.0 used here)

## What the bundle contains
- The analysis operation (`analyze_javascript_application`) and the provider that ran it
- A JavaScriptApplicationGraph: every source module with its exports and import edges
- Per-file SHA-256 digests and source ranges for each finding
- Confidence tags per finding (all `exact` / `high`; AST-based, no code executed)

## The demo target
`target/` contains the 4-file ES-module app that was analysed, so the bundle is
self-contained and reproducible:

- `target/package.json`
- `target/src/index.js` — entry point (`main`)
- `target/src/math.js` — `add`, `multiply`, `factorial`
- `target/src/auth.js` — `hashPassword`, `checkPassword`, `sessionId`
- `target/src/cart.js` — `lineTotal`, `cartTotal`

## How it was produced
REA inspected the target statically — none of its code was executed during analysis.

## Notes
- The demo target was authored for this test and contains nothing proprietary.
- This repository contains the evidence bundle and target source only; the REA tool
  itself is not included.
