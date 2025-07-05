const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.setProperty("--delay", `${i * 100}ms`);
        el.classList.remove("opacity-0", "translate-y-10");
        el.classList.add("opacity-100", "translate-y-0");
        observer.unobserve(el);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll(".card-feature").forEach((el) => {
  observer.observe(el);
});
