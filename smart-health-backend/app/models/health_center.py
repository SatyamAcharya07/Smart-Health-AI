from pydantic import BaseModel


class HealthCenter(BaseModel):
    center_id: str
    name: str
    district: str
    address: str