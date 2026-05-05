import os
from dotenv import load_dotenv
from crewai import LLM

load_dotenv()


def get_llm():
    use_mock = os.getenv("USE_MOCK_MODE", "true").lower() == "true"

    if use_mock:
        return None

    return LLM(
        model=os.getenv("MODEL_NAME"),
        base_url=os.getenv("VLLM_BASE_URL"),
        api_key=os.getenv("VLLM_API_KEY"),
        temperature=0.2,
    )