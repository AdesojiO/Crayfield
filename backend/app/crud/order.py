import random, string
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.models.order import Order, OrderItem, OrderStatus
from app.models.product import Product, ProductVariant
from app.schemas.order import OrderCreate
from app.core.config import settings


def _generate_ref() -> str:
    return 'CR' + ''.join(random.choices(string.digits, k=8))


async def create_order(db: AsyncSession, data: OrderCreate) -> Order:
    subtotal = 0
    item_rows = []

    for item in data.items:
        # Fetch product
        product = (await db.execute(select(Product).where(Product.id == item.product_id))).scalar_one_or_none()
        if not product:
            raise ValueError(f'Product {item.product_id} not found')

        variant = None
        if item.variant_id:
            variant = (await db.execute(
                select(ProductVariant).where(ProductVariant.id == item.variant_id)
            )).scalar_one_or_none()

        unit_price = variant.price if variant else product.price
        subtotal  += unit_price * item.quantity

        item_rows.append(OrderItem(
            product_id=product.id,
            variant_id=item.variant_id,
            name=product.name,
            variant_label=variant.label if variant else None,
            quantity=item.quantity,
            unit_price=unit_price,
        ))

    if subtotal >= settings.FREE_SHIPPING_THRESHOLD_PENCE:
        shipping = 0
    else:
        shipping = settings.SHIPPING_FLAT_PENCE

    total = subtotal + shipping

    order = Order(
        reference=_generate_ref(),
        status=OrderStatus.pending,
        customer_name=data.customer_name,
        customer_email=data.customer_email,
        customer_phone=data.customer_phone,
        address_line1=data.address_line1,
        address_line2=data.address_line2,
        city=data.city,
        postcode=data.postcode,
        country=data.country,
        notes=data.notes,
        subtotal=subtotal,
        shipping=shipping,
        total=total,
        items=item_rows,
    )
    db.add(order)
    await db.commit()
    await db.refresh(order)
    return order


async def get_order(db: AsyncSession, order_id: int) -> Order | None:
    result = await db.execute(
        select(Order).where(Order.id == order_id).options(selectinload(Order.items))
    )
    return result.scalar_one_or_none()


async def mark_paid(db: AsyncSession, order_id: int, stripe_payment_id: str) -> Order | None:
    order = await get_order(db, order_id)
    if not order:
        return None
    if order.status == OrderStatus.paid:
        return order
    order.status = OrderStatus.paid
    order.stripe_payment_id = stripe_payment_id
    await db.commit()
    await db.refresh(order)
    return order
