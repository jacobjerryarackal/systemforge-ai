import json
import re


def safe_json_parse(raw_text, fallback):
    """
    Safely parse LLM JSON output.

    Handles:
    - markdown ```json blocks
    - extra explanation text
    - malformed formatting
    - invalid output fallback
    """

    try:
        cleaned = raw_text.strip()

        # Remove markdown code fences
        cleaned = re.sub(
            r"```json|```python|```",
            "",
            cleaned
        ).strip()

        # Try extracting JSON object only
        match = re.search(
            r"\{.*\}",
            cleaned,
            re.DOTALL
        )

        if match:
            cleaned = match.group()

        return json.loads(cleaned)

    except Exception:
        return fallback