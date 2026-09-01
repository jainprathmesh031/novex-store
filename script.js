const modalBackdrop = document.getElementById("modalBackdrop");
const modalRankTag = document.getElementById("modalRankTag");
const modalRankName = document.getElementById("modalRankName");
const modalPrice = document.getElementById("modalPrice");
const ignInput = document.getElementById("ignInput");
const modalError = document.getElementById("modalError");
const modalSubmit = document.getElementById("modalSubmit");
const modalClose = document.getElementById("modalClose");
const paymentSection =
    document.getElementById("paymentSection");

const paymentAmountNumber =
    document.getElementById("paymentAmountNumber");

const utrInput =
    document.getElementById("utrInput");

const paymentError =
    document.getElementById("paymentError");

const paymentSubmit =
    document.getElementById("paymentSubmit");
let selectedRank = "";
let selectedPrice = 0;


// ===============================
// OPEN PURCHASE MODAL
// ===============================

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

paymentSection.style.display = "block";

modalSubmit.style.display = "none";

utrInput.value = "";

paymentError.classList.remove("show");

utrInput.focus();
    modalBackdrop.classList.add("active");

    setTimeout(function () {
        ignInput.focus();
    }, 100);
}


// ===============================
// CLOSE MODAL
// ===============================

function closeModal() {

    modalBackdrop.classList.remove("active");

}


// Close button
modalClose.addEventListener(
    "click",
    closeModal
);


// Click outside
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


// ===============================
// CONTINUE TO PAYMENT
// ===============================

modalSubmit.addEventListener(
    "click",
    function () {

        const ign = ignInput.value.trim();

        if (!ign) {

            modalError.textContent =
                "Please enter your Minecraft username.";

            modalError.classList.add("show");

            ignInput.focus();

            return;
        }


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


        if (!/^[A-Za-z0-9_]+$/.test(ign)) {

            modalError.textContent =
                "Username can only contain letters, numbers and underscores.";

            modalError.classList.add("show");

            ignInput.focus();

            return;
        }


        modalError.classList.remove("show");


    paymentAmount.textContent =
    "₹" + selectedPrice.toLocaleString("en-IN");

paymentSection.style.display = "block";

modalSubmit.style.display = "none";

utrInput.value = "";

paymentError.classList.remove("show");

utrInput.focus();
    }
);

paymentSubmit.addEventListener(
    "click",
    function () {

        const utr = utrInput.value.trim();

        if (!utr) {

            paymentError.textContent =
                "Please enter your UTR / Transaction ID.";

            paymentError.classList.add("show");

            utrInput.focus();

            return;
        }


        if (utr.length < 6) {

            paymentError.textContent =
                "Please enter a valid UTR / Transaction ID.";

            paymentError.classList.add("show");

            utrInput.focus();

            return;
        }


        paymentError.classList.remove("show");


        alert(
            "Payment submitted!\n\n" +
            "Rank: " + selectedRank +
            "\n" +
            "Amount: ₹" +
            selectedPrice.toLocaleString("en-IN") +
            "\n" +
            "Minecraft IGN: " +
            ignInput.value.trim() +
            "\n" +
            "UTR: " + utr +
            "\n\n" +
            "Your payment will be verified before the rank is delivered."
        );

    }
);
console.log("NOVEX SCRIPT LOADED");
console.log("buyRank:", typeof buyRank);
