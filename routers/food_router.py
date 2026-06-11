from fastapi import Request
from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from dal import food_dal
from dal.user_dal import get_current_user
from database.database import SessionLocal, get_db
from schemas.food_schema import FoodRequest
from services import food_service


router = APIRouter(prefix="/foods", tags=["foods"])

@router.get("/")
def read_foods(db: Session = Depends(get_db),user=Depends(get_current_user)):
    return (food_dal.get_all_foods(db))

@router.post("/calculate")
def calculate_foods(request: FoodRequest, db: Session = Depends(get_db),user=Depends(get_current_user)):
    return food_service.calculate_nutrition(db, request)