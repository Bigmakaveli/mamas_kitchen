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
    const titleElement = document.querySelector('#menu-title');
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
        'pitas': 'פיתות',
        'additions': 'תוספות',
        'drinks': 'משקאות',
        
        // Menu items
        'rice-meat-salad': 'ארוחה עסקית',
        'rice-meat-salad-desc': 'ארוחה מלאה עם אורז לבן, בשר טרי וסלט טרי',
        'rice-meat-meat-salad': '200 גרם אורז עם בשר + בשר + סלט',
        'rice-meat-meat-salad-desc': 'ארוחה עשירה עם אורז מבושל עם בשר, בשר נוסף וסלט',
        'gulash': 'גולש 150 גרם',
        'gulash-desc': 'בשר גולש טרי וטעים',
        'chicken-breast': 'חזה עוף 150 גרם',
        'chicken-breast-desc': 'חזה עוף טרי ועסיסי',
        'chicken-thighs': 'כרעיים 150 גרם',
        'chicken-thighs-desc': 'כרעיים טריים וטעימים',
        'stir-fried-noodles': 'מוקפץ פטריות',
        'stir-fried-noodles-desc': 'פטריות מוקפצות עם ירקות טריים',
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
        'druze-pita': 'פיתה דרוזיית',
        'druze-pita-desc': 'פיתה דרוזית במילוי לבנה, ירקות טריים ותערובת תבלינים דרוזית.',
        'badge-new': 'חדש',
        'add-to-cart': 'הוסף לעגלה',
        'toast-added': 'נוסף לעגלה: {name} × {qty}',
        'meat-select-title': 'בחר סוג בשר',
        'meat-option-goulash': 'גולש',
        'meat-option-thighs': 'כרעיים',
        'meat-option-veal': 'בשר עגל',
        'meat-option-kebab': 'קבב',
        'confirm': 'אישור',
        'cancel': 'ביטול',

        // Promo
        'discount-title': 'מבצע מיוחד',
        'discount-desc': 'הנחה 7% לאורחי המסעדה',
        'business_meal_soldiers_40': 'ארוחה עסקית רק לחיילים 40₪ !!!!',
        
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
        'hours-text': 'ראשון - שישי: 10:00 - 20:30<br>שבת: סגור',
        'phone': 'טלפון',
        'cart-title': 'הזמנה',
        'cart-empty': 'העגלה ריקה',
        'cart-send-whatsapp': 'שלח בוואטסאפ'
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
        'pitas': 'Pitas',
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
        'druze-pita': 'Druze Pita',
        'druze-pita-desc': 'Druze pita filled with labneh, fresh vegetables and a Druze spice mix.',
        'badge-new': 'New',
        'add-to-cart': 'Add to cart',
        'toast-added': 'Added {qty}× {name} to cart',
        'meat-select-title': 'Choose meat type',
        'meat-option-goulash': 'Goulash',
        'meat-option-thighs': 'Chicken thighs',
        'meat-option-veal': 'Veal',
        'meat-option-kebab': 'Kebab',
        'confirm': 'Confirm',
        'cancel': 'Cancel',
        
        // Promo
        'discount-title': 'Special Offer',
        'discount-desc': '7% discount for restaurant guests',
        'business_meal_soldiers_40': 'Business meal for soldiers only 40₪ !!!!',
        
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
        'address-text': 'נתנזן 11 חיפה',
        'hours': 'Hours',
        'hours-text': 'Sunday - Friday: 10:00 AM - 8:30 PM<br>Saturday: Closed',
        'phone': 'Phone',
        'cart-title': 'Order',
        'cart-empty': 'Your cart is empty',
        'cart-send-whatsapp': 'Send via WhatsApp'
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
        'pitas': 'Питы',
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
        'druze-pita': 'Друзская пита',
        'druze-pita-desc': 'Пита по-друзски с лабне, свежими овощами и друзской смесью специй.',
        'badge-new': 'Новинка',
        'add-to-cart': 'Добавить в корзину',
        'toast-added': 'Добавлено {qty}× {name} в корзину',
        'meat-select-title': 'Выберите тип мяса',
        'meat-option-goulash': 'Гуляш',
        'meat-option-thighs': 'Куриные бедра',
        'meat-option-veal': 'Телятина',
        'meat-option-kebab': 'Кебаб',
        'confirm': 'Подтвердить',
        'cancel': 'Отмена',
        
        // Promo
        'discount-title': 'Специальное предложение',
        'discount-desc': 'Скидка 7% для гостей ресторана',
        'business_meal_soldiers_40': 'Бизнес-обед только для солдат 40₪ !!!!',
        
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
        'address-text': 'נתנזן 11 חיפה',
        'hours': 'Часы Работы',
        'hours-text': 'Воскресенье - Пятница: 10:00 - 20:30<br>Суббота: Закрыто',
        'phone': 'Телефон',
        'cart-title': 'Заказ',
        'cart-empty': 'Корзина пуста',
        'cart-send-whatsapp': 'Отправить через WhatsApp'
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
        'pitas': 'بيتا',
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
        'druze-pita': 'خبز بيتا دروزي',
        'druze-pita-desc': 'خبز بيتا دروزي محشو باللبنة، وخضار طازجة ومزيج توابل دروزي.',
        'badge-new': 'جديد',
        'add-to-cart': 'أضف إلى السلة',
        'toast-added': 'تمت إضافة {qty}× {name} إلى السلة',
        'meat-select-title': 'اختر نوع اللحم',
        'meat-option-goulash': 'جولاش',
        'meat-option-thighs': 'أفخاذ',
        'meat-option-veal': 'לحم عجل',
        'meat-option-kebab': 'كباب',
        'confirm': 'تأكيد',
        'cancel': 'إلغاء',
        
        // Promo
        'discount-title': 'عرض خاص',
        'discount-desc': 'خصم 7% لزبائن المطعم',
        'business_meal_soldiers_40': 'وجبة عمل فقط للجنود 40₪ !!!!',
        
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
        'address-text': 'נתנזן 11 חיפה',
        'hours': 'ساعات العمل',
        'hours-text': 'الأحد - الجمعة: 10:00 - 20:30<br>السبت: مغلق',
        'phone': 'الهاتف',
        'cart-title': 'الطلب',
        'cart-empty': 'سلة التسوق فارغة',
        'cart-send-whatsapp': 'إرسال عبر واتساب'
    }
};

// Menu text translations for the structured menu section
const menuTranslations = {
    ar: {
        dir: 'rtl',
        categories: [
            {
                title: 'مقبلات وسلطات',
                items: [
                    { name: 'سلطة فتّوش', price: '56₪' },
                    { name: 'سلطة تبّولة', price: '50₪' },
                    { name: 'سلطة يونانية', price: '56₪' },
                    { name: 'سلطة صدر دجاج / شنِتزل', price: '67₪' },
                    { name: 'أجنحة بصلصة تشيلي (حلو / حار)', price: '50₪' },
                    { name: 'بطاطا حلوة', price: '22₪' },
                    { name: 'بطاطس مقلية', price: '22₪' },
                    { name: 'مكعبات حلومي مقرمشة', price: '50₪' }
                ]
            },
            {
                title: 'باجيت مع بطاطس',
                items: [
                    { name: 'باجيت صدر دجاج', price: '56₪' },
                    { name: 'باجيت شنِتزل', price: '56₪' },
                    { name: 'باجيت مشكل لحوم', price: '67₪' },
                    { name: 'باجيت كباب', price: '56₪' }
                ]
            },
            {
                title: 'توست مع سلطة مفرومة',
                items: [
                    { name: 'توست جبنة صفراء مع قشدة جبن', price: '50₪' },
                    { name: 'توست مكس جبن וبيستو', price: '50₪' },
                    { name: 'توست بالتشكيل حسب الطلب', price: '56₪' }
                ]
            },
            {
                title: 'ساندويتش مغطّى بالكريمة',
                items: [
                    { name: 'ساندويتش صدر دجاج مكرّم', price: '67₪' },
                    { name: 'ساندويتش شنِتزل مكرّم', price: '67₪' }
                ]
            },
            {
                title: 'طبق + بطاطس/سلطة',
                items: [
                    { name: 'شنِتزل', price: '65₪' },
                    { name: 'صدر دجاج', price: '65₪' },
                    { name: 'كباب', price: '65₪' },
                    { name: 'شنِتزل مكرّم', price: '70₪' },
                    { name: 'صدر دجاج مكرّم', price: '70₪' }
                ]
            },
            {
                title: 'من البيت',
                items: [
                    { name: 'ורق عنب'.replace('ו','و').replace('ר','ر').replace('ق','ق'), price: '25₪' }, // ensure Arabic text only
                    { name: 'كرنب محشي', price: '25₪' },
                    { name: 'كبة', price: '22₪' }
                ]
            }
        ]
    },
    he: {
        dir: 'rtl',
        categories: [
            {
                title: 'ראשונות וסלטים',
                items: [
                    { name: 'סלט פתוש', price: '56₪' },
                    { name: 'סלט טאבולה', price: '50₪' },
                    { name: 'סלט יווני', price: '56₪' },
                    { name: 'סלט חזה עוף / שניצל', price: '67₪' },
                    { name: 'כנפיים ברוטב צ\'ילי (מתוק/חריף)', price: '50₪' },
                    { name: 'בטטה', price: '22₪' },
                    { name: 'צ\'יפס', price: '22₪' },
                    { name: 'קוביות חלומי מטוגנות', price: '50₪' }
                ]
            },
            {
                title: 'בגטים עם צ\'יפס',
                items: [
                    { name: 'באגט חזה עוף', price: '56₪' },
                    { name: 'באגט שניצל', price: '56₪' },
                    { name: 'באגט מעורב בשר', price: '67₪' },
                    { name: 'באגט קבב', price: '56₪' }
                ]
            },
            {
                title: 'טוסטים עם סלט קצוץ',
                items: [
                    { name: 'טוסט גבינה צהובה ושמנת גבינה', price: '50₪' },
                    { name: 'טוסט מיקס גבינות ופסטו', price: '50₪' },
                    { name: 'טוסט בהרכבה', price: '56₪' }
                ]
            },
            {
                title: 'כריך גביטה מוקרם',
                items: [
                    { name: 'חזה עוף מוקרם', price: '67₪' },
                    { name: 'שנצל מוקרם', price: '67₪' }
                ]
            },
            {
                title: 'צלחת + צ\'יפס/סלט',
                items: [
                    { name: 'שניצל', price: '65₪' },
                    { name: 'חזה עוף', price: '65₪' },
                    { name: 'קבב', price: '65₪' },
                    { name: 'שניצל מוקרם', price: '70₪' },
                    { name: 'חזה עוף מוקרם', price: '70₪' }
                ]
            },
            {
                title: 'מהבית',
                items: [
                    { name: 'עלי גפן', price: '25₪' },
                    { name: 'כרוב ממולא', price: '25₪' },
                    { name: 'קובה', price: '22₪' }
                ]
            }
        ]
    },
    ru: {
        dir: 'ltr',
        categories: [
            {
                title: 'Закуски и салаты',
                items: [
                    { name: 'Салат Фатуш', price: '56₪' },
                    { name: 'Салат Табуле', price: '50₪' },
                    { name: 'Греческий салат', price: '56₪' },
                    { name: 'Салат с куриной грудкой / шницель', price: '67₪' },
                    { name: 'Крылышки в чили соусе (сладкие/острые)', price: '50₪' },
                    { name: 'Батат', price: '22₪' },
                    { name: 'Картофель фри', price: '22₪' },
                    { name: 'Хрустящие кубики халлуми', price: '50₪' }
                ]
            },
            {
                title: 'Багет с картофелем',
                items: [
                    { name: 'Багет с куриной грудкой', price: '56₪' },
                    { name: 'Багет со шницелем', price: '56₪' },
                    { name: 'Багет с мясной смесью', price: '67₪' },
                    { name: 'Багет с кебабом', price: '56₪' }
                ]
            },
            {
                title: 'Тосты с рубленым салатом',
                items: [
                    { name: 'Тост с желтым сыром и сливочным сыром', price: '50₪' },
                    { name: 'Тост с миксом сыров и песто', price: '50₪' },
                    { name: 'Тост на заказ', price: '56₪' }
                ]
            },
            {
                title: 'Сэндвич в кремовой заливке',
                items: [
                    { name: 'Куриная грудка в креме', price: '67₪' },
                    { name: 'Шницель в креме', price: '67₪' }
                ]
            },
            {
                title: 'Тарелка + фри/салат',
                items: [
                    { name: 'Шницель', price: '65₪' },
                    { name: 'Куриная грудка', price: '65₪' },
                    { name: 'Кебаб', price: '65₪' },
                    { name: 'Шницель в креме', price: '70₪' },
                    { name: 'Куриная грудка в креме', price: '70₪' }
                ]
            },
            {
                title: 'Домашнее',
                items: [
                    { name: 'Долма (виноградные листья)', price: '25₪' },
                    { name: 'Фаршированная капуста', price: '25₪' },
                    { name: 'Кубба', price: '22₪' }
                ]
            }
        ]
    },
    en: {
        dir: 'ltr',
        categories: [
            {
                title: 'Starters & Salads',
                items: [
                    { name: 'Fattoush Salad', price: '56₪' },
                    { name: 'Tabbouleh Salad', price: '50₪' },
                    { name: 'Greek Salad', price: '56₪' },
                    { name: 'Chicken Breast / Schnitzel Salad', price: '67₪' },
                    { name: 'Wings with Chili Sauce (Sweet/Spicy)', price: '50₪' },
                    { name: 'Sweet Potato', price: '22₪' },
                    { name: 'French Fries', price: '22₪' },
                    { name: 'Crispy Halloumi Cubes', price: '50₪' }
                ]
            },
            {
                title: 'Baguette with Fries',
                items: [
                    { name: 'Chicken Breast Baguette', price: '56₪' },
                    { name: 'Schnitzel Baguette', price: '56₪' },
                    { name: 'Mixed Meat Baguette', price: '67₪' },
                    { name: 'Kebab Baguette', price: '56₪' }
                ]
            },
            {
                title: 'Toasts with Chopped Salad',
                items: [
                    { name: 'Yellow Cheese Toast with Cream Cheese', price: '50₪' },
                    { name: 'Mixed Cheese & Pesto Toast', price: '50₪' },
                    { name: 'Build-Your-Own Toast', price: '56₪' }
                ]
            },
            {
                title: 'Cream-Covered Sandwich',
                items: [
                    { name: 'Creamed Chicken Breast Sandwich', price: '67₪' },
                    { name: 'Creamed Schnitzel Sandwich', price: '67₪' }
                ]
            },
            {
                title: 'Plate + Fries/Salad',
                items: [
                    { name: 'Schnitzel', price: '65₪' },
                    { name: 'Chicken Breast', price: '65₪' },
                    { name: 'Kebab', price: '65₪' },
                    { name: 'Creamed Schnitzel', price: '70₪' },
                    { name: 'Creamed Chicken Breast', price: '70₪' }
                ]
            },
            {
                title: 'From Home',
                items: [
                    { name: 'Stuffed Grape Leaves', price: '25₪' },
                    { name: 'Stuffed Cabbage', price: '25₪' },
                    { name: 'Kibbeh', price: '22₪' }
                ]
            }
        ]
    }
};

