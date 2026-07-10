from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.document_service import DocumentService
from app.services.storage_service import StorageService

router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)


@router.post("/")
async def upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """
    Upload a document.

    Workflow

    1. Save physical file
    2. Create database record
    3. Extract PDF text (if PDF)
    4. Return saved document
    """

    try:

        # Save file to storage
        file_info = StorageService.save_file(file)

        # Create database record
        document = DocumentService.create_document(
            db=db,
            file_info=file_info,
        )

        knowledge_file = None

        # Extract PDF text for future AI knowledge base
        if document.filetype.lower() == "pdf":
            knowledge_file = DocumentService.extract_pdf(
                document.filepath
            )

        return {
            "success": True,
            "message": "Document uploaded successfully.",
            "document": {
                "id": document.id,
                "filename": document.filename,
                "filepath": document.filepath,
                "filetype": document.filetype,
                "filesize": document.filesize,
                "is_active": document.is_active,
                "status": document.status,
                "uploaded_at": document.uploaded_at,
            },
            "knowledge_file": knowledge_file,
        }

    except Exception as ex:
        raise HTTPException(
            status_code=500,
            detail=f"Upload failed: {str(ex)}",
        )