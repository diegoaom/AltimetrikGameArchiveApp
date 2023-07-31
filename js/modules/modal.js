import { gamesArray, API_KEY } from "../index.js";
import { platformAppend } from "./platforms.js";
import { formatDate } from "./dateFormatter.js";
import { showGenres } from "./genres.js";
import { completeDescription, truncDescription } from "./trunc.js";

const modalContainer = document.querySelector("#modal-container");
const modalCard = document.querySelector("#modal-card");
const modalDescriptionCard = document.querySelector("#modal-description");
const modalLogOut = document.querySelector("#modal-logout");
let modalGameTitle = "";
let modalGamePlatforms = "";

const getGameMedia = async (id, type) => {
    let promise = await fetch(`https://api.rawg.io/api/games/${id}/${type}?key=${API_KEY}`)
    let data = await promise.json();
    return data.results;
}

const getGameDetails = async (id) => {

    let gameInfo = gamesArray.find(game => game.id === id);
    let gameVideos = await getGameMedia(id, 'movies');
    let gameScreenshots = await getGameMedia(id, 'screenshots');
    gameInfo.video_array = gameVideos;
    gameInfo.screenshots_array = gameScreenshots;
    return gameInfo;

}

const appendScreenshots = (arr) => {

    let screenshotsToAppend = "";
    for (let i = 0; i <= 3; i++) {
        screenshotsToAppend += `<img class="modal-image" src="${arr.screenshots_array[i].image}" alt="screenshot ${[i]}">`;
    }

    return screenshotsToAppend;

}

const appendVideo = (arr) => {

    let videoToAppend = "";
    if (arr.video_array.length == false) {
        videoToAppend = `<source type="video/mp4"></source>
        Your browser does not support the video tag. `;
    } else {
        videoToAppend = `<source src="${arr.video_array[0].data['480']}" type="video/mp4"></source>
        Your browser does not support the video tag. `
    }

    return videoToAppend;
}

