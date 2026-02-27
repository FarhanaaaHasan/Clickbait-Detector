// Configuration & Patterns
const CLICKBAIT_PHRASES = [
    "you won't believe", "shocking", "wait for it", "gone wrong",
    "the secret to", "this one trick", "they didn't want you to",
    "will change your life", "heartbreaking", "insane", "unbelievable",
    "this is why", "the truth about", "stop doing this", "what happens next"
];

let isEnabled = true;

// Initialize
chrome.storage.local.get(['detectorActive'], (result) => {
    isEnabled = result.detectorActive !== false;
    if (isEnabled) {
        scanPage();
    }
});

// Periodic scanning for dynamic content
const observer = new MutationObserver((mutations) => {
    if (!isEnabled) return;

    // De-bounce scanning to save performance
    clearTimeout(window.scanTimeout);
    window.scanTimeout = setTimeout(scanPage, 500);
});

observer.observe(document.body, { childList: true, subtree: true });

function scanPage() {
    if (!isEnabled) return;

    // Find potential headlines
    const elements = document.querySelectorAll('h1, h2, h3, #video-title, .video-title, a[title]');

    let scannedThisTurn = 0;
    let caughtThisTurn = 0;

    elements.forEach(el => {
        // Don't scan the same element twice
        if (el.dataset.cbChecked) return;

        const text = el.innerText || el.textContent;
        if (!text || text.length < 15) return; // Ignore very short text

        scannedThisTurn++;
        const clickbaitScore = analyzeText(text);

        if (clickbaitScore > 0.6) {
            markAsClickbait(el);
            caughtThisTurn++;
        }

        el.dataset.cbChecked = "true";
    });

    // Update statistics in storage
    if (scannedThisTurn > 0) {
        chrome.storage.local.get(['scannedCount', 'caughtCount'], (result) => {
            chrome.storage.local.set({
                scannedCount: (result.scannedCount || 0) + scannedThisTurn,
                caughtCount: (result.caughtCount || 0) + caughtThisTurn
            });
        });
    }
}

function analyzeText(text) {
    let score = 0;
    const lowerText = text.toLowerCase();

    // 1. Check for Phrases
    CLICKBAIT_PHRASES.forEach(phrase => {
        if (lowerText.includes(phrase)) score += 0.4;
    });

    // 2. Check for SHOUTING (All caps)
    const words = text.split(' ').filter(w => w.length > 2);
    const capsWords = words.filter(w => w === w.toUpperCase());
    if (words.length > 0 && (capsWords.length / words.length) > 0.4) {
        score += 0.3;
    }

    // 3. Check for excessive punctuation
    if (/[!?]{2,}/.test(text)) score += 0.2;

    // 4. Check for Listicle clickbait (e.g. "10 things...")
    if (/^\d+\s+(things|ways|reasons|reasons why)/i.test(text)) {
        score += 0.2;
    }

    return score;
}

function markAsClickbait(element) {
    if (element.querySelector('.clickbait-badge')) return;

    const badge = document.createElement('span');
    badge.className = 'clickbait-badge';
    badge.innerText = '🚩 Clickbait?';
    badge.title = "Our algorithm flags this as potential clickbait.";

    element.prepend(badge);
    element.classList.add('clickbait-flagged');
}
