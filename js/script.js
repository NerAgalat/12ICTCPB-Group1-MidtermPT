const hamburgerButton = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
const sections = document.querySelectorAll('main section[id]');
const checklistCheckboxes = document.querySelectorAll('.check-item input[type="checkbox"]');
const printButton = document.getElementById('print-btn');
const navbar = document.querySelector('.navbar');
const scrollTopButton = document.getElementById('scroll-top');

if (hamburgerButton && mobileMenu) {
  hamburgerButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
    hamburgerButton.setAttribute('aria-expanded', String(!isExpanded));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
    }
    if (hamburgerButton) {
      hamburgerButton.setAttribute('aria-expanded', 'false');
    }
  });
});

function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 130;
  let currentSectionId = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');

    const href = link.getAttribute('href');
    if (href === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

function updateScrollUiState() {
  if (navbar) {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  if (scrollTopButton) {
    if (window.scrollY > 300) {
      scrollTopButton.classList.add('show');
    } else {
      scrollTopButton.classList.remove('show');
    }
  }
}

window.addEventListener('scroll', updateScrollUiState);
window.addEventListener('load', updateScrollUiState);

checklistCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (event) => {
    const input = event.target;
    const label = document.querySelector(`label[for="${input.id}"]`);

    if (label) {
      label.classList.toggle('checked', input.checked);
    }
  });
});

if (printButton) {
  printButton.addEventListener('click', () => {
    window.print();
  });
}

if (scrollTopButton) {
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

const revealSections = document.querySelectorAll('.content-section');

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealSections.forEach((section) => {
    section.classList.add('reveal-ready');
    sectionObserver.observe(section);
  });
}
