const resetButton = document.getElementById("logout");

resetButton.addEventListener("click", () => {
    localStorage.removeItem("user_name");
    // Reload the page to show the login form again
    window.location.href = "/";
});
