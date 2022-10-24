"use strict";

const departuresList = document.querySelectorAll(".custom-card__departures_time");
const departures = document.querySelector(".custom-card__departures");
const elementsToHide = Array.from(departuresList).slice(3, departuresList.length);
const button = document.createElement("div");

hideElements();

function hideElements() {
    if (departuresList.length > 4) {
        elementsToHide.forEach(elem => elem.classList.add("d-none"));

        button.classList.add("custom-card__departures_time");
        button.textContent = "еще...";
        button.addEventListener("click", showElements);

        departures.append(button);
    }
}

function showElements() {
    elementsToHide.forEach(elem => elem.classList.remove("d-none"));
    button.classList.add("d-none");
}