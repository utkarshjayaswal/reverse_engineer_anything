# REA evidence bundle

This repository holds one artifact: `rea-evidence-bundle.json` — the evidence bundle
produced by running REA (Reverse Engineer Anything) in static-analysis mode against a
small demo JavaScript application.

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

## How it was produced
Run against a 4-file ES-module demo app (a math lib, an auth helper, a cart, and an
entry point). The target was inspected statically — none of its code was executed.

## Notes
- The demo target was authored for this test and contains nothing proprietary.
- This repository contains the evidence bundle only; the REA tool itself is not included.
