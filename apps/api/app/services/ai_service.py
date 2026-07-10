from app.models.document import Document
from app.services.excel_service import ExcelService
from app.services.ollama_service import OllamaService


class AIService:
    """
    Enterprise AI Service

    Responsibilities
    ----------------
    - Build AI context
    - Read Active Workbook
    - Prepare prompts
    - Call Ollama

    Future
    ------
    - RAG
    - SQL Context
    - Endur Knowledge
    - Conversation Memory
    """

    @staticmethod
    def ask_excel(document: Document, question: str):

        df = ExcelService.dataframe(document)

        context = f"""
Workbook:
{document.filename}

Rows:
{len(df)}

Columns:
{', '.join(df.columns)}

Sample Data:

{df.head(30).to_markdown(index=False)}

User Question:
{question}
"""

        return OllamaService.analyze_excel(context)