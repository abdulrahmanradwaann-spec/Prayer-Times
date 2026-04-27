/**
 * Luxury Prayer Times Web App
 * Developer: Abdulrahman Radwan
 * Version: 2.0 (Luxury Edition)
 */

const CONFIG = {
    version: '2.0.0',
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
    ],
    fullAdhkar: {
        morning: [
            { text: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له", count: 1 },
            { text: "اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور", count: 1 },
            { text: "أستغفر الله وأتوب إليه", count: 100 },
            { text: "يا حي يا قيوم برحمتك أستغيث أصلح لي شأني كله ولا تكلني إلى نفسي طرفة عين", count: 1 }
        ],
        evening: [
            { text: "أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له", count: 1 },
            { text: "اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير", count: 1 },
            { text: "أمسيت أستغفر الله وأتوب إليه", count: 100 }
        ],
        after_prayer: [
            { text: "أستغفر الله", count: 3 },
            { text: "اللهم أنت السلام ومنك السلام، تباركت يا ذا الجلال والإكرام", count: 1 },
            { text: "سبحان الله", count: 33 },
            { text: "الحمد لله", count: 33 },
            { text: "الله أكبر", count: 33 }
        ]
    }
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
        notifications: true,
        notificationType: 'beep',
        preReminder: 0,
        lang: 'ar',
        focusMode: false,
        theme: 'dark'
    },
    lastUpdatedDay: new Date().getDate(),
    remindedPrayers: new Set(), // To avoid multiple reminders for the same prayer
    intervals: {
        countdown: null,
        clock: null
    }
};

const I18N = {
    ar: {
        next_prayer: "الصلاة القادمة",
        countdown_prefix: "بقي على",
        location_detecting: "جاري التحديد...",
        location_failed: "فشل تحديد الموقع",
        search_placeholder: "اكتب اسم المدينة هنا...",
        search_min_chars: "يرجى كتابة 3 أحرف على الأقل",
        no_results: "لم يتم العثور على نتائج",
        settings_title: "الإعدادات الفاخرة",
        calc_method: "طريقة الحساب",
        save_settings: "حفظ الإعدادات",
        qibla_title: "بوصلة القبلة",
        qibla_degree: "الدرجة",
        adhkar_title: "أذكار المسلم",
        morning: "الصباح",
        evening: "المساء",
        after_prayer: "بعد الصلاة",
        fajr: "الفجر",
        sunrise: "الشروق",
        dhuhr: "الظهر",
        asr: "العصر",
        maghrib: "المغرب",
        isha: "العشاء",
        tap: "تسبيح",
        ramadan_countdown: "بقي على رمضان",
        days: "أيام",
        current: "الآن",
        upcoming: "القادمة",
        update_available: "تحديث جديد متوفر!",
        update_desc: "قم بالتحديث للحصول على أفضل تجربة.",
        update_now: "تحديث الآن",
        update_later: "لاحقاً"
    },
    en: {
        next_prayer: "Next Prayer",
        countdown_prefix: "Time until",
        location_detecting: "Detecting...",
        location_failed: "Location failed",
        search_placeholder: "Type city name...",
        search_min_chars: "Type at least 3 characters",
        no_results: "No results found",
        settings_title: "Luxury Settings",
        calc_method: "Calculation Method",
        save_settings: "Save Settings",
        qibla_title: "Qibla Compass",
        qibla_degree: "Degree",
        adhkar_title: "Muslim Adhkar",
        morning: "Morning",
        evening: "Evening",
        after_prayer: "After Prayer",
        fajr: "Fajr",
        sunrise: "Sunrise",
        dhuhr: "Dhuhr",
        asr: "Asr",
        maghrib: "Maghrib",
        isha: "Isha",
        tap: "Tap",
        ramadan_countdown: "Ramadan starts in",
        days: "days",
        current: "Now",
        upcoming: "Next",
        update_available: "New version available!",
        update_desc: "Update now for the best experience.",
        update_now: "Update Now",
        update_later: "Later"
    }
};

