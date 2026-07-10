from pathlib import Path
from uuid import uuid4
import shutil
import os

from fastapi import UploadFile


class StorageService:
    """
    Enterprise Storage Service

    Responsible for:
    - Organizing uploaded files
    - Saving files
    - Deleting files
    - Listing files
    - Resolving storage paths

    NOTE:
    No other service should directly access the filesystem.
    """

    STORAGE_ROOT = Path("storage")

    DIRECTORIES = {
        "excel": STORAGE_ROOT / "excel",
        "pdf": STORAGE_ROOT / "pdf",
        "images": STORAGE_ROOT / "images",
        "other": STORAGE_ROOT / "other",
        "temp": STORAGE_ROOT / "temp",
    }

    IMAGE_TYPES = {
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".bmp",
        ".webp",
    }

    PDF_TYPES = {
        ".pdf",
    }

    EXCEL_TYPES = {
        ".xlsx",
        ".xls",
        ".xlsm",
        ".csv",
    }

    @classmethod
    def initialize(cls):
        """
        Create storage folders if they do not exist.
        """
        cls.STORAGE_ROOT.mkdir(exist_ok=True)

        for folder in cls.DIRECTORIES.values():
            folder.mkdir(parents=True, exist_ok=True)

    @classmethod
    def _get_storage_directory(cls, extension: str) -> Path:
        extension = extension.lower()

        if extension in cls.EXCEL_TYPES:
            return cls.DIRECTORIES["excel"]

        if extension in cls.PDF_TYPES:
            return cls.DIRECTORIES["pdf"]

        if extension in cls.IMAGE_TYPES:
            return cls.DIRECTORIES["images"]

        return cls.DIRECTORIES["other"]

    @classmethod
    def save_file(cls, file: UploadFile):
        """
        Save uploaded file into its appropriate storage folder.
        """

        cls.initialize()

        extension = Path(file.filename).suffix.lower()

        folder = cls._get_storage_directory(extension)

        unique_name = f"{uuid4().hex}{extension}"

        destination = folder / unique_name

        with open(destination, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return {
            "filename": file.filename,
            "stored_filename": unique_name,
            "filepath": str(destination),
            "size": os.path.getsize(destination),
            "content_type": file.content_type,
            "extension": extension,
        }

    @classmethod
    def delete_file(cls, filepath: str):
        """
        Delete file by full storage path.
        """

        file = Path(filepath)

        if file.exists():
            file.unlink()
            return True

        return False

    @classmethod
    def list_files(cls):
        """
        List all stored files.
        """

        cls.initialize()

        files = []

        for folder in cls.DIRECTORIES.values():

            if folder.name == "temp":
                continue

            for file in folder.iterdir():

                if file.is_file():

                    files.append(
                        {
                            "filename": file.name,
                            "filepath": str(file),
                            "size": file.stat().st_size,
                            "folder": folder.name,
                        }
                    )

        return sorted(files, key=lambda x: x["filename"].lower())

    @classmethod
    def file_exists(cls, filepath: str) -> bool:
        return Path(filepath).exists()

    @classmethod
    def get_file(cls, filepath: str) -> Path:
        return Path(filepath)