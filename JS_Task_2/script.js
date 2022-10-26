"use strict";

const times = [
    new Date(2022, 9, 26, 18, 0), 
    new Date(2022, 9, 26, 18, 30),
    new Date(2022, 9, 26, 18, 45),
    new Date(2022, 9, 26, 19, 0),
    new Date(2022, 9, 26, 19, 15),
    new Date(2022, 9, 26, 21, 0),
];
const timesBack = [
    new Date(2022, 9, 26, 18, 30), 
    new Date(2022, 9, 26, 18, 45),
    new Date(2022, 9, 26, 19, 0),
    new Date(2022, 9, 26, 19, 15),
    new Date(2022, 9, 26, 19, 35),
    new Date(2022, 9, 26, 21, 50),
    new Date(2022, 9, 26, 21, 55),
];

//Вычисление разницы между часовым поясом пользователя и UTC+3, для того, чтобы показывать время в часовом поясе пользователя
let userUtc = new Date();
userUtc = userUtc.getHours() -userUtc.getUTCHours();
const differenceUtc = userUtc - 3;

const form = document.getElementById("form");
const route = document.getElementById("route");
const result = document.getElementById("result");
const time = document.getElementById("time");
let timeBack = null;
const num = document.getElementById("num");

document.addEventListener('DOMContentLoaded', function() {
    renderTimeSelect();
    route.addEventListener("change", handleRoute);
    form.addEventListener("submit", showResult);
});

// Добавляем select с вариантами времени отправлений в часовом поясе пользователя
function renderTimeSelect() {            
    times.forEach(elem => {
        time.insertAdjacentHTML("beforeend", 
            `<option value="${elem.getHours() + differenceUtc}:${elem.getMinutes().toString().padStart(2, [0])}(из A в B)">${+elem.getHours() + differenceUtc}:${elem.getMinutes().toString().padStart(2, [0])}(из A в B)</option>`
        )
    });
    timesBack.forEach(elem => {
        time.insertAdjacentHTML("beforeend", 
            `<option value="${+elem.getHours() + differenceUtc}:${elem.getMinutes().toString().padStart(2, [0])}(из B в A)">${+elem.getHours() + differenceUtc}:${elem.getMinutes().toString().padStart(2, [0])}(из B в A)</option>`
        )
    });
}

//Добавляем дополнительный select при выборе пункта "из А в В и обратно в А"
function handleRoute() {
    if (route.value === "из A в B и обратно в А") {
        const timeOptions = document.getElementById("time__options");
        timeBack = document.createElement("select");
        timeBack.id = "time__back";
        time.addEventListener("change", handleTime);
        
        timesBack.forEach(elem => {
            timeBack.insertAdjacentHTML("beforeend", 
                `<option value="${+elem.getHours() + differenceUtc}:${elem.getMinutes().toString().padStart(2, [0])}(из B в A)">${+elem.getHours() + differenceUtc}:${elem.getMinutes().toString().padStart(2, [0])}(из B в A)</option>`
            )
        });
        timeOptions.append(timeBack);
    }
}

//Считаем время пребытия от времени отправления
//Входные параметры: строка с временем
//Возвращаемый параметр: элемент Date
function countArrival(elem) {
    const departure = new Date();
    departure.setHours(elem.value[0] + elem.value[1], elem.value[3] + elem.value[4], 0);

    const arrival = new Date();
    arrival.setHours(departure.getHours() + (departure.getMinutes() + 50)/60);
    arrival.setMinutes((departure.getMinutes() + 50)%60);
    arrival.setSeconds(0);

    return arrival;
}

//В дополнительном select выводим только те варианты, которые позже времени прибытия
function handleTime() {
    const arrival = countArrival(time);

    //Переопределяем список
    timeBack.innerHTML = "";
    timesBack.forEach(elem => {
        timeBack.insertAdjacentHTML("beforeend", 
            `<option 
                value="${+elem.getHours() + differenceUtc}:${elem.getMinutes().toString().padStart(2, [0])}(из B в A)">
                ${+elem.getHours() + differenceUtc}:${elem.getMinutes().toString().padStart(2, [0])}(из B в A)
            </option>` )
    });

    //Удаляем опции, которые раньше времени прибытия
    for(let i = 0; i < timeBack.options.length; i++) {             
        let elem = timeBack.options[i];
        if(+(elem.value[0] + elem.value[1]) < arrival.getHours()) {
            elem.remove();
            i--;
            continue;
        }
        if(+(elem.value[0] + elem.value[1]) === arrival.getHours()) { 
            if (+(elem.value[3] + elem.value[4]) < arrival.getMinutes()) {
                elem.remove();
                i--;
            }
        }
    }
}

//Выводим результаты подсчетов 
function showResult(event) {
    event.preventDefault();
    result.insertAdjacentHTML("beforeend", `
        Вы выбрали ${num.value} билета по маршруту ${route.value}
    `);
    if (route.value === "из A в B и обратно в А") {
        result.insertAdjacentHTML("beforeend", `стоимостью ${1200 * num.value} <br>
            Это путешествие займет у вас 1 час 40 минут <br>
            Теплоход отправляется в ${Array.from(time.value).slice(0,5).join("")}, а прибудет в ${countArrival(timeBack).getHours().toString().padStart(2, [0])}:${countArrival(timeBack).getMinutes().toString().padStart(2, [0])}`);
    } else {
        result.insertAdjacentHTML("beforeend", `стоимостью ${700 * num.value}<br>
        Это путешествие займет у вас 50 минут <br>
        Теплоход отправляется в ${Array.from(time.value).slice(0,5).join("")}, а прибудет
        в ${countArrival(time).getHours().toString().padStart(2, [0])}:${countArrival(time).getMinutes().toString().padStart(2, [0])}`);
    }
}