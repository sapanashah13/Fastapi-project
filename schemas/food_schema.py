from pydantic import BaseModel
from typing import List

class FoodItems(BaseModel):
    name: str
    weight_in_gram: float


class FoodRequest(BaseModel):
    items: List[FoodItems]