/* Image mapping for structured menu categories (by index) */
const menuImages = {
    0: [
        '', // סלט פתוש
        '', // סלט טאבולה
        '', // סלט יווני
        '', // סלט חזה עוף / שניצל
        '', // כנפיים ברוטב צ'ילי (מתוק/חריף)
        'https://landing-ai-images.s3.amazonaws.com/images/img_qz36i2hiuvm_en56xxwec8l_1766176192254.jpeg', // בטטה
        '', // צ'יפס
        'https://landing-ai-images.s3.amazonaws.com/images/img_4e4vfsyf8x3_rth36f7l8sf_1766175502991.jpeg' // קוביות חלומי (מטוגנות)
    ],
    1: [
        'https://landing-ai-images.s3.amazonaws.com/images/img_8983bmio6fu_3vnrxnenb9q_1766177204840.jpeg', // באגט חזה עוף
        'images/1759008482241_up2zivlj64.jpg', // באגט שניצל
        'https://landing-ai-images.s3.amazonaws.com/images/img_cg4lled8npb_xztvkue5hli_1766178306431.jpeg', // באגט קבב
        ''  // באגט מעורב
    ]
};

/* Lightweight lightbox for full-size menu images */
(function ensureLightboxStyles() {
    if (document.getElementById('mk-lightbox-style')) return;
    const s = document.createElement('style');
    s.id = 'mk-lightbox-style';
    s.textContent = `
        .mk-lightbox{position:fixed;inset:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:2000;opacity:0;pointer-events:none;transition:opacity .2s ease}
        .mk-lightbox.is-open{opacity:1;pointer-events:auto}
        .mk-lightbox img{max-width:95vw;max-height:95vh;border-radius:12px;box-shadow:0 18px 48px rgba(0,0,0,0.45);opacity:0;transform:scale(.98);transition:opacity .25s ease,transform .25s ease}
        .mk-lightbox.is-open img{opacity:1;transform:scale(1)}
    `;
    document.head.appendChild(s);
})();
function getLightbox() {
    let box = document.querySelector('.mk-lightbox');
    if (box) return box;
    box = document.createElement('div');
    box.className = 'mk-lightbox';
    const img = document.createElement('img');
    img.alt = '';
    img.decoding = 'async';
    img.loading = 'eager';
    box.appendChild(img);
    box.addEventListener('click', () => {
        box.classList.remove('is-open');
        img.src = '';
        img.alt = '';
        document.body.style.overflow = '';
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && box.classList.contains('is-open')) {
            box.click();
        }
    });
    document.body.appendChild(box);
    return box;
}
function openLightbox(url, alt='') {
    const box = getLightbox();
    const img = box.querySelector('img');
    img.src = url;
    img.alt = alt || '';
    box.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

// Bind lightbox to all images site-wide (opt-out with data-no-zoom)
function bindLightboxToImages(root = document) {
    const imgs = root.querySelectorAll('img:not([data-no-zoom])');
    imgs.forEach((img) => {
        if (img.dataset.mkZoomBound === '1') return;
        img.dataset.mkZoomBound = '1';
        img.addEventListener('click', (e) => {
            // Allow opt-out via attribute on the element at runtime
            if (img.hasAttribute('data-no-zoom')) return;
            const src = img.currentSrc || img.src;
            if (!src) return;
            e.preventDefault();
            openLightbox(src, img.alt || '');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        bindLightboxToImages();
    } catch (e) {
        console.warn('Lightbox binding failed', e);
    }
});

// Simple tabs to toggle between the two cards sections
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.cards-tab-btn');
    if (!tabButtons || tabButtons.length === 0) return;

    const sections = {
        '#starters-salads': document.getElementById('starters-salads'),
        '#baguettes-fries': document.getElementById('baguettes-fries')
    };

    function showSection(targetId) {
        Object.values(sections).forEach(sec => {
            if (!sec) return;
            sec.style.display = 'none';
        });
        tabButtons.forEach(btn => btn.classList.remove('active'));

        const sec = sections[targetId];
        if (sec) sec.style.display = '';
        const btn = Array.from(tabButtons).find(b => b.getAttribute('data-cards-target') === targetId);
        if (btn) btn.classList.add('active');
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = btn.getAttribute('data-cards-target');
            if (target) showSection(target);
        });
    });

    // Expose for external navigation
    window.__showCardsSection = showSection;

    // Initial state: show starters/salads
    showSection('#starters-salads');
});

function attachMenuThumbnails(menuRoot, categoryEls) {
    if (!menuRoot || !categoryEls) return;
    Object.keys(menuImages).forEach((catIdxStr) => {
        const ci = parseInt(catIdxStr, 10);
        const urls = menuImages[ci] || [];
        const catEl = categoryEls[ci];
        if (!catEl || !urls.length) return;
        const list = catEl.querySelector('.menu-items');
        if (!list) return;
        const lis = Array.from(list.querySelectorAll('li.menu-item'));
        lis.forEach((li, j) => {
            const url = urls[j];
            const nameSpan = li.querySelector('.item-name');
            if (!nameSpan) return;
            // Remove previous thumb if exists
            const prev = nameSpan.querySelector('img.mk-thumb');
            if (prev) prev.remove();
            if (!url) return;
            const img = document.createElement('img');
            img.className = 'mk-thumb';
            img.src = url;
            img.alt = nameSpan.textContent.trim();
            img.loading = 'lazy';
            img.decoding = 'async';
            img.referrerPolicy = 'no-referrer';
            img.style.width = '48px';
            img.style.height = '48px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '8px';
            img.style.marginInlineEnd = '8px';
            img.style.background = '#f3f4f6';
            img.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openLightbox(url, img.alt);
            });
            nameSpan.prepend(img);
        });
    });
}

// Attach thumbnails on load if the structured text menu is present
document.addEventListener('DOMContentLoaded', () => {
    try {
        const menuRoot = document.getElementById('menu');
        const categoryEls = menuRoot ? menuRoot.querySelectorAll('.menu-category') : null;
        if (menuRoot && categoryEls && categoryEls.length) {
            attachMenuThumbnails(menuRoot, categoryEls);
        }
    } catch (e) {
        console.warn('Thumbnail attachment failed', e);
    }
});

function applyMenuLanguage(lang) {
    const raw = menuTranslations[lang] || menuTranslations.ar || {};
    const menuSection = document.getElementById('menu');
    if (!menuSection) return;
    // Force empty menu data
    const data = { dir: raw.dir || ((lang === 'ar' || lang === 'he') ? 'rtl' : 'ltr'), categories: [] };

    // Set direction on the menu section only
    const dir = data.dir || ((lang === 'ar' || lang === 'he') ? 'rtl' : 'ltr');
    menuSection.setAttribute('dir', dir);
    // Clear all existing menu items so nothing is shown
    menuSection.querySelectorAll('.menu-items').forEach(list => { list.innerHTML = ''; });

    const categoryEls = menuSection.querySelectorAll('.menu-category');
    data.categories.forEach((cat, idx) => {
        const catEl = categoryEls[idx];
        if (!catEl) return;
        const titleEl = catEl.querySelector('h3');
        if (titleEl) titleEl.textContent = cat.title;

        const list = catEl.querySelector('.menu-items');
        if (!list) return;

        const existingLis = Array.from(list.querySelectorAll('li.menu-item'));
        // If count differs, rebuild this list
        if (existingLis.length !== cat.items.length) {
            list.innerHTML = '';
            cat.items.forEach(it => {
                const li = document.createElement('li');
                li.className = 'menu-item';
                const nameSpan = document.createElement('span');
                nameSpan.className = 'item-name';
                nameSpan.textContent = it.name;
                const priceSpan = document.createElement('span');
                priceSpan.className = 'item-price';
                priceSpan.textContent = it.price;
                li.appendChild(nameSpan);
                li.appendChild(priceSpan);
                list.appendChild(li);
            });
        } else {
            cat.items.forEach((it, j) => {
                const li = existingLis[j];
                const nameSpan = li.querySelector('.item-name');
                const priceSpan = li.querySelector('.item-price');
                if (nameSpan) nameSpan.textContent = it.name;
                if (priceSpan) priceSpan.textContent = it.price;
            });
        }
    });
    
    // Thumbnails disabled (no images for menu items)
    try {} catch (e) {}
    
    // Update active state on buttons
    document.querySelectorAll('.menu-lang-btn').forEach(btn => {
        if (btn.getAttribute('data-menu-lang') === lang) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    try { localStorage.setItem('menuLanguage', lang); } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
    // Language switching disabled: keep static HTML, do nothing here.
});

function isAndroid() {
    const ua = navigator.userAgent || '';
    return /Android/i.test(ua);
}
function isIOS() {
    const ua = navigator.userAgent || '';
    return /iPhone|iPad/i.test(ua);
}
function isMobileDevice() {
    return isAndroid() || isIOS();
}

function openWhatsApp(number, text = '') {
    const raw = String(number || '');
    const numDigits = raw.replace(/\D/g, ''); // wa.me requires digits only
    const msg = encodeURIComponent(text || '');

    const iosUrl = `whatsapp://send?phone=${numDigits}&text=${msg}`;
    const androidIntent = `intent://send/?phone=${numDigits}&text=${msg}#Intent;scheme=whatsapp;package=com.whatsapp;end`;
    const webUrl = `https://wa.me/${numDigits}?text=${msg}`;

    if (isAndroid()) {
        const timer = setTimeout(() => {
            window.location.href = webUrl;
        }, 1200);
        try {
            window.location.href = androidIntent;
        } catch (e) {
            clearTimeout(timer);
            window.location.href = webUrl;
        }
        return;
    }

    if (isIOS()) {
        const timer = setTimeout(() => {
            window.location.href = webUrl;
        }, 1200);
        try {
            window.location.href = iosUrl;
        } catch (e) {
            clearTimeout(timer);
            window.location.href = webUrl;
        }
        return;
    }

    // Desktop fallback
    window.location.href = webUrl;
}

 // Intercept floating WhatsApp FAB to open native app on mobile; allow default on desktop
document.addEventListener('DOMContentLoaded', () => {
    const waFab = document.querySelector('.whatsapp-fab');
    if (waFab) {
        waFab.addEventListener('click', (e) => {
            const href = waFab.getAttribute('href') || '';
            const m = href.match(/(?:wa\.me\/|phone=)(\+?\d+)/);
            const num = (m && m[1]) ? m[1] : '972549077756';
            if (isMobileDevice()) {
                e.preventDefault();
                openWhatsApp(num, '');
            }
        });
    }
});
 
 // Current language (default Arabic)
let currentLanguage = 'ar';

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
    
    // Set page title from translations with safe English fallback
    const translatedTitle = (translations[language] && translations[language]['page-title'])
        ? translations[language]['page-title']
        : null;
    const defaultEnglishTitle = (translations['en'] && translations['en']['page-title'])
        ? translations['en']['page-title']
        : document.title;
    document.title = translatedTitle || defaultEnglishTitle;
    
    // Translate all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            element.innerHTML = translations[language][key];
        }
    });

    // Allow logo text to be translated via data-translate like other elements

    // Restart typing animations for the new language
    startTypingAnimations(language);

    // Notify listeners that language changed (for cart UI etc.)
    document.dispatchEvent(new Event('languagechange'));
    
    // Save language preference
    localStorage.setItem('selectedLanguage', language);
}

