from datetime import datetime
from sqlalchemy import String, Boolean, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
from app.db.session import Base


class NewsletterSubscriber(Base):
    __tablename__ = 'newsletter_subscribers'

    id:           Mapped[int]      = mapped_column(primary_key=True)
    email:        Mapped[str]      = mapped_column(String(200), unique=True, nullable=False, index=True)
    active:       Mapped[bool]     = mapped_column(Boolean, default=True)
    subscribed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
