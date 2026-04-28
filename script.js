/**
 * Luxury Prayer Times Web App
 * Developer: Abdulrahman Radwan
 * Version: 2.0 (Luxury Edition)
 */

const CONFIG = {
    version: '2.0.0',
    ipGeoApi: 'https://ipapi.co/json/',
    apiBase: 'http://api.aladhan.com/v1',
    defaultCity: 'Mecca',
    calcMethods: {
        0: 'Shia Ithna Asheri',
        1: 'University of Islamic Sciences, Karachi',
        2: 'Islamic Society of North America',
        3: 'Muslim World League',
        4: 'Umm Al-Qura University, Makkah',
        5: 'Egyptian General Authority',
        7: 'Institute of Geophysics, University of Tehran',
        8: 'Gulf Region',
        9: 'Kuwait',
        10: 'Qatar',
        11: 'Majlis Ugama Islam Singapura',
        12: 'Union Organization Islamic de France',
        13: 'Diyanet İşleri Başkanlığı, Turkey',
        14: 'Spiritual Administration of Muslims of Russia',
        15: 'Moonsighting Committee Worldwide',
        16: 'Dubai',
        17: 'Jabatan Kemajuan Islam Malaysia',
        18: 'Civil Aviation Authority, Qatar',
        19: 'General Authority of Islamic Affairs, Egypt'
    },
    regionalMethods: {
        'Saudi Arabia': 4, 'السعودية': 4,
        'UAE': 16, 'الإمارات': 16,
        'Dubai': 16, 'دبي': 16,
        'Egypt': 5, 'مصر': 5,
        'Malaysia': 17, 'ماليزيا': 17,
        'Singapore': 11, 'سنغافورة': 11,
        'Turkey': 13, 'تركيا': 13,
        'Russia': 14, 'روسيا': 14,
        'Qatar': 18, 'قطر': 18,
        'Kuwait': 9, 'الكويت': 9,
        'France': 12, 'فرنسا': 12
    },
    cities: {
        // Yemen
        Aden: { name: 'Aden', nameAr: 'عدن', lat: 12.7855, lng: 45.0187, country: 'Yemen', countryAr: 'اليمن', timezone: 'Asia/Aden' },
        Taiz: { name: 'Taiz', nameAr: 'تعز', lat: 13.5795, lng: 44.0209, country: 'Yemen', countryAr: 'اليمن', timezone: 'Asia/Aden' },
        Sanaa: { name: 'Sanaa', nameAr: 'صنعاء', lat: 15.3694, lng: 44.1910, country: 'Yemen', countryAr: 'اليمن', timezone: 'Asia/Aden' },
        // Saudi Arabia
        Mecca: { name: 'Mecca', nameAr: 'مكة المكرمة', lat: 21.4225, lng: 39.8262, country: 'Saudi Arabia', countryAr: 'السعودية', timezone: 'Asia/Riyadh' },
        Medina: { name: 'Medina', nameAr: 'المدينة المنورة', lat: 24.5247, lng: 39.5692, country: 'Saudi Arabia', countryAr: 'السعودية', timezone: 'Asia/Riyadh' },
        Riyadh: { name: 'Riyadh', nameAr: 'الرياض', lat: 24.7136, lng: 46.6753, country: 'Saudi Arabia', countryAr: 'السعودية', timezone: 'Asia/Riyadh' },
        Jeddah: { name: 'Jeddah', nameAr: 'جدة', lat: 21.4858, lng: 39.1925, country: 'Saudi Arabia', countryAr: 'السعودية', timezone: 'Asia/Riyadh' },
        // UAE
        Dubai: { name: 'Dubai', nameAr: 'دبي', lat: 25.2048, lng: 55.2708, country: 'UAE', countryAr: 'الإمارات', timezone: 'Asia/Dubai' },
        AbuDhabi: { name: 'Abu Dhabi', nameAr: 'أبوظبي', lat: 24.4539, lng: 54.3773, country: 'UAE', countryAr: 'الإمارات', timezone: 'Asia/Dubai' },
        Sharjah: { name: 'Sharjah', nameAr: 'الشارقة', lat: 25.3463, lng: 55.4209, country: 'UAE', countryAr: 'الإمارات', timezone: 'Asia/Dubai' },
        // Egypt
        Cairo: { name: 'Cairo', nameAr: 'القاهرة', lat: 30.0444, lng: 31.2357, country: 'Egypt', countryAr: 'مصر', timezone: 'Africa/Cairo' },
        Alexandria: { name: 'Alexandria', nameAr: 'الإسكندرية', lat: 31.2001, lng: 29.9187, country: 'Egypt', countryAr: 'مصر', timezone: 'Africa/Cairo' },
        Giza: { name: 'Giza', nameAr: 'الجيزة', lat: 30.0131, lng: 31.2089, country: 'Egypt', countryAr: 'مصر', timezone: 'Africa/Cairo' },
        // Jordan
        Amman: { name: 'Amman', nameAr: 'عمان', lat: 31.9454, lng: 35.9284, country: 'Jordan', countryAr: 'الأردن', timezone: 'Asia/Amman' },
        // Lebanon
        Beirut: { name: 'Beirut', nameAr: 'بيروت', lat: 33.8938, lng: 35.5018, country: 'Lebanon', countryAr: 'لبنان', timezone: 'Asia/Beirut' },
        // Syria
        Damascus: { name: 'Damascus', nameAr: 'دمشق', lat: 33.5138, lng: 36.2765, country: 'Syria', countryAr: 'سوريا', timezone: 'Asia/Damascus' },
        // Iraq
        Baghdad: { name: 'Baghdad', nameAr: 'بغداد', lat: 33.3152, lng: 44.3661, country: 'Iraq', countryAr: 'العراق', timezone: 'Asia/Baghdad' },
        Basra: { name: 'Basra', nameAr: 'البصرة', lat: 30.5085, lng: 47.7804, country: 'Iraq', countryAr: 'العراق', timezone: 'Asia/Baghdad' },
        Mosul: { name: 'Mosul', nameAr: 'الموصل', lat: 36.3446, lng: 43.1262, country: 'Iraq', countryAr: 'العراق', timezone: 'Asia/Baghdad' },
        // Kuwait
        KuwaitCity: { name: 'Kuwait City', nameAr: 'الكويت', lat: 29.3759, lng: 47.9774, country: 'Kuwait', countryAr: 'الكويت', timezone: 'Asia/Kuwait' },
        // Qatar
        Doha: { name: 'Doha', nameAr: 'الدوحة', lat: 25.2854, lng: 51.5310, country: 'Qatar', countryAr: 'قطر', timezone: 'Asia/Qatar' },
        // Bahrain
        Manama: { name: 'Manama', nameAr: 'المنامة', lat: 26.2285, lng: 50.5860, country: 'Bahrain', countryAr: 'البحرين', timezone: 'Asia/Bahrain' },
        // Oman
        Muscat: { name: 'Muscat', nameAr: 'مسقط', lat: 23.5880, lng: 58.3829, country: 'Oman', countryAr: 'عُمان', timezone: 'Asia/Muscat' },
        // Palestine
        Jerusalem: { name: 'Jerusalem', nameAr: 'القدس', lat: 31.7683, lng: 35.2137, country: 'Palestine', countryAr: 'فلسطين', timezone: 'Asia/Hebron' },
        Gaza: { name: 'Gaza', nameAr: 'غزة', lat: 31.3547, lng: 34.3088, country: 'Palestine', countryAr: 'فلسطين', timezone: 'Asia/Gaza' },
        // Morocco
        Casablanca: { name: 'Casablanca', nameAr: 'الدار البيضاء', lat: 33.5731, lng: -7.5898, country: 'Morocco', countryAr: 'المغرب', timezone: 'Africa/Casablanca' },
        Rabat: { name: 'Rabat', nameAr: 'الرباط', lat: 34.0209, lng: -6.8416, country: 'Morocco', countryAr: 'المغرب', timezone: 'Africa/Casablanca' },
        Marrakech: { name: 'Marrakech', nameAr: 'مراكش', lat: 31.6295, lng: -7.9811, country: 'Morocco', countryAr: 'المغرب', timezone: 'Africa/Casablanca' },
        Fes: { name: 'Fes', nameAr: 'فاس', lat: 34.0181, lng: -5.0078, country: 'Morocco', countryAr: 'المغرب', timezone: 'Africa/Casablanca' },
        // Algeria
        Algiers: { name: 'Algiers', nameAr: 'الجزائر', lat: 36.7538, lng: 3.0588, country: 'Algeria', countryAr: 'الجزائر', timezone: 'Africa/Algiers' },
        Oran: { name: 'Oran', nameAr: 'وهران', lat: 35.6969, lng: -0.6331, country: 'Algeria', countryAr: 'الجزائر', timezone: 'Africa/Algiers' },
        Constantine: { name: 'Constantine', nameAr: 'قسنطينة', lat: 36.3650, lng: 6.6147, country: 'Algeria', countryAr: 'الجزائر', timezone: 'Africa/Algiers' },
        // Tunisia
        Tunis: { name: 'Tunis', nameAr: 'تونس', lat: 36.8065, lng: 10.1815, country: 'Tunisia', countryAr: 'تونس', timezone: 'Africa/Tunis' },
        Sfax: { name: 'Sfax', nameAr: 'صفاقس', lat: 34.7396, lng: 10.7600, country: 'Tunisia', countryAr: 'تونس', timezone: 'Africa/Tunis' },
        // Libya
        Tripoli: { name: 'Tripoli', nameAr: 'طرابلس', lat: 32.8872, lng: 13.1913, country: 'Libya', countryAr: 'ليبيا', timezone: 'Africa/Tripoli' },
        Benghazi: { name: 'Benghazi', nameAr: 'بنغازي', lat: 32.8872, lng: 22.0639, country: 'Libya', countryAr: 'ليبيا', timezone: 'Africa/Tripoli' },
        // Mauritania
        Nouakchott: { name: 'Nouakchott', nameAr: 'نواكشوط', lat: 18.0735, lng: -15.9582, country: 'Mauritania', countryAr: 'موريتانيا', timezone: 'Africa/Nouakchott' },
        // Sudan
        Khartoum: { name: 'Khartoum', nameAr: 'الخرطوم', lat: 15.5007, lng: 32.5599, country: 'Sudan', countryAr: 'السودان', timezone: 'Africa/Khartoum' },
        // Somalia
        Mogadishu: { name: 'Mogadishu', nameAr: 'مقديشو', lat: 2.0469, lng: 45.3182, country: 'Somalia', countryAr: 'الصومال', timezone: 'Africa/Mogadishu' },
        // Djibouti
        DjiboutiCity: { name: 'Djibouti', nameAr: 'جيبوتي', lat: 11.8251, lng: 42.5903, country: 'Djibouti', countryAr: 'جيبوتي', timezone: 'Africa/Djibouti' },
        // Indonesia
        Jakarta: { name: 'Jakarta', nameAr: 'جاكرتا', lat: -6.2088, lng: 106.8456, country: 'Indonesia', countryAr: 'إندونيسيا', timezone: 'Asia/Jakarta' },
        Surabaya: { name: 'Surabaya', nameAr: 'سورابايا', lat: -7.2575, lng: 112.7521, country: 'Indonesia', countryAr: 'إندونيسيا', timezone: 'Asia/Jakarta' },
        Bandung: { name: 'Bandung', nameAr: 'باندونغ', lat: -6.9175, lng: 107.6191, country: 'Indonesia', countryAr: 'إندونيسيا', timezone: 'Asia/Jakarta' },
        Medan: { name: 'Medan', nameAr: 'ميدان', lat: 3.5952, lng: 98.6722, country: 'Indonesia', countryAr: 'إندونيسيا', timezone: 'Asia/Jakarta' },
        Makassar: { name: 'Makassar', nameAr: 'ماكاسار', lat: -5.1428, lng: 119.4123, country: 'Indonesia', countryAr: 'إندونيسيا', timezone: 'Asia/Makassar' },
        // Malaysia
        KualaLumpur: { name: 'Kuala Lumpur', nameAr: 'كوالالمبور', lat: 3.1390, lng: 101.6869, country: 'Malaysia', countryAr: 'ماليزيا', timezone: 'Asia/Kuala_Lumpur' },
        Penang: { name: 'Penang', nameAr: 'بينانغ', lat: 5.4164, lng: 100.3327, country: 'Malaysia', countryAr: 'ماليزيا', timezone: 'Asia/Kuala_Lumpur' },
        Johor: { name: 'Johor Bahru', nameAr: 'جوهور بهرو', lat: 1.4927, lng: 103.7414, country: 'Malaysia', countryAr: 'ماليزيا', timezone: 'Asia/Kuala_Lumpur' },
        // Turkey
        Istanbul: { name: 'Istanbul', nameAr: 'إسطنبول', lat: 41.0082, lng: 28.9784, country: 'Turkey', countryAr: 'تركيا', timezone: 'Europe/Istanbul' },
        Ankara: { name: 'Ankara', nameAr: 'أنقرة', lat: 39.9334, lng: 32.8597, country: 'Turkey', countryAr: 'تركيا', timezone: 'Europe/Istanbul' },
        Izmir: { name: 'Izmir', nameAr: 'إزمير', lat: 38.4237, lng: 27.1428, country: 'Turkey', countryAr: 'تركيا', timezone: 'Europe/Istanbul' },
        // Pakistan
        Karachi: { name: 'Karachi', nameAr: 'كراتشي', lat: 24.8607, lng: 67.0011, country: 'Pakistan', countryAr: 'باكستان', timezone: 'Asia/Karachi' },
        Lahore: { name: 'Lahore', nameAr: 'لاهور', lat: 31.5497, lng: 74.3436, country: 'Pakistan', countryAr: 'باكستان', timezone: 'Asia/Karachi' },
        Islamabad: { name: 'Islamabad', nameAr: 'إسلام آباد', lat: 33.6844, lng: 73.0479, country: 'Pakistan', countryAr: 'باكستان', timezone: 'Asia/Karachi' },
        Faisalabad: { name: 'Faisalabad', nameAr: 'فيصل آباد', lat: 31.4504, lng: 73.1350, country: 'Pakistan', countryAr: 'باكستان', timezone: 'Asia/Karachi' },
        Peshawar: { name: 'Peshawar', nameAr: 'بيشاور', lat: 34.0151, lng: 71.5249, country: 'Pakistan', countryAr: 'باكستان', timezone: 'Asia/Karachi' },
        // India
        Mumbai: { name: 'Mumbai', nameAr: 'مومباي', lat: 19.0760, lng: 72.8777, country: 'India', countryAr: 'الهند', timezone: 'Asia/Kolkata' },
        Delhi: { name: 'Delhi', nameAr: 'دلهي', lat: 28.7041, lng: 77.1025, country: 'India', countryAr: 'الهند', timezone: 'Asia/Kolkata' },
        Hyderabad: { name: 'Hyderabad', nameAr: 'حيدر آباد', lat: 17.3850, lng: 78.4867, country: 'India', countryAr: 'الهند', timezone: 'Asia/Kolkata' },
        Chennai: { name: 'Chennai', nameAr: 'تشيناي', lat: 13.0827, lng: 80.2707, country: 'India', countryAr: 'الهند', timezone: 'Asia/Kolkata' },
        Kolkata: { name: 'Kolkata', nameAr: 'كولكاتا', lat: 22.5726, lng: 88.3639, country: 'India', countryAr: 'الهند', timezone: 'Asia/Kolkata' },
        // Bangladesh
        Dhaka: { name: 'Dhaka', nameAr: 'دكا', lat: 23.8103, lng: 90.4125, country: 'Bangladesh', countryAr: 'بنغلاديش', timezone: 'Asia/Dhaka' },
        Chittagong: { name: 'Chittagong', nameAr: 'تشيتاغونغ', lat: 22.3569, lng: 91.7832, country: 'Bangladesh', countryAr: 'بنغلاديش', timezone: 'Asia/Dhaka' },
        Sylhet: { name: 'Sylhet', nameAr: 'سيلهيت', lat: 24.8990, lng: 91.8719, country: 'Bangladesh', countryAr: 'بنغلاديش', timezone: 'Asia/Dhaka' },
        // Afghanistan
        Kabul: { name: 'Kabul', nameAr: 'كابول', lat: 34.5553, lng: 69.2075, country: 'Afghanistan', countryAr: 'أفغانستان', timezone: 'Asia/Kabul' },
        Kandahar: { name: 'Kandahar', nameAr: 'قندهار', lat: 31.6133, lng: 65.7232, country: 'Afghanistan', countryAr: 'أفغانستان', timezone: 'Asia/Kabul' },
        // Iran
        Tehran: { name: 'Tehran', nameAr: 'طهران', lat: 35.6892, lng: 51.3890, country: 'Iran', countryAr: 'إيران', timezone: 'Asia/Tehran' },
        Mashhad: { name: 'Mashhad', nameAr: 'مشهد', lat: 36.2605, lng: 59.6168, country: 'Iran', countryAr: 'إيران', timezone: 'Asia/Tehran' },
        Isfahan: { name: 'Isfahan', nameAr: 'أصفهان', lat: 32.6546, lng: 51.6680, country: 'Iran', countryAr: 'إيران', timezone: 'Asia/Tehran' },
        Qom: { name: 'Qom', nameAr: 'قم', lat: 34.6401, lng: 50.8764, country: 'Iran', countryAr: 'إيران', timezone: 'Asia/Tehran' },
        // Kazakhstan
        Almaty: { name: 'Almaty', nameAr: 'ألماتي', lat: 43.2220, lng: 76.8512, country: 'Kazakhstan', countryAr: 'كازاخستان', timezone: 'Asia/Almaty' },
        Astana: { name: 'Astana', nameAr: 'أستانا', lat: 51.1694, lng: 71.4491, country: 'Kazakhstan', countryAr: 'كازاخستان', timezone: 'Asia/Almaty' },
        // Kyrgyzstan
        Bishkek: { name: 'Bishkek', nameAr: 'بيشكيك', lat: 42.8746, lng: 74.5698, country: 'Kyrgyzstan', countryAr: 'قيرغيزستان', timezone: 'Asia/Bishkek' },
        // Uzbekistan
        Tashkent: { name: 'Tashkent', nameAr: 'طشقند', lat: 41.2995, lng: 69.2401, country: 'Uzbekistan', countryAr: 'أوزبكستان', timezone: 'Asia/Tashkent' },
        Samarkand: { name: 'Samarkand', nameAr: 'سمرقند', lat: 39.6542, lng: 66.9597, country: 'Uzbekistan', countryAr: 'أوزبكستان', timezone: 'Asia/Tashkent' },
        // Tajikistan
        Dushanbe: { name: 'Dushanbe', nameAr: 'دوشنبه', lat: 38.5598, lng: 68.7738, country: 'Tajikistan', countryAr: 'طاجيكستان', timezone: 'Asia/Dushanbe' },
        // Turkmenistan
        Ashgabat: { name: 'Ashgabat', nameAr: 'عشق آباد', lat: 37.9601, lng: 58.3261, country: 'Turkmenistan', countryAr: 'تركمانستان', timezone: 'Asia/Ashgabat' },
        // Nigeria
        Lagos: { name: 'Lagos', nameAr: 'لاغوس', lat: 6.5244, lng: 3.3792, country: 'Nigeria', countryAr: 'نيجيريا', timezone: 'Africa/Lagos' },
        Kano: { name: 'Kano', nameAr: 'كانو', lat: 12.0022, lng: 8.5919, country: 'Nigeria', countryAr: 'نيجيريا', timezone: 'Africa/Lagos' },
        Abuja: { name: 'Abuja', nameAr: 'أبوجا', lat: 9.0765, lng: 7.3986, country: 'Nigeria', countryAr: 'نيجيريا', timezone: 'Africa/Lagos' },
        // Senegal
        Dakar: { name: 'Dakar', nameAr: 'داكار', lat: 14.7167, lng: -17.4677, country: 'Senegal', countryAr: 'السنغال', timezone: 'Africa/Dakar' },
        // Mali
        Bamako: { name: 'Bamako', nameAr: 'باماكو', lat: 12.6392, lng: -8.0029, country: 'Mali', countryAr: 'مالي', timezone: 'Africa/Bamako' },
        // Niger
        Niamey: { name: 'Niamey', nameAr: 'نيامي', lat: 13.5127, lng: 2.1128, country: 'Niger', countryAr: 'النيجر', timezone: 'Africa/Niamey' },
        // Chad
        Ndjamena: { name: "N'Djamena", nameAr: 'نجامينا', lat: 12.1348, lng: 15.0557, country: 'Chad', countryAr: 'تشاد', timezone: 'Africa/Ndjamena' },
        // Ethiopia
        AddisAbaba: { name: 'Addis Ababa', nameAr: 'أديس أبابا', lat: 8.9806, lng: 38.7578, country: 'Ethiopia', countryAr: 'إثيوبيا', timezone: 'Africa/Addis_Ababa' },
        // Kenya
        Nairobi: { name: 'Nairobi', nameAr: 'نيروبي', lat: -1.2921, lng: 36.8219, country: 'Kenya', countryAr: 'كينيا', timezone: 'Africa/Nairobi' },
        Mombasa: { name: 'Mombasa', nameAr: 'مومباسا', lat: -4.0435, lng: 39.6682, country: 'Kenya', countryAr: 'كينيا', timezone: 'Africa/Nairobi' },
        // Tanzania
        DarEsSalaam: { name: 'Dar es Salaam', nameAr: 'دار السلام', lat: -6.7924, lng: 39.2083, country: 'Tanzania', countryAr: 'تنزانيا', timezone: 'Africa/Dar_es_Salaam' },
        Zanzibar: { name: 'Zanzibar', nameAr: 'زنجبار', lat: -6.1659, lng: 39.2026, country: 'Tanzania', countryAr: 'تنزانيا', timezone: 'Africa/Dar_es_Salaam' },
        // Uganda
        Kampala: { name: 'Kampala', nameAr: 'كمبالا', lat: 0.3476, lng: 32.5825, country: 'Uganda', countryAr: 'أوغندا', timezone: 'Africa/Kampala' },
        // Cameroon
        Douala: { name: 'Douala', nameAr: 'دوالا', lat: 4.0511, lng: 9.7679, country: 'Cameroon', countryAr: 'الكاميرون', timezone: 'Africa/Douala' },
        Yaounde: { name: 'Yaounde', nameAr: 'ياوندي', lat: 3.8480, lng: 11.5021, country: 'Cameroon', countryAr: 'الكاميرون', timezone: 'Africa/Douala' },
        // Ghana
        Accra: { name: 'Accra', nameAr: 'أكرا', lat: 5.6037, lng: -0.1870, country: 'Ghana', countryAr: 'غانا', timezone: 'Africa/Accra' },
        // Ivory Coast
        Abidjan: { name: 'Abidjan', nameAr: 'أبيدجان', lat: 5.3600, lng: -4.0083, country: 'Ivory Coast', countryAr: 'ساحل العاج', timezone: 'Africa/Abidjan' },
        // South Africa
        Johannesburg: { name: 'Johannesburg', nameAr: 'جوهانسبرغ', lat: -26.2041, lng: 28.0473, country: 'South Africa', countryAr: 'جنوب أفريقيا', timezone: 'Africa/Johannesburg' },
        CapeTown: { name: 'Cape Town', nameAr: 'كيب تاون', lat: -33.9249, lng: 18.4241, country: 'South Africa', countryAr: 'جنوب أفريقيا', timezone: 'Africa/Johannesburg' },
        // Bosnia and Herzegovina
        Sarajevo: { name: 'Sarajevo', nameAr: 'سراييفو', lat: 43.8563, lng: 18.4131, country: 'Bosnia', countryAr: 'البوسنة', timezone: 'Europe/Sarajevo' },
        // Albania
        Tirana: { name: 'Tirana', nameAr: 'تيرانا', lat: 41.3275, lng: 19.8187, country: 'Albania', countryAr: 'ألبانيا', timezone: 'Europe/Tirane' },
        // Kosovo
        Pristina: { name: 'Pristina', nameAr: 'بريشتينا', lat: 42.6629, lng: 21.1655, country: 'Kosovo', countryAr: 'كوسوفو', timezone: 'Europe/Belgrade' },
        // North Macedonia
        Skopje: { name: 'Skopje', nameAr: 'سكوبي', lat: 41.9973, lng: 21.4280, country: 'North Macedonia', countryAr: 'مقدونيا', timezone: 'Europe/Skopje' },
        // Serbia
        Belgrade: { name: 'Belgrade', nameAr: 'بلغراد', lat: 44.7866, lng: 20.4489, country: 'Serbia', countryAr: 'صربيا', timezone: 'Europe/Belgrade' },
        // Montenegro
        Podgorica: { name: 'Podgorica', nameAr: 'بودغوريتسا', lat: 42.4304, lng: 19.2594, country: 'Montenegro', countryAr: 'الجبل الأسود', timezone: 'Europe/Podgorica' },
        // France (Significant Muslim population)
        Paris: { name: 'Paris', nameAr: 'باريس', lat: 48.8566, lng: 2.3522, country: 'France', countryAr: 'فرنسا', timezone: 'Europe/Paris' },
        Marseille: { name: 'Marseille', nameAr: 'مرسيليا', lat: 43.2965, lng: 5.3698, country: 'France', countryAr: 'فرنسا', timezone: 'Europe/Paris' },
        Lyon: { name: 'Lyon', nameAr: 'ليون', lat: 45.7640, lng: 4.8357, country: 'France', countryAr: 'فرنسا', timezone: 'Europe/Paris' },
        Strasbourg: { name: 'Strasbourg', nameAr: 'ستراسبورغ', lat: 48.5734, lng: 7.7521, country: 'France', countryAr: 'فرنسا', timezone: 'Europe/Paris' },
        // Germany
        Berlin: { name: 'Berlin', nameAr: 'برلين', lat: 52.5200, lng: 13.4050, country: 'Germany', countryAr: 'ألمانيا', timezone: 'Europe/Berlin' },
        Munich: { name: 'Munich', nameAr: 'ميونخ', lat: 48.1351, lng: 11.5820, country: 'Germany', countryAr: 'ألمانيا', timezone: 'Europe/Berlin' },
        Frankfurt: { name: 'Frankfurt', nameAr: 'فرانكفورت', lat: 50.1109, lng: 8.6821, country: 'Germany', countryAr: 'ألمانيا', timezone: 'Europe/Berlin' },
        Cologne: { name: 'Cologne', nameAr: 'كولونيا', lat: 50.9375, lng: 6.9603, country: 'Germany', countryAr: 'ألمانيا', timezone: 'Europe/Berlin' },
        // United Kingdom
        London: { name: 'London', nameAr: 'لندن', lat: 51.5074, lng: -0.1278, country: 'UK', countryAr: 'بريطانيا', timezone: 'Europe/London' },
        Birmingham: { name: 'Birmingham', nameAr: 'برمنغهام', lat: 52.4862, lng: -1.8904, country: 'UK', countryAr: 'بريطانيا', timezone: 'Europe/London' },
        Manchester: { name: 'Manchester', nameAr: 'مانشستر', lat: 53.4808, lng: -2.2426, country: 'UK', countryAr: 'بريطانيا', timezone: 'Europe/London' },
        Bradford: { name: 'Bradford', nameAr: 'برادفورد', lat: 53.7960, lng: -1.7594, country: 'UK', countryAr: 'بريطانيا', timezone: 'Europe/London' },
        // Netherlands
        Amsterdam: { name: 'Amsterdam', nameAr: 'أمستردام', lat: 52.3676, lng: 4.9041, country: 'Netherlands', countryAr: 'هولندا', timezone: 'Europe/Amsterdam' },
        Rotterdam: { name: 'Rotterdam', nameAr: 'روتردام', lat: 51.9244, lng: 4.4777, country: 'Netherlands', countryAr: 'هولندا', timezone: 'Europe/Amsterdam' },
        // Belgium
        Brussels: { name: 'Brussels', nameAr: 'بروكسل', lat: 50.8503, lng: 4.3517, country: 'Belgium', countryAr: 'بلجيكا', timezone: 'Europe/Brussels' },
        // Spain
        Madrid: { name: 'Madrid', nameAr: 'مدريد', lat: 40.4168, lng: -3.7038, country: 'Spain', countryAr: 'إسبانيا', timezone: 'Europe/Madrid' },
        Barcelona: { name: 'Barcelona', nameAr: 'برشلونة', lat: 41.3851, lng: 2.1734, country: 'Spain', countryAr: 'إسبانيا', timezone: 'Europe/Madrid' },
        Seville: { name: 'Seville', nameAr: 'إشبيلية', lat: 37.3891, lng: -5.9845, country: 'Spain', countryAr: 'إسبانيا', timezone: 'Europe/Madrid' },
        // Italy
        Rome: { name: 'Rome', nameAr: 'روما', lat: 41.9028, lng: 12.4964, country: 'Italy', countryAr: 'إيطاليا', timezone: 'Europe/Rome' },
        Milan: { name: 'Milan', nameAr: 'ميلان', lat: 45.4642, lng: 9.1900, country: 'Italy', countryAr: 'إيطاليا', timezone: 'Europe/Rome' },
        // Portugal
        Lisbon: { name: 'Lisbon', nameAr: 'لشبونة', lat: 38.7223, lng: -9.1393, country: 'Portugal', countryAr: 'البرتغال', timezone: 'Europe/Lisbon' },
        // Greece
        Athens: { name: 'Athens', nameAr: 'أثينا', lat: 37.9838, lng: 23.7275, country: 'Greece', countryAr: 'اليونان', timezone: 'Europe/Athens' },
        // Russia
        Moscow: { name: 'Moscow', nameAr: 'موسكو', lat: 55.7558, lng: 37.6173, country: 'Russia', countryAr: 'روسيا', timezone: 'Europe/Moscow' },
        SaintPetersburg: { name: 'Saint Petersburg', nameAr: 'سانت بطرسبرغ', lat: 59.9311, lng: 30.3609, country: 'Russia', countryAr: 'روسيا', timezone: 'Europe/Moscow' },
        // USA
        NewYork: { name: 'New York', nameAr: 'نيويورك', lat: 40.7128, lng: -74.0060, country: 'USA', countryAr: 'أمريكا', timezone: 'America/New_York' },
        LosAngeles: { name: 'Los Angeles', nameAr: 'لوس أنجلوس', lat: 34.0522, lng: -118.2437, country: 'USA', countryAr: 'أمريكا', timezone: 'America/Los_Angeles' },
        Chicago: { name: 'Chicago', nameAr: 'شيكاغو', lat: 41.8781, lng: -87.6298, country: 'USA', countryAr: 'أمريكا', timezone: 'America/Chicago' },
        Houston: { name: 'Houston', nameAr: 'هيوستن', lat: 29.7604, lng: -95.3698, country: 'USA', countryAr: 'أمريكا', timezone: 'America/Chicago' },
        Detroit: { name: 'Detroit', nameAr: 'ديترويت', lat: 42.3314, lng: -83.0458, country: 'USA', countryAr: 'أمريكا', timezone: 'America/Detroit' },
        Phoenix: { name: 'Phoenix', nameAr: 'فينيكس', lat: 33.4484, lng: -112.0740, country: 'USA', countryAr: 'أمريكا', timezone: 'America/Phoenix' },
        // Canada
        Toronto: { name: 'Toronto', nameAr: 'تورنتو', lat: 43.6532, lng: -79.3832, country: 'Canada', countryAr: 'كندا', timezone: 'America/Toronto' },
        Montreal: { name: 'Montreal', nameAr: 'مونتريال', lat: 45.5017, lng: -73.5673, country: 'Canada', countryAr: 'كندا', timezone: 'America/Toronto' },
        Calgary: { name: 'Calgary', nameAr: 'كالجاري', lat: 51.0447, lng: -114.0719, country: 'Canada', countryAr: 'كندا', timezone: 'America/Edmonton' },
        Vancouver: { name: 'Vancouver', nameAr: 'فانكوفر', lat: 49.2827, lng: -123.1207, country: 'Canada', countryAr: 'كندا', timezone: 'America/Vancouver' },
        // Australia
        Sydney: { name: 'Sydney', nameAr: 'سيدني', lat: -33.8688, lng: 151.2093, country: 'Australia', countryAr: 'أستراليا', timezone: 'Australia/Sydney' },
        Melbourne: { name: 'Melbourne', nameAr: 'ميلبورن', lat: -37.8136, lng: 144.9631, country: 'Australia', countryAr: 'أستراليا', timezone: 'Australia/Sydney' },
        Brisbane: { name: 'Brisbane', nameAr: 'بريزبن', lat: -27.4698, lng: 153.0251, country: 'Australia', countryAr: 'أستراليا', timezone: 'Australia/Brisbane' },
        Perth: { name: 'Perth', nameAr: 'بيرث', lat: -31.9505, lng: 115.8605, country: 'Australia', countryAr: 'أستراليا', timezone: 'Australia/Perth' },
        // New Zealand
        Auckland: { name: 'Auckland', nameAr: 'أوكلاند', lat: -36.8485, lng: 174.7633, country: 'New Zealand', countryAr: 'نيوزيلندا', timezone: 'Pacific/Auckland' },
        Wellington: { name: 'Wellington', nameAr: 'ويلينغتون', lat: -41.2865, lng: 174.7762, country: 'New Zealand', countryAr: 'نيوزيلندا', timezone: 'Pacific/Auckland' },
        // Philippines
        Manila: { name: 'Manila', nameAr: 'مانيلا', lat: 14.5995, lng: 120.9842, country: 'Philippines', countryAr: 'الفلبين', timezone: 'Asia/Manila' },
        // China
        Beijing: { name: 'Beijing', nameAr: 'بكين', lat: 39.9042, lng: 116.4074, country: 'China', countryAr: 'الصين', timezone: 'Asia/Shanghai' },
        Shanghai: { name: 'Shanghai', nameAr: 'شنغهاي', lat: 31.2304, lng: 121.4737, country: 'China', countryAr: 'الصين', timezone: 'Asia/Shanghai' },
        Guangzhou: { name: 'Guangzhou', nameAr: 'قوانغتشو', lat: 23.1291, lng: 113.2644, country: 'China', countryAr: 'الصين', timezone: 'Asia/Shanghai' },
        HongKong: { name: 'Hong Kong', nameAr: 'هونغ كونغ', lat: 22.3193, lng: 114.1694, country: 'China', countryAr: 'هونغ كونغ', timezone: 'Asia/Hong_Kong' },
        // Japan
        Tokyo: { name: 'Tokyo', nameAr: 'طوكيو', lat: 35.6762, lng: 139.6503, country: 'Japan', countryAr: 'اليابان', timezone: 'Asia/Tokyo' },
        Osaka: { name: 'Osaka', nameAr: 'أوساكا', lat: 34.6937, lng: 135.5023, country: 'Japan', countryAr: 'اليابان', timezone: 'Asia/Tokyo' },
        // South Korea
        Seoul: { name: 'Seoul', nameAr: 'سيول', lat: 37.5665, lng: 126.9780, country: 'South Korea', countryAr: 'كوريا الجنوبية', timezone: 'Asia/Seoul' },
        Busan: { name: 'Busan', nameAr: 'بوسان', lat: 35.1796, lng: 129.0756, country: 'South Korea', countryAr: 'كوريا الجنوبية', timezone: 'Asia/Seoul' },
        // Thailand
        Bangkok: { name: 'Bangkok', nameAr: 'بانكوك', lat: 13.7563, lng: 100.5018, country: 'Thailand', countryAr: 'تايلاند', timezone: 'Asia/Bangkok' },
        // Singapore
        Singapore: { name: 'Singapore', nameAr: 'سنغافورة', lat: 1.3521, lng: 103.8198, country: 'Singapore', countryAr: 'سنغافورة', timezone: 'Asia/Singapore' },
        // Vietnam
        Hanoi: { name: 'Hanoi', nameAr: 'هانوي', lat: 21.0285, lng: 105.8542, country: 'Vietnam', countryAr: 'فيتنام', timezone: 'Asia/Ho_Chi_Minh' },
        HoChiMinh: { name: 'Ho Chi Minh City', nameAr: 'مدينة هو تشي منه', lat: 10.8231, lng: 106.6297, country: 'Vietnam', countryAr: 'فيتنام', timezone: 'Asia/Ho_Chi_Minh' },
        // Sri Lanka
        Colombo: { name: 'Colombo', nameAr: 'كولومبو', lat: 6.9271, lng: 79.8612, country: 'Sri Lanka', countryAr: 'سريلانكا', timezone: 'Asia/Colombo' },
        // Maldives
        Male: { name: 'Male', nameAr: 'مالي', lat: 4.1755, lng: 73.5093, country: 'Maldives', countryAr: 'جزر المالديف', timezone: 'Indian/Maldives' },
        // Brunei
        BandarSeriBegawan: { name: 'Bandar Seri Begawan', nameAr: 'بندر سري بقاوان', lat: 4.9031, lng: 114.9398, country: 'Brunei', countryAr: 'بروناي', timezone: 'Asia/Brunei' }
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
    adjustments: (function() { try { return JSON.parse(localStorage.getItem('luxury_adj')) || { Fajr: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 }; } catch { return { Fajr: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 }; } })(),
    settings: (function() { try { const s = JSON.parse(localStorage.getItem('luxury_settings')); return s || { method: 3, sound: true, vibrate: true, notifications: true, notificationType: 'beep', preReminder: 0, hijriOffset: 0, lang: 'ar', focusMode: false, theme: 'dark' }; } catch { return { method: 3, sound: true, vibrate: true, notifications: true, notificationType: 'beep', preReminder: 0, hijriOffset: 0, lang: 'ar', focusMode: false, theme: 'dark' }; } })(),
        method: 3, // MWL
        sound: true,
        vibrate: true,
        notifications: true,
        notificationType: 'beep',
        preReminder: 0,
        hijriOffset: 0,
        lang: 'ar',
        focusMode: false,
        theme: 'dark'
    },
    lastUpdatedDay: new Date().getDate(),
    remindedPrayers: new Set(), // To avoid multiple reminders for the same prayer
    intervals: {
        countdown: null,
        clock: null
    },
    calendarDate: new Date() // For Hijri calendar navigation
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
        qibla_hint: "يرجى وضع الهاتف بشكل مسطح وتحريكه بشكل (8) لمعايرة البوصلة",
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
        update_later: "لاحقاً",
        qibla_facing: "أنت تواجه القبلة",
        qibla_right: "اتجه يميناً",
        qibla_left: "اتجه يساراً",
        sun: "ح", mon: "ن", tue: "ث", wed: "ر", thu: "خ", fri: "ج", sat: "س",
        no_events: "لا توجد مناسبات هذا الشهر",
        hijri_events: {
            ramadan: "بداية رمضان",
            eid_fitr: "عيد الفطر",
            arafa: "يوم عرفة",
            eid_adha: "عيد الأضحى",
            hijri_new_year: "رأس السنة الهجرية"
        },
        qibla_not_flat: "يرجى وضع الهاتف بشكل مسطح لدقة أفضل"
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
        qibla_hint: "Please place the phone flat and move it in an (8) shape to calibrate the compass",
        qibla_facing: "You are facing the Qibla",
        qibla_right: "Turn Right",
        qibla_left: "Turn Left",
        sun: "S", mon: "M", tue: "T", wed: "W", thu: "T", fri: "F", sat: "S",
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
        update_later: "Later",
        no_events: "No events this month",
        hijri_events: {
            ramadan: "Start of Ramadan",
            eid_fitr: "Eid al-Fitr",
            arafa: "Day of Arafah",
            eid_adha: "Eid al-Adha",
            hijri_new_year: "Hijri New Year"
        },
        qibla_not_flat: "Please hold the phone flat for better accuracy"
    }
};

