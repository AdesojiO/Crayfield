from fastapi import APIRouter, Depends
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from app.db.session import get_db
from app.models.newsletter import NewsletterSubscriber

router = APIRouter(prefix='/newsletter', tags=['newsletter'])


class SubscribeIn(BaseModel):
    email: EmailStr


@router.post('/subscribe', status_code=201)
async def subscribe(data: SubscribeIn, db: AsyncSession = Depends(get_db)):
    subscriber = NewsletterSubscriber(email=data.email)
    db.add(subscriber)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        # Already subscribed — return success to avoid email enumeration
    return {'message': 'Subscribed successfully'}


@router.delete('/unsubscribe')
async def unsubscribe(data: SubscribeIn, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(NewsletterSubscriber).where(NewsletterSubscriber.email == data.email))
    subscriber = result.scalar_one_or_none()
    if subscriber:
        subscriber.active = False
        await db.commit()
    return {'message': 'Unsubscribed'}