// --- Core Initialization ---
async function init() {
    applyLanguage();
    applyTheme();
    setupUIListeners();
    loadParticles();
    setupBackgroundInteraction();
    
    // Load last city or default
    const savedCity = localStorage.getItem('last_city');
    
    // Set initial background immediately
    updateDynamicBackground(new Date().getHours());
    
    if (savedCity === 'custom') {
        const customLoc = JSON.parse(localStorage.getItem('custom_location'));
        if (customLoc) {
            state.currentCity = customLoc;
        } else {
            state.currentCity = CONFIG.cities[CONFIG.defaultCity];
        }
    } else if (savedCity && CONFIG.cities[savedCity]) {
        state.currentCity = CONFIG.cities[savedCity];
    } else {
        state.currentCity = CONFIG.cities[CONFIG.defaultCity];
    }

    await refreshData();
    startMasterClock();
    
    // Check for updates after a short delay
    setTimeout(checkForUpdates, 3000);
    
    // Hide loader with Apple-style delay
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => document.getElementById('loader').style.display = 'none', 800);
    }, 1500);
}

function applyLanguage() {
    const lang = state.settings.lang || 'ar';
    const t = I18N[lang];
    const isRtl = lang === 'ar';
    
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    
    // Header & Hero
    document.querySelector('.next-title').textContent = t.next_prayer;
    document.getElementById('location-search-input').placeholder = t.search_placeholder;
    
    // Settings
    document.querySelector('#settings-modal h2').textContent = t.settings_title;
    document.querySelector('#save-settings').textContent = t.save_settings;
    
    // Qibla
    document.querySelector('.qibla-content h3').textContent = t.qibla_title;
    document.querySelector('.qibla-degree').firstChild.textContent = t.qibla_degree + ": ";
    
    // Adhkar
    document.querySelector('#adhkar-modal h2').textContent = t.adhkar_title;
    document.querySelector('[data-category="morning"]').textContent = t.morning;
    document.querySelector('[data-category="evening"]').textContent = t.evening;
    document.querySelector('[data-category="after_prayer"]').textContent = t.after_prayer;
    
    // Tools
    document.querySelector('#qibla-btn span').textContent = t.qibla_title;
    document.querySelector('#dhikr-btn span').textContent = t.adhkar_title;

    // Update Toast (if visible)
    const updateMsg = document.getElementById('update-msg');
    if (updateMsg) {
        updateMsg.textContent = t.update_available;
        document.getElementById('update-now').textContent = t.update_now;
        document.getElementById('update-later').textContent = t.update_later;
    }

    // Refresh data to update date formatting and prayer names
    if (state.prayerTimes) {
        updateStaticUI();
        updatePrayerGrid();
    }
}

function applyTheme() {
    const isLight = state.settings.theme === 'light';
    document.body.classList.toggle('light-mode', isLight);
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    }
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

async function checkForUpdates() {
    try {
        const response = await fetch('version.json?t=' + Date.now());
        const data = await response.json();
        
        if (data.version !== CONFIG.version) {
            // Check if user already dismissed this version
            const dismissed = localStorage.getItem('dismissed_version');
            if (dismissed === data.version && !data.forceUpdate) return;

            showUpdateToast(data);
        }
    } catch (e) {
        console.log("Update check failed", e);
    }
}

