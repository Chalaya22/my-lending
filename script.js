document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const closeBtn = document.getElementById("menu-close");

  if (!hamburger || !navMenu) return;

  // открыть меню
  hamburger.addEventListener("click", () => {
    navMenu.classList.add("active");
    document.body.classList.add("menu-open");
  });

  // закрыть по крестику
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  }

  // закрыть при клике на ссылку
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
});
//switch
// document.addEventListener("DOMContentLoaded", () => {
//   const langToggle = document.querySelector(".lang-toggle");
//   if (!langToggle) return;

//   langToggle.addEventListener("click", () => {
//     const currentLang = langToggle.dataset.lang;

//     if (currentLang === "ro") {
//       window.location.href = "../ru/index.html";
//     } else {
//       window.location.href = "../ro/index.html";
//     }
//   });
// });
function switchLang(lang) {
  const path = window.location.pathname;
  if (lang === "ru") {
    window.location.href = path.replace("/ro/", "/ru/");
  } else {
    window.location.href = path.replace("/ru/", "/ro/");
  }
}

/* desktop toggle */
const toggle = document.querySelector(".lang-toggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    const current = toggle.dataset.lang;
    const next = current === "ro" ? "ru" : "ro";
    switchLang(next);
  });
}

/* mobile buttons */

const mobileToggle = document.querySelector(".mobile-lang-toggle");

if (mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    const current = mobileToggle.dataset.lang;
    const next = current === "ro" ? "ru" : "ro";
    switchLang(next);
  });
}

const isRU = window.location.pathname.includes("/ru/");

if (mobileToggle) {
  mobileToggle.dataset.lang = isRU ? "ru" : "ro";
  mobileToggle.querySelector(".ro").classList.toggle("active", !isRU);
  mobileToggle.querySelector(".ru").classList.toggle("active", isRU);
}
