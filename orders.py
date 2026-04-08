from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from ..db import get_db
from ..models import Order, OrderItem, Service, User
from ..schemas import OrderItemIn, OrderOut
from ..deps import get_current_user
from ..email import send_email
from ..email_template import order_confirmation_email

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


@router.post("/", response_model=OrderOut)
def create_order(
    items: list[OrderItemIn],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Pedido vazio"
        )

    total = 0
    order_items = []

    for item in items:
        service = db.query(Service).filter(
            Service.id == item.service_id,
            Service.active == True
        ).first()

        if not service:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Serviço não encontrado"
            )

        total += service.price_cents * item.qty

        order_items.append(
            OrderItem(
                service_id=service.id,
                qty=item.qty,
                unit_price_cents=service.price_cents
            )
        )

    order = Order(
        user_id=current_user.id,
        total_cents=total,
        status="pending"
    )

    db.add(order)
    db.flush()

    for oi in order_items:
        oi.order_id = order.id
        db.add(oi)

    db.commit()
    db.refresh(order)

    try:
        email_body = order_confirmation_email(
            customer_name=current_user.name,
            order_id=str(order.id),
            total_cents=order.total_cents
        )

        send_email(
            to_email=current_user.email,
            subject=f"Pedido #{order.id} confirmado com sucesso",
            body=email_body
        )
    except Exception:
        pass

    return order


@router.get("/")
def list_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    orders = (
        db.query(Order)
        .filter(Order.user_id == current_user.id)
        .order_by(Order.created_at.desc())
        .all()
    )
    return orders


@router.get("/{order_id}")
def get_order_detail(
    order_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    order = (
        db.query(Order)
        .filter(
            Order.id == order_id,
            Order.user_id == current_user.id
        )
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Pedido não encontrado"
        )

    return order