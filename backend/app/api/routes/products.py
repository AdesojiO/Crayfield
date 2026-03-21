from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.crud import product as crud
from app.schemas.product import ProductOut, ProductListOut, ProductCreate, VariantCreate, VariantOut

router = APIRouter(prefix='/products', tags=['products'])


@router.get('', response_model=ProductListOut)
async def list_products(
    category: str | None = Query(None),
    featured: bool | None = Query(None),
    limit:    int = Query(50, le=100),
    offset:   int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    items, total = await crud.get_products(db, category=category, featured=featured, limit=limit, offset=offset)
    return ProductListOut(items=items, total=total)


@router.get('/{slug}', response_model=ProductOut)
async def get_product(slug: str, db: AsyncSession = Depends(get_db)):
    product = await crud.get_product_by_slug(db, slug)
    if not product:
        raise HTTPException(404, 'Product not found')
    return product


@router.post('', response_model=ProductOut, status_code=201)
async def create_product(data: ProductCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_product(db, data)


@router.post('/{product_id}/variants', response_model=VariantOut, status_code=201)
async def add_variant(product_id: int, data: VariantCreate, db: AsyncSession = Depends(get_db)):
    return await crud.add_variant(db, product_id, data)
