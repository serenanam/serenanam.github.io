//hero content appear
document.addEventListener("DOMContentLoaded", () => {
  // mobile popup
  const mobilePopup = document.getElementById("mobile-popup");
  const mobilePopupClose = document.querySelector(".mobile-popup-close");
  const mobileViewport = window.matchMedia("(max-width: 768px)");

  const updateMobilePopup = () => {
    if (!mobilePopup) {
      return;
    }

    const shouldShow = mobileViewport.matches;
    mobilePopup.classList.toggle("is-visible", shouldShow);
    mobilePopup.setAttribute("aria-hidden", String(!shouldShow));
    document.body.style.overflow = shouldShow ? "hidden" : "";
  };

  mobilePopupClose?.addEventListener("click", () => {
    mobilePopup?.classList.remove("is-visible");
    mobilePopup?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  });

  mobileViewport.addEventListener("change", updateMobilePopup);
  updateMobilePopup();

  const heroItems = [
    [document.querySelector(".title-container .title-text1"),
    document.querySelector(".profile-doodle")],
    [document.querySelector(".title-container .title-text2"),
    document.querySelector(".title-container .title-bg-container")],
    [document.querySelector(".title-container .title-text3"),
    document.querySelector(".socials-container")],
  ];

  heroItems.forEach((group, i) => {
    setTimeout(() => {
      group.forEach(el => el.classList.add("show"));
    }, i * 400);
  });
});

//navbar section highlight
const navLinks = document.querySelectorAll(".nav-item a");
const sections = document.querySelectorAll("section");

function updateActiveNav() {
  let currentSectionId = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);


// experience section scroll
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".experience-card, .experience-container-header");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach(card => observer.observe(card));
});

//project section scroll 
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    },
    { threshold: 0.5 }
  );

  cards.forEach(card => observer.observe(card));
});
