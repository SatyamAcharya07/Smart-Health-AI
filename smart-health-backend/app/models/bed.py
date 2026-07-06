from pydantic import BaseModel


class Bed(BaseModel):
    total_beds: int
    occupied_beds: int
    available_beds: int