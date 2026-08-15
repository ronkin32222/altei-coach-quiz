const TELEGRAM_URL = 'https://t.me/testaletheia_academy_bot';

document.querySelectorAll('[data-telegram]').forEach((link) => {
  link.href = TELEGRAM_URL;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

const header = document.querySelector('.site-header');
const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 16);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

document.querySelectorAll('.level-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const card = trigger.closest('.level-card');
    const wasOpen = card.classList.contains('is-open');
    document.querySelectorAll('.level-card').forEach((item) => {
      item.classList.remove('is-open');
      item.querySelector('.level-trigger').setAttribute('aria-expanded', 'false');
      item.querySelector('.plus').textContent = '+';
    });
    if (!wasOpen) {
      card.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.querySelector('.plus').textContent = '−';
    }
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
} else {
  document.querySelectorAll('.reveal').forEach((item) => item.classList.add('on'));
}
