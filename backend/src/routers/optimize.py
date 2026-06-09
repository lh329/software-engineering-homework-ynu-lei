from fastapi import APIRouter
from pydantic import BaseModel
from src.services.doubao_service import optimize_resume_section

router = APIRouter()

class OptimizeRequest(BaseModel):
    content: str
    section: str

class OptimizeResponse(BaseModel):
    success: bool
    optimized: str
    explanation: str = ""

@router.post("/", response_model=OptimizeResponse)
def optimize(request: OptimizeRequest):
    try:
        optimized = optimize_resume_section(request.content, request.section)
        return {
            "success": True,
            "optimized": optimized,
            "explanation": "内容已优化"
        }
    except Exception as e:
        return {
            "success": False,
            "optimized": request.content,
            "explanation": str(e)
        }
