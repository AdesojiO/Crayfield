import enum
from datetime import datetime
from sqlalchemy import String, Integer, Text, Enum, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from app.db.session import Base


class EnquiryStatus(str, enum.Enum):
    new      = 'new'
    contacted = 'contacted'
    converted = 'converted'
    closed   = 'closed'


class WholesaleEnquiry(Base):
    __tablename__ = 'wholesale_enquiries'

    id:              Mapped[int]            = mapped_column(Integer, primary_key=True, index=True)
    business_name:   Mapped[str]            = mapped_column(String(200), nullable=False)
    business_type:   Mapped[str]            = mapped_column(String(100), nullable=False)
    postcode:        Mapped[str]            = mapped_column(String(10), nullable=False)
    monthly_spend:   Mapped[str | None]     = mapped_column(String(50))
    phone:           Mapped[str | None]     = mapped_column(String(30))
    email:           Mapped[str]            = mapped_column(String(200), nullable=False)
    message:         Mapped[str | None]     = mapped_column(Text)
    status:          Mapped[EnquiryStatus]  = mapped_column(Enum(EnquiryStatus), default=EnquiryStatus.new)
    created_at:      Mapped[datetime]       = mapped_column(DateTime(timezone=True), server_default=func.now())
