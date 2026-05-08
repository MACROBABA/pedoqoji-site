// SCROLL ANIMATION
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach((item) => {
    const elementTop = item.getBoundingClientRect().top;
    const visiblePoint = 100;

    if (elementTop < windowHeight - visiblePoint) {
      item.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// REGISTER MODAL
const openModalBtn = document.querySelector(".open-modal");
const registerModal = document.getElementById("registerModal");
const closeModalBtn = document.querySelector(".close-modal");

if (openModalBtn && registerModal && closeModalBtn) {
  openModalBtn.addEventListener("click", function (e) {
    e.preventDefault();
    registerModal.classList.add("active");
  });

  closeModalBtn.addEventListener("click", function () {
    registerModal.classList.remove("active");
  });

  window.addEventListener("click", function (e) {
    if (e.target === registerModal) {
      registerModal.classList.remove("active");
    }
  });
}


// COUNT UP ON SCROLL
document.addEventListener("DOMContentLoaded", function () {
  const statsSection = document.querySelector(".stats-section");
  const stats = document.querySelectorAll(".stat-number");
  let counted = false;

  function countUp(element, endValue) {
    let startValue = 0;
    const duration = 5000;
    const increment = endValue / (duration / 16);

    const counter = setInterval(function () {
      startValue += increment;

      if (startValue >= endValue) {
        element.textContent = endValue + "+";
        clearInterval(counter);
      } else {
        element.textContent = Math.floor(startValue) + "+";
      }
    }, 16);
  }

  function startCounterOnScroll() {
    if (!statsSection || counted) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 150) {
      stats.forEach(function (stat) {
        const endValue = parseInt(stat.textContent);
        countUp(stat, endValue);
      });

      counted = true;
    }
  }

  window.addEventListener("scroll", startCounterOnScroll);
  window.addEventListener("load", startCounterOnScroll);
});


// MULTIPLE IMAGE SLIDERS
document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".image-slider-wrap");

  sliders.forEach(function (slider) {
    const images = slider.querySelectorAll(".slider-image");
    const dots = slider.querySelectorAll(".dot");
    let currentIndex = 0;

    if (!images.length || !dots.length) return;

    function showSlide(index) {
      images.forEach(function (image) {
        image.classList.remove("active");
      });

      dots.forEach(function (dot) {
        dot.classList.remove("active");
      });

      images[index].classList.add("active");
      dots[index].classList.add("active");
    }

    function nextSlide() {
      currentIndex++;

      if (currentIndex >= images.length) {
        currentIndex = 0;
      }

      showSlide(currentIndex);
    }

    dots.forEach(function (dot, index) {
      dot.addEventListener("click", function () {
        currentIndex = index;
        showSlide(currentIndex);
      });
    });

    showSlide(currentIndex);
    setInterval(nextSlide, 5000);
  });
});
// SCROLL TO TOP BUTTON
document.addEventListener("DOMContentLoaded", function () {
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (!scrollTopBtn) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".main-nav");

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}
