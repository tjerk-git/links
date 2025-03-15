/// <reference types="chrome" />
var _a;
(_a = document.getElementById('saveLink')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = tabs[0].url;
        if (url) {
            // Sla de link op via de background script of database
            chrome.storage.local.set({ savedUrl: url }, () => {
                alert('Link saved!');
            });
        }
    });
});
// Laad opgeslagen links
chrome.storage.local.get('savedUrl', (result) => {
    var _a;
    if (result.savedUrl) {
        const listItem = document.createElement('li');
        listItem.textContent = result.savedUrl;
        (_a = document.getElementById('linksList')) === null || _a === void 0 ? void 0 : _a.appendChild(listItem);
    }
});
