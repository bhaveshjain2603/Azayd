document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const signupButton = document.getElementById('signupButton');
    const customerCheck = document.getElementById('customerCheck');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const phoneNumber = document.getElementById('phoneNumber');

    // Function to check if all required fields are filled and checkbox is checked
    const validateSignupForm = () => {
        const isFilled = nameInput.value.trim() !== '' &&
                         emailInput.value.trim() !== '' &&
                         passwordInput.value.trim() !== '' &&
                         phoneNumber.value.trim() !== '';

        signupButton.disabled = !isFilled;
    };

    // Event listeners to validate form on input/change
    nameInput.addEventListener('input', validateSignupForm);
    emailInput.addEventListener('input', validateSignupForm);
    passwordInput.addEventListener('input', validateSignupForm);
    phoneNumber.addEventListener('input', validateSignupForm);
    customerCheck.addEventListener('change', validateSignupForm);
});

const wrapper = document.querySelector(".wrapper");
const signupHeader = document.querySelector(".signup header");
const loginHeader = document.querySelector(".login header");

loginHeader.addEventListener('click', ()=>{
    wrapper.classList.add("active");
})

signupHeader.addEventListener('click', ()=>{
    wrapper.classList.remove("active");
})