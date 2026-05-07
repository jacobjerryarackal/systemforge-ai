import json
import re


def safe_json_parse(raw_text, fallback):
    """
    Safely parse LLM JSON output.

    Handles:
    - markdown code blocks
    - extra explanation text
    - malformed formatting
    - greedy JSON extraction issues
    - invalid output fallback
    """

    try:
        if not raw_text:
            return fallback

        cleaned = raw_text.strip()

        # Remove markdown code fences
        cleaned = re.sub(
            r"```json|```python|```",
            "",
            cleaned
        ).strip()

        # Normalize smart quotes
        cleaned = cleaned.replace("“", '"')
        cleaned = cleaned.replace("”", '"')
        cleaned = cleaned.replace("’", "'")

        # Extract first valid JSON object only (non-greedy)
        match = re.search(
            r"\{[\s\S]*?\}",
            cleaned
        )

        if match:
            cleaned = match.group()

        return json.loads(cleaned)

    except Exception as e:
        print(f"JSON Parse Failed: {str(e)}")
        return fallback