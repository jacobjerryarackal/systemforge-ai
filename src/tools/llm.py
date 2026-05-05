import os
from dotenv import load_dotenv
from crewai import LLM

load_dotenv()


def get_llm():
    """
    Connect to AMD Developer Cloud hosted vLLM endpoint
    serving Qwen (or any OpenAI-compatible model).
    """

    return LLM(
        # base_url=os.getenv("VLLM_BASE_URL"),
        # api_key=os.getenv("VLLM_API_KEY"),
        model=os.getenv("MODEL_NAME", "gpt-4o-mini"),
        api_key=os.getenv("OPENAI_API_KEY"),
        temperature=0.2
    )