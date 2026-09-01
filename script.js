const modalBackdrop =
    document.getElementById("modalBackdrop");

const modalRankTag =
    document.getElementById("modalRankTag");

const modalRankName =
    document.getElementById("modalRankName");

const modalPrice =
    document.getElementById("modalPrice");

const ignInput =
    document.getElementById("ignInput");

const modalError =
    document.getElementById("modalError");

const modalSubmit =
    document.getElementById("modalSubmit");

const modalClose =
    document.getElementById("modalClose");


const paymentSection =
    document.getElementById("paymentSection");

const paymentAmount =
    document.getElementById("paymentAmount");

const utrInput =
    document.getElementById("utrInput");

const paymentError =
    document.getElementById("paymentError");

const paymentSubmit =
    document.getElementById("paymentSubmit");


let selectedRank = "";
let selectedPrice = 0;


// ======================================
// OPEN PURCHASE MODAL
// ======================================

function buyRank(rank, price) {

    selectedRank = rank;
    selectedPrice = price;

    modalRankName.textContent = rank;
    modalRankTag.textContent = rank;

    modalPrice.textContent =
        "₹" + price.toLocaleString("en-IN");

    ignInput.value = "";

    modalError.textContent =
        "Enter the exact username you use to join the server.";

    modalError.classList.remove("show");

    modalSubmit.style.display = "block";

    modalBackdrop.classList.add("active");

    setTimeout(function () {

        ignInput.focus();

    }, 100);

}

// ======================================
// CLOSE MODAL
// ======================================

function closeModal() {

    modalBackdrop.classList.remove("active");

}


// Close button
modalClose.addEventListener(
    "click",
    closeModal
);


// Click outside modal
modalBackdrop.addEventListener(
    "click",
    function (event) {

        if (event.target === modalBackdrop) {

            closeModal();

        }

    }
);


// Escape key
document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);


// ======================================
// CONTINUE TO PAYMENT
// ======================================

modalSubmit.addEventListener(
    "click",
    function () {

        const ign =
            ignInput.value.trim();


        // Empty username
        if (!ign) {

            modalError.textContent =
                "Please enter your Minecraft username.";

            modalError.classList.add("show");

            ignInput.focus();

            return;

        }


        // Username length
        if (
            ign.length < 3 ||
            ign.length > 16
        ) {

            modalError.textContent =
                "Please enter a valid Minecraft username.";

            modalError.classList.add("show");

            ignInput.focus();

            return;

        }


        // Username characters
        if (!/^[A-Za-z0-9_]+$/.test(ign)) {

            modalError.textContent =
                "Username can only contain letters, numbers and underscores.";

            modalError.classList.add("show");

            ignInput.focus();

            return;

        }


        // Username is valid
        modalError.classList.remove("show");


        // Show correct payment amount
        paymentAmount.textContent =
            "₹" +
            selectedPrice.toLocaleString("en-IN");


        // Show payment section
        paymentSection.style.display = "block";


        // Hide Continue button
        modalSubmit.style.display = "none";


        // Clear UTR
        utrInput.value = "";

        paymentError.classList.remove("show");


        // Scroll payment section into view
        paymentSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


        // Focus UTR after QR appears
        setTimeout(function () {

            utrInput.focus();

        }, 500);

    }
);


// ======================================
// PAYMENT SUBMISSION
// ======================================

paymentSubmit.addEventListener(
    "click",
    function () {

        const utr =
            utrInput.value.trim();


        // Empty UTR
        if (!utr) {

            paymentError.textContent =
                "Please enter your UTR / Transaction ID.";

            paymentError.classList.add("show");

            utrInput.focus();

            return;

        }


        // UTR too short
        if (utr.length < 6) {

            paymentError.textContent =
                "Please enter a valid UTR / Transaction ID.";

            paymentError.classList.add("show");

            utrInput.focus();

            return;

        }


        // Valid UTR
        paymentError.classList.remove("show");


        alert(
            "Payment submitted!\n\n" +

            "Rank: " +
            selectedRank +

            "\n" +

            "Amount: ₹" +
            selectedPrice.toLocaleString("en-IN") +

            "\n" +

            "Minecraft IGN: " +
            ignInput.value.trim() +

            "\n" +

            "UTR: " +
            utr +

            "\n\n" +

            "Your payment will be verified before the rank is delivered."
        );

    }
);


// ======================================
// DEBUG
// ======================================

console.log(
    "NOVEX SCRIPT LOADED"
);

console.log(
    "buyRank:",
    typeof buyRank
);
