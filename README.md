# FrameCraft Studio

**FrameCraft Studio** is a modern, production-grade online Photo Collage Maker and Personalized Photo Frame Designer. It allows users to browse professionally designed layouts, upload photographs, auto-fit them into geometric clipping frames (including hearts, circles, and rounded rectangles), customize typography, interact with a dynamic calendar engine, and export 300 DPI print-ready artwork (JPG, PNG, and PDF).

---

## 🚀 Key Features

1. **Rich Handcrafted Templates**:
   - **Birthday**: Single portrait keepsakes, 5-photo layouts, 9-photo grids, center spotlight frames, and birthday calendar keepsakes.
   - **Anniversary & Couples**: Romantic heart-shaped photo slots, 1-year milestones ("365 Days of Us"), multi-love collages, and minimalist couple pairs.
   - **Baby & Kids**: Newborn birth statistics frames (date, time, weight, length), 12-month milestone journey (Months 1–12), and "Wild & One" first birthday collages.
   - **Interactive Calendar Engine**: Mathematical date engine supporting leap years, custom week start (Sunday/Monday), and custom highlighted celebration dates (heart, badge, or circle icons).
   - **Family Memories**: Heirloom posters ("The Heart of Our Home"), multi-generation triptychs, and Scandinavian gallery walls.
   - **Wedding & Memories**: Bridal triptychs, eternal vows, and polaroid-inspired travel wanderlust collages.

2. **Advanced Graphics Engine**:
   - **True Geometric Clipping**: Cubic-bezier parametric heart clipping paths, circular masks, and rounded rectangles with custom corner radiuses.
   - **Smart Cover-Fitting**: Calculates optimal image scaling to fill slots without aspect ratio distortion or stretching.
   - **Crop & Pan Controls**: Drag directly inside photo slots to adjust pan, zoom from 1.0x to 3.0x, rotate 90°, and reset crops.
   - **Auto-Fill & Reorder**: Predictably maps uploaded photos across all available slots with a single click.

3. **Typography & Styling**:
   - Google Fonts loaded: *Playfair Display*, *Outfit*, *Inter*, *Dancing Script*, *Great Vibes*, *Cinzel*, and *Montserrat*.
   - Live font sizing, bold/italic, alignment, letter spacing, line height, text shadows, and color swatches.
   - Editable preset captions.

4. **Print-Ready 300 DPI Export Engine**:
   - Dedicated off-screen HTML5 Canvas pipeline independent of editor zoom or screen resolution.
   - Formats: **PNG (Lossless)**, **JPG (High quality)**, and **PDF (jsPDF at print dimensions)**.
   - Presets: **4×6 in**, **5×7 in**, **8×10 in**, **11×14 in**, **12×12 in (Square)**, **A4 (210×297 mm)**, and **A3**.

5. **Persistence & Autosave**:
   - Local drafts saved via IndexedDB (`idb-keyval`) for instant recovery on page refresh.
   - Cloud saving with PostgreSQL, Prisma ORM, and secure JWT authentication with HTTP-only cookies.

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, Konva / React-Konva, Zustand, TanStack Query, jsPDF, Framer Motion, IndexedDB.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, Sharp, Multer, Pino, JWT, BcryptJS.
- **Infrastructure**: Docker Compose (PostgreSQL 16 on port 5433, Redis 7).
- **Testing**: Vitest, Supertest, Playwright.

---

## 📂 Monorepo Structure

```
framecraft-studio/
├── apps/
│   ├── web/                    # React + Vite + Tailwind + Konva frontend
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── canvas/     # Konva stage, photo slot, heart clipping, calendar
│   │   │   │   ├── editor/     # Toolbars, left toolbox, right property inspector
│   │   │   │   ├── export/     # High-resolution export modal (PNG/JPG/PDF)
│   │   │   │   └── layout/     # Navbar, Footer
│   │   │   ├── pages/          # Home, Editor, Detail, Projects, Auth
│   │   │   ├── stores/         # Zustand stores (editorStore, authStore)
│   │   │   └── lib/            # API client, IndexedDB storage
│   │   └── e2e/                # Playwright end-to-end tests
│   └── api/                    # Express + Prisma + Sharp REST backend
│       ├── prisma/             # Prisma schema & seed script
│       └── src/
│           ├── config/         # Database, logger, environment validation
│           ├── controllers/    # Auth, Templates, Projects, Assets, Exports
│           ├── middleware/     # JWT auth, error handler
│           └── routes/         # Versioned /api/v1 routes
├── packages/
│   └── shared/                 # Shared TypeScript types, schemas, geometry, templates
│       └── src/
│           ├── definitions/    # 20+ handcrafted templates & sample image assets
│           ├── geometry/       # Cover-fit, crop clamping, heart SVG path math
│           ├── calendar/       # Leap year calculation & calendar grid generator
│           ├── slot-filling/   # Auto-fill slot assignment algorithm
│           └── schemas/        # Zod runtime validation schemas
├── docker-compose.yml          # PostgreSQL & Redis containers
├── .env.example                # Sample environment configuration
└── package.json                # NPM workspaces configuration
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- **Node.js**: v18+ or v20+ or v22+
- **Docker & Docker Compose**: For local PostgreSQL database

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Database Services
```bash
docker compose up -d
```
This launches:
- PostgreSQL on `localhost:5433` (database `framecraft_db`, user `framecraft`, password `framecraft_secret_password`)
- Redis on `localhost:6379`

### 4. Database Setup & Seeding
```bash
# Push schema migrations to PostgreSQL
npm run prisma:push --workspace=@framecraft/api

# Seed 20+ rich templates into database
npm run prisma:seed --workspace=@framecraft/api
```

### 5. Start Development Servers
Run frontend and backend simultaneously:
```bash
# Start backend API (http://localhost:4000)
npm run dev:api

# In a separate terminal, start frontend web (http://localhost:5173)
npm run dev:web
```

---

## 🧪 Running Tests

### Unit & Integration Tests (Vitest)
```bash
# Run shared geometry, calendar, and schema tests
npm run test --workspace=@framecraft/shared

# Run backend API integration tests
npm run test --workspace=@framecraft/api

# Run editor store and state machine tests
npm run test --workspace=@framecraft/web
```

### End-to-End Tests (Playwright)
```bash
npm run test:e2e --workspace=@framecraft/web
```

---

## 🔒 Security & Privacy

- Passwords hashed with bcrypt (salt rounds = 10).
- Authentication tokens stored in HTTP-only, SameSite cookies.
- Uploaded images sanitized and stored under random UUID names; no user-controlled file paths.
- Input validation enforced at boundary with Zod schemas.
- Local drafts safely sandboxed in browser IndexedDB.
