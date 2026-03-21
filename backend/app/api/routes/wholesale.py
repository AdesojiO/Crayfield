from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.crud import wholesale as crud
from app.schemas.wholesale import WholesaleEnquiryCreate, WholesaleEnquiryOut

router = APIRouter(prefix='/wholesale', tags=['wholesale'])


def _notify_team(enquiry_id: int, business_name: str, email: str):
    """Send internal notification email — wire up SMTP in production."""
    print(f'[WHOLESALE] New enquiry #{enquiry_id} from {business_name} <{email}>')


@router.post('/enquiry', response_model=WholesaleEnquiryOut, status_code=201)
async def submit_enquiry(
    data: WholesaleEnquiryCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    enquiry = await crud.create_enquiry(db, data)
    background_tasks.add_task(_notify_team, enquiry.id, enquiry.business_name, enquiry.email)
    return enquiry
