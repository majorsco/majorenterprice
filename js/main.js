const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Contact form (Formspree)
const form = document.querySelector('#contact-form');
if (form) {
  const status = document.querySelector('#form-status');
  const button = form.querySelector('button[type="submit"]');
  const setStatus = (msg, type) => { status.textContent = msg; status.className = 'form-status ' + type; };
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const endpoint = form.dataset.endpoint;
    if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
      setStatus('This form is not connected yet. Please email us directly.', 'error');
      return;
    }
    button.disabled = true;
    setStatus('Sending…', 'pending');
    try {
      const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) {
        form.reset();
        setStatus('Thank you! Your message has been sent. We will get back to you soon.', 'success');
      } else {
        setStatus('Something went wrong. Please try again in a moment.', 'error');
      }
    } catch (err) {
      setStatus('Network error. Please check your connection and try again.', 'error');
    }
    button.disabled = false;
  });
}
