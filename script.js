// ================= SCROLL LOCK FIX =================

window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    window.scrollTo(0, 0);

    // Убираем фокус с элементов
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
          HAMBURGER MENU
  ========================== */

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const closeBtn = document.getElementById("menu-close");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.add("active");
      document.body.classList.add("menu-open");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      navMenu?.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  }

  /* =========================
          LANGUAGE SWITCH
  ========================== */

  function switchLang(lang) {
    const path = window.location.pathname;

    if (lang === "ru") {
      window.location.href = path.replace("/ro/", "/ru/");
    } else {
      window.location.href = path.replace("/ru/", "/ro/");
    }
  }

  const langToggle = document.querySelector(".lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const next = langToggle.dataset.lang === "ro" ? "ru" : "ro";
      switchLang(next);
    });
  }

  const mobileToggle = document.querySelector(".mobile-lang-toggle");

  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      const next = mobileToggle.dataset.lang === "ro" ? "ru" : "ro";
      switchLang(next);
    });

    const isRU = window.location.pathname.includes("/ru/");
    mobileToggle.dataset.lang = isRU ? "ru" : "ro";

    const ro = mobileToggle.querySelector(".ro");
    const ru = mobileToggle.querySelector(".ru");

    if (ro && ru) {
      ro.classList.toggle("active", !isRU);
      ru.classList.toggle("active", isRU);
    }
  }

  /* =========================
          STARS RATING
  ========================== */

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

  /* =========================
          SEND REVIEW
  ========================== */

  window.sendReview = function () {
    alert(
      "Спасибо за отзыв 💙\n\nФункция отправки будет доступна после запуска сайта.",
    );
  };

  /* =========================
          SUBSCRIBE MODAL
  ========================== */

  const modal = document.getElementById("subscribe-modal");

  if (modal) {
    const openBtns = document.querySelectorAll("[data-open-subscribe]");
    const closeBtns = modal.querySelectorAll("[data-close-subscribe]");
    const form = modal.querySelector(".subscribe-form");

    const closeModal = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
      location.reload();
    };

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

    if (form) {
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
    }
  }
});
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

document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.querySelector(".guides-trigger");
  const panel = document.querySelector(".guides-panel");

  if (!trigger || !panel) return;

  const closePanel = () => {
    panel.classList.remove("is-open");
  };

  const togglePanel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    panel.classList.toggle("is-open");
  };

  trigger.addEventListener("click", togglePanel);

  panel.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", closePanel);

  // закрытие по Escape (очень полезно для UX)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePanel();
  });
});

/* <===================// ЛОГИКА ФИЛЬТРОВ В ОБЗОРЫ КОСМЕТИКИ ========================*/
document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     ФИЛЬТРЫ ОБЗОРОВ КОСМЕТИКИ
  ========================== */

  const filterLinks = document.querySelectorAll(".filter-link");
  const cards = document.querySelectorAll(".review-card:not(.placeholder)");

  if (filterLinks.length && cards.length) {
    filterLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        filterLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");

        const filter = link.getAttribute("data-filter");

        cards.forEach((card) => {
          const categories = card.getAttribute("data-category") || "";

          if (filter === "all" || categories.includes(filter)) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  /* =========================
        CARE COLLAPSIBLE
  ========================== */

  const careToggle = document.getElementById("care-toggle");
  const careCollapsible = document.getElementById("care-collapsible");
  const careContent = document.getElementById("care-content");

  if (careToggle && careCollapsible && careContent) {
    careToggle.addEventListener("click", function () {
      const isOpen = careCollapsible.classList.toggle("open");

      careToggle.setAttribute("aria-expanded", isOpen);

      if (isOpen) {
        careContent.style.maxHeight = careContent.scrollHeight + "px";
      } else {
        careContent.style.maxHeight = null;
      }
    });
  }

  /* =========================
       MAKEUP COLLAPSIBLE
  ========================== */

  const makeupToggle = document.getElementById("makeup-toggle");
  const makeupCollapsible = document.getElementById("makeup-collapsible");
  const makeupContent = document.getElementById("makeup-content");

  if (makeupToggle && makeupCollapsible && makeupContent) {
    makeupToggle.addEventListener("click", function () {
      const isOpen = makeupCollapsible.classList.toggle("open");

      makeupToggle.setAttribute("aria-expanded", isOpen);

      if (isOpen) {
        makeupContent.style.maxHeight = makeupContent.scrollHeight + "px";
      } else {
        makeupContent.style.maxHeight = null;
      }
    });
  }
});
//____________________ Карточки обзора (раскрытие на той же странице)_______________
function toggleDetails(button) {
  if (!button) return;

  const card = button.closest(".review-card-modal");
  if (!card) return;

  const details = card.querySelector(".review-card-modal-details");
  if (!details) return;

  details.classList.toggle("show");

  const isOpen = details.classList.contains("show");

  const lang = document.documentElement.lang;

  let openText = "Подробнее";
  let closeText = "Скрыть";

  if (lang.startsWith("ro")) {
    openText = "Citește recenzia";
    closeText = "Ascunde";
  }

  button.textContent = isOpen ? closeText : openText;
}

// _____ <!-- SHARE BAR -->__________________________________________________
document.addEventListener("DOMContentLoaded", () => {
  /* =========================
        LANGUAGE TEXTS
  ========================== */

  const lang = document.documentElement.lang || "ru";

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

  /* =========================
          SHARE LINKS
  ========================== */

  const url = encodeURIComponent(window.location.href);
  const fullText = encodeURIComponent(t.shareText + window.location.href);

  document.querySelectorAll(".fb").forEach((el) => {
    el.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  });

  document.querySelectorAll(".tg").forEach((el) => {
    el.href = `https://t.me/share/url?url=${url}&text=${encodeURIComponent(t.shareText)}`;
  });

  document.querySelectorAll(".wa").forEach((el) => {
    el.href = `https://api.whatsapp.com/send?text=${fullText}`;
  });

  document.querySelectorAll(".vb").forEach((el) => {
    el.href = `viber://forward?text=${fullText}`;
  });

  document.querySelectorAll(".mail").forEach((el) => {
    el.href = `mailto:?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(t.shareText + window.location.href)}`;
  });

  /* =========================
        COPY LINK BUTTON
  ========================== */

  window.copyLink = function () {
    if (!navigator.clipboard) {
      alert("Скопируйте ссылку вручную: " + window.location.href);
      return;
    }

    navigator.clipboard.writeText(window.location.href).then(() => {
      alert(t.copied);
    });
  };

  /* =========================
        SHARE BAR SCROLL
  ========================== */

  const shareBar = document.getElementById("shareBar");
  let lastScroll = 0;

  if (shareBar) {
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > lastScroll && currentScroll > 100) {
        shareBar.classList.add("hide");
      } else {
        shareBar.classList.remove("hide");
      }

      lastScroll = currentScroll;
    });
  }

  /* =========================
        SCROLL TO TOP BUTTON
  ========================== */

  const btn = document.getElementById("scrollTopBtn");

  if (btn) {
    window.addEventListener("scroll", () => {
      btn.classList.toggle("show", window.scrollY > 300);
    });

    btn.onclick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }
});
//==================================zoom
// ========================= ZOOM =========================
document.querySelectorAll(".zoom-container").forEach((container) => {
  const img = container.querySelector(".zoom-image");
  const lens = container.querySelector(".zoom-lens");
  const result = container.querySelector(".zoom-result");

  if (!img || !lens || !result) return;

  const zoom = 1;

  container.addEventListener("mousemove", (e) => {
    lens.style.display = "block";
    result.style.display = "block";

    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lensWidth = lens.offsetWidth;
    const lensHeight = lens.offsetHeight;

    let lensX = Math.max(
      0,
      Math.min(x - lensWidth / 2, rect.width - lensWidth),
    );
    let lensY = Math.max(
      0,
      Math.min(y - lensHeight / 2, rect.height - lensHeight),
    );

    lens.style.left = lensX + "px";
    lens.style.top = lensY + "px";

    const rx = (lensX / rect.width) * img.naturalWidth;
    const ry = (lensY / rect.height) * img.naturalHeight;

    result.style.backgroundImage = `url(${img.src})`;
    result.style.backgroundSize = `${img.naturalWidth * zoom}px ${img.naturalHeight * zoom}px`;
    result.style.backgroundPosition = `-${rx * zoom}px -${ry * zoom}px`;
  });

  container.addEventListener("mouseleave", () => {
    lens.style.display = "none";
    result.style.display = "none";
  });
});

