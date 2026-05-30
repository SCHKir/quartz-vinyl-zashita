var sliderTrack = document.getElementById("sliderTrack");
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");
var form = document.getElementById("advantageForm");
var currentSlide = 0;

function getCards() {
    return document.querySelectorAll(".plus_card");
}

function getCardWidth() {
    var card = document.querySelector(".plus_card");
    return card ? card.offsetWidth + 40 : 0;
}

function getMaxSlide() {
    var cards = getCards().length;
    var slider = document.querySelector(".pluses_slider");
    var visibleCards = Math.floor(slider.offsetWidth / getCardWidth());
    return Math.max(cards - visibleCards, 0);
}

function updateSlider() {
    var cardWidth = getCardWidth();
    sliderTrack.style.transform = "translateX(-" + (currentSlide * cardWidth) + "px)";
}

nextBtn.addEventListener("click", function () {
    if (currentSlide < getMaxSlide()) {
        currentSlide++;
        updateSlider();
    }
});

prevBtn.addEventListener("click", function () {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
    }
});

function createCard(title, description, image) {
    var card = document.createElement("div");
    card.className = "plus_card";

    var img = document.createElement("img");
    img.src = image;

    var plusTitle = document.createElement("div");
    plusTitle.className = "plus_title";
    plusTitle.textContent = title;

    var plusText = document.createElement("div");
    plusText.className = "plus_text";
    plusText.textContent = description;

    card.appendChild(img);
    card.appendChild(plusTitle);
    card.appendChild(plusText);

    return card;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    var title = document.getElementById("title").value.trim();
    var description = document.getElementById("description").value.trim();
    var imageInput = document.getElementById("image");
    var file = imageInput.files[0];

    if (title === "" || description === "" || !file) {
        alert("Заполните все поля");
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        var image = e.target.result;
        var newCard = createCard(title, description, image);
        sliderTrack.appendChild(newCard);
        form.reset();
    };
    reader.readAsDataURL(file);
});

window.addEventListener("resize", updateSlider);

updateSlider();