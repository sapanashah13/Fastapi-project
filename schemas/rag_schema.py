from pydantic import BaseModel


class RagResponse(BaseModel):
    food_name: str
    content: str
