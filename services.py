from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from uuid import UUID

from ..db import get_db
from ..models import Service

router = APIRouter(
    prefix="/services",
    tags=["Services"]
)

@router.get("/")
def list_services(db: Session = Depends(get_db)):
    return db.query(Service).filter(Service.active == True).all()

@router.get("/slug/{slug}")
def get_service_by_slug(slug: str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(
        Service.slug == slug,
        Service.active == True
    ).first()

    if not service:
        raise HTTPException(status_code=404, detail="Serviço não encontrado")

    return service

@router.get("/id/{service_id}")
def get_service_detail(service_id: UUID, db: Session = Depends(get_db)):
    service = (
        db.query(Service)
        .options(joinedload(Service.features))
        .filter(Service.id == service_id, Service.active == True)
        .first()
    )

    if not service:
        raise HTTPException(status_code=404, detail="Serviço não encontrado")

    return {
        "id": service.id,
        "name": service.name,
        "slug": service.slug,
        "description": service.description,
        "price_cents": service.price_cents,
        "image_url": service.image_url,
        "features": sorted(
            [
                {
                    "id": f.id,
                    "title": f.title,
                    "description": f.description,
                    "included": f.included,
                    "order_index": f.order_index,
                }
                for f in service.features
            ],
            key=lambda x: x["order_index"]
        ),
    }