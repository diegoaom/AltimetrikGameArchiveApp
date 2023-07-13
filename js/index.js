import { platformAppend } from "./modules/platforms.js";

const RAWG_API_URL = "https://api.rawg.io/api/games?key=95715731c840405fb598b2640a161012";
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
let gamesArray = [];
const mainContainer = document.querySelector("#container");
const searchBox = document.querySelector("#searchbox");
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

export const singleColumnDisplay = () => {
    singleColumnPath.classList.add("active-display-path");
    multipleColumnPath.classList.remove("active-display-path");
    mainContainer.classList.add("single-column");
}

export const multipleColumnDisplay = () => {
    multipleColumnPath.classList.add("active-display-path");
    singleColumnPath.classList.remove("active-display-path");
    mainContainer.classList.remove("single-column");
}

const getJSONData = async (url) => {
    let promise = await fetch(url);
    let result = await promise.json();
    gamesArray = result.results;
    console.log(gamesArray);
    showCards(gamesArray);
}

const showGenres = (arr) => {
    let genres = [];
    for (let element of arr) {
        genres.push(element.name);
    }
    genres = genres.toString();
    genres = genres.replaceAll(',', ', ');
    return genres;
}

const appendGenresTooltip = (arr) => {
    let genresToAppend = [];
    for (let element of arr) {
        genresToAppend += `
        <span class="genre-hover-text">${element.name}</span>
        `
    }
    return genresToAppend;

}

const formatDate = (str) => {
    let dates = str.split('-');
    let month = MONTHS[parseInt(dates[1]) - 1]
    return `${month} ${dates[2]}, ${dates[0]}`
}

const showCards = (arr) => {
    let htmlContentToAppend = "";
    mainContainer.innerHTML = "";

    for (let element of arr) {

        htmlContentToAppend += `
        <div class="card">
        <div class="card-img-container" style="background: url(${element.background_image}); 
        background-size: cover;">
        </div>
        <div class="card-information">
            <div class="card-title">
                <p class="game-title ellipsis">${element.name}</p>
                <p class="game-ranking">#${element.rating_top}</p>
            </div>
            <div class="grid-card-information">
                <div class="card-information-release">
                    <p class="game-release">Release date:</p>
                    <p class="game-release-date">${formatDate(element.released)}</p>
                </div>
                <div class="game-platforms">
                ${platformAppend(element.platforms)}
                </div>
                <div class="card-information-genres">
                    <p class="game-genres">Genres:</p>
                    <div class="game-genres-container genres-hoverable">
                    ${showGenres(element.genres)}
                        <div class="genres-tooltip">
                        ${appendGenresTooltip(element.genres)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
                `
    }

    mainContainer.innerHTML = htmlContentToAppend;
};

const skeletonMaker = (quantity) => {

    const skeleton = document.querySelector("#skeleton-template");

    for (let i = 0; i < quantity; i++) {
        mainContainer.appendChild(skeleton.cloneNode(true));
    };

};

const searchGames = async () => {
    let promise = await fetch(`${RAWG_API_URL}&search=${searchBox.value}`);
    let result = await promise.json();
    return result.results;
}

const showSearchedGames = async () => {
    let searchedGamesArray = await searchGames();
    showCards(searchedGamesArray);
}

const showAutoComplete = async () => {
    if (searchBox.value === "") {
        autocompleteBox.innerHTML = "";
    } else {
        let autoComplete = await searchGames();
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
    if (searchBoxContainer.classList.value.includes("mobile-search")){
        searchBox.focus();
    }
}

const showHideSearchTablet = () => {
    searchBoxContainer.classList.remove("mobile-search");
    searchBoxContainer.classList.toggle("tablet-search");
    document.documentElement.style.setProperty("--searchbox-top-distance", `${toggleSearchButton.getBoundingClientRect().top} px`);
    document.documentElement.style.setProperty("--searchbox-right-distance", `${document.body.offsetWidth - toggleSearchButton.getBoundingClientRect().right}px`);
    if (searchBoxContainer.classList.value.includes("tablet-search")){
        searchBox.focus();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    skeletonMaker(9);
    gamesArray = getJSONData(RAWG_API_URL);
});

searchBox.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
        showSearchedGames();
        searchBox.value = "";
        searchBoxContainer.classList.remove("mobile-search");
        searchBoxContainer.classList.remove("tablet-search");
    }

})

searchButton.addEventListener("click", () => {
    showSearchedGames();
    searchBox.value = "";
    searchBoxContainer.classList.remove("mobile-search");
    searchBoxContainer.classList.remove("tablet-search");
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