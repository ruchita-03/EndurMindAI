from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String

from app.database.database import Base


class Document(Base):
    __tablename__ = "documents"

    # ------------------------------------------------------------------
    # Primary Key
    # ------------------------------------------------------------------

    id = Column(Integer, primary_key=True, index=True)

    # ------------------------------------------------------------------
    # File Information
    # ------------------------------------------------------------------

    # Original filename uploaded by the user
    filename = Column(String(255), nullable=False)

    # Physical storage location
    filepath = Column(String(500), nullable=False, unique=True)

    # File extension (xlsx, pdf, png...)
    filetype = Column(String(50), nullable=False)

    # File size in bytes
    filesize = Column(Integer, nullable=False)

    # ------------------------------------------------------------------
    # Document Status
    # ------------------------------------------------------------------

    # Indicates whether this workbook is currently selected
    # for Excel Intelligence and AI Chat.
    is_active = Column(Boolean, default=False, nullable=False)

    # Upload timestamp
    uploaded_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Last modification timestamp
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    # Reserved for future AI pipeline
    # Examples:
    # Uploaded
    # Processing
    # Indexed
    # Failed
    status = Column(String(30), default="Uploaded", nullable=False)

    def __repr__(self):
        return (
            f"<Document("
            f"id={self.id}, "
            f"filename='{self.filename}', "
            f"type='{self.filetype}', "
            f"active={self.is_active}"
            f")>"
        )