// --- Core Initialization ---
async function detectLocationIP() {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(CONFIG.ipGeoApi, {
            signal: controller.signal
        });
        clearTimeout(timeout);
        
        if (!response.ok) throw new Error('IP geolocation failed');
        
        const data = await response.json();
        
        if (data.latitude && data.longitude) {
            const lat = data.latitude;
            const lng = data.longitude;
            const city = data.city || data.region || '';
            const region = data.region || '';
            const country = data.country_name || data.country || '';
            const countryAr = getCountryArabic(country);
            
            const closestCity = findClosestCity(lat, lng);
            
            if (closestCity) {
                state.currentCity = {
                    ...closestCity,
                    nameAr: city || closestCity.nameAr,
                    name: city || closestCity.name,
                    isAutoDetected: true
                };
            } else {
                state.currentCity = {
                    name: city || 'Unknown',
                    nameAr: city || 'غير معروف',
                    lat: lat,
                    lng: lng,
                    country: country,
                    countryAr: countryAr,
                    timezone: data.timezone || guessTimezone(lat, lng),
                    isAutoDetected: true
                };
            }
            
            // Update precise area if available
            const preciseEl = document.getElementById('precise-area');
            if (preciseEl) preciseEl.textContent = region && region !== city ? region : '';

            localStorage.setItem('last_city', 'custom');
            localStorage.setItem('custom_location', JSON.stringify(state.currentCity));
            localStorage.setItem('ip_detected', 'true');
            
            return true;
        }
    } catch (e) {
        console.log('IP geolocation failed, trying browser GPS...');
    }
    return false;
}

