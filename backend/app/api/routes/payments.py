import stripe
from fastapi import APIRouter, Depends, HTTPException, Request, Header
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.crud import order as crud
from app.schemas.payment import PaymentIntentCreate, PaymentIntentOut
from app.core.config import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

router = APIRouter(prefix='/payments', tags=['payments'])


@router.post('/create-intent', response_model=PaymentIntentOut)
async def create_payment_intent(
    data: PaymentIntentCreate,
    db: AsyncSession = Depends(get_db),
):
    order = await crud.get_order(db, data.order_id)
    if not order:
        raise HTTPException(404, 'Order not found')
    if order.status != 'pending':
        raise HTTPException(400, 'Order is not in pending state')

    intent = stripe.PaymentIntent.create(
        amount=order.total,
        currency='gbp',
        metadata={'order_id': order.id, 'reference': order.reference},
        automatic_payment_methods={'enabled': True},
    )
    return PaymentIntentOut(client_secret=intent.client_secret, amount=order.total)


@router.post('/webhook')
async def stripe_webhook(
    request: Request,
    stripe_signature: str = Header(None),
    db: AsyncSession = Depends(get_db),
):
    payload = await request.body()
    try:
        event = stripe.Webhook.construct_event(payload, stripe_signature, settings.STRIPE_WEBHOOK_SECRET)
    except stripe.error.SignatureVerificationError:
        raise HTTPException(400, 'Invalid signature')

    if event['type'] == 'payment_intent.succeeded':
        pi       = event['data']['object']
        order_id = int(pi['metadata'].get('order_id', 0))
        if order_id:
            await crud.mark_paid(db, order_id, pi['id'])

    return {'received': True}
