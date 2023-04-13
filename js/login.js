//API
const API_PATH = "https://market-backend-reec.onrender.com/";

//GET ELEMENTS
const elLoginForm = document.querySelector('.js-login-form');
const elLoginEmail = elLoginForm.querySelector('.js-login-email');
const elLoginPassword = elLoginForm.querySelector('.js-login-password');

//login a new user with the API
async function loginUser() {
    try {
        const res = await fetch(`${API_PATH}user/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: elLoginEmail.value,
                password: elLoginPassword.value,
            })
        });
        const data = await res.json();
        console.log(data);
        console.log(data.token);
        if(data.token){
            localStorage.setItem('loginToken', data.token);
            window.location.replace('/index.html');
        }
    } catch (error) {
        console.log(error.message);
    }
}

elLoginForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    loginUser();
});