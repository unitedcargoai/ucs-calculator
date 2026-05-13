"use client";

import { useMemo, useState } from "react";
import {
  AUCTIONS,
  EUROPE_PORTS,
  INLAND_RATES,
  OCEAN_RATES,
  UCS_PORTS,
  WHOLESALE_STANDARD_RATES,
  BROKERS,
} from "./ucsData";

const translations = {
  pl: {
    companyCountries: "USA • Kanada • Polska",
    calculatorTitle: "Kalkulator DETAL — transport aut USA → Europa",
    retailTab: "Detal",
    wholesaleTab: "Logowanie Brokerzy — HURT",
    soon: "Wkrótce",
    calculatorSubtitle: "Transport lądowy USA + transport morski",
    banner:
      "Szybka wycena transportu aut z aukcji Copart, IAA i Manheim. Sprawdź koszt do portu w Europie lub skontaktuj się z nami, jeśli trasa wymaga indywidualnego potwierdzenia.",
    auction: "Wybierz aukcję",
    location: "Wybierz lokalizację",
    vehicleCar: "Osobowe",
    vehicleSuv: "SUV",
    vehiclePickup: "Pickup",
    vehicleMotorcycle: "Motocykl",
    retailQuoteMessage: "Na czas aktualizacji cenników wycena detaliczna wymaga indywidualnego potwierdzenia. Skontaktuj się z nami przez WhatsApp.",
    hazmatLabel: "HAZMAT / Electric / Hybrid",
    hazmatInfo: "Dodatkowa opłata HAZMAT: $300",
    hazmatLine: "HAZMAT",
    waBosLabel: "WA BOS — nowe TITLE",
    waBosInfo: "Dodatkowa opłata za nowe TITLE: $350",
    waBosLine: "WA BOS / TITLE",
    purchaseTitle: "Zgłoszenie zakupu / przelewu",
    purchaseVin: "VIN pojazdu",
    purchaseAmount: "Kwota przelewu",
    purchaseNote: "Notatka / auto / aukcja",
    purchaseWhatsapp: "Wyślij zgłoszenie WhatsApp",
    wholesaleActive: "Panel HURT aktywny",
    wholesaleInfo: "Jesteś zalogowany jako broker.",
    wholesalePriceInfo: "Cennik Premium HURT aktywny.",
    wholesaleMissing: "Brak stawki HURT dla tej konfiguracji. Skontaktuj się z administratorem.",
    brokerUsernamePlaceholder: "Login brokera",
    brokerPasswordPlaceholder: "Hasło brokera",
    brokerLogin: "Zaloguj HURT",
    brokerWelcome: "Witaj",
    brokerPackage: "Pakiet",
    brokerDiscount: "Rabat",
    brokerLogout: "Wyloguj HURT",
    brokerError: "Nieprawidłowy kod dostępu.",
    packing3: "1 z 3 aut",
    packing4: "1 z 4 aut",
    pricingCity: "Miasto wyceny",
    recommendedPort: "Rekomendowany port UCS",
    shippingLine: "Linia morska",
    inland: "Transport lądowy",
    ocean: "Transport morski",
    total: "Cena końcowa",
    savannah:
      "Uwaga: Port Savannah jest rekomendowany dla tej lokalizacji.",
    washington:
      "Uwaga: Washington State wymaga specjalnej obsługi dokumentowej. Pojazdy z WA obsługujemy routingiem przez Chicago.",
    inlandMissing:
      "Aktualna cena transportu lądowego dla tej trasy wymaga potwierdzenia. Wyślij zapytanie do administratora.",
    whatsapp: "Zapytaj przez WhatsApp",
    oceanMissing: "Brak stawki morskiej dla tej trasy albo wybranej linii.",
    aiSmall: "UCS AI Assistant",
    aiTitle: "Inteligentny asystent logistyki UCS",
    aiText:
      "Potrzebujesz pomocy z wyborem portu, wyceną, dokumentami salvage title lub routingiem? UCS AI Assistant pomoże dobrać najlepszy transport.",
    aiButton: "Wkrótce: Live AI Chat",
    smartRouting: "Smart Routing",
    smartRoutingText: "AI rekomenduje najlepszy port UCS.",
    titleHelp: "Salvage / Title Help",
    titleHelpText: "Pomoc dla WA, salvage title i dokumentów eksportowych.",
    liveSupport: "Live Support",
    liveSupportText: "Szybki kontakt z UCS przez WhatsApp.",
    website: "Strona WWW",
    community: "Społeczność",
    facebookGroup: "Facebook Group",
    contact: "Kontakt",
    whatsappMarek: "WhatsApp Marek",
  },
  en: {
    companyCountries: "USA • Canada • Poland",
    calculatorTitle: "RETAIL Calculator — USA → Europe vehicle transport",
    retailTab: "Retail",
    wholesaleTab: "Broker Login — WHOLESALE",
    soon: "Coming soon",
    calculatorSubtitle: "USA inland transport + ocean freight",
    banner:
      "Fast shipping quote for vehicles from Copart, IAA and Manheim auctions. Check the cost to a European port or contact us if the route requires individual confirmation.",
    auction: "Select auction",
    location: "Select location",
    vehicleCar: "Passenger car",
    vehicleSuv: "SUV",
    vehiclePickup: "Pickup",
    vehicleMotorcycle: "Motorcycle",
    retailQuoteMessage: "During price list updates, retail quotes require individual confirmation. Please contact us via WhatsApp.",
    hazmatLabel: "HAZMAT / Electric / Hybrid",
    hazmatInfo: "Additional HAZMAT fee: $300",
    hazmatLine: "HAZMAT",
    waBosLabel: "WA BOS — new TITLE",
    waBosInfo: "Additional new TITLE fee: $350",
    waBosLine: "WA BOS / TITLE",
    purchaseTitle: "Purchase / transfer report",
    purchaseVin: "Vehicle VIN",
    purchaseAmount: "Transfer amount",
    purchaseNote: "Note / vehicle / auction",
    purchaseWhatsapp: "Send report via WhatsApp",
    wholesaleActive: "WHOLESALE panel active",
    wholesaleInfo: "You are logged in as a broker.",
    wholesalePriceInfo: "Premium WHOLESALE pricing active.",
    wholesaleMissing: "No WHOLESALE rate for this configuration. Contact the administrator.",
    brokerUsernamePlaceholder: "Broker login",
    brokerPasswordPlaceholder: "Broker password",
    brokerLogin: "Login WHOLESALE",
    brokerWelcome: "Welcome",
    brokerPackage: "Package",
    brokerDiscount: "Discount",
    brokerLogout: "Logout WHOLESALE",
    brokerError: "Invalid access code.",
    packing3: "1 of 3 vehicles",
    packing4: "1 of 4 vehicles",
    pricingCity: "Pricing city",
    recommendedPort: "Recommended UCS port",
    shippingLine: "Shipping line",
    inland: "Inland transport",
    ocean: "Ocean freight",
    total: "Final price",
    savannah: "Note: Savannah port is recommended for this location.",
    washington:
      "Note: Washington State may require special title/document handling. Vehicles from WA are handled through Chicago routing.",
    inlandMissing:
      "The current inland transport price for this route requires confirmation. Send a request to the administrator.",
    whatsapp: "Ask via WhatsApp",
    oceanMissing:
      "No ocean freight rate for this route or selected shipping line.",
    aiSmall: "UCS AI Assistant",
    aiTitle: "Intelligent UCS logistics assistant",
    aiText:
      "Need help choosing a port, quote, salvage title documents or routing? UCS AI Assistant helps select the best transport option.",
    aiButton: "Coming soon: Live AI Chat",
    smartRouting: "Smart Routing",
    smartRoutingText: "AI recommends the best UCS port.",
    titleHelp: "Salvage / Title Help",
    titleHelpText: "Help with WA, salvage title and export documents.",
    liveSupport: "Live Support",
    liveSupportText: "Fast UCS contact via WhatsApp.",
    website: "Website",
    community: "Community",
    facebookGroup: "Facebook Group",
    contact: "Contact",
    whatsappMarek: "WhatsApp Marek",
  },
  ua: {
    companyCountries: "США • Канада • Польща",
    calculatorTitle: "РОЗДРІБНИЙ калькулятор — доставка авто США → Європа",
    retailTab: "Роздріб",
    wholesaleTab: "Логін брокера — ОПТ",
    soon: "Скоро",
    calculatorSubtitle: "Наземний транспорт США + морський фрахт",
    banner:
      "Швидка оцінка доставки авто з аукціонів Copart, IAA та Manheim. Перевірте вартість до порту в Європі або звʼяжіться з нами, якщо маршрут потребує індивідуального підтвердження.",
    auction: "Виберіть аукціон",
    location: "Виберіть локацію",
    vehicleCar: "Легкове авто",
    vehicleSuv: "SUV",
    vehiclePickup: "Пікап",
    vehicleMotorcycle: "Мотоцикл",
    retailQuoteMessage: "Під час оновлення прайсів роздрібна ціна потребує індивідуального підтвердження. Звʼяжіться з нами через WhatsApp.",
    hazmatLabel: "HAZMAT / Electric / Hybrid",
    hazmatInfo: "Додаткова плата HAZMAT: $300",
    hazmatLine: "HAZMAT",
    waBosLabel: "WA BOS — новий TITLE",
    waBosInfo: "Додаткова плата за новий TITLE: $350",
    waBosLine: "WA BOS / TITLE",
    purchaseTitle: "Заявка покупки / переказу",
    purchaseVin: "VIN авто",
    purchaseAmount: "Сума переказу",
    purchaseNote: "Нотатка / авто / аукціон",
    purchaseWhatsapp: "Надіслати через WhatsApp",
    wholesaleActive: "Оптова панель активна",
    wholesaleInfo: "Ви увійшли як брокер.",
    wholesalePriceInfo: "Premium HURT ціни активні.",
    wholesaleMissing: "Немає HURT ставки для цієї конфігурації. Звʼяжіться з адміністратором.",
    brokerUsernamePlaceholder: "Логін брокера",
    brokerPasswordPlaceholder: "Пароль брокера",
    brokerLogin: "Увійти ОПТ",
    brokerWelcome: "Вітаємо",
    brokerPackage: "Пакет",
    brokerDiscount: "Знижка",
    brokerLogout: "Вийти ОПТ",
    brokerError: "Невірний код доступу.",
    packing3: "1 з 3 авто",
    packing4: "1 з 4 авто",
    pricingCity: "Місто для розрахунку",
    recommendedPort: "Рекомендований порт UCS",
    shippingLine: "Морська лінія",
    inland: "Наземний транспорт",
    ocean: "Морський фрахт",
    total: "Кінцева ціна",
    savannah: "Увага: порт Savannah рекомендований для цієї локації.",
    washington:
      "Увага: штат Washington може потребувати спеціальної обробки документів title. Авто з WA обслуговуються через Chicago.",
    inlandMissing:
      "Актуальна ціна наземного транспорту для цього маршруту потребує підтвердження. Надішліть запит адміністратору.",
    whatsapp: "Запитати через WhatsApp",
    oceanMissing:
      "Немає морської ставки для цього маршруту або вибраної лінії.",
    aiSmall: "UCS AI Assistant",
    aiTitle: "Інтелектуальний логістичний асистент UCS",
    aiText:
      "Потрібна допомога з вибором порту, оцінкою, salvage title документами або маршрутом? UCS AI Assistant допоможе підібрати найкращий транспорт.",
    aiButton: "Скоро: Live AI Chat",
    smartRouting: "Smart Routing",
    smartRoutingText: "AI рекомендує найкращий порт UCS.",
    titleHelp: "Salvage / Title Help",
    titleHelpText: "Допомога з WA, salvage title та експортними документами.",
    liveSupport: "Live Support",
    liveSupportText: "Швидкий контакт з UCS через WhatsApp.",
    website: "Вебсайт",
    community: "Спільнота",
    facebookGroup: "Facebook Group",
    contact: "Контакт",
    whatsappMarek: "WhatsApp Marek",
  },
  bg: {
    companyCountries: "САЩ • Канада • Полша",
    calculatorTitle: "Калкулатор ДРЕБНО — транспорт на автомобили САЩ → Европа",
    retailTab: "Дребно",
    wholesaleTab: "Вход брокери — ЕДРО",
    soon: "Очаквайте",
    calculatorSubtitle: "Вътрешен транспорт в САЩ + морски транспорт",
    banner:
      "Бърза оферта за транспорт на автомобили от Copart, IAA и Manheim. Проверете цената до европейско пристанище или се свържете с нас, ако маршрутът изисква индивидуално потвърждение.",
    auction: "Изберете аукцион",
    location: "Изберете локация",
    vehicleCar: "Лек автомобил",
    vehicleSuv: "SUV",
    vehiclePickup: "Пикап",
    vehicleMotorcycle: "Мотоциклет",
    retailQuoteMessage: "По време на актуализацията на цените крайната оферта изисква индивидуално потвърждение. Свържете се с нас чрез WhatsApp.",
    hazmatLabel: "HAZMAT / Electric / Hybrid",
    hazmatInfo: "Допълнителна HAZMAT такса: $300",
    hazmatLine: "HAZMAT",
    waBosLabel: "WA BOS — нов TITLE",
    waBosInfo: "Допълнителна такса за нов TITLE: $350",
    waBosLine: "WA BOS / TITLE",
    purchaseTitle: "Заявка за покупка / превод",
    purchaseVin: "VIN на автомобила",
    purchaseAmount: "Сума на превода",
    purchaseNote: "Бележка / автомобил / аукцион",
    purchaseWhatsapp: "Изпрати чрез WhatsApp",
    wholesaleActive: "HURT панелът е активен",
    wholesaleInfo: "Влезли сте като брокер.",
    wholesalePriceInfo: "Premium HURT цените са активни.",
    wholesaleMissing: "Няма HURT цена за тази конфигурация. Свържете се с администратора.",
    brokerUsernamePlaceholder: "Брокер логин",
    brokerPasswordPlaceholder: "Брокер парола",
    brokerLogin: "Вход ЕДРО",
    brokerWelcome: "Здравейте",
    brokerPackage: "Пакет",
    brokerDiscount: "Отстъпка",
    brokerLogout: "Изход ЕДРО",
    brokerError: "Невалиден код за достъп.",
    packing3: "1 от 3 автомобила",
    packing4: "1 от 4 автомобила",
    pricingCity: "Град за калкулация",
    recommendedPort: "Препоръчан порт UCS",
    shippingLine: "Корабна линия",
    inland: "Вътрешен транспорт",
    ocean: "Морски транспорт",
    total: "Крайна цена",
    savannah: "Внимание: порт Savannah е препоръчан за тази локация.",
    washington:
      "Внимание: Washington State може да изисква специална обработка на title документи. Автомобилите от WA се обслужват през Chicago.",
    inlandMissing:
      "Актуалната цена за вътрешен транспорт по този маршрут изисква потвърждение. Изпратете запитване до администратора.",
    whatsapp: "Попитайте чрез WhatsApp",
    oceanMissing:
      "Няма морска тарифа за този маршрут или избраната линия.",
    aiSmall: "UCS AI Assistant",
    aiTitle: "Интелигентен логистичен асистент UCS",
    aiText:
      "Имате нужда от помощ с избор на порт, оферта, salvage title документи или маршрут? UCS AI Assistant помага да се избере най-добрият транспорт.",
    aiButton: "Очаквайте: Live AI Chat",
    smartRouting: "Smart Routing",
    smartRoutingText: "AI препоръчва най-добрия UCS порт.",
    titleHelp: "Salvage / Title Help",
    titleHelpText: "Помощ за WA, salvage title и експортни документи.",
    liveSupport: "Live Support",
    liveSupportText: "Бърз контакт с UCS чрез WhatsApp.",
    website: "Уебсайт",
    community: "Общност",
    facebookGroup: "Facebook Group",
    contact: "Контакт",
    whatsappMarek: "WhatsApp Marek",
  },
  ar: {
    companyCountries: "الولايات المتحدة • كندا • بولندا",
    calculatorTitle: "حاسبة التجزئة — نقل السيارات من أمريكا إلى أوروبا",
    retailTab: "تجزئة",
    wholesaleTab: "دخول الوسطاء — جملة",
    soon: "قريباً",
    calculatorSubtitle: "نقل بري داخل أمريكا + شحن بحري",
    banner:
      "تسعير سريع لشحن السيارات من مزادات Copart و IAA و Manheim. تحقق من التكلفة إلى ميناء أوروبي أو تواصل معنا إذا كان المسار يحتاج إلى تأكيد خاص.",
    auction: "اختر المزاد",
    location: "اختر الموقع",
    vehicleCar: "سيارة ركاب",
    vehicleSuv: "SUV",
    vehiclePickup: "بيك أب",
    vehicleMotorcycle: "دراجة نارية",
    retailQuoteMessage: "أثناء تحديث الأسعار، تحتاج عروض التجزئة إلى تأكيد فردي. يرجى التواصل معنا عبر WhatsApp.",
    hazmatLabel: "HAZMAT / Electric / Hybrid",
    hazmatInfo: "رسوم HAZMAT إضافية: $300",
    hazmatLine: "HAZMAT",
    waBosLabel: "WA BOS — TITLE جديد",
    waBosInfo: "رسوم إضافية لإصدار TITLE جديد: $350",
    waBosLine: "WA BOS / TITLE",
    purchaseTitle: "تقرير شراء / تحويل",
    purchaseVin: "VIN السيارة",
    purchaseAmount: "مبلغ التحويل",
    purchaseNote: "ملاحظة / سيارة / مزاد",
    purchaseWhatsapp: "إرسال عبر WhatsApp",
    wholesaleActive: "لوحة الجملة مفعلة",
    wholesaleInfo: "أنت مسجل كوسيط.",
    wholesalePriceInfo: "أسعار Premium HURT مفعلة.",
    wholesaleMissing: "لا توجد تسعيرة HURT لهذا الاختيار. تواصل مع المسؤول.",
    brokerUsernamePlaceholder: "اسم دخول الوسيط",
    brokerPasswordPlaceholder: "كلمة مرور الوسيط",
    brokerLogin: "دخول الجملة",
    brokerWelcome: "مرحباً",
    brokerPackage: "الباقة",
    brokerDiscount: "الخصم",
    brokerLogout: "خروج الجملة",
    brokerError: "رمز الدخول غير صحيح.",
    packing3: "1 من 3 سيارات",
    packing4: "1 من 4 سيارات",
    pricingCity: "مدينة التسعير",
    recommendedPort: "ميناء UCS الموصى به",
    shippingLine: "خط الشحن",
    inland: "النقل البري",
    ocean: "الشحن البحري",
    total: "السعر النهائي",
    savannah: "تنبيه: ميناء Savannah موصى به لهذا الموقع.",
    washington:
      "تنبيه: ولاية Washington قد تحتاج إلى معالجة خاصة لوثائق title. سيارات WA يتم التعامل معها عبر Chicago.",
    inlandMissing:
      "سعر النقل البري الحالي لهذا المسار يحتاج إلى تأكيد. أرسل طلباً إلى المسؤول.",
    whatsapp: "اسأل عبر WhatsApp",
    oceanMissing: "لا توجد تسعيرة بحرية لهذا المسار أو خط الشحن المختار.",
    aiSmall: "UCS AI Assistant",
    aiTitle: "مساعد UCS الذكي للخدمات اللوجستية",
    aiText:
      "هل تحتاج مساعدة في اختيار الميناء أو التسعير أو وثائق salvage title أو المسار؟ يساعدك UCS AI Assistant في اختيار أفضل نقل.",
    aiButton: "قريباً: دردشة AI مباشرة",
    smartRouting: "Smart Routing",
    smartRoutingText: "AI يوصي بأفضل ميناء UCS.",
    titleHelp: "Salvage / Title Help",
    titleHelpText: "مساعدة في WA ووثائق salvage title والتصدير.",
    liveSupport: "Live Support",
    liveSupportText: "تواصل سريع مع UCS عبر WhatsApp.",
    website: "الموقع",
    community: "المجتمع",
    facebookGroup: "مجموعة Facebook",
    contact: "تواصل",
    whatsappMarek: "WhatsApp Marek",
  },
};

