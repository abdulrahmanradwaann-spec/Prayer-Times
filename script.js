const cities = {
    Aden: { name: 'Aden', nameAr: 'عدن', lat: 12.7855, lng: 45.0187 },
    Taiz: { name: 'Taiz', nameAr: 'تعز', lat: 13.5795, lng: 44.0209 }
};

let currentCity = cities.Aden;
let prayerTimes = null;
let countdownInterval = null;
let adjustments = JSON.parse(localStorage.getItem('prayerAdjustments')) || {
    Fajr: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0
};

// Elements
const gregDateEl = document.getElementById('gregorian-date');
const hijriDateEl = document.getElementById('hijri-date');
const citySelect = document.getElementById('city-select');
const geoBtn = document.getElementById('geo-btn');
const locationNameEl = document.getElementById('current-location');
const preciseAreaEl = document.getElementById('precise-area');
const nextPrayerNameEl = document.getElementById('next-prayer-name');
const countdownEl = document.getElementById('countdown');
const progressBar = document.getElementById('prayer-progress');
const sunIcon = document.getElementById('sun-icon');
const dynamicBg = document.getElementById('dynamic-bg');

// Modal Elements
const modal = document.getElementById('settings-modal');
const settingsBtn = document.getElementById('settings-btn');
const closeBtn = document.querySelector('.close');
const saveSettingsBtn = document.getElementById('save-settings');

const adhkar = [
    "سبحان الله وبحمده، سبحان الله العظيم",
    "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
    "اللهم صلِ وسلم على نبينا محمد",
    "أستغفر الله وأتوب إليه",
    "لا حول ولا قوة إلا بالله العلي العظيم",
    "أرحنا بها يا بلال..",
    "يا حي يا قيوم برحمتك أستغيث"
];

async function init() {
    setupEventListeners();
    updateDates();
    loadAdjustmentsToUI();
    createParticles();
    updateDhikr();
    await loadPrayerTimes();
    updateBackground();
    startCountdown();
}

function setupEventListeners() {
    citySelect.addEventListener('change', (e) => {
        if (e.target.value !== 'custom') {
            currentCity = cities[e.target.value];
            preciseAreaEl.textContent = '';
            loadPrayerTimes();
        }
    });

    geoBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            locationNameEl.textContent = 'جاري التحديد...';
            navigator.geolocation.getCurrentPosition(async (position) => {
                currentCity = {
                    name: 'Custom',
                    nameAr: 'موقعي الحالي',
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                citySelect.value = 'custom';
                await getPreciseLocation(position.coords.latitude, position.coords.longitude);
                await loadPrayerTimes();
            }, (error) => {
                alert('عذراً، فشل تحديد الموقع. تأكد من تفعيل الـ GPS.');
                locationNameEl.textContent = 'فشل التحديد';
            });
        }
    });

    // Modal Logic
    settingsBtn.onclick = () => modal.style.display = 'block';
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

    saveSettingsBtn.onclick = () => {
        ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].forEach(p => {
            adjustments[p] = parseInt(document.getElementById(`adj-${p}`).value) || 0;
        });
        localStorage.setItem('prayerAdjustments', JSON.stringify(adjustments));
        modal.style.display = 'none';
        updateUI();
    };

    document.getElementById('qibla-btn').onclick = () => {
        const section = document.getElementById('qibla-section');
        section.style.display = section.style.display === 'none' ? 'block' : 'none';
        updateQibla();
    };

    document.getElementById('next-dhikr').onclick = updateDhikr;
}

