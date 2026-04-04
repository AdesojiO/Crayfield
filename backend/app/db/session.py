from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.pool import NullPool
import os
from app.core.config import settings

# Vercel serverless functions cannot maintain persistent connection pools.
# Use NullPool so each request creates and closes its own connection.
_pool_kwargs = {"poolclass": NullPool} if os.getenv("VERCEL") else {}

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.ENVIRONMENT == 'development',
    **_pool_kwargs,
)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
