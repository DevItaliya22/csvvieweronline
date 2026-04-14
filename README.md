<div align="center">

## CSV Editor Online

**Free, local-first CSV viewer and tabular tools in the browser** — open large CSV files in a fast grid, convert between CSV, JSON, Parquet, and Excel-friendly formats, compare files, and export Markdown tables. Processing stays **on your device** whenever possible; see the live product at [csveditoronline.org](https://csveditoronline.org/).

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[Live site](https://csveditoronline.org/) · [Source](https://github.com/DevItaliya22/csvvieweronline)

</div>

---

## Table of contents

- [Why CSV Editor Online?](#why-csv-editor-online)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Internationalization](#internationalization)
- [Project structure](#project-structure)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

---

## Why CSV Editor Online?

- **Local-first**: CSV and related workflows are built so parsing and editing run in your browser; sensitive files are not uploaded for those paths.
- **Multilingual**: UI strings are provided per locale via [next-intl](https://next-intl-docs.vercel.app/) and `messages/*.json`.
- **Modern stack**: Next.js App Router, React 19, TypeScript, Tailwind CSS v4, and accessible UI primitives (Radix-style components).

---

## Features

- **Viewer and editor**: Sort, filter, search, edit, paste, undo/redo, add or remove rows; session data can be restored from browser storage on return visits.
- **Converters**: CSV ↔ JSON, CSV ↔ Parquet, JSON ↔ Parquet, Parquet ↔ JSON, CSV → Markdown table, CSV/JSON ↔ Excel-oriented flows, and related tooling where exposed in the app.
- **Compare and inspect**: Side-by-side CSV comparison, Parquet preview, and legacy Excel (`.xls`) viewing paths in the browser.
- **Content**: Programmatic SEO pages (guides, tool hubs), blog, and legal pages aligned with the public site.

> **Note:** If a specific tool ever sends data to a server, the UI should state that explicitly. Default tabular flows are designed to stay client-side.

---

## Tech stack

| Area      | Choices                                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------------------------- |
| Framework | [Next.js](https://nextjs.org/) (App Router)                                                                                 |
| UI        | React 19, [Tailwind CSS](https://tailwindcss.com/) v4, [Radix UI](https://www.radix-ui.com/), [Lucide](https://lucide.dev/) |
| i18n      | [next-intl](https://next-intl-docs.vercel.app/)                                                                             |
| Quality   | [Biome](https://biomejs.dev/), TypeScript, [Vitest](https://vitest.dev/)                                                    |

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/) — version pinned via `packageManager` in `package.json` (Corepack: `corepack enable`)

### Install and run

```bash
pnpm install
pnpm dev
```

Then open the URL shown in the terminal (usually `http://localhost:3000`).

### Production build

```bash
pnpm build
pnpm start
```

---

## Scripts

| Command                       | Description                    |
| ----------------------------- | ------------------------------ |
| `pnpm dev`                    | Development server             |
| `pnpm build`                  | Production build               |
| `pnpm start`                  | Run production server          |
| `pnpm lint` / `pnpm lint:fix` | Biome lint (and auto-fix)      |
| `pnpm typecheck`              | TypeScript, no emit            |
| `pnpm check`                  | `lint` + `typecheck`           |
| `pnpm test`                   | Vitest                         |
| `pnpm validate:pseo`          | Validate programmatic SEO data |
| `pnpm clean`                  | Remove common build artifacts  |

---

## Internationalization

- Canonical strings: `messages/en.json`
- Other locales: `messages/*.json`
- Supported locale codes are defined in `src/i18n/routing.ts` (for example `en`, `zh`, `es`, `pt`, `fr`, `de`, `nl`, `it`, `ja`, `tr`, `az`, `ko`, `ar`, `fa`, `ru`, `he`, `el`).
- After changing English copy, mirror updates across locales as needed and run `pnpm test` (message parity is covered by tests under `src/lib/test/`).

---

## Project structure

```
src/app/           # App Router: localized pages, layouts, route handlers
src/app/components/# Feature apps (CSV viewer, converters, compare, etc.)
src/components/    # Shared UI, data grid, marketing blocks
src/lib/           # CSV/Parquet/Excel logic, SEO, pseo helpers
src/i18n/          # Routing and next-intl wiring
messages/          # Translation JSON per locale
public/            # Static assets
```

---

## Contributing

Contributions are welcome.

1. **Fork** the repository and create a branch from the default branch.
2. **Make changes** with clear commits.
3. **Run checks** before opening a PR:

```bash
pnpm check
pnpm test
```

4. When you touch user-visible copy, keep `messages/*.json` in sync across locales where applicable.
5. Open a **pull request** with a short description of what changed and why.

Please keep PRs focused. Match existing patterns (TypeScript, Biome formatting, and component style).

---

## Security

If you discover a security issue, please **do not** open a public issue. Contact the maintainers privately (for example via [GitHub Security Advisories](https://github.com/DevItaliya22/csvvieweronline/security) or another channel the maintainers publish for the project).

---

## License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0-only)** — see the [LICENSE](./LICENSE) file.

---

Built with care by [contributors](https://github.com/DevItaliya22/csvvieweronline/graphs/contributors).

</div>

## Authors

See the [contributors graph](https://github.com/DevItaliya22/csvvieweronline/graphs/contributors) on GitHub.
