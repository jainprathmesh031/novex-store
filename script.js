let selectedRank = "";
let selectedPrice = 0;

const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

const modalRankName = document.getElementById("modalRankName");
const modalRankTag = document.getElementById("modalRankTag");
const modalPrice = document.getElementById("modalPrice");

const ignInput = document.getElementById("ignInput");
const modalError = document.getElementById("modalError");
const modalSubmit = document.getElementById("modalSubmit");


function buyRank(rank, price) {

    selectedRank = rank;
    selectedPrice = price;

    modalRankName.textContent = rank;
    modalRankTag.textContent = rank;

    modalPrice.textContent =
        "₹" + price.toLocaleString("en-IN");

    ignInput.value = "";

    modalError.classList.remove("show");

    modalBackdrop.classList.add("active");

    setTimeout(() => {
        ignInput.focus();
    }, 100);

}


function closeModal() {

    modalBackdrop.classList.remove("active");

}


modalClose.addEventListener(
    "click",
    closeModal
);


modalBackdrop.addEventListener(
    "click",
    function(event) {

        if (event.target === modalBackdrop) {
            closeModal();
        }

    }
);


document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {
            closeModal();
        }

    }
);


modalSubmit.addEventListener(
    "click",
    function() {

        const ign =
            ignInput.value.trim();

        if (!ign) {

            modalError.textContent =
                "Please enter your Minecraft username.";

            modalError.classList.add("show");

            ignInput.focus();

            return;
        }


        if (ign.length < 3 || ign.length > 16) {

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


        /*
         * PAYMENT WILL BE CONNECTED HERE.
         *
         * For now we only confirm the order details.
         *
         * Later this button will create an order on
         * our free backend and open the UPI checkout.
         */


        alert(
            "Order selected!\\n\\n" +
            "Rank: " + selectedRank + "\\n" +
            "Price: ₹" + selectedPrice.toLocaleString("en-IN") + "\\n" +
            "Minecraft IGN: " + ign + "\\n\\n" +
            "UPI checkout will be connected next."
        );

    }
);
