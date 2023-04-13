// API
const API_PATH = "https://market-backend-reec.onrender.com/";

// GET ELEMENTS
const elRegisterForm = document.querySelector(".js-register-form");
const elRegisterUserName = elRegisterForm.querySelector(".js-register-username");
const elRegisterPhone = elRegisterForm.querySelector(".js-register-phone");
const elRegisterEmail = elRegisterForm.querySelector(".js-register-email");
const elRegisterPassword = elRegisterForm.querySelector(".js-register-password");

// register a new user with the API
async function registerUser() {
    try {
        if (!elRegisterUserName || !elRegisterPhone || !elRegisterEmail || !elRegisterPassword) {
            console.log("Error: Form fields not found in DOM.");
            return;
        }
        const res = await fetch(`${API_PATH}user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: elRegisterUserName.value,
                phone: elRegisterPhone.value,
                email: elRegisterEmail.value,
                password: elRegisterPassword.value,
            }),
        });
        const data = await res.json();
        console.log(data);
        if (data) {
            window.localStorage.setItem('token', data.token);
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.log(error.message);
    }
}

elRegisterForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    await registerUser();
});
