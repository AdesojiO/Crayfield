from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from app.models.product import Product, ProductVariant
from app.schemas.product import ProductCreate, VariantCreate


async def get_products(
    db: AsyncSession,
    *,
    category: str | None = None,
    featured: bool | None = None,
    limit: int = 50,
    offset: int = 0,
) -> tuple[list[Product], int]:
    q = select(Product).options(selectinload(Product.variants))
    if category:
        q = q.where(Product.category == category)
    if featured is not None:
        q = q.where(Product.featured == featured)

    total_q = select(func.count()).select_from(q.subquery())
    total   = (await db.execute(total_q)).scalar_one()

    result  = await db.execute(q.limit(limit).offset(offset))
    return result.scalars().all(), total


async def get_product_by_slug(db: AsyncSession, slug: str) -> Product | None:
    result = await db.execute(
        select(Product)
        .where(Product.slug == slug)
        .options(selectinload(Product.variants))
    )
    return result.scalar_one_or_none()


async def create_product(db: AsyncSession, data: ProductCreate) -> Product:
    product = Product(**data.model_dump())
    db.add(product)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=409, detail='A product with that slug already exists')
    await db.refresh(product)
    return product


async def add_variant(db: AsyncSession, product_id: int, data: VariantCreate) -> ProductVariant:
    variant = ProductVariant(product_id=product_id, **data.model_dump())
    db.add(variant)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=409, detail='A variant with that combination already exists')
    await db.refresh(variant)
    return variant
