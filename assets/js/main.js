/* 交互：项目展开、索引跳转、入场动效、导航状态 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var projects = Array.prototype.slice.call(document.querySelectorAll('[data-project]'));

  function setOpen(item, open) {
    var btn = item.querySelector('.project-head');
    var body = item.querySelector('.project-body');
    if (!btn || !body) return;
    item.setAttribute('data-open', open ? 'true' : 'false');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    body.inert = !open;
  }

  projects.forEach(function (item) {
    var btn = item.querySelector('.project-head');
    var isOpen = item.getAttribute('data-open') === 'true';
    setOpen(item, isOpen);
    if (!btn) return;
    btn.addEventListener('click', function () {
      setOpen(item, item.getAttribute('data-open') !== 'true');
    });
  });

  /* 索引面板：直接打开对应项目 */
  document.querySelectorAll('[data-jump]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var target = document.getElementById(link.getAttribute('data-jump'));
      if (!target) return;
      event.preventDefault();
      setOpen(target, true);
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      try {
        history.replaceState(null, '', '#' + target.id);
      } catch (err) {
        /* file:// 下部分浏览器禁止改写历史，忽略即可 */
      }
    });
  });

  /* 通过 URL 锚点直接打开项目 */
  function openFromHash() {
    var id = window.location.hash.replace('#', '');
    if (!id) return;
    var target = document.getElementById(id);
    if (target && target.hasAttribute('data-project')) setOpen(target, true);
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  /* 入场动效 */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealItems.forEach(function (el) { revealObserver.observe(el); });
  }

  /* 导航高亮当前区块 */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var visible = new Set();
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });
      navLinks.forEach(function (a) {
        var id = a.getAttribute('href').replace('#', '');
        if (visible.has(id)) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
