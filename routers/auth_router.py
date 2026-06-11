from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from models.users_model import User
from schemas.auth_schema import UserLogin, UserRegister
from services import auth_service

router = APIRouter(prefix="/auth",tags=["auth"])

@router.post("/register")
def register(user: UserRegister, db:Session = Depends(get_db)):
    return auth_service.register_user(db,user.email, user.password)


@router.post("/login")
def login(user: UserLogin, db:Session = Depends(get_db)):
    token = auth_service.login_user(db,user.email, user.password)

    if not token:
        raise HTTPException(status_code =401,detail = "Invalid credential")
    return{
        "access_token":token,
        "token_type": "bearer"
      }


