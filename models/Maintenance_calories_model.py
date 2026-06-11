from sqlalchemy import Column, ForeignKey, String, Integer, Float

from database.database import BASE


class MaintenanceCalories(BASE):
    __tablename__ = "maintenance_calories"

    id = Column(Integer, primary_key=True)

    email = Column(
        String,
        ForeignKey("users.email"),
        nullable=False
    )

    weight = Column(Float)
    height = Column(Float)
    age = Column(Float)
    gender = Column(String)
    activity_level = Column(String)