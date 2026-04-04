from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')

    DATABASE_URL: str = 'postgresql+asyncpg://crayfield:password@localhost:5432/crayfield'
    SECRET_KEY: str   = 'change-me'
    ALGORITHM: str    = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    ENVIRONMENT: str = 'development'

    STRIPE_SECRET_KEY:    str = ''
    STRIPE_WEBHOOK_SECRET: str = ''

    SMTP_HOST:     str = ''
    SMTP_PORT:     int = 587
    SMTP_USER:     str = ''
    SMTP_PASSWORD: str = ''
    EMAIL_FROM:    str = 'Crayfield <hello@crayfield.co.uk>'

    FRONTEND_URL:  str = ''

    ADMIN_API_KEY: str = ''

    FREE_SHIPPING_THRESHOLD_PENCE: int = 3000  # £30.00
    SHIPPING_FLAT_PENCE:           int = 299   # £2.99

    @field_validator('SECRET_KEY')
    @classmethod
    def secret_key_must_be_strong(cls, v: str) -> str:
        if not v or v == 'change-me' or len(v) < 32:
            raise ValueError(
                'SECRET_KEY must be set, must not be "change-me", '
                'and must be at least 32 characters long.'
            )
        return v

settings = Settings()
