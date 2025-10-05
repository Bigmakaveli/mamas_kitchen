Summary of changes (2025-10-05):
- script.js: Updated mobile detection to a mobile-first approach that explicitly checks for Android or iPhone/iPad user agents. Modified openWhatsApp() to open the native WhatsApp app via the whatsapp:// URI on supported mobile devices and to use https://wa.me/<number>?text=... as the desktop fallback. Existing phone numbers and prefilled messages are preserved and reused. Both the floating WhatsApp button and the cart "Send via WhatsApp" action use this logic.
- No changes to layout or styles (style.css unchanged). index.html unchanged.
