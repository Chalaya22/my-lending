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

/* 
function sendReview() {
const rating = document.querySelector(".stars")?.getAttribute("data-rating");
  const skin = document.getElementById('skinType').value;
  const effect = document.getElementById('effect').value;
  const reaction = document.getElementById('reaction').value;
  const time = document.getElementById('time').value;
  const extra = document.getElementById('extra').value;

  let reviewText = "Мой опыт:\n";

  if (rating && rating !== "0") {
  reviewText += "Оценка: " + rating + " / 5 ⭐\n";
}
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
 */

function sendReview() {
  alert(
    "Спасибо за отзыв 💙\n\n" +
      "Функция отправки будет доступна после запуска сайта.",
  );
}
document.querySelectorAll(".stars span").forEach((star) => {
  star.addEventListener("click", function () {
    const value = this.getAttribute("data-value");
    const stars = this.parentElement;
    stars.setAttribute("data-rating", value);

    stars.querySelectorAll("span").forEach((s) => {
      s.classList.toggle("active", s.getAttribute("data-value") <= value);
    });
  });
});
// /---- модальное окно-----/
const modal = document.getElementById("subscribe-modal");

if (modal) {
  const openBtns = document.querySelectorAll("[data-open-subscribe]");
  const closeBtns = modal.querySelectorAll("[data-close-subscribe]");
  const form = modal.querySelector(".subscribe-form");

  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    resetForm();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    form.innerHTML = `
      <div class="subscribe-success">
        <h3>Mulțumesc 💛</h3>
        <p>Te-ai abonat cu succes.</p>
      </div>
    `;

    setTimeout(closeModal, 2500);
  });

  function resetForm() {
    location.reload();
  }
}
// /colaborare/
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".collaboration-form");
  const success = document.querySelector(".collaboration-success");

  if (!form || !success) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // здесь позже подключишь реальную отправку
    form.style.display = "none";
    success.hidden = false;
  });
});
/* появление надписи на картинке при скроле */

document.addEventListener("DOMContentLoaded", () => {
  const accentTexts = document.querySelectorAll(".image-accent-text");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // один раз
        }
      });
    },
    {
      threshold: 0.4,
    },
  );

  accentTexts.forEach((text) => observer.observe(text));
});
