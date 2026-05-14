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
  MARKETPLACE_CARS,
} from "./ucsData";

const translations = {
  pl: {
    companyCountries: "𝗨𝗦𝗔 • 𝗞𝗮𝗻𝗮𝗱𝗮 • 𝗣𝗼𝗹𝘀𝗸𝗮",
    calculatorTitle: "Interaktywny Kalkulator Transportu USA → Europa",
    retailTab: "Detal",
    wholesaleTab: "Logowanie Brokerzy — Panel Interaktywny",
    soon: "Wkrótce",
    calculatorSubtitle: "Samochody • Motocykle • ATV • Pojazdy specjalne",
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
    quoteRequestTitle: "Zapytaj o wycenę przez WhatsApp",
    quoteAuction: "Aukcja",
    quoteLot: "LOT / Stock / VIN",
    quoteNote: "Uwagi / model auta / lokalizacja",
    quoteWhatsapp: "Wyślij zapytanie WhatsApp",
    carfaxTitle: "Sprawdź CARFAX",
    carfaxVin: "VIN pojazdu",
    carfaxWhatsapp: "Wyślij VIN przez WhatsApp",
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
    aiFloatTitle: "UCS AI Assistant",
    aiFloatSubtitle: "Zapytaj o port, title, HAZMAT lub wycenę",
    aiHello: "Cześć! Jestem asystentem UCS. Mogę pomóc z wyborem portu, HAZMAT, WA BOS/title i kontaktem z administratorem.",
    aiQuestionPlaceholder: "Napisz pytanie...",
    aiSend: "Zapytaj",
    aiWhatsapp: "Wyślij pytanie do UCS przez WhatsApp",
    aiQuickPort: "Jaki port wybrać?",
    aiQuickTitle: "WA BOS / title",
    aiQuickHazmat: "HAZMAT",
    facebookGroup: "Facebook Group",
    contact: "Kontakt",
    marketplaceTitle: "Auta na sprzedaż",
    marketplaceSubtitle: "Oferty brokerów UCS. Publicznie widoczne są zdjęcia i dane auta; ceny są dostępne po zalogowaniu brokera.",
    marketplaceAdd: "+ Dodaj auto",
    marketplaceAddHint: "Na tym etapie przycisk otwiera WhatsApp do UCS. Docelowo podłączymy bazę danych i broker będzie dodawał auta samodzielnie.",
    marketplacePrice: "Cena brokera",
    marketplacePublicPrice: "Cena dostępna po kontakcie",
    marketplaceContact: "Zapytaj o auto WhatsApp",
    marketplaceCarfax: "Otwórz CARFAX PDF",
    marketplaceDetails: "Szczegóły auta",
    marketplaceIncluded: "Opis ceny",
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
    quoteRequestTitle: "Ask for a quote via WhatsApp",
    quoteAuction: "Auction",
    quoteLot: "LOT / Stock / VIN",
    quoteNote: "Notes / vehicle model / location",
    quoteWhatsapp: "Send WhatsApp request",
    carfaxTitle: "Check CARFAX",
    carfaxVin: "Vehicle VIN",
    carfaxWhatsapp: "Send VIN via WhatsApp",
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
    aiFloatTitle: "UCS AI Assistant",
    aiFloatSubtitle: "Ask about port, title, HAZMAT or quote",
    aiHello: "Hi! I am the UCS assistant. I can help with port selection, HAZMAT, WA BOS/title, and contacting the administrator.",
    aiQuestionPlaceholder: "Type your question...",
    aiSend: "Ask",
    aiWhatsapp: "Send question to UCS via WhatsApp",
    aiQuickPort: "Which port?",
    aiQuickTitle: "WA BOS / title",
    aiQuickHazmat: "HAZMAT",
    facebookGroup: "Facebook Group",
    contact: "Contact",
    marketplaceTitle: "Vehicles for sale",
    marketplaceSubtitle: "UCS broker listings. Public visitors see photos and vehicle details; pricing is available after broker login.",
    marketplaceAdd: "+ Add vehicle",
    marketplaceAddHint: "For now this button opens WhatsApp to UCS. Later we will connect a database so brokers can add vehicles directly.",
    marketplacePrice: "Broker price",
    marketplacePublicPrice: "Price available on request",
    marketplaceContact: "Ask via WhatsApp",
    marketplaceCarfax: "Open CARFAX PDF",
    marketplaceDetails: "Vehicle details",
    marketplaceIncluded: "Price note",
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
    quoteRequestTitle: "Запитати ціну через WhatsApp",
    quoteAuction: "Аукціон",
    quoteLot: "LOT / Stock / VIN",
    quoteNote: "Нотатки / модель авто / локація",
    quoteWhatsapp: "Надіслати WhatsApp запит",
    carfaxTitle: "Перевірити CARFAX",
    carfaxVin: "VIN авто",
    carfaxWhatsapp: "Надіслати VIN через WhatsApp",
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
    aiFloatTitle: "UCS AI Assistant",
    aiFloatSubtitle: "Запитайте про порт, title, HAZMAT або ціну",
    aiHello: "Привіт! Я асистент UCS. Допоможу з вибором порту, HAZMAT, WA BOS/title та контактом з адміністратором.",
    aiQuestionPlaceholder: "Напишіть питання...",
    aiSend: "Запитати",
    aiWhatsapp: "Надіслати питання UCS через WhatsApp",
    aiQuickPort: "Який порт?",
    aiQuickTitle: "WA BOS / title",
    aiQuickHazmat: "HAZMAT",
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
    quoteRequestTitle: "Попитайте за цена чрез WhatsApp",
    quoteAuction: "Аукцион",
    quoteLot: "LOT / Stock / VIN",
    quoteNote: "Бележки / модел / локация",
    quoteWhatsapp: "Изпрати WhatsApp запитване",
    carfaxTitle: "Провери CARFAX",
    carfaxVin: "VIN на автомобила",
    carfaxWhatsapp: "Изпрати VIN чрез WhatsApp",
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
    aiFloatTitle: "UCS AI Assistant",
    aiFloatSubtitle: "Попитайте за порт, title, HAZMAT или цена",
    aiHello: "Здравейте! Аз съм UCS асистент. Мога да помогна с избор на порт, HAZMAT, WA BOS/title и контакт с администратора.",
    aiQuestionPlaceholder: "Напишете въпрос...",
    aiSend: "Попитай",
    aiWhatsapp: "Изпрати въпрос към UCS през WhatsApp",
    aiQuickPort: "Кой порт?",
    aiQuickTitle: "WA BOS / title",
    aiQuickHazmat: "HAZMAT",
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
    quoteRequestTitle: "اطلب تسعيرة عبر WhatsApp",
    quoteAuction: "المزاد",
    quoteLot: "LOT / Stock / VIN",
    quoteNote: "ملاحظات / موديل السيارة / الموقع",
    quoteWhatsapp: "إرسال طلب WhatsApp",
    carfaxTitle: "تحقق من CARFAX",
    carfaxVin: "VIN السيارة",
    carfaxWhatsapp: "إرسال VIN عبر WhatsApp",
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
    aiFloatTitle: "UCS AI Assistant",
    aiFloatSubtitle: "اسأل عن الميناء أو title أو HAZMAT أو السعر",
    aiHello: "مرحباً! أنا مساعد UCS. أساعدك في اختيار الميناء و HAZMAT و WA BOS/title والتواصل مع الإدارة.",
    aiQuestionPlaceholder: "اكتب سؤالك...",
    aiSend: "اسأل",
    aiWhatsapp: "أرسل السؤال إلى UCS عبر WhatsApp",
    aiQuickPort: "أي ميناء؟",
    aiQuickTitle: "WA BOS / title",
    aiQuickHazmat: "HAZMAT",
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
  const websiteUrl =
    lang === "pl"
      ? "https://www.kontenerydopolski.pl"
      : "https://www.unitedcargoshipping.com";
  const websiteLabel =
    lang === "pl" ? "kontenerydopolski.pl" : "unitedcargoshipping.com";

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
  const [quoteAuction, setQuoteAuction] = useState("IAA");
  const [quoteLot, setQuoteLot] = useState("");
  const [quoteNote, setQuoteNote] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([]);
  const [marketplaceOpen, setMarketplaceOpen] = useState(false);
  const [marketplaceSearch, setMarketplaceSearch] = useState("");
  const [selectedMarketplaceCar, setSelectedMarketplaceCar] = useState(null);
  const [carfaxVin, setCarfaxVin] = useState("");
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

  const hazmatFee = mode === "wholesale" && hazmat ? 300 : 0;
  const waBosFee = mode === "wholesale" && waBos ? 350 : 0;

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

  const publicQuoteWhatsappMessage = encodeURIComponent(
    `PROŚBA O WYCENĘ DETALICZNĄ\n` +
      `Aukcja: ${quoteAuction}\n` +
      `LOT / Stock nr: ${quoteLot}\n` +
      `Uwagi: ${quoteNote}\n` +
      `Wybrana aukcja w kalkulatorze: ${auction}\n` +
      `Wybrana lokalizacja: ${location}\n` +
      `Typ pojazdu: ${vehicle}\n` +
      `Port USA: ${portUsa}\n` +
      `Port EU: ${portEu}`
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

  const carfaxWhatsappMessage = encodeURIComponent(
    `SPRAWDŹ CARFAX\n` +
      `Broker: ${activeBroker?.name || ""}\n` +
      `Pakiet: ${activeBroker?.package || ""}\n` +
      `VIN: ${carfaxVin}`
  );

  function getAiAnswer(question) {
    const q = question.toLowerCase();

    if (q.includes("savannah") || q.includes("miami") || q.includes("florida") || q.includes("tampa")) {
      return "Dla większości lokalizacji na Florydzie UCS rekomenduje port Savannah — zwykle szybciej i korzystniej niż Miami. Jeśli trasa wymaga potwierdzenia, najlepiej wysłać zapytanie przez WhatsApp.";
    }
    if (q.includes("wa") || q.includes("washington") || q.includes("bos") || q.includes("title")) {
      return "WA BOS oznacza, że auto z Washington może wymagać wyrobienia nowego title do eksportu/rejestracji w Europie. W kalkulatorze broker może zaznaczyć WA BOS / nowe TITLE, co dolicza dodatkową opłatę.";
    }
    if (q.includes("hazmat") || q.includes("electric") || q.includes("hybrid") || q.includes("tesla")) {
      return "Auta elektryczne i hybrydowe mogą wymagać opłaty HAZMAT. W panelu brokera zaznacz HAZMAT / Electric / Hybrid, a system doliczy $300.";
    }
    if (q.includes("carfax") || q.includes("vin")) {
      return "Zalogowany broker może użyć sekcji Sprawdź CARFAX, wkleić VIN i wysłać go bezpośrednio do UCS przez WhatsApp.";
    }
    if (q.includes("broker") || q.includes("hurt") || q.includes("login")) {
      return "Panel HURT jest dostępny tylko dla zatwierdzonych brokerów UCS. Po zalogowaniu broker widzi swoje ceny i dodatkowe narzędzia.";
    }
    if (q.includes("copart") || q.includes("iaa")) {
      return "UCS pomaga klientom i brokerom w zakupach aut z Copart, IAA, Manheim i Adesa.";
    }

    if (q.includes("kontener")) {
      return "UCS pomaga śledzić kontenery i status transportu aż do Europy.";
    }

    if (q.includes("1 z 3") || q.includes("bezpie")) {
      return "Transport 1 z 3 jest zwykle bezpieczniejszy dla większych i droższych pojazdów.";
    }

    if (q.includes("części")) {
      return "Tak — UCS wysyła również części samochodowe, motocykle, ATV i pojazdy specjalne.";
    }

    if (q.includes("odpraw")) {
      return "Tak — pomagamy z odprawami celnymi i dokumentami eksportowymi w Europie.";
    }

    if (q.includes("dom")) {
      return "Tak — możemy zorganizować dostawę pojazdu pod wskazany adres.";
    }

    if (q.includes("kod")) {
      return "Tak — partnerzy UCS mogą otrzymać dostęp do kodów licytacyjnych.";
    }

    return "Mogę pomóc z wyborem portu, routingiem, HAZMAT, WA BOS/title, CARFAX i kontaktem z UCS. Jeśli pytanie wymaga indywidualnej wyceny, wyślij je do UCS przez WhatsApp.";
  }

  function handleAiAsk(customQuestion) {
    const question = customQuestion || aiInput;
    if (!question.trim()) return;
    const answer = getAiAnswer(question);
    setAiMessages((current) => [
      ...current,
      { role: "user", text: question },
      { role: "assistant", text: answer },
    ]);
    setAiInput("");
  }

  const aiWhatsappMessage = encodeURIComponent(
    `PYTANIE DO UCS AI / ADMINA\n` +
      `Pytanie: ${aiInput}\n` +
      `Tryb: ${mode}\n` +
      `Broker: ${activeBroker?.name || "niezalogowany"}`
  );

  const addCarWhatsappMessage = encodeURIComponent(
    `DODAJ AUTO DO UCS MARKETPLACE\n` +
      `Broker: ${activeBroker?.name || ""}\n` +
      `Proszę dodać auto do sprzedaży.`
  );

  function marketplaceWhatsappMessage(car) {
    return encodeURIComponent(
      `PYTANIE O AUTO Z UCS MARKETPLACE\n` +
        `Auto: ${car.title}\n` +
        `VIN: ${car.vin}\n` +
        `LOT: ${car.lot}\n` +
        `Cena widoczna dla brokera: $${car.price}\n` +
        `Kontakt: ${car.brokerName}`
    );
  }

  const filteredMarketplaceCars = MARKETPLACE_CARS.filter((car) => {
    const search = marketplaceSearch.toLowerCase();
    return (
      car.make.toLowerCase().includes(search) ||
      car.model.toLowerCase().includes(search) ||
      String(car.year).includes(search) ||
      car.vin.toLowerCase().includes(search)
    );
  });

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

          <p className="mt-2 text-slate-600"></p>

          <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-3 rounded-3xl bg-slate-100 p-3 md:flex-row">
            

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

        {mode === "retail" && (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow">
            <h3 className="text-2xl font-bold text-slate-900">
              {t.quoteRequestTitle}
            </h3>

            <p className="mt-2 text-slate-600">
              Wypełnij dane auta, a WhatsApp otworzy gotową wiadomość do UCS.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <select
                className="rounded-xl border p-4 text-lg text-slate-900"
                value={quoteAuction}
                onChange={(e) => setQuoteAuction(e.target.value)}
              >
                <option>IAA</option>
                <option>Copart</option>
                <option>Manheim</option>
                <option>Adesa</option>
                <option>Progi</option>
                <option>NPA</option>
              </select>

              <input
                className="rounded-xl border p-4 text-lg text-slate-900"
                value={quoteLot}
                onChange={(e) => setQuoteLot(e.target.value)}
                placeholder={t.quoteLot}
              />

              <input
                className="rounded-xl border p-4 text-lg text-slate-900"
                value={quoteNote}
                onChange={(e) => setQuoteNote(e.target.value)}
                placeholder={t.quoteNote}
              />
            </div>

            <a
              className="mt-5 inline-block rounded-2xl bg-green-600 px-6 py-4 text-lg font-bold text-white shadow hover:bg-green-700"
              href={`https://wa.me/19412505868?text=${publicQuoteWhatsappMessage}`}
              target="_blank"
            >
              {t.quoteWhatsapp}
            </a>
          </div>
        )}

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

          <select
            className="w-full rounded-xl border p-4 text-lg"
            value={packing}
            onChange={(e) => setPacking(e.target.value)}
          >
            <option value="1 z 3">{t.packing3}</option>
            <option value="1 z 4">{t.packing4}</option>
          </select>

          {mode === "wholesale" && (
            <>
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
            </>
          )}

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
              {t.carfaxTitle}
            </h3>

            <p className="mt-2 text-slate-600">
              Wyślij VIN przez WhatsApp, aby szybko sprawdzić CARFAX przed licytacją.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                className="rounded-xl border p-4 text-lg text-slate-900"
                value={carfaxVin}
                onChange={(e) => setCarfaxVin(e.target.value)}
                placeholder={t.carfaxVin}
              />

              <a
                className="inline-block rounded-2xl bg-green-600 px-6 py-4 text-center text-lg font-bold text-white shadow hover:bg-green-700"
                href={`https://wa.me/19412505868?text=${carfaxWhatsappMessage}`}
                target="_blank"
              >
                {t.carfaxWhatsapp}
              </a>
            </div>
          </div>
        )}

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


        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-3xl font-bold text-slate-900">
                {t.marketplaceTitle || "Auta na sprzedaż"}
              </h3>
              <p className="mt-2 max-w-3xl text-slate-600">
                Wybrane oferty dostępne w sieci brokerów UCS.
              </p>
            </div>

            <button
              onClick={() => setMarketplaceOpen(!marketplaceOpen)}
              className="rounded-2xl bg-slate-900 px-6 py-4 font-bold text-white shadow"
            >
              {marketplaceOpen ? "Zamknij auta" : "Otwórz auta na sprzedaż"}
            </button>
          </div>

          {marketplaceOpen && (
            <div className="mt-6 rounded-3xl bg-slate-50 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <input
                  className="w-full rounded-2xl border p-4 text-lg text-slate-900 md:max-w-xl"
                  value={marketplaceSearch}
                  onChange={(e) => setMarketplaceSearch(e.target.value)}
                  placeholder="Szukaj: marka, model, rok, VIN"
                />

                {mode === "wholesale" && activeBroker && (
                  <a
                    className="rounded-2xl bg-slate-900 px-5 py-4 text-center font-bold text-white shadow"
                    href={`https://wa.me/19412505868?text=${addCarWhatsappMessage}`}
                    target="_blank"
                  >
                    {t.marketplaceAdd || "+ Dodaj auto"}
                  </a>
                )}
              </div>

              <div className="mt-5 grid gap-4">
                {filteredMarketplaceCars.map((car) => (
                  <div
                    key={car.id}
                    className="grid gap-4 rounded-3xl border bg-white p-4 shadow-sm md:grid-cols-[180px_1fr_auto]"
                  >
                    <img
                      src={car.images[0]}
                      alt={car.title}
                      className="h-36 w-full rounded-2xl object-cover md:w-44"
                    />

                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                        {car.auction} • LOT {car.lot}
                      </p>
                      <h4 className="mt-1 text-2xl font-extrabold text-slate-900">
                        {car.title}
                      </h4>
                      <p className="mt-1 text-slate-600">VIN: {car.vin}</p>
                      <p className="mt-1 text-slate-600">
                        {car.mileage} • {car.engine} • {car.location}
                      </p>

                      {mode === "wholesale" ? (
                        <p className="mt-2 text-xl font-extrabold text-emerald-700">
                          ${car.price.toLocaleString("en-US")}
                        </p>
                      ) : (
                        <p className="mt-2 font-bold text-slate-900">
                          Cena dostępna po kontakcie
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedMarketplaceCar(car)}
                      className="rounded-2xl bg-blue-600 px-5 py-4 font-bold text-white"
                    >
                      Zobacz auto
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedMarketplaceCar && (
            <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/70 p-4">
              <div className="mx-auto max-w-6xl rounded-3xl bg-white p-5 shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                      {selectedMarketplaceCar.auction} • LOT {selectedMarketplaceCar.lot}
                    </p>
                    <h3 className="mt-2 text-3xl font-extrabold text-slate-900">
                      {selectedMarketplaceCar.title}
                    </h3>
                    <p className="text-slate-600">VIN: {selectedMarketplaceCar.vin}</p>
                  </div>

                  <button
                    onClick={() => setSelectedMarketplaceCar(null)}
                    className="rounded-full bg-slate-100 px-4 py-2 text-xl font-bold text-slate-900"
                  >
                    ×
                  </button>
                </div>

                <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <img
                      src={selectedMarketplaceCar.images[0]}
                      alt={selectedMarketplaceCar.title}
                      className="h-[420px] w-full rounded-3xl object-cover"
                    />
                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {selectedMarketplaceCar.images.slice(1, 9).map((image) => (
                        <img
                          key={image}
                          src={image}
                          alt={selectedMarketplaceCar.title}
                          className="h-24 w-full rounded-xl object-cover"
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="rounded-3xl bg-slate-50 p-5">
                      {mode === "wholesale" ? (
                        <>
                          <p className="text-xs font-bold uppercase text-slate-500">
                            Cena brokera
                          </p>
                          <p className="mt-1 text-4xl font-extrabold text-emerald-700">
                            ${selectedMarketplaceCar.price.toLocaleString("en-US")}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-xs font-bold uppercase text-slate-500">
                            Cena dostępna po kontakcie
                          </p>
                          <p className="mt-1 text-xl font-bold text-slate-900">
                            WhatsApp UCS
                          </p>
                        </>
                      )}
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <p className="rounded-xl bg-slate-50 p-3"><b>Przebieg:</b> {selectedMarketplaceCar.mileage}</p>
                      <p className="rounded-xl bg-slate-50 p-3"><b>Silnik:</b> {selectedMarketplaceCar.engine}</p>
                      <p className="rounded-xl bg-slate-50 p-3"><b>Paliwo:</b> {selectedMarketplaceCar.fuel}</p>
                      <p className="rounded-xl bg-slate-50 p-3"><b>Napęd:</b> {selectedMarketplaceCar.drive}</p>
                      <p className="rounded-xl bg-slate-50 p-3"><b>Lokalizacja:</b> {selectedMarketplaceCar.location}</p>
                      <p className="rounded-xl bg-slate-50 p-3"><b>Port:</b> {selectedMarketplaceCar.destination}</p>
                      <p className="rounded-xl bg-slate-50 p-3"><b>Title:</b> {selectedMarketplaceCar.titleStatus}</p>
                      <p className="rounded-xl bg-slate-50 p-3"><b>Uszkodzenie:</b> {selectedMarketplaceCar.damage}</p>
                    </div>

                    <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                      <p className="font-bold text-slate-900">Opis ceny</p>
                      <p className="mt-1 text-slate-700">{selectedMarketplaceCar.description}</p>
                    </div>

                    <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                      <p className="font-bold text-slate-900">CARFAX</p>
                      <p className="mt-1 text-slate-700">{selectedMarketplaceCar.carfaxSummary}</p>
                      <a
                        className="mt-3 inline-block rounded-xl bg-blue-600 px-4 py-3 font-bold text-white"
                        href={selectedMarketplaceCar.carfaxPdf}
                        target="_blank"
                      >
                        Otwórz CARFAX PDF
                      </a>
                    </div>

                    <a
                      className="mt-5 inline-block rounded-2xl bg-green-600 px-6 py-4 text-lg font-bold text-white shadow hover:bg-green-700"
                      href={`https://wa.me/${selectedMarketplaceCar.brokerPhone}?text=${marketplaceWhatsappMessage(selectedMarketplaceCar)}`}
                      target="_blank"
                    >
                      Zapytaj o auto WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>


        <div className="mt-6 rounded-3xl border border-blue-200 bg-blue-50 p-5 text-blue-950">
          <h3 className="text-xl font-extrabold">TEST ASSETÓW UCS</h3>
          <p className="mt-2 text-sm">
            Jeśli poniżej widzisz zdjęcie auta i link CARFAX działa, folder public jest wgrany poprawnie.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="mb-2 font-bold">Test zdjęcia:</p>
              <img
                src="/uploads/pacifica-01.jpeg"
                alt="Test Pacifica"
                className="h-48 w-full rounded-xl object-cover"
              />
              <p className="mt-2 text-xs text-slate-600">Ścieżka: /uploads/pacifica-01.jpeg</p>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="mb-2 font-bold">Test CARFAX PDF:</p>
              <a
                href="/docs/pacifica-carfax.pdf"
                target="_blank"
                className="inline-block rounded-xl bg-blue-600 px-4 py-3 font-bold text-white"
              >
                Otwórz testowy CARFAX
              </a>
              <p className="mt-2 text-xs text-slate-600">Ścieżka: /docs/pacifica-carfax.pdf</p>
            </div>
          </div>
        </div>

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
            href={websiteUrl}
            target="_blank"
            className="rounded-2xl border bg-white p-5 text-center shadow-sm hover:bg-slate-50"
          >
            <p className="text-sm font-semibold text-slate-500">{t.website}</p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              {websiteLabel}
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
            <p className="mt-1 text-lg font-bold">UCS Logistics Team</p>
          </a>
        </div>
      </section>
      <div className="fixed bottom-5 right-5 z-50 max-w-[92vw]">
        {aiOpen && (
          <div className="mb-4 w-[360px] max-w-[92vw] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="bg-slate-900 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl">🤖</div>
                <div>
                  <p className="font-bold">{t.aiFloatTitle}</p>
                  <p className="text-sm text-slate-300">{t.aiFloatSubtitle}</p>
                </div>
                <button onClick={() => setAiOpen(false)} className="ml-auto rounded-full bg-white/10 px-3 py-1 text-sm">×</button>
              </div>
            </div>

            <div className="max-h-80 space-y-3 overflow-y-auto p-4 text-sm">
              <div className="rounded-2xl bg-slate-100 p-3 text-slate-800">{t.aiHello}</div>
              {aiMessages.map((message, index) => (
                <div key={index} className={`rounded-2xl p-3 ${message.role === "user" ? "ml-8 bg-blue-600 text-white" : "mr-8 bg-slate-100 text-slate-800"}`}>
                  {message.text}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 border-t p-3">
              <button onClick={() => handleAiAsk(t.aiQuickPort)} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">{t.aiQuickPort}</button>
              <button onClick={() => handleAiAsk(t.aiQuickTitle)} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">{t.aiQuickTitle}</button>
              <button onClick={() => handleAiAsk(t.aiQuickHazmat)} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">{t.aiQuickHazmat}</button>
              <button onClick={() => handleAiAsk("Jak działa Copart / IAA?")} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">Copart / IAA</button>
              <button onClick={() => handleAiAsk("Jak śledzić kontener?")} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">Śledzenie kontenera</button>
              <button onClick={() => handleAiAsk("Czy 1 z 3 jest bezpieczniejsze?")} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">Bezpieczne pakowanie</button>
              <button onClick={() => handleAiAsk("Czy wysyłacie części?")} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">Części</button>
              <button onClick={() => handleAiAsk("Czy pomagacie z odprawą?")} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">Odprawy</button>
              <button onClick={() => handleAiAsk("Czy dostarczacie pod dom?")} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">Dostawa pod dom</button>
              <button onClick={() => handleAiAsk("Czy dajecie kody do licytacji?")} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">Kody do licytacji</button>
              <button onClick={() => handleAiAsk("Czy sprawdzacie CARFAX?")} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">CARFAX</button>
            </div>

            <div className="border-t p-3">
              <div className="flex gap-2">
                <input className="min-w-0 flex-1 rounded-xl border p-3 text-sm text-slate-900" value={aiInput} onChange={(e) => setAiInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleAiAsk(); }} placeholder={t.aiQuestionPlaceholder} />
                <button onClick={() => handleAiAsk()} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">{t.aiSend}</button>
              </div>
              <a className="mt-3 block rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-bold text-white" href={`https://wa.me/19412505868?text=${aiWhatsappMessage}`} target="_blank">{t.aiWhatsapp}</a>
            </div>
          </div>
        )}

        <button onClick={() => setAiOpen(!aiOpen)} className="flex items-center gap-3 rounded-full bg-slate-900 px-5 py-4 font-bold text-white shadow-2xl">
          <span className="text-2xl">🤖</span>
          <span>{t.aiFloatTitle}</span>
        </button>
      </div>

    </main>
  );
}
