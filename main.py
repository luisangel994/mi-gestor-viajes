from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from datetime import datetime, timedelta
import sqlite3
import json
from pathlib import Path
from typing import List, Optional

from database import get_db, init_db
from models import (
    TripCreate, TripUpdate, DayUpdate,
    ActivityCreate, ActivityUpdate,
    ExpenseCreate, ChecklistItemCreate
)

app = FastAPI(title="Gestor de Itinerarios de Viajes - TravelPlanner")

# Inicializar DB al arrancar
init_db()

# Rutas estáticas
STATIC_DIR = Path(__file__).parent / "static"
STATIC_DIR.mkdir(exist_ok=True)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/", response_class=HTMLResponse)
def read_root():
    index_file = STATIC_DIR / "index.html"
    if index_file.exists():
        return FileResponse(index_file)
    return HTMLResponse("<h1>Gestor de Itinerarios de Viajes API en ejecución</h1>")

def generate_days_for_trip(conn, trip_id: int, start_date_str: str, end_date_str: str):
    """Genera las filas de días para el rango entre start_date y end_date."""
    try:
        start_dt = datetime.strptime(start_date_str, "%Y-%m-%d")
        end_dt = datetime.strptime(end_date_str, "%Y-%m-%d")
    except ValueError:
        return

    cursor = conn.cursor()
    curr_dt = start_dt
    day_num = 1

    while curr_dt <= end_dt:
        date_str = curr_dt.strftime("%Y-%m-%d")
        cursor.execute(
            "INSERT INTO days (trip_id, day_number, date, title, notes) VALUES (?, ?, ?, ?, ?)",
            (trip_id, day_num, date_str, f"Día {day_num}", "")
        )
        curr_dt += timedelta(days=1)
        day_num += 1

def populate_default_checklist(conn, trip_id: int):
    """Añade elementos estándar a la lista de equipaje / preparativos."""
    defaults = [
        ("Documentos", "Pasaporte / DNI"),
        ("Documentos", "Billetes de avión / reservas imprimidas o en móvil"),
        ("Documentos", "Seguro de viaje y tarjetas bancarias"),
        ("Electrónica", "Cargadores y batería externa (Powerbank)"),
        ("Electrónica", "Adaptador de enchufe universal"),
        ("Equipaje", "Ropa según el clima previsto"),
        ("Equipaje", "Neceser y productos de aseo personal"),
        ("Equipaje", "Botiquín básico / Medicamentos personales"),
    ]
    cursor = conn.cursor()
    for cat, item in defaults:
        cursor.execute(
            "INSERT INTO checklists (trip_id, category, item, completed) VALUES (?, ?, ?, 0)",
            (trip_id, cat, item)
        )

# === RUTAS API ===

@app.get("/api/trips")
def get_trips():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT t.*, 
               (SELECT COUNT(*) FROM activities WHERE trip_id = t.id) as total_activities,
               (SELECT COALESCE(SUM(cost), 0) FROM activities WHERE trip_id = t.id) as total_activity_cost,
               (SELECT COALESCE(SUM(amount), 0) FROM expenses WHERE trip_id = t.id) as total_expense_cost
        FROM trips t
        ORDER BY t.start_date ASC
    """)
    rows = cursor.fetchall()
    trips = [dict(r) for r in rows]
    conn.close()
    return trips

@app.post("/api/trips")
def create_trip(trip: TripCreate):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        """INSERT INTO trips (title, destination, start_date, end_date, cover_image, budget, currency, notes)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
        (trip.title, trip.destination, trip.start_date, trip.end_date,
         trip.cover_image or "✈️", trip.budget or 0.0, trip.currency or "EUR", trip.notes or "")
    )
    trip_id = cursor.lastrowid
    
    # Generar días
    generate_days_for_trip(conn, trip_id, trip.start_date, trip.end_date)
    # Generar checklist por defecto
    populate_default_checklist(conn, trip_id)
    
    conn.commit()
    conn.close()
    return {"id": trip_id, "message": "Viaje creado correctamente"}

