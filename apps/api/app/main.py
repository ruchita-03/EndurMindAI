from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine

from app.api.v1.health import router as health_router
from app.api.v1.upload import router as upload_router
from app.api.v1.documents import router as document_router
from app.models.document import Document
from app.api.v1.analysis import router as analysis_router
from app.api.v1.ai_analysis import router as ai_router

from app.api.v1.chat import router as chat_router


app = FastAPI(
    title="EndurMind AI",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(chat_router)
app.include_router(health_router)
app.include_router(upload_router)
app.include_router(document_router)
app.include_router(analysis_router)
app.include_router(ai_router)


@app.get("/")
def home():
    return {
        "application": "EndurMind AI",
        "status": "Running"
    }