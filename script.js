/**
 * Luxury Prayer Times Web App
 * Developer: Abdulrahman Radwan
 * Version: 2.0 (Luxury Edition)
 */

const CONFIG = {
    cities: {
        Aden: { name: 'Aden', nameAr: 'عدن', lat: 12.7855, lng: 45.0187 },
        Taiz: { name: 'Taiz', nameAr: 'تعز', lat: 13.5795, lng: 44.0209 }
    },
    defaultCity: 'Aden',
    apiBase: 'https://api.aladhan.com/v1',
    adhkar: [
        "سبحان الله وبحمده، سبحان الله العظيم",
        "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد",
        "اللهم صلِ وسلم على نبينا محمد",
        "أستغفر الله وأتوب إليه",
        "لا حول ولا قوة إلا بالله العلي العظيم",
        "أرحنا بها يا بلال..",
        "يا حي يا قيوم برحمتك أستغيث",
        "اللهم إنك عفو تحب العفو فاعفُ عني"
    ]
};

let state = {
    currentCity: null,
    prayerTimes: null,
    nextPrayer: null,
    adjustments: JSON.parse(localStorage.getItem('luxury_adj')) || { Fajr: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 },
    settings: JSON.parse(localStorage.getItem('luxury_settings')) || {
        method: 3, // MWL
        sound: true,
        vibrate: true,
        notifications: true
    },
    lastUpdatedDay: new Date().getDate(),
    intervals: {
        countdown: null,
        clock: null
    }
};

// --- Core Initialization ---
async function init() {
    setupUIListeners();
    loadParticles();
    setupBackgroundInteraction();
    
    // Load last city or default
    const savedCity = localStorage.getItem('last_city');
    if (savedCity && CONFIG.cities[savedCity]) {
        state.currentCity = CONFIG.cities[savedCity];
        updateCityUI(savedCity);
    } else {
        state.currentCity = CONFIG.cities[CONFIG.defaultCity];
        updateCityUI(CONFIG.defaultCity);
    }

    await refreshData();
    startMasterClock();
    
    // Hide loader with Apple-style delay
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => document.getElementById('loader').style.display = 'none', 800);
    }, 1500);
}

