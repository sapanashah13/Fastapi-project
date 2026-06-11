from pydantic import BaseModel


class UserRequest(BaseModel):
    weight: float
    height: float
    age: float
    gender: str
    activity_level: str


class UserResponse(BaseModel):
    id: int
    email: str
    weight: float
    height: float
    age: float
    gender: str
    activity_level: str
    bmi: float
    bmi_category: str
    message: str
    maintenance_calories: float

    class Config:
        from_attributes = True
