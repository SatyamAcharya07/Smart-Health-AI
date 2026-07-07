from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import (
    health_centers,
    medicines,
    beds,
    dashboard,
    recommendations,
    seed
)

app = FastAPI(
    title="Smart Health API",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://smart-health-ai-delta.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],  # Vercel CORS
)

app.include_router(health_centers.router)
app.include_router(medicines.router)
app.include_router(beds.router)
app.include_router(dashboard.router)
app.include_router(recommendations.router)
app.include_router(seed.router)


@app.get("/")
def home():

    return {
        "message": "Smart Health Backend Running"
    }