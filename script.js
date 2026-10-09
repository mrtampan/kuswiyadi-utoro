/**
 * Kuswiyadi Utoro - Electrical Engineer Portfolio
 * Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav-open');
    });

    // Close menu when clicking any nav item
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
      });
    });
  }

  // 3. Print / Save CV Trigger
  const btnPrint = document.getElementById('btn-print');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  // 4. Quick WhatsApp Form Handler
  const waForm = document.getElementById('wa-form');
  if (waForm) {
    waForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sender = document.getElementById('wa-sender').value.trim();
      const msg = document.getElementById('wa-msg').value.trim();

      const fullMessage = `Halo Pak Kuswiyadi Utoro,\nSaya ${sender}.\n\n${msg}`;
      const encodedMsg = encodeURIComponent(fullMessage);
      const waUrl = `https://wa.me/6281290716415?text=${encodedMsg}`;

      window.open(waUrl, '_blank');
    });
  }

  // 5. Scrollspy for active nav link
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });
});

/**
 * Global Copy text helper with Toast notification
 * @param {string} text 
 * @param {string} customMsg 
 */
function copyText(text, customMsg = 'Tersalin ke clipboard!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(customMsg);
    }).catch(() => {
      fallbackCopy(text, customMsg);
    });
  } else {
    fallbackCopy(text, customMsg);
  }
}

function fallbackCopy(text, customMsg) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(customMsg);
  } catch (err) {
    showToast('Gagal menyalin teks.');
  }
  document.body.removeChild(textArea);
}

let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.remove('hidden');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 2800);
}
