from sqlalchemy.orm import sessionmaker,declarative_base
from sqlalchemy import create_engine

DATABASE_URL = "postgresql://postgres:password@localhost:5432/food_data"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False,autoflush=False, bind= engine)

BASE = declarative_base()

def get_db():
   db = SessionLocal()
   try:
       yield db
   finally:
       db.close()