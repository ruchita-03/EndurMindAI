import ollama
import traceback


class OllamaService:

    @staticmethod
    def analyze_excel(summary: str):

        try:

            response = ollama.chat(
                model="phi3:mini",
                messages=[
                    {
                        "role": "system",
                        "content": """
You are EndurMind AI.
Analyze the Excel workbook and provide business insights.
"""
                    },
                    {
                        "role": "user",
                        "content": summary
                    }
                ]
            )

            return response["message"]["content"]

        except Exception:
            traceback.print_exc()
            raise