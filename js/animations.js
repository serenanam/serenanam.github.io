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
  