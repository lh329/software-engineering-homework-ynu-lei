# Backend

FastAPI service for AI resume optimization, JD analysis, career advice, and summary generation.

## Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Edit `.env` and set `DOUBAO_API_KEY`.

## Run

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The frontend calls this service through the `/api/*` endpoints configured in `src/lib/api.ts`.