function findClosestCity(lat, lng) {
    let closest = null;
    let minDist = Infinity;
    
    for (const key in CONFIG.cities) {
        const city = CONFIG.cities[key];
        const dist = Math.sqrt(
            Math.pow(city.lat - lat, 2) + 
            Math.pow(city.lng - lng, 2)
        );
        if (dist < minDist) {
            minDist = dist;
            closest = city;
        }
    }
    
    // Only return if within ~100km (roughly 1 degree)
    return minDist < 1.5 ? closest : null;
}

function getCountryArabic(countryEn) {
    const countries = {
        'Saudi Arabia': 'السعودية',
        'Yemen': 'اليمن',
        'United Arab Emirates': 'الإمارات',
        'UAE': 'الإمارات',
        'Egypt': 'مصر',
        'Jordan': 'الأردن',
        'Lebanon': 'لبنان',
        'Syria': 'سوريا',
        'Iraq': 'العراق',
        'Kuwait': 'الكويت',
        'Qatar': 'قطر',
        'Bahrain': 'البحرين',
        'Oman': 'عُمان',
        'Palestine': 'فلسطين',
        'Morocco': 'المغرب',
        'Algeria': 'الجزائر',
        'Tunisia': 'تونس',
        'Libya': 'ليبيا',
        'Mauritania': 'موريتانيا',
        'Sudan': 'السودان',
        'Somalia': 'الصومال',
        'Djibouti': 'جيبوتي',
        'Indonesia': 'إندونيسيا',
        'Malaysia': 'ماليزيا',
        'Turkey': 'تركيا',
        'Pakistan': 'باكستان',
        'India': 'الهند',
        'Bangladesh': 'بنغلاديش',
        'Afghanistan': 'أفغانستان',
        'Iran': 'إيران',
        'Kazakhstan': 'كازاخستان',
        'Kyrgyzstan': 'قيرغيزستان',
        'Uzbekistan': 'أوزبكستان',
        'Tajikistan': 'طاجيكستان',
        'Turkmenistan': 'تركمانستان',
        'Nigeria': 'نيجيريا',
        'Senegal': 'السنغال',
        'Mali': 'مالي',
        'Niger': 'النيجر',
        'Chad': 'تشاد',
        'Ethiopia': 'إثيوبيا',
        'Kenya': 'كينيا',
        'Tanzania': 'تنزانيا',
        'Uganda': 'أوغندا',
        'Cameroon': 'الكاميرون',
        'Ghana': 'غانا',
        "Cote d'Ivoire": 'ساحل العاج',
        'South Africa': 'جنوب أفريقيا',
        'Bosnia and Herzegovina': 'البوسنة',
        'Albania': 'ألبانيا',
        'Kosovo': 'كوسوفو',
        'North Macedonia': 'مقدونيا',
        'Serbia': 'صربيا',
        'Montenegro': 'الجبل الأسود',
        'France': 'فرنسا',
        'Germany': 'ألمانيا',
        'United Kingdom': 'بريطانيا',
        'UK': 'بريطانيا',
        'Netherlands': 'هولندا',
        'Belgium': 'بلجيكا',
        'Spain': 'إسبانيا',
        'Italy': 'إيطاليا',
        'Portugal': 'البرتغال',
        'Greece': 'اليونان',
        'Russia': 'روسيا',
        'United States': 'أمريكا',
        'USA': 'أمريكا',
        'Canada': 'كندا',
        'Australia': 'أستراليا',
        'New Zealand': 'نيوزيلندا',
        'Philippines': 'الفلبين',
        'China': 'الصين',
        'Japan': 'اليابان',
        'South Korea': 'كوريا الجنوبية',
        'Thailand': 'تايلاند',
        'Singapore': 'سنغافورة',
        'Vietnam': 'فيتنام',
        'Sri Lanka': 'سريلانكا',
        'Maldives': 'جزر المالديف',
        'Brunei': 'بروناي',
        'Hong Kong': 'هونغ كونغ'
    };
    
    return countries[countryEn] || countryEn;
}

