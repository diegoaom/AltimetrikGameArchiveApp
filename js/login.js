const JSON_SERVER_URL = "http://localhost:3000/login";
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const loginBtn = document.querySelector("#login-btn");


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

loginBtn.addEventListener("click", (e) => {

    login();
    e.preventDefault();

});