import { platformAppend } from "./modules/platforms.js";
import { skeletonPlacer, showSkeletonLoader } from "./modules/skeleton.js";
import { appendCards, appendNoResult } from "./modules/card.js";
import { openLogOutModal, logOut } from "./modules/logout.js";
import { showLastSearches } from "./modules/lastSearches.js";

const RAWG_API_URL = "https://api.rawg.io/api/games";
export const API_KEY = "95715731c840405fb598b2640a161012";

export let gamesArray = [];

const initialPage = 1;
let currentPage = 1;
let searchCurrentPage = 1;

let lastSearch = "";
export let LastSearchesArray = [];

let isSearchQuery = false;

export const cardContainer = document.querySelector("#container");
export const searchBox = document.querySelector("#searchbox");
const singleColumnButton = document.querySelector("#single-display-btn");
const multipleColumnButton = document.querySelector("#multiple-display-btn");
const singleColumnPath = document.querySelector("#display-single-path");
const multipleColumnPath = document.querySelector("#display-multiple-path");
const openMobileMenuButton = document.querySelector("#toggle-menu-button");
const closeMobileMenuButton = document.querySelector("#mobile-close-menu");
const navbar = document.querySelector("#navbar");
const autocompleteBox = document.querySelector("#autocomplete-box");
const searchButton = document.querySelector("#searchButton");
const fade = document.querySelector("#fade");
const searchBoxContainer = document.querySelector("#searchbox-container");
const toggleSearchButton = document.querySelector("#toggle-search-button");
const mainHeader = document.querySelector(".main-header");
const logOutBtn = document.querySelector("#log-out-desktop");
const navbarLogOut = document.querySelector("#navbar-logout");
const lastSearchBtn = document.querySelector("#last-searches-desktop");

const singleColumnDisplay = () => {
    singleColumnPath.classList.add("active-display-path");
    multipleColumnPath.classList.remove("active-display-path");
    cardContainer.classList.add("single-column");
}

const multipleColumnDisplay = () => {
    multipleColumnPath.classList.add("active-display-path");
    singleColumnPath.classList.remove("active-display-path");
    cardContainer.classList.remove("single-column");
}

const calcCardsPerPage = () => {
    let cardsPerPage = 9;

    if (document.body.clientWidth <= 768 && document.body.clientWidth >= 321) {
        cardsPerPage = 8;
    }

    if (document.body.clientWidth <= 320) {
        cardsPerPage = 4;
    }

    return cardsPerPage;
}

const getJSONData = async (page) => {

    let cardsPerPage = calcCardsPerPage();

    let promise = await fetch(`${RAWG_API_URL}?page_size=${cardsPerPage}&page=${page}&key=${API_KEY}`);
    let result = await promise.json();

    for (let element of result.results) {
        let promise = await fetch(`${RAWG_API_URL}/${element.id}?key=${API_KEY}`);
        let result = await promise.json();
        gamesArray.push(result);
    }
    currentPage++;
    return gamesArray;

}

const getSearchGamesData = async (page) => {

    let cardsPerPage = calcCardsPerPage();

    let promise = await fetch(`${RAWG_API_URL}?key=${API_KEY}&search=${searchBox.value}&page_size=${cardsPerPage}&page=${page}`);
    let result = await promise.json();
    return result.results;

}

const showSearchedGames = async (page) => {
    let searchedGamesArray = await getSearchGamesData(page);
    if (searchedGamesArray.length > 0) {
        appendCards(searchedGamesArray, true);
        isSearchQuery = true;
    } else {
        appendNoResult();
    }
    addLastSearchToArray();
    searchCurrentPage = 1;
}

const showAutoComplete = async () => {
    if (searchBox.value === "") {
        autocompleteBox.innerHTML = "";
    } else {
        let autoComplete = await getSearchGamesData(initialPage);
        autocompleteBox.innerHTML = "";
        let autoCompleteListToAppend = "";

        for (let i = 0; i <= 3; i++) {
            autoCompleteListToAppend += `<li class="autocomplete-item">${autoComplete[i].name}</li>`;
        }

        autocompleteBox.innerHTML = autoCompleteListToAppend;
    }
}

