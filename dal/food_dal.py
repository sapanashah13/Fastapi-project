from fastapi import Depends
from sqlalchemy import select, func
from sqlalchemy.orm import Session

from database.database import get_db
from models.food_model import FoodItems

# READ ALL
def get_all_foods(db: Session = Depends(get_db)):
        return db.query(FoodItems).all()

def search_food(db: Session, name: str):
    stmt = (
        select(FoodItems)
        .where(func.lower(FoodItems.name).like(f"%{name.lower()}%"))
        .limit(1)
    )

    return db.execute(stmt).scalar_one_or_none()