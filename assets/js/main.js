initTheme();

function initTheme() {
  let defaultTheme = localStorage.getItem("theme");
  if (!defaultTheme) {
    defaultTheme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }
  document.body.classList.toggle("light-mode", defaultTheme === "light");

  const themeSwitch = document.getElementById("theme-toggle");
  if (!themeSwitch) {
    console.error("Theme toggle switch not found");
    return;
  }
  themeSwitch.classList.toggle("active", defaultTheme === "light");
  themeSwitch.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("light-mode") ? "light" : "dark",
    );
    this.classList.toggle("active");
  });
}
