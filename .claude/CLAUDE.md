# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Commands

```bash
mise run dev        # Start dev server (ng serve)
mise run build      # Format, lint, then build (ng build)
mise run deploy     # Build then deploy to Cloudflare Workers (wrangler deploy)
mise run format     # Run eslint + prettier
mise run eslint     # Lint only
mise run prettier   # Format only
ng test             # Run unit tests with Vitest
```

Package manager is `bun`. Never use `npm install` — use `bun install` or `bun add`.

## Architecture

```
src/app/
├── app.ts / app.html     Root component with header, theme switcher, nav
├── app.routes.ts         Top-level routes (lazy-loaded features)
├── app.config.ts         ApplicationConfig (providers)
├── features/             One directory per page/feature (lazy-loaded)
│   ├── auth/             sign-in, sign-up pages + auth.routes.ts
│   └── home/             home page
└── shared/
    ├── services/         Auth, Supabase, Theme, LocalStorage services
    ├── enums/            AuthStatus enum
    └── types/            AuthState discriminated union, Theme type

libs/ui/                  60+ SpartanNG UI components (@spartan/* path aliases)
src/database.types.ts     Auto-generated Supabase types (do not edit manually)
src/environments/         Supabase URL + publishable key config
```

**Routing**: All feature routes use `loadComponent` / `loadChildren` for lazy loading. Auth is a child route group under `/auth`.

**Auth flow**: `AuthService` initializes from `supabase.client.auth.getSession()` then subscribes to `onAuthStateChange`. Exposes `state`, `user`, `isAuthenticated`, `isLoading` signals. Auth status is a discriminated union: `LOADING | AUTHENTICATED | UNAUTHENTICATED`.

**Supabase**: `SupabaseService` holds the typed client (`createClient<Database>`). All DB queries go through `this.supabase.client`. Types come from `src/database.types.ts` which is regenerated via the Supabase MCP tools (never edit manually).

**Deployment**: Cloudflare Workers via `wrangler.toml`. SSR build target.

## Infrastucture

This project uses mise for handling package versions, scripts and environment variables. It also uses bun instead of npm. For styling, it uses TailwindCSS.

## UI Components (SpartanNG)

Components live in `libs/ui/` and are imported via `@spartan/*` path aliases (e.g. `@spartan/ui-button-helm`). Use the `hlm()` utility from `@spartan/ui-utils` (wraps clsx + tailwind-merge) for conditional class merging.

Available component categories include: accordion, alert, avatar, badge, button, card, dialog, dropdown-menu, form-field, icon, input, label, select, separator, sheet, sidebar, skeleton, sonner, spinner, table, tabs, toggle, tooltip, and more.

Import pattern:

```typescript
import { HlmButtonDirective } from '@spartan/ui-button-helm';
import { hlm } from '@spartan/ui-utils';
```

Icons use `ng-icons` with Lucide. Register icons via `provideIcons()` in the component's `providers` array.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
    - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Signal Forms instead of Reactive forms and Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- `effect()` should be the last API you reach for. Always prefer `computed()` for derived values and `linkedSignal()` for values that can be both derived and manually set.
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead
- Use `resource()` from `@angular/core` for handling asynchronous data fetching and integrating it into signals.

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
