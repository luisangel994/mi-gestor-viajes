// TravelPlanner - Client-Side App for GitHub Pages

const DEFAULT_TRIPS = [
    {
        id: 1,
        title: "Ruta por Galicia y Asturias",
        destination: "Ourense, Vigo, Islas Cíes, Santiago, A Coruña, Luarca",
        start_date: "2023-08-19",
        end_date: "2023-08-26",
        cover_image: "🦞",
        budget: 1200.0,
        currency: "EUR",
        notes: "Itinerario completo por las Rías Baixas, Costa da Morte, Fragas do Eume y Asturias.",
        days: [
            {
                id: 101,
                day_number: 1,
                date: "2023-08-19",
                title: "Llegada a Ourense y Gastronomía",
                activities: [
                    { id: 1001, time: "08:00", end_time: "", title: "Viaje Valencia -> Ourense", category: "Transporte", location: "De Valencia a Ourense", map_url: "https://maps.google.com/?q=Ourense", image_url: "", cost: 0, confirmation_code: "", notes: "Salimos pronto de Valencia a Ourense (8 horas aprox.).", status: "Completado" },
                    { id: 1002, time: "14:00", end_time: "", title: "Comida en ruta (Restaurante Alto de León)", category: "Restaurante", location: "Alto de León, Guadarrama", map_url: "https://maps.google.com/?q=Restaurante+Alto+de+Leon", image_url: "", cost: 40, confirmation_code: "", notes: "Comer pasando Madrid. Tiene buenas vistas y pilla de camino. Al ser fin de semana no hay menú del día.", status: "Completado" },
                    { id: 1003, time: "21:30", end_time: "", title: "Cena en Ourense (A casa Do Pulpo / Cimadevila)", category: "Restaurante", location: "Cimadevila, 32890 Ourense", map_url: "https://maps.google.com/?q=Cimadevila+Ourense", image_url: "", cost: 35, confirmation_code: "", notes: "A casa Do Pulpo: rollitos de pulpo, a 15 min andando del apartamento. Reservar por ser sábado.", status: "Completado" },
                    { id: 1004, time: "22:30", end_time: "", title: "Alojamiento en Casa Ourense", category: "Hotel", location: "Ourense", map_url: "https://goo.gl/maps/n1vFZUEciSHCdXc67", image_url: "", cost: 70, confirmation_code: "RES-OUR1", notes: "Ubicación del apartamento en Ourense.", status: "Completado" }
                ]
            },
            {
                id: 102,
                day_number: 2,
                date: "2023-08-20",
                title: "Ribeira Sacra y Termas de Ourense",
                activities: [
                    { id: 1005, time: "10:00", end_time: "", title: "Miradores de la Ribeira Sacra", category: "Actividad", location: "Ribeira Sacra", map_url: "https://maps.google.com/?q=Mirador+de+Vilouxe", image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop", cost: 0, confirmation_code: "", notes: "• Mirador de Vilouxe: aparcar en Cimadevila frente a la capilla y seguir flechas (ruta 15-20 min).\n• Miradouro da Columna: junto a la carretera.\n• Miradoiro de Cabezoá: con pasarela de madera.\n• Balcón de Madrid (con parking).\n• Mirador A Mirada Máxica (parking en Camping Cañón do Sil).", status: "Completado" },
                    { id: 1006, time: "14:00", end_time: "", title: "Comida en la Ribeira Sacra", category: "Restaurante", location: "Área de descanso Ribeira Sacra", map_url: "https://goo.gl/maps/aKVNYtjZWZGZmkpM6", image_url: "", cost: 25, confirmation_code: "", notes: "Llevarnos comida del Mercadona o comer en restaurante cerca (reservar por ser domingo). Área con mesas y vacas.", status: "Completado" },
                    { id: 1007, time: "17:30", end_time: "", title: "Termas de Ourense (Outariz e Canedo)", category: "Actividad", location: "Termas Outariz, Ourense", map_url: "https://maps.google.com/?q=Termas+Outariz+Ourense", image_url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop", cost: 6.4, confirmation_code: "", notes: "¡Llevar chanclas, toalla y bañador!\n• Outariz e Canedo: gratuitas, max 90min (cierra a las 20:00).\n• Termas Outariz: 6,40€, vestuarios limpios (cierra a las 23:00).", status: "Completado" },
                    { id: 1008, time: "21:30", end_time: "", title: "Cena por zona A casa Do Pulpo", category: "Restaurante", location: "Centro de Ourense", map_url: "https://maps.google.com/?q=A+casa+Do+Pulpo+Ourense", image_url: "", cost: 30, confirmation_code: "", notes: "Cenar por el centro de Ourense.", status: "Completado" }
                ]
            },
            {
                id: 103,
                day_number: 3,
                date: "2023-08-21",
                title: "Excursión a las Islas Cíes y Vigo",
                activities: [
                    { id: 1009, time: "09:00", end_time: "", title: "Trayecto Ourense -> Vigo", category: "Transporte", location: "Vigo", map_url: "https://maps.google.com/?q=Puerto+de+Vigo", image_url: "", cost: 0, confirmation_code: "", notes: "Salimos pronto de Ourense a Vigo (1h aprox.). Ir 15-20 min antes de que salga el barco para aparcar.", status: "Completado" },
                    { id: 1010, time: "11:00", end_time: "17:30", title: "Excursión a las Islas Cíes", category: "Actividad", location: "Islas Cíes", map_url: "https://maps.google.com/?q=Islas+Cies", image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop", cost: 50, confirmation_code: "CIES-2023", notes: "Salida 11:00, vuelta 17:30. Pedir permiso de la Xunta de Galicia + billete de barco.\nQué ver:\n• Playa de Rodas (mejor playa del mundo)\n• Playa dos Viños y Playa de Nuestra Señora\n• Ruta Alto do Príncipe (1h 15min)\n• Ruta de Monteagudo (1h 45min al faro)", status: "Completado" },
                    { id: 1011, time: "14:00", end_time: "", title: "Comida de picnic en Islas Cíes", category: "Restaurante", location: "Islas Cíes", map_url: "", image_url: "", cost: 10, confirmation_code: "", notes: "Llevar bocata (los restaurantes de la isla son escasos y caros).", status: "Completado" },
                    { id: 1012, time: "18:00", end_time: "", title: "Visita Tarde: A Guarda y Baiona (Opcional)", category: "Actividad", location: "A Guarda y Baiona", map_url: "https://maps.google.com/?q=Baiona", image_url: "", cost: 0, confirmation_code: "", notes: "A 30 min en coche de Vigo.", status: "Completado" },
                    { id: 1013, time: "21:30", end_time: "", title: "Cena: El Super Cachopo", category: "Restaurante", location: "Vigo", map_url: "https://maps.google.com/?q=El+super+cachopo+Vigo", image_url: "", cost: 35, confirmation_code: "", notes: "Cena abundante de cachopo en Vigo.", status: "Completado" },
                    { id: 1014, time: "22:30", end_time: "", title: "Alojamiento en Casa Vigo", category: "Hotel", location: "Vigo", map_url: "https://maps.google.com/?q=Vigo", image_url: "", cost: 65, confirmation_code: "RES-VIGO", notes: "Alojamiento en Vigo.", status: "Completado" }
                ]
            },
            {
                id: 104,
                day_number: 4,
                date: "2023-08-22",
                title: "Santiago de Compostela y Costa da Morte",
                activities: [
                    { id: 1015, time: "09:00", end_time: "", title: "Trayecto Vigo -> Santiago", category: "Transporte", location: "Santiago de Compostela", map_url: "https://maps.google.com/?q=Santiago+de+Compostela", image_url: "", cost: 0, confirmation_code: "", notes: "Salimos pronto de Vigo a Santiago (1 hora aprox.).", status: "Completado" },
                    { id: 1016, time: "10:30", end_time: "", title: "Visita Santiago de Compostela", category: "Actividad", location: "Catedral de Santiago", map_url: "https://maps.google.com/?q=Catedral+de+Santiago", image_url: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&auto=format&fit=crop", cost: 0, confirmation_code: "", notes: "Recorrido por la Catedral y el casco histórico.", status: "Completado" },
                    { id: 1017, time: "16:00", end_time: "", title: "Finisterre y Costa da Morte", category: "Actividad", location: "Faro de Finisterre", map_url: "https://maps.google.com/?q=Faro+de+Finisterre", image_url: "", cost: 0, confirmation_code: "", notes: "Visita al faro de Finisterre y costa de la zona.", status: "Completado" },
                    { id: 1018, time: "22:00", end_time: "", title: "Visita Noche: Mar de Ardora (Playa de Muxía)", category: "Actividad", location: "Playa de Muxía", map_url: "https://maps.google.com/?q=Playa+de+Muxia", image_url: "", cost: 0, confirmation_code: "", notes: "Observar el fenómeno de bioluminiscencia en la playa.", status: "Completado" },
                    { id: 1019, time: "23:30", end_time: "", title: "Alojamiento en Casa Santiago", category: "Hotel", location: "Santiago de Compostela", map_url: "https://maps.google.com/?q=Santiago+de+Compostela", image_url: "", cost: 70, confirmation_code: "RES-STG", notes: "Alojamiento en Santiago.", status: "Completado" }
                ]
            },
            {
                id: 105,
                day_number: 5,
                date: "2023-08-23",
                title: "Ruta hacia A Coruña y Torre de Hércules",
                activities: [
                    { id: 1020, time: "09:30", end_time: "", title: "Trayecto bordeando la costa pasando por Muxía", category: "Transporte", location: "A Coruña", map_url: "https://maps.google.com/?q=Muxia", image_url: "", cost: 0, confirmation_code: "", notes: "Salimos hacia A Coruña bordeando la costa.", status: "Completado" },
                    { id: 1021, time: "16:30", end_time: "", title: "Visita a la Torre de Hércules", category: "Actividad", location: "Torre de Hércules, A Coruña", map_url: "https://maps.google.com/?q=Torre+de+Hercules", image_url: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800&auto=format&fit=crop", cost: 5, confirmation_code: "", notes: "Para aparcar está complicado, ir con tiempo.", status: "Completado" },
                    { id: 1022, time: "22:00", end_time: "", title: "Alojamiento en Casa A Coruña", category: "Hotel", location: "A Coruña", map_url: "https://maps.google.com/?q=A+Coruna", image_url: "", cost: 75, confirmation_code: "RES-COR", notes: "Alojamiento en A Coruña.", status: "Completado" }
                ]
            },
            {
                id: 106,
                day_number: 6,
                date: "2023-08-24",
                title: "Fragas do Eume y Naturaleza",
                activities: [
                    { id: 1023, time: "09:30", end_time: "", title: "Ruta en las Fragas do Eume", category: "Actividad", location: "Fragas do Eume", map_url: "https://maps.google.com/?q=Aparcamiento+Fragas+do+Eume", image_url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop", cost: 0, confirmation_code: "", notes: "Dejar el coche en Aparcamiento Fragas do Eume (ir pronto antes de que se llene, a 40 min de A Coruña). Desde el Centro de Interpretación se puede coger el bus.", status: "Completado" },
                    { id: 1024, time: "21:00", end_time: "", title: "Alojamiento en Casa", category: "Hotel", location: "A Coruña / Eume", map_url: "", image_url: "", cost: 65, confirmation_code: "", notes: "Alojamiento.", status: "Completado" }
                ]
            },
            {
                id: 107,
                day_number: 7,
                date: "2023-08-25",
                title: "Playa de las Catedrales y Luarca/Taramundi",
                activities: [
                    { id: 1025, time: "10:00", end_time: "", title: "Playa de las Catedrales", category: "Actividad", location: "Playa de las Catedrales", map_url: "https://maps.google.com/?q=Playa+de+las+Catedrales", image_url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop", cost: 0, confirmation_code: "PERMISO-CATEDRAIS", notes: "Mirar el tiempo y las mareas. Imprescindible sacar la Autorización Praia das Catedrais.", status: "Completado" },
                    { id: 1026, time: "16:00", end_time: "", title: "Visita Luarca y Taramundi (Asturias)", category: "Actividad", location: "Luarca y Taramundi", map_url: "https://maps.google.com/?q=Taramundi", image_url: "", cost: 15, confirmation_code: "", notes: "Comprar queso artesanal en Taramundi y realizar la Ruta del Agua.", status: "Completado" },
                    { id: 1027, time: "21:30", end_time: "", title: "Alojamiento", category: "Hotel", location: "Asturias", map_url: "", image_url: "", cost: 60, confirmation_code: "", notes: "Alojamiento en zona Asturias.", status: "Completado" }
                ]
            },
            {
                id: 108,
                day_number: 8,
                date: "2023-08-26",
                title: "Vuelta a casa",
                activities: [
                    { id: 1028, time: "10:00", end_time: "", title: "Viaje de vuelta a casa", category: "Transporte", location: "Valencia", map_url: "", image_url: "", cost: 50, confirmation_code: "", notes: "Viaje de regreso.", status: "Completado" }
                ]
            }
        ],
        expenses: [
            { id: 2001, title: "Comida Alto de León", category: "Comida", amount: 40, currency: "EUR", date: "2023-08-19", paid: 1, notes: "" },
            { id: 2002, title: "Cena Ourense", category: "Comida", amount: 35, currency: "EUR", date: "2023-08-19", paid: 1, notes: "" },
            { id: 2003, title: "Casa Ourense", category: "Alojamiento", amount: 70, currency: "EUR", date: "2023-08-19", paid: 1, notes: "" },
            { id: 2004, title: "Termas Outariz", category: "Entradas", amount: 6.4, currency: "EUR", date: "2023-08-20", paid: 1, notes: "" },
            { id: 2005, title: "Barco Islas Cíes", category: "Transporte", amount: 50, currency: "EUR", date: "2023-08-21", paid: 1, notes: "" }
        ],
        checklist: [
            { id: 3001, category: "Documentos", item: "Pasaporte / DNI", completed: 1 },
            { id: 3002, category: "Documentos", item: "Autorización Praia das Catedrais", completed: 1 },
            { id: 3003, category: "Documentos", item: "Permiso Xunta + Billetes Barco Cíes", completed: 1 },
            { id: 3004, category: "Equipaje", item: "Bañador, toalla y chanclas para las Termas", completed: 1 },
            { id: 3005, category: "Equipaje", item: "Calzado cómodo para caminatas y miradores", completed: 1 },
            { id: 3006, category: "Electrónica", item: "Cargadores y Powerbank", completed: 1 }
        ]
    }
];

// Dictionary of Place Coordinates for Route Mapping
const COORDS_MAP = {
    'Valencia': [39.4699, -0.3763],
    'Alto de León': [40.7022, -4.1378],
    'Ourense': [42.3358, -7.8639],
    'Cimadevila': [42.3365, -7.8645],
    'Ribeira Sacra': [42.3683, -7.6744],
    'Termas Outariz': [42.3486, -7.9142],
    'Vigo': [42.2406, -8.7207],
    'Islas Cíes': [42.2272, -8.9056],
    'Baiona': [42.1189, -8.8497],
    'Santiago': [42.8805, -8.5457],
    'Finisterre': [42.8824, -9.2731],
    'Muxía': [43.1044, -9.2172],
    'A Coruña': [43.3859, -8.4065],
    'Torre de Hércules': [43.3859, -8.4065],
    'Fragas do Eume': [43.4172, -8.0675],
    'Playa de las Catedrales': [43.5539, -7.1166],
    'Luarca': [43.5436, -6.5358],
    'Taramundi': [43.3601, -7.1086],
    'Tokio': [35.6762, 139.6503],
    'Shinjuku': [35.6938, 139.7034],
    'Asakusa': [35.7148, 139.7967],
    'Kioto': [35.0116, 135.7681],
    'Osaka': [34.6937, 135.5023]
};

let state = {
    trips: [],
    currentTrip: null,
    activeTripFilter: 'all',
    activeCategoryFilter: 'all',
    activeTab: 'itinerary'
};

let leafletMap = null;

const CATEGORIES_MAP = {
    'Vuelo': { icon: '✈️', badgeClass: 'badge-vuelo', label: 'Vuelo' },
    'Hotel': { icon: '🏨', badgeClass: 'badge-hotel', label: 'Hotel' },
    'Transporte': { icon: '🚗', badgeClass: 'badge-transporte', label: 'Transporte' },
    'Actividad': { icon: '🏛️', badgeClass: 'badge-actividad', label: 'Actividad' },
    'Restaurante': { icon: '🍽️', badgeClass: 'badge-restaurante', label: 'Restaurante' },
    'Nota': { icon: '📝', badgeClass: 'badge-nota', label: 'Nota' }
};

document.addEventListener("DOMContentLoaded", () => {
    loadLocalData();
});

function loadLocalData() {
    const data = localStorage.getItem('travel_planner_data');
    if (data) {
        try {
            state.trips = JSON.parse(data);
        } catch (e) {
            state.trips = DEFAULT_TRIPS;
            saveLocalData();
        }
    } else {
        state.trips = DEFAULT_TRIPS;
        saveLocalData();
    }
    renderTrips();
}

function saveLocalData() {
    localStorage.setItem('travel_planner_data', JSON.stringify(state.trips));
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const date = new Date(parts[0], parts[1] - 1, parts[2]);
            return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
        }
    } catch (e) {}
    return dateStr;
}

function renderTrips() {
    const grid = document.getElementById('trips-grid');
    const emptyState = document.getElementById('trips-empty');
    const searchVal = (document.getElementById('trip-search').value || '').toLowerCase();

    grid.innerHTML = '';
    const todayStr = new Date().toISOString().split('T')[0];

    const filtered = state.trips.filter(t => {
        const matchSearch = t.title.toLowerCase().includes(searchVal) || t.destination.toLowerCase().includes(searchVal);
        if (!matchSearch) return false;

        if (state.activeTripFilter === 'upcoming') {
            return t.end_date >= todayStr;
        } else if (state.activeTripFilter === 'past') {
            return t.end_date < todayStr;
        }
        return true;
    });

    if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    filtered.forEach(t => {
        const isPast = t.end_date < todayStr;

        let totalSpent = 0;
        if (t.expenses) t.expenses.forEach(e => totalSpent += e.amount);

        let totalActivities = 0;
        if (t.days) t.days.forEach(d => totalActivities += d.activities.length);

        const card = document.createElement('div');
        card.className = "bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group";
        card.onclick = () => loadTripDetail(t.id);

        card.innerHTML = `
            <div>
                <div class="flex items-center justify-between gap-3 mb-3">
                    <span class="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                        ${t.cover_image || '✈️'}
                    </span>
                    <span class="px-2.5 py-1 rounded-full text-xs font-bold ${isPast ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-800'}">
                        ${isPast ? 'Finalizado' : 'Próximo'}
                    </span>
                </div>
                <h3 class="font-bold text-lg text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">${t.title}</h3>
                <p class="text-xs font-semibold text-slate-500 flex items-center gap-1 mt-1">
                    <i class="ri-map-pin-line text-sky-500"></i> ${t.destination}
                </p>
                <p class="text-xs text-slate-400 mt-2 flex items-center gap-1">
                    <i class="ri-calendar-line"></i> ${formatDate(t.start_date)} - ${formatDate(t.end_date)}
                </p>
            </div>

            <div class="border-t border-slate-100 pt-4 mt-5 flex items-center justify-between text-xs text-slate-600 font-medium">
                <span class="flex items-center gap-1">
                    <i class="ri-calendar-event-line text-sky-600"></i> ${totalActivities} actividades
                </span>
                <span class="flex items-center gap-1 font-bold text-slate-800">
                    <i class="ri-money-euro-circle-line text-emerald-600"></i> €${totalSpent.toFixed(2)}
                </span>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterTrips(type) {
    state.activeTripFilter = type;
    document.querySelectorAll('.trip-filter-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    renderTrips();
}

function showDashboard() {
    state.currentTrip = null;
    document.getElementById('view-dashboard').classList.remove('hidden');
    document.getElementById('view-trip-detail').classList.add('hidden');
    renderTrips();
}

function loadTripDetail(tripId) {
    const trip = state.trips.find(t => t.id === tripId);
    if (!trip) return;
    state.currentTrip = trip;

    renderTripDetail();
    document.getElementById('view-dashboard').classList.add('hidden');
    document.getElementById('view-trip-detail').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render interactive route map after DOM update
    setTimeout(() => {
        renderTripRouteMap();
    }, 100);
}

function renderTripDetail() {
    if (!state.currentTrip) return;
    const trip = state.currentTrip;

    document.getElementById('trip-detail-icon').textContent = trip.cover_image || '✈️';
    document.getElementById('trip-detail-title').textContent = trip.title;
    document.getElementById('trip-detail-destination').querySelector('span').textContent = trip.destination;
    document.getElementById('trip-detail-dates').textContent = `${formatDate(trip.start_date)} - ${formatDate(trip.end_date)}`;
    document.getElementById('trip-detail-budget').textContent = `Presupuesto: €${(trip.budget || 0).toFixed(2)}`;

    const todayStr = new Date().toISOString().split('T')[0];
    const statusBadge = document.getElementById('trip-detail-status-badge');
    if (trip.end_date < todayStr) {
        statusBadge.textContent = 'Finalizado';
        statusBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700';
    } else if (trip.start_date <= todayStr && trip.end_date >= todayStr) {
        statusBadge.textContent = '¡En Curso!';
        statusBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 animate-pulse';
    } else {
        statusBadge.textContent = 'Próximo';
        statusBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800';
    }

    renderDaysItinerary();
    renderExpenses();
    renderChecklist();
}

// Render Interactive Route Map with Leaflet + Google Maps Route Link
function renderTripRouteMap() {
    if (!state.currentTrip || !state.currentTrip.days) return;

    const mapBox = document.getElementById('trip-map-box');
    const mapDiv = document.getElementById('route-map');
    if (!mapDiv) return;

    // Collect all location points in order
    const waypoints = [];
    const googleMapPoints = [];

    state.currentTrip.days.forEach(d => {
        d.activities.forEach(a => {
            if (a.location) {
                // Check if known in dictionary or extract coords
                let coords = null;
                for (const [key, c] of Object.entries(COORDS_MAP)) {
                    if (a.location.toLowerCase().includes(key.toLowerCase()) || a.title.toLowerCase().includes(key.toLowerCase())) {
                        coords = c;
                        break;
                    }
                }

                if (coords) {
                    waypoints.push({
                        day: d.day_number,
                        title: a.title,
                        location: a.location,
                        coords: coords,
                        map_url: a.map_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.location)}`
                    });
                }
                googleMapPoints.push(a.location);
            }
        });
    });

    if (waypoints.length === 0) {
        mapBox.classList.add('hidden');
        return;
    }
    mapBox.classList.remove('hidden');

    // Build Google Maps Directions Link
    const startLoc = googleMapPoints[0];
    const endLoc = googleMapPoints[googleMapPoints.length - 1];
    const middleWaypoints = googleMapPoints.slice(1, -1).slice(0, 8); // Max waypoints for URL

    let fullGmapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(startLoc)}&destination=${encodeURIComponent(endLoc)}`;
    if (middleWaypoints.length > 0) {
        fullGmapsUrl += `&waypoints=${middleWaypoints.map(w => encodeURIComponent(w)).join('|')}`;
    }
    document.getElementById('btn-open-full-google-maps').href = fullGmapsUrl;

    // Initialize or reset Leaflet map
    if (leafletMap) {
        leafletMap.remove();
        leafletMap = null;
    }

    const firstCoord = waypoints[0].coords;
    leafletMap = L.map('route-map').setView(firstCoord, 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap'
    }).addTo(leafletMap);

    const latLngs = waypoints.map(w => w.coords);

    // Draw connected line trajectory
    const polyline = L.polyline(latLngs, {
        color: '#0284c7',
        weight: 4,
        opacity: 0.85,
        dashArray: '6, 6'
    }).addTo(leafletMap);

    // Add markers for waypoints
    waypoints.forEach((w, idx) => {
        const marker = L.marker(w.coords).addTo(leafletMap);
        marker.bindPopup(`
            <div style="font-family:sans-serif; padding:4px;">
                <span style="background:#0284c7; color:#fff; font-size:10px; font-weight:bold; padding:2px 6px; border-radius:4px;">Día ${w.day}</span>
                <h4 style="margin:4px 0; font-size:13px; font-weight:bold; color:#0f172a;">${w.title}</h4>
                <p style="margin:2px 0 8px 0; font-size:11px; color:#475569;">📍 ${w.location}</p>
                <a href="${w.map_url}" target="_blank" style="display:inline-block; background:#10b981; color:#fff; font-size:11px; font-weight:bold; padding:4px 8px; border-radius:6px; text-decoration:none;">Navegar en Google Maps</a>
            </div>
        `);
    });

    // Auto-fit map to show the full route
    try {
        leafletMap.fitBounds(polyline.getBounds().pad(0.15));
    } catch (e) {}
}

function switchTripTab(tabName) {
    state.activeTab = tabName;
    ['itinerary', 'budget', 'checklist'].forEach(t => {
        const btn = document.getElementById(`tab-btn-${t}`);
        const content = document.getElementById(`tab-content-${t}`);
        if (t === tabName) {
            btn.classList.add('active');
            content.classList.remove('hidden');
        } else {
            btn.classList.remove('active');
            content.classList.add('hidden');
        }
    });

    if (tabName === 'itinerary' && leafletMap) {
        setTimeout(() => leafletMap.invalidateSize(), 200);
    }
}

function renderDaysItinerary() {
    const container = document.getElementById('days-container');
    container.innerHTML = '';

    if (!state.currentTrip || !state.currentTrip.days) return;

    state.currentTrip.days.forEach(d => {
        const dayCard = document.createElement('div');
        dayCard.className = "bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4";

        const filteredActs = d.activities.filter(a => {
            if (state.activeCategoryFilter === 'all') return true;
            return a.category === state.activeCategoryFilter;
        });

        let activitiesHTML = '';
        if (filteredActs.length === 0) {
            activitiesHTML = `<p class="text-xs text-slate-400 italic py-2">Sin actividades programadas para este día.</p>`;
        } else {
            activitiesHTML = filteredActs.map(a => {
                const catMeta = CATEGORIES_MAP[a.category] || CATEGORIES_MAP['Actividad'];
                const statusClass = a.status === 'Completado' ? 'status-completado' : (a.status === 'Reservado' ? 'status-reservado' : 'status-planificado');
                const mapLink = a.map_url || (a.location ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.location)}` : '');

                return `
                    <div class="timeline-item relative pl-8 py-2 group">
                        <div class="absolute left-0 top-2.5 w-6 h-6 rounded-full bg-white border-2 border-sky-500 flex items-center justify-center text-xs z-10 shadow-sm">
                            ${catMeta.icon}
                        </div>

                        <div class="bg-slate-50 border border-slate-200/80 hover:border-sky-300 rounded-xl p-4 transition-all space-y-3">
                            <div class="flex items-start justify-between gap-3">
                                <div class="space-y-1">
                                    <div class="flex items-center gap-2 flex-wrap">
                                        ${a.time ? `<span class="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-xs font-bold"><i class="ri-time-line"></i> ${a.time} ${a.end_time ? '- ' + a.end_time : ''}</span>` : ''}
                                        <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${catMeta.badgeClass}">${catMeta.label}</span>
                                        <span onclick="toggleActivityStatus(${a.id}, '${a.status}')" class="cursor-pointer px-2 py-0.5 rounded-full text-xs ${statusClass} hover:opacity-80 transition-opacity" title="Haz clic para cambiar estado">
                                            ${a.status}
                                        </span>
                                    </div>
                                    <h4 class="font-bold text-slate-900 text-base leading-snug">${a.title}</h4>
                                </div>
                                <div class="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity print:hidden">
                                    <button onclick="openEditActivityModal(${a.id})" class="p-1 text-slate-400 hover:text-slate-700 rounded" title="Editar"><i class="ri-edit-line"></i></button>
                                    <button onclick="deleteActivity(${a.id})" class="p-1 text-slate-400 hover:text-rose-600 rounded" title="Eliminar"><i class="ri-delete-bin-line"></i></button>
                                </div>
                            </div>

                            ${a.image_url ? `
                                <div class="rounded-xl overflow-hidden max-h-48 border border-slate-200 my-2">
                                    <img src="${a.image_url}" alt="${a.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
                                </div>
                            ` : ''}

                            <div class="flex items-center justify-between gap-2 flex-wrap">
                                ${a.location ? `
                                    <p class="text-xs font-medium text-slate-600 flex items-center gap-1">
                                        <i class="ri-map-pin-2-line text-sky-500"></i> <span>${a.location}</span>
                                    </p>
                                ` : '<div></div>'}

                                ${mapLink ? `
                                    <a href="${mapLink}" target="_blank" rel="noopener noreferrer" class="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-all inline-flex items-center gap-1 print:hidden" title="Abrir en Google Maps">
                                        <i class="ri-navigation-line"></i> <span>Google Maps</span>
                                    </a>
                                ` : ''}
                            </div>

                            ${a.confirmation_code ? `
                                <p class="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md inline-block">
                                    <i class="ri-ticket-2-line"></i> Reserva: ${a.confirmation_code}
                                </p>
                            ` : ''}

                            ${a.notes ? `
                                <div class="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-100 whitespace-pre-line">${a.notes}</div>
                            ` : ''}

                            ${a.cost && a.cost > 0 ? `
                                <div class="text-right text-xs font-bold text-slate-700">
                                    Coste: €${a.cost.toFixed(2)}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            }).join('');
        }

        dayCard.innerHTML = `
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                        ${d.day_number}
                    </span>
                    <div>
                        <h3 class="font-bold text-slate-900 text-base">${d.title || ('Día ' + d.day_number)}</h3>
                        <p class="text-xs text-slate-500 font-medium">${formatDate(d.date)}</p>
                    </div>
                </div>
                <button onclick="openNewActivityModal(${d.id})" class="px-3 py-1.5 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 font-semibold text-xs rounded-lg transition-colors print:hidden">
                    + Añadir
                </button>
            </div>
            <div class="space-y-1">
                ${activitiesHTML}
            </div>
        `;
        container.appendChild(dayCard);
    });
}

