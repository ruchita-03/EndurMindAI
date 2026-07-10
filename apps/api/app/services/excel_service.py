from pathlib import Path

import pandas as pd

from app.models.document import Document


class ExcelService:
    """
    Enterprise Excel Service

    This service is the ONLY place that should
    directly interact with pandas.

    Responsibilities
    ----------------
    - Load workbook
    - Read sheets
    - Generate previews
    - Workbook statistics
    - Validation

    Future
    ------
    - Workbook cache
    - Multi-sheet AI context
    - Named tables
    - Formula inspection
    """

    @staticmethod
    def validate(document: Document):

        if document is None:
            raise Exception("No Active Workbook selected.")

        path = Path(document.filepath)

        if not path.exists():
            raise Exception(
                f"Workbook not found: {path}"
            )

        if path.suffix.lower() not in (
            ".xlsx",
            ".xls",
            ".xlsm",
            ".csv",
        ):
            raise Exception(
                "Selected document is not an Excel workbook."
            )

    @staticmethod
    def load(document: Document):

        ExcelService.validate(document)

        return pd.ExcelFile(document.filepath)

    @staticmethod
    def first_sheet(document: Document):

        workbook = ExcelService.load(document)

        return workbook.sheet_names[0]

    @staticmethod
    def dataframe(document: Document, sheet=None):

        workbook = ExcelService.load(document)

        if sheet is None:
            sheet = workbook.sheet_names[0]

        return pd.read_excel(
            workbook,
            sheet_name=sheet,
        )

    @staticmethod
    def statistics(document: Document):

        workbook = ExcelService.load(document)

        sheet = workbook.sheet_names[0]

        df = pd.read_excel(
            workbook,
            sheet_name=sheet,
        )

        return {

            "filename": document.filename,

            "sheet_count": len(workbook.sheet_names),

            "sheet_names": workbook.sheet_names,

            "rows": len(df),

            "columns": len(df.columns),

            "column_names": df.columns.tolist(),

            "duplicate_rows": int(
                df.duplicated().sum()
            ),

            "missing_values": int(
                df.isnull().sum().sum()
            ),

            "numeric_columns":
                df.select_dtypes(
                    include="number"
                ).columns.tolist(),

            "preview":
                df.head(10)
                .fillna("")
                .to_dict(
                    orient="records"
                ),
        }