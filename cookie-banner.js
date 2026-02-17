(function () {
  var STORAGE_KEY = "48h_cookie_consent";

  // Si ya hay decisión guardada, no mostrar el banner
  if (localStorage.getItem(STORAGE_KEY)) return;

  // Crear banner
  var banner = document.createElement("div");
  banner.id = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Consentimiento de cookies");
  banner.style.cssText =
    "position:fixed;bottom:0;left:0;right:0;z-index:9999;padding:0;margin:0;opacity:0;transform:translateY(20px);transition:opacity .4s ease,transform .4s ease;font-family:'Inter',system-ui,sans-serif";

  banner.innerHTML =
    '<div style="max-width:56rem;margin:0 auto;padding:1.25rem 1.5rem">' +
      '<div style="background:#000;color:#fff;border-radius:1.25rem;padding:1.5rem 2rem;display:flex;flex-wrap:wrap;align-items:center;gap:1rem 2rem;box-shadow:0 -4px 30px rgba(0,0,0,.15)">' +
        '<p style="flex:1 1 320px;margin:0;font-size:.875rem;line-height:1.6;color:#d1d5db">' +
          "Utilizamos cookies t\u00e9cnicas necesarias para el funcionamiento del sitio. " +
          "Puedes consultar los detalles en nuestra " +
          '<a href="/cookies" style="color:#60a5fa;text-decoration:underline;font-weight:600">Pol\u00edtica de Cookies</a>.' +
        "</p>" +
        '<div style="display:flex;gap:.75rem;flex-shrink:0;flex-wrap:wrap">' +
          '<button id="cookie-reject" style="background:transparent;color:#9ca3af;border:1px solid #374151;padding:.625rem 1.5rem;border-radius:.75rem;font-size:.8125rem;font-weight:700;cursor:pointer;transition:all .2s;white-space:nowrap">' +
            "Solo necesarias" +
          "</button>" +
          '<button id="cookie-accept" style="background:#2563eb;color:#fff;border:none;padding:.625rem 1.5rem;border-radius:.75rem;font-size:.8125rem;font-weight:700;cursor:pointer;transition:all .2s;white-space:nowrap">' +
            "Aceptar todas" +
          "</button>" +
        "</div>" +
      "</div>" +
    "</div>";

  document.body.appendChild(banner);

  // Animación de entrada
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      banner.style.opacity = "1";
      banner.style.transform = "translateY(0)";
    });
  });

  function closeBanner(consent) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ consent: consent, date: new Date().toISOString() })
    );
    banner.style.opacity = "0";
    banner.style.transform = "translateY(20px)";
    setTimeout(function () {
      banner.remove();
    }, 400);
  }

  // Hover effects
  var acceptBtn = document.getElementById("cookie-accept");
  var rejectBtn = document.getElementById("cookie-reject");

  acceptBtn.addEventListener("mouseenter", function () {
    this.style.background = "#1d4ed8";
  });
  acceptBtn.addEventListener("mouseleave", function () {
    this.style.background = "#2563eb";
  });

  rejectBtn.addEventListener("mouseenter", function () {
    this.style.color = "#fff";
    this.style.borderColor = "#6b7280";
  });
  rejectBtn.addEventListener("mouseleave", function () {
    this.style.color = "#9ca3af";
    this.style.borderColor = "#374151";
  });

  acceptBtn.addEventListener("click", function () {
    closeBanner("all");
  });
  rejectBtn.addEventListener("click", function () {
    closeBanner("necessary");
  });
})();
