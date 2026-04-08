from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import User
from ..schemas import (
    LoginIn,
    RegisterIn,
    ForgotPasswordIn,
    ResetPasswordIn,
    TokenOut
)
from ..auth import (
    register_user,
    login_user,
    create_password_reset_token,
    reset_password
)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.post("/register", response_model=TokenOut)
def register(data: RegisterIn, db: Session = Depends(get_db)):
    try:
        token = register_user(data, db)
        return {"access_token": token}
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/login", response_model=TokenOut)
def login(data: LoginIn, db: Session = Depends(get_db)):
    try:
        token = login_user(data, db)
        return {"access_token": token}
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )


@router.post("/forgot-password")
def forgot_password(
    data: ForgotPasswordIn,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == data.email).first()

    if user:
        token = create_password_reset_token(user, db)
        reset_link = f"http://localhost:5173/reset-password?token={token}"
        background_tasks.add_task(send_reset_email, user.email, reset_link)

    return {
        "message": "Se o e-mail existir, enviaremos um link de redefinição"
    }


@router.post("/reset-password")
def reset_user_password(
    data: ResetPasswordIn,
    db: Session = Depends(get_db)
):
    try:
        reset_password(data, db)
        return {"message": "Senha redefinida com sucesso"}
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


def send_reset_email(email: str, link: str):
    print("E-MAIL RESET (DEV)")
    print(f"Para: {email}")
    print(link)