(function () {
    "use strict";

    const defineMenuItems = [
        {
            title: "Hide title",
            id: "ycm-hide-title",
            method: function (value) {
                const youtubeTitle = document.querySelector("h1.style-scope.ytd-watch-metadata");
                const YCMHideAll = document.querySelector("input#ycm-hide-all");
                YCMHideAll.checked = value ? (!YCMHideAll.checked ? false : true) : false;
                Array.from(document.querySelectorAll("input.ycm-checkbox-input"))
                    .filter((item) => item.id !== "ycm-hide-all")
                    .every((item) => item.checked == true)
                    ? (YCMHideAll.checked = true)
                    : undefined;
                if (!youtubeTitle || !YCMHideAll) return;
                value ? youtubeTitle.classList.add("disabled") : youtubeTitle.classList.remove("disabled");
            },
        },
        {
            title: "Hide header",
            id: "ycm-hide-header",
            method: function (value) {
                const youtubeHeader = document.querySelector("div.ytp-chrome-top");
                const YCMHideAll = document.querySelector("input#ycm-hide-all");
                YCMHideAll.checked = value ? (!YCMHideAll.checked ? false : true) : false;
                Array.from(document.querySelectorAll("input.ycm-checkbox-input"))
                    .filter((item) => item.id !== "ycm-hide-all")
                    .every((item) => item.checked == true)
                    ? (YCMHideAll.checked = true)
                    : undefined;
                if (!youtubeHeader || !YCMHideAll) return;
                value ? youtubeHeader.classList.add("disabled") : youtubeHeader.classList.remove("disabled");
            },
        },
        {
            title: "Hide controller",
            id: "ycm-hide-controller",
            method: function (value) {
                const youtubeVideoController = document.querySelector("div.ytp-chrome-controls");
                const YCMHideAll = document.querySelector("input#ycm-hide-all");
                YCMHideAll.checked = value ? (!YCMHideAll.checked ? false : true) : false;
                Array.from(document.querySelectorAll("input.ycm-checkbox-input"))
                    .filter((item) => item.id !== "ycm-hide-all")
                    .every((item) => item.checked == true)
                    ? (YCMHideAll.checked = true)
                    : undefined;
                if (!youtubeVideoController || !YCMHideAll) return;
                value ? youtubeVideoController.classList.add("disabled") : youtubeVideoController.classList.remove("disabled");
            },
        },
        {
            title: "Hide progress",
            id: "ycm-hide-progress",
            method: function (value) {
                const youtubeVideoProgressBar = document.querySelector("div.ytp-progress-bar-container");
                const YCMHideAll = document.querySelector("input#ycm-hide-all");
                YCMHideAll.checked = value ? (!YCMHideAll.checked ? false : true) : false;
                Array.from(document.querySelectorAll("input.ycm-checkbox-input"))
                    .filter((item) => item.id !== "ycm-hide-all")
                    .every((item) => item.checked == true)
                    ? (YCMHideAll.checked = true)
                    : undefined;
                if (!youtubeVideoProgressBar || !YCMHideAll) return;
                value ? youtubeVideoProgressBar.classList.add("disabled") : youtubeVideoProgressBar.classList.remove("disabled");
            },
        },
        {
            title: "Theater mode",
            id: "ycm-theater-mode",
            method: function (value) {
                const YCMTheaterModeContainer = document.querySelector("div#ycm-theater-mode-container");
                const youtubeVideoContainer = document.querySelector("div#player-container.style-scope.ytd-watch-flexy");
                const YCMHideAll = document.querySelector("input#ycm-hide-all");
                YCMHideAll.checked = value ? (!YCMHideAll.checked ? false : true) : false;
                Array.from(document.querySelectorAll("input.ycm-checkbox-input"))
                    .filter((item) => item.id !== "ycm-hide-all")
                    .every((item) => item.checked == true)
                    ? (YCMHideAll.checked = true)
                    : undefined;
                if ((!YCMTheaterModeContainer || !YCMHideAll) && !youtubeVideoContainer) return;
                if (value) {
                    YCMTheaterModeContainer.classList.add("enabled");
                    youtubeVideoContainer.classList.add("ycm-theater-mode");
                } else {
                    YCMTheaterModeContainer.classList.remove("enabled");
                    youtubeVideoContainer.classList.remove("ycm-theater-mode");
                }
            },
        },
        {
            title: "All",
            id: "ycm-hide-all",
            method: function (value) {
                defineMenuItems
                    .filter((item) => item.title !== "All")
                    .forEach((item) => {
                        document.querySelector(`input#${item.id}`).checked = value;
                        item.method(value);
                    });
            },
        },
    ];

    const setStyleForElement = function (element, styles) {
        for (const property in styles) element.style[property] = styles[property];
    };

    const nester = function (el, n) {
        if (typeof n === "string") {
            var t = document.createTextNode(n);
            el.appendChild(t);
        } else if (n instanceof Array) {
            for (var i = 0; i < n.length; i++) {
                if (typeof n[i] === "string") {
                    var t = document.createTextNode(n[i]);
                    el.appendChild(t);
                } else if (n[i] instanceof Node) {
                    el.appendChild(n[i]);
                }
            }
        } else if (n instanceof Node) {
            el.appendChild(n);
        }
        return el;
    };

    const createElement = function (tagName, props, nest) {
        const el = document.createElement(tagName);
        if (props)
            for (var name in props) {
                if (name.indexOf("on") === 0) {
                    el.addEventListener(name.substr(2).toLowerCase(), props[name], false);
                } else {
                    el.setAttribute(name, props[name]);
                }
            }
        if (!nest) return el;
        return nester(el, nest);
    };

    const prependElementToDOM = (selector, element) => document.querySelector(selector).prepend(element);

    const insertElementToDOM = (DOM, element) => DOM.appendChild(element);

    const isAccessibleInstallElement = function ({ tagName = "div", id = null, className = null, attributes = null }, callback) {
        if (document.querySelector(tagName + id ? `#${id}` : "" + className ? `#${className}` : "")) return callback("Element has already installed", null);
        const element = document.createElement(tagName);
        id ? (element.id = id) : undefined;
        className ? (element.className = className) : undefined;
        attributes ? element.setAttribute(attributes) : undefined;
        return callback(null, element);
    };

    const setYCMMenuContainerPosition = (x, y) => {
        const YCMMenuContainer = document.querySelector("div#ycm-menu-container");
        if (!YCMMenuContainer) return;
        YCMMenuContainer.style.left = Math.floor(x) + "px";
        YCMMenuContainer.style.top = Math.floor(y) + "px";
    };

    const YCMToggleMenuHandler = (e) => {
        const YCMMenuContainerHeight = 256;
        const YCMMenuContainerWidth = 215;
        const { clientY } = e;
        const { innerHeight } = e.view;
        const parentNode = e.target.parentNode;
        const YCMSettingButton = document.querySelector("button#ycm-setting-button");
        const YCMMenuContainer = document.querySelector("div#ycm-menu-container");
        if (!YCMSettingButton || !YCMMenuContainer) return;
        const offsetRightPosition = YCMSettingButton.getBoundingClientRect().x - YCMMenuContainerWidth + YCMSettingButton.getBoundingClientRect().width;
        const offsetTopPosition =
            innerHeight - clientY <= YCMMenuContainerHeight + 10
                ? YCMSettingButton.getBoundingClientRect().y - YCMMenuContainerHeight
                : YCMSettingButton.getBoundingClientRect().y + YCMSettingButton.getBoundingClientRect().height;
        if (["svg", "path"].includes(parentNode?.nodeName) || parentNode.id.includes("ycm-setting-button")) {
            setYCMMenuContainerPosition(offsetRightPosition, offsetTopPosition);
            YCMMenuContainer.classList.toggle("enabled");
        } else {
            if (
                ["ycm-menu-item", "ycm-checkbox-container", "check-trail", "check-handler", "ycm-menu-label"].includes(parentNode.className) ||
                parentNode.id.includes("ycm-menu-container")
            )
                return;
            YCMMenuContainer.classList.remove("enabled");
        }
        if (e.target.id.includes("ycm-theater-mode-container")) {
            const YCMHideAll = document.querySelector("input#ycm-hide-all");
            defineMenuItems.find((item) => item.id == "ycm-theater-mode").method(false);
            document.querySelector("input#ycm-theater-mode").checked = false;
            YCMHideAll.checked ? (YCMHideAll.checked = false) : undefined;
        }
    };

    const installTheaterModeContainer = function () {
        const youtubePopupContainer = document.querySelector("ytd-popup-container.style-scope.ytd-app");
        if (!youtubePopupContainer) return;
        isAccessibleInstallElement({ tagName: "div", id: "ycm-theater-mode-container" }, function (err, theaterModeContainer) {
            if (err) return;
            insertElementToDOM(youtubePopupContainer, theaterModeContainer);
        });
    };

    const installMenuSettings = function () {
        const youtubePopupContainer = document.querySelector("ytd-popup-container.style-scope.ytd-app");
        if (!youtubePopupContainer) return;
        isAccessibleInstallElement({ tagName: "div", id: "ycm-menu-container" }, function (err, menuContainer) {
            if (err) return;
            menuContainer.innerHTML = defineMenuItems
                .map((item) => {
                    return `
                    <div class="ycm-menu-item">
                        <label for="${item.id}" class="ycm-menu-label">
                            <p>${item.title}</p>
                        </label>
                        <div class="ycm-checkbox-container">
                            <input id="${item.id}" type="checkbox" class="ycm-checkbox-input"/>
                            <label for="${item.id}" class="check-trail">
                                <span class="check-handler"/>
                            </label>
                        </div>
                    </div>
                    `;
                })
                .join("");
            insertElementToDOM(youtubePopupContainer, menuContainer);
            defineMenuItems.forEach((item) => {
                document.querySelector(`input#${item.id}`).addEventListener("change", (e) => {
                    item.method(e.target.checked);
                });
            });
        });
    };

    const installSettingsButton = function () {
        const youtubeMenuRenderer = document.querySelector("ytd-menu-renderer.style-scope.ytd-watch-metadata");
        if (!youtubeMenuRenderer) return;
        isAccessibleInstallElement({ tagName: "button", id: "ycm-setting-button", className: "ytp-button" }, function (err, settingsButton) {
            if (err) return;
            if (!settingsButton) return;
            settingsButton.innerHTML = `
                <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
                    <path fill="#fff" id="ytp-id-20" 
                        d="m 23.94,18.78 c .03,-0.25 .05,-0.51 .05,-0.78 0,-0.27 -0.02,
                        -0.52 -0.05,-0.78 l 1.68,-1.32 c .15,-0.12 .19,-0.33 .09,-0.51 l -1.6,
                        -2.76 c -0.09,-0.17 -0.31,-0.24 -0.48,-0.17 l -1.99,.8 c -0.41,-0.32 -0.86,
                        -0.58 -1.35,-0.78 l -0.30,-2.12 c -0.02,-0.19 -0.19,-0.33 -0.39,-0.33 l -3.2,
                        0 c -0.2,0 -0.36,.14 -0.39,.33 l -0.30,2.12 c -0.48,.2 -0.93,.47 -1.35,.78 l -1.99,
                        -0.8 c -0.18,-0.07 -0.39,0 -0.48,.17 l -1.6,2.76 c -0.10,.17 -0.05,.39 .09,.51 l 1.68,
                        1.32 c -0.03,.25 -0.05,.52 -0.05,.78 0,.26 .02,.52 .05,.78 l -1.68,1.32 c -0.15,.12 -0.19,
                        .33 -0.09,.51 l 1.6,2.76 c .09,.17 .31,.24 .48,.17 l 1.99,-0.8 c .41,.32 .86,.58 1.35,
                        .78 l .30,2.12 c .02,.19 .19,.33 .39,.33 l 3.2,0 c .2,0 .36,-0.14 .39,-0.33 l .30,
                        -2.12 c .48,-0.2 .93,-0.47 1.35,-0.78 l 1.99,.8 c .18,.07 .39,0 .48,-0.17 l 1.6,-2.76 c .09,
                        -0.17 .05,-0.39 -0.09,-0.51 l -1.68,-1.32 0,0 z m -5.94,2.01 c -1.54,0 -2.8,-1.25 -2.8,
                        -2.8 0,-1.54 1.25,-2.8 2.8,-2.8 1.54,0 2.8,1.25 2.8,2.8 0,1.54 -1.25,2.8 -2.8,2.8 l 0,0 z">
                    </path>
                </svg>`;
            insertElementToDOM(youtubeMenuRenderer, settingsButton);
            document.addEventListener("click", (e) => YCMToggleMenuHandler(e));
        });
    };

    chrome.runtime.onMessage.addListener((a, b, sendResponseToBackground) => {
        sendResponseToBackground(true);
        installTheaterModeContainer();
        if (a.message === "install_menu") installMenuSettings();
        if (a.message === "install_button") installSettingsButton();
    });
})();
