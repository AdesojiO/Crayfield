from pydantic import BaseModel


class PaymentIntentCreate(BaseModel):
    order_id: int


class PaymentIntentOut(BaseModel):
    client_secret: str
    amount:        int     # pence
    currency:      str = 'gbp'
