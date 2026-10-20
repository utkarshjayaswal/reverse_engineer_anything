# Wiring REA (`rea-agents`) into your agent as an MCP server

REA runs as a local MCP server over stdio. You register it once with your agent,
restart the agent, and it gains REA's 207 tools. Nothing is uploaded — analysis is
local.

---

## Prerequisite: Node.js 22.19+ (or 24.11+, or 26+)

REA will not run correctly on older Node. Check first:

```bash
node -v
```

If it is below 22.19, install a supported release (nvm, fnm, or the official
installer) before continuing. (On Node 20 the server does start and list all 207
tools, but deeper request flows can fail with a WebAssembly "out of memory"
error — so use a supported Node.)

---

## Option A — let REA wire itself (recommended)

```bash
npx rea-agents@latest setup
```

Setup detects the supported agents on your machine (Claude Code, Codex, Cursor,
Gemini CLI, Grok, and others), prints the exact plan — every path it will write,
every backup, every external action — and asks for your approval before changing
anything. Existing client config is backed up, updated atomically, and read back.
Restart the named agents afterwards.

To register one specific agent instead:

```bash
npx rea-agents@latest mcp add --agent claude-code
npx rea-agents@latest mcp add --agent cursor
```

Add `--no-global` to register in the current project rather than globally.

---

## Option B — paste the config yourself

### Claude Code (CLI)

```bash
claude mcp add rea -- npx -y rea-agents@6.7.0 mcp
```

### Cursor / Claude Desktop / any client that reads an `mcp.json`

```json
{
  "mcpServers": {
    "rea": {
      "command": "npx",
      "args": ["-y", "rea-agents@6.7.0", "mcp"]
    }
  }
}
```

### Codex (`~/.codex/config.toml`)

```toml
[mcp_servers.rea]
command = "npx"
args = ["-y", "rea-agents@6.7.0", "mcp"]
```

Pin the version you have tested. To always take the newest release, replace
`rea-agents@6.7.0` with `rea-agents@latest`.

---

## Verify the wiring

```bash
npx rea-agents@latest mcp doctor
```

Healthy output looks like:

- `initialize` — ok, `rea@<version>`
- `inventory:tools` — 207 observed, missing none
- `inventory:prompts` — 6 observed, missing none

Then restart your client so it reconnects and discovers the `rea` server.

---

## Optional: skill only (no MCP server)

If you only want the agent instructions and bundled references, without the MCP
server or analysis engines:

```bash
npx skills add morluto/rea --skill reverse-engineer-anything
```

---

## Notes

- The server registers under the name `rea` and speaks MCP over stdio.
- `rea uninstall` removes REA-owned agent configuration and skill files.
- Native analysis (binaries) additionally needs an analysis engine — Hopper,
  Ghidra, or IDA — configured separately. Static JavaScript analysis needs none.
- Security: REA is **not** a sandbox. It opens targets with your own user
  permissions, so analyze untrusted binaries in a disposable VM, not on your
  daily machine.
- Official sources only: `github.com/morluto/rea`, `rea.tools`, npm package
  `rea-agents`. Lookalike repos and standalone `.exe` downloads are not REA.
