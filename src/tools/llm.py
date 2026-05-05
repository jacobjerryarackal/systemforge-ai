import os
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI

load_dotenv()


def get_llm():
    """
    Dynamic inference provider

    DEV:
        GROQ API

    PROD:
        AMD ROCm + Qwen + vLLM
    """

    provider = os.getenv("LLM_PROVIDER", "groq")

    if provider == "amd":
        return ChatOpenAI(
            api_key=os.getenv("AMD_API_KEY"),
            base_url=os.getenv("AMD_BASE_URL"),
            model=os.getenv("AMD_MODEL", "qwen"),
            temperature=0.1,
        )

    return ChatGroq(
        groq_api_key=os.getenv("GROQ_API_KEY"),
        model_name="llama-3.1-8b-instant",
        temperature=0.1,
    )