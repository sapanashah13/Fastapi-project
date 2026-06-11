from datetime import date

from pydantic import BaseModel
from sqlalchemy import Date
from sqlalchemy.testing.suite import DateTimeCoercedToDateTimeTest


class UserRegister(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email:str
    token:str

class Config:
    from_attribute = True


class UserLogin(BaseModel):
    email: str
    password: str

class TimeLaps(BaseModel):
    id: int
    date: date
    total_calories: float
    total_protein: float
    total_fat: float
    total_carbs: float




