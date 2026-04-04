from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.crud import order as crud
from app.schemas.order import OrderCreate, OrderOut
from app.core.limiter import limiter

router = APIRouter(prefix='/orders', tags=['orders'])


@router.post('', response_model=OrderOut, status_code=201)
@limiter.limit('20/minute')
async def create_order(request: Request, data: OrderCreate, db: AsyncSession = Depends(get_db)):
    try:
        return await crud.create_order(db, data)
    except ValueError as e:
        raise HTTPException(422, str(e))


@router.get('/{order_id}', response_model=OrderOut)
async def get_order(order_id: int, token: str, db: AsyncSession = Depends(get_db)):
    order = await crud.get_order(db, order_id)
    if not order or order.order_token != token:
        raise HTTPException(404, 'Order not found')
    return order
