'use strict';

// ACTIVE HEADER WHEN WINDOW SCROLL DOWN TO 100PX
const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

// EVENT LISTENER FOR MULTIPLE ELEMENTS
const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
      elements[i].addEventListener(eventType, callback);
    }
}

// NAVBAR TOGGLE FOR MOBILE
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

// FREE TRIAL FORM
document.getElementById('freeTrialForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('/register-free-trial', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Thank you for registering for the free trial!');
            window.location.href = 'index.html';
        } else {
            alert('Registration failed. Please try again.');
        }
    })
    .catch(error => console.error('Error:', error));
});