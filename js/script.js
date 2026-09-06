const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Content stays visible if JavaScript or IntersectionObserver is unavailable.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  document.querySelectorAll('.reveal').forEach(item => {
    if (item.getBoundingClientRect().top >= window.innerHeight) {
      observer.observe(item);
      item.classList.add('reveal-pending');
    }
  });
}

// Accessible registration dialog with keyboard focus restoration.
const openModalBtn = document.querySelector('.open-modal');
const registerModal = document.getElementById('registerModal');
const closeModalBtn = document.querySelector('.close-modal');
if (openModalBtn && registerModal && closeModalBtn) {
  let previousOverflow;
  const closeModal = () => {
    registerModal.classList.remove('active');
    registerModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = previousOverflow;
    openModalBtn.focus();
  };
  openModalBtn.addEventListener('click', event => {
    event.preventDefault();
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    registerModal.classList.add('active');
    registerModal.setAttribute('aria-hidden', 'false');
    closeModalBtn.focus();
  });
  closeModalBtn.addEventListener('click', closeModal);
  registerModal.addEventListener('click', event => {
    if (event.target === registerModal) closeModal();
  });
  registerModal.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); closeModal(); }
    if (event.key === 'Tab') {
      const items = [...registerModal.querySelectorAll('a[href], button')];
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
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
    if (!statsSection || counted || reducedMotion.matches) return;

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
      dot.setAttribute('role', 'button');
      dot.tabIndex = 0;
      dot.setAttribute('aria-label', (index + 1) + '-ci şəkli göstər');
      dot.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); dot.click(); }
      });
      dot.addEventListener("click", function () {
        currentIndex = index;
        showSlide(currentIndex);
      });
    });

    showSlide(currentIndex);
    if (!reducedMotion.matches) {
      setInterval(() => {
        if (!reducedMotion.matches && !slider.matches(':hover') && !slider.contains(document.activeElement)) nextSlide();
      }, 5000);
    }
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
      behavior: reducedMotion.matches ? "instant" : "smooth"
    });
  });
});
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.main-nav');
if (hamburger && nav) {
  const mobile = window.matchMedia('(max-width: 768px)');
  const setOpen = open => {
    nav.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Menyunu bağla' : 'Menyunu aç');
    nav.inert = mobile.matches && !open;
  };
  hamburger.addEventListener('click', () => setOpen(hamburger.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('active')) { setOpen(false); hamburger.focus(); }
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target) && !hamburger.contains(event.target)) setOpen(false);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('focusin', event => {
    if (!nav.contains(event.target) && !hamburger.contains(event.target)) setOpen(false);
  });
  mobile.addEventListener('change', () => setOpen(false));
  document.documentElement.classList.add('nav-ready');
  setOpen(false);
}

const heroVideo = document.querySelector('.hero-bg-video');
const videoToggle = document.querySelector('.video-toggle');
if (heroVideo && videoToggle) {
  const syncVideo = () => {
    const label = heroVideo.paused ? 'Videonu oynat' : 'Videonu dayandır';
    videoToggle.textContent = label;
    videoToggle.setAttribute('aria-label', label);
  };
  heroVideo.addEventListener('play', syncVideo);
  heroVideo.addEventListener('pause', syncVideo);
  videoToggle.addEventListener('click', () => {
    if (heroVideo.paused) heroVideo.play().catch(syncVideo);
    else heroVideo.pause();
  });
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) heroVideo.pause(); });
  // Mobile and data-saving visitors receive the lightweight poster first.
  if (!reducedMotion.matches && !navigator.connection?.saveData && window.matchMedia('(min-width: 769px)').matches) {
    heroVideo.play().catch(syncVideo);
  }
}
