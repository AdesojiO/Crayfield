from pydantic import BaseModel, EmailStr, ConfigDict, Field
from app.models.order import OrderStatus


class OrderItemIn(BaseModel):
    product_id: int
    variant_id: int | None = None
    quantity:   int = Field(ge=1, le=500)


class OrderCreate(BaseModel):
    customer_name:  str
    customer_email: EmailStr
    customer_phone: str | None = None
    address_line1:  str
    address_line2:  str | None = None
    city:           str
    postcode:       str
    country:        str = 'GB'
    notes:          str | None = None
    items:          list[OrderItemIn]


class OrderItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id:           int
    name:         str
    variant_label: str | None = None
    quantity:     int
    unit_price:   int


class OrderOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id:        int
    reference: str
    status:    OrderStatus
    total:     int
    items:     list[OrderItemOut] = []
