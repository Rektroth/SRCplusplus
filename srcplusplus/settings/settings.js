window.onload = async function() {
    let settings = { };
    let form = document.querySelector("[id=settings-form]");

    chrome.storage.sync.get("settings", function(data) {
        if (!chrome.runtime.error) {
            if (data.settings) {
                settings = data.settings;
                form["disable-gradients"].checked = Boolean(settings.disableGradients);
                form["disable-nondonor-icons"].checked = Boolean(settings.disableNondonorIcons);
                form["disable-user-icons"].checked = Boolean(settings.disableUserIcons);
                form["disable-custom-trophies"].checked = Boolean(settings.disableCustomTrophies);
                form["consolidate-misc"].checked = Boolean(settings.consolidateMisc);
                form["consolidate-extensions"].checked = Boolean(settings.consolidateExtensions);
            }
        } else {
            document.querySelector("[id=error]").innerText = `error:
            ${chrome.runtime.error}`;
        }
    });

    form["disable-gradients"].addEventListener("change", function() {
        settings.disableGradients = form["disable-gradients"].checked;
        chrome.storage.sync.set({ settings: settings }, errorCheck(chrome.runtime.error));
    });

    form["disable-nondonor-icons"].addEventListener("change", function() {
        settings.disableNondonorIcons = form["disable-nondonor-icons"].checked;
        chrome.storage.sync.set({ settings: settings }, errorCheck(chrome.runtime.error));
    });

    form["disable-user-icons"].addEventListener("change", function() {
        settings.disableUserIcons = form["disable-user-icons"].checked;
        chrome.storage.sync.set({ settings: settings }, errorCheck(chrome.runtime.error));
    });

    form["disable-custom-trophies"].addEventListener("change", function() {
        settings.disableCustomTrophies = form["disable-custom-trophies"].checked;
        chrome.storage.sync.set({ settings: settings }, errorCheck(chrome.runtime.error));
    });

    form["consolidate-misc"].addEventListener("change", function() {
        settings.consolidateMisc = form["consolidate-misc"].checked;
        chrome.storage.sync.set({ settings: settings }, errorCheck(chrome.runtime.error));
    });

    form["consolidate-extensions"].addEventListener("change", function() {
        settings.consolidateExtensions = form["consolidate-extensions"].checked;
        chrome.storage.sync.set({ settings: settings }, errorCheck(chrome.runtime.error));
    });

    function errorCheck(error) {
        if (error) {
            document.querySelector("[id=error]").innerText = `error:
            ${error}`;
        } else {
            document.querySelector("[id=error]").innerText = "";
        }
    }
};
