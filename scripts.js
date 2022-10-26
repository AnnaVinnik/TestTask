"use strict";

let cards = [];

const cardsOnPage = document.querySelectorAll(".custom-card");

document.addEventListener('DOMContentLoaded', function() {
    for(let i = 0; i < cardsOnPage.length; i++) {                //Создаем массив объектов со всеми карточками на странице
        cards.push({
            id: i,
            departuresList: cardsOnPage[i].querySelectorAll(".custom-card__departures_time"),
            departures: cardsOnPage[i].querySelector(".custom-card__departures"),
            button: document.createElement("div"),
        });
        cards[i].elementsToHide = Array.from(cards[i].departuresList).slice(3, cards[i].departuresList.length);
    }

    for(let i = 0; i < cardsOnPage.length; i++) {                 //Вызываем функцию скрытия элементов для всех карточек
        hideElements(i);
    }
});

function hideElements(id) {       //Скрытие элементов, которые не входят в строку
    if (cards[id].departuresList.length > 4) {
        cards[id].elementsToHide.forEach(elem => elem.classList.add("d-none"));

        cards[id].button.classList.add("custom-card__departures_time");
        cards[id].button.textContent = "еще...";
        cards[id].button.addEventListener("click", () => showElements(id));

        cards[id].departures.append(cards[id].button);
    }
}

function showElements(id) {           //Отображение элементов, ктоторые не входят в строку
    cards[id].elementsToHide.forEach(elem => elem.classList.remove("d-none"));
    cards[id].button.classList.add("d-none");
}
