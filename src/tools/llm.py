import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()


def get_llm():
    """
    Connect to AMD Developer Cloud hosted vLLM endpoint
    serving Qwen (or any OpenAI-compatible model).
    """

    return ChatOpenAI(
        base_url=os.getenv("VLLM_BASE_URL"),
        api_key=os.getenv("VLLM_API_KEY"),
        model=os.getenv("MODEL_NAME", "qwen"),
        temperature=0.2,
    )