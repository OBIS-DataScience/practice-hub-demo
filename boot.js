/**
 * Starts the browser-only demo (the GitHub Pages version).
 *
 * 1. Shows the demo password screen. The password itself is never stored in the
 *    site: site-config.js holds only a one-way fingerprint of it (PBKDF2-SHA256),
 *    and the typed password is checked against that. On a public website this
 *    keeps casual visitors out; it is not strong security, which is acceptable
 *    because the demo holds made-up data only.
 * 2. Starts the service worker (sw.js), which runs the app's server code inside
 *    this browser.
 * 3. Loads the app's screens (app.js, then portal.js).
 */
(function () {
  const CONFIG = window.HUB_SITE || {};
  const GATE_KEY = 'hub-gate';
  const GATE_DAYS = 7;
  const root = document.getElementById('app');

  // Leonardo's palette, matching the password page on the laptop and Vercel versions.
  const NAVY = '#133269';
  const TEAL = '#267D9E';

  const el = (tag, attrs, ...kids) => {
    const n = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => { if (k === 'style') Object.assign(n.style, v); else n.setAttribute(k, v); });
    kids.flat().forEach((k) => n.append(k));
    return n;
  };
  const hex = (bytes) => [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  const unhex = (s) => new Uint8Array((s.match(/../g) || []).map((h) => parseInt(h, 16)));

  /** The fingerprint of a typed password, made the same way scripts/set-demo-password.js made the stored one. */
  async function fingerprint(password) {
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: unhex(CONFIG.salt), iterations: CONFIG.iterations }, key, 256);
    return hex(new Uint8Array(bits));
  }

  function alreadyIn() {
    try {
      const pass = JSON.parse(localStorage.getItem(GATE_KEY) || 'null');
      // Tied to the current fingerprint, so changing the password signs everyone out.
      return !!pass && pass.hash === CONFIG.hash && pass.exp > Date.now();
    } catch { return false; }
  }

  function card(...content) {
    document.body.style.cssText = 'margin:0;background:#F5F5F5;font-family:Montserrat,"Segoe UI",Arial,sans-serif;color:#333333';
    root.replaceChildren(el('div', { style: { minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '16px', boxSizing: 'border-box' } },
      el('main', { style: { width: '100%', maxWidth: '420px', background: '#FFFFFF', borderRadius: '10px', boxShadow: '0 2px 12px rgba(19,50,105,.12)', overflow: 'hidden' } },
        el('div', { style: { background: `linear-gradient(to right, ${NAVY} 2%, ${TEAL} 46%, #319BC3 81%)`, padding: '22px 24px', color: '#FFFFFF' } },
          el('img', { src: 'leonardo_logo.png', alt: 'Leonardo & Company', style: { height: '38px', display: 'block', marginBottom: '12px' } }),
          el('b', { style: { fontSize: '18px' } }, 'Practice Hub: proof of concept')),
        el('div', { style: { padding: '22px 24px' } }, ...content))));
  }

  const note = (text) => el('p', { style: { fontSize: '12px', color: '#555555', marginTop: '14px', lineHeight: '1.5' } }, text);

  function showMessage(text, isError) {
    card(el('p', { role: isError ? 'alert' : 'status', style: { margin: 0, lineHeight: '1.5', color: isError ? '#333333' : NAVY } }, text));
  }

  /** Show the password form; resolves once the right password is entered. */
  function askForPassword() {
    return new Promise((resolve) => {
      const input = el('input', { id: 'pw', type: 'password', autocomplete: 'current-password', required: '',
        style: { width: '100%', padding: '10px 12px', border: '1px solid #CCCCCC', borderRadius: '6px', font: 'inherit', boxSizing: 'border-box' } });
      const message = el('div', { role: 'alert', style: { display: 'none', background: '#EAF4F8', borderLeft: `4px solid ${NAVY}`, padding: '8px 12px', fontSize: '13px', marginBottom: '14px', color: NAVY } });
      const button = el('button', { type: 'submit', style: { marginTop: '14px', width: '100%', padding: '11px', border: '0', borderRadius: '6px', background: NAVY, color: '#FFFFFF', font: 'inherit', fontWeight: '700', cursor: 'pointer' } }, 'Enter the demo');
      const form = el('form', {},
        el('label', { for: 'pw', style: { display: 'block', fontWeight: '700', color: NAVY, fontSize: '13px', marginBottom: '6px' } }, 'Demo password'),
        input, button);
      form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        button.disabled = true;
        button.textContent = 'Checking…';
        const ok = (await fingerprint(input.value)) === CONFIG.hash;
        if (ok) {
          try { localStorage.setItem(GATE_KEY, JSON.stringify({ hash: CONFIG.hash, exp: Date.now() + GATE_DAYS * 86400e3 })); } catch { /* private window: ask again next time */ }
          resolve();
          return;
        }
        // A short pause after each wrong guess slows down guessing by hand.
        await new Promise((r) => setTimeout(r, 1200));
        message.textContent = 'That password is not right. Please try again.';
        message.style.display = 'block';
        button.disabled = false;
        button.textContent = 'Enter the demo';
        input.select();
      });
      card(message, form, note('This demo contains made-up data only. Please don\'t upload real client documents.'));
      input.focus();
    });
  }

  /** Register the service worker and wait until it controls this page. */
  async function startWorker() {
    if (!('serviceWorker' in navigator)) {
      throw new Error('This browser can\'t run the demo. Please use a current version of Edge, Chrome, Safari or Firefox, in a normal (not private) window.');
    }
    const registration = await navigator.serviceWorker.register('sw.js', { scope: './' });
    if (!navigator.serviceWorker.controller) {
      await new Promise((resolve) => {
        navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true });
        setTimeout(resolve, 4000);
      });
    }
    if (!navigator.serviceWorker.controller) {
      // A hard refresh (Ctrl+Shift+R) skips the service worker. Reload normally, once.
      if (!sessionStorage.getItem('hub-reloaded')) {
        sessionStorage.setItem('hub-reloaded', '1');
        location.reload();
        return new Promise(() => {});
      }
      throw new Error('The demo could not start in this window. Please close the tab and open the link again.');
    }
    sessionStorage.removeItem('hub-reloaded');
    if (registration.active) registration.active.postMessage('warm-up');
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = el('script', { src });
      s.async = false;
      s.onload = resolve;
      s.onerror = () => reject(new Error(`Could not load ${src}. Check your internet connection and refresh.`));
      document.body.append(s);
    });
  }

  async function main() {
    if (!CONFIG.hash || !CONFIG.salt || !CONFIG.iterations) {
      showMessage('This demo has no password set yet. Run scripts/set-demo-password.js and publish again.', true);
      return;
    }
    if (!alreadyIn()) await askForPassword();
    showMessage('Starting the demo…');
    await startWorker();
    showMessage('Setting up your private copy of the demo data. The first visit takes a few seconds…');
    // This first request makes the worker build the demo data, if this browser doesn't have it yet.
    const check = await fetch('api/client-config');
    if (!check.ok) throw new Error((await check.json().catch(() => ({}))).error || `The demo could not start (${check.status}).`);
    document.body.style.cssText = '';
    root.replaceChildren(el('p', { class: 'boot' }, 'Loading the Practice Hub…'));
    await loadScript('app.js');
    await loadScript('portal.js');
  }

  main().catch((err) => showMessage(err.message, true));
})();
