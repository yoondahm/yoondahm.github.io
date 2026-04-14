initTheme();

function initTheme() {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) {
        console.error("Theme toggle button not found");
        return;
    }
    btn.addEventListener("click", function() {
        document.body.classList.toggle("light-mode");
    });
}