function guessTimezone(lat, lng) {
    // Simple timezone guessing based on longitude
    const offset = Math.round(lng / 15);
    const zones = {
        '-12': 'Etc/GMT+12', '-11': 'Pacific/Samoa', '-10': 'Pacific/Honolulu',
        '-9': 'America/Anchorage', '-8': 'America/Los_Angeles', '-7': 'America/Denver',
        '-6': 'America/Chicago', '-5': 'America/New_York', '-4': 'America/Halifax',
        '-3': 'America/Sao_Paulo', '-2': 'Atlantic/South_Georgia', '-1': 'Atlantic/Azores',
        '0': 'Europe/London', '1': 'Europe/Paris', '2': 'Europe/Istanbul',
        '3': 'Europe/Moscow', '4': 'Asia/Dubai', '5': 'Asia/Karachi',
        '6': 'Asia/Dhaka', '7': 'Asia/Bangkok', '8': 'Asia/Shanghai',
        '9': 'Asia/Tokyo', '10': 'Australia/Sydney', '11': 'Pacific/Noumea',
        '12': 'Pacific/Auckland'
    };
    return zones[String(offset)] || 'UTC';
}

function getRegionalMethod(country) {
    if (!country) return null;
    
    for (const [region, method] of Object.entries(CONFIG.regionalMethods)) {
        if (country.toLowerCase().includes(region.toLowerCase())) {
            return method;
        }
    }
    return null;
}

