import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.0-flash")


def generate_recommendation(recommendations):

    if len(recommendations) == 0:
        return (
            "All health centres have sufficient stock. "
            "No redistribution is required."
        )

    prompt = f"""
You are an AI Healthcare Resource Optimizer.

Based on these medicine shortages:

{recommendations}

Generate a short professional report.

Mention:
- Critical centres
- Medicines running low
- Suggested redistribution

Keep it under 120 words.
"""

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception:

        return "AI recommendations are temporarily unavailable because the Gemini API quota has been exceeded."