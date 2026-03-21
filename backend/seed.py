"""
Run once to seed the database with initial products.
Usage: python seed.py
"""
import asyncio
from app.db.session import AsyncSessionLocal, engine, Base
from app.models.product import Product, ProductVariant


PRODUCTS = [
    {
        'name': 'Premium Ground Crayfish',
        'slug': 'premium-ground-crayfish',
        'category': 'ground',
        'description': 'Hand-cleaned, finely ground Nigerian crayfish with an intense, authentic flavour. Sealed for freshness immediately after processing.',
        'how_to_use': 'Add directly to soups, stews, and rice dishes. 1 teaspoon per serving is usually sufficient.',
        'storage': 'Store in a cool, dry place away from direct sunlight. Once opened, seal tightly and use within 3 months.',
        'allergens': 'Contains shellfish (crayfish). May contain traces of other shellfish.',
        'featured': True,
        'in_stock': True,
        'price': 299,  # lowest variant price, in pence
        'variants': [
            {'label': '50g',   'price': 299,  'sku': 'GC-050', 'sort_order': 1},
            {'label': '100g',  'price': 499,  'sku': 'GC-100', 'sort_order': 2},
            {'label': '250g',  'price': 999,  'sku': 'GC-250', 'sort_order': 3},
            {'label': '1kg',   'price': 3499, 'sku': 'GC-1KG', 'sort_order': 4},
        ],
    },
    {
        'name': 'Whole Dried Crayfish',
        'slug': 'whole-dried-crayfish',
        'category': 'whole',
        'description': 'Sun-dried whole crayfish, cleaned and sorted. Perfect for egusi, ogbono, or anywhere you want visible texture.',
        'how_to_use': 'Add whole to soups and stews, or blitz briefly in a blender for a coarser grind.',
        'storage': 'Store in a cool, dry place. Refrigerate after opening for extended shelf life.',
        'allergens': 'Contains shellfish (crayfish).',
        'featured': True,
        'in_stock': True,
        'price': 349,
        'variants': [
            {'label': '100g',  'price': 349,  'sku': 'WC-100', 'sort_order': 1},
            {'label': '250g',  'price': 799,  'sku': 'WC-250', 'sort_order': 2},
            {'label': '500g',  'price': 1399, 'sku': 'WC-500', 'sort_order': 3},
        ],
    },
    {
        'name': 'Bulk Ground Crayfish',
        'slug': 'bulk-ground-crayfish',
        'category': 'bulk',
        'description': 'Our premium ground crayfish in catering-sized packs. Ideal for restaurants, caterers, and large households.',
        'how_to_use': 'Store in an airtight container and scoop as needed.',
        'storage': 'Keep sealed and refrigerate after opening. Best used within 6 months.',
        'allergens': 'Contains shellfish (crayfish).',
        'featured': True,
        'in_stock': True,
        'price': 2999,
        'variants': [
            {'label': '2kg',   'price': 2999,  'sku': 'BGC-2KG', 'sort_order': 1},
            {'label': '5kg',   'price': 6999,  'sku': 'BGC-5KG', 'sort_order': 2},
        ],
    },
]


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        for p_data in PRODUCTS:
            variants_data = p_data.pop('variants', [])
            product = Product(**p_data)
            db.add(product)
            await db.flush()

            for v in variants_data:
                db.add(ProductVariant(product_id=product.id, **v))

        await db.commit()
        print(f'✓ Seeded {len(PRODUCTS)} products.')


if __name__ == '__main__':
    asyncio.run(seed())
