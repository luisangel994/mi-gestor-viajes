// TravelPlanner Client JS App

let state = {
    trips: [],
    currentTrip: null, // { trip, days, expenses, checklist }
    activeTripFilter: 'all',
    activeCategoryFilter: 'all',
    activeTab: 'itinerary'
};

// Category Icons & Badges Map
const CATEGORIES_MAP = {
    'Vuelo': { icon: '✈️', badgeClass: 'badge-vuelo', label: 'Vuelo' },
    'Hotel': { icon: '🏨', badgeClass: 'badge-hotel', label: 'Hotel' },
    'Transporte': { icon: '🚗', badgeClass: 'badge-transporte', label: 'Transporte' },
    'Actividad': { icon: '🏛️', badgeClass: 'badge-actividad', label: 'Actividad' },
    'Restaurante': { icon: '🍽️', badgeClass: 'badge-restaurante', label: 'Restaurante' },
    'Nota': { icon: '📝', badgeClass: 'badge-nota', label: 'Nota' }
};

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
    fetchTrips();
});

// Helper: Format Date
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

// Fetch all trips
async function fetchTrips() {
    try {
        const res = await fetch('/api/trips');
        if (res.ok) {
            state.trips = await res.json();
            renderTrips();
        }
    } catch (err) {
        console.error("Error al cargar viajes:", err);
    }
}

// Render Trips Grid on Dashboard
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
        const totalSpent = (t.total_activity_cost || 0) + (t.total_expense_cost || 0);

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
                    <i class="ri-calendar-event-line text-sky-600"></i> ${t.total_activities || 0} actividades
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
    document.querySelectorAll('.trip-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    renderTrips();
}

function showDashboard() {
    state.currentTrip = null;
    document.getElementById('view-dashboard').classList.remove('hidden');
    document.getElementById('view-trip-detail').classList.add('hidden');
    fetchTrips();
}

