/* Typing effect for titles with cancellation when language changes */
let languageChangeToken = 0; // incremented on each language change to cancel ongoing typings
let mottoTimeoutId = null;

function typeWriter(element, text, speed = 100, token = languageChangeToken) {
    let i = 0;
    const typeId = String(Date.now() + Math.random());
    element.dataset.typeId = typeId;
    element.textContent = '';
    
    function type() {
        // Abort if language changed or a newer typing session started for this element
        if (token !== languageChangeToken || element.dataset.typeId !== typeId) return;
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Start or restart typing animations for key heading elements
function startTypingAnimations(lang) {
    const titleElement = document.querySelector('.section-title');
    const mottoElement = document.querySelector('.restaurant-motto');

    if (titleElement) {
        const titleText = (translations[lang] && translations[lang]['our-menu'])
            ? translations[lang]['our-menu']
            : titleElement.textContent;
        typeWriter(titleElement, titleText, 150, languageChangeToken);
    }

    if (mottoElement) {
        const mottoText = (translations[lang] && translations[lang]['restaurant-motto'])
            ? translations[lang]['restaurant-motto']
            : mottoElement.textContent;
        const localToken = languageChangeToken;
        if (mottoTimeoutId) {
            clearTimeout(mottoTimeoutId);
            mottoTimeoutId = null;
        }
        // Small delay so the motto begins after the title starts
        mottoTimeoutId = setTimeout(() => {
            if (localToken === languageChangeToken) {
                typeWriter(mottoElement, mottoText, 120, localToken);
            }
        }, 400);
    }
}

// Translation data
const translations = {
    he: {
        // Navigation
        'logo': 'מטבח של אמא',
        'menu': 'תפריט',
        'contact': 'צור קשר',
        
        'page-title': 'מטבח של אמא - בישול ביתי אותנטי',
        
        // Menu section
        'our-menu': 'התפריט שלנו',
        'restaurant-motto': 'אוכל מזרחי ביתי',
        'all': 'הכל',
        'meals': 'ארוחות',
        'additions': 'תוספות',
        'drinks': 'משקאות',
        
        // Menu items
        'rice-meat-salad': '200 גרם אורז + בשר + סלט',
        'rice-meat-salad-desc': 'ארוחה מלאה עם אורז לבן, בשר טרי וסלט טרי',
        'rice-meat-meat-salad': '200 גרם אורז עם בשר + בשר + סלט',
        'rice-meat-meat-salad-desc': 'ארוחה עשירה עם אורז מבושל עם בשר, בשר נוסף וסלט',
        'gulash': 'גולש 150 גרם',
        'gulash-desc': 'בשר גולש טרי וטעים',
        'chicken-breast': 'חזה עוף 150 גרם',
        'chicken-breast-desc': 'חזה עוף טרי ועסיסי',
        'chicken-thighs': 'כרעיים 150 גרם',
        'chicken-thighs-desc': 'כרעיים טריים וטעימים',
        'stir-fried-noodles': 'מוקפץ פתריות',
        'stir-fried-noodles-desc': 'פתריות מוקפצות עם ירקות טריים',
        'grape-leaves': 'עלי גפן 8 יחידות',
        'grape-leaves-desc': 'עלי גפן ממולאים באורז ועשבי תיבול',
        'stuffed-cabbage': 'קרוב ממולא 8 יחידות',
        'stuffed-cabbage-desc': 'קרוב ממולא באורז ותבלינים',
        'kubbeh': 'קובה 2 יחידות',
        'kubbeh-desc': 'קובה טרייה ממולאת בבשר',
        'mujadara': 'מגדרה 150 גרם',
        'mujadara-desc': 'מגדרה טרייה וטעימה',
        'bean-soup': 'מרק שעועית/תפוח אדמה',
        'bean-soup-desc': 'מרק ביתי טעים וחם',
        'chopped-salad': 'סלט קצוץ',
        'chopped-salad-desc': 'סלט ירקות טרי קצוץ דק',
        'tabbouleh': 'סלט טבולה',
        'tabbouleh-desc': 'סלט טבולה מסורתי עם בורגול ועשבי תיבול',
        'potato': 'תפוח אדמה/בטטה',
        'potato-desc': 'תפוח אדמה או בטטה צלויים',
        'white-rice': 'אורז לבן 200 גרם',
        'white-rice-desc': 'אורז לבן טרי וטעים',
        'meat-rice': 'אורז בשר 200 גרם',
        'meat-rice-desc': 'אורז מבושל עם בשר טרי',
        'soft-drinks': 'שתיה קלה',
        'soft-drinks-desc': 'מבחר משקאות קלים',
        'mineral-water': 'מים מינרליים',
        'mineral-water-desc': 'מים מינרליים טריים',

        // Promo
        'discount-title': 'מבצע מיוחד',
        'discount-desc': '10% הנחה לעובדי מדינה או לובשי מדים',
        
        // Contact section
        'visit-us': 'בואו לבקר אותנו',
        'contact-form-title': 'צרו איתנו קשר',
        'form-description': 'מלאו את הפרטים הבאים ונחזור אליכם בהקדם',
        'basic-info-title': 'פרטים בסיסיים',
        'name-label': 'שם מלא *',
        'phone-label': 'מספר טלפון *',
        'request-type-title': 'סוג הבקשה',
        'subject-label': 'מה אתם רוצים לעשות? *',
        'select-subject': 'בחרו את סוג הבקשה',
        'reservation': '🍽️ הזמנת שולחן במסעדה',
        'delivery': '🚚 הזמנת משלוח הביתה',
        'job-application': '💼 הגשת מועמדות לעבודה',
        'complaint': '😞 תלונה או בעיה',
        'suggestion': '💡 הצעה לשיפור',
        'other': '❓ משהו אחר',
        'delivery-details-title': 'פרטי משלוח',
        'delivery-address-label': 'כתובת למשלוח *',
        'job-details-title': 'פרטי עבודה',
        'experience-label': 'שנות ניסיון',
        'select-experience': 'בחרו שנות ניסיון',
        'no-experience': 'ללא ניסיון',
        '1-2-years': '1-2 שנים',
        '3-5-years': '3-5 שנים',
        '5-plus-years': '5+ שנים',
        'position-label': 'תפקיד מבוקש',
        'select-position': 'בחרו תפקיד',
        'waiter': 'מלצר/ית',
        'cook': 'טבח/ית',
        'cashier': 'קופאי/ת',
        'manager': 'מנהל/ת',
        'delivery-person': 'שליח/ה',
        'availability-label': 'זמינות',
        'select-availability': 'בחרו זמינות',
        'full-time': 'משרה מלאה',
        'part-time': 'משרה חלקית',
        'weekends': 'סופי שבוע בלבד',
        'evenings': 'ערבים בלבד',
        'message-title': 'הודעה',
        'message-label': 'ספרו לנו מה אתם צריכים *',
        'send-message': '📤 שלח בקשה',
        'success-message': 'תודה רבה! הבקשה שלכם נשלחה בהצלחה. נחזור אליכם תוך 24 שעות.',
        'address': 'כתובת',
        'address-text': 'נתנזן 11 חיפה',
        'hours': 'שעות פעילות',
        'hours-text': 'ראשון - חמישי: 11:00 - 22:00<br>שישי - שבת: 11:00 - 23:00<br>יום ראשון: 12:00 - 21:00',
        'phone': 'טלפון'
    },
    en: {
        // Navigation
        'logo': 'Mama\'s Kitchen',
        'menu': 'Menu',
        'contact': 'Contact',
        'page-title': 'Mama\'s Kitchen - Authentic Middle Eastern Home Cooking',
        
        // Menu section
        'our-menu': 'Our Menu',
        'restaurant-motto': 'Authentic Middle Eastern Home Cooking',
        'all': 'All',
        'meals': 'Meals',
        'additions': 'Additions',
        'drinks': 'Drinks',
        
        // Menu items
        'rice-meat-salad': '200g Rice + Meat + Salad',
        'rice-meat-salad-desc': 'Complete meal with white rice, fresh meat and fresh salad',
        'rice-meat-meat-salad': '200g Rice with Meat + Meat + Salad',
        'rice-meat-meat-salad-desc': 'Rich meal with rice cooked with meat, additional meat and salad',
        'gulash': 'Goulash 150g',
        'gulash-desc': 'Fresh and tasty goulash meat',
        'chicken-breast': 'Chicken Breast 150g',
        'chicken-breast-desc': 'Fresh and juicy chicken breast',
        'chicken-thighs': 'Chicken Drumsticks 150g',
        'chicken-thighs-desc': 'Fresh and tasty chicken drumsticks',
        'stir-fried-noodles': 'Stir-fried Noodles',
        'stir-fried-noodles-desc': 'Stir-fried noodles with fresh vegetables',
        'grape-leaves': 'Grape Leaves 8 pieces',
        'grape-leaves-desc': 'Grape leaves stuffed with rice and herbs',
        'stuffed-cabbage': 'Stuffed Cabbage 8 pieces',
        'stuffed-cabbage-desc': 'Cabbage stuffed with rice and spices',
        'kubbeh': 'Kubbeh 2 pieces',
        'kubbeh-desc': 'Fresh kubbeh stuffed with meat',
        'mujadara': 'Mujadara 150g',
        'mujadara-desc': 'Fresh and tasty mujadara',
        'bean-soup': 'Bean/Potato Soup',
        'bean-soup-desc': 'Tasty and hot homemade soup',
        'chopped-salad': 'Chopped Salad',
        'chopped-salad-desc': 'Fresh vegetables finely chopped',
        'tabbouleh': 'Tabbouleh Salad',
        'tabbouleh-desc': 'Traditional tabbouleh with bulgur and herbs',
        'potato': 'Potato/Sweet Potato',
        'potato-desc': 'Roasted potato or sweet potato',
        'white-rice': 'White Rice 200g',
        'white-rice-desc': 'Fresh and tasty white rice',
        'meat-rice': 'Meat Rice 200g',
        'meat-rice-desc': 'Rice cooked with fresh meat',
        'soft-drinks': 'Soft Drinks',
        'soft-drinks-desc': 'Selection of soft drinks',
        'mineral-water': 'Mineral Water',
        'mineral-water-desc': 'Fresh mineral water',

        // Promo
        'discount-title': 'Special Offer',
        'discount-desc': '10% discount for state employees or uniformed personnel',
        
        // Contact section
        'visit-us': 'Visit Us',
        'contact-form-title': 'Contact Us',
        'name-label': 'Full Name:',
        'phone-label': 'Phone:',
        'subject-label': 'Subject:',
        'select-subject': 'Select Subject',
        'reservation': 'Table Reservation',
        'delivery': 'Delivery Order',
        'delivery-address-label': 'Delivery Address:',
        'complaint': 'Complaint',
        'suggestion': 'Suggestion',
        'other': 'Other',
        'message-label': 'Message:',
        'send-message': 'Send Message',
        'success-message': 'Thank you! Your message has been sent successfully. We will get back to you soon.',
        'address': 'Address',
        'address-text': '123 Herzl Street<br>Tel Aviv, Israel 12345',
        'hours': 'Hours',
        'hours-text': 'Sunday - Thursday: 11:00 - 22:00<br>Friday - Saturday: 11:00 - 23:00<br>Sunday: 12:00 - 21:00',
        'phone': 'Phone'
    },
    ru: {
        // Navigation
        'logo': 'Мамина Кухня',
        'menu': 'Меню',
        'contact': 'Контакты',
        'page-title': 'Мамина Кухня - Аутентичная домашняя ближневосточная кухня',
        
        // Menu section
        'our-menu': 'Наше Меню',
        'restaurant-motto': 'Аутентичная домашняя ближневосточная кухня',
        'all': 'Все',
        'meals': 'Блюда',
        'additions': 'Дополнения',
        'drinks': 'Напитки',
        
        // Menu items
        'rice-meat-salad': '200г Риса + Мясо + Салат',
        'rice-meat-salad-desc': 'Полная еда с белым рисом, свежим мясом и свежим салатом',
        'rice-meat-meat-salad': '200г Риса с Мясом + Мясо + Салат',
        'rice-meat-meat-salad-desc': 'Богатая еда с рисом, приготовленным с мясом, дополнительным мясом и салатом',
        'gulash': 'Гуляш 150г',
        'gulash-desc': 'Свежее и вкусное мясо гуляша',
        'chicken-breast': 'Куриная Грудка 150г',
        'chicken-breast-desc': 'Свежая и сочная куриная грудка',
        'chicken-thighs': 'Куриные Голени 150г',
        'chicken-thighs-desc': 'Свежие и вкусные куриные голени',
        'stir-fried-noodles': 'Жареная Лапша',
        'stir-fried-noodles-desc': 'Жареная лапша со свежими овощами',
        'grape-leaves': 'Виноградные Листья 8 штук',
        'grape-leaves-desc': 'Виноградные листья, фаршированные рисом и травами',
        'stuffed-cabbage': 'Фаршированная Капуста 8 штук',
        'stuffed-cabbage-desc': 'Капуста, фаршированная рисом и специями',
        'kubbeh': 'Куббе 2 штуки',
        'kubbeh-desc': 'Свежий куббе, фаршированный мясом',
        'mujadara': 'Муджадара 150г',
        'mujadara-desc': 'Свежая и вкусная муджадара',
        'bean-soup': 'Суп из Фасоли/Картофеля',
        'bean-soup-desc': 'Вкусный и горячий домашний суп',
        'chopped-salad': 'Нарезанный Салат',
        'chopped-salad-desc': 'Свежие овощи, мелко нарезанные',
        'tabbouleh': 'Салат Табуле',
        'tabbouleh-desc': 'Традиционный табуле с булгуром и травами',
        'potato': 'Картофель/Батат',
        'potato-desc': 'Запеченный картофель или батат',
        'white-rice': 'Белый Рис 200г',
        'white-rice-desc': 'Свежий и вкусный белый рис',
        'meat-rice': 'Рис с Мясом 200г',
        'meat-rice-desc': 'Рис, приготовленный со свежим мясом',
        'soft-drinks': 'Безалкогольные Напитки',
        'soft-drinks-desc': 'Выбор безалкогольных напитков',
        'mineral-water': 'Минеральная Вода',
        'mineral-water-desc': 'Свежая минеральная вода',

        // Promo
        'discount-title': 'Специальное предложение',
        'discount-desc': 'Скидка 10% для госслужащих или сотрудников в форме',
        
        // Contact section
        'visit-us': 'Посетите Нас',
        'contact-form-title': 'Свяжитесь с Нами',
        'name-label': 'Полное Имя:',
        'phone-label': 'Телефон:',
        'subject-label': 'Тема:',
        'select-subject': 'Выберите Тему',
        'reservation': 'Бронирование Столика',
        'delivery': 'Заказ Доставки',
        'delivery-address-label': 'Адрес Доставки:',
        'complaint': 'Жалоба',
        'suggestion': 'Предложение',
        'other': 'Другое',
        'message-label': 'Сообщение:',
        'send-message': 'Отправить Сообщение',
        'success-message': 'Спасибо! Ваше сообщение отправлено успешно. Мы свяжемся с вами в ближайшее время.',
        'address': 'Адрес',
        'address-text': 'ул. Герцль 123<br>Тель-Авив, Израиль 12345',
        'hours': 'Часы Работы',
        'hours-text': 'Воскресенье - Четверг: 11:00 - 22:00<br>Пятница - Суббота: 11:00 - 23:00<br>Воскресенье: 12:00 - 21:00',
        'phone': 'Телефон'
    },
    ar: {
        // Navigation
        'logo': 'مطبخ أمي',
        'menu': 'القائمة',
        'contact': 'اتصل بنا',
        'page-title': 'مطبخ أمي - طعام شرقي منزلي أصيل',
        
        // Menu section
        'our-menu': 'قائمتنا',
        'restaurant-motto': 'طعام شرقي منزلي أصيل',
        'all': 'الكل',
        'meals': 'الوجبات',
        'additions': 'الإضافات',
        'drinks': 'المشروبات',
        
        // Menu items
        'rice-meat-salad': '200 جرام أرز + لحم + سلطة',
        'rice-meat-salad-desc': 'وجبة كاملة مع أرز أبيض ولحم طازج وسلطة طازجة',
        'rice-meat-meat-salad': '200 جرام أرز مع لحم + لحم + سلطة',
        'rice-meat-meat-salad-desc': 'وجبة غنية مع أرز مطبوخ مع لحم ولحم إضافي وسلطة',
        'gulash': 'جولاش 150 جرام',
        'gulash-desc': 'لحم جولاش طازج ولذيذ',
        'chicken-breast': 'صدر دجاج 150 جرام',
        'chicken-breast-desc': 'صدر دجاج طازج وعصير',
        'chicken-thighs': 'سيقان دجاج 150 جرام',
        'chicken-thighs-desc': 'سيقان دجاج طازجة ولذيذة',
        'stir-fried-noodles': 'نودلز مقلية',
        'stir-fried-noodles-desc': 'نودلز مقلية مع خضروات طازجة',
        'grape-leaves': 'أوراق العنب 8 قطع',
        'grape-leaves-desc': 'أوراق عنب محشوة بالأرز والأعشاب',
        'stuffed-cabbage': 'ملفوف محشو 8 قطع',
        'stuffed-cabbage-desc': 'ملفوف محشو بالأرز والتوابل',
        'kubbeh': 'كبة 2 قطع',
        'kubbeh-desc': 'كبة طازجة محشوة باللحم',
        'mujadara': 'مجدرة 150 جرام',
        'mujadara-desc': 'مجدرة طازجة ولذيذة',
        'bean-soup': 'شوربة فاصوليا/بطاطا',
        'bean-soup-desc': 'شوربة منزلية لذيذة وساخنة',
        'chopped-salad': 'سلطة مقطعة',
        'chopped-salad-desc': 'خضروات طازجة مقطعة ناعماً',
        'tabbouleh': 'سلطة تبولة',
        'tabbouleh-desc': 'تبولة تقليدية مع البرغل والأعشاب',
        'potato': 'بطاطا/بطاطا حلوة',
        'potato-desc': 'بطاطا أو بطاطا حلوة مشوية',
        'white-rice': 'أرز أبيض 200 جرام',
        'white-rice-desc': 'أرز أبيض طازج ولذيذ',
        'meat-rice': 'أرز مع لحم 200 جرام',
        'meat-rice-desc': 'أرز مطبوخ مع لحم طازج',
        'soft-drinks': 'مشروبات غازية',
        'soft-drinks-desc': 'اختيار من المشروبات الغازية',
        'mineral-water': 'مياه معدنية',
        'mineral-water-desc': 'مياه معدنية طازجة',

        // Promo
        'discount-title': 'عرض خاص',
        'discount-desc': 'خصم 10% لموظفي الدولة أو أصحاب الزي الرسمي',
        
        // Contact section
        'visit-us': 'قم بزيارتنا',
        'contact-form-title': 'اتصل بنا',
        'name-label': 'الاسم الكامل:',
        'phone-label': 'الهاتف:',
        'subject-label': 'الموضوع:',
        'select-subject': 'اختر الموضوع',
        'reservation': 'حجز طاولة',
        'delivery': 'طلب توصيل',
        'delivery-address-label': 'عنوان التوصيل:',
        'complaint': 'شكوى',
        'suggestion': 'اقتراح',
        'other': 'أخرى',
        'message-label': 'الرسالة:',
        'send-message': 'إرسال الرسالة',
        'success-message': 'شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.',
        'address': 'العنوان',
        'address-text': 'شارع هرتسل 123<br>تل أبيب، إسرائيل 12345',
        'hours': 'ساعات العمل',
        'hours-text': 'الأحد - الخميس: 11:00 - 22:00<br>الجمعة - السبت: 11:00 - 23:00<br>الأحد: 12:00 - 21:00',
        'phone': 'الهاتف'
    }
};

// Current language (default Hebrew)
let currentLanguage = 'he';

// Translation function
function translatePage(language) {
    currentLanguage = language;

    // Bump token to cancel any ongoing typing when language changes
    languageChangeToken++;
    // Clear any pending typing timers
    if (mottoTimeoutId) {
        clearTimeout(mottoTimeoutId);
        mottoTimeoutId = null;
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = language;
    
    // Set text direction based on language
    if (language === 'ar' || language === 'he') {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }
    
    // Always set page title in English regardless of selected language
    document.title = 'Mama’s Kitchen';
    
    // Translate all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            element.innerHTML = translations[language][key];
        }
    });

    // Ensure site brand title (visible logo) stays in English
    const logoEl = document.querySelector('.logo');
    if (logoEl) {
        logoEl.textContent = 'Mama’s Kitchen';
    }

    // Restart typing animations for the new language
    startTypingAnimations(language);
    
    // Save language preference
    localStorage.setItem('selectedLanguage', language);
}

