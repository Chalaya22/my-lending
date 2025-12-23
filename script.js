const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("nav-menu");
  const closeBtn = document.querySelector(".menu-close");

  if (hamburger && menu) {
    hamburger.addEventListener("click", function () {
      menu.classList.add("active");
    });
  }

  if (closeBtn && menu) {
    closeBtn.addEventListener("click", function () {
      menu.classList.remove("active");
    });
  }

  // закрытие меню при клике на пункт
  if (menu) {
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("active");
      });
    });
  }
});
