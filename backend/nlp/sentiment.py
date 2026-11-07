import re
from typing import Dict, Any

POSITIVE_WORDS = {
    "love", "impressed", "great", "excellent", "fantastic", "amazing", "interested",
    "excited", "strong", "perfect", "interview", "hire", "offer", "talented",
    "collaborate", "opportunity", "role", "position", "team", "growth", "lead"
}

URGENT_WORDS = {
    "urgent", "asap", "immediately", "immediate", "urgent hire", "right away",
    "this week", "quick call", "schedule", "interview tomorrow", "offer", "priority"
}

NEGATIVE_WORDS = {
    "disappointed", "poor", "issue", "bad", "spam", "unsubscribe", "stop",
    "irrelevant", "unhappy", "problem"
}

def analyze_message_tone_and_sentiment(message: str, name: str = "", email: str = "") -> Dict[str, Any]:
    """
    NLP Tone & Sentiment Detector:
    Analyzes contact form messages to detect sentiment polarity, tone classification,
    and priority ranking for Darshan's inbox.
    """
    if not message or len(message.strip()) == 0:
        return {
            "sentiment": "Neutral",
            "score": 0.0,
            "tone": "General Inquiry",
            "priority": "P3 - Standard",
            "badge_color": "blue",
            "summary": "Standard contact form message."
        }

    tokens = re.findall(r"\w+", message.lower())
    token_count = len(tokens) or 1

    pos_hits = [w for w in tokens if w in POSITIVE_WORDS]
    neg_hits = [w for w in tokens if w in NEGATIVE_WORDS]
    urg_hits = [w for w in tokens if w in URGENT_WORDS]

    # Compute sentiment score between -1.0 and +1.0
    pos_score = len(pos_hits) * 0.25
    neg_score = len(neg_hits) * 0.35
    raw_sentiment = round(max(-1.0, min(1.0, pos_score - neg_score)), 2)

    # Tone classification
    if urg_hits or "interview" in tokens or "hire" in tokens:
        tone = "Urgent Hiring / Immediate Opportunity"
        priority = "P1 - Immediate Attention"
        badge_color = "rose"
    elif len(pos_hits) >= 2 or "role" in tokens or "opportunity" in tokens:
        tone = "High Technical Interest"
        priority = "P2 - High Priority"
        badge_color = "emerald"
    elif "collaborate" in tokens or "project" in tokens or "coffee" in tokens:
        tone = "Collaborative / Networking"
        priority = "P2 - High Priority"
        badge_color = "violet"
    elif neg_hits:
        tone = "Critical Feedback / Low Fit"
        priority = "P3 - Standard"
        badge_color = "amber"
    else:
        tone = "General Inquiry"
        priority = "P3 - Standard"
        badge_color = "cyan"

    # Sentiment label
    if raw_sentiment > 0.15:
        sentiment_label = "Positive"
    elif raw_sentiment < -0.15:
        sentiment_label = "Negative"
    else:
        sentiment_label = "Neutral"

    return {
        "sentiment": sentiment_label,
        "score": raw_sentiment,
        "tone": tone,
        "priority": priority,
        "badge_color": badge_color,
        "detected_signals": {
            "positive_keywords": pos_hits,
            "urgency_keywords": urg_hits,
            "negative_keywords": neg_hits
        },
        "sender": name,
        "summary": f"{tone} detected from {name or 'Recruiter'}. Categorized as {priority}."
    }