function applyRegionalMethod(country) {
    const method = getRegionalMethod(country);
    if (method !== null) {
        state.settings.method = method;
        localStorage.setItem('luxury_settings', JSON.stringify(state.settings));
        const select = document.getElementById('calc-method');
        if (select) select.value = method;
    }
}

async function detectLocationGPS() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve(false);
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                
                // Try reverse geocoding
                let areaName = '';
                let preciseArea = '';
                let countryName = '';
                let countryAr = '';
                
                try {
                    const controller = new AbortController();
                    const timeout = setTimeout(() => controller.abort(), 5000);
                    
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar`,
                        { signal: controller.signal }
                    );
                    clearTimeout(timeout);
                    
                    if (response.ok) {
                        const data = await response.json();
                        areaName = data.address.city || data.address.town || 
                                   data.address.village || data.address.state || '';
                        preciseArea = data.address.suburb || data.address.district || 
                                      data.address.neighbourhood || '';
                        countryName = data.address.country || '';
                        countryAr = getCountryArabic(countryName);
                    }
                } catch (e) {
                    console.log('Reverse geocoding failed');
                }
                
                // Find closest city
                const closestCity = findClosestCity(lat, lng);
                
                state.currentCity = {
                    name: areaName || closestCity?.name || 'Custom',
                    nameAr: areaName || closestCity?.nameAr || 'موقعي الحالي',
                    lat: lat,
                    lng: lng,
                    country: countryName || closestCity?.country || '',
                    countryAr: countryAr || closestCity?.countryAr || '',
                    timezone: closestCity?.timezone || guessTimezone(lat, lng),
                    isAutoDetected: true
                };
                
                // Update precise area UI
                const preciseEl = document.getElementById('precise-area');
                if (preciseEl) preciseEl.textContent = preciseArea;
                
                localStorage.setItem('last_city', 'custom');
                localStorage.setItem('custom_location', JSON.stringify(state.currentCity));
                localStorage.removeItem('ip_detected');
                
                resolve(true);
            },
            () => {
                resolve(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    });
}

async function init() {
    applyLanguage();
    applyTheme();
    setupUIListeners();
    loadParticles();
    setupBackgroundInteraction();
    
    // Set initial background immediately
    updateDynamicBackground(new Date().getHours());
    
    // First visit? Try IP geolocation then GPS
    const savedCity = localStorage.getItem('last_city');
    
    if (!savedCity || savedCity === 'null' || savedCity === null) {
        // First visit - try IP geolocation first (fast, no permission needed)
        let detected = await detectLocationIP();
        
        if (!detected) {
            // IP failed, try browser GPS
            detected = await detectLocationGPS();
        }
        
        if (!detected) {
            // All auto-detection failed, use default
            state.currentCity = CONFIG.cities[CONFIG.defaultCity];
        }
    } else if (savedCity === 'custom') {
        const customLoc = JSON.parse(localStorage.getItem('custom_location') || 'null');
        if (customLoc && customLoc.lat && customLoc.lng) {
            state.currentCity = customLoc;
        } else {
            // Invalid custom location, fall back to default
            state.currentCity = CONFIG.cities[CONFIG.defaultCity];
            localStorage.setItem('last_city', CONFIG.defaultCity);
        }
    } else if (savedCity && CONFIG.cities[savedCity]) {
        state.currentCity = CONFIG.cities[savedCity];
    } else {
        state.currentCity = CONFIG.cities[CONFIG.defaultCity];
    }

    // Apply regional calculation method based on detected country
    if (state.currentCity?.country) {
        applyRegionalMethod(state.currentCity.country);
    }

    await refreshData();
    startMasterClock();
    
    // Check for updates after a short delay
    setTimeout(checkForUpdates, 3000);
    
    // Hide loader with Apple-style delay
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                // Trigger fade-up animations for cards
                document.querySelectorAll('.fade-up').forEach((el, i) => {
                    setTimeout(() => el.classList.add('visible'), i * 150);
                });
            }, 800);
        }
    }, 1500);
}

function applyLanguage() {
    const lang = state.settings.lang || 'ar';
    const t = I18N[lang];
    const isRtl = lang === 'ar';
    
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    
    // Header & Hero
    const nextTitle = document.querySelector('.next-title');
    if (nextTitle) nextTitle.textContent = t.next_prayer;

    const searchInput = document.getElementById('location-search-input');
    if (searchInput) searchInput.placeholder = t.search_placeholder;
    
    // Settings
    const settingsTitle = document.querySelector('#settings-modal h2');
    if (settingsTitle) settingsTitle.textContent = t.settings_title;

    const saveSettingsBtn = document.querySelector('#save-settings');
    if (saveSettingsBtn) saveSettingsBtn.textContent = t.save_settings;
    
    // Qibla
    const qiblaTitle = document.querySelector('#qibla-overlay h2');
    if (qiblaTitle) qiblaTitle.textContent = t.qibla_title;
    
    const qiblaDeg = document.querySelector('.qibla-degree');
    if (qiblaDeg && qiblaDeg.firstChild) qiblaDeg.firstChild.textContent = t.qibla_degree + ": ";
    
    const qiblaHint = document.querySelector('.qibla-hint');
    if (qiblaHint) qiblaHint.textContent = t.qibla_hint;
    
    // Adhkar
    const adhkarTitle = document.querySelector('#adhkar-modal h2');
    if (adhkarTitle) adhkarTitle.textContent = t.adhkar_title;

    const morningTab = document.querySelector('[data-category="morning"]');
    if (morningTab) morningTab.textContent = t.morning;

    const eveningTab = document.querySelector('[data-category="evening"]');
    if (eveningTab) eveningTab.textContent = t.evening;

    const afterPrayerTab = document.querySelector('[data-category="after_prayer"]');
    if (afterPrayerTab) afterPrayerTab.textContent = t.after_prayer;
    
    // Tools
    const qiblaBtnSpan = document.querySelector('#qibla-btn span');
    if (qiblaBtnSpan) qiblaBtnSpan.textContent = t.qibla_title;

    const dhikrBtnSpan = document.querySelector('#dhikr-btn span');
    if (dhikrBtnSpan) dhikrBtnSpan.textContent = t.adhkar_title;

    // Hijri Calendar Headers
    const headers = document.querySelectorAll('#calendar-headers span');
    if (headers.length === 7) {
        const days = [t.sun, t.mon, t.tue, t.wed, t.thu, t.fri, t.sat];
        headers.forEach((h, i) => h.textContent = days[i]);
    }

    // Update Toast (if visible)
    const updateMsg = document.getElementById('update-msg');
    if (updateMsg) {
        updateMsg.textContent = t.update_available;

        const updateNowBtn = document.getElementById('update-now');
        if (updateNowBtn) updateNowBtn.textContent = t.update_now;

        const updateLaterBtn = document.getElementById('update-later');
        if (updateLaterBtn) updateLaterBtn.textContent = t.update_later;
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
        
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        
        if (data.code === 200 && data.data && data.data.timings) {
            state.prayerTimes = data.data.timings;
            state.hijriData = data.data.date.hijri;
            localStorage.setItem('cached_prayers', JSON.stringify(data.data));
            updateStaticUI();
            updatePrayerGrid();
        } else {
            throw new Error('Invalid API response');
        }
    } catch (error) {
        console.warn("Prayer API Error, using cache...", error.message);
        try {
            const cachedStr = localStorage.getItem('cached_prayers');
            if (cachedStr) {
                const cached = JSON.parse(cachedStr);
                if (cached && cached.timings) {
                    state.prayerTimes = cached.timings;
                    state.hijriData = cached.date?.hijri;
                    updateStaticUI();
                    updatePrayerGrid();
                } else {
                    throw new Error('Invalid cache data');
                }
            } else {
                throw new Error('No cache available');
            }
        } catch (cacheError) {
            console.error("Cache Error:", cacheError.message);
            // Use hardcoded fallback prayer times for basic functionality
            if (!state.prayerTimes) {
                state.prayerTimes = {
                    Fajr: '05:30',
                    Dhuhr: '12:00',
                    Asr: '15:30',
                    Maghrib: '18:30',
                    Isha: '20:00'
                };
                updateStaticUI();
                updatePrayerGrid();
            }
        }
    }
}

async function checkForUpdates(isSWTriggered = false, swWorker = null) {
    try {
        const response = await fetch('version.json?t=' + Date.now());
        const data = await response.json();
        
        if (data.version !== CONFIG.version) {
            // Check if user already dismissed this version in THIS session
            const dismissed = sessionStorage.getItem('dismissed_version');
            if (dismissed === data.version && !data.forceUpdate && !isSWTriggered) return;

            // If it's a SW trigger, attach the worker
            if (isSWTriggered && swWorker) {
                data.isSWUpdate = true;
                data.worker = swWorker;
            }

            showUpdateToast(data);
        }
    } catch (e) {
        console.log("Update check failed", e);
    }
}

let isToastShowing = false;
function showUpdateToast(data) {
    if (isToastShowing) return;
    
    const toast = document.getElementById('update-toast');
    if (!toast) return;

    isToastShowing = true;
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

    // Auto-refresh after 60 seconds if ignored (optional)
    const autoRefreshTimeout = setTimeout(() => {
        if (toast.classList.contains('show')) {
            nowBtn.click();
        }
    }, 60000);
    
    nowBtn.onclick = () => {
        clearTimeout(autoRefreshTimeout);
        if (data.isSWUpdate && data.worker) {
            data.worker.postMessage({ action: 'skipWaiting' });
        } else {
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
        // Save to sessionStorage so it doesn't show again until the next session
        sessionStorage.setItem('dismissed_version', data.version || 'unknown');
        setTimeout(() => {
            toast.style.display = 'none';
            isToastShowing = false;
        }, 800);
    };
}

// --- UI Updates ---
function updateStaticUI() {
    // Dates
    const now = new Date();
    const lang = state.settings.lang || 'ar';
    const locale = lang === 'ar' ? 'ar-YE' : 'en-US';
    
    const gregEl = document.getElementById('gregorian-date');
    if (gregEl) {
        gregEl.textContent = now.toLocaleDateString(locale, { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        });
    }
    
    // Hijri Date with Offset & Maghrib Transition
    const hijriDateWithOffset = getCorrectedHijriDate();

    try {
        const hFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
        const hParts = hFormatter.formatToParts(hijriDateWithOffset);
        const hDay = hParts.find(p => p.type === 'day')?.value || '';
        const hMonth = hParts.find(p => p.type === 'month')?.value || '';
        const hYear = hParts.find(p => p.type === 'year')?.value || '';

        const hijriEl = document.getElementById('hijri-date');
        if (hijriEl) {
            if (lang === 'ar') {
                hijriEl.textContent = `${hDay} ${hMonth} ${hYear} هـ`;
            } else {
                const hFormatterEn = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
                    day: 'numeric', month: 'long', year: 'numeric'
                });
                const hPartsEn = hFormatterEn.formatToParts(hijriDateWithOffset);
                const hDayEn = hPartsEn.find(p => p.type === 'day')?.value || '';
                const hMonthEn = hPartsEn.find(p => p.type === 'month')?.value || '';
                const hYearEn = hPartsEn.find(p => p.type === 'year')?.value || '';
                hijriEl.textContent = `${hDayEn} ${hMonthEn} ${hYearEn} AH`;
            }
        }
    } catch (e) {
        console.warn("Hijri formatting error, using fallback", e);
        const hijriEl = document.getElementById('hijri-date');
        if (hijriEl && state.hijriData) {
            if (lang === 'ar') {
                hijriEl.textContent = 
                    `${state.hijriData.day} ${state.hijriData.month?.ar || ''} ${state.hijriData.year} هـ`;
            } else {
                hijriEl.textContent = 
                    `${state.hijriData.day} ${state.hijriData.month?.en || ''} ${state.hijriData.year} AH`;
            }
        }
    }

    // Location - with null safety
    if (state.currentCity) {
        const cityDisplay = lang === 'ar' ? (state.currentCity.nameAr || state.currentCity.name) : state.currentCity.name;
        const countryDisplay = lang === 'ar' ? (state.currentCity.countryAr || state.currentCity.country) : state.currentCity.country;
        
        let locationText = cityDisplay || '';
        if (countryDisplay && countryDisplay !== cityDisplay) {
            locationText += lang === 'ar' ? `، ${countryDisplay}` : `, ${countryDisplay}`;
        }
        
        const locEl = document.getElementById('current-location');
        if (locEl) locEl.textContent = locationText;
    }

    // Ramadan Countdown
    updateRamadanCountdown();
}

function updateRamadanCountdown() {
    const lang = state.settings.lang || 'ar';
    const t = I18N[lang];
    const ramadanEl = document.getElementById('ramadan-countdown');
    const textEl = document.getElementById('ramadan-text');
    if (!ramadanEl || !textEl) return;

    // Use the same logic as updateStaticUI to get the corrected Hijri date
    const hijriDateWithOffset = getCorrectedHijriDate();

    try {
        const hFormatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
            day: 'numeric', month: 'numeric', year: 'numeric'
        });
        const hParts = hFormatter.formatToParts(hijriDateWithOffset);
        const hDay = parseInt(hParts.find(p => p.type === 'day').value);
        const hMonth = parseInt(hParts.find(p => p.type === 'month').value);

        if (hMonth === 9) {
            ramadanEl.style.display = 'flex';
            textEl.textContent = lang === 'ar' ? "رمضان مبارك!" : "Ramadan Mubarak!";
            return;
        }

        // Calculate days until Ramadan (Month 9)
        let monthsToRamadan = (9 - hMonth + 12) % 12;
        const daysRemainingInMonth = 30 - hDay;
        const totalDays = ((monthsToRamadan - 1) * 29.5) + daysRemainingInMonth;
        
        if (totalDays < 60) {
            ramadanEl.style.display = 'flex';
            textEl.textContent = `${t.ramadan_countdown}: ${Math.round(totalDays)} ${t.days}`;
        } else {
            ramadanEl.style.display = 'none';
        }
    } catch (e) {
        console.error("Ramadan countdown error", e);
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
    if (!grid || !state.prayerTimes) return;

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
function getCorrectedHijriDate(baseDate = new Date()) {
    const corrected = new Date(baseDate);
    
    // Check if it's after Maghrib to advance Hijri date (only if baseDate is today)
    const now = new Date();
    const isToday = baseDate.toDateString() === now.toDateString();
    
    if (isToday && state.prayerTimes && state.prayerTimes.Maghrib) {
        const [mH, mM] = state.prayerTimes.Maghrib.split(':').map(Number);
        const maghribTime = new Date(now);
        maghribTime.setHours(mH, mM, 0);
        
        if (now >= maghribTime) {
            corrected.setDate(corrected.getDate() + 1);
        }
    }

    if (state.settings.hijriOffset) {
        corrected.setDate(corrected.getDate() + state.settings.hijriOffset);
    }
    
    return corrected;
}

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
    const nextPrayerNameEl = document.getElementById('next-prayer-name');
    if (nextPrayerNameEl) nextPrayerNameEl.textContent = getPrayerName(next.id);

    // Countdown
    const diff = next.min - currentMin;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    const s = 59 - now.getSeconds();
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) countdownEl.textContent =
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

    // Progress Bar (Actual duration calculation)
    const totalDuration = next.min - prev.min;
    const elapsed = currentMin - prev.min;
    const progress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
    const progressEl = document.getElementById('prayer-progress');
    if (progressEl) progressEl.style.width = `${progress}%`;

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
    let isTransitioning = false;

    // Generic Modal Handler
    const openModal = (modalId) => {
        if (isTransitioning) return;
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        isTransitioning = true;
        if (modalId === 'settings-modal') loadSettingsToUI();
        if (modalId === 'qibla-overlay') {
            updateQibla();
            startCompass();
        }
        if (modalId === 'hijri-modal' && typeof renderHijriCalendar === 'function') {
            renderHijriCalendar();
        }
        
        modal.style.display = 'flex';
        // Trigger reflow
        modal.offsetHeight; 
        modal.classList.add('open');
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    };

    const closeModal = (modal) => {
        if (!modal || isTransitioning) return;
        
        isTransitioning = true;
        modal.classList.remove('open');
        
        setTimeout(() => {
            modal.style.display = 'none';
            isTransitioning = false;
        }, 500);
    };

    // Bind all close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = () => {
            const modal = btn.closest('.modal-luxury');
            closeModal(modal);
            if (modal && modal.id === 'qibla-overlay') stopCompass();
        };
    });

    // Close on outside click
    document.querySelectorAll('.modal-blur-bg').forEach(bg => {
        bg.onclick = () => {
            const modal = bg.closest('.modal-luxury');
            closeModal(modal);
            if (modal && modal.id === 'qibla-overlay') stopCompass();
        };
    });

    // ESC key support
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-luxury.open').forEach(modal => {
                closeModal(modal);
                if (modal.id === 'qibla-overlay') stopCompass();
            });
            const qiblaOverlay = document.getElementById('qibla-overlay');
            if (qiblaOverlay && qiblaOverlay.style.display === 'flex') {
                qiblaOverlay.style.display = 'none';
                stopCompass();
            }
        }
    });

    // Geolocation btn in Hero
    const geoBtn = document.getElementById('geo-btn');
    if (geoBtn) geoBtn.onclick = handleGeolocation;

    const settingsBtnEl = document.getElementById('settings-btn');
    if (settingsBtnEl) settingsBtnEl.onclick = () => openModal('settings-modal');

    const saveSettingsBtnEl = document.getElementById('save-settings');
    if (saveSettingsBtnEl) {
        saveSettingsBtnEl.onclick = () => {
            saveSettingsFromUI();
            closeModal(document.getElementById('settings-modal'));
            applyLanguage();
            refreshData();
        };
    }

    // Hijri Calendar Modal
    const hijriBtn = document.getElementById('hijri-calendar-btn');
    if (hijriBtn) {
        hijriBtn.onclick = () => openModal('hijri-modal');
    }

    const prevMonthBtn = document.getElementById('prev-month');
    if (prevMonthBtn) {
        prevMonthBtn.onclick = () => {
            state.calendarDate.setDate(1);
            state.calendarDate.setMonth(state.calendarDate.getMonth() - 1);
            renderHijriCalendar();
        };
    }

    const nextMonthBtn = document.getElementById('next-month');
    if (nextMonthBtn) {
        nextMonthBtn.onclick = () => {
            state.calendarDate.setDate(1);
            state.calendarDate.setMonth(state.calendarDate.getMonth() + 1);
            renderHijriCalendar();
        };
    }

    // Qibla Overlay
    const qiblaBtn = document.getElementById('qibla-btn');
    if (qiblaBtn) {
        qiblaBtn.onclick = () => openModal('qibla-overlay');
    }

    const locationSearchBtn = document.getElementById('location-search-btn');
    if (locationSearchBtn) locationSearchBtn.onclick = () => openModal('location-modal');

    const executeSearchBtn = document.getElementById('execute-search');
    if (executeSearchBtn) executeSearchBtn.onclick = performLocationSearch;

    const locationSearchInput = document.getElementById('location-search-input');
    if (locationSearchInput) {
        locationSearchInput.onkeypress = (e) => {
            if (e.key === 'Enter') performLocationSearch();
        };
    }

    // Adhkar Modal
    const dhikrBtn = document.getElementById('dhikr-btn');
    if (dhikrBtn) {
        dhikrBtn.onclick = () => {
            openModal('adhkar-modal');
            renderAdhkar('morning');
        };
    }

    document.querySelectorAll('.adhkar-tab').forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll('.adhkar-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderAdhkar(tab.dataset.category);
        };
    });

    // Dhikr
    const refreshDhikrBtn = document.getElementById('refresh-dhikr');
    if (refreshDhikrBtn) {
        refreshDhikrBtn.onclick = shuffleDhikr;
        shuffleDhikr();
    }

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.onclick = () => {
            state.settings.theme = state.settings.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('luxury_settings', JSON.stringify(state.settings));
            applyTheme();
        };
    }

    // Share Button
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.onclick = async () => {
            const lang = state.settings.lang || 'ar';
            const title = lang === 'ar' ? 'تطبيق مواقيت الصلاة الفاخر' : 'Luxury Prayer Times App';
            const text = lang === 'ar' ? 'تحقق من مواقيت الصلاة، القبلة، والتقويم الهجري في هذا التطبيق الرائع!' : 'Check prayer times, Qibla, and Hijri calendar in this luxury app!';
            const url = window.location.href;

            if (navigator.share) {
                try {
                    await navigator.share({ title, text, url });
                } catch (err) {
                    console.log('Share failed:', err);
                }
            } else {
                // Fallback: Copy to clipboard
                try {
                    await navigator.clipboard.writeText(`${text}\n${url}`);
                    const originalColor = shareBtn.style.color;
                    shareBtn.style.color = 'var(--success-color, #10b981)';
                    setTimeout(() => shareBtn.style.color = originalColor, 2000);
                    alert(lang === 'ar' ? 'تم نسخ الرابط!' : 'Link copied!');
                } catch (err) {
                    console.error('Clipboard failed:', err);
                }
            }
        };
    }

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

async function handleGeolocation() {
    const geoBtn = document.getElementById('geo-btn');
    const originalContent = geoBtn.innerHTML;
    
    try {
        geoBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        geoBtn.disabled = true;
        
        const success = await detectLocationGPS();
        if (success) {
            // Apply regional method based on detected country
            if (state.currentCity.country) {
                applyRegionalMethod(state.currentCity.country);
            }
            await refreshData();
        } else {
            alert(state.settings.lang === 'ar' ? "فشل تحديد الموقع، يرجى تفعيل الـ GPS" : "Location detection failed, please enable GPS");
        }
    } catch (e) {
        console.error("GPS Error:", e);
    } finally {
        geoBtn.innerHTML = originalContent;
        geoBtn.disabled = false;
    }
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
            <div class="search-result-item" onclick="selectSearchedLocation(${item.lat}, ${item.lon}, '${item.address.city || item.address.town || item.address.state || item.display_name.split(',')[0]}', '${item.address.country || ''}', '${item.display_name}')">
                <div class="result-info">
                    <span class="city-name">${item.address.city || item.address.town || item.address.state || item.display_name.split(',')[0]}</span>
                    <span class="country-name">${item.address.country || ''}</span>
                </div>
                <i class="fa-solid fa-chevron-left"></i>
            </div>
        `).join('');
    } catch (error) {
        console.error("Search error", error);
        resultsContainer.innerHTML = '<p class="text-center">حدث خطأ أثناء البحث</p>';
    }
}

