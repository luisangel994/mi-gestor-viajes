import sqlite3
import os
from pathlib import Path

DB_PATH = Path(__file__).parent / "travel_planner.db"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # Tabla de Viajes
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS trips (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        destination TEXT NOT NULL,
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        cover_image TEXT,
        budget REAL DEFAULT 0.0,
        currency TEXT DEFAULT 'EUR',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Tabla de Días del Itinerario
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS days (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        trip_id INTEGER NOT NULL,
        day_number INTEGER NOT NULL,
        date TEXT NOT NULL,
        title TEXT,
        notes TEXT,
        FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
    );
    """)

    # Tabla de Actividades / Reservas
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        trip_id INTEGER NOT NULL,
        day_id INTEGER NOT NULL,
        time TEXT,
        end_time TEXT,
        title TEXT NOT NULL,
        category TEXT DEFAULT 'Actividad',
        location TEXT,
        map_url TEXT,
        cost REAL DEFAULT 0.0,
        confirmation_code TEXT,
        notes TEXT,
        status TEXT DEFAULT 'Planificado',
        sort_order INTEGER DEFAULT 0,
        FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
        FOREIGN KEY (day_id) REFERENCES days(id) ON DELETE CASCADE
    );
    """)

    # Tabla de Gastos
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        trip_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        category TEXT DEFAULT 'Otro',
        amount REAL NOT NULL,
        currency TEXT DEFAULT 'EUR',
        date TEXT,
        paid INTEGER DEFAULT 1,
        notes TEXT,
        FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
    );
    """)

    # Tabla de Lista de Equipaje / Preparativos
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS checklists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        trip_id INTEGER NOT NULL,
        category TEXT DEFAULT 'Equipaje',
        item TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
    );
    """)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Base de datos inicializada correctamente.")
