# Vue Pizza

Pizzeria SPA built with Vue 3, TypeScript, and SCSS.

## Tech Stack

- **Framework:** Vue 3.5 (Composition API, `<script setup>`)
- **Language:** TypeScript 5.9 (strict)
- **Styles:** SCSS (BEM methodology)
- **Build:** Vite 7
- **State:** Pinia
- **Routing:** Vue Router
- **Testing:** Vitest + Vue Test Utils

## Prerequisites

- Node.js 22+ (use `nvm use` with included `.nvmrc`)

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment config
cp .env.example .env

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## Environment Variables

| Variable | Values | Description |
|----------|--------|-------------|
| `VITE_API_MODE` | `mock` / `real` | API data source toggle |
| `VITE_API_BASE_URL` | URL | Backend API base URL |

## Project Structure

```
src/
├── api/             # API service layer (mock/real switch)
├── assets/          # Static assets (fonts, icons, images)
├── components/      # Reusable UI components
│   ├── ui/          # Base UI kit
│   └── layout/      # Layout components (header, footer)
├── composables/     # Composition functions
├── config/          # App configuration
├── data/            # Static mock data
├── pages/           # Page-level components
├── router/          # Vue Router config
├── stores/          # Pinia stores
├── styles/          # Global SCSS (variables, mixins, reset)
├── types/           # Shared TypeScript types
├── utils/           # Utility functions
└── __tests__/       # Unit tests
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests (single run) |
| `npm run test:watch` | Run tests in watch mode |
