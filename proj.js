let discountType = "regular";
let selectedLine = null;

const lrtStations = {
    lrt1: ["Roosevelt", "Balintawak", "Monumento", "5th Avenue", "R. Papa", "Abad Santos", "Blumentritt", "Tayuman", "Bambang", "Doroteo Jose", "Carriedo", "Central Terminal", "United Nations", "Pedro Gil", "Quirino", "Vito Cruz", "Gil Puyat", "Libertad", "EDSA", "Baclaran"],
    lrt2: ["Santolan", "Katipunan", "Anonas", "Araneta Center-Cubao", "Betty Go-Belmonte", "Gilmore", "J. Ruiz", "V. Mapa", "Pureza", "Legarda", "Recto"],
    lrt3: ["North Avenue","Quezon Avenue","GMA Kamuning","V. Luna","Anonas","Cubao","Boni","Shaw Blvd","EDSA","Taft Avenue"]
};

function populateStations() {
    for (let line in lrtStations) {
        let pickup = document.getElementById("pickup-" + line);
        let dropoff = document.getElementById("dropoff-" + line);
        if (!pickup || !dropoff) continue;

        for (let i = 0; i < lrtStations[line].length; i++) {
            let station = lrtStations[line][i];

            let option1 = document.createElement("option");
            option1.value = i;
            option1.textContent = station;
            pickup.appendChild(option1);

            let option2 = document.createElement("option");
            option2.value = i;
            option2.textContent = station;
            dropoff.appendChild(option2);
        }
    }
}
populateStations();

function showFare() {
    let btn = document.querySelector('#fare-lrt1 .lrt-buttons button');
    selectLine(btn, 'lrt1');
}

function selectLine(btn, line) {
    selectedLine = line;

    let buttons = document.querySelectorAll('.lrt-buttons button');
    for (let b of buttons) b.classList.remove('selected-btn');

    btn.classList.add('selected-btn');

    let containers = document.querySelectorAll('.fare-container');
    for (let c of containers) c.style.display = "none";

    let current = document.getElementById("fare-" + line);
    if (current) current.style.display = "block";
}

function selectDiscount(btn, type) {
    discountType = type;

    let group = btn.closest('.discount-buttons');
    let buttons = group.querySelectorAll('button');
    for (let b of buttons) b.classList.remove('selected-btn');

    btn.classList.add('selected-btn');
}

function computeFare(line) {
    const baseFare = 50;
    const perKMRate = 15; 
    const baseKM = 2;

    let pickup = parseInt(document.getElementById("pickup-" + line).value);
    let dropoff = parseInt(document.getElementById("dropoff-" + line).value);

    if (pickup === dropoff) {
        alert("Pickup and dropoff stations are the same.");
        return;
    }

    let stations = Math.abs(dropoff - pickup);
    let distance = stations * 2; 

    let fare = baseFare;
    if (distance > baseKM) {
        fare += (distance - baseKM) * perKMRate;
    }

    if (discountType !== "regular") fare = fare * 0.8;

    document.getElementById("fareOutput-" + line).innerHTML = fare.toFixed(2);
    document.getElementById("distanceOutput-" + line).innerHTML = distance.toFixed(1);
}
