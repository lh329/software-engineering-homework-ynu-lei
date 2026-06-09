from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uvicorn

from src.routers import optimize, jd_analyzer, career, summary

load_dotenv()

app = FastAPI(title="AI Resume Generator API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(optimize.router, prefix="/api/optimize", tags=["优化"])
app.include_router(jd_analyzer.router, prefix="/api/jd", tags=["JD分析"])
app.include_router(career.router, prefix="/api/career", tags=["职业推荐"])
app.include_router(summary.router, prefix="/api/summary", tags=["个人简介"])

@app.get("/")
def read_root():
    return {"message": "AI Resume Generator API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
