import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.api import api_router
from app.core.config import settings
from app.db.session import engine, Base

# Import all models so SQLAlchemy registers their tables before create_all
import app.models.product      # noqa: F401
import app.models.order        # noqa: F401
import app.models.wholesale    # noqa: F401
import app.models.newsletter   # noqa: F401

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(
    title='Crayfield API',
    description='Backend API for Crayfield Global Ltd — B2C shop + wholesale portal',
    version='0.1.0',
    docs_url=None if settings.ENVIRONMENT == 'production' else '/api/docs',
    redoc_url=None if settings.ENVIRONMENT == 'production' else '/api/redoc',
    lifespan=lifespan,
)

# Only enable CORS if FRONTEND_URL is configured (e.g. separate frontend domain)
if settings.FRONTEND_URL:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[settings.FRONTEND_URL],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )

app.include_router(api_router)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception('Unhandled exception for %s %s', request.method, request.url)
    return JSONResponse(status_code=500, content={'detail': 'Internal server error'})


@app.get('/api/health')
async def health():
    return {'status': 'ok', 'version': '0.1.0'}
