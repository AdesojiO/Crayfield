import enum
import uuid
from datetime import datetime
from sqlalchemy import String, Integer, Boolean, Text, ForeignKey, Enum, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.session import Base


class OrderStatus(str, enum.Enum):
    pending   = 'pending'
    paid      = 'paid'
    dispatched = 'dispatched'
    delivered = 'delivered'
    cancelled = 'cancelled'
    refunded  = 'refunded'


class Order(Base):
    __tablename__ = 'orders'

    id:               Mapped[int]         = mapped_column(Integer, primary_key=True, index=True)
    reference:        Mapped[str]         = mapped_column(String(20), unique=True, nullable=False, index=True)
    order_token:      Mapped[str]         = mapped_column(String(36), unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    status:           Mapped[OrderStatus] = mapped_column(Enum(OrderStatus), default=OrderStatus.pending)
    stripe_payment_id: Mapped[str | None] = mapped_column(String(200))

    # Customer
    customer_name:    Mapped[str]         = mapped_column(String(200), nullable=False)
    customer_email:   Mapped[str]         = mapped_column(String(200), nullable=False)
    customer_phone:   Mapped[str | None]  = mapped_column(String(30))

    # Shipping address
    address_line1:    Mapped[str]         = mapped_column(String(200), nullable=False)
    address_line2:    Mapped[str | None]  = mapped_column(String(200))
    city:             Mapped[str]         = mapped_column(String(100), nullable=False)
    postcode:         Mapped[str]         = mapped_column(String(10), nullable=False)
    country:          Mapped[str]         = mapped_column(String(2), default='GB')

    # Totals (pence)
    subtotal:         Mapped[int]         = mapped_column(Integer, nullable=False)
    shipping:         Mapped[int]         = mapped_column(Integer, default=0)
    total:            Mapped[int]         = mapped_column(Integer, nullable=False)

    notes:            Mapped[str | None]  = mapped_column(Text)
    created_at:       Mapped[datetime]    = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at:       Mapped[datetime]    = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    items: Mapped[list['OrderItem']] = relationship(back_populates='order', cascade='all, delete-orphan')


class OrderItem(Base):
    __tablename__ = 'order_items'

    id:         Mapped[int]       = mapped_column(Integer, primary_key=True)
    order_id:   Mapped[int]       = mapped_column(ForeignKey('orders.id'), nullable=False)
    variant_id: Mapped[int | None] = mapped_column(ForeignKey('product_variants.id'))
    product_id: Mapped[int]       = mapped_column(ForeignKey('products.id'), nullable=False)
    name:       Mapped[str]       = mapped_column(String(200), nullable=False)   # snapshot
    variant_label: Mapped[str | None] = mapped_column(String(80))
    quantity:   Mapped[int]       = mapped_column(Integer, nullable=False)
    unit_price: Mapped[int]       = mapped_column(Integer, nullable=False)       # pence at time of order

    order: Mapped['Order'] = relationship(back_populates='items')
