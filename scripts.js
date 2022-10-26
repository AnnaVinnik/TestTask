"use strict";

const departuresList = document.querySelectorAll(".custom-card__departures_time");
const departures = document.querySelector(".custom-card__departures");
const elementsToHide = Array.from(departuresList).slice(3, departuresList.length);    //Элементы, которые не входят в строку
const button = document.createElement("div");

hideElements();

function hideElements() {       //Скрытие элементов, которые не входят в строку
    if (departuresList.length > 4) {
        elementsToHide.forEach(elem => elem.classList.add("d-none"));

        button.classList.add("custom-card__departures_time");
        button.textContent = "еще...";
        button.addEventListener("click", showElements);

        departures.append(button);
    }
}

function showElements() {           //Отображение элементов, ктоторые не входят в строку
    elementsToHide.forEach(elem => elem.classList.remove("d-none"));
    button.classList.add("d-none");
}