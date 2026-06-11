from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from dal.user_dal import get_current_user

from schemas.maintenance_calories_schema import (
    UserRequest,
    UserResponse
)

from services import maintenance_calories_service

router = APIRouter(
    prefix="/maintenance",
    tags=["maintenance"]
)


@router.post(
    "/maintenance_calories_details",
    response_model=UserResponse
)
def create_maintenance(
    request: UserRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return maintenance_calories_service.create_maintenance_service(
        db,
        request,
        current_user
    )