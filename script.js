// Laiba Shahid – Resume website
// Small, dependency-free interactions: tabs, scroll reveal, active nav link.

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Footer year ----------
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Tabs (skills + projects) ----------
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const tabs = Array.from(group.querySelectorAll('[role="tab"]'));
    const panels = Array.from(group.querySelectorAll('[role="tabpanel"]'));

    const activate = (tab, focus = false) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach((p) => {
        p.hidden = p.id !== tab.getAttribute('aria-controls');
      });
      if (focus) tab.focus();
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activate(tab));

      // Arrow keys move between tabs
      tab.addEventListener('keydown', (e) => {
        const next = ['ArrowRight', 'ArrowDown'];
        const prev = ['ArrowLeft', 'ArrowUp'];
        if (next.includes(e.key)) {
          e.preventDefault();
          activate(tabs[(i + 1) % tabs.length], true);
        } else if (prev.includes(e.key)) {
          e.preventDefault();
          activate(tabs[(i - 1 + tabs.length) % tabs.length], true);
        } else if (e.key === 'Home') {
          e.preventDefault();
          activate(tabs[0], true);
        } else if (e.key === 'End') {
          e.preventDefault();
          activate(tabs[tabs.length - 1], true);
        }
      });
    });
  });

  // ---------- Scroll reveal ----------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // ---------- Highlight the nav link of the section in view ----------
  const links = Array.from(document.querySelectorAll('.nav__links a'));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((a) =>
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id)
          );
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => navObserver.observe(s));
  }
});