// Load Trip Details
async function loadTripDetail(tripId) {
    try {
        const res = await fetch(`/api/trips/${tripId}`);
        if (res.ok) {
            state.currentTrip = await res.json();
            renderTripDetail();
            document.getElementById('view-dashboard').classList.add('hidden');
            document.getElementById('view-trip-detail').classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (err) {
        console.error("Error al cargar detalle del viaje:", err);
    }
}

// Render Trip Detail Header & Content
function renderTripDetail() {
    if (!state.currentTrip) return;
    const { trip, days, expenses, checklist } = state.currentTrip;

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

// Switch Detail Tabs
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
}

// Render Days & Activities Timeline
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
            activitiesHTML = `
                <p class="text-xs text-slate-400 italic py-2">Sin actividades programadas para este día.</p>
            `;
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

// Render Expenses Table
function renderExpenses() {
    if (!state.currentTrip) return;
    const { trip, expenses } = state.currentTrip;

    let totalSpent = 0;
    expenses.forEach(e => totalSpent += e.amount);

    const budget = trip.budget || 0;
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

// Render Checklist
function renderChecklist() {
    if (!state.currentTrip) return;
    const { checklist } = state.currentTrip;

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
    const { trip } = state.currentTrip;
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

async function handleTripSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('trip-form-id').value;
    const payload = {
        title: document.getElementById('trip-input-title').value,
        destination: document.getElementById('trip-input-destination').value,
        start_date: document.getElementById('trip-input-start-date').value,
        end_date: document.getElementById('trip-input-end-date').value,
        cover_image: document.getElementById('trip-input-icon').value || '✈️',
        budget: parseFloat(document.getElementById('trip-input-budget').value) || 0,
        currency: 'EUR',
        notes: document.getElementById('trip-input-notes').value
    };

    try {
        let res;
        if (id) {
            res = await fetch(`/api/trips/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } else {
            res = await fetch('/api/trips', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }
        if (res.ok) {
            closeModal('modal-trip');
            if (id) {
                loadTripDetail(id);
            } else {
                fetchTrips();
            }
        }
    } catch (err) {
        console.error("Error al guardar viaje:", err);
    }
}

async function deleteCurrentTrip() {
    if (!state.currentTrip) return;
    if (confirm(`¿Estás seguro de eliminar el viaje "${state.currentTrip.trip.title}"? esta acción no se puede deshacer.`)) {
        await fetch(`/api/trips/${state.currentTrip.trip.id}`, { method: 'DELETE' });
        showDashboard();
    }
}

// Activity Modal
function openNewActivityModal(preferredDayId = null) {
    if (!state.currentTrip || !state.currentTrip.days) return;

    document.getElementById('act-form-id').value = '';
    document.getElementById('form-activity').reset();
    document.getElementById('act-form-trip-id').value = state.currentTrip.trip.id;

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
    for (const d of state.currentTrip.days) {
        const match = d.activities.find(a => a.id === actId);
        if (match) { foundAct = match; break; }
    }
    if (!foundAct) return;

    document.getElementById('act-form-id').value = foundAct.id;
    document.getElementById('act-form-trip-id').value = state.currentTrip.trip.id;

    const select = document.getElementById('act-input-day-id');
    select.innerHTML = state.currentTrip.days.map(d => `
        <option value="${d.id}" ${foundAct.day_id == d.id ? 'selected' : ''}>Día ${d.day_number} (${formatDate(d.date)})</option>
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

async function handleActivitySubmit(e) {
    e.preventDefault();
    const actId = document.getElementById('act-form-id').value;
    const tripId = parseInt(document.getElementById('act-form-trip-id').value);
    const dayId = parseInt(document.getElementById('act-input-day-id').value);

    const payload = {
        trip_id: tripId,
        day_id: dayId,
        time: document.getElementById('act-input-time').value,
        end_time: document.getElementById('act-input-end-time').value,
        category: document.getElementById('act-input-category').value,
        title: document.getElementById('act-input-title').value,
        location: document.getElementById('act-input-location').value,
        cost: parseFloat(document.getElementById('act-input-cost').value) || 0,
        confirmation_code: document.getElementById('act-input-code').value,
        status: document.getElementById('act-input-status').value,
        map_url: document.getElementById('act-input-map-url').value,
        image_url: document.getElementById('act-input-image-url').value,
        notes: document.getElementById('act-input-notes').value
    };

    try {
        let res;
        if (actId) {
            res = await fetch(`/api/activities/${actId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } else {
            res = await fetch('/api/activities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }
        if (res.ok) {
            closeModal('modal-activity');
            loadTripDetail(tripId);
        }
    } catch (err) {
        console.error("Error al guardar actividad:", err);
    }
}

async function toggleActivityStatus(actId, currentStatus) {
    const nextStatusMap = {
        'Planificado': 'Reservado',
        'Reservado': 'Completado',
        'Completado': 'Planificado'
    };
    const nextStatus = nextStatusMap[currentStatus] || 'Planificado';
    await fetch(`/api/activities/${actId}/status?status=${nextStatus}`, { method: 'PATCH' });
    if (state.currentTrip) loadTripDetail(state.currentTrip.trip.id);
}

async function deleteActivity(actId) {
    if (confirm("¿Eliminar esta actividad?")) {
        await fetch(`/api/activities/${actId}`, { method: 'DELETE' });
        if (state.currentTrip) loadTripDetail(state.currentTrip.trip.id);
    }
}

// Expense Actions
function openNewExpenseModal() {
    if (!state.currentTrip) return;
    document.getElementById('form-expense').reset();
    document.getElementById('modal-expense').classList.remove('hidden');
}

async function handleExpenseSubmit(e) {
    e.preventDefault();
    const payload = {
        trip_id: state.currentTrip.trip.id,
        title: document.getElementById('exp-input-title').value,
        amount: parseFloat(document.getElementById('exp-input-amount').value) || 0,
        category: document.getElementById('exp-input-category').value,
        currency: 'EUR',
        paid: 1
    };

    const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        closeModal('modal-expense');
        loadTripDetail(state.currentTrip.trip.id);
    }
}

async function deleteExpense(expId) {
    if (confirm("¿Eliminar este gasto?")) {
        await fetch(`/api/expenses/${expId}`, { method: 'DELETE' });
        if (state.currentTrip) loadTripDetail(state.currentTrip.trip.id);
    }
}

// Checklist Actions
function openNewChecklistModal() {
    if (!state.currentTrip) return;
    document.getElementById('form-checklist').reset();
    document.getElementById('modal-checklist').classList.remove('hidden');
}

async function handleChecklistSubmit(e) {
    e.preventDefault();
    const payload = {
        trip_id: state.currentTrip.trip.id,
        category: document.getElementById('check-input-category').value,
        item: document.getElementById('check-input-item').value,
        completed: 0
    };

    const res = await fetch('/api/checklists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        closeModal('modal-checklist');
        loadTripDetail(state.currentTrip.trip.id);
    }
}

async function toggleChecklistItem(itemId) {
    await fetch(`/api/checklists/${itemId}/toggle`, { method: 'PATCH' });
    if (state.currentTrip) loadTripDetail(state.currentTrip.trip.id);
}

async function deleteChecklistItem(itemId) {
    await fetch(`/api/checklists/${itemId}`, { method: 'DELETE' });
    if (state.currentTrip) loadTripDetail(state.currentTrip.trip.id);
}

// Export / Print
function exportTripJSON() {
    if (!state.currentTrip) return;
    window.location.href = `/api/trips/${state.currentTrip.trip.id}/export/json`;
}

function printTripItinerary() {
    switchTripTab('itinerary');
    window.print();
}

// Export Self-contained Offline HTML file for Mobile
function exportOfflineHTML() {
    if (!state.currentTrip) return;
    const { trip, days } = state.currentTrip;

    let daysHTML = days.map(d => {
        const acts = d.activities.map(a => {
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
    <title>Itinerario Offline - ${trip.title}</title>
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
        <div style="font-size:32px;">${trip.cover_image || '✈️'}</div>
        <h1>${trip.title}</h1>
        <p>📍 <strong>${trip.destination}</strong></p>
        <p>📅 ${formatDate(trip.start_date)} - ${formatDate(trip.end_date)}</p>
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
    a.download = `Itinerario_${trip.title.replace(/\s+/g, '_')}_Offline.html`;
    a.click();
    URL.revokeObjectURL(url);
}
