# Steppe Mining V2 — Docker Full-Stack Website

## What this project contains

Frontend:
- React
- Vite
- Responsive design
- English/Mongolian language switch
- Dark/light mode
- Interactive project cards
- Project map section
- Careers
- Job application form
- Contact form
- Admin-style dashboard link

Backend:
- Node.js
- Express
- PostgreSQL
- REST API
- Job applications stored in database
- Contact messages stored in database

Docker:
- frontend container
- backend container
- PostgreSQL container

## 1. Start Docker

Install Docker Desktop, then open this folder in VS Code.

Open VS Code Terminal:

```bash
docker compose up --build
```

Open:

http://localhost:3000

API:

http://localhost:5000/api/health

## 2. Everyday development

Once containers are running, edit files in:

frontend/src/
backend/

The frontend uses Vite hot reload, so saving React/CSS files should update the browser.

Backend uses nodemon, so saving server files restarts the API.

## 3. Useful Docker commands

Start:

```bash
docker compose up
```

Start and rebuild:

```bash
docker compose up --build
```

Run in background:

```bash
docker compose up -d
```

See containers:

```bash
docker compose ps
```

See logs:

```bash
docker compose logs -f
```

Frontend logs:

```bash
docker compose logs -f frontend
```

Backend logs:

```bash
docker compose logs -f backend
```

Stop:

```bash
docker compose down
```

Stop and delete database data:

```bash
docker compose down -v
```

Rebuild only frontend:

```bash
docker compose up --build frontend
```

Open a shell inside backend:

```bash
docker compose exec backend sh
```

Open PostgreSQL:

```bash
docker compose exec db psql -U mining -d miningdb
```

## 4. Project architecture

Browser
  |
  v
React/Vite :3000
  |
  v
Express API :5000
  |
  v
PostgreSQL :5432

## Important

This is an original fictional mining website. It is not an official Oyu Tolgoi website and does not use Oyu Tolgoi proprietary branding.
