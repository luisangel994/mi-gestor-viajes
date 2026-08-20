import os
from database import init_db, get_db
from pathlib import Path

DB_PATH = Path(__file__).parent / "travel_planner.db"

def reset_db_with_sample():
    if DB_PATH.exists():
        os.remove(DB_PATH)
    
    init_db()
    conn = get_db()
    cursor = conn.cursor()

    # Viaje de Ejemplo 1: Japón
    cursor.execute(
        "INSERT INTO trips (title, destination, start_date, end_date, cover_image, budget, currency, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        ("Ruta por Japón", "Tokio, Kioto y Osaka", "2026-10-10", "2026-10-17", "🇯🇵", 2800.0, "EUR", "Llevar calzado cómodo y comprar tarjeta Suica al llegar.")
    )
    trip_id = cursor.lastrowid

    # Generar días
    from main import generate_days_for_trip, populate_default_checklist
    generate_days_for_trip(conn, trip_id, "2026-10-10", "2026-10-17")
    populate_default_checklist(conn, trip_id)

    # Obtener ID de los días
    cursor.execute("SELECT id, day_number FROM days WHERE trip_id = ? ORDER BY day_number ASC", (trip_id,))
    days = cursor.fetchall()
    day_map = {d["day_number"]: d["id"] for d in days}

    # Actividades de ejemplo
    cursor.execute("""
        INSERT INTO activities (trip_id, day_id, time, end_time, title, category, location, map_url, cost, confirmation_code, notes, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (trip_id, day_map[1], "11:45", "16:20", "Vuelo Madrid -> Tokio (Narita)", "Vuelo", "Aeropuerto de Barajas", "https://maps.google.com/?q=Barajas", 750.0, "IB-6801", "Terminal 4. Facturación 2.5h antes.", "Reservado"))

    cursor.execute("""
        INSERT INTO activities (trip_id, day_id, time, end_time, title, category, location, map_url, cost, confirmation_code, notes, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (trip_id, day_map[1], "18:00", "", "Check-in Hotel Shinjuku", "Hotel", "Shinjuku, Tokio", "https://maps.google.com/?q=Shinjuku+Tokyo", 450.0, "HOTEL-9921", "Reserva pagada. Recepción abierta 24h.", "Reservado"))

    cursor.execute("""
        INSERT INTO activities (trip_id, day_id, time, end_time, title, category, location, map_url, cost, confirmation_code, notes, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (trip_id, day_map[2], "09:30", "12:00", "Paseo por Asakusa y Templo Senso-ji", "Actividad", "Asakusa, Tokio", "https://maps.google.com/?q=Sensoji+Asakusa", 0.0, "", "Probar los dulces tradicionales en Nakamise-dori.", "Planificado"))

    cursor.execute("""
        INSERT INTO activities (trip_id, day_id, time, end_time, title, category, location, map_url, cost, confirmation_code, notes, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (trip_id, day_map[2], "13:30", "15:00", "Almuerzo en Ramen Street", "Restaurante", "Estación de Tokio", "https://maps.google.com/?q=Tokyo+Ramen+Street", 25.0, "", "Comprar ticket en la máquina antes de entrar.", "Planificado"))

    # Gastos de ejemplo
    cursor.execute("""
        INSERT INTO expenses (trip_id, title, category, amount, currency, date, paid, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (trip_id, "Reserva de Vuelo Madrid - Tokio", "Vuelos", 750.0, "EUR", "2026-10-10", 1, "Billetes comprados"))

    cursor.execute("""
        INSERT INTO expenses (trip_id, title, category, amount, currency, date, paid, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (trip_id, "Hotel Shinjuku (7 noches)", "Alojamiento", 450.0, "EUR", "2026-10-10", 1, "Reserva confirmada"))

    conn.commit()
    conn.close()
    print("Base de datos inicializada con datos de prueba atractivos.")

if __name__ == "__main__":
    reset_db_with_sample()