async function selectSearchedLocation(lat, lon, nameAr, country, displayName) {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    
    // Try to find timezone from closest city or guess
    const closestCity = findClosestCity(latitude, longitude);
    const timezone = closestCity?.timezone || guessTimezone(latitude, longitude);

    state.currentCity = {
        name: 'Custom',
        nameAr: nameAr,
        lat: latitude,
        lng: longitude,
        country: country,
        countryAr: getCountryArabic(country),
        timezone: timezone,
        isAutoDetected: true
    };
    
    localStorage.setItem('last_city', 'custom');
    localStorage.setItem('custom_location', JSON.stringify(state.currentCity));
    
    // Apply regional method if available
    if (country) {
        applyRegionalMethod(country);
    }
    
    // Update precise area display
    const parts = displayName.split(',');
    const preciseArea = parts.length > 1 ? parts.slice(1).join(',').trim() : '';
    const preciseEl = document.getElementById('precise-area');
    if (preciseEl) preciseEl.textContent = preciseArea;
    
    const modal = document.getElementById('location-modal');
    if (modal) {
        modal.classList.remove('open');
        setTimeout(() => modal.style.display = 'none', 500);
    }
    
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
    
    // Remove existing listener if any - MUST match the capture flag used when adding
    window.removeEventListener('deviceorientation', handleOrientation, true);
    window.removeEventListener('deviceorientationabsolute', handleOrientation, true);

    if (isIOS && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                if (response === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation, true);
                }
            })
            .catch(console.error);
    } else {
        if ('ondeviceorientationabsolute' in window) {
            window.addEventListener('deviceorientationabsolute', handleOrientation, true);
        } else {
            window.addEventListener('deviceorientation', handleOrientation, true);
        }
    }
}

