from fastapi import APIRouter
from pydantic import BaseModel
from src.services.doubao_service import generate_summary

router = APIRouter()

class SummaryRequest(BaseModel):
    resume_text: str

class SummaryResponse(BaseModel):
    success: bool
    summary: str

@router.post("/", response_model=SummaryResponse)
def generate_summary_endpoint(request: SummaryRequest):
    try:
        summary = generate_summary(request.resume_text)
        return {"success": True, "summary": summary}
    except Exception as e:
        return {"success": False, "summary": str(e)}
