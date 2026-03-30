// ========================================
// HDFC BANK REPLICA - main.js
// ========================================

// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
  } else {
    navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
  }
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// ---- HERO SLIDER ----
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0;
let autoSlide;

function goToSlide(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

document.getElementById('nextSlide').addEventListener('click', () => {
  goToSlide(current + 1);
  resetAuto();
});

document.getElementById('prevSlide').addEventListener('click', () => {
  goToSlide(current - 1);
  resetAuto();
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goToSlide(i);
    resetAuto();
  });
});

function startAuto() {
  autoSlide = setInterval(() => goToSlide(current + 1), 5000);
}

function resetAuto() {
  clearInterval(autoSlide);
  startAuto();
}

startAuto();

// ---- PRODUCT TABS ----
const productData = {
  personal: [
    { icon: 'fa-university', title: 'Savings Account', desc: 'Zero balance accounts with high interest rates and digital features.' },
    { icon: 'fa-credit-card', title: 'Credit Cards', desc: 'Earn reward points, cashback and enjoy exclusive lifestyle benefits.' },
    { icon: 'fa-home', title: 'Home Loans', desc: 'Fulfil your dream of owning a home at attractive interest rates.' },
    { icon: 'fa-car', title: 'Car Loans', desc: 'Drive your dream car with quick approvals and competitive rates.' },
    { icon: 'fa-chart-pie', title: 'Mutual Funds', desc: 'Build wealth with SIP investments starting from just ₹500/month.' },
    { icon: 'fa-shield-alt', title: 'Life Insurance', desc: 'Secure your family\'s future with comprehensive life cover plans.' },
    { icon: 'fa-piggy-bank', title: 'Fixed Deposits', desc: 'Guaranteed returns up to 7.25% p.a. with flexible tenure options.' },
    { icon: 'fa-mobile-alt', title: 'PayZapp', desc: 'India\'s fastest UPI app for instant money transfers and bill payments.' },
  ],
  nri: [
    { icon: 'fa-globe', title: 'NRE Account', desc: 'Repatriable savings account with tax-free interest for NRIs.' },
    { icon: 'fa-dollar-sign', title: 'Forex Services', desc: 'Best exchange rates for foreign currency transfers and remittance.' },
    { icon: 'fa-home', title: 'NRI Home Loans', desc: 'Finance your property in India with easy international transfers.' },
    { icon: 'fa-chart-line', title: 'NRI Investments', desc: 'Invest in Indian mutual funds, stocks and bonds seamlessly.' },
  ],
  business: [
    { icon: 'fa-briefcase', title: 'Current Account', desc: 'Feature-rich current accounts for growing businesses.' },
    { icon: 'fa-handshake', title: 'Business Loans', desc: 'Collateral-free working capital loans up to ₹50 lakhs.' },
    { icon: 'fa-cash-register', title: 'POS Solutions', desc: 'Accept payments via card, UPI and QR with smart POS devices.' },
    { icon: 'fa-file-invoice', title: 'Trade Finance', desc: 'Letters of credit, bank guarantees and export finance solutions.' },
  ]
};

function renderProducts(tab) {
  const grid = document.getElementById('productGrid');
  const data = productData[tab] || [];
  grid.innerHTML = data.map(item => `
    <div class="product-card">
      <div class="pc-icon"><i class="fa ${item.icon}"></i></div>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      <span class="pc-link">Explore <i class="fa fa-arrow-right"></i></span>
    </div>
  `).join('');
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderProducts(tab.dataset.tab);
  });
});

renderProducts('personal');

// ---- LOGIN MODAL ----
const overlay = document.getElementById('modalOverlay');
const openBtn = document.getElementById('openLogin');
const closeBtn = document.getElementById('closeModal');

openBtn.addEventListener('click', () => overlay.classList.add('active'));
closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.remove('active');
});

// Login tabs
document.querySelectorAll('.ltab').forEach(ltab => {
  ltab.addEventListener('click', () => {
    document.querySelectorAll('.ltab').forEach(t => t.classList.remove('active'));
    ltab.classList.add('active');
  });
});

// Password toggle
const togglePass = document.getElementById('togglePass');
const passwordInput = document.getElementById('passwordInput');
togglePass.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  togglePass.innerHTML = `<i class="fa fa-eye${type === 'password' ? '' : '-slash'}"></i>`;
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-login-submit');
  btn.textContent = 'Authenticating...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✓ Login Successful!';
    btn.style.background = '#2e7d32';
    setTimeout(() => {
      overlay.classList.remove('active');
      btn.innerHTML = 'Login Securely <i class="fa fa-arrow-right"></i>';
      btn.disabled = false;
      btn.style.background = '';
    }, 1500);
  }, 1500);
});

// ---- STATS COUNTER ANIMATION ----
const statNums = document.querySelectorAll('.stat-num');
let counted = false;

function animateCounters() {
  if (counted) return;
  statNums.forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString('en-IN') + '+';
    }
    requestAnimationFrame(update);
  });
  counted = true;
}

const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) animateCounters();
}, { threshold: 0.3 });
observer.observe(statsSection);

// ---- SCROLL REVEAL ----
const revealElements = document.querySelectorAll('.product-card, .offer-card, .quick-link');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// ---- KEYBOARD ESC CLOSE MODAL ----
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') overlay.classList.remove('active');
});
