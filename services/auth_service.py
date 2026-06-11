from sqlalchemy.orm import Session
from auth.jwt_handler import create_access_token
from models.users_model import User
from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto"
)

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def register_user(db: Session, email:str, password:str):
    #check user exists or not
    existing_user = db.query(User).filter(User.email==email).first()
    if existing_user:
        raise ValueError("Email already registered")
    hashed_pw = hash_password(password)
    user = User(
                 email=email,
                 password=hashed_pw
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    token = create_access_token({"sub": user.email})
    return {"id": user.id, "email": user.email, "token": token}
    """generate token right after registration"""



def login_user(db: Session,email:str, password:str):
    user = db.query(User).filter(User.email==email).first()
    if not user:
        return None

    if not verify_password(password,user.password):
        return None

    token = create_access_token({"sub":user.email})
    return token

