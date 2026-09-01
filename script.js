// =====================================================
// NOVEX STORE - COMPLETE SCRIPT
// =====================================================


// =====================================================
// ELEMENTS
// =====================================================

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

const paymentAmount =
    document.getElementById("paymentAmount");

const utrInput =
    document.getElementById("utrInput");

const paymentError =
    document.getElementById("paymentError");

const paymentSubmit =
    document.getElementById("paymentSubmit");


// =====================================================
// SELECTED ORDER
// =====================================================

let selectedRank = "";
let selectedPrice = 0;


// =====================================================
// CLOUDFLARE WORKER URL
// =====================================================

const API_URL =
    "https://novex-store-api.jainprathmesh031.workers.dev";


// =====================================================
// OPEN PURCHASE POPUP
// =====================================================

function buyRank(rank, price) {

    console.log("NOVEX: buyRank called");
    console.log("Rank:", rank);
    console.log("Price:", price);


    selectedRank = rank;
    selectedPrice = price;


    // -----------------------------------------
    // Set rank information
    // -----------------------------------------

    if (modalRankName) {
        modalRankName.textContent = rank;
    }

    if (modalRankTag) {
        modalRankTag.textContent = rank;
    }

    if (modalPrice) {
        modalPrice.textContent =
            "₹" + Number(price).toLocaleString("en-IN");
    }


    // -----------------------------------------
    // Reset IGN
    // -----------------------------------------

    if (ignInput) {
        ignInput.value = "";
    }


    // -----------------------------------------
    // Reset error
    // -----------------------------------------

    if (modalError) {

        modalError.textContent =
            "Enter the exact username you use to join the server.";

        modalError.classList.remove("show");
    }


    // -----------------------------------------
    // Hide payment section
    // -----------------------------------------

    if (paymentSection) {
        paymentSection.style.display = "none";
    }


    // -----------------------------------------
    // Show Continue button
    // -----------------------------------------

    if (modalSubmit) {

        modalSubmit.style.display = "block";

        modalSubmit.disabled = false;

        modalSubmit.textContent =
            "Continue to payment";
    }


    // -----------------------------------------
    // Reset payment section
    // -----------------------------------------

    if (paymentAmount) {

        paymentAmount.textContent =
            "₹" + Number(price).toLocaleString("en-IN");
    }


    if (utrInput) {
        utrInput.value = "";
    }


    if (paymentError) {
        paymentError.classList.remove("show");
    }


    if (paymentSubmit) {

        paymentSubmit.disabled = false;

        paymentSubmit.textContent =
            "I've Completed Payment";
    }


    // -----------------------------------------
    // OPEN MODAL
    // -----------------------------------------

    if (modalBackdrop) {

        modalBackdrop.classList.add("active");

    } else {

        console.error(
            "NOVEX ERROR: modalBackdrop not found."
        );

        return;
    }


    // -----------------------------------------
    // Focus username field
    // -----------------------------------------

    setTimeout(function () {

        if (ignInput) {
            ignInput.focus();
        }

    }, 150);

}


// =====================================================
// CLOSE POPUP
// =====================================================

function closeModal() {

    if (modalBackdrop) {

        modalBackdrop.classList.remove("active");

    }

}


// =====================================================
// CLOSE BUTTON
// =====================================================

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}


// =====================================================
// CLICK OUTSIDE MODAL
// =====================================================

if (modalBackdrop) {

    modalBackdrop.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modalBackdrop
            ) {

                closeModal();

            }

        }
    );

}


// =====================================================
// ESCAPE KEY
// =====================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);


// =====================================================
// CONTINUE TO PAYMENT
// =====================================================

