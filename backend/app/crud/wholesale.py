from sqlalchemy.ext.asyncio import AsyncSession
from app.models.wholesale import WholesaleEnquiry
from app.schemas.wholesale import WholesaleEnquiryCreate


async def create_enquiry(db: AsyncSession, data: WholesaleEnquiryCreate) -> WholesaleEnquiry:
    enquiry = WholesaleEnquiry(**data.model_dump())
    db.add(enquiry)
    await db.commit()
    await db.refresh(enquiry)
    return enquiry
