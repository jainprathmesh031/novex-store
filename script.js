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


function buyRank(rank, price) {

    selectedRank = rank;
    selectedPrice = price;

    modalRankName.textContent = rank;
    modalRankTag.textContent = rank;

    modalPrice.textContent =
        "₹" + price.toLocaleString("en-IN");

    ignInput.value = "";

utrInput.value = "";

modalError.classList.remove("show");

paymentError.classList.remove("show");

paymentSection.style.display = "none";

modalSubmit.style.display = "block";

paymentAmount.textContent =
    "₹" + price.toLocaleString("en-IN");
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


              paymentSection.style.display = "block";

        modalSubmit.style.display = "none";

        utrInput.focus();
        paymentSubmit.addEventListener(
    "click",
    function() {

        const utr =
            utrInput.value.trim();

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
            "Payment submitted!\\n\\n" +
            "Rank: " + selectedRank + "\\n" +
            "Amount: ₹" +
            selectedPrice.toLocaleString("en-IN") +
            "\\nMinecraft IGN: " + ignInput.value.trim() +
            "\\nUTR: " + utr +
            "\\n\\nYour payment will be verified before the rank is delivered."
        );

    }
);
