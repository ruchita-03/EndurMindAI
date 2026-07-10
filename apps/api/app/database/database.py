from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# --------------------------------------------------------------------
# Database Configuration
# --------------------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATABASE_FILE = BASE_DIR / "endurmind.db"

DATABASE_URL = f"sqlite:///{DATABASE_FILE}"

# --------------------------------------------------------------------
# SQLAlchemy Engine
# --------------------------------------------------------------------

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
    future=True,
)

# --------------------------------------------------------------------
# Session Factory
# --------------------------------------------------------------------

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False,
)

# --------------------------------------------------------------------
# Declarative Base
# --------------------------------------------------------------------

Base = declarative_base()

# --------------------------------------------------------------------
# Dependency
# --------------------------------------------------------------------


def get_db():
    """
    Database session dependency.

    Usage:
        db: Session = Depends(get_db)
    """
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()