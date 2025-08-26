# Notes Frontend

Next.js-based UI for a personal notes application. Includes:
- User authentication (login/signup)
- Notes CRUD (list, create, edit, delete)
- Search notes
- Modern light theme with colors:
  - primary: #2563eb
  - secondary: #64748b
  - accent: #facc15
- Layout: Header + Sidebar (notes list) + Main editor/view.

## Environment variables

Create a `.env.local` file at the project root with:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

The app reads the auth token from `localStorage` key `auth_token`.

## Backend API (expected)

- POST /auth/login { email, password } -> { token, user }
- POST /auth/signup { email, password } -> { token, user }
- GET /auth/me -> { id, email }
- GET /notes?q=... -> Note[]
- POST /notes { title, content } -> Note
- GET /notes/:id -> Note
- PUT /notes/:id { title, content } -> Note
- DELETE /notes/:id -> { success: true }

All notes endpoints require header `Authorization: Bearer <token>`.

## Run locally

Install dependencies and start:

```
npm install
npm run dev
```

Navigate to http://localhost:3000

## Build and export

```
npm run build
npm start
```

## Styling

The app uses Tailwind CSS (v4) and CSS variables for brand colors. Utilities like `.bg-primary`, `.text-secondary`, `.bg-accent` are available in `globals.css`.