// Language selector event listener
document.addEventListener('DOMContentLoaded', () => {
    const languageButtons = document.querySelectorAll('.lang-btn');
    
    if (languageButtons.length > 0) {
        // Load saved language preference
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'ar';
        
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

        // If linking to cards sections, ensure the correct tab is shown before scrolling
        if (targetId === '#starters-salads' || targetId === '#baguettes-fries') {
            try {
                if (window.__showCardsSection) {
                    window.__showCardsSection(targetId);
                }
            } catch (err) {
                console.warn('Failed to switch cards section', err);
            }
        }

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
const animatedElements = document.querySelectorAll('.contact-item, .about-text');
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
            input.style.borderColor = '#d32f2f';
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

/* Lightweight Cart Feature (non-invasive, vanilla JS) */
(function () {
    'use strict';
    // Disabled: menu and card/cart features removed from landing page
    return;

    const STORAGE_KEY = 'mkCartItems';
    let items = {};
    const STORAGE_META_KEY = 'mkCartItemMeta';
    let itemMeta = {};

    // Product indexing: stable ids and current titles
    const productIndex = {
        byId: new Map(),
        byTitle: new Map()
    };

    function simpleUUID() {
        try {
            if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
        } catch {}
        return 'pid-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    }

    function slugify(str) {
        return String(str || '')
            .toLowerCase()
            // allow basic Latin, Hebrew, Arabic, digits, underscore and hyphen
            .replace(/[^a-z0-9_\-\u0590-\u05FF\u0600-\u06FF]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }

    function computeProductId(card) {
        if (!card) return null;
        const existing = card.getAttribute('data-product-id');
        if (existing) return existing;

        // Prefer a stable translate key on the title
        const titleEl = card.querySelector('.menu-content h3');
        const translateKey = titleEl && titleEl.getAttribute('data-translate');
        if (translateKey) {
            card.setAttribute('data-product-id', translateKey);
            return translateKey;
        }

        // Then use explicit dish key if provided
        const dish = card.getAttribute('data-dish');
        if (dish) {
            card.setAttribute('data-product-id', dish);
            return dish;
        }

        // Then fall back to image filename
        const img = card.querySelector('.menu-image img');
        if (img && img.getAttribute('src')) {
            const src = img.getAttribute('src');
            const base = src.split('/').pop().split('.')[0];
            const id = slugify(base);
            if (id) {
                card.setAttribute('data-product-id', id);
                return id;
            }
        }

        // As a last resort, generate and persist a UUID on the DOM
        const fallback = simpleUUID();
        card.setAttribute('data-product-id', fallback);
        return fallback;
    }

    function buildProductIndex() {
        productIndex.byId.clear();
        productIndex.byTitle.clear();

        document.querySelectorAll('.menu-item').forEach((card) => {
            const id = computeProductId(card);
            const titleEl = card.querySelector('.menu-content h3');
            const title = titleEl ? titleEl.textContent.trim() : id;

            productIndex.byId.set(id, { title, card });
            productIndex.byTitle.set(title, id);

            const translateKey = titleEl && titleEl.getAttribute('data-translate');
            if (translateKey && typeof translations === 'object') {
                Object.keys(translations).forEach((lang) => {
                    const text = translations[lang] && translations[lang][translateKey];
                    if (text) {
                        productIndex.byTitle.set(text, id);
                    }
                });
            }
        });

        console.log('[Cart] Product index built:', { count: productIndex.byId.size });
    }

    function titleForId(id) {
        const entry = productIndex.byId.get(id);
        return (entry && entry.title) || id;
    }

    function getIdForElement(el) {
        const card = el && el.closest && el.closest('.menu-item');
        return card ? computeProductId(card) : null;
    }

    function migrateLegacyItems() {
        let migrated = false;
        const newItems = {};
        for (const [k, v] of Object.entries(items || {})) {
            if (!v) continue;
            if (productIndex.byId.has(k)) {
                // already id
                newItems[k] = (newItems[k] || 0) + v;
            } else if (productIndex.byTitle.has(k)) {
                const id = productIndex.byTitle.get(k);
                newItems[id] = (newItems[id] || 0) + v;
                migrated = true;
                console.log('[Cart] Migrated legacy title to id:', k, '->', id);
            } else {
                const slug = slugify(k);
                if (productIndex.byId.has(slug)) {
                    newItems[slug] = (newItems[slug] || 0) + v;
                    migrated = true;
                    console.log('[Cart] Migrated via slug:', k, '->', slug);
                } else {
                    newItems[k] = (newItems[k] || 0) + v;
                    console.warn('[Cart] Could not map legacy cart key:', k);
                }
            }
        }
        items = newItems;
        return migrated;
    }

    function load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            items = raw ? JSON.parse(raw) : {};
        } catch {
            items = {};
        }
        try {
            const rawMeta = localStorage.getItem(STORAGE_META_KEY);
            itemMeta = rawMeta ? JSON.parse(rawMeta) : {};
        } catch {
            itemMeta = {};
        }
    }

    function totalQty() {
        return Object.values(items).reduce((a, b) => a + b, 0);
    }

    // UI elements
    let cartFab, countBadge, overlay, modal, itemsContainer, totalEl, toastEl, toastTimer;

    // Meat selection modal helpers
    const MEAT_OPTIONS = [
        { code: 'goulash', key: 'meat-option-goulash' },
        { code: 'thighs', key: 'meat-option-thighs' },
        { code: 'veal', key: 'meat-option-veal' },
        { code: 'kebab', key: 'meat-option-kebab' }
    ];
    let meatOverlay, meatModal, meatOpen = false;

    function getMeatLabel(code) {
        const k = 'meat-option-' + String(code || '');
        return t(k) || String(code || '');
    }

    function buildMeatModal() {
        if (meatOverlay) return;
        meatOverlay = document.createElement('div');
        meatOverlay.className = 'meat-modal-overlay';
        meatOverlay.setAttribute('aria-hidden', 'true');

        meatModal = document.createElement('div');
        meatModal.className = 'meat-modal';
        meatModal.setAttribute('role', 'dialog');
        meatModal.setAttribute('aria-modal', 'true');

        meatOverlay.appendChild(meatModal);
        document.body.appendChild(meatOverlay);

        meatOverlay.addEventListener('click', (e) => {
            if (e.target === meatOverlay) {
                closeMeatModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (meatOpen && e.key === 'Escape') closeMeatModal();
        });
    }

    function renderMeatModal(defaultCode) {
        if (!meatModal) return;
        const dir = document.documentElement.dir || 'rtl';
        meatModal.setAttribute('dir', dir);
        const title = t('meat-select-title');
        const cancelText = t('cancel');
        const confirmText = t('confirm');

        const optionsHtml = MEAT_OPTIONS
            // Exclude only the recommendation item whose label equals "בשר עגל"
            .filter(opt => getMeatLabel(opt.code) !== 'בשר עגל')
            .map((opt, idx) => {
                const id = `meat-opt-${opt.code}`;
                const requiredAttr = idx === 0 ? 'required' : '';
                const checkedAttr = defaultCode && defaultCode === opt.code ? 'checked' : '';
                const label = getMeatLabel(opt.code);
                return `
                    <div class="meat-option">
                        <input type="radio" id="${id}" name="meat-type" value="${opt.code}" ${requiredAttr} ${checkedAttr}>
                        <label for="${id}">${label}</label>
                    </div>
                `;
            }).join('');

        meatModal.innerHTML = `
            <div class="meat-modal-header">
                <h3 class="meat-title">${title}</h3>
                <button type="button" class="meat-close" aria-label="Close">×</button>
            </div>
            <form class="meat-form">
                <fieldset class="meat-options">
                    ${optionsHtml}
                </fieldset>
                <div class="meat-actions">
                    <button type="button" class="btn cancel">${cancelText}</button>
                    <button type="submit" class="btn confirm">${confirmText}</button>
                </div>
            </form>
        `;

        const closeBtn = meatModal.querySelector('.meat-close');
        const cancelBtn = meatModal.querySelector('.btn.cancel');
        closeBtn && closeBtn.addEventListener('click', closeMeatModal);
        cancelBtn && cancelBtn.addEventListener('click', closeMeatModal);
    }

    function openMeatSelection(defaultCode) {
        buildMeatModal();
        renderMeatModal(defaultCode);
        return new Promise((resolve) => {
            const form = meatModal.querySelector('.meat-form');
            const closeBtn = meatModal.querySelector('.meat-close');
            const cancelBtn = meatModal.querySelector('.btn.cancel');

            const onCancel = () => {
                closeMeatModal();
                cleanup();
                resolve(null);
            };
            const onOverlayCancel = (e) => {
                if (e.target === meatOverlay) {
                    closeMeatModal();
                    cleanup();
                    resolve(null);
                }
            };
            const onSubmit = (e) => {
                e.preventDefault();
                const checked = meatModal.querySelector('input[name="meat-type"]:checked');
                if (!checked) return;
                const code = checked.value;
                closeMeatModal();
                cleanup();
                resolve(code);
            };
            const cleanup = () => {
                form && form.removeEventListener('submit', onSubmit);
                closeBtn && closeBtn.removeEventListener('click', onCancel);
                cancelBtn && cancelBtn.removeEventListener('click', onCancel);
                meatOverlay && meatOverlay.removeEventListener('click', onOverlayCancel);
            };

            if (form) form.addEventListener('submit', onSubmit, { once: true });
            if (closeBtn) closeBtn.addEventListener('click', onCancel, { once: true });
            if (cancelBtn) cancelBtn.addEventListener('click', onCancel, { once: true });
            if (meatOverlay) meatOverlay.addEventListener('click', onOverlayCancel, { once: true });

            meatOverlay.classList.add('active');
            meatOverlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            meatOpen = true;
        });
    }

    function closeMeatModal() {
        if (!meatOverlay || !meatOpen) return;
        meatOverlay.classList.remove('active');
        meatOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        meatOpen = false;
    }

    function save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {}
        try {
            localStorage.setItem(STORAGE_META_KEY, JSON.stringify(itemMeta || {}));
        } catch {}
        updateBadge();
        if (itemsContainer) renderItems();
        syncQtyControls();
        updateAllAddButtons();
    }

    function getLang() {
        return (typeof currentLanguage === 'string' && currentLanguage) ? currentLanguage : 'he';
    }

    function t(key) {
        const lang = getLang();
        return (translations[lang] && translations[lang][key])
            || (translations['he'] && translations['he'][key])
            || (translations['en'] && translations['en'][key])
            || key;
    }

    function labelFor(id) {
        const qty = items[id] || 0;
        const base = t('add-to-cart');
        return qty > 0 ? `${base} • ${qty}` : base;
    }

    function updateAllAddButtons() {
        document.querySelectorAll('.menu-item').forEach((card) => {
            const title = card.querySelector('.menu-content h3');
            const btn = card.querySelector('.add-to-cart-btn');
            if (!title || !btn) return;
            const id = computeProductId(card);
            const label = labelFor(id);
            // Keep backward data-product-name for legacy code, but prefer productId
            btn.dataset.productId = id;
            btn.dataset.productName = title.textContent.trim();
            btn.textContent = label;
            btn.setAttribute('aria-label', label);
        });
    }

    function showToast(message) {
        if (!message) return;
        if (!toastEl) {
            toastEl = document.createElement('div');
            toastEl.className = 'mk-toast';
            toastEl.setAttribute('role', 'status');
            toastEl.setAttribute('aria-live', 'polite');
            document.body.appendChild(toastEl);
        }
        if (toastTimer) {
            clearTimeout(toastTimer);
            toastTimer = null;
        }
        toastEl.textContent = message;
        toastEl.classList.add('show');
        toastTimer = setTimeout(() => {
            toastEl.classList.remove('show');
        }, 2500);
    }

    function animateButtonPulse(btn) {
        if (!btn) return;
        btn.classList.add('pulsing');
        setTimeout(() => btn.classList.remove('pulsing'), 500);
    }

    function showPlusOneBubble(btn) {
        try {
            const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (reduce) return;
            const rect = btn.getBoundingClientRect();
            const bubble = document.createElement('div');
            bubble.className = 'add-bubble';
            bubble.textContent = '+1';
            bubble.style.top = `${rect.top + window.scrollY - 6}px`;
            bubble.style.left = `${rect.left + window.scrollX + rect.width - 10}px`;
            document.body.appendChild(bubble);
            // Force reflow then animate
            void bubble.offsetWidth;
            bubble.classList.add('show');
            setTimeout(() => bubble.remove(), 700);
        } catch {}
    }

    function flyThumbToCart(imgEl) {
        try {
            if (!imgEl || !cartFab) return;
            const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (reduce) return;

            const imgRect = imgEl.getBoundingClientRect();
            const cartRect = cartFab.getBoundingClientRect();

            const clone = imgEl.cloneNode(true);
            clone.className = 'flying-thumb';
            clone.style.top = `${imgRect.top + window.scrollY + imgRect.height / 2 - 24}px`;
            clone.style.left = `${imgRect.left + window.scrollX + imgRect.width / 2 - 24}px`;
            clone.style.transform = 'translate(0, 0) scale(1)';
            document.body.appendChild(clone);

            // Next frame, move towards cart
            requestAnimationFrame(() => {
                const targetX = cartRect.left + window.scrollX + cartRect.width / 2 - (imgRect.left + window.scrollX + imgRect.width / 2);
                const targetY = cartRect.top + window.scrollY + cartRect.height / 2 - (imgRect.top + window.scrollY + imgRect.height / 2);
                clone.style.transform = `translate(${targetX}px, ${targetY}px) scale(0.2)`;
                clone.style.opacity = '0.6';
            });

            setTimeout(() => {
                clone.remove();
            }, 650);
        } catch {}
    }

    function animateAddFlow(triggerEl, imgEl) {
        animateButtonPulse(triggerEl);
        showPlusOneBubble(triggerEl);
        flyThumbToCart(imgEl);
    }

    function addItem(name, qty = 1) {
        if (!name) return;
        items[name] = (items[name] || 0) + qty;
        save();
    }

    function removeItem(name) {
        if (!name) return;
        delete items[name];
        if (itemMeta && itemMeta[name]) {
            delete itemMeta[name];
        }
        save();
    }

    function setQty(name, qty) {
        if (!name) return;
        if (qty <= 0) {
            removeItem(name);
        } else {
            items[name] = qty;
            // Keep per-unit meat selections in sync with quantity
            if (itemMeta && itemMeta[name]) {
                const meats = Array.isArray(itemMeta[name].meats) ? itemMeta[name].meats : [];
                if (meats.length > qty) {
                    itemMeta[name].meats = meats.slice(0, qty);
                }
                // Maintain legacy single meat_type as the first selection if present
                if (Array.isArray(itemMeta[name].meats) && itemMeta[name].meats.length > 0) {
                    itemMeta[name].meat_type = itemMeta[name].meats[0];
                }
            }
            save();
        }
    }

    // Consolidated cart update function to avoid duplicate updates
    function updateQuantity(productId, qty) {
        setQty(productId, qty);
    }

    function createCartFab() {
        if (cartFab) return;
        cartFab = document.createElement('button');
        cartFab.className = 'cart-fab';
        cartFab.type = 'button';
        cartFab.setAttribute('aria-label', 'Open cart');
        cartFab.innerHTML = '<span class="cart-icon" aria-hidden="true">🛒</span>';
        countBadge = document.createElement('span');
        countBadge.className = 'cart-count-badge';
        cartFab.appendChild(countBadge);
        cartFab.addEventListener('click', openModal);
        document.body.appendChild(cartFab);
        updateBadge();
    }

    function updateBadge() {
        if (!countBadge) return;
        const n = totalQty();
        countBadge.textContent = n;
        countBadge.style.display = n > 0 ? 'inline-flex' : 'none';
        countBadge.classList.add('bump');
        setTimeout(() => countBadge.classList.remove('bump'), 300);
    }

    function buildModal() {
        if (overlay) return;

        overlay = document.createElement('div');
        overlay.className = 'cart-modal-overlay';
        overlay.setAttribute('aria-hidden', 'true');

        modal = document.createElement('div');
        modal.className = 'cart-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        const titleText = t('cart-title');
        const sendText = t('cart-send-whatsapp');
        modal.setAttribute('aria-label', titleText);
        modal.setAttribute('dir', document.documentElement.dir || 'ltr');

        modal.innerHTML = `
            <div class="cart-modal-header">
                <h3 class="cart-title">${titleText}</h3>
                <button type="button" class="cart-close" aria-label="Close">×</button>
            </div>
            <div class="cart-items"></div>
            <div class="cart-modal-footer">
                <div class="cart-total">Total items: <span class="cart-total-qty">0</span></div>
                <button type="button" class="cart-whatsapp-btn">${sendText}</button>
            </div>
        `;

        itemsContainer = modal.querySelector('.cart-items');
        totalEl = modal.querySelector('.cart-total-qty');

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
        modal.querySelector('.cart-close').addEventListener('click', closeModal);
        modal.querySelector('.cart-whatsapp-btn').addEventListener('click', sendViaWhatsApp);
        document.addEventListener('keydown', escCloseHandler);
    }

    function escCloseHandler(e) {
        if (e.key === 'Escape') closeModal();
    }

    function openModal() {
        buildModal();
        renderItems();
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!overlay) return;
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function renderItems() {
        if (!itemsContainer) return;
        itemsContainer.innerHTML = '';
        modal.setAttribute('dir', document.documentElement.dir || 'ltr');

        const ids = Object.keys(items);
        if (ids.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'cart-empty';
            empty.textContent = t('cart-empty');
            itemsContainer.appendChild(empty);
        } else {
            ids.forEach((id) => {
                const qty = items[id];
                const row = document.createElement('div');
                row.className = 'cart-item';
                row.innerHTML = `
                    <span class="cart-item-name"></span>
                    <div class="cart-item-controls">
                        <button type="button" class="qty-btn minus" aria-label="Decrease">−</button>
                        <span class="qty-value"></span>
                        <button type="button" class="qty-btn plus" aria-label="Increase">+</button>
                        <button type="button" class="remove-btn" aria-label="Remove">×</button>
                    </div>
                `;
                const nameEl = row.querySelector('.cart-item-name');
                nameEl.textContent = titleForId(id);

                // Show selected meat types summary, if any (per unit)
                if (itemMeta[id]) {
                    const meats = Array.isArray(itemMeta[id].meats) ? itemMeta[id].meats.slice(0, qty) : [];
                    if (meats.length > 0) {
                        const counts = meats.reduce((acc, code) => {
                            acc[code] = (acc[code] || 0) + 1;
                            return acc;
                        }, {});
                        const summary = Object.keys(counts)
                            .map(code => `${getMeatLabel(code)}×${counts[code]}`)
                            .join(', ');
                        const metaEl = document.createElement('span');
                        metaEl.className = 'cart-item-meta';
                        metaEl.textContent = summary;
                        nameEl.appendChild(metaEl);
                        row.setAttribute('data-meats', summary);
                    } else if (itemMeta[id].meat_type) {
                        // Legacy single selection fallback
                        const metaEl = document.createElement('span');
                        metaEl.className = 'cart-item-meta';
                        metaEl.textContent = getMeatLabel(itemMeta[id].meat_type);
                        nameEl.appendChild(metaEl);
                        row.setAttribute('data-meat_type', itemMeta[id].meat_type);
                    }
                }

                row.querySelector('.qty-value').textContent = qty;
                row.querySelector('.qty-btn.minus').addEventListener('click', () => setQty(id, (items[id] || 0) - 1));
                row.querySelector('.qty-btn.plus').addEventListener('click', () => setQty(id, (items[id] || 0) + 1));
                row.querySelector('.remove-btn').addEventListener('click', () => removeItem(id));
                itemsContainer.appendChild(row);
            });
        }
        totalEl.textContent = String(totalQty());
    }

    function getWhatsappNumber() {
        // Attribute override
        const attrEl = document.querySelector('[data-whatsapp-number]');
        if (attrEl && attrEl.getAttribute('data-whatsapp-number')) {
            return attrEl.getAttribute('data-whatsapp-number');
        }

        // Existing links on page
        const a = document.querySelector('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
        if (a) {
            const href = a.getAttribute('href') || '';
            const m = href.match(/(?:wa\.me\/|phone=)(\+?\d+)/);
            if (m && m[1]) return m[1];
        }

        // Fallback placeholder for devs to replace
        return '+1234567890';
    }

    function sendViaWhatsApp() {
        const ids = Object.keys(items);
        if (ids.length === 0) {
            closeModal();
            return;
        }
        const lines = ids.map((id) => {
            const qty = items[id];
            const base = `${qty}x ${titleForId(id)}`;
            let meatInfo = '';
            if (itemMeta[id]) {
                const meats = Array.isArray(itemMeta[id].meats) ? itemMeta[id].meats.slice(0, qty) : [];
                if (meats.length > 0) {
                    const counts = meats.reduce((acc, code) => {
                        acc[code] = (acc[code] || 0) + 1;
                        return acc;
                    }, {});
                    const summary = Object.keys(counts)
                        .map(code => `${getMeatLabel(code)}×${counts[code]}`)
                        .join(', ');
                    meatInfo = ` [meat: ${summary}]`;
                } else if (itemMeta[id].meat_type) {
                    meatInfo = ` [meat: ${getMeatLabel(itemMeta[id].meat_type)}]`;
                }
            }
            return base + meatInfo;
        }).join('\n');
        const num = getWhatsappNumber().replace(/[^\d+]/g, '');
        openWhatsApp(num, lines);
    }

    // Click delegation: add-to-cart patterns
    document.addEventListener(
        'click',
        (e) => {
            // Prevent add-to-cart handler from firing for clicks inside quantity controls
            if (e.target && e.target.closest && e.target.closest('.qty-control')) {
                return;
            }
            const el = e.target.closest(
                '[class*="add-to-cart"], [class*="add-to-cart-btn"], [data-product-name], .product .add-to-cart, .product .add-to-cart-btn'
            );
            if (!el) return;

            // Resolve a stable product id for add-to-cart
            let id = el.getAttribute('data-product-id');

            // Prefer the enclosing menu card
            if (!id) {
                id = getIdForElement(el);
            }

            // Legacy: fall back to data-product-name/title text and map to id
            if (!id) {
                let legacyName = el.getAttribute('data-product-name');
                if (!legacyName) {
                    const product = el.closest('[data-product-name], .product');
                    if (product) {
                        legacyName = product.getAttribute('data-product-name');
                        if (!legacyName) {
                            const titleEl = product.querySelector('.product-title, .product-name, h3');
                            if (titleEl) legacyName = titleEl.textContent.trim();
                        }
                    }
                }
                if (legacyName && productIndex.byTitle.has(legacyName)) {
                    id = productIndex.byTitle.get(legacyName);
                }
            }

            if (id) {
                e.preventDefault();
                const card = el.closest('.menu-item');
                const requiresMeat = card && card.getAttribute('data-has-meat') === 'true';

                const addWithMeat = (meatCode) => {
                    // Ensure per-unit meats array exists
                    itemMeta[id] = Object.assign({}, itemMeta[id]);
                    if (!Array.isArray(itemMeta[id].meats)) itemMeta[id].meats = [];
                    if (meatCode) itemMeta[id].meats.push(meatCode);
                    // Maintain legacy single meat_type for backward compatibility
                    itemMeta[id].meat_type = itemMeta[id].meats[0] || meatCode || itemMeta[id].meat_type || null;

                    addItem(id, 1);

                    // Small animated affordances
                    animateAddFlow(el, (el.closest('.menu-item') || document).querySelector?.('.menu-image img'));

                    // Accessible toast confirmation
                    const displayName = titleForId(id);
                    showToast(t('toast-added').replace('{qty}', '1').replace('{name}', displayName));
                };

                if (requiresMeat) {
                    // Default to last chosen meat for this product if available
                    let defaultCode = null;
                    if (itemMeta && itemMeta[id]) {
                        if (Array.isArray(itemMeta[id].meats) && itemMeta[id].meats.length > 0) {
                            defaultCode = itemMeta[id].meats[itemMeta[id].meats.length - 1];
                        } else if (itemMeta[id].meat_type) {
                            defaultCode = itemMeta[id].meat_type;
                        }
                    }
                    openMeatSelection(defaultCode).then((code) => {
                        if (!code) return; // user canceled
                        addWithMeat(code);
                    });
                } else {
                    addItem(id, 1);
                    animateAddFlow(el, (el.closest('.menu-item') || document).querySelector?.('.menu-image img'));
                    const displayName = titleForId(id);
                    showToast(t('toast-added').replace('{qty}', '1').replace('{name}', displayName));
                }
            }
        },
        true
    );

    // Non-invasive: inject quantity controls into menu cards (bottom-left pill)
    function injectMenuAddButtons() {
        document.querySelectorAll('.menu-item').forEach((card) => {
            if (card.querySelector('.qty-control')) return;
            const title = card.querySelector('.menu-content h3');
            if (!title) return;
            const name = title.textContent.trim();
            const id = computeProductId(card);

            const qc = document.createElement('div');
            qc.className = 'qty-control';
            qc.setAttribute('role', 'group');
            qc.setAttribute('aria-label', `Quantity for ${name}`);
            qc.dataset.productName = name;
            qc.dataset.productId = id;

            const minus = document.createElement('button');
            minus.type = 'button';
            minus.className = 'qc-btn qc-minus';
            minus.setAttribute('aria-label', `Decrease quantity of ${name}`);
            minus.textContent = '−';

            const value = document.createElement('span');
            value.className = 'qc-value';
            value.textContent = '0';

            const plus = document.createElement('button');
            plus.type = 'button';
            plus.className = 'qc-btn qc-plus';
            plus.setAttribute('aria-label', `Increase quantity of ${name}`);
            plus.textContent = '+';

            const announcer = document.createElement('span');
            announcer.className = 'qc-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.textContent = '';

            // Native keyboard interactions on <button> provide accessibility (Enter/Space).
            // No custom key handlers needed to avoid duplicate clicks.

            const commit = (qty) => {
                const currentCard = qc.closest('.menu-item');
                const currentId = currentCard ? computeProductId(currentCard) : (qc.dataset.productId || id);
                updateQuantity(currentId, qty);
            };

            function setDisplay(q) {
                value.textContent = String(q);
                announcer.textContent = `Quantity for ${name}: ${q}`;
            }

            function adjust(delta) {
                const current = parseInt(value.textContent, 10) || 0;
                let next = current + delta;
                if (next < 0) next = 0;
                if (next === current) return;
                setDisplay(next);
                commit(next);
            }

            // Prevent delegated add-to-cart handlers from firing when using the qty control
            qc.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });

            minus.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                adjust(-1);
            });
            plus.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const cardEl = qc.closest('.menu-item');
                const requiresMeat = cardEl && cardEl.getAttribute('data-has-meat') === 'true';

                if (!requiresMeat) {
                    adjust(1);
                    return;
                }

                // For meals requiring meat, prompt on every increase and default to the last choice
                let defaultCode = null;
                const meta = itemMeta && itemMeta[id] ? itemMeta[id] : null;
                if (meta) {
                    if (Array.isArray(meta.meats) && meta.meats.length > 0) {
                        defaultCode = meta.meats[meta.meats.length - 1];
                    } else if (meta.meat_type) {
                        defaultCode = meta.meat_type;
                    }
                }

                openMeatSelection(defaultCode).then((code) => {
                    if (!code) return; // user canceled: do not increase
                    itemMeta[id] = Object.assign({}, itemMeta[id]);
                    if (!Array.isArray(itemMeta[id].meats)) itemMeta[id].meats = [];
                    itemMeta[id].meats.push(code);
                    // Keep legacy single selection in sync
                    itemMeta[id].meat_type = itemMeta[id].meats[0] || code;

                    save();
                    adjust(1);
                });
            });

            qc.appendChild(minus);
            qc.appendChild(value);
            qc.appendChild(plus);
            qc.appendChild(announcer);

            // Attach to card root for absolute positioning
            card.appendChild(qc);
        });
    }

    function syncQtyControls() {
        document.querySelectorAll('.menu-item').forEach((card) => {
            const title = card.querySelector('.menu-content h3');
            if (!title) return;
            const name = title.textContent.trim();
            const id = computeProductId(card);

            const qty = (items && items[id]) != null ? Math.max(0, items[id]) : 0;

            // Toggle visual marker when quantity > 0
            if (qty > 0) {
                card.classList.add('has-quantity');
            } else {
                card.classList.remove('has-quantity');
            }

            const qc = card.querySelector('.qty-control');
            if (!qc) return;

            // Update product id/name binding and ARIA
            qc.dataset.productName = name;
            qc.dataset.productId = id;
            qc.setAttribute('aria-label', `Quantity for ${name}`);

            const value = qc.querySelector('.qc-value');
            const announcer = qc.querySelector('.qc-announcer');
            const minus = qc.querySelector('.qc-minus');
            const plus = qc.querySelector('.qc-plus');

            if (value) value.textContent = String(qty);
            if (announcer) announcer.textContent = `Quantity for ${name}: ${qty}`;
            if (minus) minus.setAttribute('aria-label', `Decrease quantity of ${name}`);
            if (plus) plus.setAttribute('aria-label', `Increase quantity of ${name}`);
        });
    }

    function debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    function init() {
        // Build index before loading to enable legacy migration
        buildProductIndex();
        load();
        const didMigrate = migrateLegacyItems();
        if (didMigrate) {
            // Persist migrated structure
            save();
        }

        createCartFab();
        buildModal();
        injectMenuAddButtons();
        syncQtyControls();
        updateAllAddButtons();

        // Reinjection on DOM/text changes (e.g., language switch modifies titles)
        const reInject = debounce(() => {
            buildProductIndex();
            injectMenuAddButtons();
            syncQtyControls();
            updateAllAddButtons();
        }, 200);
        const observerTarget = document.querySelector('#menu') || document.body;
        const obs = new MutationObserver(() => reInject());
        obs.observe(observerTarget, { childList: true, subtree: true, characterData: true });

        // Update direction and titles if lang changes
        document.addEventListener('languagechange', () => {
            buildProductIndex();
            if (modal) {
                modal.setAttribute('dir', document.documentElement.dir || 'ltr');
                modal.setAttribute('aria-label', t('cart-title'));
                const headerTitle = modal.querySelector('.cart-title');
                if (headerTitle) headerTitle.textContent = t('cart-title');
                const sendBtn = modal.querySelector('.cart-whatsapp-btn');
                if (sendBtn) sendBtn.textContent = t('cart-send-whatsapp');
            }
            syncQtyControls();
            updateAllAddButtons();
            if (itemsContainer) renderItems();
            console.log('[Cart] Language changed, refreshed titles and controls');
        });

        // Reflect changes from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key === STORAGE_KEY) {
                load();
                updateBadge();
                if (itemsContainer) renderItems();
                syncQtyControls();
                updateAllAddButtons();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

/* Menus cards modal: simple category items with back/close */
(function () {
    'use strict';

    const MENUS_DATA = {
        starters: {
            title: 'ראשונות וסלטים',
            items: [
                "סלט פתוש",
                "סלט טאבולה",
                "סלט יווני",
                "קוביות חלומי מטוגנות",
                "כנפיים ברוטב צ׳ילי",
                "בטטה"
            ]
        },
        baguettes: {
            title: 'בגיטים עם ציפס',
            items: [
                "באגט חזה עוף",
                "באגט שניצל",
                "באגט קבב",
                "באגט מעורב בשרים",
                "באגט טבעוני"
            ]
        },
        toasts: {
            title: 'טוסטים עם סלט קצוץ',
            items: [
                "טוסט גבינה צהובה ושמנת גבינה",
                "טוסט מיקס גבינות ופסטו",
                "טוסט בהרכבה"
            ]
        },
        gavita: {
            title: 'כריך גביטה מוקרם',
            items: [
                "חזה עוף מוקרם",
                "שניצל מוקרם",
                "קבב מוקרם",
                "טבעוני מוקרם"
            ]
        },
        plate: {
            title: 'צלחת + ציפס/סלט',
            items: [
                "שניצל",
                "חזה עוף",
                "קבב",
                "שניצל מוקרם",
                "חזה עוף מוקרם"
            ]
        },
        fromhome: {
            title: 'מהבית הבית',
            items: [
                "עלי גפן",
                "כרוב ממולא",
                "קובה"
            ]
        }
    };

    let backdrop, modal, titleEl, listEl, closeBtn;

    function ensureModal() {
        if (backdrop) return;
        backdrop = document.createElement('div');
        backdrop.className = 'menus-modal-backdrop';
        modal = document.createElement('div');
        modal.className = 'menus-modal';
        modal.innerHTML = `
            <div class="menus-modal-header">
                <h3 class="menus-modal-title"></h3>
                <button type="button" class="menus-modal-close" aria-label="סגור">×</button>
            </div>
            <ul class="menus-modal-list"></ul>
        `;
        backdrop.appendChild(modal);
        document.body.appendChild(backdrop);

        titleEl = modal.querySelector('.menus-modal-title');
        listEl = modal.querySelector('.menus-modal-list');
        closeBtn = modal.querySelector('.menus-modal-close');

        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) closeMenusModal();
        });
        closeBtn.addEventListener('click', closeMenusModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && backdrop.classList.contains('is-open')) closeMenusModal();
        });
    }

    function openMenusModal(catKey) {
        ensureModal();
        const data = MENUS_DATA[catKey];
        if (!data) return;

        modal.setAttribute('dir', document.documentElement.dir || 'rtl');
        titleEl.textContent = data.title;
        listEl.innerHTML = '';
        data.items.forEach((txt) => {
            const li = document.createElement('li');
            li.textContent = txt;
            listEl.appendChild(li);
        });

        backdrop.classList.add('is-open');
        backdrop.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMenusModal() {
        if (!backdrop) return;
        backdrop.classList.remove('is-open');
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.menus-card').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const key = btn.getAttribute('data-menu-cat');
                // Prefer the full-screen catalog view; fallback to simple list if unavailable
                if (window.openMenusCatalog) {
                    window.openMenusCatalog(key);
                } else {
                    openMenusModal(key);
                }
            });
        });
    });
})();

