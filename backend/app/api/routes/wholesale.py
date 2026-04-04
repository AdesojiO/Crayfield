import logging
import emails as email_lib
from fastapi import APIRouter, Depends, BackgroundTasks, Request
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.crud import wholesale as crud
from app.schemas.wholesale import WholesaleEnquiryCreate, WholesaleEnquiryOut
from app.core.config import settings
from app.core.limiter import limiter

logger = logging.getLogger(__name__)
router = APIRouter(prefix='/wholesale', tags=['wholesale'])


def _notify_team(enquiry_id: int, business_name: str, contact_email: str) -> None:
    notify_to = settings.NOTIFY_EMAIL or settings.SMTP_USER
    if not settings.SMTP_HOST or not notify_to:
        logger.info('WHOLESALE enquiry #%s from %s <%s> (SMTP not configured)',
                    enquiry_id, business_name, contact_email)
        return

    html_body = (
        f'<p>A new wholesale enquiry has been submitted.</p>'
        f'<table style="border-collapse:collapse;font-size:14px">'
        f'<tr><td style="padding:4px 12px 4px 0"><strong>Enquiry #</strong></td><td>{enquiry_id}</td></tr>'
        f'<tr><td style="padding:4px 12px 4px 0"><strong>Business</strong></td><td>{business_name}</td></tr>'
        f'<tr><td style="padding:4px 12px 4px 0"><strong>Email</strong></td><td>{contact_email}</td></tr>'
        f'</table>'
        f'<p style="margin-top:16px">Log in to the admin area to view the full enquiry and respond.</p>'
    )
    message = email_lib.html(
        html=html_body,
        subject=f'New Wholesale Enquiry #{enquiry_id} – {business_name}',
        mail_from=settings.EMAIL_FROM,
    )
    try:
        response = message.send(
            to=notify_to,
            smtp={
                'host': settings.SMTP_HOST,
                'port': settings.SMTP_PORT,
                'user': settings.SMTP_USER,
                'password': settings.SMTP_PASSWORD,
                'tls': True,
            },
        )
        if not response.status_code == 250:
            logger.warning('Wholesale notification email may not have sent: status %s', response.status_code)
    except Exception:
        logger.exception('Failed to send wholesale notification email for enquiry #%s', enquiry_id)


@router.post('/enquiry', response_model=WholesaleEnquiryOut, status_code=201)
@limiter.limit('10/minute')
async def submit_enquiry(
    request: Request,
    data: WholesaleEnquiryCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    enquiry = await crud.create_enquiry(db, data)
    background_tasks.add_task(_notify_team, enquiry.id, enquiry.business_name, enquiry.email)
    return enquiry
