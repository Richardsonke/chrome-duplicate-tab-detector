chrome.tabs.onCreated.addListener(function(newTab) {

    var ignoreTab = false;
    [
      /google.com\/analytics/,
      /facebook.com/
    ].forEach(function(item){
      if(newTab.url.search(item) > -1)
        ignoreTab = true;
    });

    if(ignoreTab)
      return;

    chrome.tabs.getAllInWindow(newTab.windowId, function(tabs) {
        var regex = /(\?.*)|(\#.*\/.*)$/;
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

