// index.js
const dataInput = document.getElementById("dataInput");
const saveBtn = document.getElementById("saveBtn");
const displayElement_1 = document.querySelector(".form");
const displayElement_2 = document.querySelector(".welcome");
const navbar = document.querySelector(".navbar");

function dataFetcher() {
    const savedData = localStorage.getItem("user_name");
    return savedData;
}

saveBtn.addEventListener("click", () => {
    const data = dataInput.value;
    if (data.trim() !== "") {
        localStorage.setItem("user_name", data);
        dataInput.value = "";

        // Reload the page to display the welcome message
        window.location.reload();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const authenticated = dataFetcher();
    // If not authenticated, hide the welcome message, show the login form, and return
    if (!authenticated) {
        navbar.style.display = "none";
        displayElement_1.style.display = "block";
        displayElement_2.style.display = "none";
        return; // Stop further execution
    }

    // If authenticated, hide the login form and show the welcome message
    displayElement_1.style.display = "none";
    displayElement_2.innerHTML = `Welcome <b>${authenticated}</b>`;
    displayElement_2.style.display = "block";
});
