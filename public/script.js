'use strict';

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

document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('loggedIn') === 'true') {
    document.getElementById('loginLink').style.display = 'none';
    document.getElementById('logoutLink').style.display = 'block';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const loginLink = document.getElementById('loginLink');
  const logoutLink = document.getElementById('logoutLink');

  if (sessionStorage.getItem('loggedIn') === 'true') {
    loginLink.style.display = 'none';
    logoutLink.style.display = 'block';
  }

  logoutLink.addEventListener('click', () => {
    fetch('/logout-customer', {
      method: 'POST',
      credentials: 'include' // Ensure cookies are included in the request
    })
    .then(response => {
      if (response.ok) {
        sessionStorage.removeItem('loggedIn');
        loginLink.style.display = 'block';
        logoutLink.style.display = 'none';
        window.location.href = 'index.html'; // Redirect to the main page
      } else {
        alert('Logout failed. Please try again.');
      }
    })
    .catch(error => console.error('Error:', error));
  });
});

// ACTIVE HEADER WHEN WINDOW SCROLL DOWN TO 100PX
const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});


// SLIDER
const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function(currentSlider) {

  const sldierContainer = currentSlider.querySelector("[data-slider-container]");
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sldierContainer.style.transform = `translateX(-${sldierContainer.children[currentSlidePos].offsetLeft}px)`;
  }

  // NEXT SLIDE
  const slideNext = function () {
    const slideEnd = currentSlidePos >= sldierContainer.childElementCount - 1;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  }

  sliderNextBtn.addEventListener("click", slideNext);

  // PREVIOUS SLIDE
   const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = sldierContainer.childElementCount - 1;
    } else {
      currentSlidePos--;
    }
    moveSliderItem();
  }

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = sldierContainer.childElementCount <= 1;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.display = "none";
    sliderPrevBtn.style.display = "none";
  }

}
for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); }


// ACCORDION
const accordions = document.querySelectorAll("[data-accordion]");

let lastActiveAccordion = accordions[0];

const initAccordion = function (currentAccordion) {

  const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

  const expandAccordion = function () {
    if (lastActiveAccordion && lastActiveAccordion !== currentAccordion) {
      lastActiveAccordion.classList.remove("expanded");
    }
    currentAccordion.classList.toggle("expanded");

    lastActiveAccordion = currentAccordion;
  }
  accordionBtn.addEventListener("click", expandAccordion);

}

for (let i = 0, len = accordions.length; i < len; i++) { 
  initAccordion(accordions[i]); 
}