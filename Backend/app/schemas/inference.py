from pydantic import BaseModel
from typing import Optional
import uuid


class PredictionResponse(BaseModel):
    model: str
    label: str
    confidence: float
    incident_created: bool = False
    incident_id: Optional[uuid.UUID] = None
