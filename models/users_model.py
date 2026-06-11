from sqlalchemy import Integer,Column,String
from database.database import BASE


class User(BASE):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String,unique=True,index=True)
    password = Column(String,unique=True, index=True)



