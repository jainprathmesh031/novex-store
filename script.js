// ---------------------------------------------
// NØVEX Store — purchase flow
// ---------------------------------------------

const modalBackdrop = document.getElementById("modalBackdrop");
const modalRankTag = document.getElementById("modalRankTag");
const modalRankName = document.getElementById("modalRankName");
const modalPrice = document.getElementById("modalPrice");
const ignInput = document.getElementById("ignInput");
const modalError = document.getElementById("modalError");
const modalSubmit = document.getElementById("modalSubmit");
const modalClose = document.getElementById("modalClose");

let activePurchase = null;


// Open purchase modal
function buyRank(rankName, price) {

    activePurchase = {
        rankName: rankName,
        price: price
    };

    modalRankTag.textContent = rankName;
    modalRankName.textContent = rankName;
    modalPrice.textContent =
        "₹" + price.toLocaleString("en-IN");

    ignInput.value = "";
    modalError.textContent =
        "Enter the exact username you use to join the server.";

    modalError.classList.remove("visible");

    modalBackdrop.classList.add("open");

    document.body.style.overflow = "hidden";

    setTimeout(function () {
        ignInput.focus();
    }, 100);
}


// Close modal
function closeModal() {

    modalBackdrop.classList.remove("open");

    document.body.style.overflow = "";

    activePurchase = null;
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

        if (
            event.key === "Escape" &&
            modalBackdrop.classList.contains("open")
        ) {
            closeModal();
        }

    }
);


// Continue to payment
modalSubmit.addEventListener(
    "click",
    function () {

        const ign = ignInput.value.trim();

        const validIgn =
            /^[A-Za-z0-9_]{3,16}$/.test(ign);


        if (!validIgn) {

            modalError.textContent =
                "Enter a valid Minecraft username (3–16 letters, numbers or underscores).";

            modalError.classList.add("visible");

            ignInput.focus();

            return;
        }


        modalError.classList.remove("visible");


        alert(
            "Order selected!\n\n" +
            "Rank: " +
            activePurchase.rankName +
            "\n" +
            "Price: ₹" +
            activePurchase.price.toLocaleString("en-IN") +
            "\n" +
            "Minecraft IGN: " +
            ign +
            "\n\n" +
            "UPI payment will be connected next."
        );

    }
);
