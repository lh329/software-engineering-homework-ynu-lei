from fastapi import APIRouter
from pydantic import BaseModel
from src.services.doubao_service import generate_career_path

router = APIRouter()

class CareerRequest(BaseModel):
    resume_text: str

class CareerResponse(BaseModel):
    success: bool
    result: str

@router.post("/", response_model=CareerResponse)
def get_career_advice(request: CareerRequest):
    try:
        result = generate_career_path(request.resume_text)
        return {"success": True, "result": result}
    except Exception as e:
        return {"success": False, "result": str(e)}
