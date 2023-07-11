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

const searchNormalize = (string, keyword) => {
    console.log(string);
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(keyword.toLowerCase());
}

const searchGames = () => {
    let searchedGamesArray = gamesArray.filter(e => searchNormalize(e.name, searchBox.value));
    showCards(searchedGamesArray);
}

document.addEventListener("DOMContentLoaded", function () {
    skeletonMaker(9);
    gamesArray = getJSONData(RAWG_API_URL);
});

searchBox.addEventListener("input", () => {
    searchGames();
})

singleColumnButton.addEventListener("click", () => {
    singleColumnDisplay();
})

multipleColumnButton.addEventListener("click", () => {
    multipleColumnDisplay();
})

openMobileMenuButton.addEventListener("click", ()=> {
    navbar.classList.add("active-menu");
})

closeMobileMenuButton.addEventListener("click", ()=> {
    navbar.classList.remove("active-menu");
})
