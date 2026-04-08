from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from uuid import UUID


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class RegisterIn(BaseModel):
    name: str
    email: EmailStr
    password: str
    cpf: Optional[str] = None
    phone: Optional[str] = None


class ForgotPasswordIn(BaseModel):
    email: EmailStr


class ResetPasswordIn(BaseModel):
    token: str
    new_password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: UUID
    name: str
    email: EmailStr
    cpf: Optional[str]
    phone: Optional[str]
    is_active: bool
    is_verified: bool

    class Config:
        from_attributes = True


class ServiceOut(BaseModel):
    id: UUID
    name: str
    slug: str
    description: Optional[str]
    price_cents: int
    image_url: Optional[str]

    class Config:
        from_attributes = True


class OrderItemIn(BaseModel):
    service_id: UUID
    qty: int = Field(default=1, ge=1)


class OrderOut(BaseModel):
    id: UUID
    total_cents: int
    status: str
    created_at: Optional[str]

    class Config:
        from_attributes = True