// --- API & Data Handling ---
async function refreshData() {
    try {
        // Always use coordinates for maximum accuracy
        const url = `${CONFIG.apiBase}/timings?latitude=${state.currentCity.lat}&longitude=${state.currentCity.lng}&method=${state.settings.method}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.code === 200) {
            state.prayerTimes = data.data.timings;
            state.hijriData = data.data.date.hijri;
            localStorage.setItem('cached_prayers', JSON.stringify(data.data));
            updateStaticUI();
            updatePrayerGrid();
        }
    } catch (error) {
        console.error("API Error, using cache...");
        const cached = JSON.parse(localStorage.getItem('cached_prayers'));
        if (cached) {
            state.prayerTimes = cached.timings;
            state.hijriData = cached.date.hijri;
            updateStaticUI();
            updatePrayerGrid();
        }
    }
}

// --- UI Updates ---
function updateStaticUI() {
    // Dates
    const now = new Date();
    document.getElementById('gregorian-date').textContent = now.toLocaleDateString('ar-YE', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
    
    if (state.hijriData) {
        document.getElementById('hijri-date').textContent = 
            `${state.hijriData.day} ${state.hijriData.month.ar} ${state.hijriData.year} هـ`;
    }

    // Location
    document.getElementById('current-location').textContent = state.currentCity.nameAr;
}

function updateCityUI(cityKey) {
    document.querySelectorAll('.city-pill').forEach(p => {
        p.classList.toggle('active', p.dataset.city === cityKey);
    });
}

function formatTime12h(timeStr) {
    if (!timeStr) return "--:--";
    let [hours, minutes] = timeStr.split(':').map(Number);
    const period = hours >= 12 ? 'م' : 'ص';
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

function updatePrayerGrid() {
    const grid = document.getElementById('prayer-list');
    const prayers = [
        { id: 'Fajr', name: 'الفجر', icon: 'fa-cloud-moon' },
        { id: 'Sunrise', name: 'الشروق', icon: 'fa-sun' },
        { id: 'Dhuhr', name: 'الظهر', icon: 'fa-sun-bright' },
        { id: 'Asr', name: 'العصر', icon: 'fa-cloud-sun' },
        { id: 'Maghrib', name: 'المغرب', icon: 'fa-moon' },
        { id: 'Isha', name: 'العشاء', icon: 'fa-stars' }
    ];

    grid.innerHTML = prayers.map(p => {
        const rawTime = applyAdj(state.prayerTimes[p.id], state.adjustments[p.id] || 0);
        const displayTime = formatTime12h(rawTime);
        return `
            <div class="prayer-card-luxury" id="card-${p.id}">
                <div class="p-info">
                    <div class="p-icon"><i class="fa-solid ${p.icon}"></i></div>
                    <span class="p-name">${p.name}</span>
                </div>
                <span class="p-time">${displayTime}</span>
            </div>
        `;
    }).join('');
}

// --- Logic & Calculations ---
function startMasterClock() {
    updateLogic();
    state.intervals.clock = setInterval(updateLogic, 1000);
}

function updateLogic() {
    if (!state.prayerTimes) return;

    const now = new Date();
    
    // Check for day change
    if (now.getDate() !== state.lastUpdatedDay) {
        state.lastUpdatedDay = now.getDate();
        refreshData();
        return;
    }

    const currentMin = now.getHours() * 60 + now.getMinutes();
    
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    let next = null;
    let prev = null;

    // Find current and next
    for (let i = 0; i < prayers.length; i++) {
        const pTime = timeToMin(applyAdj(state.prayerTimes[prayers[i]], state.adjustments[prayers[i]]));
        if (pTime > currentMin) {
            next = { id: prayers[i], min: pTime };
            const prevId = prayers[i === 0 ? prayers.length - 1 : i - 1];
            let prevMin = timeToMin(applyAdj(state.prayerTimes[prevId], state.adjustments[prevId]));
            if (i === 0) prevMin -= 24 * 60; // Previous was yesterday
            prev = { id: prevId, min: prevMin };
            break;
        }
    }

    if (!next) {
        next = { id: 'Fajr', min: timeToMin(applyAdj(state.prayerTimes.Fajr, state.adjustments.Fajr)) + 24 * 60 };
        prev = { id: 'Isha', min: timeToMin(applyAdj(state.prayerTimes.Isha, state.adjustments.Isha)) };
    }

    // Update Hero UI
    document.getElementById('next-prayer-name').textContent = getArName(next.id);
    document.getElementById('prev-prayer-label').textContent = getArName(prev.id);
    document.getElementById('next-prayer-label').textContent = getArName(next.id);

    // Countdown
    const diff = next.min - currentMin;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    const s = 59 - now.getSeconds();
    document.getElementById('countdown').textContent = 
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

    // Progress Bar (Actual duration calculation)
    const totalDuration = next.min - prev.min;
    const elapsed = currentMin - prev.min;
    const progress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
    document.getElementById('prayer-progress').style.width = `${progress}%`;

    // Active Card Highlight
    document.querySelectorAll('.prayer-card-luxury').forEach(c => c.classList.remove('active'));
    const currentId = prev.id;
    const activeCard = document.getElementById(`card-${currentId}`);
    if (activeCard) activeCard.classList.add('active');

    // Sun Orbit
    updateSunOrbit(currentMin);

    // Notification Check
    if (diff === 1 && s === 0) triggerNotification(next.id);
}

function updateSunOrbit(currentMin) {
    const sunrise = timeToMin(applyAdj(state.prayerTimes.Sunrise, 0)); // Adjustments for sunrise/sunset aren't in settings but could be
    const sunset = timeToMin(applyAdj(state.prayerTimes.Maghrib, state.adjustments.Maghrib));
    const orb = document.getElementById('sun-icon');

    if (currentMin >= sunrise && currentMin <= sunset) {
        const percent = (currentMin - sunrise) / (sunset - sunrise);
        const x = (percent * 100) - 50; // -50 to 50
        const y = -Math.sin(percent * Math.PI) * 50; // Curve
        orb.style.transform = `translate(${x * 3}px, ${y}px)`;
        orb.style.opacity = '1';
    } else {
        orb.style.opacity = '0';
    }
}

// --- Utilities ---
function timeToMin(t) {
    if (!t) return 0;
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
}

function applyAdj(time, mins) {
    if (!time) return "00:00";
    if (!mins) return time;
    const [h, m] = time.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m + mins);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

function getArName(id) {
    const names = { Fajr: 'الفجر', Sunrise: 'الشروق', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' };
    return names[id] || id;
}

// --- Interactions ---
function setupUIListeners() {
    // City Switching
    document.querySelectorAll('.city-pill').forEach(pill => {
        pill.onclick = async (e) => {
            const cityKey = pill.dataset.city;
            updateCityUI(cityKey);
            
            if (cityKey === 'custom') {
                handleGeolocation();
            } else {
                state.currentCity = CONFIG.cities[cityKey];
                localStorage.setItem('last_city', cityKey);
                document.getElementById('precise-area').textContent = '';
                await refreshData();
            }
        };
    });

    // Settings Modal
    const modal = document.getElementById('settings-modal');
    document.getElementById('settings-btn').onclick = () => {
        loadSettingsToUI();
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('open'), 10);
    };

    const closeModal = () => {
        modal.classList.remove('open');
        setTimeout(() => modal.style.display = 'none', 500);
    };

    document.querySelector('.close-modal').onclick = closeModal;
    document.querySelector('.modal-blur-bg').onclick = closeModal;

    document.getElementById('save-settings').onclick = () => {
        saveSettingsFromUI();
        closeModal();
        refreshData();
    };

    // Qibla Overlay
    const qiblaOverlay = document.getElementById('qibla-overlay');
    document.getElementById('qibla-btn').onclick = () => {
        qiblaOverlay.style.display = 'flex';
        updateQibla();
    };
    document.querySelector('.close-overlay').onclick = () => qiblaOverlay.style.display = 'none';

    // Dhikr
    document.getElementById('refresh-dhikr').onclick = shuffleDhikr;
    shuffleDhikr();

    // Notification Toggle Button
    const notifBtn = document.getElementById('notification-toggle');
    if (notifBtn) {
        notifBtn.onclick = () => {
            if (Notification.permission === 'default') {
                Notification.requestPermission().then(permission => {
                    updateNotifBtnUI(permission === 'granted');
                });
            } else {
                state.settings.notifications = !state.settings.notifications;
                localStorage.setItem('luxury_settings', JSON.stringify(state.settings));
                updateNotifBtnUI(state.settings.notifications);
            }
        };
        updateNotifBtnUI(state.settings.notifications && Notification.permission === 'granted');
    }
}

function updateNotifBtnUI(isEnabled) {
    const btn = document.getElementById('notification-toggle');
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (isEnabled) {
        icon.className = 'fa-solid fa-bell';
        btn.style.color = 'var(--accent-primary)';
    } else {
        icon.className = 'fa-solid fa-bell-slash';
        btn.style.color = 'var(--text-muted)';
    }
}

function handleGeolocation() {
    if (!navigator.geolocation) return alert("المتصفح لا يدعم تحديد الموقع");
    
    document.getElementById('current-location').textContent = "جاري التحديد...";
    navigator.geolocation.getCurrentPosition(async (pos) => {
        state.currentCity = {
            name: 'Custom',
            nameAr: 'موقعي الحالي',
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        };
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&accept-language=ar`);
            const d = await response.json();
            const area = d.address.city || d.address.town || d.address.village || d.address.suburb || "";
            document.getElementById('precise-area').textContent = area;
        } catch (e) {
            console.error("Geocoding error", e);
        }
        await refreshData();
    }, () => {
        alert("فشل تحديد الموقع، يرجى تفعيل الـ GPS");
        const adenPill = document.querySelector('[data-city="Aden"]');
        if (adenPill) adenPill.click();
    });
}