/* Menus Catalog (full-screen) — item cards with name, description, price, and optional thumbnail */
(function () {
    'use strict';

    // Sample catalog data (Hebrew names + short Hebrew descriptions)
    const SAMPLE_MENUS = {
        starters: {
            title: 'ראשונות וסלטים',
            items: [
                { name: 'סלט פתוש', desc: 'סלט רענן עם ירקות טריים, סומאק ופיתה קלויה', price: '₪—', img: 'https://landing-ai-images.s3.amazonaws.com/images/img_z33lerwp85_gv7nfmokv5k_1766173670366.jpeg' },
                { name: 'טאבולה', desc: 'בורגול דק, פטרוזיליה, עגבניה ולימון', price: '₪—', img: 'https://landing-ai-images.s3.amazonaws.com/images/img_3f4ho6n4hi6_krxttpouijs_1766174829735.jpeg' },
                { name: 'סלט יווני', desc: 'עגבניות, מלפפון, זיתים וגבינה בולגרית', price: '₪—', img: 'https://landing-ai-images.s3.amazonaws.com/images/img_dpzxn1rjgts_skb302wnm9q_1766175016742.jpeg' },
                { name: 'קוביות חלומי', desc: 'חלומי פריך עם נגיעת דבש ושומשום', price: '₪—', img: 'https://landing-ai-images.s3.amazonaws.com/images/img_4e4vfsyf8x3_rth36f7l8sf_1766175502991.jpeg' },
                { name: 'צ׳יפס ביתי', desc: 'צ׳יפס ביתי - بطاطا مقلية منزلية', price: '₪—', img: 'https://landing-ai-images.s3.amazonaws.com/images/img_ckfgvq5d7p4_mbno6hw1eks_1766175685547.jpeg', alt: 'بطاطا مقلية منزلية' },
                { name: 'בטטה', desc: 'بطاطا حلوة مقلية ومقرمشة', price: '₪28', img: 'https://landing-ai-images.s3.amazonaws.com/images/img_qz36i2hiuvm_en56xxwec8l_1766176192254.jpeg', alt: 'بطاطا حلوة مقلية ومقرمشة' }
            ]
        },
        baguettes: {
            title: 'בגטים עם צ׳יפס',
            items: [
                { name: 'באגט חזה עוף', desc: 'חזה עוף מתובל, ירקות טריים ורוטב הבית', price: '₪—', img: 'https://landing-ai-images.s3.amazonaws.com/images/img_8983bmio6fu_3vnrxnenb9q_1766177204840.jpeg', altHe: 'באגט חזה עוף עם צ׳יפס', altAr: 'באגת صدر דجاج مع بطاطا مقلية' },
                { name: 'באגט שניצל', desc: 'שניצל פריך, חסה, עגבניה ומיונז', price: '₪—', img: 'https://landing-ai-images.s3.amazonaws.com/images/img_0gyimpjsk8ld_u9xidqokhaf_1766178016443.jpeg', altHe: 'באגט שניצל - שניצל פריך, חסה, עגבניה ומיונז' },
                { name: 'באגט קבב', desc: 'קבב עסיסי, טחינה וסלט קצוץ', price: '₪—', img: 'https://landing-ai-images.s3.amazonaws.com/images/img_cg4lled8npb_xztvkue5hli_1766178306431.jpeg', altHe: 'באגט קבב - קבב עסיסי, טחינה וסלט קצוץ' }
            ]
        },
        toasts: {
            title: 'טוסטים עם סלט קצוץ',
            items: [
                { name: 'טוסט גבינה צהובה', desc: 'גבינה נמסה ורוטב עדין', price: '₪—' },
                { name: 'טוסט מיקס גבינות', desc: 'תערובת גבינות עם רוטב פסטו', price: '₪—' },
                { name: 'טוסט בהרכבה', desc: 'בחרו תוספות לפי הטעם האישי', price: '₪—' }
            ]
        },
        gavita: {
            title: 'כריך גביטה מוקרם',
            items: [
                { name: 'חזה עוף מוקרם', desc: 'חזה עוף ברוטב שמנת עדין', price: '₪—', img: 'https://landing-ai-images.s3.amazonaws.com/images/img_97rysbjrgl_yqcnbr02z6_1766412725522.jpeg', altHe: 'חזה עוף מוקרם - חזה עוף ברוטב שמנת עדין', altAr: 'حـَزِه עوف מـوكَرَم - حـَזِه עوف برוטב شـמـנת עדין' },
                { name: 'שניצל מוקרם', desc: 'שניצל פריך ברוטב שמנת', price: '₪—', img: 'https://landing-ai-images.s3.amazonaws.com/images/img_gpxzdl9wz6q_qgcuiob4hoj_1766413158668.jpeg', altHe: 'שניצל מוקרם - שניצל ברוטב שמנת עדין', altAr: 'שניצל מוקרם - שניצל بصلصة كريמית' },
                { name: 'קבב מוקרם', desc: 'קבב עסיסי עם שמנת ותבלינים', price: '₪—', img: 'https://landing-ai-images.s3.amazonaws.com/images/img_wctmldhoq2b_9ysysh1t2e9_1766413908284.jpeg', altHe: 'קבב מוקרם - קבב ברוטב שמנת עדין', altAr: 'קבב מוקרם - كباب بصلصة كريמית' },
                { name: 'טבעוני מוקרם', desc: 'ירקות מוקפצים עם רוטב קרמי', price: '₪—' }
            ]
        },
        plate: {
            title: 'צלחת + צ׳יפס/סלט',
            items: [
                { name: 'שניצל', desc: 'שניצל פריך עם תוספת לבחירה', price: '₪—' },
                { name: 'חזה עוף', desc: 'נתחי חזה עוף עסיסיים על הפלנצ׳ה', price: '₪—' },
                { name: 'קבב', desc: 'קבב בקר מתובל בעדינות', price: '₪—' },
                { name: 'שניצל מוקרם', desc: 'שניצל ברוטב שמנת מפנק', price: '₪—' },
                { name: 'חזה עוף מוקרם', desc: 'חזה עוף ברוטב שמנת עדין', price: '₪—', img: 'https://landing-ai-images.s3.amazonaws.com/images/img_97rysbjrgl_yqcnbr02z6_1766412725522.jpeg', altHe: 'חזה עוף מוקרם - חזה עוף ברוטב שמנת עדין', altAr: 'حـَזِه עوف מـوكَرَم - حـَזِه עوف برוטב شـמـנת עדין' }
            ]
        },
        fromhome: {
            title: 'מהבית',
            items: [
                { name: 'עלי גפן', desc: 'עלי גפן ממולאים באורז ועשבי תיבול', price: '₪—', img: 'https://landing-ai-images.s3.amazonaws.com/images/img_8c4s6jjsbel_i3tl4lbbwr8_1766410776821.jpeg' },
                { name: 'כרוב ממולא', desc: 'כרוב עדין ממולא באורז', price: '₪—', img: 'images/stuffed_cabbage_8.jpg' },
                { name: 'קובה', desc: 'קובה במילוי בשר תבליני', price: '₪—', img: 'images/kubbeh_2_units.jpg' },
            ]
        }
    };

    let backdrop, modal, titleEl, closeBtn, gridEl;

    function ensureCatalogElements() {
        if (backdrop) return;

        // Backdrop
        backdrop = document.createElement('div');
        backdrop.className = 'menus-catalog-backdrop';
        backdrop.setAttribute('aria-hidden', 'true');

        // Modal container
        modal = document.createElement('div');
        modal.className = 'menus-catalog';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');

        // Header with close/back button
        const header = document.createElement('div');
        header.className = 'menus-catalog-header';
        header.innerHTML = `
            <h3 class="menus-catalog-title"></h3>
            <button type="button" class="menus-catalog-close" aria-label="סגור">×</button>
        `;

        // Body + grid
        const body = document.createElement('div');
        body.className = 'menus-catalog-body';
        const grid = document.createElement('div');
        grid.className = 'menus-catalog-grid';
        body.appendChild(grid);

        modal.appendChild(header);
        modal.appendChild(body);
        backdrop.appendChild(modal);
        document.body.appendChild(backdrop);

        titleEl = header.querySelector('.menus-catalog-title');
        closeBtn = header.querySelector('.menus-catalog-close');
        gridEl = grid;

        // Close interactions
        closeBtn.addEventListener('click', closeCatalog);
        document.addEventListener('keydown', (e) => {
            if (backdrop && backdrop.classList.contains('is-open') && e.key === 'Escape') {
                closeCatalog();
            }
        });
    }

    function closeCatalog() {
        if (!backdrop) return;
        backdrop.classList.remove('is-open');
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (gridEl) gridEl.innerHTML = ''; // cleanup
    }

    // Build a single card using existing menu card classes for consistent styling
    function buildItemCard(item) {
        const card = document.createElement('div');
        card.className = 'menu-item';

        if (item.img) {
            const imgWrap = document.createElement('div');
            imgWrap.className = 'menu-image';
            const img = document.createElement('img');
            img.src = item.img;
            // Localized alt text: prefer per-language alt if provided
            (function () {
                try {
                    const lang = (typeof currentLanguage === 'string' && currentLanguage) || (document.documentElement.lang || 'he');
                    const altHe = item.altHe || null;
                    const altAr = item.altAr || null;
                    let computed = '';
                    if (lang === 'he') computed = altHe || item.alt || item.name || '';
                    else if (lang === 'ar') computed = altAr || item.alt || item.name || '';
                    else computed = item.alt || altHe || altAr || item.name || '';
                    img.alt = computed;
                } catch {
                    img.alt = item.alt || item.name || '';
                }
            })();
            img.loading = 'lazy';
            img.decoding = 'async';
            img.sizes = '(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw';
            if (item.imgStyle) img.setAttribute('style', item.imgStyle);
            imgWrap.appendChild(img);
            card.appendChild(imgWrap);
        }

        const content = document.createElement('div');
        content.className = 'menu-content';

        const h3 = document.createElement('h3');
        h3.textContent = item.name || '';
        content.appendChild(h3);

        if (item.desc) {
            const p = document.createElement('p');
            p.textContent = item.desc;
            content.appendChild(p);
        }

        const price = document.createElement('div');
        price.className = 'price';
        price.textContent = item.price || '₪—';
        content.appendChild(price);

        card.appendChild(content);
        return card;
    }

    function renderCatalog(catKey) {
        if (!gridEl) return;
        gridEl.innerHTML = '';
        const data = SAMPLE_MENUS[catKey];
        if (!data || !Array.isArray(data.items)) return;

        // Respect document direction
        const dir = document.documentElement.dir || 'rtl';
        modal.setAttribute('dir', dir);

        data.items.forEach((item) => {
            const card = buildItemCard(item);
            gridEl.appendChild(card);
        });
    }

    function openMenusCatalog(catKey) {
        ensureCatalogElements();
        const data = SAMPLE_MENUS[catKey] || { title: '', items: [] };
        if (titleEl) titleEl.textContent = data.title || '';
        renderCatalog(catKey);

        backdrop.classList.add('is-open');
        backdrop.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    // Expose a minimal API for the menus buttons to use
    window.openMenusCatalog = openMenusCatalog;
})();

// Build Arabic WhatsApp order message from page fields or nearest product card
function buildArabicOrderMessage(contextEl) {
    const closestCard = (contextEl && contextEl.closest) ? contextEl.closest('.menu-item') : null;

    // Product name
    let productName = '';
    if (closestCard) {
        const titleEl = closestCard.querySelector('.menu-content h3');
        if (titleEl) productName = (titleEl.textContent || '').trim();
    }
    if (!productName) {
        const selectedTitle = document.querySelector('.menu-item.has-quantity .menu-content h3');
        if (selectedTitle) productName = (selectedTitle.textContent || '').trim();
    }
    if (!productName) {
        const anyTitle = document.querySelector('.menu-item .menu-content h3');
        if (anyTitle) productName = (anyTitle.textContent || '').trim();
    }

    // Quantity
    let quantity = '';
    if (closestCard) {
        const qEl = closestCard.querySelector('.qty-control .qc-value');
        if (qEl) quantity = (qEl.textContent || '').trim();
    }
    if (!quantity) {
        const qField = document.querySelector('input[name="quantity"], select[name="quantity"]');
        if (qField) quantity = (qField.value || '').trim();
    }

    // Customer fields
    const customerName =
        (document.querySelector('input[name="name"], input[name="customerName"], #name')?.value || '').trim();
    const phone =
        (document.querySelector('input[name="phone"], input[type="tel"], #phone')?.value || '').trim();
    const address =
        (document.querySelector('input[name="deliveryAddress"], input[name="address"], #deliveryAddress, #address')?.value || '').trim();
    const notes =
        (document.querySelector('textarea[name="message"], textarea[name="notes"], #message, #notes')?.value || '').trim();

    // Exact Arabic template required
    const message =
`مرحباً، أود طلبية:
• المنتج: ${productName}
• الكمية: ${quantity}
• الاسم: ${customerName}
• رقم الهاتف: ${phone}
• العنوان: ${address}
ملاحظات: ${notes}
شكراً`;

    return message;
}

// Open WhatsApp QR link with the message as ?text=...
function openWhatsappQrWithMessage(message) {
    const base = 'https://wa.me/qr/WVTPHTOPJZT7B1';
    const url = `${base}?text=${encodeURIComponent(message || '')}`;
    window.location.href = url;
}

 // Delegate click for an order button with exact Arabic label "اطلب"
document.addEventListener('click', (e) => {
    const btn = e.target && e.target.closest ? e.target.closest('button, a, [role="button"]') : null;
    if (!btn) return;
    const label = (btn.textContent || '').trim();
    if (label === 'اطلب') {
        e.preventDefault();
        const msg = buildArabicOrderMessage(btn);
        openWhatsappQrWithMessage(msg);
    }
});

/* Added badge manager: lightweight cart sync and UI badge */
(function () {
    'use strict';

    function normalizeName(n) {
        return String(n || '').trim();
    }

    function getCart() {
        try {
            const raw = localStorage.getItem('cart');
            const arr = raw ? JSON.parse(raw) : [];
            return Array.isArray(arr) ? arr : [];
        } catch {
            return [];
        }
    }

    function setCart(arr) {
        try {
            localStorage.setItem('cart', JSON.stringify(arr || []));
        } catch {}
    }

    function qtyForName(name) {
        const arr = getCart();
        const idx = arr.findIndex(x => x && x.name === name);
        return idx >= 0 ? (parseInt(arr[idx].qty, 10) || 0) : 0;
    }

    function ensureBadgeElForItem(itemEl) {
        if (!itemEl) return null;
        // Place the badge inline at the very end of the meal title text
        const titleEl = itemEl.querySelector('.item-name') || itemEl.querySelector('.menu-content h3');
        const target = titleEl || itemEl;

        // Prefer an existing badge anywhere in the item to avoid duplicates
        let badge = itemEl.querySelector('.added-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'added-badge';
            // Make it keyboard-focusable and operable
            badge.setAttribute('role', 'button');
            badge.setAttribute('tabindex', '0');
            badge.setAttribute('aria-label', 'Added 0');
            badge.textContent = '0';
            target.appendChild(badge);
        } else if (badge.parentElement !== target) {
            // Move badge to the end of the title text
            target.appendChild(badge);
        }
        return badge;
    }

    function findItemElByName(name) {
        const wanted = normalizeName(name);
        if (!wanted) return null;
        const nodes = document.querySelectorAll('.menu-section .menu-item .item-name, .menu-item .menu-content h3');
        for (const node of nodes) {
            const text = normalizeName(node.textContent);
            if (text === wanted) {
                return node.closest('.menu-item');
            }
        }
        return null;
    }

    function setAddedStateByName(name, qty) {
        const itemEl = findItemElByName(name);
        if (!itemEl) return;
        const n = parseInt(qty, 10) || 0;
        const added = n > 0;
        const badge = ensureBadgeElForItem(itemEl);
        if (badge) {
            badge.textContent = `${n}`;
            badge.setAttribute('aria-label', `Added ${n}`);
        }
        itemEl.classList.toggle('has-added', added);
        if (added) {
            itemEl.setAttribute('data-added', 'true');
        } else {
            itemEl.removeAttribute('data-added');
        }
    }

    function addToCart(name, qty = 1) {
        const n = normalizeName(name);
        const q = Math.max(0, parseInt(qty, 10) || 0);
        const arr = getCart();
        const idx = arr.findIndex(x => x && x.name === n);
        if (idx >= 0) {
            arr[idx].qty = (parseInt(arr[idx].qty, 10) || 0) + q;
        } else {
            arr.push({ name: n, qty: q });
        }
        setCart(arr);
        setAddedStateByName(n, qtyForName(n));
    }

    function removeFromCart(name) {
        const n = normalizeName(name);
        const arr = getCart();
        const idx = arr.findIndex(x => x && x.name === n);
        if (idx >= 0) {
            arr[idx].qty = 0;
        } else {
            arr.push({ name: n, qty: 0 });
        }
        setCart(arr);
        setAddedStateByName(n, 0);
    }

    function setQtyByName(name, qty) {
        const n = normalizeName(name);
        const q = Math.max(0, parseInt(qty, 10) || 0);
        const arr = getCart();
        const idx = arr.findIndex(x => x && x.name === n);
        if (idx >= 0) {
            arr[idx].qty = q;
        } else {
            arr.push({ name: n, qty: q });
        }
        setCart(arr);
        setAddedStateByName(n, qtyForName(n));
    }

    function reflectCartBadges() {
        // Ensure every item shows a badge with current quantity (default 0)
        const nodes = document.querySelectorAll('.menu-section .menu-item .item-name, .menu-item .menu-content h3');
        nodes.forEach(node => {
            const name = normalizeName(node.textContent);
            if (!name) return;
            const qty = qtyForName(name);
            setAddedStateByName(name, qty);
        });
    }

    // Expose minimal API for other modules (e.g., recommendation modal)
    if (typeof window.addToCart !== 'function') {
        window.addToCart = addToCart;
    }
    if (typeof window.removeFromCart !== 'function') {
        window.removeFromCart = removeFromCart;
    }
    window.mkUpdateAddedBadgeByName = setAddedStateByName;

    // Quantity badge behavior +N on structured menu items
    document.addEventListener('click', (e) => {
        // Increment when clicking the badge itself
        const badge = e.target && e.target.closest ? e.target.closest('.menu-section .menu-item .added-badge') : null;
        if (badge) {
            e.preventDefault();
            e.stopPropagation();
            const li = badge.closest('.menu-section .menu-item');
            const nameNode = li && li.querySelector('.item-name, .menu-content h3');
            const name = normalizeName(nameNode ? nameNode.textContent : '');
            if (!name) return;
            addToCart(name, 1);
            // If the order modal is open for this item, sync its quantity field
            const newQty = qtyForName(name);
            if (window.smartOrderModal
                && typeof window.smartOrderModal.isOpen === 'function'
                && window.smartOrderModal.isOpen()
                && typeof window.smartOrderModal.getItemName === 'function'
                && window.smartOrderModal.getItemName() === name
                && typeof window.smartOrderModal.setQty === 'function') {
                window.smartOrderModal.setQty(newQty);
            }
            return;
        }

        // Clicking an item: open the modal with current quantity (default 0) without auto-increment
        const li = e.target && e.target.closest ? e.target.closest('.menu-section .menu-item') : null;
        if (!li) return;
        const nameNode = li.querySelector('.item-name, .menu-content h3');
        if (!nameNode) return;
        const name = normalizeName(nameNode.textContent);
        if (!name) return;

        const qty = qtyForName(name);

        // Always open the small order modal to let user adjust quantity
        if (window.smartOrderModal && typeof window.smartOrderModal.show === 'function') {
            window.smartOrderModal.show(name, {
                initialQty: qty,
                onConfirm: (newQty) => setQtyByName(name, newQty)
            });
        }
    }, true);

    // Long-press removal on the quantity badge (+N)
    let mkLpTimer = null;
    function mkClearLp() { if (mkLpTimer) { clearTimeout(mkLpTimer); mkLpTimer = null; } }
    document.addEventListener('pointerdown', (e) => {
        const badge = e.target && e.target.closest ? e.target.closest('.menu-section .menu-item .added-badge') : null;
        if (!badge) return;
        const li = badge.closest('.menu-section .menu-item');
        const nameNode = li && li.querySelector('.item-name, .menu-content h3');
        const name = normalizeName(nameNode ? nameNode.textContent : '');
        mkClearLp();
        mkLpTimer = setTimeout(() => {
            removeFromCart(name);
            mkClearLp();
        }, 550);
    }, true);
    ['pointerup','pointercancel','pointerleave','scroll'].forEach(evt => {
        document.addEventListener(evt, mkClearLp, true);
    });

    // Keyboard support for badge: Enter/Space increments
    document.addEventListener('keydown', (e) => {
        const badge = e.target && e.target.closest ? e.target.closest('.menu-section .menu-item .added-badge') : null;
        if (!badge) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const li = badge.closest('.menu-section .menu-item');
            const nameNode = li && li.querySelector('.item-name, .menu-content h3');
            const name = normalizeName(nameNode ? nameNode.textContent : '');
            if (!name) return;
            addToCart(name, 1);
            const newQty = qtyForName(name);
            if (window.smartOrderModal
                && typeof window.smartOrderModal.isOpen === 'function'
                && window.smartOrderModal.isOpen()
                && typeof window.smartOrderModal.getItemName === 'function'
                && window.smartOrderModal.getItemName() === name
                && typeof window.smartOrderModal.setQty === 'function') {
                window.smartOrderModal.setQty(newQty);
            }
        }
    }, true);

    // Generic add-to-cart buttons support (+1 per click)
    document.addEventListener('click', (e) => {
        const addBtn = e.target && e.target.closest ? e.target.closest('[class*="add-to-cart"]') : null;
        if (!addBtn) return;
        let name = addBtn.getAttribute('data-name') || addBtn.getAttribute('data-product-name') || '';
        if (!name) {
            const li = addBtn.closest('.menu-section .menu-item') || addBtn.closest('.menu-item');
            const node = li && li.querySelector('.item-name, .menu-content h3, .product-title, .product-name');
            if (node) name = normalizeName(node.textContent);
        } else {
            name = normalizeName(name);
        }
        if (!name) return;
        e.preventDefault();
        e.stopPropagation();
        addToCart(name, 1);
    }, true);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', reflectCartBadges);
    } else {
        reflectCartBadges();
    }
})();