function filterActivities(cat) {
    state.activeCategoryFilter = cat;
    document.querySelectorAll('.cat-filter-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    renderDaysItinerary();
}

function renderExpenses() {
    if (!state.currentTrip) return;
    const expenses = state.currentTrip.expenses || [];

    let totalSpent = 0;
    expenses.forEach(e => totalSpent += e.amount);

    const budget = state.currentTrip.budget || 0;
    const remaining = budget - totalSpent;

    document.getElementById('budget-stat-total').textContent = `€${budget.toFixed(2)}`;
    document.getElementById('budget-stat-spent').textContent = `€${totalSpent.toFixed(2)}`;
    const remainingEl = document.getElementById('budget-stat-remaining');
    remainingEl.textContent = `€${remaining.toFixed(2)}`;
    remainingEl.className = remaining >= 0 ? 'text-2xl font-extrabold text-emerald-600 mt-1' : 'text-2xl font-extrabold text-rose-600 mt-1';

    const tbody = document.getElementById('expenses-table-body');
    tbody.innerHTML = '';

    if (expenses.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="py-4 text-center text-slate-400 text-xs italic">No hay gastos registrados todavía.</td></tr>`;
        return;
    }

    expenses.forEach(e => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-50 transition-colors";
        tr.innerHTML = `
            <td class="py-3 px-2 font-semibold text-slate-800">${e.title}</td>
            <td class="py-3 px-2"><span class="px-2 py-0.5 rounded text-xs bg-slate-100 font-medium text-slate-600">${e.category}</span></td>
            <td class="py-3 px-2 font-bold text-slate-900">€${e.amount.toFixed(2)}</td>
            <td class="py-3 px-2"><span class="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Pagado</span></td>
            <td class="py-3 px-2 text-right">
                <button onclick="deleteExpense(${e.id})" class="text-slate-400 hover:text-rose-600 p-1" title="Eliminar"><i class="ri-delete-bin-line"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderChecklist() {
    if (!state.currentTrip) return;
    const checklist = state.currentTrip.checklist || [];

    const total = checklist.length;
    const completedCount = checklist.filter(c => c.completed).length;
    const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

    document.getElementById('checklist-progress-bar').style.width = `${percent}%`;
    document.getElementById('checklist-progress-text').textContent = `${percent}% (${completedCount}/${total})`;

    const container = document.getElementById('checklist-items-container');
    container.innerHTML = '';

    const categories = {};
    checklist.forEach(item => {
        const cat = item.category || 'Equipaje';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(item);
    });

    if (Object.keys(categories).length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-400 italic">No hay items en la lista.</p>`;
        return;
    }

    for (const [catName, items] of Object.entries(categories)) {
        const box = document.createElement('div');
        box.className = "bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3";

        const itemsListHTML = items.map(item => `
            <div class="flex items-center justify-between gap-2 p-2 bg-white rounded-lg border border-slate-100 shadow-2xs">
                <label class="flex items-center gap-2.5 cursor-pointer text-sm font-medium ${item.completed ? 'line-through text-slate-400' : 'text-slate-700'}">
                    <input type="checkbox" ${item.completed ? 'checked' : ''} onchange="toggleChecklistItem(${item.id})" class="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500">
                    <span>${item.item}</span>
                </label>
                <button onclick="deleteChecklistItem(${item.id})" class="text-slate-300 hover:text-rose-500 text-xs p-1" title="Eliminar"><i class="ri-delete-bin-line"></i></button>
            </div>
        `).join('');

        box.innerHTML = `
            <h4 class="font-bold text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200/60 pb-2">${catName}</h4>
            <div class="space-y-1.5">${itemsListHTML}</div>
        `;
        container.appendChild(box);
    }
}

// === MODALS & ACTIONS ===

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

function openNewTripModal() {
    document.getElementById('trip-form-id').value = '';
    document.getElementById('form-trip').reset();
    document.getElementById('modal-trip-title').textContent = 'Nuevo Viaje';
    document.getElementById('modal-trip').classList.remove('hidden');
}

function editCurrentTrip() {
    if (!state.currentTrip) return;
    const trip = state.currentTrip;
    document.getElementById('trip-form-id').value = trip.id;
    document.getElementById('trip-input-title').value = trip.title;
    document.getElementById('trip-input-destination').value = trip.destination;
    document.getElementById('trip-input-start-date').value = trip.start_date;
    document.getElementById('trip-input-end-date').value = trip.end_date;
    document.getElementById('trip-input-icon').value = trip.cover_image || '✈️';
    document.getElementById('trip-input-budget').value = trip.budget || 0;
    document.getElementById('trip-input-notes').value = trip.notes || '';
    document.getElementById('modal-trip-title').textContent = 'Editar Viaje';
    document.getElementById('modal-trip').classList.remove('hidden');
}

function generateDaysArray(startDateStr, endDateStr) {
    const days = [];
    try {
        const start = new Date(startDateStr);
        const end = new Date(endDateStr);
        let curr = new Date(start);
        let num = 1;
        while (curr <= end) {
            days.push({
                id: Date.now() + num,
                day_number: num,
                date: curr.toISOString().split('T')[0],
                title: `Día ${num}`,
                activities: []
            });
            curr.setDate(curr.getDate() + 1);
            num++;
        }
    } catch (e) {}
    return days;
}

function handleTripSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('trip-form-id').value;
    const title = document.getElementById('trip-input-title').value;
    const destination = document.getElementById('trip-input-destination').value;
    const start_date = document.getElementById('trip-input-start-date').value;
    const end_date = document.getElementById('trip-input-end-date').value;
    const cover_image = document.getElementById('trip-input-icon').value || '✈️';
    const budget = parseFloat(document.getElementById('trip-input-budget').value) || 0;
    const notes = document.getElementById('trip-input-notes').value;

    if (id) {
        const trip = state.trips.find(t => t.id == id);
        if (trip) {
            trip.title = title;
            trip.destination = destination;
            trip.start_date = start_date;
            trip.end_date = end_date;
            trip.cover_image = cover_image;
            trip.budget = budget;
            trip.notes = notes;
        }
    } else {
        const newTrip = {
            id: Date.now(),
            title, destination, start_date, end_date, cover_image, budget, currency: 'EUR', notes,
            days: generateDaysArray(start_date, end_date),
            expenses: [],
            checklist: [
                { id: Date.now() + 1, category: "Documentos", item: "Pasaporte / DNI", completed: 0 },
                { id: Date.now() + 2, category: "Documentos", item: "Billetes y reservas", completed: 0 },
                { id: Date.now() + 3, category: "Electrónica", item: "Cargadores y Powerbank", completed: 0 },
                { id: Date.now() + 4, category: "Equipaje", item: "Neceser y ropa", completed: 0 }
            ]
        };
        state.trips.push(newTrip);
    }

    saveLocalData();
    closeModal('modal-trip');
    if (id) loadTripDetail(parseInt(id)); else renderTrips();
}

function deleteCurrentTrip() {
    if (!state.currentTrip) return;
    if (confirm(`¿Estás seguro de eliminar el viaje "${state.currentTrip.title}"?`)) {
        state.trips = state.trips.filter(t => t.id !== state.currentTrip.id);
        saveLocalData();
        showDashboard();
    }
}

function openNewActivityModal(preferredDayId = null) {
    if (!state.currentTrip || !state.currentTrip.days) return;

    document.getElementById('act-form-id').value = '';
    document.getElementById('form-activity').reset();

    const select = document.getElementById('act-input-day-id');
    select.innerHTML = state.currentTrip.days.map(d => `
        <option value="${d.id}" ${preferredDayId == d.id ? 'selected' : ''}>Día ${d.day_number} (${formatDate(d.date)})</option>
    `).join('');

    document.getElementById('modal-activity-title').textContent = 'Añadir Actividad';
    document.getElementById('modal-activity').classList.remove('hidden');
}

function openEditActivityModal(actId) {
    if (!state.currentTrip) return;
    let foundAct = null;
    let foundDay = null;
    for (const d of state.currentTrip.days) {
        const match = d.activities.find(a => a.id === actId);
        if (match) { foundAct = match; foundDay = d; break; }
    }
    if (!foundAct) return;

    document.getElementById('act-form-id').value = foundAct.id;

    const select = document.getElementById('act-input-day-id');
    select.innerHTML = state.currentTrip.days.map(d => `
        <option value="${d.id}" ${foundDay.id == d.id ? 'selected' : ''}>Día ${d.day_number} (${formatDate(d.date)})</option>
    `).join('');

    document.getElementById('act-input-time').value = foundAct.time || '';
    document.getElementById('act-input-end-time').value = foundAct.end_time || '';
    document.getElementById('act-input-category').value = foundAct.category || 'Actividad';
    document.getElementById('act-input-title').value = foundAct.title;
    document.getElementById('act-input-location').value = foundAct.location || '';
    document.getElementById('act-input-cost').value = foundAct.cost || 0;
    document.getElementById('act-input-code').value = foundAct.confirmation_code || '';
    document.getElementById('act-input-status').value = foundAct.status || 'Planificado';
    document.getElementById('act-input-map-url').value = foundAct.map_url || '';
    document.getElementById('act-input-image-url').value = foundAct.image_url || '';
    document.getElementById('act-input-notes').value = foundAct.notes || '';

    document.getElementById('modal-activity-title').textContent = 'Editar Actividad';
    document.getElementById('modal-activity').classList.remove('hidden');
}

function handleActivitySubmit(e) {
    e.preventDefault();
    if (!state.currentTrip) return;

    const actId = document.getElementById('act-form-id').value;
    const dayId = parseInt(document.getElementById('act-input-day-id').value);

    const title = document.getElementById('act-input-title').value;
    const location = document.getElementById('act-input-location').value;
    let map_url = document.getElementById('act-input-map-url').value;
    if (location && !map_url) {
        map_url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    }

    const activityData = {
        id: actId ? parseInt(actId) : Date.now(),
        time: document.getElementById('act-input-time').value,
        end_time: document.getElementById('act-input-end-time').value,
        category: document.getElementById('act-input-category').value,
        title,
        location,
        cost: parseFloat(document.getElementById('act-input-cost').value) || 0,
        confirmation_code: document.getElementById('act-input-code').value,
        status: document.getElementById('act-input-status').value,
        map_url,
        image_url: document.getElementById('act-input-image-url').value,
        notes: document.getElementById('act-input-notes').value
    };

    if (actId) {
        for (const d of state.currentTrip.days) {
            d.activities = d.activities.filter(a => a.id != actId);
        }
    }

    const targetDay = state.currentTrip.days.find(d => d.id == dayId);
    if (targetDay) {
        targetDay.activities.push(activityData);
    }

    saveLocalData();
    closeModal('modal-activity');
    renderTripDetail();
    setTimeout(() => renderTripRouteMap(), 100);
}

function toggleActivityStatus(actId, currentStatus) {
    if (!state.currentTrip) return;
    const nextMap = { 'Planificado': 'Reservado', 'Reservado': 'Completado', 'Completado': 'Planificado' };
    for (const d of state.currentTrip.days) {
        const act = d.activities.find(a => a.id === actId);
        if (act) {
            act.status = nextMap[currentStatus] || 'Planificado';
            break;
        }
    }
    saveLocalData();
    renderDaysItinerary();
}

function deleteActivity(actId) {
    if (!state.currentTrip) return;
    if (confirm("¿Eliminar esta actividad?")) {
        for (const d of state.currentTrip.days) {
            d.activities = d.activities.filter(a => a.id !== actId);
        }
        saveLocalData();
        renderDaysItinerary();
        setTimeout(() => renderTripRouteMap(), 100);
    }
}

function openNewExpenseModal() {
    if (!state.currentTrip) return;
    document.getElementById('form-expense').reset();
    document.getElementById('modal-expense').classList.remove('hidden');
}

function handleExpenseSubmit(e) {
    e.preventDefault();
    if (!state.currentTrip) return;

    const newExpense = {
        id: Date.now(),
        title: document.getElementById('exp-input-title').value,
        amount: parseFloat(document.getElementById('exp-input-amount').value) || 0,
        category: document.getElementById('exp-input-category').value,
        currency: 'EUR',
        paid: 1
    };

    if (!state.currentTrip.expenses) state.currentTrip.expenses = [];
    state.currentTrip.expenses.push(newExpense);

    saveLocalData();
    closeModal('modal-expense');
    renderExpenses();
}

function deleteExpense(expId) {
    if (!state.currentTrip) return;
    if (confirm("¿Eliminar este gasto?")) {
        state.currentTrip.expenses = state.currentTrip.expenses.filter(e => e.id !== expId);
        saveLocalData();
        renderExpenses();
    }
}

function openNewChecklistModal() {
    if (!state.currentTrip) return;
    document.getElementById('form-checklist').reset();
    document.getElementById('modal-checklist').classList.remove('hidden');
}

function handleChecklistSubmit(e) {
    e.preventDefault();
    if (!state.currentTrip) return;

    const newItem = {
        id: Date.now(),
        category: document.getElementById('check-input-category').value,
        item: document.getElementById('check-input-item').value,
        completed: 0
    };

    if (!state.currentTrip.checklist) state.currentTrip.checklist = [];
    state.currentTrip.checklist.push(newItem);

    saveLocalData();
    closeModal('modal-checklist');
    renderChecklist();
}

function toggleChecklistItem(itemId) {
    if (!state.currentTrip) return;
    const item = state.currentTrip.checklist.find(c => c.id === itemId);
    if (item) {
        item.completed = item.completed ? 0 : 1;
        saveLocalData();
        renderChecklist();
    }
}

function deleteChecklistItem(itemId) {
    if (!state.currentTrip) return;
    state.currentTrip.checklist = state.currentTrip.checklist.filter(c => c.id !== itemId);
    saveLocalData();
    renderChecklist();
}

function exportTripJSON() {
    if (!state.currentTrip) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.currentTrip, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `viaje_${state.currentTrip.title.replace(/\s+/g, '_')}_backup.json`;
    a.click();
}

function printTripItinerary() {
    switchTripTab('itinerary');
    window.print();
}

function exportOfflineHTML() {
    if (!state.currentTrip) return;
    const { trip } = state;
    const days = state.currentTrip.days || [];

    let daysHTML = days.map(d => {
        const acts = (d.activities || []).map(a => {
            const mapLink = a.map_url || (a.location ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.location)}` : '');
            return `
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px; margin-bottom:10px;">
                    <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:14px;">
                        <span>${a.time ? a.time + ' ' : ''}${a.title}</span>
                        <span style="background:#e0f2fe; color:#0369a1; padding:2px 8px; border-radius:12px; font-size:11px;">${a.category}</span>
                    </div>
                    ${a.image_url ? `<img src="${a.image_url}" style="width:100%; max-height:200px; object-fit:cover; border-radius:8px; margin:8px 0;">` : ''}
                    ${a.location ? `<div style="font-size:12px; color:#475569; margin-top:4px;">📍 ${a.location} ${mapLink ? `<a href="${mapLink}" target="_blank" style="color:#0284c7; font-weight:bold; margin-left:6px;">[Navegar con Google Maps]</a>` : ''}</div>` : ''}
                    ${a.confirmation_code ? `<div style="font-size:12px; color:#4338ca; background:#e0e7ff; padding:2px 6px; border-radius:4px; display:inline-block; margin-top:4px;">🎫 Reserva: ${a.confirmation_code}</div>` : ''}
                    ${a.notes ? `<div style="font-size:12px; color:#64748b; font-style:italic; margin-top:4px; background:#fff; padding:6px; border-radius:6px; white-space:pre-line;">${a.notes}</div>` : ''}
                </div>
            `;
        }).join('') || '<div style="font-size:12px; color:#94a3b8; font-style:italic;">Sin actividades programadas.</div>';

        return `
            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:16px; margin-bottom:16px;">
                <h3 style="margin:0 0 10px 0; font-size:16px; color:#0f172a; border-bottom:1px solid #f1f5f9; padding-bottom:6px;">
                    Día ${d.day_number}: ${d.title || ''} <span style="font-size:12px; font-weight:normal; color:#64748b;">(${formatDate(d.date)})</span>
                </h3>
                ${acts}
            </div>
        `;
    }).join('');

    const offlineDoc = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Itinerario Offline - ${state.currentTrip.title}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background:#f1f5f9; color:#1e293b; margin:0; padding:16px; }
        .card { background:#fff; border-radius:16px; padding:20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom:20px; }
        h1 { margin:0 0 4px 0; font-size:22px; color:#0f172a; }
        p { margin:2px 0; font-size:14px; color:#64748b; }
        .badge { display:inline-block; background:#dcfce7; color:#15803d; font-weight:bold; font-size:12px; padding:4px 10px; border-radius:20px; margin-top:8px; }
    </style>
</head>
<body>
    <div class="card">
        <div style="font-size:32px;">${state.currentTrip.cover_image || '✈️'}</div>
        <h1>${state.currentTrip.title}</h1>
        <p>📍 <strong>${state.currentTrip.destination}</strong></p>
        <p>📅 ${formatDate(state.currentTrip.start_date)} - ${formatDate(state.currentTrip.end_date)}</p>
        <div class="badge">Ficha Guardada Offline para Móvil</div>
    </div>
    <h2>Itinerario por Días</h2>
    ${daysHTML}
</body>
</html>`;

    const blob = new Blob([offlineDoc], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Itinerario_${state.currentTrip.title.replace(/\s+/g, '_')}_Offline.html`;
    a.click();
    URL.revokeObjectURL(url);
}
