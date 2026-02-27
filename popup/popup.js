document.addEventListener('DOMContentLoaded', () => {
    const toggleDetector = document.getElementById('toggle-detector');
    const statusBadge = document.getElementById('status-badge');
    const scannedEl = document.getElementById('stats-scanned');
    const caughtEl = document.getElementById('stats-caught');

    // Load saved settings and stats
    chrome.storage.local.get(['detectorActive', 'scannedCount', 'caughtCount'], (result) => {
        // Default to active if not set
        const isActive = result.detectorActive !== false;
        toggleDetector.checked = isActive;
        updateStatusBadge(isActive);

        // Update stats DISPLAY
        scannedEl.textContent = result.scannedCount || 0;
        caughtEl.textContent = result.caughtCount || 0;
    });

    // Handle Toggle Changes
    toggleDetector.addEventListener('change', () => {
        const isActive = toggleDetector.checked;
        chrome.storage.local.set({ detectorActive: isActive });
        updateStatusBadge(isActive);
    });

    function updateStatusBadge(isActive) {
        if (isActive) {
            statusBadge.textContent = 'Active';
            statusBadge.style.color = '#10b981';
            statusBadge.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            statusBadge.style.borderColor = 'rgba(16, 185, 129, 0.2)';
        } else {
            statusBadge.textContent = 'Disabled';
            statusBadge.style.color = '#94a3b8';
            statusBadge.style.backgroundColor = 'rgba(148, 163, 184, 0.1)';
            statusBadge.style.borderColor = 'rgba(148, 163, 184, 0.2)';
        }
    }
});