/* Smart order modal for recommendation items */
document.addEventListener('DOMContentLoaded', () => {
    let backdrop, modal, titleEl, qtyInput, btnWhatsApp, btnCart, closeBtn, currentItemName = null;
    let escHandlerBound = null;

    function ensureModal() {
        if (backdrop) return;

        backdrop = document.createElement('div');
        backdrop.className = 'smart-order-modal__backdrop';
        backdrop.setAttribute('aria-hidden', 'true');

        modal = document.createElement('div');
        modal.className = 'smart-order-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'smart-order-title');

        modal.innerHTML = `
            <button type="button" class="smart-order-modal__close" aria-label="Close">×</button>
            <h3 id="smart-order-title" class="smart-order-modal__title"></h3>
            <div class="smart-order-modal__field">
                <label for="smart-order-qty" class="smart-order-modal__qty-label">الكمية</label>
                <input id="smart-order-qty" class="smart-order-modal__qty-input" type="number" min="0" value="0" inputmode="numeric">
            </div>
            <div class="smart-order-modal__actions">
                <button type="button" class="smart-order-modal__action smart-order-modal__action--whatsapp">طلب عبر واتساب</button>
                <button type="button" class="smart-order-modal__action smart-order-modal__action--cart">إضافة إلى السلة</button>
            </div>
        `;

        backdrop.appendChild(modal);
        document.body.appendChild(backdrop);

        titleEl = modal.querySelector('.smart-order-modal__title');
        qtyInput = modal.querySelector('.smart-order-modal__qty-input');
        btnWhatsApp = modal.querySelector('.smart-order-modal__action--whatsapp');
        btnCart = modal.querySelector('.smart-order-modal__action--cart');
        closeBtn = modal.querySelector('.smart-order-modal__close');

        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) hideModal();
        });
        closeBtn.addEventListener('click', hideModal);
    }

    function sanitizeQty(v) {
        const n = parseInt(v, 10);
        return Number.isFinite(n) && n >= 0 ? n : 0;
    }

    function openWhatsappQrNewTab(message) {
        const base = 'https://wa.me/qr/WVTPHTOPJZT7B1';
        const url = `${base}?text=${encodeURIComponent(message || '')}`;
        // Prefer existing function by using its exact endpoint, but open in a new tab
        try {
            window.open(url, '_blank', 'noopener');
        } catch {
            // Fallback to same-tab navigation if popup blocked
            window.location.href = url;
        }
    }

    function getCartArray() {
        try {
            const raw = localStorage.getItem('cart');
            const arr = raw ? JSON.parse(raw) : [];
            return Array.isArray(arr) ? arr : [];
        } catch {
            return [];
        }
    }
    function setCartArray(arr) {
        try {
            localStorage.setItem('cart', JSON.stringify(arr || []));
        } catch {}
    }
    function addToCartFallback(name, qty) {
        const arr = getCartArray();
        const idx = arr.findIndex(it => it && it.name === name);
        if (idx >= 0) {
            arr[idx].qty = sanitizeQty((arr[idx].qty || 0) + qty);
        } else {
            arr.push({ name, qty: sanitizeQty(qty) });
        }
        setCartArray(arr);
    }

    function showModal(itemName, opts = {}) {
        ensureModal();
        currentItemName = itemName || '';
        titleEl.textContent = currentItemName;
        const initQty = Math.max(0, parseInt((opts && opts.initialQty) || '0', 10) || 0);
        qtyInput.value = String(initQty);
        backdrop.classList.add('is-open');
        backdrop.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        // Respect page direction
        const dir = document.documentElement.dir || 'rtl';
        modal.setAttribute('dir', dir);

        // Wire actions
        btnWhatsApp.onclick = () => {
            const qty = sanitizeQty(qtyInput.value);
            if (qty <= 0) return; // do not send if quantity is 0
            const msg = `أريد طلب: ${itemName} — الكمية: ${qty}`;
            openWhatsappQrNewTab(msg);
            hideModal();
        };
        btnCart.onclick = () => {
            const qty = sanitizeQty(qtyInput.value);
            if (opts && typeof opts.onConfirm === 'function') {
                try { opts.onConfirm(qty); } catch {}
            } else if (typeof window.addToCart === 'function') {
                try { window.addToCart(itemName, qty); } catch {}
            } else {
                addToCartFallback(itemName, qty);
            }
            hideModal();
        };

        // Esc to close
        escHandlerBound = (e) => {
            if (e.key === 'Escape') hideModal();
        };
        document.addEventListener('keydown', escHandlerBound);

        // Focus quantity
        setTimeout(() => qtyInput && qtyInput.focus(), 0);
    }

    function hideModal() {
        if (!backdrop) return;
        backdrop.classList.remove('is-open');
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (escHandlerBound) {
            document.removeEventListener('keydown', escHandlerBound);
            escHandlerBound = null;
        }
        currentItemName = null;
    }

    // Expose lightweight API for other modules
    window.smartOrderModal = {
        show: showModal,
        isOpen: () => !!(backdrop && backdrop.classList.contains('is-open')),
        getItemName: () => currentItemName,
        setQty: (qty) => {
            const n = Math.max(1, parseInt(qty, 10) || 1);
            if (qtyInput) qtyInput.value = String(n);
        }
    };

    // Delegate clicks on recommendation items (support multiple unobtrusive markers)
    document.addEventListener('click', (e) => {
        const trigger = e.target && e.target.closest
            ? e.target.closest('.recommendation-item, .recommended-item, .is-recommended, [data-recommendation], [data-recommended]')
            : null;
        if (!trigger) return;

        e.preventDefault();
        const name =
            trigger.getAttribute('data-name') ||
            trigger.dataset?.name ||
            (trigger.innerText || trigger.textContent || '').trim() ||
            'المنتج';

        showModal(name);
    }, true);
});

