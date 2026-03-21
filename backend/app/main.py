from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import api_router
from app.core.config import settings

app = FastAPI(
    title='Crayfield API',
    description='Backend API for Crayfield Global Ltd — B2C shop + wholesale portal',
    version='0.1.0',
    docs_url='/api/docs',
    redoc_url='/api/redoc',
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(api_router)


@app.get('/api/health')
async def health():
    return {'status': 'ok', 'version': '0.1.0'}
