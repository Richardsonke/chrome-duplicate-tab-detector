chrome.tabs.onCreated.addListener(function(newTab) {
    chrome.tabs.getAllInWindow(newTab.windowId, function(tabs) {
        var regex = /\?.*$/;
        newTab.url = newTab.url.replace(regex, "")
        var duplicateTab = null;
        tabs.forEach(function(otherTab) {
            if (otherTab.id !== newTab.id && otherTab.url.replace(regex, "") === newTab.url) {
                duplicateTab = otherTab;
            }
        });
        if (duplicateTab) {
            chrome.tabs.update(duplicateTab.id, {"selected": true});
            chrome.tabs.remove(newTab.id);
        }
    });
});

