(function () {
    "use strict";
    const host = "youtube.com";
    chrome.tabs.onUpdated.addListener(function (a, b, c) {
        if (c.url.includes(host) && c.status == "complete") {
            chrome.tabs.sendMessage(a, { message: "install_menu" }, () => {});
            if (c.url.includes(host + "/watch")) chrome.tabs.sendMessage(a, { message: "install_button" }, () => {});
        }
    });
})();
