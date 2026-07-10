from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.ai_service import AIService
from app.services.document_service import DocumentService

router = APIRouter(
    prefix="/ai",
    tags=["AI Chat"],
)


@router.post("/chat")
def chat_with_excel(
    payload: dict,
    db: Session = Depends(get_db),
):

    try:

        question = payload.get("question", "").strip()

        if not question:
            return {
                "success": False,
                "message": "Question cannot be empty."
            }

        document = DocumentService.get_active_workbook(db)

        if document is None:
            return {
                "success": False,
                "message": "No Active Workbook selected."
            }

        answer = AIService.ask_excel(
            document=document,
            question=question,
        )

        return {
            "success": True,
            "answer": answer,
        }

    except Exception as ex:

        raise HTTPException(
            status_code=500,
            detail=str(ex),
        )