async function getPreciseLocation(lat, lng) {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar`);
        const data = await res.json();
        if (data.address) {
            const area = data.address.suburb || data.address.neighbourhood || data.address.city_district || '';
            preciseAreaEl.textContent = area ? `منطقة: ${area}` : '';
        }
    } catch (e) { console.error('Reverse geocoding error', e); }
}

async function loadPrayerTimes() {
    locationNameEl.textContent = `${currentCity.nameAr}، اليمن`;
    
    try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByAddress?address=${currentCity.name},Yemen&method=5`);
        const data = await response.json();
        
        if (data.code === 200) {
            prayerTimes = data.data.timings;
            hijriDateEl.textContent = `${data.data.date.hijri.day} ${data.data.date.hijri.month.ar} ${data.data.date.hijri.year} هـ`;
            updateUI();
            localStorage.setItem('prayerData', JSON.stringify(data.data));
        }
    } catch (error) {
        const cached = localStorage.getItem('prayerData');
        if (cached) {
            prayerTimes = JSON.parse(cached).timings;
            updateUI();
        }
    }
}

function applyAdjustments(timeStr, adjMinutes) {
    if (!adjMinutes) return timeStr;
    const [h, m] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m + adjMinutes, 0);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.width = p.style.height = Math.random() * 5 + 2 + 'px';
        p.style.animationDelay = Math.random() * 20 + 's';
        container.appendChild(p);
    }
}

function updateDhikr() {
    const el = document.getElementById('daily-dhikr');
    const random = adhkar[Math.floor(Math.random() * adhkar.length)];
    el.style.opacity = 0;
    setTimeout(() => {
        el.textContent = random;
        el.style.opacity = 1;
    }, 300);
}

function updateBackground() {
    if (!prayerTimes) return;
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    dynamicBg.className = 'dynamic-bg';
    
    const times = {
        fajr: timeToMin(prayerTimes.Fajr),
        dhuhr: timeToMin(prayerTimes.Dhuhr),
        asr: timeToMin(prayerTimes.Asr),
        maghrib: timeToMin(prayerTimes.Maghrib),
        isha: timeToMin(prayerTimes.Isha)
    };

    if (currentTime >= times.fajr && currentTime < times.dhuhr) dynamicBg.classList.add('bg-fajr');
    else if (currentTime >= times.dhuhr && currentTime < times.asr) dynamicBg.classList.add('bg-dhuhr');
    else if (currentTime >= times.asr && currentTime < times.maghrib) dynamicBg.classList.add('bg-asr');
    else if (currentTime >= times.maghrib && currentTime < times.isha) dynamicBg.classList.add('bg-maghrib');
    else dynamicBg.classList.add('bg-isha');
}

function timeToMin(t) {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
}

function updateQibla() {
    // Kaaba coordinates: 21.4225, 39.8262
    const lat1 = currentCity.lat * Math.PI / 180;
    const lng1 = currentCity.lng * Math.PI / 180;
    const lat2 = 21.4225 * Math.PI / 180;
    const lng2 = 39.8262 * Math.PI / 180;

    const y = Math.sin(lng2 - lng1);
    const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(lng2 - lng1);
    let qibla = Math.atan2(y, x) * 180 / Math.PI;
    
    document.getElementById('compass-arrow').style.transform = `rotate(${qibla}deg)`;
}

function updateUI() {
    if (!prayerTimes) return;

    const grid = document.querySelector('.prayer-times-grid');
    grid.innerHTML = ''; // Clear and rebuild with effects

    const prayers = [
        { id: 'Fajr', nameAr: 'الفجر', icon: 'cloud-moon' },
        { id: 'Sunrise', nameAr: 'الشروق', icon: 'sun' },
        { id: 'Dhuhr', nameAr: 'الظهر', icon: 'certificate' },
        { id: 'Asr', nameAr: 'العصر', icon: 'cloud-sun' },
        { id: 'Maghrib', nameAr: 'المغرب', icon: 'moon' },
        { id: 'Isha', nameAr: 'العشاء', icon: 'star-and-crescent' }
    ];

    prayers.forEach(p => {
        const adjTime = applyAdjustments(prayerTimes[p.id], adjustments[p.id] || 0);
        const card = document.createElement('div');
        card.className = 'prayer-card glass';
        card.setAttribute('data-prayer', p.id);
        card.innerHTML = `
            <div class="card-content">
                <div class="icon"><i class="fas fa-${p.icon}"></i></div>
                <span class="name">${p.nameAr}</span>
            </div>
            <span class="time">${formatTime(adjTime)}</span>
        `;
        grid.appendChild(card);
    });

    highlightCurrentPrayer();
    updateBackground();
}

