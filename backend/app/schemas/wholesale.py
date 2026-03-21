from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime
from app.models.wholesale import EnquiryStatus


class WholesaleEnquiryCreate(BaseModel):
    business_name:  str
    business_type:  str
    postcode:       str
    monthly_spend:  str | None = None
    phone:          str | None = None
    email:          EmailStr
    message:        str | None = None


class WholesaleEnquiryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id:             int
    business_name:  str
    business_type:  str
    status:         EnquiryStatus
    created_at:     datetime
