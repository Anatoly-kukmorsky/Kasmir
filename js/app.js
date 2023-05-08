"use strict";

const navMenu = document.querySelector(".nav_menu");
const navLinks = document.querySelectorAll(".nav_link");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.querySelector(`.active`)?.classList.remove("active") & link.classList.add("active");
    });
});

const progressBarItems = document.querySelectorAll(".progress_bar-item");
const scrollAreaItems = document.querySelectorAll(".section_scroll-area");
const currentNumber = document.querySelector(".current-number");
const sections = document.querySelectorAll(".section");
const amount = document.querySelector(".amount-number");
const body = document.querySelector(".body")


amount.textContent = sections.length.toString().padStart(2, "0");
let currentSectionIndex = 0;
let isScrolling = false;

function scrollToSection(index) {
    isScrolling = true;
    sections[index].scrollIntoView({ behavior: "smooth" });
    currentNumber.textContent = sections[index].dataset.section.padStart(2, "0");
    updateProgressBar(index);
    setTimeout(() => {
        isScrolling = false;
    }, 1000);
}

window.addEventListener("wheel", (event) => {
    if (isScrolling) return;

    const direction = event.deltaY > 0 ? 1 : -1;
    currentSectionIndex += direction;

    if (currentSectionIndex < 0) currentSectionIndex = 0;
    if (currentSectionIndex >= sections.length) currentSectionIndex = sections.length - 1;

    scrollToSection(currentSectionIndex) 
});

function updateProgressBar(index) {
    progressBarItems.forEach((item) => {
        item.classList.remove("active");
    });
    progressBarItems[index].classList.add("active");
}

window.addEventListener("load", () => {
    const activeSectionIndex = parseInt(localStorage.getItem("activeSectionIndex")) || 0;
    currentSectionIndex = activeSectionIndex;
    scrollToSection(currentSectionIndex);
    updateProgressBar(currentSectionIndex);
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("activeSectionIndex", currentSectionIndex);
});

(function stoppingAndResumingScrolling() {
    scrollAreaItems.forEach((item) => {
        item.addEventListener("wheel", () => (isScrolling = true));
        item.addEventListener("mouseout", () => (isScrolling = false));
    }) 
})()
