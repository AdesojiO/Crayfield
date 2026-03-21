from fastapi import APIRouter
from app.api.routes import products, orders, payments, wholesale, newsletter

api_router = APIRouter(prefix='/api/v1')
api_router.include_router(products.router)
api_router.include_router(orders.router)
api_router.include_router(payments.router)
api_router.include_router(wholesale.router)
api_router.include_router(newsletter.router)
