import { platformAppend } from "./modules/platforms.js";

const RAWG_API_URL = "https://api.rawg.io/api/games?key=95715731c840405fb598b2640a161012";
const MONTHS = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ]
let gamesArray = [];
const mainContainer = document.querySelector("#container");

const getJSONData = async (url) => {
    let promise = await fetch(url);
    let result = await promise.json();
    gamesArray = result.results;
    showCards(gamesArray);
}

const showGenres = (arr) => {
    let genres = [];
    for (let element of arr){
        genres.push(element.name);
    }
    genres = genres.toString();
    genres = genres.replaceAll(',', ', ');
    return genres;
}

const appendGenresTooltip = (arr) => {
    let genresToAppend = [];
    for (let element of arr){
        genresToAppend += `
        <span class="genre-hover-text">${element.name}</span>
        `
    }
    return genresToAppend;

}

const formatDate = (str) => {
    let dates = str.split('-');
    let month = MONTHS[parseInt(dates[1])-1]
    return `${month} ${dates[2]}, ${dates[0]}`
}

const showCards = (arr) => {
    let htmlContentToAppend = "";

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
            <div class="card-information-release">
                <p class="game-release">Release date:</p>
                <p class="game-release-date">${formatDate(element.released)}</p>
                <div class="game-platforms">
                ${platformAppend(element.platforms)}
                </div>
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
                `
    }

    mainContainer.innerHTML = htmlContentToAppend;
}


document.addEventListener("DOMContentLoaded", function () {
    gamesArray = getJSONData(RAWG_API_URL);
});