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

/* <===================button Полезные гайды ========================*/

document.addEventListener("DOMContentLoaded", function () {
  const trigger = document.querySelector(".guides-trigger");
  const panel = document.querySelector(".guides-panel");

  if (!trigger || !panel) return;

  // Логика клика по кнопке
  trigger.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Переключаем класс открытия (теперь кнопка НЕ пропадает)
    panel.classList.toggle("is-open");
  });

  // Останавливаем всплытие, чтобы клик внутри панели её не закрывал
  panel.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // Закрываем панель при клике в любое другое место экрана
  document.addEventListener("click", function () {
    panel.classList.remove("is-open");
  });
});

/* <===================// ЛОГИКА ФИЛЬТРОВ В ОБЗОРЫ КОСМЕТИКИ ========================*/
// Уходовая косметика
const filterLinks = document.querySelectorAll(".filter-link");
const cards = document.querySelectorAll(".review-card:not(.placeholder)");

filterLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Переключаем активный класс на кнопках
    filterLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    const filter = link.getAttribute("data-filter");

    cards.forEach((card) => {
      const categories = card.getAttribute("data-category");

      if (filter === "all" || categories.includes(filter)) {
        card.style.display = "flex"; // Показываем подходящие
      } else {
        card.style.display = "none"; // Прячем остальные
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("care-toggle");
  const collapsible = document.getElementById("care-collapsible");
  const content = document.getElementById("care-content");

  toggle.addEventListener("click", function () {
    const isOpen = collapsible.classList.toggle("open");

    toggle.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = null;
    }
  });
});
// Декоративная косметика
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("makeup-toggle");
  const collapsible = document.getElementById("makeup-collapsible");
  const content = document.getElementById("makeup-content");

  toggle.addEventListener("click", function () {
    const isOpen = collapsible.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
    if (isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = null;
    }
  });
});
//____________________ Карточки обзора (раскрытие на той же странице)_______________
function toggleDetails(button) {
  let details =
    button
      .closest(".review-card-modal")
      ?.querySelector(".review-card-modal-details") ||
    button.parentElement.querySelector(".review-card-modal-details");

  if (!details) return;

  details.classList.toggle("show");

  button.textContent = details.classList.contains("show")
    ? button.dataset.close
    : button.dataset.open;
}

// _____ <!-- SHARE BAR -->__________________________________________________
// === ЯЗЫК СТРАНИЦЫ ===
const lang = document.documentElement.lang || "ru";

// === ТЕКСТЫ ===
const text = {
  ru: {
    copied: "Ссылка скопирована!",
    subject: "Рекомендую статью",
    shareText: "Смотри статью: ",
  },
  ro: {
    copied: "Link copiat!",
    subject: "Îți recomand acest articol",
    shareText: "Vezi acest articol: ",
  },
};

const t = text[lang] || text.ru;

// === ЖДЁМ ЗАГРУЗКУ СТРАНИЦЫ ===
document.addEventListener("DOMContentLoaded", () => {
  const url = encodeURIComponent(window.location.href);
  const fullText = encodeURIComponent(t.shareText + window.location.href);

  // === FACEBOOK ===
  document.querySelectorAll(".fb").forEach((el) => {
    el.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  });

  // === TELEGRAM ===
  document.querySelectorAll(".tg").forEach((el) => {
    el.href = `https://t.me/share/url?url=${url}&text=${encodeURIComponent(t.shareText)}`;
  });

  // === WHATSAPP ===
  document.querySelectorAll(".wa").forEach((el) => {
    el.href = `https://api.whatsapp.com/send?text=${fullText}`;
  });

  // === VIBER ===
  document.querySelectorAll(".vb").forEach((el) => {
    el.href = `viber://forward?text=${fullText}`;
  });

  // === EMAIL (FIX) ===
  document.querySelectorAll(".mail").forEach((el) => {
    el.href = `mailto:?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(t.shareText + window.location.href)}`;
  });
});

// === КОПИРОВАНИЕ ССЫЛКИ ===
function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert(t.copied);
  });
}

// === СКРОЛЛ (СКРЫТИЕ ПАНЕЛИ) ===
let lastScroll = 0;
const shareBar = document.getElementById("shareBar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (!shareBar) return;

  if (currentScroll > lastScroll && currentScroll > 100) {
    // вниз
    shareBar.classList.add("hide");
  } else {
    // вверх
    shareBar.classList.remove("hide");
  }

  lastScroll = currentScroll;
});

// === КНОПКА ВВЕРХ ===
const btn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (btn) {
    if (window.scrollY > 300) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  }
});

if (btn) {
  btn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}
//
document.querySelectorAll(".zoom-container").forEach((container) => {
  const img = container.querySelector(".zoom-image");
  const result = container.querySelector(".zoom-result");
  const lens = container.querySelector(".zoom-lens");

  const zoom = 1; // можешь менять (1.5–2.5 идеально)

  function initZoom() {
    container.addEventListener("mousemove", (e) => {
      result.style.display = "block";
      lens.style.display = "block";

      const rect = img.getBoundingClientRect();

      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      const lensWidth = lens.offsetWidth;
      const lensHeight = lens.offsetHeight;

      let lensX = x - lensWidth / 2;
      let lensY = y - lensHeight / 2;

      // ограничение линзы внутри картинки
      lensX = Math.max(0, Math.min(lensX, rect.width - lensWidth));
      lensY = Math.max(0, Math.min(lensY, rect.height - lensHeight));

      lens.style.left = lensX + "px";
      lens.style.top = lensY + "px";

      // 🔥 правильный расчет без растягивания
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;

      const bgWidth = img.naturalWidth * zoom;
      const bgHeight = img.naturalHeight * zoom;

      const percentX = lensX / rect.width;
      const percentY = lensY / rect.height;

      result.style.backgroundImage = `url("${img.src}")`;
      result.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
      result.style.backgroundPosition = `${-percentX * bgWidth}px ${-percentY * bgHeight}px`;
    });

    container.addEventListener("mouseleave", () => {
      lens.style.display = "none";
      result.style.display = "none";
    });
  }

  // ✅ ждем загрузку картинки
  if (img.complete) {
    initZoom();
  } else {
    img.onload = initZoom;
  }
});