const createModalGame = (gameObj) => {
    modalGamePlatforms = platformAppend(gameObj.platforms);
    modalGameTitle = gameObj.name;
    let htmlContentToAppend = `
        <div class="modal-background-filter">
            <div class="a">
                <div class="close-modal-container">
                    <button id="close-game-modal" class="close-modal">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M10.5856 10.5864C10.9606 10.2115 11.4692 10.0008 11.9996 10.0008C12.5299 10.0008 13.0385 10.2115 13.4136 10.5864L23.9996 21.1729L34.5856 10.5864C34.7701 10.3954 34.9908 10.243 35.2348 10.1382C35.4788 10.0334 35.7412 9.97821 36.0068 9.97591C36.2723 9.9736 36.5357 10.0242 36.7815 10.1248C37.0273 10.2253 37.2506 10.3738 37.4384 10.5616C37.6261 10.7494 37.7747 10.9728 37.8752 11.2186C37.9758 11.4644 38.0264 11.7277 38.0241 11.9933C38.0218 12.2589 37.9666 12.5213 37.8618 12.7653C37.757 13.0094 37.6046 13.2301 37.4136 13.4146L26.8276 24.0011L37.4136 34.5876C37.7779 34.9648 37.9795 35.47 37.9749 35.9945C37.9704 36.5189 37.76 37.0205 37.3892 37.3914C37.0184 37.7622 36.5168 37.9726 35.9924 37.9771C35.468 37.9817 34.9628 37.7801 34.5856 37.4157L23.9996 26.8292L13.4136 37.4157C13.0364 37.7801 12.5312 37.9817 12.0068 37.9771C11.4824 37.9726 10.9808 37.7622 10.6099 37.3914C10.2391 37.0205 10.0288 36.5189 10.0242 35.9945C10.0197 35.47 10.2213 34.9648 10.5856 34.5876L21.1716 24.0011L10.5856 13.4146C10.2106 13.0395 10 12.5309 10 12.0005C10 11.4702 10.2106 10.9615 10.5856 10.5864V10.5864Z"
                                fill="white" />
                        </svg>
                    </button>
                </div>
                <div class="modal-game-platforms">
                    ${modalGamePlatforms}
                </div>
                <h1 class="modal-game-title">
                    ${modalGameTitle}
                </h1>
                <div class="modal-game-badges">
                    <div class="badge">
                        <p class="modal-badge">${formatDate(gameObj.released)}</p>
                    </div>
                </div>
            </div>
            <div class="b">
                <div class="b1">
                    <div id="modal-game-description" class="modal-game-description">
                        ${truncDescription(gameObj)}
                    </div>
                    <div class="modal-game-button-container">
                        <button class="modal-game-button">Add to wishlist</button>
                        <button class="modal-game-button">Purchase</button>
                    </div>
                </div>
                <div class="b2">
                    <div class="modal-game-information">
                        <p class="modal-game-text">Platforms</p>
                        <p class="modal-game-subtext underline">Playstation 5, PC, Xbox One</p>
                    </div>
                    <div class="modal-game-information">
                        <p class="modal-game-text">Release date</p>
                        <p class="modal-game-subtext">${formatDate(gameObj.released)}</p>
                    </div>
                    <div class="modal-game-information">
                        <p class="modal-game-text">Publisher</p>
                        <p class="modal-game-subtext underline">${gameObj.publishers[0].name}</p>
                    </div>
                    <div class="modal-game-information">
                        <p class="modal-game-text">Website</p>
                        <a href="${gameObj.website}" class="modal-game-link underline" target="_blank">${gameObj.website}</a>
                    </div>
                </div>
                <div class="b3">
                    <div class="modal-game-information">
                        <p class="modal-game-text">Genre</p>
                        <p class="modal-game-subtext underline">${showGenres(gameObj.genres)}</p>
                    </div>
                    <div class="modal-game-information">
                        <p class="modal-game-text">Developer</p>
                        <p class="modal-game-subtext underline">${gameObj.developers[0].name}</p>
                    </div>
                    <div class="modal-game-information">
                        <p class="modal-game-text">Age rating</p>
                        <p class="modal-game-subtext">Not rated</p>
                    </div>
                </div>
                <div class="b4">
                    <div class="modal-game-sub-buttons">
                        <button>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M27.7666 21.4307L27.7678 21.4342C28.1528 21.9358 28.3371 23.6029 25.6969 23.3066C24.6128 23.2007 23.5472 22.9536 22.5271 22.5716C21.7298 22.2659 20.9672 21.8764 20.2521 21.4097C19.1924 21.8361 18.07 22.086 16.9294 22.1493C16.1155 23.2415 15.0575 24.1282 13.8399 24.7387C12.6222 25.3492 11.2787 25.6666 9.9166 25.6655C8.99755 25.6663 8.08411 25.5222 7.20994 25.2385C6.6966 25.536 6.11327 25.8265 5.46927 26.0703C4.1626 26.5649 3.07877 26.7504 2.29944 26.8053C1.7161 26.8484 1.30427 26.8181 1.10127 26.7948C0.655603 26.7434 0.256603 26.4891 0.0839368 26.0621C0.00978686 25.8774 -0.0158467 25.6767 0.00947561 25.4792C0.0347979 25.2818 0.110233 25.0941 0.228603 24.934C0.522603 24.5315 0.79327 24.1104 1.04994 23.6834C1.54927 22.8504 2.03927 21.9522 2.16294 20.9745C1.61584 19.9301 1.28547 18.786 1.19167 17.6107C1.09786 16.4354 1.24257 15.2533 1.61709 14.1354C1.9916 13.0174 2.58821 11.9867 3.37108 11.1051C4.15394 10.2235 5.10692 9.50922 6.17277 9.00512C6.54594 7.59531 7.20873 6.27869 8.1189 5.13917C9.02907 3.99966 10.1667 3.06224 11.4592 2.38666C12.7517 1.71108 14.1708 1.31216 15.626 1.21532C17.0812 1.11847 18.5406 1.32583 19.9113 1.82418C21.2819 2.32252 22.5337 3.10093 23.5868 4.10978C24.64 5.11863 25.4714 6.33581 26.0281 7.68375C26.5849 9.03168 26.8547 10.4808 26.8203 11.9388C26.786 13.3967 26.4483 14.8315 25.8288 16.1518C25.6071 18.163 26.6186 19.8558 27.7654 21.4307H27.7666ZM8.1666 11.6662C8.16724 10.4356 8.44598 9.22112 8.98199 8.11344C9.518 7.00576 10.2974 6.03352 11.262 5.26939C12.2266 4.50526 13.3514 3.96898 14.5524 3.70065C15.7534 3.43231 16.9995 3.43884 18.1976 3.71976C19.3957 4.00068 20.5149 4.54871 21.4714 5.32292C22.4279 6.09712 23.1971 7.07748 23.7214 8.19072C24.2458 9.30396 24.5118 10.5213 24.4995 11.7518C24.4873 12.9823 24.1971 14.1941 23.6506 15.2967C23.5946 15.4093 23.5572 15.5302 23.5398 15.6548C23.2843 17.4922 23.7148 19.1675 24.5956 20.7762C23.3214 20.4662 22.1205 19.9093 21.0606 19.1371C20.8903 19.0136 20.6899 18.9385 20.4804 18.9196C20.2709 18.9007 20.0602 18.9388 19.8706 19.0298C18.6254 19.6282 17.2488 19.9009 15.8695 19.8224C14.4903 19.744 13.1535 19.317 11.9842 18.5813C10.8149 17.8456 9.8513 16.8253 9.18365 15.616C8.51599 14.4066 8.16607 13.0476 8.1666 11.6662ZM5.83794 11.9625C5.90356 14.2834 6.73632 16.5171 8.20607 18.3146C9.67582 20.1121 11.6997 21.372 13.9614 21.8973C12.8189 22.8276 11.39 23.3346 9.9166 23.3323C9.06494 23.3323 8.25644 23.1678 7.51677 22.8691C7.34362 22.7991 7.15618 22.7716 6.97021 22.7891C6.78425 22.8065 6.60519 22.8684 6.4481 22.9694C5.93594 23.2996 5.3281 23.6286 4.6421 23.8887C4.23645 24.0434 3.82146 24.1724 3.3996 24.2749C3.7881 23.5667 4.18127 22.7233 4.36094 21.93C4.45077 21.5368 4.50094 21.1554 4.52194 20.7972C4.53617 20.5669 4.48177 20.3375 4.3656 20.1381C3.79639 19.1598 3.49762 18.0477 3.49994 16.9159C3.49994 14.921 4.40994 13.1396 5.83794 11.9625Z"
                                    fill="#BF5FE1" />
                            </svg>
                        </button>
                        <button>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M12.8022 5.76804C12.5688 6.94987 12.1768 8.72321 10.7418 10.1582C10.6112 10.2889 10.4677 10.4265 10.316 10.5735C8.98366 11.858 7.00033 13.7714 7.00033 16.9167C7.00033 18.6235 7.73533 20.2417 8.86816 21.4375C10.008 22.6404 11.4675 23.3334 12.8337 23.3334H18.667C19.0777 23.3334 19.4207 23.2284 19.6237 23.0919C19.7928 22.9799 19.8337 22.8819 19.8337 22.75C19.8337 22.6194 19.7928 22.5202 19.6237 22.4082C19.4207 22.2729 19.0777 22.1667 18.667 22.1667H17.5003C17.1909 22.1667 16.8942 22.0438 16.6754 21.825C16.4566 21.6062 16.3337 21.3095 16.3337 21C16.3337 20.6906 16.4566 20.3939 16.6754 20.1751C16.8942 19.9563 17.1909 19.8334 17.5003 19.8334H19.2503C19.661 19.8334 20.004 19.7284 20.207 19.5919C20.3762 19.4799 20.417 19.3819 20.417 19.25C20.417 19.1194 20.3762 19.0202 20.207 18.9082C20.004 18.7729 19.661 18.6667 19.2503 18.6667H18.0837C17.7742 18.6667 17.4775 18.5438 17.2587 18.325C17.0399 18.1062 16.917 17.8095 16.917 17.5C16.917 17.1906 17.0399 16.8939 17.2587 16.6751C17.4775 16.4563 17.7742 16.3334 18.0837 16.3334H19.8337C20.2443 16.3334 20.5873 16.2284 20.7903 16.0919C20.9595 15.9799 21.0003 15.8819 21.0003 15.75C21.0003 15.6194 20.9595 15.5202 20.7903 15.4082C20.5873 15.2729 20.2443 15.1667 19.8337 15.1667H18.667C18.3576 15.1667 18.0608 15.0438 17.842 14.825C17.6232 14.6062 17.5003 14.3095 17.5003 14C17.5003 13.6906 17.6232 13.3939 17.842 13.1751C18.0608 12.9563 18.3576 12.8334 18.667 12.8334H19.8337C20.2443 12.8334 20.5873 12.7284 20.7903 12.5919C20.9595 12.4799 21.0003 12.3819 21.0003 12.25C21.0003 12.1194 20.9595 12.0202 20.7903 11.9082C20.5873 11.7729 20.2443 11.6667 19.8337 11.6667H14.5837C14.3982 11.6668 14.2153 11.6226 14.0504 11.5378C13.8854 11.4531 13.7429 11.3302 13.6349 11.1794C13.5269 11.0287 13.4564 10.8543 13.4293 10.6708C13.4021 10.4873 13.4191 10.3 13.4788 10.1244V10.1232L13.4835 10.1115L13.4987 10.0649L13.5605 9.86654C13.6118 9.69154 13.683 9.43837 13.7565 9.13387C13.9339 8.42023 14.0425 7.69123 14.0808 6.95687C14.1112 6.15771 14.005 5.54521 13.7915 5.17187C13.6655 4.95021 13.4753 4.75071 13.0332 4.68771C12.9772 4.87904 12.9258 5.14037 12.8512 5.52304L12.8022 5.76804V5.76804ZM16.1038 9.33337C16.2462 8.68237 16.3815 7.87154 16.413 7.04321C16.448 6.09237 16.3547 4.95487 15.818 4.01571C15.223 2.97037 14.1707 2.33337 12.717 2.33337C12.2713 2.33337 11.8537 2.48037 11.5153 2.77671C11.2085 3.04504 11.0335 3.37871 10.925 3.64704C10.7523 4.07521 10.645 4.63054 10.5552 5.09954L10.5132 5.31537C10.2868 6.46687 9.99049 7.61021 9.09216 8.50854C8.98949 8.61121 8.86466 8.73021 8.72233 8.86437C7.41216 10.1057 4.66699 12.7085 4.66699 16.9167C4.66699 19.2932 5.68199 21.4667 7.17416 23.0417C8.65933 24.6097 10.6998 25.6667 12.8337 25.6667H18.667C19.423 25.6667 20.2467 25.48 20.9187 25.0332C21.6245 24.5619 22.167 23.7849 22.167 22.75C22.167 22.2029 22.0153 21.7292 21.7703 21.3325C22.3408 20.8542 22.7503 20.1507 22.7503 19.25C22.7503 18.7029 22.5987 18.228 22.3537 17.8337C22.9242 17.3554 23.3337 16.6507 23.3337 15.75C23.3337 15.0395 23.0793 14.4515 22.6908 14C23.0782 13.5485 23.3337 12.9605 23.3337 12.25C23.3337 11.214 22.7912 10.4382 22.0853 9.96687C21.4133 9.51887 20.5897 9.33337 19.8337 9.33337H16.1038Z"
                                    fill="#BF5FE1" />
                            </svg>
                        </button>
                        <button>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M13.1748 2.6752C13.3936 2.45649 13.6903 2.33362 13.9997 2.33362C14.309 2.33362 14.6057 2.45649 14.8245 2.6752L19.4912 7.34187C19.7037 7.5619 19.8213 7.85661 19.8186 8.1625C19.816 8.4684 19.6933 8.76101 19.477 8.97732C19.2607 9.19363 18.968 9.31633 18.6621 9.31899C18.3562 9.32165 18.0615 9.20405 17.8415 8.99154L15.1663 6.31637V17.5C15.1663 17.8095 15.0434 18.1062 14.8246 18.325C14.6058 18.5438 14.3091 18.6667 13.9997 18.6667C13.6903 18.6667 13.3935 18.5438 13.1747 18.325C12.9559 18.1062 12.833 17.8095 12.833 17.5V6.31637L10.1578 8.99154C9.9378 9.20405 9.6431 9.32165 9.33721 9.31899C9.03131 9.31633 8.7387 9.19363 8.52239 8.97732C8.30608 8.76101 8.18338 8.4684 8.18072 8.1625C8.17806 7.85661 8.29566 7.5619 8.50817 7.34187L13.1748 2.6752V2.6752ZM5.83301 15.1667C5.83301 14.2384 6.20176 13.3482 6.85813 12.6918C7.51451 12.0355 8.40475 11.6667 9.33301 11.6667H10.4997C10.8091 11.6667 11.1058 11.7896 11.3246 12.0084C11.5434 12.2272 11.6663 12.5239 11.6663 12.8334C11.6663 13.1428 11.5434 13.4395 11.3246 13.6583C11.1058 13.8771 10.8091 14 10.4997 14H9.33301C9.02359 14 8.72684 14.123 8.50805 14.3417C8.28926 14.5605 8.16634 14.8573 8.16634 15.1667V22.1667C8.16634 22.4761 8.28926 22.7729 8.50805 22.9917C8.72684 23.2105 9.02359 23.3334 9.33301 23.3334H18.6663C18.9758 23.3334 19.2725 23.2105 19.4913 22.9917C19.7101 22.7729 19.833 22.4761 19.833 22.1667V15.1667C19.833 14.8573 19.7101 14.5605 19.4913 14.3417C19.2725 14.123 18.9758 14 18.6663 14H17.4997C17.1903 14 16.8935 13.8771 16.6747 13.6583C16.4559 13.4395 16.333 13.1428 16.333 12.8334C16.333 12.5239 16.4559 12.2272 16.6747 12.0084C16.8935 11.7896 17.1903 11.6667 17.4997 11.6667H18.6663C19.5946 11.6667 20.4848 12.0355 21.1412 12.6918C21.7976 13.3482 22.1663 14.2384 22.1663 15.1667V22.1667C22.1663 23.095 21.7976 23.9852 21.1412 24.6416C20.4848 25.298 19.5946 25.6667 18.6663 25.6667H9.33301C8.40475 25.6667 7.51451 25.298 6.85813 24.6416C6.20176 23.9852 5.83301 23.095 5.83301 22.1667V15.1667Z"
                                    fill="#BF5FE1" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="b5">
                        <video class="modal-video" controls>
                             ${appendVideo(gameObj)}
                        </video>
                        <div class="modal-game-image-container">
                            ${appendScreenshots(gameObj)}
                        </div>
                </div>
        </div>`;

    modalCard.innerHTML = htmlContentToAppend;

}

