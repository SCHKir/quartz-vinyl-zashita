// СЛАЙДЕР: ПЛЮСЫ
var sliderTrack = document.getElementById("sliderTrack");
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");
var currentSlide = 0;

function getCardWidth() {
    var card = document.querySelector(".plus_card");
    return card ? card.offsetWidth + 40 : 0;
}

function getMaxSlide() {
    var cards = document.querySelectorAll(".plus_card").length;
    var slider = document.querySelector(".pluses_slider");
    if (!slider) return 0;
    var visibleCards = Math.floor(slider.offsetWidth / getCardWidth());
    return Math.max(cards - visibleCards, 0);
}

function updateSlider() {
    if (!sliderTrack) return;
    var cardWidth = getCardWidth();
    sliderTrack.style.transform = "translateX(-" + (currentSlide * cardWidth) + "px)";
}

if (nextBtn) {
    nextBtn.addEventListener("click", function () {
        if (currentSlide < getMaxSlide()) {
            currentSlide++;
            updateSlider();
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener("click", function () {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    });
}

// СЛАЙДЕР: НАШИ УСЛУГИ
var servicesTrack = document.getElementById("servicesTrack");
var servicesPrevBtn = document.getElementById("servicesPrevBtn");
var servicesNextBtn = document.getElementById("servicesNextBtn");
var currentServiceSlide = 0;

function getServiceCardWidth() {
    var card = document.querySelector(".service_item");
    if (!card) return 0;
    var gap = window.innerWidth <= 768 ? 20 : 40;
    return card.offsetWidth + gap;
}

function getMaxServiceSlide() {
    var cards = document.querySelectorAll(".service_item").length;
    var visibleCards = window.innerWidth <= 480 ? 1 : 2;
    return Math.max(cards - visibleCards, 0);
}

function updateServiceSlider() {
    if (!servicesTrack) return;
    if (window.innerWidth > 768) {
        servicesTrack.style.transform = "none";
        return;
    }
    var cardWidth = getServiceCardWidth();
    servicesTrack.style.transform = "translateX(-" + (currentServiceSlide * cardWidth) + "px)";
}

if (servicesNextBtn) {
    servicesNextBtn.addEventListener("click", function () {
        if (currentServiceSlide < getMaxServiceSlide()) {
            currentServiceSlide++;
            updateServiceSlider();
        }
    });
}

if (servicesPrevBtn) {
    servicesPrevBtn.addEventListener("click", function () {
        if (currentServiceSlide > 0) {
            currentServiceSlide--;
            updateServiceSlider();
        }
    });
}

// ФОРМА ДОБАВЛЕНИЯ КАРТОЧЕК
var form = document.getElementById("advantageForm");

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

if (form) {
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
            if (sliderTrack) sliderTrack.appendChild(newCard);
            form.reset();
        };
        reader.readAsDataURL(file);
    });
}

// Пересчет при изменении размеров экрана
window.addEventListener("resize", function() {
    updateSlider();
    updateServiceSlider();
});

updateSlider();
updateServiceSlider();