if (modalSubmit) {

    modalSubmit.addEventListener(
        "click",
        function () {

            const ign =
                ignInput.value.trim();


            // ---------------------------------
            // IGN EMPTY
            // ---------------------------------

            if (!ign) {

                modalError.textContent =
                    "Please enter your Minecraft username.";

                modalError.classList.add("show");

                ignInput.focus();

                return;
            }


            // ---------------------------------
            // IGN LENGTH
            // ---------------------------------

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


            // ---------------------------------
            // IGN CHARACTERS
            // ---------------------------------

            if (
                !/^[A-Za-z0-9_]+$/.test(ign)
            ) {

                modalError.textContent =
                    "Username can only contain letters, numbers and underscores.";

                modalError.classList.add("show");

                ignInput.focus();

                return;
            }


            // ---------------------------------
            // VALID
            // ---------------------------------

            modalError.classList.remove("show");


            // ---------------------------------
            // SHOW PAYMENT SECTION
            // ---------------------------------

            if (paymentAmount) {

                paymentAmount.textContent =
                    "₹" +
                    Number(selectedPrice)
                        .toLocaleString("en-IN");

            }


            if (paymentSection) {

                paymentSection.style.display =
                    "block";

            }


            // ---------------------------------
            // HIDE CONTINUE BUTTON
            // ---------------------------------

            modalSubmit.style.display =
                "none";


            // ---------------------------------
            // RESET UTR
            // ---------------------------------

            if (utrInput) {
                utrInput.value = "";
            }


            if (paymentError) {
                paymentError.classList.remove("show");
            }


            // ---------------------------------
            // FOCUS UTR
            // ---------------------------------

            if (utrInput) {

                setTimeout(function () {

                    utrInput.focus();

                }, 100);

            }

        }
    );

}


// =====================================================
// SUBMIT PAYMENT / UTR
// =====================================================

if (paymentSubmit) {

    paymentSubmit.addEventListener(
        "click",
        async function () {

            const utr =
                utrInput.value.trim();


            // ---------------------------------
            // UTR EMPTY
            // ---------------------------------

            if (!utr) {

                paymentError.textContent =
                    "Please enter your UTR / Transaction ID.";

                paymentError.classList.add("show");

                utrInput.focus();

                return;
            }


            // ---------------------------------
            // UTR TOO SHORT
            // ---------------------------------

            if (utr.length < 6) {

                paymentError.textContent =
                    "Please enter a valid UTR / Transaction ID.";

                paymentError.classList.add("show");

                utrInput.focus();

                return;
            }


            // ---------------------------------
            // UTR TOO LONG
            // ---------------------------------

            if (utr.length > 50) {

                paymentError.textContent =
                    "UTR / Transaction ID is too long.";

                paymentError.classList.add("show");

                utrInput.focus();

                return;
            }


            paymentError.classList.remove("show");


            // ---------------------------------
            // DISABLE BUTTON
            // ---------------------------------

            paymentSubmit.disabled = true;

            paymentSubmit.textContent =
                "Submitting Order...";


            // ---------------------------------
            // SEND TO CLOUDFLARE
            // ---------------------------------

            try {

                console.log(
                    "NOVEX: Sending order..."
                );


                const response =
                    await fetch(
                        API_URL + "/api/order",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                minecraft_ign:
                                    ignInput.value.trim(),

                                rank:
                                    selectedRank,

                                utr:
                                    utr

                            })

                        }
                    );


                const result =
                    await response.json();


                console.log(
                    "NOVEX API response:",
                    result
                );


                // ---------------------------------
                // API ERROR
                // ---------------------------------

                if (
                    !response.ok ||
                    !result.success
                ) {

                    paymentError.textContent =
                        result.error ||
                        "Unable to submit your order.";

                    paymentError.classList.add("show");


                    paymentSubmit.disabled =
                        false;

                    paymentSubmit.textContent =
                        "I've Completed Payment";

                    return;
                }


                // ---------------------------------
                // SUCCESS
                // ---------------------------------

                paymentSubmit.textContent =
                    "Order Submitted ✓";


                alert(

                    "✅ ORDER SUBMITTED!\n\n" +

                    "Order ID: " +
                    result.order_id +

                    "\n\nRank: " +
                    result.rank +

                    "\nAmount: ₹" +
                    result.amount +

                    "\nMinecraft IGN: " +
                    result.minecraft_ign +

                    "\n\nStatus: PENDING\n\n" +

                    "Your payment will be verified before " +
                    "the rank is delivered."

                );


                // ---------------------------------
                // CLOSE MODAL
                // ---------------------------------

                closeModal();


            } catch (error) {

                console.error(
                    "NOVEX API ERROR:",
                    error
                );


                paymentError.textContent =
                    "Unable to connect to NOVEX Store. Please try again.";

                paymentError.classList.add("show");


                paymentSubmit.disabled =
                    false;

                paymentSubmit.textContent =
                    "I've Completed Payment";

            }

        }
    );

}


// =====================================================
// DEBUG
// =====================================================

console.log(
    "================================="
);

console.log(
    "NOVEX STORE SCRIPT LOADED"
);

console.log(
    "buyRank:",
    typeof buyRank
);

console.log(
    "modalBackdrop:",
    modalBackdrop
);

console.log(
    "paymentSection:",
    paymentSection
);

console.log(
    "================================="
);
