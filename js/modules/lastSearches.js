import { LastSearchesArray, searchBox, searchGame } from "../index.js"

const cardContainer = document.querySelector("#container");

const searchLastSearch = (value) => {
    searchBox.value = value;
    searchGame();
}

const addLastSearchEventListener = () => {
    for (let i = 1; i <= LastSearchesArray.length; i++) {
        document.querySelector(`#last-search-${i}`).addEventListener('click', () => searchLastSearch(document.querySelector(`#last-search-${i}`).innerText));
    }
}

const appendLastSearches = () => {
    let htmlContentToAppend = "";
    let index = 1;
    let resultsFound = true;
    if (LastSearchesArray.length < 1) {
        htmlContentToAppend = `<h3 class="no-result-text">No searchs were made!</h3>`
        resultsFound = false;
    } else {
        for (let element of LastSearchesArray) {
            htmlContentToAppend += `
            <a id="last-search-${index}" class="popular-link sidebar-sub-link" href="#">
                <svg class="sidebar-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12ZM12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM13 6C13 5.73478 12.8946 5.48043 12.7071 5.29289C12.5196 5.10536 12.2652 5 12 5C11.7348 5 11.4804 5.10536 11.2929 5.29289C11.1054 5.48043 11 5.73478 11 6V12C11.0001 12.2652 11.1055 12.5195 11.293 12.707L14.293 15.707C14.4816 15.8892 14.7342 15.99 14.9964 15.9877C15.2586 15.9854 15.5094 15.8802 15.6948 15.6948C15.8802 15.5094 15.9854 15.2586 15.9877 14.9964C15.99 14.7342 15.8892 14.4816 15.707 14.293L13 11.586V6Z"
                        fill="#BF5FE1" />
                </svg>
                ${element}
            </a>`
            index++;
        }
    }

    cardContainer.innerHTML = htmlContentToAppend;
    return resultsFound;
}

export const showLastSearches = () => {
    appendLastSearches()
    if(appendLastSearches()) {
        addLastSearchEventListener();
    }
}