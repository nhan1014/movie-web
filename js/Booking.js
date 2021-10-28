$("#navbar").load("Navbar.html");

let selectedSeats = document.querySelectorAll('.row .seat.selected');
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const seatSelect = document.getElementById('booking-container');
let seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
let listSeat = [];
let ticketPrice = 0;
populateUI();
removeSelectedSeat();

$("#startBooking").on("click", function(){
    getAllMovies();
});

function removeSelectedSeat() {
    selectedSeats = document.querySelectorAll('.row .seat.selected');
    if (selectedSeats.length > 0) {
        selectedSeats.forEach(element => {
            element.classList.remove('selected');
        });
    }
}

function unitPrice(seatIndex) {
    let seatRow = seatIndex.slice(0, 1);
    if (seatRow === "a" || seatRow === "b") {
        return 80000;
    } else if (seatRow === "c" || seatRow === "d") {
        return 70000;
    } else {
        return 60000;
    }
}

// Update total and count
function updateSelectedCount() {
    selectedSeats = document.querySelectorAll('.row .seat.selected');

    seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
}

// Movie select event
seatSelect.addEventListener('click', e => {
    ticketPrice = unitPrice(e.target.id);
    updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

const booking = function () {
    selectedSeats.forEach(element => {
        let seat = element.id;
        listSeat.push(seat);
    }
    );
}

// Initial count and total set
updateSelectedCount();

//Post
// $.ajax({
//     type: 'POST',
//     url: 'popup.aspx/GetJewellerAssets',
//     contentType: 'application/json; charset=utf-8',
//     data: JSON.stringify({ jewellerId: 'filter', locale: 'en-US' }),
//     dataType: 'json',
//     success: function () {
//         alert('success!');
//     },
//     error: function () {
//         alert('error!');
//     }
// });

//Get
const getAllMovies = function () {
    $.ajax({
        url: 'http://127.0.0.1:8080/MovieTheater/movies',
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            console.log(data);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Database');
        }
    });
};