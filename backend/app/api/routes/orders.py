from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.crud import order as crud
from app.schemas.order import OrderCreate, OrderOut

router = APIRouter(prefix='/orders', tags=['orders'])


@router.post('', response_model=OrderOut, status_code=201)
async def create_order(data: OrderCreate, db: AsyncSession = Depends(get_db)):
    try:
        return await crud.create_order(db, data)
    except ValueError as e:
        raise HTTPException(422, str(e))


@router.get('/{order_id}', response_model=OrderOut)
async def get_order(order_id: int, db: AsyncSession = Depends(get_db)):
    order = await crud.get_order(db, order_id)
    if not order:
        raise HTTPException(404, 'Order not found')
    return order