@app.get("/api/trips/{trip_id}")
def get_trip_detail(trip_id: int):
    conn = get_db()
    cursor = conn.cursor()

    # Viaje
    cursor.execute("SELECT * FROM trips WHERE id = ?", (trip_id,))
    trip_row = cursor.fetchone()
    if not trip_row:
        conn.close()
        raise HTTPException(status_code=404, detail="Viaje no encontrado")
    
    trip = dict(trip_row)

    # Días con sus actividades
    cursor.execute("SELECT * FROM days WHERE trip_id = ? ORDER BY day_number ASC", (trip_id,))
    days_rows = cursor.fetchall()
    days = []
    
    for d in days_rows:
        day_dict = dict(d)
        cursor.execute(
            "SELECT * FROM activities WHERE day_id = ? ORDER BY CASE WHEN time = '' THEN '99:99' ELSE time END ASC, sort_order ASC",
            (day_dict["id"],)
        )
        day_dict["activities"] = [dict(a) for a in cursor.fetchall()]
        days.append(day_dict)

    # Gastos
    cursor.execute("SELECT * FROM expenses WHERE trip_id = ? ORDER BY id DESC", (trip_id,))
    expenses = [dict(e) for e in cursor.fetchall()]

    # Checklist
    cursor.execute("SELECT * FROM checklists WHERE trip_id = ? ORDER BY category ASC, id ASC", (trip_id,))
    checklist = [dict(c) for c in cursor.fetchall()]

    conn.close()

    return {
        "trip": trip,
        "days": days,
        "expenses": expenses,
        "checklist": checklist
    }

@app.put("/api/trips/{trip_id}")
def update_trip(trip_id: int, trip_data: TripUpdate):
    conn = get_db()
    cursor = conn.cursor()
    
    # Comprobar si existe
    cursor.execute("SELECT * FROM trips WHERE id = ?", (trip_id,))
    existing = cursor.fetchone()
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Viaje no encontrado")

    update_fields = []
    params = []
    for field, val in trip_data.model_dump(exclude_unset=True).items():
        update_fields.append(f"{field} = ?")
        params.append(val)
    
    if update_fields:
        params.append(trip_id)
        cursor.execute(f"UPDATE trips SET {', '.join(update_fields)} WHERE id = ?", params)
        conn.commit()

    conn.close()
    return {"message": "Viaje actualizado"}

@app.delete("/api/trips/{trip_id}")
def delete_trip(trip_id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM trips WHERE id = ?", (trip_id,))
    conn.commit()
    conn.close()
    return {"message": "Viaje eliminado"}

# === ACTIVIDADES Y DÍAS ===

@app.put("/api/days/{day_id}")
def update_day(day_id: int, day_data: DayUpdate):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE days SET title = ?, notes = ? WHERE id = ?",
                   (day_data.title or "", day_data.notes or "", day_id))
    conn.commit()
    conn.close()
    return {"message": "Día actualizado"}

