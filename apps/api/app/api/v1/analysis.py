from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.document_service import DocumentService
from app.services.excel_service import ExcelService

router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"],
)


@router.get("/excel")
def preview_active_excel(
    db: Session = Depends(get_db),
):
    """
    Preview the currently selected Active Workbook.
    """

    document = DocumentService.get_active_workbook(db)

    if document is None:
        return {
            "success": False,
            "message": "No Active Workbook selected."
        }

    stats = ExcelService.statistics(document)

    return {
        "success": True,
        "document_id": document.id,
        **stats
    }