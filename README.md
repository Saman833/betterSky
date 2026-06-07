# betterSky

The mobile weather app for checking conditions, saving favourite cities, and discovering places with similar weather.

---

## What this app is for

`bettersky` helps you see current weather and a multi-day forecast for your location, save cities you care about, and get suggestions for other cities with comparable temperature and conditions. On Home you view live weather for your GPS location (with cached or default fallback), add the city to Favorites, and browse the forecast. Favorites keeps saved cities on the device, lets you open each city’s detail screen, remove entries, and shows “Suggested for you” cities ranked by weather similarity. Settings includes profile and course demo screens for notifications, device motion, FlatList, and SectionList. The app is useful when you want quick mobile access to weather and personalised city discovery without a separate backend.

---

## Tech stack

betterSky is an Expo SDK 56 React Native app written in TypeScript. Screens and navigation live under `src/app` (Expo Router file-based routing); feature logic and reusable UI live in domain modlets under `src/shared`, imported via `#shared/*` and `#design/*` aliases. Weather data comes from the Open-Meteo Forecast API; favorites and cached location use AsyncStorage; location, notifications, haptics, and sensors use Expo modules. Tests use Jest, `jest-expo`, and React Native Testing Library.

Important stack pieces:

- Expo SDK 56 / React Native
- TypeScript
- Expo Router (tabs, stack, drawer)
- AsyncStorage
- Jest, `jest-expo`, and React Native Testing Library
- GitHub Actions CI
- Docker (nginx-served web export)
- EAS Build (optional Android builds)
- [Open-Meteo Forecast API](https://open-meteo.com/) (no API key required)
- Expo Location, Notifications, Sensors, Haptics

---

## Getting started

New team members should be able to run the app with these steps.

**Prerequisites**

- Node.js 24 and npm (see `.nvmrc`)
- Expo Go on a physical device, or an Android/iOS simulator
- Git

**Setup**

```bash
git clone https://github.com/Saman833/betterSky.git
cd betterSky
npm ci
```

No `.env` file is required for local development. Open-Meteo is a public API and does not need authentication. Location and notification permissions are requested at runtime by Expo modules.

**Validate and run**

```bash
npm run lint      # typecheck, ESLint, Prettier, Knip (same as CI)
npm run test:ci   # full test suite with coverage
npm start
```

Press `i` for the iOS simulator, `a` for Android, `w` for web, or scan the QR code with Expo Go on a device.

This repo includes `.npmrc` with `force=true` so `npm ci` matches the Expo dependency setup used in development.

---

## CI/CD

GitHub Actions workflow: `.github/workflows/verify-and-build.yaml`

**CI (on every push and pull request)**

- `npm ci --force`
- `npm run lint-typecheck`
- `npm run lint-eslint`
- `npm run lint-prettier`
- `npm run lint-knip`
- `npm run test:ci`

**CD (manual)**

From the GitHub Actions tab, run **Verify and Build** with `workflow_dispatch`. After verify passes, the workflow builds a Docker image and pushes it to GitHub Container Registry (`ghcr.io/<owner>/<repo>:latest`).

Node version is pinned in `.nvmrc` (24).

---

## Docker (web)

Build and serve the exported web app with nginx:

```bash
docker build -t bettersky .
docker run -p 8080:80 bettersky
```

Open http://localhost:8080. The weather API does not require a build-time environment variable.

To build the web bundle without Docker:

```bash
npm run build:web
```

Optional EAS Android build (requires Expo account):

```bash
npm run build:android
```

---

## Rules and considerations for new collaborators

Read this before your first PR. The rules below match the architecture used throughout the app.

**Architecture**

- Put application code under `src/` and organize by **domain modlets** (`weather`, `favorites`, `suggestions`, `settings`, `design`, etc.), not by layer folders like `presentation/` or `infrastructure/`.
- `src/app` is for routes and screen composition only (Expo Router). Keep business logic out of screen files when it belongs in `src/shared`.
- `src/shared` (`#shared`, `#design`) holds feature logic, API clients, design-system components, and device abstractions.
- Each module exposes a public `index.ts`. Import via `#shared/<module>` or `#design/<path>` — avoid deep imports with `../..` into another module’s internals.
- Keep navigation in `src/app/`. Screens call hooks and components from shared modules rather than inlining fetch or storage logic.
- Extract remote data access into dedicated files (e.g. `weatherApi.ts`) so components and hooks stay testable.

**UI**

- Reuse design-system primitives from `#design` (`Card`, `Typography`, `Toggle`, `FormGroup`, etc.) instead of one-off styled components.
- Follow existing screen patterns: loading, empty, and action states should match current tabs (Home, Favorites, Settings).

**Testing**

- Add or update tests when behavior changes. Prefer unit tests for pure logic (e.g. `getSimilarCities`, `favoritesLogic`); component tests with mocks for API-backed UI.
- Run `npm run lint` and `npm run test:ci` before opening a PR (same checks as CI).
- Keep architecture boundaries clear: routes stay in `src/app`, and reusable logic stays in `src/shared`.

**Git and workflow**

- Work on a feature branch; open a PR against `master`.
- Keep commits focused. Write messages that explain _why_, not just what changed.
- Do not commit secrets. This app does not require local secrets for the public weather API.
- Push early so CI runs on your branch. Fix failing checks before requesting review.

**Expo and dependencies**

- This project targets **Expo SDK 56**. Check the [v56 docs](https://docs.expo.dev/versions/v56.0.0/) before adding packages or APIs.
- Use `npm ci` in CI and locally after clone to match lockfile versions.
- After dependency changes, run `npm run lint`, `npm run test:ci`, and `npm run build:web`.

---

## Project structure

```
bettersky/
  src/
    app/
      _layout.tsx
      (tabs)/
        _layout.tsx
        index.tsx
        favorites/
        settings/
    shared/
      weather/
      favorites/
      suggestions/
      design/
      settings/
      location/
      notifications/
      haptics/
      sensors/
  assets/
  docker/
  .github/
  Dockerfile
```

---

## Testing

```bash
npm test              # Jest in watch mode
npm run test:ci       # full suite with coverage (CI)
npm run lint          # typecheck + ESLint + Prettier + Knip
npm run lint-typecheck  # TypeScript only
npm run build:web       # export static web bundle to dist/
npm run web             # Expo web dev server
```

Tests live next to shared code (`*.test.ts`, `*.test.tsx`) and cover smoke, unit, integration, and mocked API behaviour for components and feature logic.

The current suite covers 13 Jest test suites and reports coverage with `npm run test:ci`.

---

## Project status

Current features include:

- Home screen with current weather and multi-day forecast for GPS location (cached/default fallback).
- Extracted weather fetching in `src/shared/weather/weatherApi.ts`.
- File-based routing with tabs, stack, and drawer navigators.
- Favorites with AsyncStorage persistence, add/remove, and city detail screen.
- Similar-city suggestions based on temperature and weather-condition scoring.
- Shared design-system components with smoke and unit tests.
- Settings demos: profile, notifications, device motion, FlatList, SectionList.
- GitHub Actions CI (typecheck, lint, Knip, Jest).
- Docker web deployment via nginx and GitHub Container Registry.