function updateQibla() {
    if (!state.currentCity) return;
    const lat1 = state.currentCity.lat * Math.PI / 180;
    const lng1 = state.currentCity.lng * Math.PI / 180;
    const lat2 = 21.4225 * Math.PI / 180;
    const lng2 = 39.8262 * Math.PI / 180;

    const y = Math.sin(lng2 - lng1);
    const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(lng2 - lng1);
    const qibla = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
    
    const arrow = document.getElementById('compass-arrow');
    if (arrow) arrow.style.transform = `rotate(${qibla}deg)`;
    const degEl = document.getElementById('qibla-deg');
    if (degEl) degEl.textContent = Math.round(qibla);
}

function shuffleDhikr() {
    const el = document.getElementById('daily-dhikr');
    if (!el) return;
    const random = CONFIG.adhkar[Math.floor(Math.random() * CONFIG.adhkar.length)];
    el.style.opacity = '0';
    setTimeout(() => {
        el.textContent = random;
        el.style.opacity = '1';
    }, 400);
}

// --- Settings Management ---
function loadSettingsToUI() {
    document.getElementById('calc-method').value = state.settings.method;
    document.getElementById('sound-toggle').checked = state.settings.sound;
    document.getElementById('vibrate-toggle').checked = state.settings.vibrate;
    
    ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].forEach(p => {
        const el = document.getElementById(`adj-${p}`);
        if (el) el.value = state.adjustments[p];
    });
}