function stopCompass() {
    window.removeEventListener('deviceorientation', handleOrientation, true);
    window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
}

let lastHeading = 0;
function handleOrientation(event) {
    let heading = 0;
    
    // Check if device is flat (beta and gamma are tilt angles)
    const beta = event.beta; // -180 to 180 (front-back tilt)
    const gamma = event.gamma; // -90 to 90 (left-right tilt)
    const isFlat = Math.abs(beta) < 20 && Math.abs(gamma) < 20;

    const flatWarning = document.getElementById('qibla-flat-warning');
    if (flatWarning) {
        if (!isFlat) {
            const lang = state.settings.lang || 'ar';
            flatWarning.textContent = I18N[lang].qibla_not_flat;
            flatWarning.style.display = 'block';
        } else {
            flatWarning.style.display = 'none';
        }
    }

    if (event.webkitCompassHeading) {
        // iOS
        heading = event.webkitCompassHeading;
        // Check accuracy on iOS
        if (event.webkitCompassAccuracy && event.webkitCompassAccuracy > 30) {
            if (flatWarning) {
                const lang = state.settings.lang || 'ar';
                flatWarning.textContent = lang === 'ar' ? "دقة البوصلة منخفضة، يرجى المعايرة" : "Low compass accuracy, please calibrate";
                flatWarning.style.display = 'block';
            }
        }
    } else if (event.absolute || event.type === 'deviceorientationabsolute') {
        // Android / absolute alpha
        heading = 360 - event.alpha;
    } else {
        // Fallback or relative alpha (less accurate)
        heading = 360 - event.alpha;
    }

    if (heading === null || typeof heading === 'undefined') return;

    // Apply smoothing (Low-pass filter)
    const smoothing = 0.15; // Slightly slower for more stability
    let diff = heading - lastHeading;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    heading = lastHeading + diff * smoothing;
    lastHeading = (heading + 360) % 360;

    const qibla = state.qiblaAngle || 0;
    const arrow = document.getElementById('compass-arrow');
    const dial = document.querySelector('.compass-dial');
    const wrapper = document.querySelector('.compass-wrapper');
    const degDisplay = document.getElementById('qibla-deg');
    
    // Calculate relative angle to Qibla (0 means pointing to Kaaba)
    let relative = (qibla - lastHeading + 360) % 360;
    if (relative > 180) relative -= 360;

    const relativeWrapper = document.getElementById('qibla-relative-wrapper');
    const relativeVal = document.getElementById('qibla-relative-val');
    const relativeDir = document.getElementById('qibla-relative-dir');

    if (relativeWrapper && relativeVal && relativeDir) {
        relativeWrapper.style.display = 'block';
        relativeVal.textContent = Math.abs(Math.round(relative));
        
        const lang = state.settings.lang || 'ar';
        const t = I18N[lang];

        if (Math.abs(relative) < 5) {
            relativeDir.textContent = t.qibla_facing;
            relativeDir.style.color = 'var(--success-color, #10b981)';
        } else {
            relativeDir.textContent = relative > 0 ? t.qibla_right : t.qibla_left;
            relativeDir.style.color = 'var(--accent-primary)';
        }
    }

    if (wrapper) {
        const isAligned = Math.abs(relative) < 5; // Within 5 degrees
        if (isAligned) {
            if (!wrapper.classList.contains('aligned')) {
                wrapper.classList.add('aligned');
                if (navigator.vibrate) navigator.vibrate(50);
            }
        } else {
            wrapper.classList.remove('aligned');
        }
    }
    
    if (degDisplay) {
        // We show the fixed Qibla angle as primary, 
        // but we could also show the relative angle if we wanted.
        // For now, let's keep it consistent with the UI.
        degDisplay.textContent = Math.round(qibla);
    }
    
    if (arrow) {
        // Rotate the arrow to point to Qibla relative to North
        arrow.style.transform = `translate(-50%, 0) rotate(${qibla}deg)`;
    }
    
    if (dial) {
        // Rotate the dial to align North with real North
        dial.style.transform = `rotate(${-lastHeading}deg)`;
    }
}

