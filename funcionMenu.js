/**
 * Menú móvil (abre/cierra panel + overlay)
 * - Compatible con GitHub Pages (rutas relativas)
 * - No falla si falta algún elemento
 * - Cierra al hacer click en overlay, en un link, o con ESC
 */
(function () {
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  ready(function () {
    const body = document.body;
    const openBtn = document.getElementById("openMenuBtn");
    const closeBtn = document.getElementById("closeMenuBtn");
    const overlay = document.getElementById("menuOverlay");
    const panel = document.getElementById("mobileMenu");

    if (!openBtn || !closeBtn || !overlay || !panel) return;

    // Asegura estado inicial consistente
    body.classList.remove("menu-open");
    overlay.hidden = true;
    panel.setAttribute("aria-hidden", "true");
    openBtn.setAttribute("aria-expanded", "false");

    function openMenu() {
      body.classList.add("menu-open");
      overlay.hidden = false;
      panel.setAttribute("aria-hidden", "false");
      openBtn.setAttribute("aria-expanded", "true");
      // Evita scroll de fondo cuando el menú está abierto
      body.style.overflow = "hidden";
      // Enfoca el botón de cerrar para accesibilidad
      closeBtn.focus({ preventScroll: true });
    }

    function closeMenu() {
      body.classList.remove("menu-open");
      overlay.hidden = true;
      panel.setAttribute("aria-hidden", "true");
      openBtn.setAttribute("aria-expanded", "false");
      body.style.overflow = "";
      openBtn.focus({ preventScroll: true });
    }

    openBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    // Cierra al hacer click en un link del menú (móvil)
    panel.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) closeMenu();
    });

    // Cierra con ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && body.classList.contains("menu-open")) closeMenu();
    });

    // Si cambia a desktop mientras está abierto, lo cerramos
    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 900px)").matches && body.classList.contains("menu-open")) {
        closeMenu();
      }
    });
  });
})();
