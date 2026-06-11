from sqlalchemy.orm import Session

from models.Maintenance_calories_model import (
    MaintenanceCalories
)


def create_maintenance_record(
    db: Session,
    request,
    current_user
):

    record = MaintenanceCalories(
        email=current_user["sub"],
        weight=request.weight,
        height=request.height,
        age=request.age,
        gender=request.gender,
        activity_level=request.activity_level
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return record