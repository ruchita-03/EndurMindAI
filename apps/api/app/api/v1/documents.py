from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.document_service import DocumentService

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.get("/")
def get_documents(db: Session = Depends(get_db)):
    """
    Get all uploaded documents.
    """
    return DocumentService.get_documents(db)


@router.get("/search")
def search_documents(
    keyword: str,
    db: Session = Depends(get_db),
):
    """
    Search documents by filename.
    """

    return DocumentService.search_documents(
        db,
        keyword,
    )


@router.delete("/{document_id}")
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
):
    """
    Delete a document.
    """

    success = DocumentService.delete_document(
        db,
        document_id,
    )

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    return {
        "success": True,
        "message": "Document deleted successfully.",
    }


@router.put("/{document_id}/activate")
def activate_document(
    document_id: int,
    db: Session = Depends(get_db),
):
    """
    Set the Active Workbook.
    """

    document = DocumentService.set_active_workbook(
        db,
        document_id,
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    return {
        "success": True,
        "message": "Active Workbook updated.",
        "document": document,
    }


@router.get("/active")
def get_active_document(
    db: Session = Depends(get_db),
):
    """
    Get current Active Workbook.
    """

    document = DocumentService.get_active_workbook(db)

    if document is None:
        return None

    return document


@router.get("/{document_id}/download")
def download_document(
    document_id: int,
    db: Session = Depends(get_db),
):
    """
    Download a document.
    """

    document = DocumentService.get_document(
        db,
        document_id,
    )

    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    return FileResponse(
        path=document.filepath,
        filename=document.filename,
    )