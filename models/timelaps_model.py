from sqlalchemy import Integer, DateTime, Float, Column, String
from datetime import datetime
from database.database import BASE


class TimeLaps(BASE):
    __tablename__ = "timelaps"
    id = Column(Integer, primary_key=True, index=True)
    food_name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    total_calories = Column(Float)
    total_protein = Column(Float)
    total_fat = Column(Float)
    total_carbs = Column(Float)