const changeModalBackgroundImage = (gameObj) => {
    if (gameObj.background_image) {
        modalCard.style.backgroundImage = `url(${gameObj.background_image})`;
    } else {
        modalCard.style.backgroundColor = rgba(48, 48, 48, 1);
    }
}

const appendDescriptionModal = () => {
    let htmlContentToAppend = `
    <div class="navigation-modal-container">
        <button id="back-description-modal" class="back-modal">
            <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M29.4589 11.9709C29.738 12.25 29.8947 12.6285 29.8947 13.0232C29.8947 13.4179 29.738 13.7964 29.4589 14.0755L20.0926 23.4418L29.4589 32.8081C29.7301 33.0889 29.8801 33.4648 29.8767 33.8551C29.8733 34.2453 29.7168 34.6186 29.4408 34.8946C29.1649 35.1705 28.7915 35.3271 28.4013 35.3304C28.0111 35.3338 27.6351 35.1838 27.3544 34.9127L16.9358 24.4941C16.6567 24.215 16.5 23.8365 16.5 23.4418C16.5 23.0472 16.6567 22.6686 16.9358 22.3895L27.3544 11.9709C27.6335 11.6919 28.012 11.5352 28.4067 11.5352C28.8013 11.5352 29.1798 11.6919 29.4589 11.9709Z"
                    fill="white" />
            </svg>
        </button>
        <button id="close-game-modal-description" class="close-modal">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M10.5856 10.5864C10.9606 10.2115 11.4692 10.0008 11.9996 10.0008C12.5299 10.0008 13.0385 10.2115 13.4136 10.5864L23.9996 21.1729L34.5856 10.5864C34.7701 10.3954 34.9908 10.243 35.2348 10.1382C35.4788 10.0334 35.7412 9.97821 36.0068 9.97591C36.2723 9.9736 36.5357 10.0242 36.7815 10.1248C37.0273 10.2253 37.2506 10.3738 37.4384 10.5616C37.6261 10.7494 37.7747 10.9728 37.8752 11.2186C37.9758 11.4644 38.0264 11.7277 38.0241 11.9933C38.0218 12.2589 37.9666 12.5213 37.8618 12.7653C37.757 13.0094 37.6046 13.2301 37.4136 13.4146L26.8276 24.0011L37.4136 34.5876C37.7779 34.9648 37.9795 35.47 37.9749 35.9945C37.9704 36.5189 37.76 37.0205 37.3892 37.3914C37.0184 37.7622 36.5168 37.9726 35.9924 37.9771C35.468 37.9817 34.9628 37.7801 34.5856 37.4157L23.9996 26.8292L13.4136 37.4157C13.0364 37.7801 12.5312 37.9817 12.0068 37.9771C11.4824 37.9726 10.9808 37.7622 10.6099 37.3914C10.2391 37.0205 10.0288 36.5189 10.0242 35.9945C10.0197 35.47 10.2213 34.9648 10.5856 34.5876L21.1716 24.0011L10.5856 13.4146C10.2106 13.0395 10 12.5309 10 12.0005C10 11.4702 10.2106 10.9615 10.5856 10.5864V10.5864Z"
                    fill="white" />
            </svg>
        </button>
    </div>

    <div class="description-modal-platforms">
    ${modalGamePlatforms}
    </div>

    <h1 class="description-modal-title">${modalGameTitle}</h1>
    <p class="description-modal-text">${completeDescription}</p>`

    modalDescriptionCard.innerHTML = htmlContentToAppend;
}