@app.post("/api/activities")
def create_activity(act: ActivityCreate):
    conn = get_db()
    cursor = conn.cursor()
    
    # Generar Google Maps URL si no está presente pero hay localización
    map_url = act.map_url or ""
    if act.location and not map_url:
        map_url = f"https://www.google.com/maps/search/?api=1&query={act.location.replace(' ', '+')}"

    cursor.execute(
        """INSERT INTO activities (trip_id, day_id, time, end_time, title, category, location, map_url, cost, confirmation_code, notes, status, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (act.trip_id, act.day_id, act.time or "", act.end_time or "", act.title,
         act.category or "Actividad", act.location or "", map_url, act.cost or 0.0,
         act.confirmation_code or "", act.notes or "", act.status or "Planificado", 0)
    )
    act_id = cursor.lastrowid
    
    # Si la actividad tiene coste, ¿deseas añadirla opcionalmente a los gastos automáticamente?
    # Para consistencia de presupuesto lo incluimos si es > 0
    if act.cost and act.cost > 0:
        cursor.execute(
            "INSERT INTO expenses (trip_id, title, category, amount, currency, date, paid, notes) VALUES (?, ?, ?, ?, 'EUR', '', 1, ?)",
            (act.trip_id, f"Reserva: {act.title}", act.category or "Actividad", act.cost, f"Reserva de actividad (Código: {act.confirmation_code or 'N/A'})")
        )

    conn.commit()
    conn.close()
    return {"id": act_id, "message": "Actividad añadida"}

@app.put("/api/activities/{act_id}")
def update_activity(act_id: int, act: ActivityUpdate):
    conn = get_db()
    cursor = conn.cursor()
    
    update_fields = []
    params = []
    data = act.model_dump(exclude_unset=True)
    
    # Auto-generar mapa si cambia localización
    if "location" in data and data["location"] and ("map_url" not in data or not data["map_url"]):
        data["map_url"] = f"https://www.google.com/maps/search/?api=1&query={data['location'].replace(' ', '+')}"

    for field, val in data.items():
        update_fields.append(f"{field} = ?")
        params.append(val)
    
    if update_fields:
        params.append(act_id)
        cursor.execute(f"UPDATE activities SET {', '.join(update_fields)} WHERE id = ?", params)
        conn.commit()
    
    conn.close()
    return {"message": "Actividad actualizada"}

@app.patch("/api/activities/{act_id}/status")
def toggle_activity_status(act_id: int, status: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE activities SET status = ? WHERE id = ?", (status, act_id))
    conn.commit()
    conn.close()
    return {"message": "Estado actualizado", "status": status}

@app.delete("/api/activities/{act_id}")
def delete_activity(act_id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM activities WHERE id = ?", (act_id,))
    conn.commit()
    conn.close()
    return {"message": "Actividad eliminada"}

# === GASTOS ===

@app.post("/api/expenses")
def create_expense(exp: ExpenseCreate):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        """INSERT INTO expenses (trip_id, title, category, amount, currency, date, paid, notes)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
        (exp.trip_id, exp.title, exp.category or "Otro", exp.amount, exp.currency or "EUR",
         exp.date or "", exp.paid if exp.paid is not None else 1, exp.notes or "")
    )
    exp_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return {"id": exp_id, "message": "Gasto registrado"}

@app.delete("/api/expenses/{exp_id}")
def delete_expense(exp_id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM expenses WHERE id = ?", (exp_id,))
    conn.commit()
    conn.close()
    return {"message": "Gasto eliminado"}

# === CHECKLIST / EQUIPAJE ===

@app.post("/api/checklists")
def create_checklist_item(item: ChecklistItemCreate):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO checklists (trip_id, category, item, completed) VALUES (?, ?, ?, ?)",
        (item.trip_id, item.category or "Equipaje", item.item, item.completed or 0)
    )
    item_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return {"id": item_id, "message": "Elemento añadido"}

@app.patch("/api/checklists/{item_id}/toggle")
def toggle_checklist_item(item_id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE checklists SET completed = NOT completed WHERE id = ?", (item_id,))
    conn.commit()
    conn.close()
    return {"message": "Estado alternado"}

@app.delete("/api/checklists/{item_id}")
def delete_checklist_item(item_id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM checklists WHERE id = ?", (item_id,))
    conn.commit()
    conn.close()
    return {"message": "Elemento eliminado"}

# === EXPORTAR / IMPORTAR ===

@app.get("/api/trips/{trip_id}/export/json")
def export_trip_json(trip_id: int):
    detail = get_trip_detail(trip_id)
    return JSONResponse(
        content=detail,
        headers={"Content-Disposition": f"attachment; filename=viaje_{trip_id}_backup.json"}
    )
