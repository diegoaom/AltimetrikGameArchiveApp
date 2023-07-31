import { cardContainer } from "../index.js";
import { hideSkeletonLoader } from "./skeleton.js";
import { formatDate } from "./dateFormatter.js";
import { platformAppend } from "./platforms.js";
import { showGenres, appendGenresTooltip } from "./genres.js";
import { openGameModal } from "./modal.js";
import { truncDescriptionSingleColumn } from "./trunc.js";

const addCardEventListener = (arr) => {
    for (let element of arr) {
        document.querySelector(`#card-${element.id}`).addEventListener('click', () => openGameModal(element.id));
    }
}

export const appendCards = (arr, boolean) => {
    let htmlContentToAppend = "";

    if (boolean === true) {

        cardContainer.innerHTML = "";

    }

    hideSkeletonLoader();

    for (let element of arr) {

        htmlContentToAppend += `
        <div class="card" id="card-${element.id}">
        <div class="card-img-container" style="background: url(${element.background_image}); 
        background-size: cover;">
        </div>
        <div class="card-information">
            <div class="card-title">
                <p class="game-title ellipsis">${element.name}</p>
                <p class="game-ranking">#${arr.indexOf(element) + 1}</p>
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
            <div class="card-description-container">
                <p class="card-description-text">${truncDescriptionSingleColumn(element)}</p>
            </div>
        </div>
    </div>
                `
    }

    cardContainer.innerHTML = htmlContentToAppend;
    addCardEventListener(arr);
};

export const appendNoResult = () => {
    cardContainer.innerHTML = "";

    cardContainer.innerHTML = `<h3 class="no-result-text">No results were found!</h3>`;
}