// Language selector event listener
document.addEventListener('DOMContentLoaded', () => {
    const languageButtons = document.querySelectorAll('.lang-btn');
    
    if (languageButtons.length > 0) {
        // Load saved language preference
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'he';
        
        // Set active button
        languageButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === savedLanguage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        translatePage(savedLanguage);
        
        // Add click event listeners
        languageButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                languageButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const language = btn.getAttribute('data-lang');
                translatePage(language);
            });
        });
    }
});

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const categoryBtns = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');
const navLinks = document.querySelectorAll('.nav-menu a');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for menu interactions
        } else {
            // Swipe down - could be used for menu interactions
        }
    }
}

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Menu Category Filtering with mobile optimization
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        console.log('Selected category:', category);
        
        // Filter menu items with mobile-friendly animations
        menuItems.forEach((item, index) => {
            const itemCategory = item.getAttribute('data-category');
            console.log('Item category:', itemCategory, 'Match:', category === 'all' || itemCategory === category);
            
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
                // Staggered animation for better mobile experience
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                    item.style.display = 'block';
                }, index * 50); // Reduced delay for mobile
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }, 200); // Reduced delay for mobile
            }
        });
        
        // Scroll to menu section on mobile after filtering
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                const menuSection = document.querySelector('#menu');
                if (menuSection) {
                    const offsetTop = menuSection.offsetTop;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.menu-item, .contact-item, .about-text');
animatedElements.forEach(el => {
    observer.observe(el);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Menu item hover effects
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Mobile-optimized scroll effects
let ticking = false;

function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    
    // Only apply effects on desktop
    if (window.innerWidth > 768) {
        // Add any desktop-specific scroll effects here
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Simple image loading - make images visible immediately
const images = document.querySelectorAll('img');
images.forEach(img => {
    // Make images visible immediately
    img.style.opacity = '1';
    img.style.display = 'block';
    console.log('Image src:', img.src);
    
    img.addEventListener('error', () => {
        console.error('Failed to load image:', img.src);
        img.style.background = '#f0f0f0';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        img.style.fontSize = '12px';
        img.style.color = '#666';
        img.alt = 'תמונה לא זמינה';
    });
});

// Form validation (if contact form is added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#d4af37';
        }
    });
    
    return isValid;
}

