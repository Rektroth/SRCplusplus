window.onload = async function() {
    var settings = { };

    chrome.storage.sync.get("settings", function(data) {
        if (!chrome.runtime.error) {
            settings = data.settings;
            handleAll();
        } else {
            document.querySelector("[id=error]").innerText = `error:
            ${chrome.runtime.error}`;
        }
    });

    // leaderboard changes
    const leaderboardObserver = new MutationObserver(onLeaderboardMutation);
    const leaderboard = document.querySelector("div#leaderboarddiv");
    const frontPageObserver = new MutationObserver(onLeaderboardMutation);
    const frontPage = document.querySelector("table.old-leaderboard");
    const observerConfig = {
        attribute: true,
        childList: true,
        subtree: true
    }

    if (leaderboard) {
        leaderboardObserver.observe(leaderboard, observerConfig);
    } else if (frontPage) {
        frontPageObserver.observe(frontPage, observerConfig);
    }

    function onLeaderboardMutation(mutations, observer) {
        for (mutation of mutations) {
            if (mutation.type === "childList") {
                handleAll();
            }
        }
    }

    function handleAll() {
        // gradients
        if (settings.disableGradients) {
            let usernames = document.querySelectorAll("span.username-light");
        
            for (let username of usernames) {
                removeGradient(username);
            }
        
            usernames = document.querySelectorAll("span.username-dark");
        
            for (let username of usernames) {
                removeGradient(username);
            }
        }
        
        // user icons
        if (settings.disableUserIcons) {
            let userIcons = document.querySelectorAll("img.usericon");
        
            for (let userIcon of userIcons) {
                userIcon.parentElement.removeChild(userIcon);
            }
        } else if (settings.disableNondonorIcons) {
            let userIcons = document.querySelectorAll("img.usericon");
        
            for (let userIcon of userIcons) {
                if (!userIcon.hasAttribute("data-original-title")
                || userIcon.getAttribute("data-original-title") !== "Original Donor") {
                    userIcon.parentElement.removeChild(userIcon);
                }
            }
        }

        // trophies
        if (settings.disableCustomTrophies) {
            var trophies = document.querySelectorAll("img.trophy");
    
            if (trophies.length > 0) {
                for (let trophy of trophies) {
                    switch (trophy.parentElement.textContent) {
                        case "1st":
                            trophy.src = "/images/1st.png";
                            break;
                        case "2nd":
                            trophy.src = "/images/2nd.png";
                            break;
                        case "3rd":
                            trophy.src = "/images/3rd.png";
                            break;
                        default:
                            trophy.parentElement.removeChild(trophy);
                            break;
                    }
                }
            }
        }
    }
    
    function removeGradient(username) {
        if(username.childElementCount > 0) {
            let color = username.querySelector("span").style.color;
            let characters = username.querySelectorAll("span");

            for (let character of characters) {
                character.style.color = color;
            }
        }
    }
};
