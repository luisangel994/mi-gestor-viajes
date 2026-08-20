from pydantic import BaseModel, Field
from typing import Optional, List

class TripCreate(BaseModel):
    title: str = Field(..., example="Viaje a Japón 2026")
    destination: str = Field(..., example="Tokio, Kioto, Osaka")
    start_date: str = Field(..., example="2026-10-10")
    end_date: str = Field(..., example="2026-10-24")
    cover_image: Optional[str] = "🇯🇵"
    budget: Optional[float] = 0.0
    currency: Optional[str] = "EUR"
    notes: Optional[str] = None

class TripUpdate(BaseModel):
    title: Optional[str] = None
    destination: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    cover_image: Optional[str] = None
    budget: Optional[float] = None
    currency: Optional[str] = None
    notes: Optional[str] = None

class DayUpdate(BaseModel):
    title: Optional[str] = None
    notes: Optional[str] = None

class ActivityCreate(BaseModel):
    trip_id: int
    day_id: int
    time: Optional[str] = ""
    end_time: Optional[str] = ""
    title: str
    category: Optional[str] = "Actividad" # Vuelo, Hotel, Transporte, Actividad, Restaurante, Nota
    location: Optional[str] = ""
    map_url: Optional[str] = ""
    cost: Optional[float] = 0.0
    confirmation_code: Optional[str] = ""
    notes: Optional[str] = ""
    status: Optional[str] = "Planificado" # Planificado, Reservado, Completado

class ActivityUpdate(BaseModel):
    time: Optional[str] = None
    end_time: Optional[str] = None
    title: Optional[str] = None
    category: Optional[str] = None
    location: Optional[str] = None
    map_url: Optional[str] = None
    cost: Optional[float] = None
    confirmation_code: Optional[str] = None
    notes: Optional[str] = None
    status: Optional[str] = None

class ExpenseCreate(BaseModel):
    trip_id: int
    title: str
    category: Optional[str] = "Otro"
    amount: float
    currency: Optional[str] = "EUR"
    date: Optional[str] = None
    paid: Optional[int] = 1
    notes: Optional[str] = None

class ChecklistItemCreate(BaseModel):
    trip_id: int
    category: Optional[str] = "Equipaje"
    item: str
    completed: Optional[int] = 0
