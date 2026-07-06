from pydantic import BaseModel
from datetime import date


class Medicine(BaseModel):
    medicine_name: str
    current_stock: int
    minimum_stock: int
    daily_usage: int
    expiry_date: date