from sqlalchemy import Integer,String,Float,Column

from database.database import BASE


class FoodItems(BASE):
    __tablename__ = "foods"
    id = Column(Integer,primary_key = True , index=True)
    name = Column(String, unique=True, index=True)
    calories = Column(Float)
    protein = Column(Float)
    carbs = Column(Float)
    fat = Column(Float)
    fiber = Column(Float)