function showUpdateToast(data) {
    const toast = document.getElementById('update-toast');
    const msg = document.getElementById('update-msg');
    const desc = document.getElementById('update-desc');
    const nowBtn = document.getElementById('update-now');
    const laterBtn = document.getElementById('update-later');
    
    const lang = state.settings.lang || 'ar';
    const t = I18N[lang];
    
    msg.textContent = t.update_available;
    desc.textContent = (data.changelog && data.changelog[lang]) ? data.changelog[lang] : t.update_desc;
    nowBtn.textContent = t.update_now;
    laterBtn.textContent = t.update_later;
    
    toast.style.display = 'block';
    setTimeout(() => toast.classList.add('show'), 100);

    // Auto-refresh after 60 seconds if ignored (optional but recommended feature)
    const autoRefreshTimeout = setTimeout(() => {
        if (toast.classList.contains('show')) {
            nowBtn.click();
        }
    }, 60000);
    
    nowBtn.onclick = () => {
        clearTimeout(autoRefreshTimeout);
        if (data.isSWUpdate && data.worker) {
            // Send skipWaiting to the waiting service worker
            data.worker.postMessage({ action: 'skipWaiting' });
        } else {
            // Legacy/JSON update check fallback
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(registrations => {
                    for (let registration of registrations) {
                        registration.unregister();
                    }
                    location.reload(true);
                });
            } else {
                location.reload(true);
            }
        }
    };
    
    laterBtn.onclick = () => {
        clearTimeout(autoRefreshTimeout);
        toast.classList.remove('show');
        if (data.version !== 'new') {
            localStorage.setItem('dismissed_version', data.version);
        }
        setTimeout(() => toast.style.display = 'none', 800);
    };
}

