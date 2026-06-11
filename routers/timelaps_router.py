from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from dal.user_dal import get_current_user
from database.database import get_db
from services import timelaps_service

router = APIRouter(prefix="/timelaps", tags=["timelaps"])


@router.get("/")
def get_timelaps(db:Session=Depends(get_db),user=Depends(get_current_user)):
    return timelaps_service.fetch_timelaps(db)