// Premium portfolio JS: theme toggle, progress bar, smooth scroll, image preview, animations, mobile nav
document.addEventListener('DOMContentLoaded', () => {
  // year
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // theme (persist)
  const themeToggle = document.getElementById('themeToggle');
  const current = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : '');
  if (current === 'light') document.documentElement.classList.add('light');
  themeToggle && themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    const isLight = document.documentElement.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
  });

  // progress bar
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    progressBar.style.width = Math.min(1, scrolled) * 100 + '%';
  });

  // unit buttons scroll
  document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-target');
      const target = document.getElementById(id);
      target && target.scrollIntoView({behavior:'smooth', block:'start'});
      // give focus for accessibility
      target && target.setAttribute('tabindex','-1') && target.focus();
    });
  });

  // image preview
  const photoInput = document.getElementById('photoInput');
  const profilePhoto = document.getElementById('profilePhoto');
  if(photoInput && profilePhoto){
    photoInput.addEventListener('change', e => {
      const file = e.target.files && e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = ev => profilePhoto.src = ev.target.result;
      reader.readAsDataURL(file);
    });
  }

  // simple contact form -> mailto
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const form = new FormData(contactForm);
      const name = form.get('name');
      const email = form.get('email');
      const message = form.get('message');
      const subject = encodeURIComponent('Portfolio Contact from ' + name);
      const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
      window.location.href = 'mailto:your.email@example.com?subject=' + subject + '&body=' + body;
    });
  }

  // reveal on scroll (IntersectionObserver)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.sections, .project, .unit, .hero-photo, .hero-content').forEach(el => observer.observe(el));

  // mobile nav toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if(hamburger && navLinks){
    hamburger.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  }
});
