from fastapi import APIRouter
from pathlib import Path
import pandas as pd

from app.services.ollama_service import OllamaService
router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)

UPLOAD_FOLDER = Path("storage/uploads")


@router.post("/analyze")
def analyze_excel():

    excel_files = list(UPLOAD_FOLDER.glob("*.xlsx"))

    if not excel_files:
        return {
            "success": False,
            "message": "No workbook found."
        }

    latest = max(
        excel_files,
        key=lambda x: x.stat().st_mtime
    )

    df = pd.read_excel(latest)
    preview = df.head(20).to_markdown(index=False)

    summary = f"""
    Workbook Name:
    {latest.name}

    Total Rows:
    {len(df)}

    Total Columns:
    {len(df.columns)}

    Columns:
    {", ".join(df.columns)}

    Missing Values:
    {int(df.isnull().sum().sum())}

    Duplicate Rows:
    { int(df.duplicated().sum())}

    Sample Data:

    {preview}

    Analyze this workbook like a Senior Endur Business Analyst.

    Tell me:

    1. Executive Summary

    2. Data Quality Issues

    3. Potential Risks

    4. Business Insights

    5. Recommended Actions

    6. Important observations.
    """

    ai_response = OllamaService.analyze_excel(summary)

    return {

        "success": True,

        "analysis": ai_response.split("\n")

    }