let defaultTheme = localStorage.getItem("theme");
if (!defaultTheme) {
  defaultTheme = window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}
document.documentElement.classList.toggle("light-mode", defaultTheme === "light");
