const removeGradients = true;
const removeNonDonorIcons = true;
const removeAllIcons = false;
const noCustomTrophies = true;

if (removeGradients) {
    document.querySelectorAll("span.username-light").forEach(removeGradient);
    document.querySelectorAll("span.username-dark").forEach(removeGradient);
}

if (removeAllIcons) {
    document.querySelectorAll("img.usericon").forEach((userIcon) => {
        userIcon.parentElement.removeChild(userIcon);
    });
} else if (removeNonDonorIcons) {
    document.querySelectorAll("img.usericon").forEach((userIcon) => {
        if (!userIcon.hasAttribute("data-original-title") || userIcon.getAttribute("data-original-title") !== "Original Donor") {
            userIcon.parentElement.removeChild(userIcon);
        }
    });
}

const leaderboardObserver = new MutationObserver(onLeaderboardMutuation);
const leaderboard = document.querySelector("div#leaderboarddiv");

if (leaderboard) {
    leaderboardObserver.observe(leaderboard, { attribute: true, childList: true, subtree: true });
}

// it is possible for the page to be cached,
// in which case this must be performed immediately instead of by the observer
if (noCustomTrophies) {
    var trophies = document.querySelectorAll("img.trophy");

    if (trophies.length > 0) {
        leaderboardObserver.disconnect();
        trophies.forEach(makeDefaultTrophy);
    }
}

function removeGradient(username) {
    if(username.childElementCount > 0) {
        let color = username.querySelector("span").style.color;
        username.querySelectorAll("span").forEach((character) => {
            character.style.color = color;
        });
    }
}

function makeDefaultTrophy(trophy) {
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

function onLeaderboardMutuation(mutations, observer) {
    for (const mutation of mutations) {
        if (mutation.type === "childList" && noCustomTrophies) {
            document.querySelectorAll("img.trophy").forEach(makeDefaultTrophy);
        }
    }

    observer.disconnect();
}