/* Mini cart icon + badge on FABs and simple cart overlay */
(function () {
    'use strict';

    function parseJson(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch {
            return fallback;
        }
    }

    // Lightweight helpers for the mini-cart overlay
    function getCartArray() {
        const arr = parseJson('cart', []);
        return Array.isArray(arr) ? arr : [];
    }
    function setCartArray(arr) {
        try { localStorage.setItem('cart', JSON.stringify(Array.isArray(arr) ? arr : [])); } catch {}
    }
    function normalizeText(t) {
        return (t || '').toString().trim();
    }
    function findStructuredItemNodeByName(name) {
        const wanted = normalizeText(name);
        if (!wanted) return null;
        // Structured text menu
        const nodes = document.querySelectorAll('.menu-section .menu-item');
        for (const li of nodes) {
            const nm = normalizeText(li.querySelector('.item-name')?.textContent);
            if (nm === wanted) return li;
        }
        // Card/grid layout
        const cards = document.querySelectorAll('.menu-item');
        for (const card of cards) {
            const nm = normalizeText(card.querySelector('.menu-content h3')?.textContent);
            if (nm === wanted) return card;
        }
        return null;
    }
    function findThumbForName(name) {
        const node = findStructuredItemNodeByName(name);
        if (!node) return null;
        // Prefer card image
        const img = node.querySelector('.menu-image img') || node.querySelector('img');
        const src = img && (img.getAttribute('src') || img.src);
        return src || null;
    }
    function findPriceForName(name) {
        const node = findStructuredItemNodeByName(name);
        let text = '';
        if (node) {
            // Structured list price
            const p1 = node.querySelector('.item-price');
            if (p1) text = normalizeText(p1.textContent);
            // Card price
            if (!text) {
                const p2 = node.querySelector('.price');
                if (p2) text = normalizeText(p2.textContent);
            }
        }
        // Fallback: try to find a sibling price by traversing DOM (best-effort)
        if (!text) {
            const all = document.querySelectorAll('.item-name, .menu-content h3');
            for (const el of all) {
                if (normalizeText(el.textContent) === normalizeText(name)) {
                    const maybe = el.closest('.menu-item')?.querySelector('.item-price, .price');
                    if (maybe) { text = normalizeText(maybe.textContent); break; }
                }
            }
        }
        // Extract numeric value
        const num = parseInt((text || '').replace(/[^\d]/g, ''), 10);
        const value = Number.isFinite(num) ? num : 0;
        const display = value > 0 ? `₪${value}` : '';
        return { value, display };
    }
    function currency(amount) {
        const v = Math.max(0, parseInt(amount, 10) || 0);
        return `₪${v}`;
    }

    function currencyPrecise(amount) {
        const n = Number(amount) || 0;
        const rounded = Math.round(n * 100) / 100;
        return '₪' + (Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2));
    }

    // Calculate and update the mini-cart order total (₪) from current cart items.
    // Sums unit price (parsed from DOM/menu) * quantity for each item.
    function calculateCartTotal() {
        const arr = getCartArray();
        let sum = 0;
        if (Array.isArray(arr)) {
            arr.forEach(it => {
                if (!it || !it.name) return;
                const qty = Math.max(0, parseInt(it.qty, 10) || 0);
                if (qty <= 0) return;
                const { value: unitPrice } = findPriceForName(it.name);
                sum += (unitPrice || 0) * qty;
            });
        }
        // Update displayed total if present
        const totalEl = document.querySelector('.mini-cart-total-value');
        if (totalEl) totalEl.textContent = currencyPrecise(sum);
        return sum;
    }

    function getMkCartTotal() {
        const obj = parseJson('mkCartItems', {});
        if (!obj || typeof obj !== 'object') return 0;
        return Object.values(obj).reduce((a, b) => a + (parseInt(b, 10) || 0), 0);
    }

    function getLegacyCartTotal() {
        const arr = parseJson('cart', []);
        if (!Array.isArray(arr)) return 0;
        return arr.reduce((sum, it) => sum + (parseInt(it && it.qty, 10) || 0), 0);
    }

    function getTotalCount() {
        const a = getMkCartTotal();
        const b = getLegacyCartTotal();
        return Math.max(a, b);
    }

    function openWaWithText(message) {
        const base = 'https://wa.me/qr/WVTPHTOPJZT7B1';
        const url = `${base}?text=${encodeURIComponent(message || '')}`;
        try {
            window.open(url, '_blank', 'noopener');
        } catch {
            window.location.href = url;
        }
    }

    function buildCartMessage(arr) {
        if (!Array.isArray(arr) || arr.length === 0) return '';
        const lines = [];
        let total = 0;
        let included = 0;
        arr
            .filter(it => it && it.name && (parseInt(it.qty, 10) || 0) > 0)
            .forEach(it => {
                const n = (it.name || '').toString();
                const q = Math.max(0, parseInt(it.qty, 10) || 0);
                if (q <= 0) return;
                const { value: unitPrice } = findPriceForName(n);
                total += (unitPrice || 0) * q;
                lines.push(`• ${n} × ${q}`);
                included++;
            });
        if (included === 0) return '';
        lines.push(`الإجمالي: ${currency(total)}`);
        return lines.join('\n');
    }

    function sendCartWhatsApp() {
        const arr = getCartArray();
        const msg = buildCartMessage(arr);
        if (!msg) return;
        openWaWithText(msg);
    }

    function sendItemWhatsApp(name, qty) {
        const n = (name || '').toString();
        const q = Math.max(1, parseInt(qty, 10) || 1);
        if (!n) return;
        const msg = buildCartMessage([{ name: n, qty: q }]);
        openWaWithText(msg);
    }

    function ensureOverlay() {
        let overlay = document.querySelector('.mini-cart-overlay');
        if (overlay) return overlay;

        overlay = document.createElement('div');
        overlay.className = 'mini-cart-overlay';
        overlay.innerHTML = `
            <div class="mini-cart-modal" role="dialog" aria-modal="true" aria-labelledby="mini-cart-title">
                <div class="mini-cart-header">
                    <h3 id="mini-cart-title" class="mini-cart-title">السلة</h3>
                    <button type="button" class="mini-cart-close" aria-label="إغلاق">×</button>
                </div>
                <ul class="mini-cart-list" aria-live="polite"></ul>
                <div class="mini-cart-footer">
                    <div class="mini-cart-total">الإجمالي: <span class="mini-cart-total-value">₪0</span></div>
                    <button type="button" class="mini-cart-wa-icon" aria-label="إرسال عبر واتساب" disabled>
                        <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true" fill="currentColor">
                            <path d="M19.11 17.56c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.57-.49-.49-.67-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.52 0 1.49 1.07 2.93 1.22 3.13.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM16.02 4C9.93 4 5 8.93 5 15.02c0 1.94.51 3.76 1.39 5.34L5 27l6.82-1.78c1.54.84 3.31 1.32 5.2 1.32 6.09 0 11.02-4.93 11.02-11.02S22.11 4 16.02 4zm0 20.08c-1.71 0-3.3-.5-4.64-1.35l-.33-.2-4.04 1.06 1.08-3.94-.22-.36A8.98 8.98 0 017.04 15c0-4.95 4.02-8.98 8.98-8.98 4.95 0 8.98 4.03 8.98 8.98 0 4.95-4.03 9.08-8.98 9.08z"></path>
                        </svg>
                    </button>
                </div>
                <div class="mini-cart-confirm" aria-hidden="true">
                    <div class="mini-cart-confirm-box" role="dialog" aria-modal="true" aria-labelledby="mini-cart-confirm-title">
                        <h4 id="mini-cart-confirm-title" class="mini-cart-confirm-title">إرسال الطلب عبر واتساب؟</h4>
                        <div class="mini-cart-confirm-summary"></div>
                        <div class="mini-cart-confirm-actions">
                            <button type="button" class="mini-cart-confirm-cancel">إلغاء</button>
                            <button type="button" class="mini-cart-confirm-send">إرسال</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Respect page direction
        const modal = overlay.querySelector('.mini-cart-modal');
        if (modal) modal.setAttribute('dir', document.documentElement.dir || 'rtl');

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) hideOverlay();
        });
        const closeBtn = overlay.querySelector('.mini-cart-close');
        closeBtn && closeBtn.addEventListener('click', hideOverlay);

        // WhatsApp icon click -> open confirm
        const waIcon = overlay.querySelector('.mini-cart-wa-icon');
        if (waIcon) {
            waIcon.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openConfirm();
            });
        }

        // Esc to close whole overlay or close confirm if open
        document.addEventListener('keydown', (e) => {
            if (!overlay.classList.contains('active')) return;
            if (e.key === 'Escape') {
                const confirmEl = overlay.querySelector('.mini-cart-confirm');
                if (confirmEl && confirmEl.classList.contains('active')) {
                    closeConfirm();
                } else {
                    hideOverlay();
                }
            }
        });

        return overlay;
    }

    function renderOverlay() {
        const overlay = ensureOverlay();
        const modal = overlay.querySelector('.mini-cart-modal');
        if (modal) modal.setAttribute('dir', document.documentElement.dir || 'rtl');

        const list = overlay.querySelector('.mini-cart-list');
        const totalEl = overlay.querySelector('.mini-cart-total-value');
        const waIcon = overlay.querySelector('.mini-cart-wa-icon');
        const confirmEl = overlay.querySelector('.mini-cart-confirm');
        // If a confirm is open and user changes quantities, close it to avoid overlap
        if (confirmEl && confirmEl.classList.contains('active')) {
            closeConfirm();
        }

        list.innerHTML = '';

        const arr = getCartArray();
        let grandTotal = 0;
        let any = false;

        if (Array.isArray(arr) && arr.length) {
            arr.forEach(it => {
                if (!it) return;
                const name = normalizeText(it.name);
                const qty = Math.max(0, parseInt(it.qty, 10) || 0);
                if (qty <= 0) return; // skip zero-quantity items
                const { value: unitPrice, display: displayPrice } = findPriceForName(name);
                const lineTotal = unitPrice * qty;
                grandTotal += lineTotal;

                const li = document.createElement('li');
                li.className = 'mini-cart-item';
                li.setAttribute('data-name', name);

                const thumb = findThumbForName(name);
                const thumbHtml = thumb ? `<img class="mini-cart-thumb" src="${thumb}" alt="" loading="lazy">` : `<div class="mini-cart-thumb mini-cart-thumb--placeholder" aria-hidden="true"></div>`;

                li.innerHTML = `
                    ${thumbHtml}
                    <div class="mini-cart-info">
                        <span class="mini-cart-item-name">${name}</span>
                        <span class="mini-cart-item-price" data-unit="${unitPrice}">${displayPrice || ''}</span>
                        <span class="mini-cart-item-subtotal">${currencyPrecise(lineTotal)}</span>
                    </div>
                    <div class="mini-cart-qty">
                        <button type="button" class="mc-btn minus" aria-label="طرح">−</button>
                        <span class="mini-cart-qty-value">${qty}</span>
                        <button type="button" class="mc-btn plus" aria-label="إضافة">+</button>
                    </div>
                    <button type="button" class="mini-cart-delete" aria-label="حذف">🗑️</button>
                `;

                // Wire qty controls
                const minus = li.querySelector('.mc-btn.minus');
                const plus = li.querySelector('.mc-btn.plus');
                const del = li.querySelector('.mini-cart-delete');

                const applyQty = (newQty) => {
                    const q = Math.max(0, newQty);
                    const cart = getCartArray();
                    const idx = cart.findIndex(x => x && normalizeText(x.name) === name);
                    if (idx >= 0) {
                        cart[idx].qty = q;
                    } else {
                        cart.push({ name, qty: q });
                    }
                    setCartArray(cart);
                    // Update badges across UI
                    if (typeof window.mkUpdateAddedBadgeByName === 'function') {
                        try { window.mkUpdateAddedBadgeByName(name, q); } catch {}
                    }
                    updateBadges();
                    renderOverlay();
                };

                minus.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    applyQty(qty - 1);
                });
                plus.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    applyQty(qty + 1);
                });
                del.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    applyQty(0);
                });

                list.appendChild(li);
                any = true;
            });

            if (any) {
                const totalNow = calculateCartTotal();
                if (waIcon) waIcon.disabled = !(totalNow > 0);
            } else {
                const li = document.createElement('li');
                li.className = 'mini-cart-item mini-cart-empty';
                const lang = (typeof currentLanguage === 'string' && currentLanguage) || (document.documentElement.lang || 'he');
                const empty =
                    (translations && translations[lang] && translations[lang]['cart-empty']) ||
                    'السلة فارغة';
                li.textContent = empty;
                list.appendChild(li);
                if (totalEl) totalEl.textContent = currencyPrecise(0);
                if (waIcon) waIcon.disabled = true;
            }
        } else {
            const li = document.createElement('li');
            li.className = 'mini-cart-item mini-cart-empty';
            const lang = (typeof currentLanguage === 'string' && currentLanguage) || (document.documentElement.lang || 'he');
            const empty =
                (translations && translations[lang] && translations[lang]['cart-empty']) ||
                'السلة فارغة';
            li.textContent = empty;
            list.appendChild(li);
            if (totalEl) totalEl.textContent = currency(0);
            if (waIcon) waIcon.disabled = true;
        }
    }

    function showOverlay() {
        const overlay = ensureOverlay();
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        renderOverlay();
    }

    function hideOverlay() {
        const overlay = document.querySelector('.mini-cart-overlay');
        if (!overlay) return;
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function updateBadges() {
        const c = getTotalCount();
        document.querySelectorAll('.mini-cart-count').forEach(el => {
            el.textContent = String(c);
            // Always visible but you can toggle if needed
            el.style.display = 'inline-flex';
        });
    }

    function injectMiniInto(el) {
        if (!el) return null;
        let mini = el.querySelector('.fab-mini-cart');
        if (mini) return mini;

        mini = document.createElement('span');
        mini.className = 'fab-mini-cart';
        mini.setAttribute('role', 'button');
        mini.setAttribute('aria-label', 'السلة');
        mini.innerHTML = `
            <svg class="mini-cart-icon" aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M7 4h-2a1 1 0 100 2h1.28l1.6 8.03A2 2 0 0010.84 16h6.58a2 2 0 001.97-1.64l1.08-6A1 1 0 0019.5 7h-10l-.38-2A1 1 0 008.17 4H7zm3.5 17a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm7 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
            </svg>
            <span class="mini-cart-count">0</span>
        `;
        el.appendChild(mini);
        return mini;
    }

    function bindTriggers() {
        document.querySelectorAll('.cart-fab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showOverlay();
            });
        });
        document.querySelectorAll('.fab-mini-cart').forEach(mini => {
            mini.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showOverlay();
            });
        });
    }

    function init() {
        // Bind cart button trigger and update badge
        bindTriggers();
        updateBadges();
        calculateCartTotal();

        // Update on storage changes
        window.addEventListener('storage', (e) => {
            if (e.key === 'cart' || e.key === 'mkCartItems') {
                updateBadges();
                const ov = document.querySelector('.mini-cart-overlay');
                if (ov && ov.classList.contains('active')) renderOverlay();
            }
        });

        // Periodic refresh as fallback
        setInterval(updateBadges, 1200);

        // Keep overlay content language-aware
        document.addEventListener('languagechange', () => {
            const ov = document.querySelector('.mini-cart-overlay');
            if (ov && ov.classList.contains('active')) renderOverlay();
        });
    }

    // Simple in-overlay confirmation flow for WhatsApp send
    function openConfirm() {
        const overlay = ensureOverlay();
        const c = overlay.querySelector('.mini-cart-confirm');
        if (!c) return;
        // Build summary
        const arr = getCartArray();
        const box = overlay.querySelector('.mini-cart-confirm-summary');
        let total = 0;
        if (box) {
            box.innerHTML = '';
            const ul = document.createElement('ul');
            ul.className = 'mini-cart-confirm-list';
            arr.forEach(it => {
                if (!it) return;
                const name = normalizeText(it.name);
                const qty = Math.max(1, parseInt(it.qty, 10) || 1);
                const { value } = findPriceForName(name);
                total += (value || 0) * qty;
                const li = document.createElement('li');
                li.textContent = `${name} × ${qty}`;
                ul.appendChild(li);
            });
            const totalEl = document.createElement('div');
            totalEl.className = 'mini-cart-confirm-total';
            totalEl.textContent = `الإجمالي: ${currency(total)}`;
            box.appendChild(ul);
            box.appendChild(totalEl);
        }
        c.classList.add('active');
        c.setAttribute('aria-hidden', 'false');

        const btnSend = overlay.querySelector('.mini-cart-confirm-send');
        const btnCancel = overlay.querySelector('.mini-cart-confirm-cancel');

        const onCancel = (e) => {
            e && e.preventDefault();
            closeConfirm();
        };
        const onSend = (e) => {
            e && e.preventDefault();
            const msg = buildCartMessage(getCartArray());
            if (msg) openWaWithText(msg);
            closeConfirm();
            hideOverlay();
        };

        btnCancel && btnCancel.addEventListener('click', onCancel, { once: true });
        btnSend && btnSend.addEventListener('click', onSend, { once: true });
    }
    function closeConfirm() {
        const overlay = document.querySelector('.mini-cart-overlay');
        const c = overlay && overlay.querySelector('.mini-cart-confirm');
        if (!c) return;
        c.classList.remove('active');
        c.setAttribute('aria-hidden', 'true');
        // Clean summary
        const box = c.querySelector('.mini-cart-confirm-summary');
        if (box) box.innerHTML = '';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
