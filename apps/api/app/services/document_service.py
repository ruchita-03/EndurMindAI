from pathlib import Path
from typing import Optional


from sqlalchemy.orm import Session

from app.models.document import Document
from app.services.storage_service import StorageService


class DocumentService:
    """
    Enterprise Document Service

    Responsibilities:
        - Create document records
        - Delete documents
        - Retrieve documents
        - Manage Active Workbook
        - Extract PDF text (temporary - will move to KnowledgeService)
    """

    # ------------------------------------------------------------------
    # Database Operations
    # ------------------------------------------------------------------

    @staticmethod
    def create_document(db: Session, file_info: dict) -> Document:
        document = Document(
            filename=file_info["filename"],
            filepath=file_info["filepath"],
            filetype=file_info["extension"].replace(".", ""),
            filesize=file_info["size"],
        )

        db.add(document)
        db.commit()
        db.refresh(document)

        return document

    @staticmethod
    def get_documents(db: Session):
        return (
            db.query(Document)
            .order_by(Document.uploaded_at.desc())
            .all()
        )

    @staticmethod
    def get_document(db: Session, document_id: int) -> Optional[Document]:
        return (
            db.query(Document)
            .filter(Document.id == document_id)
            .first()
        )

    @staticmethod
    def delete_document(db: Session, document_id: int) -> bool:

        document = DocumentService.get_document(db, document_id)

        if not document:
            return False

        StorageService.delete_file(document.filepath)

        db.delete(document)
        db.commit()

        return True

    # ------------------------------------------------------------------
    # Active Workbook
    # ------------------------------------------------------------------

    @staticmethod
    def set_active_workbook(db: Session, document_id: int):

        db.query(Document).update(
            {
                Document.is_active: False
            }
        )

        document = (
            db.query(Document)
            .filter(Document.id == document_id)
            .first()
        )

        if not document:
            return None

        document.is_active = True

        db.commit()
        db.refresh(document)

        return document

    @staticmethod
    def get_active_workbook(db: Session):

        return (
            db.query(Document)
            .filter(Document.is_active.is_(True))
            .first()
        )

    # ------------------------------------------------------------------
    # Search
    # ------------------------------------------------------------------

    @staticmethod
    def search_documents(db: Session, keyword: str):

        return (
            db.query(Document)
            .filter(Document.filename.ilike(f"%{keyword}%"))
            .order_by(Document.uploaded_at.desc())
            .all()
        )

    # ------------------------------------------------------------------
    # PDF Extraction
    # ------------------------------------------------------------------

    @staticmethod
    def extract_pdf(filepath: str):
      from pypdf import PdfReader

      reader = PdfReader(filepath)

      text = ""

      for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
              text += page_text + "\n"

      knowledge_dir = Path("storage/knowledge")
      knowledge_dir.mkdir(parents=True, exist_ok=True)

      txt_file = knowledge_dir / (Path(filepath).stem + ".txt")

      with open(txt_file, "w", encoding="utf-8") as file:
        file.write(text)

      return str(txt_file) 