// --- UI Updates ---
function updateStaticUI() {
    // Dates
    const now = new Date();
    const lang = state.settings.lang || 'ar';
    const locale = lang === 'ar' ? 'ar-YE' : 'en-US';
    
    document.getElementById('gregorian-date').textContent = now.toLocaleDateString(locale, { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
    
    if (state.hijriData) {
        if (lang === 'ar') {
            document.getElementById('hijri-date').textContent = 
                `${state.hijriData.day} ${state.hijriData.month.ar} ${state.hijriData.year} هـ`;
        } else {
            document.getElementById('hijri-date').textContent = 
                `${state.hijriData.day} ${state.hijriData.month.en} ${state.hijriData.year} AH`;
        }
    }

    // Location
    document.getElementById('current-location').textContent = lang === 'ar' ? state.currentCity.nameAr : state.currentCity.name;

    // Ramadan Countdown
    updateRamadanCountdown();
}

function updateRamadanCountdown() {
    if (!state.hijriData) return;
    
    const ramadanEl = document.getElementById('ramadan-countdown');
    const textEl = document.getElementById('ramadan-text');
    const t = I18N[state.settings.lang || 'ar'];

    if (state.hijriData.month.number === 9) {
        ramadanEl.style.display = 'flex';
        textEl.textContent = state.settings.lang === 'ar' ? "رمضان مبارك!" : "Ramadan Mubarak!";
        return;
    }

    let monthsToRamadan = (9 - state.hijriData.month.number + 12) % 12;
    const daysRemainingInMonth = 30 - parseInt(state.hijriData.day);
    const totalDays = ((monthsToRamadan - 1) * 29.5) + daysRemainingInMonth;
    
    if (totalDays < 60) {
        ramadanEl.style.display = 'flex';
        textEl.textContent = `${t.ramadan_countdown}: ${Math.round(totalDays)} ${t.days}`;
    } else {
        ramadanEl.style.display = 'none';
    }
}

function formatTime12h(timeStr) {
    if (!timeStr) return "--:--";
    const lang = state.settings.lang || 'ar';
    let [hours, minutes] = timeStr.split(':').map(Number);
    const period = hours >= 12 ? (lang === 'ar' ? 'م' : 'PM') : (lang === 'ar' ? 'ص' : 'AM');
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

function updatePrayerGrid() {
    const grid = document.getElementById('prayer-list');
    const prayers = [
        { id: 'Fajr', icon: 'fa-cloud-moon' },
        { id: 'Sunrise', icon: 'fa-sun' },
        { id: 'Dhuhr', icon: 'fa-sun-bright' },
        { id: 'Asr', icon: 'fa-cloud-sun' },
        { id: 'Maghrib', icon: 'fa-moon' },
        { id: 'Isha', icon: 'fa-stars' }
    ];

    grid.innerHTML = prayers.map(p => {
        const rawTime = applyAdj(state.prayerTimes[p.id], state.adjustments[p.id] || 0);
        const displayTime = formatTime12h(rawTime);
        const name = getPrayerName(p.id);
        const lang = state.settings.lang || 'ar';
        const t = I18N[lang];
        
        return `
            <div class="prayer-card-luxury" id="card-${p.id}">
                <div class="p-info">
                    <div class="p-icon"><i class="fa-solid ${p.icon}"></i></div>
                    <div class="p-details">
                        <span class="p-name">${name}</span>
                        <span class="p-status" id="status-${p.id}">${t.upcoming}</span>
                    </div>
                </div>
                <div class="p-time-wrapper">
                    <span class="p-time">${displayTime}</span>
                </div>
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
    
    // Update Digital Clock
    const hours = now.getHours();
    const displayHours = hours % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const period = hours >= 12 ? (state.settings.lang === 'ar' ? 'م' : 'PM') : (state.settings.lang === 'ar' ? 'ص' : 'AM');
    
    const clockEl = document.getElementById('digital-clock');
    const periodEl = document.getElementById('time-period');
    if (clockEl) clockEl.textContent = `${displayHours}:${minutes}:${seconds}`;
    if (periodEl) periodEl.textContent = period;
    
    updateDynamicBackground(hours);
    
    // Check for day change
    if (now.getDate() !== state.lastUpdatedDay) {
        state.lastUpdatedDay = now.getDate();
        state.remindedPrayers.clear();
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
    document.getElementById('next-prayer-name').textContent = getPrayerName(next.id);

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

    // Active Card Highlight & Status Updates
    const lang = state.settings.lang || 'ar';
    const t = I18N[lang];
    
    document.querySelectorAll('.prayer-card-luxury').forEach(c => {
        c.classList.remove('active', 'upcoming');
        const id = c.id.replace('card-', '');
        const statusEl = document.getElementById(`status-${id}`);
        if (statusEl) {
            statusEl.textContent = ""; // Clear by default or set to a default state
            statusEl.style.display = 'none';
        }
    });

    const currentId = prev.id;
    const activeCard = document.getElementById(`card-${currentId}`);
    if (activeCard) {
        activeCard.classList.add('active');
        const statusEl = document.getElementById(`status-${currentId}`);
        if (statusEl) {
            statusEl.textContent = t.current;
            statusEl.style.display = 'block';
        }
    }

    const nextId = next.id;
    const upcomingCard = document.getElementById(`card-${nextId}`);
    if (upcomingCard && nextId !== currentId) {
        upcomingCard.classList.add('upcoming');
        const statusEl = document.getElementById(`status-${nextId}`);
        if (statusEl) {
            statusEl.textContent = t.upcoming;
            statusEl.style.display = 'block';
        }
    }

    // Notification Check
    if (diff === 0 && s === 0) {
        const prayerKey = `${next.id}_adhan_${state.lastUpdatedDay}`;
        if (!state.remindedPrayers.has(prayerKey)) {
            triggerNotification(next.id);
            state.remindedPrayers.add(prayerKey);
        }
    }

    // Pre-reminder Check
    if (state.settings.preReminder > 0 && diff === state.settings.preReminder && s === 0) {
        const reminderKey = `${next.id}_reminder_${state.lastUpdatedDay}`;
        if (!state.remindedPrayers.has(reminderKey)) {
            triggerPreReminder(next.id, state.settings.preReminder);
            state.remindedPrayers.add(reminderKey);
        }
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

function getPrayerName(id) {
    const lang = state.settings.lang || 'ar';
    const t = I18N[lang];
    const key = id.toLowerCase();
    return t[key] || id;
}

// --- Interactions ---
function setupUIListeners() {
    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.onclick = () => {
            state.settings.theme = state.settings.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('luxury_settings', JSON.stringify(state.settings));
            applyTheme();
        };
    }

    // Geolocation btn in Hero
    document.getElementById('geo-btn').onclick = handleGeolocation;

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
        closeSettingsModal();
        applyLanguage();
        refreshData();
    };

    // Qibla Overlay
    const qiblaOverlay = document.getElementById('qibla-overlay');
    document.getElementById('qibla-btn').onclick = () => {
        qiblaOverlay.style.display = 'flex';
        updateQibla();
    };
    document.querySelector('.close-overlay').onclick = () => qiblaOverlay.style.display = 'none';

    // Location Search Modal
    const locationModal = document.getElementById('location-modal');
    document.getElementById('location-search-btn').onclick = () => {
        locationModal.style.display = 'flex';
        setTimeout(() => locationModal.classList.add('open'), 10);
    };

    const closeLocationModal = () => {
        locationModal.classList.remove('open');
        setTimeout(() => locationModal.style.display = 'none', 500);
    };

    document.querySelector('.close-location-modal').onclick = closeLocationModal;
    document.getElementById('execute-search').onclick = performLocationSearch;
    document.getElementById('location-search-input').onkeypress = (e) => {
        if (e.key === 'Enter') performLocationSearch();
    };

    // Adhkar Modal
    const adhkarModal = document.getElementById('adhkar-modal');
    document.getElementById('dhikr-btn').onclick = () => {
        adhkarModal.style.display = 'flex';
        setTimeout(() => adhkarModal.classList.add('open'), 10);
        renderAdhkar('morning');
    };

    const closeAdhkarModal = () => {
        adhkarModal.classList.remove('open');
        setTimeout(() => adhkarModal.style.display = 'none', 500);
    };

    document.querySelector('.close-adhkar-modal').onclick = closeAdhkarModal;

    document.querySelectorAll('.adhkar-tab').forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll('.adhkar-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderAdhkar(tab.dataset.category);
        };
    });

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
        localStorage.setItem('last_city', 'custom');
        localStorage.setItem('custom_location', JSON.stringify(state.currentCity));
        
        // Reverse Geocoding for area name
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&accept-language=ar`);
            const d = await response.json();
            const area = d.address.city || d.address.town || d.address.village || d.address.suburb || "";
            document.getElementById('precise-area').textContent = area ? `- ${area}` : "";
            if (area) {
                state.currentCity.nameAr = area;
                localStorage.setItem('custom_location', JSON.stringify(state.currentCity));
            }
        } catch (e) {
            console.error("Geocoding error", e);
        }
        await refreshData();
    }, () => {
        alert("فشل تحديد الموقع، يرجى تفعيل الـ GPS");
    });
}

async function performLocationSearch() {
    const query = document.getElementById('location-search-input').value.trim();
    if (query.length < 3) return alert("يرجى كتابة 3 أحرف على الأقل");

    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '<div class="loader-bar-container"><div class="loader-bar"></div></div>';

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1&accept-language=ar`);
        const data = await response.json();
        
        if (data.length === 0) {
            resultsContainer.innerHTML = '<p class="text-center">لم يتم العثور على نتائج</p>';
            return;
        }

        resultsContainer.innerHTML = data.map(item => `
            <div class="search-result-item" onclick="selectSearchedLocation(${item.lat}, ${item.lon}, '${item.display_name}')">
                <div class="result-info">
                    <span class="city-name">${item.address.city || item.address.town || item.address.state || item.display_name.split(',')[0]}</span>
                    <span class="country-name">${item.address.country}</span>
                </div>
                <i class="fa-solid fa-chevron-left"></i>
            </div>
        `).join('');
    } catch (error) {
        console.error("Search error", error);
        resultsContainer.innerHTML = '<p class="text-center">حدث خطأ أثناء البحث</p>';
    }
}

async function selectSearchedLocation(lat, lon, displayName) {
    const nameAr = displayName.split(',')[0];
    state.currentCity = {
        name: 'Custom',
        nameAr: nameAr,
        lat: parseFloat(lat),
        lng: parseFloat(lon)
    };
    
    localStorage.setItem('last_city', 'custom');
    localStorage.setItem('custom_location', JSON.stringify(state.currentCity));
    
    document.getElementById('precise-area').textContent = displayName.split(',').slice(1).join(',').trim();
    
    const modal = document.getElementById('location-modal');
    modal.classList.remove('open');
    setTimeout(() => modal.style.display = 'none', 500);
    
    await refreshData();
}

function updateQibla() {
    if (!state.currentCity) return;
    const lat1 = state.currentCity.lat * Math.PI / 180;
    const lng1 = state.currentCity.lng * Math.PI / 180;
    const lat2 = 21.4225 * Math.PI / 180;
    const lng2 = 39.8262 * Math.PI / 180;

    const y = Math.sin(lng2 - lng1);
    const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(lng2 - lng1);
    let qibla = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
    state.qiblaAngle = qibla;
    
    const degEl = document.getElementById('qibla-deg');
    if (degEl) degEl.textContent = Math.round(qibla);

    startCompass();
}

function startCompass() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isIOS && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                if (response === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation);
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener('deviceorientationabsolute', handleOrientation);
        window.addEventListener('deviceorientation', handleOrientation);
    }
}

function handleOrientation(event) {
    let heading = event.webkitCompassHeading || event.alpha;
    if (typeof heading === 'undefined') return;

    // Adjust for deviceorientation (alpha is 0 to 360 counter-clockwise)
    if (!event.webkitCompassHeading) {
        heading = 360 - heading;
    }

    const qibla = state.qiblaAngle || 0;
    const arrow = document.getElementById('compass-arrow');
    const dial = document.querySelector('.compass-dial');
    
    if (arrow) {
        // Rotate the arrow to point to Qibla relative to North
        arrow.style.transform = `translate(-50%, 0) rotate(${qibla}deg)`;
    }
    
    if (dial) {
        // Rotate the dial to align North with real North
        dial.style.transform = `rotate(${-heading}deg)`;
    }
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

function renderAdhkar(category) {
    const list = document.getElementById('adhkar-list');
    const items = CONFIG.fullAdhkar[category];
    
    list.innerHTML = items.map((item, index) => `
        <div class="dhikr-card" id="dhikr-${category}-${index}">
            <p class="dhikr-text">${item.text}</p>
            <div class="dhikr-footer">
                <div class="dhikr-count" id="count-${category}-${index}">${item.count}</div>
                <button class="dhikr-btn-tap" onclick="updateDhikrCount('${category}', ${index})">تسبيح</button>
            </div>
        </div>
    `).join('');
}

function updateDhikrCount(category, index) {
    const countEl = document.getElementById(`count-${category}-${index}`);
    const cardEl = document.getElementById(`dhikr-${category}-${index}`);
    let currentCount = parseInt(countEl.textContent);
    
    if (currentCount > 0) {
        currentCount--;
        countEl.textContent = currentCount;
        
        if (currentCount === 0) {
            cardEl.classList.add('completed');
            if (navigator.vibrate) navigator.vibrate(100);
        } else {
            if (navigator.vibrate) navigator.vibrate(50);
        }
    }
}

// --- Settings Management ---
function loadSettingsToUI() {
    const s = state.settings;
    document.getElementById('language-switch').value = s.lang || 'ar';
    document.getElementById('calc-method').value = s.method;
    document.getElementById('sound-toggle').checked = s.sound;
    document.getElementById('vibrate-toggle').checked = s.vibrate;
    document.getElementById('focus-mode').checked = s.focusMode || false;
    document.getElementById('notification-type').value = s.notificationType || 'beep';
    document.getElementById('pre-reminder').value = s.preReminder || 0;
    
    ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].forEach(p => {
        const el = document.getElementById(`adj-${p}`);
        if (el) el.value = state.adjustments[p];
    });
}

function saveSettingsFromUI() {
    state.settings.lang = document.getElementById('language-switch').value;
    state.settings.method = parseInt(document.getElementById('calc-method').value);
    state.settings.sound = document.getElementById('sound-toggle').checked;
    state.settings.vibrate = document.getElementById('vibrate-toggle').checked;
    state.settings.focusMode = document.getElementById('focus-mode').checked;
    state.settings.notificationType = document.getElementById('notification-type').value;
    state.settings.preReminder = parseInt(document.getElementById('pre-reminder').value);
    
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

function updateDynamicBackground(hours) {
    const bg = document.getElementById('dynamic-bg');
    if (!bg) return;

    let bgClass = 'bg-night';
    if (hours >= 5 && hours < 8) bgClass = 'bg-dawn';
    else if (hours >= 8 && hours < 17) bgClass = 'bg-day';
    else if (hours >= 17 && hours < 19) bgClass = 'bg-sunset';
    else bgClass = 'bg-night';

    if (!bg.classList.contains(bgClass)) {
        // Remove all background classes
        bg.classList.remove('bg-dawn', 'bg-day', 'bg-sunset', 'bg-night');
        bg.classList.add(bgClass);
    }
}

function setupBackgroundInteraction() {
    const bg = document.getElementById('dynamic-bg');
    if (!bg) return;

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        bg.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
    });

    window.addEventListener('touchmove', (e) => {
        const x = (e.touches[0].clientX / window.innerWidth - 0.5) * 20;
        const y = (e.touches[0].clientY / window.innerHeight - 0.5) * 20;
        bg.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
    });
}

function triggerNotification(prayerId) {
    if (state.settings.focusMode) {
        // If focus mode is on, we skip sound/vibration for a while after the prayer starts
        // but we can still show the notification
        console.log("Focus mode active, skipping sound/vibration");
    }

    if (state.settings.sound && state.settings.notificationType !== 'silent' && !state.settings.focusMode) {
        const soundId = state.settings.notificationType === 'adhan' ? 'adhan-sound' : 'beep-sound';
        const audio = document.getElementById(soundId);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.error("Audio play error", e));
        }
    }
    if (state.settings.vibrate && navigator.vibrate && !state.settings.focusMode) {
        navigator.vibrate([200, 100, 200]);
    }
    
    if (state.settings.notifications && Notification.permission === "granted") {
        const title = state.settings.lang === 'ar' ? "حان الآن وقت صلاة " + getPrayerName(prayerId) : "It's time for " + getPrayerName(prayerId);
        const body = state.settings.lang === 'ar' ? "حي على الصلاة، حي على الفلاح" : "Come to prayer, come to success";
        new Notification(title, {
            body: body,
            icon: "https://cdn-icons-png.flaticon.com/512/2855/2855171.png"
        });
    }
}

function triggerPreReminder(prayerId, mins) {
    if (state.settings.sound && state.settings.notificationType !== 'silent') {
        const audio = document.getElementById('beep-sound');
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.error("Audio play error", e));
        }
    }
    
    if (state.settings.notifications && Notification.permission === "granted") {
        const title = state.settings.lang === 'ar' ? "تذكير بقرب الصلاة" : "Prayer Reminder";
        const body = state.settings.lang === 'ar' ? `بقي ${mins} دقائق على صلاة ${getPrayerName(prayerId)}` : `${mins} minutes left until ${getPrayerName(prayerId)}`;
        new Notification(title, {
            body: body,
            icon: "https://cdn-icons-png.flaticon.com/512/2855/2855171.png"
        });
    }
}

// Register SW with Update Detection Logic
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(registration => {
            console.log('SW registered:', registration);

            // Listen for updates
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (installingWorker == null) return;

                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // New update available
                            console.log('New content is available; please refresh.');
                            showUpdateToast({ 
                                version: 'new', 
                                changelog: { 
                                    ar: 'تحديث جديد متوفر لتحسين الأداء وتجربة المستخدم.', 
                                    en: 'A new update is available for better performance.' 
                                },
                                isSWUpdate: true,
                                worker: installingWorker
                            });
                        }
                    }
                };
            };
        }).catch(e => console.error("SW Register error", e));

        // Reload the page when the new service worker takes over
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (refreshing) return;
            refreshing = true;
            window.location.reload();
        });
    });
}

// Request Notification Permission
if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
}

init();
