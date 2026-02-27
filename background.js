// Background service worker
// Lives as long as the browser is open
chrome.runtime.onInstalled.addListener(() => {
    console.log("Clickbait Detector Pro installed and ready.");

    // Initialize stats if they don't exist
    chrome.storage.local.get(['scannedCount', 'caughtCount'], (result) => {
        if (result.scannedCount === undefined) {
            chrome.storage.local.set({ scannedCount: 0, caughtCount: 0 });
        }
    });
});