const languageLabels = [
  { code: "pl", label: "🇵🇱 Polski" },
  { code: "en", label: "🇺🇸 English" },
  { code: "ua", label: "🇺🇦 Українська" },
  { code: "bg", label: "🇧🇬 Български" },
  { code: "ar", label: "🇸🇦 العربية" },
];


export default function Home() {
  const [lang, setLang] = useState("pl");
  const t = translations[lang];
  const isRtl = lang === "ar";

  const [mode, setMode] = useState("retail");
  const [brokerUsername, setBrokerUsername] = useState("");
  const [brokerPassword, setBrokerPassword] = useState("");
  const [brokerError, setBrokerError] = useState("");
  const [showBrokerLogin, setShowBrokerLogin] = useState(false);
  const [activeBroker, setActiveBroker] = useState(null);

  const [auction, setAuction] = useState("");
  const [location, setLocation] = useState("");
  const [vehicle, setVehicle] = useState("SUV");
  const [hazmat, setHazmat] = useState(false);
  const [waBos, setWaBos] = useState(false);
  const [purchaseVin, setPurchaseVin] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [purchaseNote, setPurchaseNote] = useState("");
  const [portUsa, setPortUsa] = useState("Savannah");
  const [portEu, setPortEu] = useState("Rotterdam");
  const [packing, setPacking] = useState("1 z 3");

  const auctionNames = useMemo(
    () => [...new Set(AUCTIONS.map((item) => item.auction))].sort(),
    []
  );

  const filteredLocations = useMemo(
    () => AUCTIONS.filter((item) => item.auction === auction),
    [auction]
  );

  const selectedLocation = AUCTIONS.find(
    (item) => item.auction === auction && item.location === location
  );

  const pricingCity = selectedLocation?.city || "";
  const inlandKey = `${auction}-${location}-${portUsa}`;
  const oceanKey =
    vehicle === "Motocykl"
      ? `${portUsa}-${portEu}-Motocykl`
      : vehicle === "Pickup"
        ? `${portUsa}-${portEu}-Pickup`
        : `${portUsa}-${portEu}-${packing}`;

  const hasRequiredSelection = Boolean(auction && location && selectedLocation);

  const inlandVehicleKey =
    vehicle === "Motocykl"
      ? "motorcycle"
      : vehicle === "Pickup"
        ? "pickup"
        : vehicle === "SUV"
          ? "suv"
          : "car";

  const standardWholesaleInland =
    hasRequiredSelection && INLAND_RATES[inlandKey]
      ? INLAND_RATES[inlandKey][inlandVehicleKey] || 0
      : 0;

  const standardWholesaleOcean = hasRequiredSelection
    ? WHOLESALE_STANDARD_RATES[oceanKey] || 0
    : 0;

  const brokerDiscount = activeBroker?.discount || 0;

  const wholesaleOcean =
    mode === "wholesale" && (standardWholesaleOcean > 0 || standardWholesaleInland > 0)
      ? Math.max(standardWholesaleOcean - brokerDiscount, 0)
      : 0;

  // Inland: wszyscy brokerzy widzą standard, tylko Premium Partner ma -$50.
  const inlandPartnerDiscount =
    mode === "wholesale" &&
    activeBroker?.package === "Premium Partner" &&
    standardWholesaleInland > 0
      ? 50
      : 0;

  const wholesaleInland =
    mode === "wholesale" && standardWholesaleInland > 0
      ? Math.max(standardWholesaleInland - inlandPartnerDiscount, 0)
      : 0;

  const hazmatFee = hazmat && mode === "wholesale" ? 300 : 0;
  const waBosFee = waBos && mode === "wholesale" ? 350 : 0;

  // DETAL: $0 i kontakt. HURT: pokazujemy ceny brokera.
  const inland = mode === "wholesale" ? wholesaleInland : 0;
  const ocean = mode === "wholesale" ? wholesaleOcean : 0;
  const total = inland + ocean + hazmatFee + waBosFee;

  const purchaseWhatsappMessage = encodeURIComponent(
    `ZAKUP / PRZELEW\n` +
      `Broker: ${activeBroker?.name || ""}\n` +
      `Pakiet: ${activeBroker?.package || ""}\n` +
      `VIN: ${purchaseVin}\n` +
      `Kwota przelewu: ${purchaseAmount}\n` +
      `Notatka: ${purchaseNote}\n` +
      `Aukcja: ${auction}\n` +
      `Lokalizacja: ${location}\n` +
      `Port USA: ${portUsa}\n` +
      `Port EU: ${portEu}\n` +
      `Typ pojazdu: ${vehicle}\n` +
      `Transport lądowy: $${inland.toFixed(2)}\n` +
      `Transport morski: $${ocean.toFixed(2)}\n` +
      `HAZMAT: $${hazmatFee.toFixed(2)}\n` +
      `WA BOS / TITLE: $${waBosFee.toFixed(2)}\n` +
      `Cena końcowa: $${total.toFixed(2)}`
  );

  const isFlorida =
    selectedLocation?.state === "FL" ||
    ["Tampa", "Miami", "Orlando"].includes(pricingCity);

  const showSavannahRecommendation = isFlorida && portUsa !== "Savannah";
  const showWashingtonNotice = selectedLocation?.state === "WA";

  function handleBrokerLogin() {
    const broker = BROKERS.find(
      (item) =>
        item.username.toLowerCase() === brokerUsername.trim().toLowerCase() &&
        item.password === brokerPassword
    );

    if (broker) {
      setActiveBroker(broker);
      setMode("wholesale");
      setShowBrokerLogin(false);
      setBrokerError("");
      setBrokerUsername("");
      setBrokerPassword("");
      return;
    }

    setBrokerError(t.brokerError);
  }

  function handleBrokerLogout() {
    setMode("retail");
    setActiveBroker(null);
    setBrokerUsername("");
    setBrokerPassword("");
    setBrokerError("");
  }

  function handleAuctionChange(value) {
    setAuction(value);
    setLocation("");
  }

  function handleLocationChange(value) {
    setLocation(value);

    const chosen = AUCTIONS.find(
      (item) => item.auction === auction && item.location === value
    );

    if (chosen?.recommendedPort) {
      setPortUsa(chosen.recommendedPort);
    }
  }

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-100 p-6"
      style={{ fontFamily: "Inter, Segoe UI, Arial, sans-serif" }}
    >
      <section className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            United Cargo Shipping Group
          </h1>

          <p className="mt-3 text-lg text-slate-600">{t.companyCountries}</p>

          <p className="mt-4 font-semibold">
            PL: +48 516 393 233 | USA: +1 773 987 9494 | CA: +1 403 390 6825
          </p>

          <p className="mt-2 text-slate-600">Marek Witkowski</p>

          <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-3 rounded-3xl bg-slate-100 p-3 md:flex-row">
            <button
              onClick={() => setMode("retail")}
              className={`flex-1 rounded-2xl px-5 py-3 font-bold shadow ${
                mode === "retail"
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              {t.retailTab}
            </button>

            {mode === "wholesale" ? (
              <button
                onClick={handleBrokerLogout}
                className="flex-1 rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white shadow"
              >
                {t.brokerLogout}
              </button>
            ) : (
              <button
                onClick={() => setShowBrokerLogin(!showBrokerLogin)}
                className="flex-1 rounded-2xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-800 shadow"
              >
                {t.wholesaleTab}
              </button>
            )}
          </div>

          {showBrokerLogin && mode !== "wholesale" && (
            <div className="mx-auto mt-4 max-w-2xl rounded-3xl border bg-white p-4 shadow">
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  className="flex-1 rounded-2xl border p-4 text-lg text-slate-900"
                  type="text"
                  value={brokerUsername}
                  onChange={(e) => setBrokerUsername(e.target.value)}
                  placeholder={t.brokerUsernamePlaceholder}
                />

                <input
                  className="flex-1 rounded-2xl border p-4 text-lg text-slate-900"
                  type="password"
                  value={brokerPassword}
                  onChange={(e) => setBrokerPassword(e.target.value)}
                  placeholder={t.brokerPasswordPlaceholder}
                />

                <button
                  onClick={handleBrokerLogin}
                  className="rounded-2xl bg-slate-900 px-6 py-4 font-bold text-white"
                >
                  {t.brokerLogin}
                </button>
              </div>

              {brokerError && (
                <p className="mt-3 rounded-xl bg-red-100 p-3 text-sm font-semibold text-red-700">
                  {brokerError}
                </p>
              )}
            </div>
          )}

          {mode === "wholesale" && activeBroker && (
            <div className="mx-auto mt-4 max-w-2xl rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
              <p className="text-lg font-bold">
                {t.brokerWelcome} {activeBroker.name}
              </p>
              <p className="mt-1 text-sm">
                {t.brokerPackage}: <b>{activeBroker.package}</b>
              </p>
              <p className="mt-1 text-sm">{t.wholesaleInfo}</p>
            </div>
          )}

          <h2 className="mt-8 text-2xl font-bold tracking-tight">
            {mode === "wholesale" ? t.wholesaleTab : t.calculatorTitle}
          </h2>

          <p className="mt-2 text-slate-600">{t.calculatorSubtitle}</p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-slate-600">
            {languageLabels.map((item) => (
              <button
                key={item.code}
                onClick={() => setLang(item.code)}
                className={`rounded-full px-3 py-1 shadow transition ${
                  lang === item.code
                    ? "bg-slate-900 text-white"
                    : "bg-white hover:bg-slate-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-900">
            {t.banner}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <select
            className="w-full rounded-xl border p-4 text-lg"
            value={auction}
            onChange={(e) => handleAuctionChange(e.target.value)}
          >
            <option value="">{t.auction}</option>
            {auctionNames.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            className="w-full rounded-xl border p-4 text-lg"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
          >
            <option value="">{t.location}</option>
            {filteredLocations.map((item) => (
              <option key={`${item.auction}-${item.location}`} value={item.location}>
                {item.location}
              </option>
            ))}
          </select>

          <select
            className="w-full rounded-xl border p-4 text-lg"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
          >
            <option value="Osobowe">{t.vehicleCar}</option>
            <option value="SUV">{t.vehicleSuv}</option>
            <option value="Pickup">{t.vehiclePickup}</option>
            <option value="Motocykl">{t.vehicleMotorcycle}</option>
          </select>

          <label className="flex items-center gap-3 rounded-xl border bg-white p-4 text-lg font-semibold text-slate-900">
            <input
              type="checkbox"
              checked={hazmat}
              onChange={(e) => setHazmat(e.target.checked)}
              className="h-5 w-5"
            />
            <span>{t.hazmatLabel}</span>
            <span className="ml-auto rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-800">
              +$300
            </span>
          </label>

          <label className="flex items-center gap-3 rounded-xl border bg-white p-4 text-lg font-semibold text-slate-900">
            <input
              type="checkbox"
              checked={waBos}
              onChange={(e) => setWaBos(e.target.checked)}
              className="h-5 w-5"
            />
            <span>{t.waBosLabel}</span>
            <span className="ml-auto rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
              +$350
            </span>
          </label>

          <select
            className="w-full rounded-xl border p-4 text-lg"
            value={packing}
            onChange={(e) => setPacking(e.target.value)}
          >
            <option value="1 z 3">{t.packing3}</option>
            <option value="1 z 4">{t.packing4}</option>
          </select>

          <select
            className="w-full rounded-xl border p-4 text-lg"
            value={portUsa}
            onChange={(e) => setPortUsa(e.target.value)}
          >
            {UCS_PORTS.map((port) => (
              <option key={port}>{port}</option>
            ))}
          </select>

          <select
            className="w-full rounded-xl border p-4 text-lg"
            value={portEu}
            onChange={(e) => setPortEu(e.target.value)}
          >
            {EUROPE_PORTS.map((port) => (
              <option key={port}>{port}</option>
            ))}
          </select>
        </div>

        {selectedLocation && (
          <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-slate-700">
            <p>
              {t.pricingCity}: <b>{pricingCity || "—"}</b>
            </p>
            <p>
              {t.recommendedPort}:{" "}
              <b>{selectedLocation.recommendedPort || "brak"}</b>
            </p>
          </div>
        )}

        <div className="mt-10 rounded-2xl bg-slate-900 p-6 text-white">
          <p className="text-lg">
            {t.inland}: ${inland.toFixed(2)}
          </p>
          <p className="text-lg">
            {t.ocean}: ${ocean.toFixed(2)}
          </p>

          {hazmatFee > 0 && (
            <p className="text-lg">
              {t.hazmatLine}: ${hazmatFee.toFixed(2)}
            </p>
          )}

          {waBosFee > 0 && (
            <p className="text-lg">
              {t.waBosLine}: ${waBosFee.toFixed(2)}
            </p>
          )}

          <p className="mt-4 text-3xl font-bold">
            {t.total}: ${total.toFixed(2)}
          </p>

          {hasRequiredSelection && mode === "retail" && (
            <div className="mt-4 rounded-xl bg-yellow-500 p-4 text-black">
              <p>{t.retailQuoteMessage}</p>

              <a
                className="mt-3 inline-block rounded-xl bg-green-600 px-4 py-2 font-bold text-white"
                href="https://wa.me/19412505868"
                target="_blank"
              >
                {t.whatsapp}
              </a>
            </div>
          )}

          {hasRequiredSelection && mode === "wholesale" && (standardWholesaleOcean > 0 || standardWholesaleInland > 0) && (
            <p className="mt-4 rounded-xl bg-emerald-500 p-3 text-white">
              {t.wholesalePriceInfo}
            </p>
          )}

          {hasRequiredSelection && mode === "wholesale" && standardWholesaleOcean === 0 && standardWholesaleInland === 0 && (
            <p className="mt-4 rounded-xl bg-yellow-500 p-3 text-black">
              {t.wholesaleMissing}
            </p>
          )}

          {showSavannahRecommendation && (
            <p className="mt-4 rounded-xl bg-blue-500 p-3 text-white">
              {t.savannah}
            </p>
          )}

          {showWashingtonNotice && (
            <p className="mt-4 rounded-xl bg-blue-500 p-3 text-white">
              {t.washington}
            </p>
          )}
        </div>

        {mode === "wholesale" && activeBroker && (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow">
            <h3 className="text-2xl font-bold text-slate-900">
              {t.purchaseTitle}
            </h3>

            <p className="mt-2 text-slate-600">
              Wypełnij po zakupie auta lub wykonaniu przelewu. Wiadomość otworzy się gotowa w WhatsApp.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <input
                className="rounded-xl border p-4 text-lg text-slate-900"
                value={purchaseVin}
                onChange={(e) => setPurchaseVin(e.target.value)}
                placeholder={t.purchaseVin}
              />

              <input
                className="rounded-xl border p-4 text-lg text-slate-900"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(e.target.value)}
                placeholder={t.purchaseAmount}
              />

              <input
                className="rounded-xl border p-4 text-lg text-slate-900"
                value={purchaseNote}
                onChange={(e) => setPurchaseNote(e.target.value)}
                placeholder={t.purchaseNote}
              />
            </div>

            <a
              className="mt-5 inline-block rounded-2xl bg-green-600 px-6 py-4 text-lg font-bold text-white shadow hover:bg-green-700"
              href={`https://wa.me/19412505868?text=${purchaseWhatsappMessage}`}
              target="_blank"
            >
              {t.purchaseWhatsapp}
            </a>
          </div>
        )}

        <div className="mt-10 rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                {t.aiSmall}
              </p>

              <h3 className="mt-2 text-3xl font-bold">{t.aiTitle}</h3>

              <p className="mt-3 max-w-2xl text-slate-200">{t.aiText}</p>
            </div>

            <div className="flex flex-col gap-3">
              <button className="rounded-2xl border border-white/30 bg-white/10 px-6 py-4 text-lg font-semibold text-white">
                {t.aiButton}
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-bold">{t.smartRouting}</p>
              <p className="mt-1 text-sm text-slate-200">
                {t.smartRoutingText}
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-bold">{t.titleHelp}</p>
              <p className="mt-1 text-sm text-slate-200">
                {t.titleHelpText}
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-bold">{t.liveSupport}</p>
              <p className="mt-1 text-sm text-slate-200">
                {t.liveSupportText}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <a
            href="https://www.kontenerydopolski.pl"
            target="_blank"
            className="rounded-2xl border bg-white p-5 text-center shadow-sm hover:bg-slate-50"
          >
            <p className="text-sm font-semibold text-slate-500">{t.website}</p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              kontenerydopolski.pl
            </p>
          </a>

          <a
            href="https://facebook.com/groups/kontenerydopolski"
            target="_blank"
            className="rounded-2xl border bg-white p-5 text-center shadow-sm hover:bg-slate-50"
          >
            <p className="text-sm font-semibold text-slate-500">
              {t.community}
            </p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              {t.facebookGroup}
            </p>
          </a>

          <a
            href="https://wa.me/19412505868"
            target="_blank"
            className="rounded-2xl bg-green-600 p-5 text-center text-white shadow-sm hover:bg-green-700"
          >
            <p className="text-sm font-semibold">{t.contact}</p>
            <p className="mt-1 text-lg font-bold">{t.whatsappMarek}</p>
          </a>
        </div>
      </section>
    </main>
  );
}
