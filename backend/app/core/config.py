from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')

    DATABASE_URL: str = 'postgresql+asyncpg://crayfield:password@localhost:5432/crayfield'
    SECRET_KEY: str   = 'change-me'
    ALGORITHM: str    = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    STRIPE_SECRET_KEY:    str = ''
    STRIPE_WEBHOOK_SECRET: str = ''

    SMTP_HOST:     str = ''
    SMTP_PORT:     int = 587
    SMTP_USER:     str = ''
    SMTP_PASSWORD: str = ''
    EMAIL_FROM:    str = 'Crayfield <hello@crayfield.co.uk>'

    FRONTEND_URL:  str = 'http://localhost:3000'
    ENVIRONMENT:   str = 'development'

settings = Settings()