const showHideSearchMobile = () => {
    searchBoxContainer.classList.remove("tablet-search");
    searchBoxContainer.classList.toggle("mobile-search");
    document.documentElement.style.setProperty("--searchbox-top-distance", `${mainHeader.offsetHeight + 8}px`);
    if (searchBoxContainer.classList.value.includes("mobile-search")) {
        searchBox.focus();
    }
}

const showHideSearchTablet = () => {
    searchBoxContainer.classList.remove("mobile-search");
    searchBoxContainer.classList.toggle("tablet-search");
    document.documentElement.style.setProperty("--searchbox-top-distance", `${toggleSearchButton.getBoundingClientRect().top} px`);
    document.documentElement.style.setProperty("--searchbox-right-distance", `${document.body.offsetWidth - toggleSearchButton.getBoundingClientRect().right}px`);
    if (searchBoxContainer.classList.value.includes("tablet-search")) {
        searchBox.focus();
    }
}

let throttleTimer;

const throttle = (callback, time) => {
    if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
        callback();
        throttleTimer = false;
    }, time);
};

const handleInfiniteScroll = () => {

    throttle(() => {
        const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        if (endOfPage) {

            if (isSearchQuery) {
                scrollShowSearchedGames();
            } else {
                const promise = getJSONData(currentPage);
                promise.then((data) => appendCards(data, false));
            }

        }
    }, 1000);

};

const addLastSearchToArray = () => {

    if (!LastSearchesArray.includes(lastSearch)) {

        if (LastSearchesArray.length <= 10) {
            console.log(lastSearch);

            LastSearchesArray.unshift(lastSearch);
        } else {
            LastSearchesArray.unshift(lastSearch);
            LastSearchesArray.pop();
        }

        localStorage.setItem("lastSearches", JSON.stringify(LastSearchesArray));

    };

};

const updateLastSearchesArray = () => {
    if (localStorage.getItem("lastSearches")) {
        LastSearchesArray = JSON.parse(localStorage.getItem("lastSearches"));
    }
}

export const searchGame = () => {
    showSearchedGames(initialPage);
    lastSearch = searchBox.value;
    searchBox.value = "";
    searchBoxContainer.classList.remove("mobile-search");
    searchBoxContainer.classList.remove("tablet-search");
}

const scrollShowSearchedGames = async () => {
    let searchedGamesArray = await getSearchGamesData(searchCurrentPage);
    appendCards(searchedGamesArray, false);
    searchCurrentPage++;
}

document.addEventListener("DOMContentLoaded", () => {
    skeletonPlacer();
    const promise = getJSONData(initialPage);
    promise.then((data) => appendCards(data, true));
    updateLastSearchesArray();
});

searchBox.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
        searchGame();
        searchBox.blur();
    }

})

searchButton.addEventListener("click", () => {
    searchGame();
})

searchBox.addEventListener("input", () => {
    showAutoComplete();
})

searchBox.addEventListener("focus", () => {
    autocompleteBox.style.display = "block";
    fade.style.display = "flex";
    searchBox.style.zIndex = "8";
    autocompleteBox.style.zIndex = "8";
    searchButton.style.zIndex = "8";
})

searchBox.addEventListener("focusout", () => {
    autocompleteBox.style.display = "none";
    fade.style.display = "none";
    searchBox.style.zIndex = "5";
    autocompleteBox.style.zIndex = "5";
    searchButton.style.zIndex = "5";
    searchBoxContainer.classList.remove("mobile-search");
    searchBoxContainer.classList.remove("tablet-search");
})

singleColumnButton.addEventListener("click", () => {
    singleColumnDisplay();
})

multipleColumnButton.addEventListener("click", () => {
    multipleColumnDisplay();
})

openMobileMenuButton.addEventListener("click", () => {
    navbar.classList.add("active-menu");
})

closeMobileMenuButton.addEventListener("click", () => {
    navbar.classList.remove("active-menu");
})

toggleSearchButton.addEventListener("click", () => {

    if (document.body.offsetWidth <= 320) {
        showHideSearchMobile();
    } else {
        showHideSearchTablet();
    }

})

logOutBtn.addEventListener("click", () => {
    openLogOutModal();
});

navbarLogOut.addEventListener("click", () => {
    logOut();
});

lastSearchBtn.addEventListener("click", () => {
    showLastSearches();
})

window.addEventListener("scroll", ()=> {
    showSkeletonLoader();
    handleInfiniteScroll();
});