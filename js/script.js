// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", function () {

    mainNav.classList.toggle("active");

    const isExpanded = mainNav.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isExpanded);

    menuToggle.setAttribute(
        "aria-label",
        isExpanded ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isExpanded ? "✕" : "☰";

});


// JQUERY ON-PAGE SEARCH

$(document).ready(function () {

    $("#searchForm").on("submit", function (event) {

        event.preventDefault();

        $(".search-highlight").each(function () {
            $(this).replaceWith($(this).contents());
        });

        let searchText = $("#siteSearch").val().trim();

        if (searchText === "") {
            $("#searchMessage").text("Please enter something to search.");
            return;
        }

        let count = 0;

        $("main").find("h1, h2, h3, p").each(function () {

            let elementText = $(this).text();

            if (elementText.toLowerCase().includes(searchText.toLowerCase())) {

                $(this).html(function (_, html) {

                    let escapedText = searchText.replace(
                        /[.*+?^${}()|[\]\\]/g, "\\$&"
                    );

                    return html.replace(
                        new RegExp("(" + escapedText + ")", "gi"),
                        '<mark class="search-highlight">$1</mark>'
                    );

                });

                count++;

            }

        });

        if (count > 0) {
            $("#searchMessage").text(count + " matching sections found.");
        } else {
            $("#searchMessage").text("No matching content found.");
        }

    });


    // CLEAR SEARCH

    $("#clearSearch").on("click", function () {

        $(".search-highlight").each(function () {
            $(this).replaceWith($(this).contents());
        });

        $("#siteSearch").val("");

        $("#searchMessage").text("");

    });

});
// WEBSITE VISITOR COUNTER

let visitors = localStorage.getItem("srcVisitors");

if (visitors === null) {
    visitors = 1;
} else {
    visitors = parseInt(visitors) + 1;
}

localStorage.setItem("srcVisitors", visitors);

const visitorDisplay = document.getElementById("visitorCount");

if (visitorDisplay) {
    visitorDisplay.textContent = visitors;
}
// CAPTCHA VERIFICATION

const captchaForm = document.getElementById("captchaForm");

if (captchaForm) {

    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;

    let correctAnswer = num1 + num2;

    document.getElementById("captchaQuestion").textContent =
        "What is " + num1 + " + " + num2 + "?";

    captchaForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let answer = Number(
            document.getElementById("captchaAnswer").value
        );

        let message = document.getElementById("captchaMessage");

        if (answer === correctAnswer) {

            message.textContent = "Verification successful!";
            message.style.color = "green";

        } else {

            message.textContent = "Incorrect answer. Please try again.";
            message.style.color = "red";

        }

    });

}

// REGISTRATION FORM VALIDATION

const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {

    registrationForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const message = document.getElementById("registrationMessage");

        if (!registrationForm.checkValidity()) {

            registrationForm.reportValidity();
            return;

        }

        message.textContent =
            "Registration successful! Thank you for joining SRC Sports Academy.";

        registrationForm.reset();

    });

}
// ONLINE BOOKING FORM VALIDATION

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    const bookingDate = document.getElementById("bookingDate");
    const bookingStatus = document.getElementById("bookingMessageStatus");

    // Prevent visitors from selecting past dates
    const today = new Date();
    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    bookingDate.setAttribute("min", localDate);

    bookingForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (!bookingForm.checkValidity()) {
            bookingForm.reportValidity();
            return;
        }

        if (bookingDate.value < localDate) {
            bookingStatus.textContent =
                "Please select a future date for your training session.";
            return;
        }

        bookingStatus.textContent =
            "Your booking request has been submitted successfully! Our team will contact you for confirmation.";

        bookingForm.reset();

    });

}