const openCompleteDescription = () => {
    document.querySelector("#modal-game-description").innerHTML = completeDescription;
}

const addReadMoreHandler = () => {
    const readMoreBtn = document.querySelector("#open-description");

    if (document.body.clientWidth > 320){
        readMoreBtn.addEventListener("click", () => {openDescriptionModal()});
    } else {
        readMoreBtn.addEventListener("click", () => {openCompleteDescription();});
    }
} 

const closeModal = () => {
    modalContainer.style.display = "none";
    modalCard.style.display = "none";
    modalLogOut.style.display = "none";
    modalDescriptionCard.style.display = "none";
    document.body.style.overflow = "auto";
}

const addCloseModalHandler = () => {
    document.querySelector("#close-game-modal").addEventListener("click", () => closeModal());
}

const closeDescriptionModal = () => {
    modalDescriptionCard.style.display = "none";
    modalCard.style.display = "flex";
}

const addCloseModalInDescription = () => {
    document.querySelector("#close-game-modal-description").addEventListener("click", () => closeModal());
}

const addCloseDescriptionModalHandler = () => {
    document.querySelector("#back-description-modal").addEventListener("click", () => closeDescriptionModal());
}

const openDescriptionModal = () => {
    appendDescriptionModal();
    modalDescriptionCard.style.display = "flex";
    modalCard.style.display = "none";
    modalLogOut.style.display = "none";
    addCloseDescriptionModalHandler();
    addCloseModalInDescription();
}

export const openGameModal = async (id) => {
    let gameObj = await getGameDetails(id);

    createModalGame(gameObj);
    changeModalBackgroundImage(gameObj);
    modalContainer.style.display = "flex";
    modalCard.style.display = "block";
    modalLogOut.style.display = "none";
    addReadMoreHandler();
    addCloseModalHandler();
    document.body.style.overflow = "hidden";

}


