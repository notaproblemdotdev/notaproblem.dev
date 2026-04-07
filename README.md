# notaproblem.dev

Simple Solid.js landing page built with Vite.

## Requirements

- Node.js 22+
- Bun

## Install

```bash
bun install
```

## Development

```bash
bun run dev
```

## Build

```bash
bun run build
```

## Preview production build

```bash
bun run preview
```

## Cloudflare Pages local dev

Build first:

```bash
bun run build
```

Then run:

```bash
npx wrangler pages dev dist --compatibility-flag=nodejs_compat
```
