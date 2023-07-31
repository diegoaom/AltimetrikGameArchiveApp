const JSON_SERVER_URL = "http://localhost:3000/login";
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const loginBtn = document.querySelector("#login-btn");
const visibilityBtn = document.querySelector("#password-visibility-btn");
const eyeIcon = document.querySelector("#eye-icon");
const invalidEmailMsg = document.querySelector("#invalid-email");
const validationErrorMsg = document.querySelector("#validation-error-message");

const emailValidation = () => {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailInput.value)) {
        emailInput.setCustomValidity("Invalid email");
        invalidEmailMsg.style.display = "block";
        emailInput.classList.add("validation-error-input");
    } else {
        emailInput.setCustomValidity("");
        invalidEmailMsg.style.display = "none";
        emailInput.classList.remove("validation-error-input");
    }
    return emailInput.checkValidity();
}

const login = () => {
    let object = {};

    if (emailValidation() && passwordInput.checkValidity()) {
        object = {
            email: emailInput.value,
            password: passwordInput.value
        }

        postJSON(object);
    }

}

const postJSON = async (object) => {

    const promise = await fetch(JSON_SERVER_URL, {
        headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(object),
    });
    if (promise.ok) {
        const result = await promise.json();
        localStorage.setItem("token", result.accessToken)
        console.log('user logged in');
        window.location.replace("index.html");
    } else {
        console.log('user rejected');
        emailInput.classList.add("validation-error-input");
        passwordInput.classList.add("validation-error-input");
        eyeIcon.style.fill= "#F00";
        validationErrorMsg.style.display = "block";
    }

};

const togglePasswordVisibility = () => {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.add("eye-slashed");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("eye-slashed");
    }

}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("token") !== null) {
        window.location.replace("index.html");
    }
})

visibilityBtn.addEventListener("click", () => {
    togglePasswordVisibility();
})

loginBtn.addEventListener("click", (e) => {

    login();
    e.preventDefault();

});