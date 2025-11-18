# Hina POS - Frontend (hina-client)

This repository contains the frontend for a Point-of-Sale / Inventory application.

## Project Overview

This repository is a full-stack project split into two main folders:

- `hina-client` — Frontend (React + TypeScript)
- `hina-server` — Backend (Node.js + Express + Sequelize)

The frontend (`hina-client`) is a Vite + React TypeScript app using Material UI for the UI and Redux Toolkit for state management. The backend (`hina-server`) is an Express app using Sequelize with a MySQL-compatible database and Passport-based authentication.

### Frontend (hina-client)

- Framework / Language: React 18 with TypeScript
- Bundler / Dev Server: Vite
- UI library: MUI (Material UI) and MUI DataGrid (`@mui/x-data-grid`)
- Routing: `react-router-dom` v6
- State management: Redux Toolkit (`@reduxjs/toolkit`) + `react-redux`
- Forms: `react-hook-form` (Formik is also present in dependencies)
- HTTP client: `axios` with `src/api/axios.ts` for a configured instance (adds Authorization and org_id headers)
- Styling: MUI theming + Tailwind (`tailwindcss`) + local CSS files
- Notifications: `react-hot-toast`
- Utilities: `lodash`, `dayjs`/`moment`, `uuid`
- Dev tooling: ESLint, TypeScript, Vite

Notable patterns:

- API calls are centralized under `src/api/services` and thunk-based async calls live in `src/store/Thunks` (Redux Toolkit `createAsyncThunk`).
- Pages live under `src/pages/*`, with reusable components in `src/components` such as `ModulePage` and `ListView` for tabular CRUD flows.

### Running locally (Frontend)

```powershell
cd hina-client
npm install
npm run dev
```

Make sure environment variables are set:

- `VITE_API_URL` should point to the backend API base (for example `http://localhost:3000`).

### Notes & Suggestions

- The frontend attaches a Bearer token from `localStorage` to each request and sends an `org_id` header when company details are present — this indicates multi-tenant behavior.
- Consider adding a `getRateVersion` API helper if you often fetch single records (currently thunks request with filters).
- The project mixes MUI and Tailwind; consider standardizing if desired.

---

For backend details and run instructions, see `../hina-server/README.md`.