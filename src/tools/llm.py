from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv

load_dotenv()


def get_llm():
    """
    Temporary Development Mode using GROQ

    Later replace with:
    AMD ROCm + vLLM + Qwen
    """

    return ChatGroq(
        groq_api_key=os.getenv("GROQ_API_KEY"),
        model_name="llama-3.1-8b-instant",
        temperature=0.2
    )