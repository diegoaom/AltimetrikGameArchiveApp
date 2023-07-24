const JSON_SERVER_URL = "http://localhost:3000/login";
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const loginBtn = document.querySelector("#login-btn");
const visibilityBtn = document.querySelector("#password-visibility-btn");
const eyeIcon = document.querySelector("#eye-icon");


const login = async () => {
    let object = {};

    if (emailInput.value && passwordInput.value) {
        object = {
            email: emailInput.value,
            password: passwordInput.value
        }
    }

    const promise = await fetch(JSON_SERVER_URL, {
        headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify(object),
    });
    if (promise.ok) {
        const result = await promise.json();
        localStorage.setItem("token", result.accessToken)
        console.log('user logged in');
    } else {
        console.log('user rejected');
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

visibilityBtn.addEventListener("click", () => {
    togglePasswordVisibility();
})

loginBtn.addEventListener("click", (e) => {

    login();
    e.preventDefault();

});