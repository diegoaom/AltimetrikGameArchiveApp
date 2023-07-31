const modalLogOut = document.querySelector("#modal-logout");
const modalContainer = document.querySelector("#modal-container");
const modalCard = document.querySelector("#modal-card");
const modalDescriptionCard = document.querySelector("#modal-description");

const closeLogOutModal = () => {
    modalLogOut.style.display = "none";
    modalContainer.style.display = "none";
}

export const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

const appendLougOutModal = () => {
    modalLogOut.innerHTML = `<div class="modal-logout-close-button-container">
    <button id="close-logout-button" class="modal-logout-close-button">
        <svg class="logout-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M5.29279 5.29296C5.48031 5.10549 5.73462 5.00017 5.99979 5.00017C6.26495 5.00017 6.51926 5.10549 6.70679 5.29296L11.9998 10.586L17.2928 5.29296C17.385 5.19745 17.4954 5.12127 17.6174 5.06886C17.7394 5.01645 17.8706 4.98886 18.0034 4.98771C18.1362 4.98655 18.2678 5.01186 18.3907 5.06214C18.5136 5.11242 18.6253 5.18667 18.7192 5.28056C18.8131 5.37446 18.8873 5.48611 18.9376 5.60901C18.9879 5.7319 19.0132 5.86358 19.012 5.99636C19.0109 6.12914 18.9833 6.26036 18.9309 6.38236C18.8785 6.50437 18.8023 6.61471 18.7068 6.70696L13.4138 12L18.7068 17.293C18.8889 17.4816 18.9897 17.7342 18.9875 17.9964C18.9852 18.2586 18.88 18.5094 18.6946 18.6948C18.5092 18.8802 18.2584 18.9854 17.9962 18.9876C17.734 18.9899 17.4814 18.8891 17.2928 18.707L11.9998 13.414L6.70679 18.707C6.51818 18.8891 6.26558 18.9899 6.00339 18.9876C5.74119 18.9854 5.49038 18.8802 5.30497 18.6948C5.11956 18.5094 5.01439 18.2586 5.01211 17.9964C5.00983 17.7342 5.11063 17.4816 5.29279 17.293L10.5858 12L5.29279 6.70696C5.10532 6.51943 5 6.26512 5 5.99996C5 5.73479 5.10532 5.48049 5.29279 5.29296Z"
                fill="#D1D1D1" />
        </svg>
    </button>
</div>
<h3 class="modal-logout-title">Dou you want to log out?</h3>
<p class="modal-logout-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut lab</p>
<button id="yes-logout-btn" class="logout-button yes-button">Yes</button>
<button id="no-logout-btn" class="logout-button">No</button>`
}

const logoutModalHandlers = () => {
    document.querySelector("#yes-logout-btn").addEventListener("click", () => logOut());
    document.querySelector("#no-logout-btn").addEventListener("click", () => closeLogOutModal());
    document.querySelector("#close-logout-button").addEventListener("click", () => closeLogOutModal());
}

export const openLogOutModal = () => {
    appendLougOutModal();
    modalLogOut.style.display = "flex";
    modalContainer.style.display = "flex";
    modalCard.style.display = "none";
    modalDescriptionCard.style.display = "none";
    logoutModalHandlers();
}