function formatTime(time24) {
    const [hours, minutes] = time24.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function highlightCurrentPrayer() {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    let currentId = 'Isha';
    
    const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    document.querySelectorAll('.prayer-card').forEach(c => c.classList.remove('active'));

    for (let id of prayers) {
        const adjTime = applyAdjustments(prayerTimes[id], adjustments[id] || 0);
        const [h, m] = adjTime.split(':').map(Number);
        if (currentTime >= (h * 60 + m)) currentId = id;
    }

    const activeCard = document.querySelector(`.prayer-card[data-prayer="${currentId}"]`);
    if (activeCard) activeCard.classList.add('active');
}

function startCountdown() {
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        if (!prayerTimes) return;
        const now = new Date();
        const next = getNextPrayer();
        const current = getCurrentPrayer();
        
        nextPrayerNameEl.textContent = next.nameAr;
        const totalDuration = next.time - current.time;
        const elapsed = now - current.time;
        const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
        
        progressBar.style.width = `${progress}%`;
        updateSunPosition(progress);

        const diff = next.time - now;
        if (diff <= 0) { loadPrayerTimes(); return; }

        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        countdownEl.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }, 1000);
}

function updateSunPosition(progress) {
    const angle = (progress / 100) * Math.PI;
    const x = 50 + 50 * Math.cos(angle + Math.PI);
    const y = 50 + 50 * Math.sin(angle + Math.PI);
    sunIcon.style.left = `${x}%`;
    sunIcon.style.top = `${y}%`;
}

function getNextPrayer() {
    const now = new Date();
    const prayers = [
        { nameAr: 'الفجر', id: 'Fajr' },
        { nameAr: 'الشروق', id: 'Sunrise' },
        { nameAr: 'الظهر', id: 'Dhuhr' },
        { nameAr: 'العصر', id: 'Asr' },
        { nameAr: 'المغرب', id: 'Maghrib' },
        { nameAr: 'العشاء', id: 'Isha' }
    ];

    for (let p of prayers) {
        const adjTime = applyAdjustments(prayerTimes[p.id], adjustments[p.id] || 0);
        const [h, m] = adjTime.split(':').map(Number);
        const pDate = new Date();
        pDate.setHours(h, m, 0, 0);
        if (pDate > now) return { ...p, time: pDate };
    }

    const firstAdj = applyAdjustments(prayerTimes.Fajr, adjustments.Fajr || 0);
    const [h, m] = firstAdj.split(':').map(Number);
    const pDate = new Date();
    pDate.setDate(pDate.getDate() + 1);
    pDate.setHours(h, m, 0, 0);
    return { ...prayers[0], time: pDate };
}

function getCurrentPrayer() {
    const now = new Date();
    const prayers = ['Isha', 'Maghrib', 'Asr', 'Dhuhr', 'Sunrise', 'Fajr'];
    for (let id of prayers) {
        const adjTime = applyAdjustments(prayerTimes[id], adjustments[id] || 0);
        const [h, m] = adjTime.split(':').map(Number);
        const pDate = new Date();
        pDate.setHours(h, m, 0, 0);
        if (pDate <= now) return { id, time: pDate };
    }
    const lastAdj = applyAdjustments(prayerTimes.Isha, adjustments.Isha || 0);
    const [h, m] = lastAdj.split(':').map(Number);
    const pDate = new Date();
    pDate.setDate(pDate.getDate() - 1);
    pDate.setHours(h, m, 0, 0);
    return { id: 'Isha', time: pDate };
}

function updateDates() {
    const now = new Date();
    gregDateEl.textContent = now.toLocaleDateString('ar-YE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function loadAdjustmentsToUI() {
    Object.keys(adjustments).forEach(p => {
        const input = document.getElementById(`adj-${p}`);
        if (input) input.value = adjustments[p];
    });
}

init();
