from fastapi import FastAPI
from routers import food_router, auth_router, timelaps_router, summary_router, maintenance_calories_router
from fastapi.middleware.cors import CORSMiddleware
from routers import rag_router
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(food_router.router)
app.include_router(auth_router.router)

app.include_router(timelaps_router.router)
app.include_router(summary_router.router)

app.include_router(maintenance_calories_router.router)

app.include_router(rag_router.router)