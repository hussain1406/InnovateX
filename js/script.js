document.getElementById("dark-mode-button").addEventListener("click", (e) => {
  const currentTheme =
    document.body.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
  document.body.setAttribute("data-bs-theme", currentTheme);
  console.log("Clicked!");
});