// Add click effect to buttons
const buttons = document.querySelectorAll('.cta-button, .category-btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize page with mobile optimization
document.addEventListener('DOMContentLoaded', () => {
    // Set initial viewport height for mobile browsers
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    
    // Preload critical images with mobile optimization
    const criticalImages = [
        'images/1758991135427_ub5ndpczg7.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            console.log('Logo preloaded successfully');
        };
        img.onerror = () => {
            console.error('Failed to preload logo:', src);
        };
    });
    
    // Add touch-friendly interactions
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Optimize for mobile performance
    if (window.innerWidth <= 768) {
        // Reduce animation complexity on mobile
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }
    
    // Initialize contact form
    initializeContactForm();
});

// Contact Form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                deliveryAddress: formData.get('deliveryAddress')
            };
            
            // Validate form
            if (validateForm(data)) {
                // Simulate form submission (in real app, send to server)
                submitForm(data);
            }
        });
    }
}

function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('שם מלא חייב להכיל לפחות 2 תווים');
    }
    
    if (!data.phone || data.phone.trim().length < 9) {
        errors.push('מספר טלפון חייב להכיל לפחות 9 ספרות');
    }
    
    if (!data.subject) {
        errors.push('יש לבחור נושא');
    }
    
    // If delivery is selected, validate delivery address
    if (data.subject === 'delivery' && (!data.deliveryAddress || data.deliveryAddress.trim().length < 5)) {
        errors.push('כתובת למשלוח חייבת להכיל לפחות 5 תווים');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('הודעה חייבת להכיל לפחות 10 תווים');
    }
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormErrors(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.form-error');
    existingErrors.forEach(error => error.remove());
    
    // Show new error messages
    errors.forEach(error => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = error;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.5rem';
        
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.parentNode.insertBefore(errorDiv, submitBtn);
    });
}

function submitForm(data) {
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'שולח...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Hide form and show success message
        const contactForm = document.getElementById('contactForm');
        const formSuccess = document.getElementById('formSuccess');
        
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Reset form for next use
        contactForm.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth' });
        
        // Log form data (in real app, send to server)
        console.log('Form submitted:', data);
        
        // Show form again after 5 seconds
        setTimeout(() => {
            contactForm.style.display = 'block';
            formSuccess.style.display = 'none';
        }, 5000);
        
    }, 2000);
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

/* Discount card logic - always visible; 'X' triggers a gentle pulse instead of closing */
document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('discount-card');
    if (!card) return;

    // Always show the banner and ignore any previous dismissal
    try { localStorage.removeItem('discountCardDismissed'); } catch (e) {}
    card.style.display = '';
    card.classList.remove('hide');
    card.classList.add('show');

    const closeBtn = card.querySelector('.discount-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Provide a subtle attention animation instead of hiding
            card.classList.remove('attention'); // reset if already applied
            void card.offsetWidth; // reflow to restart animation
            card.classList.add('attention');
        });
    }
});
