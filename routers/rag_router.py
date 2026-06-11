from fastapi import APIRouter
from pydantic import BaseModel
import json
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

router = APIRouter()

# ==============================
# ✅ Safe file path loader
# ==============================
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

file_path = os.path.join(
    BASE_DIR,
    "rag-nutrition",
    "knowledge_base.json"
)

with open(file_path, "r", encoding="utf-8") as f:
    knowledge_base = json.load(f)

# Extract questions
questions = [item["question"] for item in knowledge_base]

# TF-IDF Vectorizer
vectorizer = TfidfVectorizer()
question_vectors = vectorizer.fit_transform(questions)

# Request model
class QuestionRequest(BaseModel):
    question: str


# ==============================
# ✅ 1. Get all questions
# ==============================
@router.get("/rag/questions")
def get_questions():
    return {"questions": questions}


# ==============================
# 🚀 2. Smart RAG ONLY (AI-like search)
# ==============================
@router.post("/rag/smart-ask")
def smart_ask(req: QuestionRequest):
    user_q = req.question

    user_vec = vectorizer.transform([user_q])
    similarities = cosine_similarity(user_vec, question_vectors)

    best_match_index = similarities.argmax()
    score = similarities[0][best_match_index]

    if score > 0.3:
        return {
            "type": "smart",
            "matched_question": knowledge_base[best_match_index]["question"],
            "answer": knowledge_base[best_match_index]["answer"],
            "confidence": float(score)
        }

    return {
        "type": "no_match",
        "answer": "Try asking something else."
    }