function renderHijriCalendar() {
    const monthYearText = document.getElementById('calendar-month-year');
    const daysGrid = document.getElementById('calendar-days');
    const eventsContainer = document.getElementById('events-container');
    if (!daysGrid || !monthYearText) return;

    daysGrid.innerHTML = '';
    
    const d = getCorrectedHijriDate(state.calendarDate);
    
    // Using Intl.DateTimeFormat for reliable Hijri calculation (Um Al-Qura)
    try {
        const hijriFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
        
        const parts = hijriFormatter.formatToParts(d);
        const hMonthName = parts.find(p => p.type === 'month').value;
        const hYear = parts.find(p => p.type === 'year').value;
        const hMonthNum = parseInt(new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {month: 'numeric'}).format(d));
        
        monthYearText.textContent = `${hMonthName} ${hYear}`;

        // Find the first day of the CURRENT HIJRI MONTH
        let tempDate = new Date(d);
        tempDate.setDate(1); // Start of Gregorian month
        
        // Backtrack to the start of the Hijri month
        let currentHDay = parseInt(new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {day: 'numeric'}).format(tempDate));
        tempDate.setDate(tempDate.getDate() - (currentHDay - 1));
        
        const firstDayOfHijriMonth = new Date(tempDate);
        const startDayOfWeek = firstDayOfHijriMonth.getDay();

        // Calculate days in this Hijri month
        let daysInHijriMonth = 0;
        let checkDate = new Date(firstDayOfHijriMonth);
        const initialMonth = parseInt(new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {month: 'numeric'}).format(checkDate));
        
        while (parseInt(new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {month: 'numeric'}).format(checkDate)) === initialMonth) {
            daysInHijriMonth++;
            checkDate.setDate(checkDate.getDate() + 1);
        }

        // Fill previous month empty spaces
        for (let i = 0; i < startDayOfWeek; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day other-month';
            daysGrid.appendChild(dayDiv);
        }

        // Current Hijri month days
        const today = new Date();
        for (let i = 1; i <= daysInHijriMonth; i++) {
            const dayDiv = document.createElement('div');
            const currentD = new Date(firstDayOfHijriMonth);
            currentD.setDate(firstDayOfHijriMonth.getDate() + (i - 1));
            
            const isToday = currentD.toDateString() === today.toDateString();
            dayDiv.className = `calendar-day ${isToday ? 'today' : ''}`;
            
            dayDiv.innerHTML = `
                <span class="hijri-num">${i}</span>
                <span class="greg-num">${currentD.getDate()}</span>
            `;
            daysGrid.appendChild(dayDiv);
        }

        // Render Islamic Events
        const lang = state.settings.lang || 'ar';
        const t = I18N[lang];

        const islamicEvents = [
            { name: t.hijri_events.ramadan, hMonth: 9, hDay: 1, icon: 'fa-moon' },
            { name: t.hijri_events.eid_fitr, hMonth: 10, hDay: 1, icon: 'fa-star-and-crescent' },
            { name: t.hijri_events.arafa, hMonth: 12, hDay: 9, icon: 'fa-kaaba' },
            { name: t.hijri_events.eid_adha, hMonth: 12, hDay: 10, icon: 'fa-sheep' },
            { name: t.hijri_events.hijri_new_year, hMonth: 1, hDay: 1, icon: 'fa-calendar' }
        ];

        // Filter events for the current month
        const currentMonthEvents = islamicEvents.filter(ev => ev.hMonth === initialMonth);

        if (eventsContainer) {
            if (currentMonthEvents.length > 0) {
                eventsContainer.innerHTML = currentMonthEvents.map(ev => `
                    <div class="event-item">
                        <i class="fa-solid ${ev.icon} event-icon"></i>
                        <div class="event-info">
                            <span class="event-name">${ev.name} (${ev.hDay} ${hMonthName})</span>
                        </div>
                    </div>
                `).join('');
            } else {
                eventsContainer.innerHTML = `<p class="text-muted" style="text-align:center; padding:10px;">${t.no_events}</p>`;
            }
        }
    } catch (e) {
        console.error("Hijri Calendar Error:", e);
        monthYearText.textContent = "خطأ في تحميل التقويم";
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
    if (!list) return;

    const items = CONFIG.fullAdhkar[category];
    if (!items) return;
    
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

    const langEl = document.getElementById('language-switch');
    const methodEl = document.getElementById('calc-method');
    const soundEl = document.getElementById('sound-toggle');
    const vibrateEl = document.getElementById('vibrate-toggle');
    const focusEl = document.getElementById('focus-mode');
    const notifTypeEl = document.getElementById('notification-type');
    const preRemEl = document.getElementById('pre-reminder');
    const hijriOffEl = document.getElementById('hijri-offset');

    if (langEl) langEl.value = s.lang || 'ar';
    if (methodEl) methodEl.value = s.method;
    if (soundEl) soundEl.checked = s.sound;
    if (vibrateEl) vibrateEl.checked = s.vibrate;
    if (focusEl) focusEl.checked = s.focusMode || false;
    if (notifTypeEl) notifTypeEl.value = s.notificationType || 'beep';
    if (preRemEl) preRemEl.value = s.preReminder || 0;
    if (hijriOffEl) hijriOffEl.value = s.hijriOffset || 0;
    
    ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].forEach(p => {
        const el = document.getElementById(`adj-${p}`);
        if (el) el.value = state.adjustments[p];
    });
}

function saveSettingsFromUI() {
    const langEl = document.getElementById('language-switch');
    const methodEl = document.getElementById('calc-method');
    const soundEl = document.getElementById('sound-toggle');
    const vibrateEl = document.getElementById('vibrate-toggle');
    const focusEl = document.getElementById('focus-mode');
    const notifTypeEl = document.getElementById('notification-type');
    const preRemEl = document.getElementById('pre-reminder');
    const hijriOffEl = document.getElementById('hijri-offset');

    if (langEl) state.settings.lang = langEl.value;
    if (methodEl) state.settings.method = parseInt(methodEl.value) || 3;
    if (soundEl) state.settings.sound = soundEl.checked;
    if (vibrateEl) state.settings.vibrate = vibrateEl.checked;
    if (focusEl) state.settings.focusMode = focusEl.checked;
    if (notifTypeEl) state.settings.notificationType = notifTypeEl.value;
    if (preRemEl) state.settings.preReminder = parseInt(preRemEl.value) || 0;
    if (hijriOffEl) state.settings.hijriOffset = parseInt(hijriOffEl.value) || 0;
    
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

    let ticket = null;
    const handleMove = (e) => {
        if (ticket) cancelAnimationFrame(ticket);
        ticket = requestAnimationFrame(() => {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;
            bg.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
        });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
}

async function triggerNotification(prayerId) {
    if (state.settings.focusMode) {
        console.log("Focus mode active, skipping sound/vibration");
    }

    if (state.settings.sound && state.settings.notificationType !== 'silent' && !state.settings.focusMode) {
        const soundId = state.settings.notificationType === 'adhan' ? 'adhan-sound' : 'beep-sound';
        const audio = document.getElementById(soundId);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => {
                console.error("Audio play error, retrying with fallback...", e);
                // Fallback for adhan if external link fails
                if (state.settings.notificationType === 'adhan') {
                    const beep = document.getElementById('beep-sound');
                    if (beep) beep.play();
                }
            });
        }
    }
    if (state.settings.vibrate && navigator.vibrate && !state.settings.focusMode) {
        navigator.vibrate([200, 100, 200]);
    }
    
    if (state.settings.notifications) {
        const title = state.settings.lang === 'ar' ? "حان الآن وقت صلاة " + getPrayerName(prayerId) : "It's time for " + getPrayerName(prayerId);
        const body = state.settings.lang === 'ar' ? "حي على الصلاة، حي على الفلاح" : "Come to prayer, come to success";
        const icon = "icon.svg"; // Use local icon for reliability

        if ('serviceWorker' in navigator && Notification.permission === "granted") {
            const registration = await navigator.serviceWorker.ready;
            registration.showNotification(title, {
                body: body,
                icon: icon,
                badge: icon,
                vibrate: [200, 100, 200],
                tag: 'prayer-notification',
                renotify: true
            });
        } else if (Notification.permission === "granted") {
            new Notification(title, { body: body, icon: icon });
        }
    }
}

async function triggerPreReminder(prayerId, mins) {
    if (state.settings.sound && state.settings.notificationType !== 'silent') {
        const audio = document.getElementById('beep-sound');
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.error("Audio play error", e));
        }
    }
    
    if (state.settings.notifications) {
        const title = state.settings.lang === 'ar' ? "تذكير بقرب الصلاة" : "Prayer Reminder";
        const body = state.settings.lang === 'ar' ? `بقي ${mins} دقائق على صلاة ${getPrayerName(prayerId)}` : `${mins} minutes left until ${getPrayerName(prayerId)}`;
        const icon = "icon.svg";

        if ('serviceWorker' in navigator && Notification.permission === "granted") {
            const registration = await navigator.serviceWorker.ready;
            registration.showNotification(title, {
                body: body,
                icon: icon,
                badge: icon,
                tag: 'prayer-reminder'
            });
        } else if (Notification.permission === "granted") {
            new Notification(title, { body: body, icon: icon });
        }
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
                             checkForUpdates(true, installingWorker);
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
