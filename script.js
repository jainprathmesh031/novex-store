const modalBackdrop = document.getElementById("modalBackdrop");
const modalRankTag = document.getElementById("modalRankTag");
const modalRankName = document.getElementById("modalRankName");
const modalPrice = document.getElementById("modalPrice");
const ignInput = document.getElementById("ignInput");
const modalError = document.getElementById("modalError");
const modalSubmit = document.getElementById("modalSubmit");
const modalClose = document.getElementById("modalClose");

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


        alert(
            "Order selected!\n\n" +
            "Rank: " + selectedRank +
            "\n" +
            "Price: ₹" +
            selectedPrice.toLocaleString("en-IN") +
            "\n" +
            "Minecraft IGN: " + ign
        );

    }
);


console.log("NOVEX SCRIPT LOADED");
console.log("buyRank:", typeof buyRank);