function saveSettingsFromUI() {
    state.settings.method = parseInt(document.getElementById('calc-method').value);
    state.settings.sound = document.getElementById('sound-toggle').checked;
    state.settings.vibrate = document.getElementById('vibrate-toggle').checked;
    
    ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].forEach(p => {
        const el = document.getElementById(`adj-${p}`);
        if (el) state.adjustments[p] = parseInt(el.value) || 0;
    });

    localStorage.setItem('luxury_settings', JSON.stringify(state.settings));
    localStorage.setItem('luxury_adj', JSON.stringify(state.adjustments));
}

// --- Effects ---
function loadParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const colors = ['#38bdf8', '#818cf8', '#ffffff'];
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 5 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.background = color;
        p.style.boxShadow = `0 0 10px ${color}`;
        p.style.setProperty('--d', `${Math.random() * 15 + 10}s`);
        p.style.animationDelay = `${Math.random() * 20}s`;
        p.style.opacity = Math.random() * 0.3 + 0.1;
        container.appendChild(p);
    }
}

function setupBackgroundInteraction() {
    const bg = document.getElementById('dynamic-bg');
    if (!bg) return;
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        bg.style.setProperty('--x', `${x}%`);
        bg.style.setProperty('--y', `${y}%`);
    });

    window.addEventListener('touchmove', (e) => {
        const x = (e.touches[0].clientX / window.innerWidth) * 100;
        const y = (e.touches[0].clientY / window.innerHeight) * 100;
        bg.style.setProperty('--x', `${x}%`);
        bg.style.setProperty('--y', `${y}%`);
    });
}

function triggerNotification(prayerId) {
    if (state.settings.sound) {
        const audio = document.getElementById('notification-sound');
        if (audio) audio.play().catch(e => console.error("Audio play error", e));
    }
    if (state.settings.vibrate && navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }
    
    if (state.settings.notifications && Notification.permission === "granted") {
        new Notification("حان الآن وقت صلاة " + getArName(prayerId), {
            body: "حي على الصلاة، حي على الفلاح",
            icon: "https://cdn-icons-png.flaticon.com/512/2855/2855171.png"
        });
    }
}

// Register SW
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(e => console.error("SW Register error", e));
}

// Request Notification Permission
if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
}

init();
