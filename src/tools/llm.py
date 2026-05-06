import os
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI

load_dotenv()


def get_llm():
    """
    Dynamic LLM Provider

    DEV MODE:
        Groq API

    PROD MODE:
        AMD MI300X + vLLM + Qwen2.5-7B-Instruct
    """

    provider = os.getenv("LLM_PROVIDER", "groq").lower()

    # =========================
    # AMD GPU Inference (PROD)
    # =========================
    if provider == "amd":
        return ChatOpenAI(
            api_key="dummy",  # required by vLLM but not validated
            base_url=os.getenv(
                "AMD_BASE_URL",
                "http://129.212.182.205:8000/v1"
            ),
            model=os.getenv(
                "AMD_MODEL",
                "Qwen/Qwen2.5-7B-Instruct"
            ),
            temperature=0.1,
            max_tokens=512,
        )

    # =========================
    # GROQ (DEV)
    # =========================
    return ChatGroq(
        groq_api_key=os.getenv("GROQ_API_KEY"),
        model_name="llama-3.1-8b-instant",
        temperature=0.1,
    )