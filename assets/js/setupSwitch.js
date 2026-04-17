setupSwitch();

function setupSwitch() {
  let defaultTheme = localStorage.getItem("theme");
  if (!defaultTheme) {
    defaultTheme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  const themeSwitch = document.getElementById("theme-toggle");
  if (!themeSwitch) {
    console.error("Theme toggle switch not found");
    return;
  }
  themeSwitch.classList.toggle("active", defaultTheme === "light");
  themeSwitch.addEventListener("click", function () {
    document.documentElement.classList.toggle("light-mode");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("light-mode") ? "light" : "dark",
    );
    this.classList.toggle("active");
  });
}
