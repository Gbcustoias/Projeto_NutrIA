from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db import Base, engine
from . import models
from .routers import auth, users, services, orders

Base.metadata.create_all(bind=engine)
print("Tabelas criadas com sucesso.")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(services.router)
app.include_router(orders.router)

@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "Backend conectado ao PostgreSQL"
    }