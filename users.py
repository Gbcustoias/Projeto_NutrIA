from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..deps import get_current_user
from ..schemas import UserOut
from ..models import User

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.get("/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)):
    return current_user