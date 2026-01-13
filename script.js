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
/* forma ingridients DISQUS */
{
  /* <script>
function sendReview() {
  const skin = document.getElementById('skinType').value;
  const effect = document.getElementById('effect').value;
  const reaction = document.getElementById('reaction').value;
  const time = document.getElementById('time').value;
  const extra = document.getElementById('extra').value;

  let reviewText = "Мой опыт:\n";

  if (skin) reviewText += "• Тип кожи: " + skin + "\n";
  if (effect) reviewText += "• Эффект: " + effect + "\n";
  if (reaction) reviewText += "• Реакции: " + reaction + "\n";
  if (time) reviewText += "• Результат через: " + time + "\n";
  if (extra) reviewText += "• Дополнительно: " + extra + "\n";

  alert(
    "Ваш отзыв сформирован 👍\n\n" +
    "Сейчас он будет вставлен в форму комментариев ниже.\n" +
    "Осталось нажать «Опубликовать»."
  );

  // Прокрутка к Disqus
  document.getElementById('disqus_thread').scrollIntoView({ behavior: 'smooth' });

  // Копирование в буфер
  navigator.clipboard.writeText(reviewText);
}
</script> */
}
