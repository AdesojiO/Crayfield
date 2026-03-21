from sqlalchemy import String, Integer, Boolean, Text, ForeignKey, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.session import Base

class Product(Base):
    __tablename__ = 'products'

    id:          Mapped[int]  = mapped_column(Integer, primary_key=True, index=True)
    name:        Mapped[str]  = mapped_column(String(200), nullable=False)
    slug:        Mapped[str]  = mapped_column(String(220), unique=True, nullable=False, index=True)
    category:    Mapped[str]  = mapped_column(String(80), nullable=False)   # ground | whole | bulk
    description: Mapped[str | None] = mapped_column(Text)
    how_to_use:  Mapped[str | None] = mapped_column(Text)
    storage:     Mapped[str | None] = mapped_column(Text)
    allergens:   Mapped[str | None] = mapped_column(Text)
    image_url:   Mapped[str | None] = mapped_column(String(500))
    image_back_url: Mapped[str | None] = mapped_column(String(500))
    featured:    Mapped[bool] = mapped_column(Boolean, default=False)
    in_stock:    Mapped[bool] = mapped_column(Boolean, default=True)
    price:       Mapped[int]  = mapped_column(Integer, nullable=False)       # pence (lowest variant or base)

    variants: Mapped[list['ProductVariant']] = relationship(back_populates='product', cascade='all, delete-orphan')


class ProductVariant(Base):
    __tablename__ = 'product_variants'

    id:         Mapped[int]  = mapped_column(Integer, primary_key=True, index=True)
    product_id: Mapped[int]  = mapped_column(ForeignKey('products.id'), nullable=False)
    label:      Mapped[str]  = mapped_column(String(80), nullable=False)     # e.g. "100g", "1kg"
    price:      Mapped[int]  = mapped_column(Integer, nullable=False)         # pence
    sku:        Mapped[str | None] = mapped_column(String(80), unique=True)
    in_stock:   Mapped[bool] = mapped_column(Boolean, default=True)
    sort_order: Mapped[int]  = mapped_column(Integer, default=0)

    product: Mapped['Product'] = relationship(back_populates='variants')
