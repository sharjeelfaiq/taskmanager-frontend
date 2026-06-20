# Task Manager — Frontend

Next.js + TailwindCSS frontend for the Task Manager application.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **Runtime:** React 19

---

## Setup

```bash
cd frontend
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> The backend must be running at `http://localhost:5000` before you start the frontend.

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api` |

---

## Features

- **Add tasks** — title (required) + description (optional)
- **Edit tasks** — inline edit form, pre-filled with existing values
- **Delete tasks** — removes with a single click
- **Toggle completion** — checkbox marks tasks done/undone with visual feedback
- **Empty state** — friendly prompt when no tasks exist
- **Error states** — all API errors shown to the user
- **Loading states** — buttons disable and show feedback during requests
- **GitHub profile lookup** — search any GitHub username and view their public profile
- **Responsive** — mobile-first layout, works on all screen sizes
- **Dark mode** — respects system color scheme
- **Accessible** — semantic HTML, keyboard navigation, ARIA labels

---

## Project Structure

```
src/
  app/
    layout.tsx      # root layout, fonts, metadata
    page.tsx        # server component, fetches initial tasks
    globals.css     # Tailwind v4 setup
  components/
    TaskForm.tsx    # create/edit form
    TaskItem.tsx    # single task row
    TaskList.tsx    # list with empty state
    TaskManager.tsx # stateful orchestrator (client)
    GitHubLookup.tsx# GitHub search + profile card
  lib/
    api.ts          # typed API client
  types/
    index.ts        # Task, GitHubProfile interfaces
```

---

## GitHub API Integration

The GitHub lookup feature calls the backend at `/api/github/:username`, which proxies to the GitHub public API. The frontend never calls GitHub directly, which means:

- No CORS issues
- GitHub tokens can be added server-side later without frontend changes
- Error messages (404 not found, 502 unavailable) are standardized before the client sees them

Search any public GitHub username to see their avatar, display name, public repo count, followers, following count, and a direct link to their profile.

---

## Code Review & Architecture

### 1. Securing a Web Application

Input validation happens on both the client (empty title check, trimming) and the server (Joi schemas). Never trust client input alone. API keys and secrets are server-side only — `NEXT_PUBLIC_` variables are safe for browser consumption because they contain no secrets.

Content Security Policy headers (via Helmet on the backend) reduce XSS surface area. Forms use controlled inputs, avoiding `dangerouslySetInnerHTML`. Dependencies are kept updated to patch known CVEs. In production, the app runs over HTTPS, which prevents man-in-the-middle attacks and session hijacking.

Rate limiting on the backend prevents abuse. CORS is restricted to the known frontend origin. For authenticated routes, JWTs with short expiry and `httpOnly` cookie storage (not `localStorage`) prevent token theft.

### 2. How Would You Improve a Slow React Application?

First, profile with React DevTools to find unnecessary re-renders. `React.memo` prevents re-rendering components whose props haven't changed. `useCallback` stabilizes handler references passed to memoized children. `useMemo` caches expensive computed values.

Code split heavy components with `dynamic(() => import(...), { loading: () => <Spinner /> })` — this defers loading until needed. Next.js `<Image>` handles lazy loading, modern formats, and responsive `srcset` automatically.

For data, React Query or SWR provides stale-while-revalidate caching that eliminates redundant fetches. Server Components (already used here) remove entire data-fetching roundtrips from the client bundle. Finally, `next build --analyze` identifies oversized imports to tree-shake or replace.

### 3. SQL vs NoSQL — When to Use Each

**SQL** (PostgreSQL, MySQL): Use when your data has clear, stable relationships (users → orders → products), when you need ACID transactions across multiple tables (e.g., bank transfers), or when complex queries with JOINs and aggregations are central to the app. The rigid schema enforces data quality at the database level.

**NoSQL** (MongoDB, DynamoDB, Redis): Use when documents are self-contained and always read together (tasks, blog posts, user profiles), when the schema needs to evolve quickly, or when you need to scale writes horizontally. MongoDB's flexible document model eliminates the ORM impedance mismatch with JSON APIs.

This app uses MongoDB because tasks are independent documents with no joins needed, and the schema is likely to evolve (add tags, priority, due dates) without requiring migrations.

### 4. Deploying a Full-Stack App to AWS

**Frontend:** Deploy to Vercel — it integrates with GitHub, handles SSR and edge rendering for Next.js, and deploys automatically on push. Set `NEXT_PUBLIC_API_URL` to the production backend URL in the Vercel dashboard.

**Backend:** Containerize with Docker. Push the image to Amazon ECR. Run on ECS Fargate behind an Application Load Balancer. The ALB terminates TLS (ACM certificate) and routes HTTPS traffic to the container. Store `MONGODB_URI` and other secrets in AWS Secrets Manager, injected as environment variables at runtime.

**Database:** MongoDB Atlas (hosted on AWS). The Atlas cluster's IP whitelist allows only the ECS tasks' security group. Atlas handles automated backups and replication.

**CI/CD:** GitHub Actions — on merge to `main`, run lint, tests, Docker build, push to ECR, and deploy to ECS via a rolling update. Vercel handles the frontend pipeline automatically.

**Monitoring:** CloudWatch for ECS metrics and logs. Sentry for application errors on both sides. Alert on error rate and p95 latency.
