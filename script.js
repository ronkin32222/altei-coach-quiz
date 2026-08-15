/* Прогрессивное усиление. Без JS страница полностью функциональна:
   уровни раскрываются нативными <details name="levels">. */

document.documentElement.classList.add('js');

const TELEGRAM_URL = 'https://t.me/testaletheia_academy_bot';

document.querySelectorAll('[data-telegram]').forEach((link) => {
  link.href = TELEGRAM_URL;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

/* ── Шапка ─────────────────────────────────────────────────────────────── */

const header = document.querySelector('.site-header');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

/* ── Разрез ↔ уровни ───────────────────────────────────────────────────
   Оболочка подсвечивает открытый уровень; клик по оболочке открывает его.
   Оболочки — указательный ярлык, не отдельный элемент управления: доступный
   контроль — это <summary>, поэтому дублирующих табстопов не появляется. */

const shells = document.querySelector('.shells');
const levels = [...document.querySelectorAll('.level')];

if (shells && levels.length) {
  const syncShells = () => {
    const open = levels.find((level) => level.open);
    if (open) shells.dataset.active = open.dataset.level;
    else shells.removeAttribute('data-active');
  };

  levels.forEach((level) => level.addEventListener('toggle', syncShells));
  syncShells();

  shells.querySelectorAll('.shell').forEach((shell) => {
    shell.addEventListener('click', () => {
      const target = levels.find((level) => level.dataset.level === shell.dataset.shell);
      if (!target || target.open) return;
      levels.forEach((level) => { level.open = false; });
      target.open = true;
    });
  });
}

/* ── Мобильная плита: убрать, когда виден финальный призыв ─────────────── */

const mobileCta = document.querySelector('.mobile-cta');
const finalSection = document.querySelector('#final');

if (mobileCta && finalSection && 'IntersectionObserver' in window) {
  new IntersectionObserver(
    ([entry]) => mobileCta.classList.toggle('is-hidden', entry.isIntersecting),
    { threshold: 0.2 }
  ).observe(finalSection);
}

/* ── Появление ─────────────────────────────────────────────────────────── */

const revealables = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = `${Math.min(index, 4) * 70}ms`;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.06, rootMargin: '0px 0px -6% 0px' }
  );
  revealables.forEach((item) => observer.observe(item));
} else {
  revealables.forEach((item) => item.classList.add('is-in'));
}
