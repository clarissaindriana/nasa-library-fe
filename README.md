# NASA Library – Frontend (Next.js)

## Overview

This repository contains the **frontend application** for the NASA Library system, built using **Next.js**. The frontend consumes REST APIs exposed by the backend (Spring Boot) and provides an interface for users such as students, librarians, and admins.

This README is intended as a **guidance document** for the frontend team and also aligns with the **backend development flow**, so collaboration across frontend–backend happens smoothly with minimal friction.

---

## Tech Stack

### Core Technologies

* **Framework**: Next.js (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **State Management**: React Context / hooks (can evolve later)
* **HTTP Client**: Fetch API / Axios
* **Auth Handling**: Token-based (JWT, handled by backend)

### Development Tools

* **Node.js**: LTS version
* **Package Manager**: npm / pnpm / yarn (team must standardize)
* **Version Control**: Git + GitHub

---

## Project Structure (High-Level)

> Exact structure may evolve, but conceptually:

* `app/` → Pages and routes (App Router)
* `components/` → Reusable UI components
* `services/` → API calls to backend
* `lib/` → Utilities (auth helpers, constants)
* `styles/` → Global styles
* `public/` → Static assets

---

## Environment Configuration

Create a `.env.local` file:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

Notes:

* All backend calls **must** go through this base URL
* Never hardcode backend URLs in components

---

## Development Flow (Frontend)

### 1. Branching Strategy (Same as Backend)

We use **Git Flow–style lightweight branching**:

* `main` → stable, production-ready
* `develop` → active integration branch
* `feature/<feature-name>` → individual features

Example:

```
feature/login-page
feature/book-catalog
```

---

### 2. Feature Development Flow

1. Pull latest develop

   ```bash
   git checkout develop
   git pull origin develop
   ```

2. Create feature branch

   ```bash
   git checkout -b feature/<feature-name>
   ```

3. Develop feature

   * UI first (mock / dummy data allowed)
   * Integrate API once backend endpoint is ready

4. Commit using clear messages

   ```bash
   feat: add book catalog page
   fix: handle empty book list state
   ```

5. Push and create Merge Request to `develop`

---

### 3. API Integration Contract (IMPORTANT)

Frontend and backend **must agree** on:

* Endpoint path
* HTTP method
* Request body
* Response structure
* Error format

Example contract:

```json
{
  "data": [...],
  "message": "success",
  "timestamp": "2026-01-01T10:00:00"
}
```

Frontend **must not** assume database structure.
Frontend only consumes API responses.

---

## Collaboration with Backend Team

### What Is the Same

* Branching strategy (`main`, `develop`, `feature/*`)
* PR-based merging
* Feature-based development

### What Is Different

| Backend             | Frontend                   |
| ------------------- | -------------------------- |
| DB & business logic | UI & UX                    |
| Spring Boot APIs    | Next.js pages & components |
| Docker + PostgreSQL | Node-based dev server      |

### Coordination Rules

* Backend exposes API first (even if dummy)
* Frontend can mock API during early development
* Breaking API changes must be communicated

---

## Running the Project Locally

```bash
npm run dev
```

Access:

```
http://localhost:3000
```

---

## Coding Conventions

* Use **functional components** only
* Keep components small and reusable
* API logic goes into `services/`, not pages
* Avoid business logic in UI components
