from fastapi import APIRouter
from pydantic import BaseModel
from src.services.doubao_service import analyze_jd, match_resume

router = APIRouter()

class JDAnalyzeRequest(BaseModel):
    jd_text: str

class JDAnalyzeResponse(BaseModel):
    success: bool
    result: str

class JDMatchRequest(BaseModel):
    resume_text: str
    jd_text: str

class JDMatchResponse(BaseModel):
    success: bool
    result: str

@router.post("/analyze", response_model=JDAnalyzeResponse)
def analyze_jd_endpoint(request: JDAnalyzeRequest):
    try:
        result = analyze_jd(request.jd_text)
        return {"success": True, "result": result}
    except Exception as e:
        return {"success": False, "result": str(e)}

@router.post("/match", response_model=JDMatchResponse)
def match_resume_endpoint(request: JDMatchRequest):
    try:
        result = match_resume(request.resume_text, request.jd_text)
        return {"success": True, "result": result}
    except Exception as e:
        return {"success": False, "result": str(e)}
