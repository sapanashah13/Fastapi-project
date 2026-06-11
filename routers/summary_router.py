from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from services import summary_service

router = APIRouter(
    prefix="/summary",
    tags=["Summary"]
)


@router.get("/daily")
def get_daily_summary(db: Session = Depends(get_db)):
    return summary_service.get_daily_summary_service(db)


@router.get("/weekly")
def get_weekly_summary(db: Session = Depends(get_db)):
    return summary_service.get_weekly_summary_service(db)


@router.get("/monthly")
def get_monthly_summary(db: Session = Depends(get_db)):
    return summary_service.get_monthly_summary_service(db)


@router.get("/yearly")
def get_yearly_summary(db: Session = Depends(get_db)):
    return summary_service.get_yearly_summary_service(db)


@router.get("/custom")
def get_custom_summary(
    from_date: date,
    to_date: date,
    db: Session = Depends(get_db)
):
    return summary_service.get_custom_summary_service(
        db,
        from_date,
        to_date
    )


@router.get("/daily-records")
def get_daily_records(db: Session = Depends(get_db)):
    return summary_service.get_daily_records_service(db)