// ========================= ZOOM V2 =========================
document.querySelectorAll(".zoom-v2").forEach((container) => {
  const img = container.querySelector(".zoom-image");
  const lens = container.querySelector(".zoom-lens");
  const result = container.querySelector(".zoom-result");

  if (!img || !lens || !result) return;

  const zoom = 2;

  container.addEventListener("mousemove", (e) => {
    lens.style.display = "block";
    result.style.display = "block";

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lensWidth = lens.offsetWidth;
    const lensHeight = lens.offsetHeight;

    let lensX = Math.max(
      0,
      Math.min(x - lensWidth / 2, rect.width - lensWidth),
    );
    let lensY = Math.max(
      0,
      Math.min(y - lensHeight / 2, rect.height - lensHeight),
    );

    lens.style.left = lensX + "px";
    lens.style.top = lensY + "px";

    const rx = (lensX / rect.width) * img.naturalWidth;
    const ry = (lensY / rect.height) * img.naturalHeight;

    result.style.backgroundImage = `url(${img.src})`;
    result.style.backgroundSize = `${img.naturalWidth * zoom}px ${img.naturalHeight * zoom}px`;
    result.style.backgroundPosition = `-${rx * zoom}px -${ry * zoom}px`;
  });

  container.addEventListener("mouseleave", () => {
    lens.style.display = "none";
    result.style.display = "none";
  });
});
// ==========================КАРУСЕЛЬ
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".carousel-wrapper").forEach((wrapper) => {
    const track = wrapper.querySelector(".carousel-track");

    if (!track) return;

    // ===== MORE INFO  caurusel=====
    const cards = wrapper.querySelectorAll(".review-carousel-card");

    cards.forEach((card) => {
      const btn = card.querySelector(".more-info-btn");
      if (!btn) return;

      btn.addEventListener("click", () => {
        const isOpen = card.classList.contains("is-open");

        cards.forEach((c) => {
          c.classList.remove("is-open");
          const b = c.querySelector(".more-info-btn");
          if (b) b.textContent = "Подробнее";
        });

        if (!isOpen) {
          card.classList.add("is-open");
          btn.textContent = "Скрыть";
        }
      });
    });
  });
});

/* --------- для видео с Instagram  на услугу Записаться  */

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("videoModal");
  const trigger = document.getElementById("videoTrigger");
  const closeBtn = document.getElementById("closeVideo");
  const video = document.getElementById("videoPlayer");

  // если блока нет — ничего не делаем
  if (!modal || !trigger || !closeBtn || !video) return;

  function openVideo() {
    modal.style.display = "flex";
    document.body.classList.add("modal-open");

    video.currentTime = 0;

    setTimeout(() => {
      video.play().catch(() => {});
    }, 120);
  }

  function closeVideo() {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");

    video.pause();
    video.currentTime = 0;
  }

  trigger.addEventListener("click", openVideo);
  closeBtn.addEventListener("click", closeVideo);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeVideo();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeVideo();
  });
});
