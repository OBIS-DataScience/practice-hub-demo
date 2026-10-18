'use strict';
/**
 * Leonardo Practice Hub: the browser side of the proof of concept.
 *
 * This is a "single-page app": the page loads once, and each screen is drawn
 * by JavaScript when the part of the address after # changes (for example
 * #/today or #/job/12). Data comes from the server's /api/... endpoints.
 *
 * Safety note: text from the server is always placed on the page as plain
 * text (through the h() helper), never as raw HTML. A client named
 * "<script>" would show up as those characters instead of running as code.
 */
(function () {
  // expanded: request items opened on the job page, kept open when the page redraws
  const state = { user: null, meta: null, timer: null, lastHash: null, expanded: new Set() };
  const app = document.getElementById('app');
  const ADMIN_ROLES = ['partner', 'admin'];
  const isAdmin = () => state.user && ADMIN_ROLES.includes(state.user.role);

  // ---------- tiny DOM helper ----------
  /**
   * Create an element. h('a', { href: '#/x', class: 'btn' }, 'Text', child)
   * Props starting with "on" become event listeners; "text" sets textContent.
   */
  function h(tag, props, ...kids) {
    const el = document.createElement(tag);
    let value;
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        if (v === null || v === undefined || v === false) continue;
        if (k === 'class') el.className = v;
        else if (k === 'text') el.textContent = v;
        else if (k === 'value') value = v;
        else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
        else if (k === 'style') Object.assign(el.style, v);
        else if (typeof v === 'boolean') el[k] = v;
        else el.setAttribute(k, v);
      }
    }
    for (const kid of kids.flat(Infinity)) {
      if (kid === null || kid === undefined || kid === false) continue;
      el.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
    }
    // Set value last, so a <select> already has its options.
    if (value !== undefined) el.value = value;
    return el;
  }

  // ---------- talking to the server ----------
  async function api(method, url, body) {
    const opts = { method, headers: {} };
    if (method !== 'GET') { opts.headers['Content-Type'] = 'application/json'; opts.body = JSON.stringify(body || {}); }
    const r = await fetch(url, opts);
    const isJson = (r.headers.get('content-type') || '').includes('json');
    const data = isJson ? await r.json() : null;
    // The hosted demo's password has expired: reload so the password page shows.
    if (r.status === 401 && data && data.gate) { location.href = './'; }
    if (r.status === 401 && !url.endsWith('api/me')) { state.user = null; go('#/login'); }
    if (!r.ok) { const err = new Error((data && data.error) || `Request failed (${r.status})`); err.status = r.status; throw err; }
    return data;
  }

  /** Run a server action, show a message, and redraw the screen. */
  async function act(fn, okMessage) {
    try {
      const out = await fn();
      if (okMessage) toast(typeof okMessage === 'function' ? okMessage(out) : okMessage);
      await refresh();
      return out;
    } catch (e) {
      // Show the error once, then pass it on (marked as shown) so a dialog
      // can stay open for the person to fix their input.
      toast(e.message, true);
      e.shown = true;
      throw e;
    }
  }

  // ---------- formatting ----------
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const fmtDate = (s) => { if (!s) return '–'; const [y, m, d] = s.slice(0, 10).split('-'); return `${MON[+m - 1]} ${+d}, ${y}`; };
  const fmtStamp = (s) => {
    if (!s) return '–';
    const t = s.slice(11, 16); if (!t) return fmtDate(s);
    let [hh, mm] = t.split(':').map(Number); const ap = hh >= 12 ? 'pm' : 'am'; hh = hh % 12 || 12;
    return `${fmtDate(s)}, ${hh}:${String(mm).padStart(2, '0')} ${ap}`;
  };
  const money = (n) => (n === null || n === undefined ? '–' : '$' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 }));
  const money2 = (n) => (n === null || n === undefined ? '–' : '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  const first = (name) => (name || '').split(' ')[0];
  const todayStr = () => (state.meta ? state.meta.today : new Date().toLocaleDateString('en-CA'));
  const daysSince = (s) => (s ? Math.round((new Date(todayStr() + 'T12:00:00') - new Date(s.slice(0, 10) + 'T12:00:00')) / 86400000) : null);
  const fyeLabel = (fye, fy) => { const [m, d] = fye.split('-').map(Number); return `${MONTH[m - 1]} ${d}, ${fy}`; };
  const shortItem = (t) => t.split(' (')[0].split(':')[0];
  const staffName = (id) => (state.meta.staff.find((s) => s.id === id) || {}).name || '–';
  const stageChip = (s) => h('span', { class: `chip stage-${s}` }, s);
  const statusChip = (s) => h('span', { class: `chip st-${s === 'N/A' ? 'NA' : s}` }, s === 'Sent' ? 'Requested' : s);
  const fmtSec = (s) => {
    if (!s) return '–';
    const t = s.slice(11, 19); if (!t) return fmtDate(s);
    let [hh, mm, ss] = t.split(':').map(Number); const ap = hh >= 12 ? 'pm' : 'am'; hh = hh % 12 || 12;
    return `${fmtDate(s)}, ${hh}:${String(mm).padStart(2, '0')}:${String(ss || 0).padStart(2, '0')} ${ap}`;
  };

  // =====================================================================
  // Documents and conversations (used by both the staff app and the client portal)
  // =====================================================================
  const fileSize = (n) => (n >= 1048576 ? `${(n / 1048576).toFixed(1)} MB` : n >= 1024 ? `${(n / 1024).toFixed(1)} KB` : `${n} bytes`);
  const CHANNEL = { portal: 'client portal', email: 'email', staff: 'Leonardo staff' };
  const DOC_STATUS = { Pending: ['Under review', 'st-Sent'], Accepted: ['Accepted', 'st-Accepted'], Returned: ['Returned', 'st-Returned'], Shared: ['Shared by Leonardo', 'stage-Admin'] };
  const fileUrl = (d, download) => `api/documents/${d.id}/file${download ? '?download=1' : ''}`;
  const ICON = { PDF: 'PDF', Excel: 'XLS', Word: 'DOC', CSV: 'CSV', Text: 'TXT', Image: 'IMG' };

  /**
   * The full metadata for one document: who sent it, when, how, and its fingerprint.
   * opts.staff shows staff-only details such as the uploader's IP address.
   */
  function docMeta(d, opts = {}) {
    const st = DOC_STATUS[d.status] || [d.status];
    const rows = [
      ['File name', d.original_name],
      ['Type', `${d.type_label}${d.pdf_pages ? `, ${d.pdf_pages} page${d.pdf_pages === 1 ? '' : 's'}` : ''} (${d.mime})`],
      ['Size', `${fileSize(d.size)} (${d.size.toLocaleString('en-US')} bytes)`],
      [d.direction === 'to_client' ? 'Shared' : 'Uploaded', fmtSec(d.uploaded_at)],
      [d.direction === 'to_client' ? 'Shared by' : 'Uploaded by', d.uploaded_by],
      ['Received through', CHANNEL[d.channel] || d.channel],
      ['Request item', d.item_text ? shortItem(d.item_text) : 'Not tied to a specific item'],
      ['Version', d.version > 1 ? `Version ${d.version} (replaces earlier uploads for this item)` : 'Version 1'],
      ['Last modified on the sender\'s computer', d.client_modified ? fmtSec(d.client_modified) : 'Not reported'],
      ['Status', `${st[0]}${d.reviewed_by_name ? ` by ${d.reviewed_by_name} on ${fmtStamp(d.reviewed_at)}` : ''}`],
      d.review_note ? ['Leonardo\'s note', d.review_note] : null,
      opts.staff && d.ip ? ['Uploaded from IP address', d.ip] : null,
      ['Fingerprint (SHA-256)', h('code', { class: 'hash' }, d.sha256)],
      d.simulated ? ['Note', 'Placeholder content created by the demo for a simulated email attachment.'] : null,
    ].filter(Boolean);
    return h('dl', { class: 'mail-meta doc-meta' }, rows.map(([k, v]) => [h('dt', {}, k), h('dd', {}, v)]));
  }

  /** Show a document in a large window: PDFs and images inline, CSV as a table, others as metadata plus download. */
  function previewDocument(d, opts = {}) {
    let view;
    if (d.preview === 'pdf') view = h('iframe', { class: 'doc-frame', src: `${fileUrl(d)}#view=FitH`, title: d.original_name });
    else if (d.preview === 'image') view = h('img', { class: 'doc-img', src: fileUrl(d), alt: d.original_name });
    else if (d.preview === 'text') {
      view = h('div', { class: 'doc-text' }, 'Loading…');
      fetch(fileUrl(d)).then((r) => r.text()).then((t) => {
        if (!/csv/.test(d.mime)) { view.replaceChildren(h('pre', {}, t.slice(0, 20000))); return; }
        const rows = t.trim().split(/\r?\n/).slice(0, 80).map((line) => (line.match(/("([^"]|"")*"|[^,]*)(,|$)/g) || []).map((c) => c.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"')).filter((c, i, a) => i < a.length - 1 || c));
        view.replaceChildren(h('div', { class: 'table-wrap' }, h('table', { class: 'csv' }, h('thead', {}, h('tr', {}, rows[0].map((c) => h('th', {}, c)))),
          h('tbody', {}, rows.slice(1).map((r) => h('tr', {}, r.map((c) => h('td', {}, c))))))));
      });
    } else view = h('div', { class: 'empty' }, 'This type of file can\'t be shown in the browser. Download it to open it in Excel or Word.');
    modal(d.original_name, [
      h('div', { class: 'doc-preview' }, h('div', { class: 'doc-view' }, view), h('div', { class: 'doc-side' }, h('h3', {}, 'File details'), docMeta(d, opts),
        h('a', { class: 'btn primary', href: fileUrl(d, true), style: { marginTop: '10px', display: 'inline-block' } }, 'Download'))),
    ], [], { wide: true });
  }

  /** One document as a compact row with its key metadata and actions. */
  function docCard(d, opts = {}) {
    const st = DOC_STATUS[d.status] || [d.status, 'st-Sent'];
    const details = h('div', { class: 'doc-details hidden' }, docMeta(d, opts));
    return h('div', { class: 'doc' },
      h('div', { class: `doc-icon ic-${d.type_label}` }, ICON[d.type_label] || 'FILE'),
      h('div', { class: 'grow' },
        h('div', { class: 'doc-name' }, h('a', { href: '#', onclick: (ev) => { ev.preventDefault(); previewDocument(d, opts); } }, d.original_name), ' ', h('span', { class: `chip ${st[1]}` }, st[0])),
        h('div', { class: 'small muted' },
          `${fileSize(d.size)}${d.pdf_pages ? ` · ${d.pdf_pages} page${d.pdf_pages === 1 ? '' : 's'}` : ''} · ${d.direction === 'to_client' ? 'shared' : 'uploaded'} ${fmtSec(d.uploaded_at)} by ${d.uploaded_by} via ${CHANNEL[d.channel] || d.channel}${d.version > 1 ? ` · version ${d.version}` : ''}`),
        opts.showItem && d.item_text ? h('div', { class: 'small' }, `For: ${shortItem(d.item_text)}`) : null,
        d.review_note ? h('div', { class: 'small' }, h('b', {}, 'Leonardo\'s note: '), d.review_note) : null,
        h('div', { class: 'doc-actions' },
          h('button', { class: 'btn small', onclick: () => previewDocument(d, opts) }, d.preview ? 'Preview' : 'Details'),
          h('a', { class: 'btn small', href: fileUrl(d, true) }, 'Download'),
          h('button', { class: 'btn small', onclick: () => details.classList.toggle('hidden') }, 'Metadata')),
        details));
  }

  function docList(docs, opts = {}) {
    if (!docs.length) return h('div', { class: 'empty small' }, opts.empty || 'No files yet.');
    return h('div', { class: 'doc-list' }, docs.map((d) => docCard(d, opts)));
  }

  const KIND = { answer: 'Answer', not_applicable: 'Says this doesn\'t apply', eta: 'Expected date', internal: 'Internal note: Leonardo staff only' };
  /** A conversation: client comments, Leonardo replies and (staff only) internal notes, oldest first. */
  function thread(comments, opts = {}) {
    if (!comments.length) return h('div', { class: 'empty small' }, opts.empty || 'No messages yet.');
    return h('div', { class: 'thread' }, comments.map((c) => h('div', { class: `msg ${c.kind === 'internal' ? 'internal' : c.from_client ? 'client' : 'firm'}` },
      h('div', { class: 'msg-head' },
        h('b', {}, c.author || 'Unknown'), h('span', { class: 'small muted' }, c.from_client ? ` · ${c.author_role || 'Client'}` : ' · Leonardo & Company'),
        KIND[c.kind] ? h('span', { class: `chip ${c.kind === 'internal' ? 'st-Returned' : 'st-Sent'}` }, c.kind === 'eta' && c.eta_date ? `Will send by ${fmtDate(c.eta_date)}` : KIND[c.kind]) : null,
        h('span', { class: 'small muted when' }, fmtStamp(c.created_at))),
      h('div', { class: 'msg-body' }, c.body))));
  }

  /** A box to write a message. opts.internalOption adds the staff-only "internal note" tick box. */
  function composer(placeholder, onSend, opts = {}) {
    const box = h('textarea', { rows: '2', placeholder, maxlength: '4000' });
    const internal = h('input', { type: 'checkbox' });
    const send = h('button', { class: 'btn primary small', type: 'submit' }, 'Send');
    return h('form', { class: 'composer', onsubmit: async (ev) => {
      ev.preventDefault();
      if (!box.value.trim()) return toast('Write a message first.', true);
      send.disabled = true;
      try { await onSend(box.value, internal.checked); } catch (e) { if (!e.shown) toast(e.message, true); } finally { send.disabled = false; }
    } }, box, h('div', { class: 'composer-foot' },
      opts.internalOption ? h('label', { class: 'check small' }, internal, 'Internal note (the client never sees it)') : h('span', { class: 'small muted' }, opts.hint || ''),
      send));
  }

  const ACCEPT = '.pdf,.xlsx,.xls,.docx,.doc,.csv,.txt,.jpg,.jpeg,.png';
  // The largest upload the server accepts (smaller on Vercel, which caps each request at 4.5 MB).
  const maxMB = () => (state.config && state.config.maxUploadMB) || 25;
  /** A drag-and-drop area that also opens the file chooser when clicked. */
  function dropZone(label, onFiles, opts = {}) {
    const input = h('input', { type: 'file', multiple: true, accept: ACCEPT, class: 'hidden' });
    const status = h('div', { class: 'small drop-status' }, opts.hint || `PDF, Excel, Word, CSV, text, JPG or PNG, up to ${maxMB()} MB each`);
    const zone = h('div', { class: `drop${opts.compact ? ' compact' : ''}`, tabindex: '0', role: 'button', 'aria-label': label },
      h('div', { class: 'drop-label' }, h('b', {}, label), ' or ', h('u', {}, 'choose files')), status, input);
    const run = async (files) => {
      if (!files || !files.length) return;
      zone.classList.add('busy');
      try { await onFiles(files, (msg) => { status.textContent = msg; }); } finally { zone.classList.remove('busy'); input.value = ''; }
    };
    zone.addEventListener('click', (ev) => { if (ev.target !== input) input.click(); });
    zone.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); input.click(); } });
    input.addEventListener('change', () => run(input.files));
    zone.addEventListener('dragover', (ev) => { ev.preventDefault(); zone.classList.add('over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('over'));
    zone.addEventListener('drop', (ev) => { ev.preventDefault(); zone.classList.remove('over'); run(ev.dataTransfer.files); });
    return zone;
  }

  /**
   * Upload files one at a time as raw bytes. The browser also reports each
   * file's "last modified" time, which is saved as part of the metadata.
   * Returns { last, errors, uploaded } where last is the server's latest reply.
   */
  async function uploadFiles(url, files, headers = {}, onProgress) {
    const list = [...files]; const errors = []; let last = null;
    for (let i = 0; i < list.length; i++) {
      const f = list[i];
      if (onProgress) onProgress(`Uploading ${i + 1} of ${list.length}: ${f.name}`);
      if (f.size > maxMB() * 1024 * 1024) { errors.push(`"${f.name}" is larger than ${maxMB()} MB.`); continue; }
      try {
        const r = await fetch(url, { method: 'POST', body: f, headers: {
          'Content-Type': 'application/octet-stream', 'X-File-Name': encodeURIComponent(f.name),
          'X-File-Modified': new Date(f.lastModified || Date.now()).toISOString(), ...headers } });
        const data = await r.json().catch(() => ({}));
        if (r.ok) last = data; else errors.push(data.error || `"${f.name}" could not be uploaded.`);
      } catch {
        // The browser couldn't read the file or reach the server (for example, the file was moved).
        errors.push(`"${f.name}" could not be uploaded. Check the file still exists and that the Practice Hub is running.`);
      }
    }
    if (onProgress) onProgress(errors.length ? `${list.length - errors.length} of ${list.length} uploaded` : `${list.length} file${list.length === 1 ? '' : 's'} uploaded`);
    errors.forEach((e) => toast(e, true));
    return { last, errors, uploaded: list.length - errors.length };
  }

  // ---------- toast and modal ----------
  function toast(msg, isError) {
    const root = document.getElementById('toast');
    const t = h('div', { class: 't' + (isError ? ' err' : '') }, msg);
    root.append(t);
    setTimeout(() => t.remove(), isError ? 6000 : 3800);
  }

  /**
   * Open a dialog. actions: [{ label, kind: 'primary'|'accent', run: async () => {} }]
   * A run() that throws keeps the dialog open so the person can fix the input.
   */
  function modal(title, body, actions = [], opts = {}) {
    const root = document.getElementById('modal-root');
    const close = () => { back.remove(); document.removeEventListener('keydown', onKey); };
    const onKey = (ev) => { if (ev.key === 'Escape') close(); };
    const foot = h('div', { class: 'modal-foot' },
      h('button', { class: 'btn', onclick: close }, actions.length ? 'Cancel' : 'Close'),
      actions.map((a) => {
        const b = h('button', { class: `btn ${a.kind || 'primary'}` }, a.label);
        b.addEventListener('click', async () => {
          b.disabled = true;
          try { await a.run(); close(); } catch (e) { if (e && e.message && !e.shown) toast(e.message, true); } finally { b.disabled = false; }
        });
        return b;
      }));
    const back = h('div', { class: 'modal-back', onclick: (ev) => { if (ev.target === back) close(); } },
      h('div', { class: opts.wide ? 'modal wide' : 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': title },
        h('div', { class: 'modal-head' }, h('span', {}, title), h('button', { 'aria-label': 'Close', onclick: close }, '×')),
        h('div', { class: 'modal-body' }, body), foot));
    root.append(back);
    document.addEventListener('keydown', onKey);
    const focusable = back.querySelector('textarea, input, select');
    if (focusable) focusable.focus();
    return close;
  }

  /** Email preview with editable subject and body; nothing is sent until approved (AI-05). */
  function mailPreview(title, draft, sendLabel, onSend, note) {
    const subject = h('input', { type: 'text', value: draft.subject });
    const body = h('textarea', { class: 'mail' }, draft.body);
    const editable = !!onSend;
    if (!editable) { subject.readOnly = true; body.readOnly = true; }
    modal(title, [
      h('div', { class: 'callout sim' }, note || h('span', {}, h('b', {}, 'Simulated. '), `In the real build this sends from ${draft.from} in Outlook. Nothing leaves this computer in the demo.`)),
      h('dl', { class: 'mail-meta' },
        h('dt', {}, 'From'), h('dd', {}, draft.from),
        h('dt', {}, 'To'), h('dd', {}, draft.to || '–'),
        h('dt', {}, 'CC'), h('dd', {}, draft.cc || '–'),
        draft.attachments && draft.attachments.length ? [h('dt', {}, 'Attached'), h('dd', {}, draft.attachments.join(', '))] : null),
      h('label', { class: 'field' }, 'Subject', subject),
      h('label', { class: 'field' }, editable ? 'Message (you can edit before sending)' : 'Message', body),
    ], editable ? [{ label: sendLabel, kind: 'accent', run: () => onSend(subject.value, body.value) }] : []);
  }

  // ---------- navigation ----------
  const go = (hash) => { if (location.hash === hash) router(); else location.hash = hash; };
  async function refresh() {
    const y = window.scrollY;
    await router(true);
    window.scrollTo(0, y);
  }

  function topbar() {
    const u = state.user;
    return h('header', { class: 'topbar' },
      h('img', { class: 'logo', src: 'leonardo_logo.png', alt: 'Leonardo & Company' }),
      h('div', { class: 'product' }, 'Practice Hub'),
      h('div', { class: 'demo-badge', title: 'All clients and people in this demo are made up.' }, 'Proof of concept · demo data'),
      h('div', { class: 'spacer' }),
      h('div', { class: 'who' }, h('b', {}, u.name), h('span', {}, u.title)),
      h('button', { class: 'btn btn-ghost small', onclick: async () => { await api('POST', 'api/logout'); state.user = null; go('#/login'); } }, 'Switch person'));
  }

  function navLink(key, label, active, count) {
    return h('a', { href: `#/${key}`, class: active === key ? 'active' : null }, label, count ? h('span', { class: 'count' }, count) : null);
  }

  function shell(active, content) {
    const admin = isAdmin();
    return [topbar(), h('div', { class: 'shell' },
      h('nav', { class: 'nav', 'aria-label': 'Main' },
        h('div', { class: 'group' }, 'Work'),
        navLink('today', 'My day', active), navLink('master', 'Master list', active), navLink('followups', 'Follow-ups', active),
        admin ? navLink('onboarding', 'Onboarding', active) : null,
        h('div', { class: 'group' }, 'Money and reporting'),
        admin ? navLink('billing', 'Billing', active) : null, navLink('reports', 'Reports', active),
        h('div', { class: 'group' }, 'Records'),
        navLink('outbox', 'Outbox', active), navLink('companies', 'Management companies', active),
        admin ? navLink('audit', 'Audit log', active) : null,
        h('div', { class: 'group' }, 'About this demo'),
        navLink('proof', 'Karbon checklist', active)),
      h('main', { class: 'main', id: 'main' }, content))];
  }

  function pageHead(title, sub, actions) {
    return h('div', { class: 'page-head' },
      h('div', { class: 'titles' }, h('h1', {}, title), sub ? h('div', { class: 'muted' }, sub) : null),
      actions ? h('div', { class: 'actions' }, actions) : null);
  }

  function table(headers, rows, opts = {}) {
    if (!rows.length) return h('div', { class: 'empty' }, opts.empty || 'Nothing to show.');
    return h('div', { class: 'table-wrap' }, h('table', {},
      h('thead', {}, h('tr', {}, headers.map((x) => h('th', { class: x.endsWith(' ') ? 'right' : null }, x.trim())))),
      h('tbody', {}, rows)));
  }

  // =====================================================================
  // Sign in (demo picker)
  // =====================================================================
  const SEES = {
    partner: 'Sees every client, all fees and partner-only quote notes.',
    admin: 'Sees every client and fees. Runs onboarding and billing.',
    auditor: 'Sees only their own clients. Fees are hidden.',
    reviewer: 'Sees the jobs they review. Fees are hidden.',
    tax: 'Sees jobs assigned to them for tax. Fees are hidden.',
  };
  async function pageLogin() {
    const [people, clients] = await Promise.all([api('GET', 'api/demo-users'), api('GET', 'api/demo-clients')]);
    const clientSection = [
      h('h2', { class: 'login-section' }, 'Client portal: what associations see'),
      h('div', { class: 'callout' }, h('b', {}, 'For board members and managers. '),
        'Clients upload documents, answer questions and message the team. Each person signs the portal authorization letter the first time they sign in. In the real system they would get a one-time sign-in link by email.'),
      h('div', { class: 'people' }, clients.map((c) => h('button', {
        class: 'person client',
        onclick: async () => {
          state.user = await api('POST', 'api/login', { contactId: c.id });
          state.meta = null;
          go('#/portal');
        },
      }, h('b', {}, c.name), h('div', { class: 't' }, `${c.role} · ${c.client_name}`),
      h('span', { class: `chip ${c.authorized ? 'st-Accepted' : 'stage-Onboarding'}` }, c.authorized ? '✓ Authorization signed' : 'Will be asked to sign'),
      h('div', { class: 'sees' }, 'Sees only this association\'s requests, files and messages.')))),
    ];
    return h('div', { class: 'login-wrap' },
      h('div', { class: 'login-hero' },
        h('img', { src: 'leonardo_logo.png', alt: 'Leonardo & Company' }),
        h('h1', {}, 'Practice Hub: proof of concept'),
        h('p', {}, 'A working sketch of an in-house master list and PBC tool, designed around what worked and what failed in the Karbon trial. Every client, person and email address here is made up.')),
      h('div', { class: 'callout sim' }, h('b', {}, 'How sign-in works here. '),
        'The real system would use each person\'s Microsoft 365 account with multi-factor authentication. For the demo, pick a person to see exactly what their role can see and do.'),
      h('div', { class: 'people' }, people.map((p) => h('button', {
        class: 'person',
        onclick: async () => {
          state.user = await api('POST', 'api/login', { staffId: p.id });
          state.meta = await api('GET', 'api/meta');
          go('#/today');
        },
      }, h('b', {}, p.name), h('div', { class: 't' }, `${p.title} · ${p.office}`), h('span', { class: 'chip role' }, p.role), h('div', { class: 'sees' }, SEES[p.role])))),
      clientSection,
      state.config && state.config.siteGate ? h('p', { class: 'small muted', style: { marginTop: '24px' } }, h('a', { href: 'site-logout' }, 'Leave the demo site'), ' (you will need the demo password to come back).') : null);
  }

  // =====================================================================
  // My day
  // =====================================================================
  function nextStep(e) {
    switch (e.stage) {
      case 'Onboarding': return !e.el_sent ? 'Send engagement letter' : e.gate_missing.length ? `Waiting: ${e.gate_missing.join(', ')}` : 'Ready to start';
      case 'Admin': return 'Set up and pass to auditor';
      case 'Auditor': return e.request_sent ? `${e.accepted_items} of ${e.total_items} items in${e.pending_review ? ` · ${e.pending_review} to review` : ''}` : 'Send the request list';
      case 'Reviewer': return 'Review work papers';
      case 'Tax': return 'Prepare the tax return';
      case 'Draft': return 'Issue the draft';
      case 'Final': return 'Sign off and issue final';
      default: return 'Done';
    }
  }

  async function pageToday() {
    const [d, jobs] = await Promise.all([api('GET', 'api/today'), api('GET', 'api/engagements?open=1')]);
    const u = state.user;
    const hour = new Date().getHours();
    const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    const openTasks = d.myTasks.filter((t) => !t.done_at);
    const waitingOnOthers = d.assignedByMe.filter((t) => !t.done_at);

    const jobRows = d.atMyStage.map((e) => h('tr', { class: 'click', onclick: () => go(`#/job/${e.id}`) },
      h('td', {}, h('b', {}, e.client_name), h('span', { class: 'sub' }, `${e.location} · ${e.mgmt_name || 'Self-managed'}`)),
      h('td', {}, `FY${e.fiscal_year}`), h('td', {}, e.job_type), h('td', {}, stageChip(e.stage)),
      h('td', { class: 'nowrap' }, `${e.days_in_stage} days`), h('td', {}, nextStep(e)), h('td', { class: 'nowrap' }, e.due_date ? fmtDate(e.due_date) : 'No date')));

    const taskItem = (t, mine) => h('li', { class: t.done_at ? 'done' : null },
      mine ? h('input', { type: 'checkbox', checked: !!t.done_at, 'aria-label': 'Done', onchange: () => act(() => api('POST', `api/tasks/${t.id}/toggle`), t.done_at ? 'Task reopened.' : 'Task done. The person who assigned it can see that.') }) : null,
      h('div', { class: 'grow' },
        h('div', { class: 'title' }, t.title),
        h('div', { class: 'small muted' },
          mine ? `From ${t.assigned_by_name || 'the system'}` : `For ${t.assigned_to_name}`,
          t.client_name ? [' · ', h('a', { href: `#/job/${t.engagement_id}` }, `${t.client_name} FY${t.fiscal_year}`)] : '',
          t.due ? ` · due ${fmtDate(t.due)}` : '')),
      mine ? null : h('span', { class: `chip ${t.done_at ? 'st-Accepted' : 'st-Sent'}` }, t.done_at ? `Done ${fmtDate(t.done_at)}` : 'Open'));

    // New one-off task, assignable to anyone (WF-05).
    const title = h('input', { type: 'text', placeholder: 'What needs doing?', maxlength: '200' });
    const to = h('select', { value: String(u.id) }, state.meta.staff.map((s) => h('option', { value: String(s.id) }, `${s.name}${s.id === u.id ? ' (me)' : ''}`)));
    const due = h('input', { type: 'date' });
    const job = h('select', {}, h('option', { value: '' }, 'Not linked to a job'), jobs.map((e) => h('option', { value: String(e.id) }, `${e.client_name} FY${e.fiscal_year}`)));
    const addTask = h('form', { class: 'form-row', onsubmit: (ev) => {
      ev.preventDefault();
      act(() => api('POST', 'api/tasks', { title: title.value, assigned_to: Number(to.value), due: due.value || null, engagement_id: job.value ? Number(job.value) : null }),
        Number(to.value) === u.id ? 'Task added.' : `Task assigned to ${staffName(Number(to.value))}.`);
    } }, h('label', { class: 'field' }, 'New task', title), h('label', { class: 'field' }, 'For', to),
    h('label', { class: 'field' }, h('span', {}, 'Due ', h('span', { class: 'hint' }, '(optional)')), due),
    h('label', { class: 'field' }, 'Job', job), h('button', { class: 'btn primary', type: 'submit' }, 'Add'));

    const snapshot = isAdmin() ? h('div', { class: 'card' }, h('h2', {}, 'Firm snapshot: open jobs by stage'),
      h('div', { class: 'stepper' }, state.meta.stages.filter((s) => s !== 'Closed').map((s) =>
        h('a', { class: 'step', href: '#/master', style: { textDecoration: 'none' } }, h('div', { style: { fontSize: '20px', color: '#133269' } }, String(d.snapshot[s] || 0)), s)))) : null;

    // Keep the list current without a manual refresh (WF-04).
    state.timer = setInterval(() => {
      const typing = document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
      if (!document.querySelector('.modal-back') && !typing) refresh();
    }, 15000);

    return [
      pageHead(`${greet}, ${first(u.name)}`, `${fmtDate(todayStr())} · This page updates on its own every 15 seconds.`),
      h('div', { class: 'kpis' },
        h('div', { class: 'kpi' }, h('b', {}, String(d.atMyStage.length)), h('span', {}, 'Jobs at your stage')),
        h('div', { class: 'kpi teal' }, h('b', {}, String(openTasks.length)), h('span', {}, 'Open tasks')),
        h('div', { class: 'kpi sky' }, h('b', {}, String(d.reviewQueue.length)), h('span', {}, 'Client files to review')),
        h('div', { class: 'kpi navy' }, h('b', {}, String(waitingOnOthers.length)), h('span', {}, 'Tasks you assigned, still open'))),
      snapshot,
      h('div', { class: 'card' }, h('h2', {}, 'Jobs at your stage'),
        table(['Client', 'Year', 'Job', 'Stage', 'In stage', 'Next step', 'Due'], jobRows, { empty: 'No jobs are waiting on you right now.' })),
      d.clientActivity.length ? h('div', { class: 'card' }, h('h2', {}, 'New from clients (last 14 days)'),
        h('ul', { class: 'list' }, d.clientActivity.map((a) => {
          const cut = (t, n) => (t.length > n ? `${t.slice(0, n).replace(/\s+\S*$/, '')}…` : t);
          const what = { upload: `uploaded "${a.text}"${a.channel === 'email' ? ' by email' : a.channel === 'portal' ? ' in the portal' : ''}`, comment: `commented: "${cut(a.text, 110)}"`,
            answer: `answered: "${cut(a.text, 110)}"`, not_applicable: `says an item doesn't apply: "${cut(a.text, 90)}"`, eta: `gave a date: "${cut(a.text, 90)}"` }[a.type] || a.text;
          return h('li', {}, h('span', { class: `chip ${a.type === 'upload' ? 'st-Sent' : 'stage-Admin'}` }, a.type === 'upload' ? 'File' : 'Message'),
            h('div', { class: 'grow' }, h('div', {}, h('b', {}, a.who), ` ${what}`), h('div', { class: 'small muted' }, `${a.client_name} · ${fmtSec(a.at)}`)),
            h('a', { class: 'btn small', href: `#/job/${a.engagement_id}/${a.type === 'upload' ? 'documents' : 'requests'}` }, 'Open'));
        }))) : null,
      d.reviewQueue.length ? h('div', { class: 'card' }, h('h2', {}, 'Client files waiting for your review'),
        h('div', { class: 'callout' }, h('b', {}, 'Claude\'s future job. '), 'In the real build Claude reads each attachment and suggests which request item it answers. You confirm every one.'),
        h('ul', { class: 'list' }, d.reviewQueue.map((s) => h('li', {}, h('div', { class: 'grow' }, h('b', {}, s.file_name), h('div', { class: 'small muted' }, s.client_name)),
          h('a', { class: 'btn small', href: `#/job/${s.engagement_id}/requests` }, 'Review'))))) : null,
      h('div', { class: 'grid two' },
        h('div', { class: 'card' }, h('h2', {}, 'My tasks'),
          h('ul', { class: 'list' }, d.myTasks.length ? d.myTasks.map((t) => taskItem(t, true)) : h('li', { class: 'muted' }, 'No tasks. Nice.')),
          h('div', { style: { marginTop: '14px' } }, addTask)),
        h('div', { class: 'card' }, h('h2', {}, 'Tasks I assigned to others'),
          h('div', { class: 'small muted', style: { marginBottom: '6px' } }, 'You can see the moment someone finishes a task you gave them.'),
          h('ul', { class: 'list' }, d.assignedByMe.length ? d.assignedByMe.map((t) => taskItem(t, false)) : h('li', { class: 'muted' }, 'You haven\'t assigned any tasks.')))),
    ];
  }

  // =====================================================================
  // Master list
  // =====================================================================
  function rolloverDialog(e) {
    const due = h('input', { type: 'date' });
    modal(`Roll over ${e.client_name} to fiscal ${e.fiscal_year + 1}`, [
      h('p', {}, 'This creates next year\'s job for this one client, copying contacts, fees, staff, job type and the request list answers. Other clients are not touched.'),
      h('label', { class: 'field' }, h('span', {}, 'Due date ', h('span', { class: 'hint' }, '(optional, you can leave it blank)')), due),
    ], [{ label: 'Roll over this client', run: async () => {
      const out = await api('POST', `api/engagements/${e.id}/rollover`, { due_date: due.value || null });
      toast(`${e.client_name} rolled over to fiscal ${e.fiscal_year + 1}.`);
      go(`#/job/${out.id}`);
    } }]);
  }

  /**
   * A client is "due for rollover" when next year's job doesn't exist yet and
   * next year's year-end is within about five months (Leonardo starts rolling
   * December year-ends over in August). Any client can still be rolled over
   * at any time from its job page.
   */
  function rolloverDue(e) {
    if (e.has_next) return false;
    const [m, d] = e.fye.split('-').map(Number);
    const nextYearEnd = new Date(e.fiscal_year + 1, m - 1, d, 12);
    return (nextYearEnd - new Date(todayStr() + 'T12:00:00')) / 86400000 <= 160;
  }

  async function pageMaster(query) {
    const rows = await api('GET', 'api/engagements');
    const params = new URLSearchParams(query || '');
    const admin = isAdmin();
    const years = [...new Set(rows.map((e) => e.fiscal_year))].sort();
    const sel = (label, options, value) => h('select', { 'aria-label': label, value: value || '' }, h('option', { value: '' }, label), options.map(([v, t]) => h('option', { value: String(v) }, t)));
    const f = {
      q: h('input', { type: 'search', placeholder: 'Search clients…', 'aria-label': 'Search clients' }),
      year: sel('All years', years.map((y) => [y, `Fiscal ${y}`]), params.get('year')),
      stage: sel('All stages', state.meta.stages.map((s) => [s, s]), params.get('stage')),
      location: sel('All offices', state.meta.locations.map((l) => [l, l]), params.get('location')),
      jobType: sel('All job types', state.meta.jobTypes.map((j) => [j, j]), params.get('jobType')),
      mgmt: sel('All management companies', state.meta.mgmt.map((m) => [m.id, m.name]), params.get('mgmt')),
      staff: sel('Anyone', state.meta.staff.filter((s) => s.role !== 'admin').map((s) => [s.id, s.name]), params.get('staff')),
      open: h('input', { type: 'checkbox', checked: params.get('open') !== '0' }),
      due: h('input', { type: 'checkbox', checked: params.get('due') === '1' }),
    };
    const tbody = h('tbody');
    const count = h('span', { class: 'muted small' });
    let visible = rows;

    function filtered() {
      const q = f.q.value.trim().toLowerCase();
      return rows.filter((e) => (!q || e.client_name.toLowerCase().includes(q))
        && (!f.year.value || e.fiscal_year === Number(f.year.value)) && (!f.stage.value || e.stage === f.stage.value)
        && (!f.location.value || e.location === f.location.value) && (!f.jobType.value || e.job_type === f.jobType.value)
        && (!f.mgmt.value || e.mgmt_company_id === Number(f.mgmt.value))
        && (!f.staff.value || [e.auditor_id, e.reviewer_id, e.tax_id, e.partner_id].includes(Number(f.staff.value)))
        && (f.due.checked ? rolloverDue(e) : (!f.open.checked || e.stage !== 'Closed')));
    }
    function draw() {
      visible = filtered();
      count.textContent = `${visible.length} of ${rows.length} jobs you can see`;
      tbody.replaceChildren(...(visible.length ? visible.map((e) => h('tr', { class: 'click', onclick: () => go(`#/job/${e.id}`) },
        h('td', {}, h('b', {}, e.client_name), h('span', { class: 'sub' }, `${e.entity_type} · ${e.mgmt_name || 'Self-managed'}`)),
        h('td', {}, e.location), h('td', {}, e.job_type), h('td', {}, String(e.fiscal_year)), h('td', {}, stageChip(e.stage)),
        h('td', { class: 'nowrap' }, e.owner_name || '–', h('span', { class: 'sub' }, `${e.days_in_stage} days`)),
        h('td', { class: 'nowrap' }, e.el_signed ? '✓ Signed' : e.el_sent ? 'Sent' : '–'),
        h('td', { class: 'nowrap' }, e.retainer_paid ? '✓ Paid' : e.retainer_invoiced ? 'Invoiced' : '–'),
        h('td', { class: 'nowrap' }, e.due_date ? fmtDate(e.due_date) : h('span', { class: 'muted' }, 'None')),
        h('td', { class: 'nowrap' }, e.total_items ? `${e.accepted_items}/${e.total_items}` : '–'),
        admin ? h('td', { class: 'right' }, money(e.fee)) : null,
        admin ? h('td', {}, rolloverDue(e) ? h('button', { class: 'btn small', onclick: (ev) => { ev.stopPropagation(); rolloverDialog(e); } }, `Roll over`) : '') : null))
        : [h('tr', {}, h('td', { colspan: '13', class: 'empty' }, 'No jobs match these filters.'))]));
    }
    Object.values(f).forEach((el) => el.addEventListener(el.type === 'search' ? 'input' : 'change', draw));

    // Export what's on screen as a spreadsheet file: the data is never locked in (IN-04).
    function exportCsv() {
      const cols = ['Client', 'Office', 'Management company', 'Job type', 'Fiscal year', 'Stage', 'With', 'Letter signed', 'Retainer paid', 'Due', ...(admin ? ['Fee'] : [])];
      const cell = (v) => { const s = String(v ?? ''); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
      const lines = visible.map((e) => [e.client_name, e.location, e.mgmt_name || 'Self-managed', e.job_type, e.fiscal_year, e.stage, e.owner_name || '',
        e.el_signed || '', e.retainer_paid || '', e.due_date || '', ...(admin ? [e.fee] : [])].map(cell).join(','));
      const blob = new Blob([[cols.join(','), ...lines].join('\r\n')], { type: 'text/csv' });
      const a = h('a', { href: URL.createObjectURL(blob), download: 'master-list.csv' });
      document.body.append(a); a.click(); a.remove();
    }

    const headers = ['Client', 'Office', 'Job', 'Year', 'Stage', 'With', 'Letter', 'Retainer', 'Due', 'Items in', ...(admin ? ['Fee ', ''] : [])];
    draw();
    return [
      pageHead('Master list', 'One list for the whole firm. It replaces the Google Sheet and everyone\'s personal Excel copies.',
        [h('button', { class: 'btn', onclick: exportCsv }, 'Export to Excel (CSV)')]),
      state.user.role === 'auditor' || state.user.role === 'reviewer' || state.user.role === 'tax'
        ? h('div', { class: 'callout' }, h('b', {}, 'Privacy by role. '), 'You only see the jobs assigned to you, and fees are hidden. The server enforces this, so it can\'t be bypassed from the browser.') : null,
      h('div', { class: 'card' },
        h('div', { class: 'filters' }, f.q, f.year, f.stage, f.location, f.jobType, f.mgmt, f.staff, h('label', { class: 'check' }, f.open, 'Open jobs only'),
          admin ? h('label', { class: 'check', title: 'Clients whose next year has not been set up yet' }, f.due, `Due for rollover (${rows.filter(rolloverDue).length})`) : null, count),
        h('div', { class: 'table-wrap' }, h('table', {}, h('thead', {}, h('tr', {}, headers.map((x) => h('th', { class: x.endsWith(' ') ? 'right' : null }, x.trim())))), tbody))),
    ];
  }

  // =====================================================================
  // Job page
  // =====================================================================
  const SAMPLE_FILES = {
    bank_statements: (p) => `Operating Bank Statement ${p.prevMonth} ${p.prevMonthYear}.pdf`,
    bank_recs: (p) => `Bank Reconciliation ${p.mm}-${p.dd}-${p.year}.pdf`,
    fin_package: (p) => `Financial Package ${p.month} ${p.year}.pdf`,
    general_ledger: (p) => `General Ledger FY${p.fy}.csv`,
    ar_aging: (p) => `AR Aging ${p.mm}-${p.dd}-${p.year}.csv`,
    ap_aging: (p) => `AP Aging ${p.month} ${p.year}.pdf`,
    prepaids: (p) => `Prepaid Assessments ${p.month} ${p.year}.csv`,
    insurance: () => 'Insurance Declarations Pages.pdf',
    minutes: (p) => `Board Meeting Minutes ${p.fy}.pdf`,
    budget: (p) => `Approved Budget ${p.fy + 1}.pdf`,
    reserve_study: () => 'Reserve Study Update.pdf',
    investments: (p) => `CD Statement ${p.month} ${p.year}.pdf`,
    contracts: () => 'Landscaping Contract.pdf',
    board_list: () => 'Board Members and Officers.pdf',
    subsequent_checks: (p) => `Check Register ${p.nextMonth} ${p.nextMonthYear}.pdf`,
    payroll: (p) => `Payroll 941 Q4 ${p.year}.pdf`,
    legal: () => 'Attorney Contact List.pdf',
    special_assessment: () => 'Special Assessment Resolution.pdf',
    loan: (p) => `Loan Statement ${p.month} ${p.year}.pdf`,
    prior_return: (p) => `1120-H ${p.fy - 1}.pdf`,
    form_8879: () => 'Signed 8879.pdf',
  };

  function periodParts(fye, fy) {
    const [m, d] = fye.split('-').map(Number);
    return {
      fy, year: fy, mm: String(m).padStart(2, '0'), dd: String(d).padStart(2, '0'), month: MONTH[m - 1],
      prevMonth: MONTH[(m + 10) % 12], prevMonthYear: m === 1 ? fy - 1 : fy,
      nextMonth: MONTH[m % 12], nextMonthYear: m === 12 ? fy + 1 : fy,
    };
  }

  function sendBackDialog(d) {
    const e = d.engagement;
    const idx = state.meta.stages.indexOf(e.stage);
    const earlier = state.meta.stages.slice(0, idx);
    const to = h('select', { value: earlier[earlier.length - 1] }, earlier.map((s) => h('option', { value: s }, s)));
    const reason = h('textarea', { rows: '3', placeholder: 'For example: tie-out of the reserve schedule doesn\'t agree to the balance sheet.' });
    modal(`Send ${d.client.name} back`, [
      h('p', {}, 'Karbon could only move jobs forward. Here a job can go back to any earlier stage. The person who receives it gets an email and a task with your reason.'),
      h('label', { class: 'field' }, 'Send back to', to),
      h('label', { class: 'field' }, 'Reason (required)', reason),
    ], [{ label: 'Send back', run: async () => {
      const out = await api('POST', `api/engagements/${e.id}/move`, { direction: 'back', to: to.value, reason: reason.value });
      toast(`Sent back to ${out.engagement.stage}. ${out.engagement.owner_name} was emailed and given a task.`);
      await refresh();
    } }]);
  }

  function simulateReplyDialog(d) {
    const e = d.engagement;
    const sender = h('select', {}, d.contacts.map((c) => h('option', { value: `contact:${c.id}` }, `${c.name} (${c.role || 'contact'})`)));
    const open = d.items.filter((i) => i.status !== 'Accepted' && i.status !== 'N/A');
    const p = periodParts(d.client.fye, e.fiscal_year);
    const ordered = [...open.filter((i) => i.key === 'bank_statements'), ...open.filter((i) => i.key !== 'bank_statements')];
    const samples = ordered.slice(0, 3).map((i) => (SAMPLE_FILES[i.key] || (() => 'Document.pdf'))(p));
    const files = h('textarea', { rows: '4' }, (samples.length ? samples : ['Document.pdf']).join('\n'));
    const msg = h('textarea', { rows: '4' }, `Hi ${first(e.auditor_name)},\n\nAttached are some of the items you asked for. More to follow next week.\n\nThanks`);
    modal('Simulate a client reply', [
      h('div', { class: 'callout sim' }, h('b', {}, 'Stands in for Outlook. '), 'In the real build, replies to the firm\'s Outlook mailboxes (including ones read or sent on a phone) are captured on the job automatically. Attachments are saved to SharePoint by year and request item.'),
      h('label', { class: 'field' }, 'From', sender),
      h('label', { class: 'field' }, 'Message', msg),
      h('label', { class: 'field' }, h('span', {}, 'Attachments ', h('span', { class: 'hint' }, '(one file name per line; the first one has the wrong month on purpose)')), files),
    ], [{ label: 'Receive this email', run: async () => {
      await api('POST', `api/engagements/${e.id}/simulate-email`, { sender: sender.value, text: msg.value, attachments: files.value.split('\n').map((s) => s.trim()).filter(Boolean) });
      toast('Email captured on the job. Suggested matches are waiting for review.');
      go(`#/job/${e.id}/requests`);
    } }]);
  }

  function simulateOutlookDialog(d) {
    const e = d.engagement;
    const people = state.meta.staff.filter((s) => ['partner', 'admin'].includes(s.role) || s.id === e.auditor_id);
    const sender = h('select', {}, people.map((s) => h('option', { value: `staff:${s.id}` }, s.name)));
    const msg = h('textarea', { rows: '4' }, 'Quick update for the board: we expect to start fieldwork next week.\n\nSent from Outlook on my phone');
    modal('Simulate an email sent from Outlook on a phone', [
      h('div', { class: 'callout sim' }, h('b', {}, 'Karbon only synced one way. '), 'Here, an email someone sends from Outlook, on a laptop or a phone, still lands in this client\'s history so the whole team can see it.'),
      h('label', { class: 'field' }, 'Sent by', sender), h('label', { class: 'field' }, 'Message', msg),
    ], [{ label: 'Capture this email', run: async () => {
      await api('POST', `api/engagements/${e.id}/simulate-email`, { sender: sender.value, text: msg.value });
      toast('Captured in the client\'s email history.');
      go(`#/job/${e.id}/emails`);
    } }]);
  }

  async function pageJob(id, tab = 'overview') {
    const d = await api('GET', `api/engagements/${id}`);
    const e = d.engagement; const P = d.permissions; const stages = state.meta.stages;
    const idx = stages.indexOf(e.stage);
    const pending = d.suggestions.filter((s) => s.status === 'Pending');

    const actions = [];
    if (P.canMove && e.stage !== 'Closed') {
      actions.push(h('button', { class: 'btn accent', onclick: () => act(() => api('POST', `api/engagements/${e.id}/move`, { direction: 'forward' }),
        (out) => `Moved to ${out.engagement.stage}.${out.engagement.owner_name ? ` ${out.engagement.owner_name} was emailed.` : ''}`) }, `Move to ${stages[idx + 1]} →`));
    }
    if (P.canMove && idx > 0 && e.stage !== 'Closed') actions.push(h('button', { class: 'btn', onclick: () => sendBackDialog(d) }, 'Send back…'));
    if (P.canAdmin && !e.has_next) actions.push(h('button', { class: 'btn', onclick: () => rolloverDialog({ ...e, client_name: d.client.name }) }, `Roll over to FY${e.fiscal_year + 1}`));

    const gate = e.stage === 'Onboarding' ? h('div', { class: 'gate' },
      h('b', {}, 'Ready-to-start check:'),
      h('span', { class: `req ${e.el_signed ? 'ok' : ''}` }, e.el_signed ? `Engagement letter signed ${fmtDate(e.el_signed)}` : 'Engagement letter signed'),
      h('span', { class: `req ${e.retainer_paid ? 'ok' : ''}` }, e.retainer_paid ? `Retainer received ${fmtDate(e.retainer_paid)}` : 'Retainer received'),
      h('span', { class: 'spacer', style: { flex: '1' } }),
      P.canAdmin && e.el_sent && !e.el_signed ? h('button', { class: 'btn small', title: 'Stands in for an e-signature notice', onclick: () => act(() => api('POST', `api/engagements/${e.id}/el-signed`), 'Signature recorded.') }, 'Record signature (simulated)') : null,
      P.canAdmin && e.el_sent && !e.retainer_paid ? h('button', { class: 'btn small', title: 'Stands in for the QuickBooks payment sync', onclick: () => act(() => api('POST', `api/engagements/${e.id}/retainer-paid`), (out) => (out.engagement.stage === 'Admin' ? 'Payment recorded. Both conditions met, so the job moved to Admin and the team was emailed.' : 'Payment recorded.')) }, 'Record retainer payment (simulated)') : null,
      !e.el_sent ? h('span', { class: 'small muted' }, P.canAdmin ? h('span', {}, 'Engagement letter not sent yet. Send it from ', h('a', { href: '#/onboarding' }, 'Onboarding'), '.') : 'Engagement letter not sent yet.') : null) : null;

    const tabs = [['overview', 'Overview'], ['contacts', `Contacts (${d.contacts.length})`], ['requests', `Request list (${e.accepted_items}/${e.total_items})${pending.length ? ` · ${pending.length} to review` : ''}`],
      ['documents', `Documents (${d.documents.length})`], ['messages', `Client messages (${d.comments.filter((c) => !c.item_id).length})`],
      ['emails', `Emails (${d.emails.length})`], ['history', 'History'], ...(P.canSeeFees ? [['billing', 'Billing']] : [])];

    let body;
    if (tab === 'contacts') body = jobContacts(d);
    else if (tab === 'requests') body = jobRequests(d);
    else if (tab === 'documents') body = jobDocuments(d);
    else if (tab === 'messages') body = jobMessages(d);
    else if (tab === 'emails') body = jobEmails(d);
    else if (tab === 'history') body = jobHistory(d);
    else if (tab === 'billing' && P.canSeeFees) body = jobBilling(d);
    else { tab = 'overview'; body = jobOverview(d); }

    return [
      pageHead(d.client.name, `Fiscal ${e.fiscal_year} ${e.job_type.toLowerCase()} · year-end ${fyeLabel(d.client.fye, e.fiscal_year)} · ${d.client.location} office · ${d.mgmt ? d.mgmt.name : 'Self-managed'}`, actions),
      h('div', { class: 'filters' }, h('span', { class: 'small muted' }, 'Years:'), d.years.map((y) => h('a', { class: `chip ${y.id === e.id ? 'stage-Final' : 'stage-Onboarding'}`, href: `#/job/${y.id}` }, `FY${y.fiscal_year} · ${y.stage}`))),
      h('div', { class: 'stepper', 'aria-label': 'Stages' }, stages.map((s, i) => h('div', { class: `step ${i < idx ? 'done' : i === idx ? 'current' : ''}` }, s))),
      h('div', { class: 'small muted' }, e.owner_name ? `With ${e.owner_name} for ${e.days_in_stage} days.` : 'This job is closed.', P.canMove || e.stage === 'Closed' ? '' : ` Only ${e.owner_name}, a partner or the admin team can move it.`),
      gate,
      h('nav', { class: 'tabs' }, tabs.map(([k, label]) => h('a', { href: `#/job/${e.id}/${k}`, class: k === tab ? 'active' : null }, label))),
      body,
    ];
  }

  function jobOverview(d) {
    const e = d.engagement; const P = d.permissions;
    const roleSelect = (field, role) => {
      if (!P.canAdmin) return staffName(e[field]);
      return h('select', { value: String(e[field] || ''), onchange: (ev) => act(() => api('PATCH', `api/engagements/${e.id}`, { [field]: Number(ev.target.value) }), 'Reassigned. The job, its history and its documents moved with it.') },
        state.meta.staff.filter((s) => s.role === role).map((s) => h('option', { value: String(s.id) }, s.name)));
    };
    const due = h('input', { type: 'date', value: e.due_date || '' });
    const dueBlock = P.canMove ? h('div', { class: 'form-row' }, due,
      h('button', { class: 'btn small', onclick: () => act(() => api('PATCH', `api/engagements/${e.id}`, { due_date: due.value || null }), due.value ? 'Due date saved.' : 'Due date cleared.') }, 'Save')) : (e.due_date ? fmtDate(e.due_date) : 'None');
    const jobType = P.canAdmin ? h('select', { value: e.job_type, onchange: (ev) => act(() => api('PATCH', `api/engagements/${e.id}`, { job_type: ev.target.value }), 'Job type changed and the request list updated.') },
      state.meta.jobTypes.map((j) => h('option', { value: j }, j))) : e.job_type;
    const prior = d.years.find((y) => y.id === e.rolled_from_id);

    const milestones = [['Engagement letter sent', e.el_sent], ['Engagement letter signed', e.el_signed], ['Retainer invoiced', e.retainer_invoiced],
      ['Retainer paid', e.retainer_paid], ['Request list sent', e.request_sent], ['Draft issued', e.draft_issued], ['Final issued', e.final_issued]];

    let fees;
    if (P.canSeeFees) {
      const fee = h('input', { type: 'number', min: '0', step: '50', value: String(e.fee ?? '') });
      const taxFee = h('input', { type: 'number', min: '0', step: '25', value: String(e.tax_fee ?? '') });
      const pct = h('input', { type: 'number', min: '0', max: '100', step: '5', value: String(e.retainer_pct ?? 50) });
      const prev = d.years.find((y) => y.fiscal_year === e.fiscal_year - 1);
      fees = h('div', { class: 'card' }, h('h2', {}, 'Fees'),
        h('div', { class: 'form-row' }, h('label', { class: 'field' }, 'Engagement fee', fee), h('label', { class: 'field' }, 'Tax fee', taxFee),
          h('label', { class: 'field' }, 'Retainer %', pct),
          h('button', { class: 'btn small', onclick: () => act(() => api('PATCH', `api/engagements/${e.id}`, { fee: Number(fee.value), tax_fee: Number(taxFee.value), retainer_pct: Number(pct.value) }), 'Fees saved.') }, 'Save')),
        prev ? h('div', { class: 'small muted', style: { marginTop: '6px' } }, h('a', { href: `#/job/${prev.id}` }, `See fiscal ${prev.fiscal_year}`), ' for last year\'s fee.') : null,
        P.isPartner ? (() => {
          const note = h('textarea', { rows: '3', placeholder: 'Internal quote notes' }, e.quote_note || '');
          return h('div', { style: { marginTop: '12px' } }, h('label', { class: 'field' }, h('span', {}, 'Quote notes ', h('span', { class: 'hint' }, '(partners only)')), note),
            h('button', { class: 'btn small', style: { marginTop: '6px' }, onclick: () => act(() => api('PATCH', `api/engagements/${e.id}`, { quote_note: note.value }), 'Quote note saved.') }, 'Save note'));
        })() : h('div', { class: 'small muted', style: { marginTop: '10px' } }, 'Quote notes are visible to partners only.'));
    } else {
      fees = h('div', { class: 'callout' }, h('b', {}, 'Fees are hidden for your role. '), 'Partners and the admin team see fees, billing and quote notes.');
    }

    return h('div', { class: 'grid two' },
      h('div', {},
        h('div', { class: 'card' }, h('h2', {}, 'Job details'),
          h('dl', { class: 'facts' },
            h('dt', {}, 'Job type'), h('dd', {}, jobType),
            h('dt', {}, 'Office'), h('dd', {}, d.client.location),
            h('dt', {}, 'Association'), h('dd', {}, `${d.client.entity_type}${d.client.units ? `, ${d.client.units} units` : ''}`),
            h('dt', {}, 'Partner'), h('dd', {}, roleSelect('partner_id', 'partner')),
            h('dt', {}, 'Auditor'), h('dd', {}, roleSelect('auditor_id', 'auditor')),
            h('dt', {}, 'Reviewer'), h('dd', {}, roleSelect('reviewer_id', 'reviewer')),
            h('dt', {}, 'Tax'), h('dd', {}, roleSelect('tax_id', 'tax')),
            h('dt', {}, 'Due date'), h('dd', {}, dueBlock, h('div', { class: 'small muted', style: { fontWeight: 400 } }, 'Optional. Leave it blank if there is no fixed date.')),
            h('dt', {}, 'Rolled over from'), h('dd', {}, prior ? h('a', { href: `#/job/${prior.id}` }, `Fiscal ${prior.fiscal_year}`) : '–'))),
        fees),
      h('div', {},
        h('div', { class: 'card' }, h('h2', {}, 'Milestones'),
          h('div', { class: 'small muted', style: { marginBottom: '8px' } }, 'Real dates, filled in by the system as things happen, so reports can rely on them.'),
          h('dl', { class: 'facts' }, milestones.map(([k, v]) => [h('dt', {}, k), h('dd', {}, v ? fmtDate(v) : h('span', { class: 'muted', style: { fontWeight: 400 } }, 'Not yet'))]))),
        h('div', { class: 'card' }, h('h2', {}, 'Tasks on this job'),
          h('ul', { class: 'list' }, d.tasks.length ? d.tasks.map((t) => h('li', { class: t.done_at ? 'done' : null },
            h('div', { class: 'grow' }, h('div', { class: 'title' }, t.title), h('div', { class: 'small muted' }, `For ${t.assigned_to_name} · from ${t.assigned_by_name || 'the system'}${t.due ? ` · due ${fmtDate(t.due)}` : ''}`)),
            h('span', { class: `chip ${t.done_at ? 'st-Accepted' : 'st-Sent'}` }, t.done_at ? 'Done' : 'Open'))) : h('li', { class: 'muted' }, 'No tasks on this job.')))));
  }

  function jobContacts(d) {
    const to = d.contacts.filter((c) => c.receives_requests).length;
    const cc = d.contacts.filter((c) => c.cc).length;
    const toggle = (c, field) => h('input', { type: 'checkbox', checked: !!c[field], 'aria-label': field,
      onchange: (ev) => act(() => api('PATCH', `api/contacts/${c.id}`, { [field]: ev.target.checked }), 'Saved.') });
    const name = h('input', { type: 'text', placeholder: 'Name' });
    const role = h('input', { type: 'text', placeholder: 'Role, e.g. Treasurer' });
    const email = h('input', { type: 'email', placeholder: 'Email' });
    const receives = h('input', { type: 'checkbox' });
    const ccBox = h('input', { type: 'checkbox' });
    return [
      d.mgmt ? h('div', { class: 'card' }, h('h2', {}, `Management company: ${d.mgmt.name}`),
        h('dl', { class: 'facts' }, h('dt', {}, 'Contact'), h('dd', {}, d.mgmt.contact_name || '–'), h('dt', {}, 'Email'), h('dd', {}, d.mgmt.email || '–'), h('dt', {}, 'Phone'), h('dd', {}, d.mgmt.phone || '–')),
        h('div', { class: 'small muted', style: { marginTop: '8px' } }, 'Stored once and shared by every client this company manages. Change it on ', h('a', { href: '#/companies' }, 'Management companies'), ' and all of them update.')) : null,
      h('div', { class: 'card' },
        h('div', { class: 'card-head' }, h('h2', {}, 'Contacts'), h('span', { class: 'chip st-Sent' }, `Emails go to ${to} and copy ${cc} people`)),
        h('div', { class: 'small muted', style: { marginBottom: '8px' } }, 'No limit on recipients, and CC works. Karbon had neither. Tick who receives request emails and who is copied.'),
        table(['Name', 'Role', 'Email', 'Phone', 'Receives requests', 'Copied (CC)', 'Client portal'], d.contacts.map((c) => {
          const auth = d.authorizations.find((a) => a.contact_id === c.id);
          return h('tr', {},
            h('td', {}, h('b', {}, c.name)), h('td', {}, c.role || '–'), h('td', {}, c.email), h('td', { class: 'nowrap' }, c.phone || '–'),
            h('td', {}, toggle(c, 'receives_requests')), h('td', {}, toggle(c, 'cc')),
            h('td', { class: 'nowrap' }, auth
              ? h('span', {}, h('span', { class: 'chip st-Accepted', title: `Version ${auth.letter_version}, fingerprint ${auth.letter_sha256.slice(0, 16)}…` }, `✓ Signed ${fmtDate(auth.signed_at)}`), ' ',
                h('a', { class: 'small', href: `api/authorizations/${auth.id}/pdf`, target: '_blank', rel: 'noopener' }, 'Signed copy'))
              : h('button', { class: 'btn small', onclick: () => act(() => api('POST', `api/contacts/${c.id}/invite`), `Invite to ${c.name} added to the Outbox (simulated).`) }, 'Invite (simulated)')));
        })),
        h('div', { class: 'small muted', style: { marginTop: '6px' } }, 'Each person signs the portal authorization letter before they can use the portal. The signed copy records their name, title, the time, their IP address and a fingerprint of the exact letter.'),
        h('form', { class: 'form-row', style: { marginTop: '14px' }, onsubmit: (ev) => {
          ev.preventDefault();
          act(() => api('POST', `api/clients/${d.client.id}/contacts`, { name: name.value, role: role.value, email: email.value, receives_requests: receives.checked, cc: ccBox.checked }), 'Contact added.');
        } }, name, role, email, h('label', { class: 'check' }, receives, 'Receives'), h('label', { class: 'check' }, ccBox, 'CC'), h('button', { class: 'btn primary', type: 'submit' }, 'Add contact'))),
    ];
  }

  function jobRequests(d) {
    const e = d.engagement; const P = d.permissions;
    const pending = d.suggestions.filter((s) => s.status === 'Pending');
    const decided = d.suggestions.filter((s) => s.status !== 'Pending');
    const live = d.items.filter((i) => i.status !== 'N/A');
    const counts = (s) => d.items.filter((i) => i.status === s).length;
    const itemNo = (id) => d.items.findIndex((i) => i.id === id) + 1;
    const filedPath = (item, file) => `SharePoint › Clients › ${d.client.name} › FY${e.fiscal_year} › ${String(itemNo(item.id)).padStart(2, '0')} ${shortItem(item.text)} › ${file}`;

    const questions = h('div', { class: 'card' }, h('h2', {}, 'Yes/no questions'),
      h('div', { class: 'small muted', style: { marginBottom: '8px' } }, 'Answers add or remove items from the list, so each client only gets what applies to them.'),
      h('ul', { class: 'list' }, state.meta.questions.map((q) => {
        const yes = !!d.answers[q.key];
        const set = (v) => act(() => api('POST', `api/engagements/${e.id}/answers`, { answers: { [q.key]: v } }), v ? 'Item added to the request list.' : 'Item removed from the request list.');
        return h('li', {}, h('div', { class: 'grow' }, q.text),
          h('div', { class: 'seg' }, h('button', { class: yes ? 'on' : null, disabled: !P.canManageRequests, onclick: () => !yes && set(true) }, 'Yes'),
            h('button', { class: !yes ? 'on' : null, disabled: !P.canManageRequests, onclick: () => yes && set(false) }, 'No')));
      })));

    const sendRequest = async () => {
      try {
        const draft = await api('POST', `api/engagements/${e.id}/request-list/preview`);
        mailPreview(`Request list for ${d.client.name}`, draft, 'Approve and send', async (subject, body) => {
          await api('POST', `api/engagements/${e.id}/request-list/send`, { subject, body });
          toast(`Request list sent to ${draft.recipients} people.`);
          await refresh();
        });
      } catch (err) { toast(err.message, true); }
    };
    const sendFollowUp = async () => {
      try {
        const draft = await api('POST', `api/engagements/${e.id}/follow-up/preview`);
        mailPreview(`Combined reminder for ${d.client.name}`, draft, 'Approve and send', async (subject, body) => {
          await api('POST', `api/engagements/${e.id}/follow-up/send`, { subject, body });
          toast('Reminder sent: one email listing everything still outstanding.');
          await refresh();
        }, h('span', {}, h('b', {}, 'Drafted for you. '), `One combined reminder listing everything still outstanding, including returned items with your notes. In the real build Claude drafts this and it sends from ${draft.from} in Outlook. Nothing is sent until you approve.`));
      } catch (err) { toast(err.message, true); }
    };

    const actionsRow = h('div', { class: 'filters' },
      P.canManageRequests && !e.request_sent ? h('button', { class: 'btn accent', onclick: sendRequest }, 'Preview and send request list') : null,
      P.canManageRequests && e.request_sent ? h('button', { class: 'btn accent', onclick: sendFollowUp }, 'Preview and send combined reminder') : null,
      h('button', { class: 'btn', onclick: () => simulateReplyDialog(d) }, 'Simulate a client reply'),
      h('button', { class: 'btn', onclick: () => simulateOutlookDialog(d) }, 'Simulate an Outlook email from a phone'),
      h('span', { class: 'small muted' }, e.request_sent ? `Request list sent ${fmtDate(e.request_sent)}.` : 'Request list not sent yet.'));

    const suggestionCard = (s) => {
      const options = d.items.filter((i) => i.status !== 'N/A');
      const pick = h('select', { 'aria-label': 'Request item', value: s.item_id ? String(s.item_id) : '' },
        h('option', { value: '' }, 'Choose the request item…'), options.map((i) => h('option', { value: String(i.id) }, `${itemNo(i.id)}. ${shortItem(i.text)} (${i.status === 'Sent' ? 'requested' : i.status.toLowerCase()})`)));
      const current = () => d.items.find((i) => i.id === Number(pick.value));
      const pathLine = h('div', { class: 'path' }, current() ? `Will be saved to: ${filedPath(current(), s.file_name)}` : 'No match found. Pick the item it belongs to, or mark it not a match.');
      pick.addEventListener('change', () => { pathLine.textContent = current() ? `Will be saved to: ${filedPath(current(), s.file_name)}` : 'Pick the item it belongs to.'; });
      const returnIt = () => {
        const reason = h('textarea', { rows: '3' }, s.flag ? s.flag.replace('Check the period: the file looks like', 'The file you sent looks like it is for').replace(', but year-end is', '. We need the statement as of') + '.' : '');
        modal(`Return ${s.file_name} to the client`, [
          h('p', {}, 'The item goes back to the client with your note. It appears at the top of the next combined reminder.'),
          h('label', { class: 'field' }, 'What should the client fix?', reason),
        ], [{ label: 'Return to client', run: () => act(() => api('POST', `api/suggestions/${s.id}/decide`, { decision: 'return', item_id: Number(pick.value) || null, reason: reason.value }), 'Returned. It will be in the next reminder.') }]);
      };
      return h('div', { class: 'sugg' },
        h('div', { class: 'file' }, s.file_name),
        s.document ? h('div', { class: 'small muted' }, `${fileSize(s.document.size)}${s.document.pdf_pages ? ` · ${s.document.pdf_pages} page${s.document.pdf_pages === 1 ? '' : 's'}` : ''} · received ${fmtSec(s.document.uploaded_at)} from ${s.document.uploaded_by} via ${CHANNEL[s.document.channel] || s.document.channel} · `,
          h('a', { href: '#', onclick: (ev) => { ev.preventDefault(); previewDocument(s.document, { staff: true }); } }, 'Open the file')) : null,
        h('div', { class: 'row' }, h('span', { class: 'small muted' }, s.confidence === 'Chosen by sender' ? 'For:' : 'Looks like:'), pick,
          s.confidence ? h('span', { class: `chip conf-${s.confidence.split(' ')[0]}` }, s.confidence === 'Chosen by sender' ? 'Item chosen by the sender' : `${s.confidence} confidence`) : null),
        h('div', { class: 'small muted', style: { marginTop: '4px' } }, s.reason),
        s.flag ? h('div', { class: 'flag' }, '⚠ ', s.flag) : null,
        pathLine,
        P.canManageRequests ? h('div', { class: 'row' },
          h('button', { class: 'btn small primary', onclick: () => act(() => api('POST', `api/suggestions/${s.id}/decide`, { decision: 'accept', item_id: Number(pick.value) || null }), 'Accepted and filed.') }, 'Accept'),
          h('button', { class: 'btn small', onclick: returnIt }, 'Return to client…'),
          h('button', { class: 'btn small', onclick: () => act(() => api('POST', `api/suggestions/${s.id}/decide`, { decision: 'dismiss' }), 'Marked as not a match.') }, 'Not a match')) : null);
    };

    const review = pending.length ? h('div', { class: 'card' },
      h('div', { class: 'card-head' }, h('h2', {}, `Client files waiting for review (${pending.length})`)),
      h('div', { class: 'callout' }, h('b', {}, 'Claude\'s future job. '), 'In the real build, Claude reads each attachment, matches it to a request item and flags wrong periods or missing pages. This demo uses simple file-name rules to stand in for Claude. Either way, you decide.'),
      pending.map(suggestionCard)) : null;

    const itemActions = (i) => {
      if (!P.canManageRequests) return '';
      const returnDialog = () => {
        const note = h('textarea', { rows: '3' });
        modal(`Return: ${shortItem(i.text)}`, [h('label', { class: 'field' }, 'What should the client fix?', note)],
          [{ label: 'Return to client', run: () => act(() => api('PATCH', `api/request-items/${i.id}`, { status: 'Returned', note: note.value }), 'Returned. It will be in the next reminder.') }]);
      };
      if (i.status === 'Accepted' || i.status === 'N/A') return h('button', { class: 'btn small', onclick: () => act(() => api('PATCH', `api/request-items/${i.id}`, { status: 'Sent' }), 'Reopened.') }, 'Reopen');
      return h('span', { class: 'nowrap' },
        h('button', { class: 'btn small', onclick: () => act(() => api('PATCH', `api/request-items/${i.id}`, { status: 'Accepted' }), 'Accepted.') }, 'Accept'), ' ',
        i.status !== 'Draft' ? h('button', { class: 'btn small', onclick: returnDialog }, 'Return') : null, ' ',
        h('button', { class: 'btn small', onclick: () => act(() => api('PATCH', `api/request-items/${i.id}`, { status: 'N/A' }), 'Marked not applicable.') }, 'N/A'));
    };

    return [
      h('div', { class: 'kpis' },
        h('div', { class: 'kpi teal' }, h('b', {}, `${counts('Accepted')} of ${live.length}`), h('span', {}, 'Items accepted'),
          h('div', { class: 'progress', style: { marginTop: '6px' } }, h('div', { style: { width: `${live.length ? Math.round((counts('Accepted') / live.length) * 100) : 0}%` } }))),
        h('div', { class: 'kpi' }, h('b', {}, String(counts('Sent'))), h('span', {}, 'Requested, not in yet')),
        h('div', { class: 'kpi navy' }, h('b', {}, String(counts('Returned'))), h('span', {}, 'Returned to client')),
        h('div', { class: 'kpi sky' }, h('b', {}, String(pending.length)), h('span', {}, 'Files to review'))),
      actionsRow,
      review,
      h('div', { class: 'grid split' },
        h('div', { class: 'card' }, h('h2', {}, 'Request items'),
          h('div', { class: 'small muted', style: { marginBottom: '8px' } }, 'Click an item to see its files (with metadata) and the conversation with the client.'),
          table(['#', 'Item', 'Status', 'Activity', ''], d.items.flatMap((i, n) => {
            const docs = d.documents.filter((x) => x.item_id === i.id && x.direction === 'from_client');
            const talk = d.comments.filter((x) => x.item_id === i.id);
            const latest = talk.filter((x) => x.from_client).slice(-1)[0];
            const open = state.expanded.has(i.id);
            const toggle = () => { if (open) state.expanded.delete(i.id); else state.expanded.add(i.id); refresh(); };
            return [
              h('tr', { class: `click${open ? ' open' : ''}`, onclick: toggle, 'aria-expanded': String(open) },
                h('td', {}, String(n + 1)),
                h('td', {}, i.text,
                  i.note && i.status !== 'Accepted' ? h('span', { class: 'sub' }, `Note: ${i.note}`) : null,
                  latest ? h('span', { class: 'sub client-said' }, `${first(latest.author)}: ${latest.kind === 'eta' && latest.eta_date ? `will send by ${fmtDate(latest.eta_date)}. ` : ''}${latest.body.slice(0, 90)}${latest.body.length > 90 ? '…' : ''}`) : null),
                h('td', {}, statusChip(i.status)),
                h('td', { class: 'nowrap small' }, docs.length ? h('span', { class: 'act-badge', title: 'Files' }, `\u{1F4CE} ${docs.length}`) : null, ' ',
                  talk.length ? h('span', { class: 'act-badge', title: 'Comments' }, `\u{1F4AC} ${talk.length}`) : null),
                h('td', { class: 'right', onclick: (ev) => ev.stopPropagation() }, itemActions(i))),
              open ? h('tr', { class: 'detail' }, h('td', { colspan: '5' }, itemDetail(d, i, docs, talk))) : null,
            ];
          }))),
        h('div', {}, questions,
          decided.length ? h('div', { class: 'card' }, h('h2', {}, 'Files already reviewed'),
            h('ul', { class: 'list' }, decided.map((s) => h('li', {}, h('div', { class: 'grow' }, h('b', {}, s.file_name),
              h('div', { class: 'small muted' }, `${s.status}${s.item_text ? ` as "${shortItem(s.item_text)}"` : ''} by ${s.decided_by_name || '–'} · ${fmtStamp(s.decided_at)}`)))))) : null)),
    ];
  }

  /** One request item opened up: its files and its conversation with the client. */
  function itemDetail(d, item, docs, talk) {
    const e = d.engagement; const P = d.permissions;
    return h('div', { class: 'grid two item-detail' },
      h('div', {},
        h('h3', {}, `Files for this item (${docs.length})`),
        docList(docs, { staff: true, empty: 'The client hasn\'t sent a file for this item yet.' }),
        P.canManageRequests ? h('div', { style: { marginTop: '10px' } }, dropZone('Drop a file for this item', async (files, progress) => {
          const out = await uploadFiles(`api/engagements/${e.id}/documents`, files, { 'X-Item-Id': String(item.id) }, progress);
          if (out.uploaded) { toast('Added. It is in the review queue above.'); await refresh(); }
        }, { compact: true, hint: 'For files received by mail or another way' })) : null),
      h('div', {},
        h('h3', {}, 'Conversation with the client'),
        thread(talk, { empty: 'No comments on this item yet.' }),
        composer('Reply to the client about this item, or add an internal note…', async (body, internal) => {
          await act(() => api('POST', `api/engagements/${e.id}/comments`, { body, internal, item_id: item.id }), internal ? 'Internal note added.' : 'Sent. The client sees it on this item in the portal.');
        }, { internalOption: true })));
  }

  function mailList(emails, showClient) {
    if (!emails.length) return h('div', { class: 'empty' }, 'No emails yet.');
    const LABEL = { request: 'Request list', followup: 'Reminder', onboarding: 'Onboarding', handoff: 'Team notice', reply: 'Client reply', outlook: 'From Outlook', portal_invite: 'Portal invite' };
    return emails.map((m) => {
      const body = h('div', { class: 'mail-body hidden' }, m.body, m.attachments ? h('div', {}, m.attachments.split('|').map((a) => h('span', { class: 'attach' }, `\u{1F4CE} ${a}`))) : null);
      const dir = m.status === 'Scheduled' ? ['dir-sched', `Scheduled ${fmtStamp(m.scheduled_for)}`] : m.direction === 'in' ? ['dir-in', 'Received'] : m.direction === 'internal' ? ['dir-internal', 'Internal'] : ['dir-out', 'Sent'];
      return h('div', { class: 'mail-item' },
        h('div', { class: 'mail-head', onclick: () => body.classList.toggle('hidden') },
          h('span', { class: `mail-dir ${dir[0]}` }, dir[1]),
          h('div', { class: 'grow' },
            h('div', { class: 'subj' }, m.subject),
            h('div', { class: 'meta' }, `${LABEL[m.kind] || m.kind} · from ${m.from_addr} · to ${m.to_addrs}${m.cc_addrs ? ` · cc ${m.cc_addrs}` : ''}`),
            showClient ? h('div', { class: 'meta' }, h('a', { href: `#/job/${m.engagement_id}/emails`, onclick: (ev) => ev.stopPropagation() }, `${m.client_name} FY${m.fiscal_year}`)) : null),
          h('span', { class: 'small muted nowrap hide-sm' }, m.status === 'Scheduled' ? '' : fmtStamp(m.at))),
        body);
    });
  }

  /** Every document on the job, both directions, with uploads for staff. */
  function jobDocuments(d) {
    const e = d.engagement; const P = d.permissions;
    const show = h('select', { 'aria-label': 'Which documents' }, [['all', 'All documents'], ['from', 'From the client'], ['to', 'Shared with the client'], ['pending', 'Under review']]
      .map(([v, t]) => h('option', { value: v }, t)));
    const listArea = h('div');
    const draw = () => {
      const list = d.documents.filter((x) => show.value === 'all' || (show.value === 'from' && x.direction === 'from_client')
        || (show.value === 'to' && x.direction === 'to_client') || (show.value === 'pending' && x.status === 'Pending'));
      listArea.replaceChildren(docList(list, { staff: true, showItem: true, empty: 'No documents match.' }));
    };
    show.addEventListener('change', draw);
    draw();
    const upload = (direction) => async (files, progress) => {
      const out = await uploadFiles(`api/engagements/${e.id}/documents`, files, { 'X-Direction': direction }, progress);
      if (out.uploaded) { toast(direction === 'to_client' ? 'Shared. The client can see it in the portal now.' : 'Added to the review queue on the Request list tab.'); await refresh(); }
    };
    const fromClient = d.documents.filter((x) => x.direction === 'from_client');
    return [
      h('div', { class: 'kpis' },
        h('div', { class: 'kpi' }, h('b', {}, String(fromClient.length)), h('span', {}, 'Files from the client')),
        h('div', { class: 'kpi sky' }, h('b', {}, String(fromClient.filter((x) => x.status === 'Pending').length)), h('span', {}, 'Under review')),
        h('div', { class: 'kpi teal' }, h('b', {}, String(fromClient.filter((x) => x.channel === 'portal').length)), h('span', {}, 'Uploaded through the portal')),
        h('div', { class: 'kpi navy' }, h('b', {}, String(d.documents.filter((x) => x.direction === 'to_client').length)), h('span', {}, 'Shared with the client'))),
      P.canManageRequests ? h('div', { class: 'grid two' },
        h('div', { class: 'card' }, h('h2', {}, 'Share a file with the client'),
          h('div', { class: 'small muted', style: { marginBottom: '8px' } }, 'For example a confirmation form to sign or draft statements to review. It appears in their portal right away.'),
          dropZone('Drop a file to share', upload('to_client'))),
        h('div', { class: 'card' }, h('h2', {}, 'Add a file the client sent another way'),
          h('div', { class: 'small muted', style: { marginBottom: '8px' } }, 'Mail, a USB stick or a forwarded email. It goes to the review queue like any other client file.'),
          dropZone('Drop a client file', upload('from_client')))) : null,
      h('div', { class: 'card' }, h('div', { class: 'card-head' }, h('h2', {}, 'All documents'), show),
        h('div', { class: 'small muted', style: { marginBottom: '8px' } }, 'Click a file name to preview it with its full metadata: who sent it, when (to the second), how, its size and a SHA-256 fingerprint that proves it hasn\'t changed.'),
        listArea),
    ];
  }

  /** The general conversation with the client (comments on specific items live on the Request list tab). */
  function jobMessages(d) {
    const e = d.engagement;
    const general = d.comments.filter((c) => !c.item_id);
    return h('div', { class: 'grid split' },
      h('div', { class: 'card' }, h('h2', {}, 'Conversation with the client'),
        h('div', { class: 'small muted', style: { marginBottom: '8px' } }, 'Shared with everyone at the association who uses the portal. Internal notes stay inside Leonardo.'),
        thread(general, { empty: 'No messages yet.' }),
        composer('Write to the client, or add an internal note…', async (body, internal) => {
          await act(() => api('POST', `api/engagements/${e.id}/comments`, { body, internal }), internal ? 'Internal note added.' : 'Sent. The client sees it in the portal.');
        }, { internalOption: true })),
      h('div', { class: 'card' }, h('h2', {}, 'Recent answers on request items'),
        thread(d.comments.filter((c) => c.item_id && c.from_client).slice(-6).reverse().map((c) => ({ ...c, body: `${shortItem((d.items.find((i) => i.id === c.item_id) || { text: '' }).text)}: ${c.body}` })), { empty: 'No client comments on items yet.' })));
  }

  function jobEmails(d) {
    return h('div', { class: 'card' }, h('h2', {}, 'Every email for this job, in one place'),
      h('div', { class: 'callout sim' }, h('b', {}, 'Simulated mailbox. '), 'Partners can open any client and read the full history, whoever the auditor is. In the real build these come from the firm\'s Outlook mailboxes. Click an email to read it.'),
      mailList(d.emails, false));
  }

  function jobHistory(d) {
    const LABEL = { forward: 'Moved', back: 'Sent back', gate: 'Ready to start', rollover: 'Rolled over' };
    const CHIP = { forward: 'st-Sent', back: 'st-Returned', gate: 'st-Accepted', rollover: 'stage-Onboarding' };
    return h('div', { class: 'card' }, h('h2', {}, 'Stage history'),
      h('div', { class: 'small muted', style: { marginBottom: '8px' } }, 'Every move, forward or back, with who did it and when.'),
      h('ul', { class: 'list' }, d.history.slice().reverse().map((x) => h('li', {},
        h('span', { class: `chip ${CHIP[x.direction]}` }, LABEL[x.direction] || x.direction),
        h('div', { class: 'grow' },
          h('div', {}, x.from_stage ? h('span', {}, h('b', {}, x.from_stage), ' → ', h('b', {}, x.to_stage)) : h('span', {}, 'Created in ', h('b', {}, x.to_stage))),
          x.reason ? h('div', { class: 'small' }, `Reason: ${x.reason}`) : null,
          h('div', { class: 'small muted' }, `${x.by_name || 'System (automatic check)'} · ${fmtStamp(x.at)}`))))));
  }

  function jobBilling(d) {
    const b = d.billing; const e = d.engagement;
    const pct = b.fee ? Math.min(100, Math.round((b.paid / b.fee) * 100)) : 0;
    return h('div', { class: 'card' },
      h('div', { class: 'card-head' }, h('h2', {}, 'Billing: running total'),
        b.unbilled > 0 && e.stage !== 'Onboarding' ? h('button', { class: 'btn small', onclick: () => act(() => api('POST', `api/engagements/${e.id}/final-invoice`), 'Final invoice created. It will go in the next QuickBooks export.') }, `Create final invoice (${money2(b.unbilled)})`) : null),
      h('div', { class: 'money-row' },
        h('div', {}, h('b', {}, money2(b.fee)), h('span', {}, 'Engagement fee')), h('div', {}, h('b', {}, money2(b.billed)), h('span', {}, 'Billed')),
        h('div', {}, h('b', {}, money2(b.paid)), h('span', {}, 'Paid')), h('div', {}, h('b', {}, money2(b.balance)), h('span', {}, 'Balance'))),
      h('div', { class: 'progress', style: { marginBottom: '14px' } }, h('div', { style: { width: `${pct}%` } })),
      h('div', { class: 'small muted', style: { marginBottom: '8px' } }, `Retainer is ${e.retainer_pct}% at the start; the balance is billed automatically when the job closes.`),
      table(['Invoice', 'Template', 'Amount ', 'Issued', 'Paid', 'QuickBooks'], b.invoices.map((v) => h('tr', {},
        h('td', {}, h('b', {}, v.number)), h('td', {}, v.template), h('td', { class: 'right' }, money2(v.amount)), h('td', {}, fmtDate(v.issued_at)),
        h('td', {}, v.paid_at ? `✓ ${fmtDate(v.paid_at)}` : h('button', { class: 'btn small', onclick: () => act(() => api('POST', `api/invoices/${v.id}/pay`), 'Payment recorded.') }, 'Record payment (simulated)')),
        h('td', {}, v.batch_id ? `Exported (batch ${v.batch_id})` : 'Not exported yet'))), { empty: 'No invoices yet. The retainer invoice is created when the engagement letter goes out.' }));
  }

  // =====================================================================
  // Follow-ups
  // =====================================================================
  async function pageFollowups() {
    const rows = await api('GET', 'api/follow-ups');
    const days = h('input', { type: 'number', min: '0', value: '7', style: { width: '70px' } });
    const preview = async (r) => {
      try {
        const draft = await api('POST', `api/engagements/${r.id}/follow-up/preview`);
        mailPreview(`Combined reminder for ${r.client_name}`, draft, 'Approve and send', async (subject, body) => {
          await api('POST', `api/engagements/${r.id}/follow-up/send`, { subject, body });
          toast('Reminder sent.');
          await refresh();
        });
      } catch (err) { toast(err.message, true); }
    };
    const sendAll = () => modal('Send routine reminders', [
      h('p', {}, `This sends one combined reminder to each client below that hasn't been emailed in ${days.value} days or more. Each email lists everything still outstanding for that client.`),
      h('div', { class: 'callout sim' }, 'Routine reminders can go without one-by-one approval. Anything beyond a routine reminder still needs a person to approve it.'),
    ], [{ label: 'Send reminders', run: () => act(() => api('POST', 'api/follow-ups/send-all', { min_days: Number(days.value) }), (out) => `${out.sent} reminders sent.`) }]);
    return [
      pageHead('Follow-ups', 'Every job still waiting on client documents, oldest contact first.',
        [h('label', { class: 'check' }, 'Not emailed in', days, 'days'), h('button', { class: 'btn accent', onclick: sendAll }, 'Send routine reminders')]),
      h('div', { class: 'card' }, table(['Client', 'Auditor', 'Items in', 'Outstanding', 'Returned', 'Last emailed', ''], rows.map((r) => h('tr', {},
        h('td', {}, h('a', { href: `#/job/${r.id}/requests` }, h('b', {}, r.client_name)), h('span', { class: 'sub' }, `FY${r.fiscal_year} ${r.job_type} · ${r.location}`)),
        h('td', {}, r.auditor_name), h('td', {}, `${r.accepted_items}/${r.total_items}`), h('td', {}, String(r.open_items)), h('td', {}, String(r.returned_items)),
        h('td', { class: 'nowrap' }, r.last_sent ? `${r.days_since} days ago` : 'Never'),
        h('td', { class: 'right' }, h('button', { class: 'btn small', onclick: () => preview(r) }, 'Preview and send')))), { empty: 'Nothing outstanding. Every client is caught up.' })),
    ];
  }

  // =====================================================================
  // December onboarding
  // =====================================================================
  async function pageOnboarding() {
    const month = h('select', { value: '12' }, MONTH.map((m, i) => h('option', { value: String(i + 1) }, `${m} year-ends`)));
    const typeBoxes = state.meta.jobTypes.map((t) => ({ t, box: h('input', { type: 'checkbox', checked: true }) }));
    const when = h('input', { type: 'datetime-local' });
    const soon = new Date(Date.now() + 2 * 60000);
    when.value = new Date(soon.getTime() - soon.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    const area = h('div');
    const selected = new Set();

    async function load() {
      const types = typeBoxes.filter((x) => x.box.checked).map((x) => x.t).join(',');
      const data = await api('GET', `api/onboarding?month=${month.value}&types=${encodeURIComponent(types)}`);
      selected.clear(); data.rows.forEach((r) => selected.add(r.id));
      const all = h('input', { type: 'checkbox', checked: data.rows.length > 0, 'aria-label': 'Select all', onchange: (ev) => {
        area.querySelectorAll('tbody input[type=checkbox]').forEach((b) => { b.checked = ev.target.checked; });
        data.rows.forEach((r) => (ev.target.checked ? selected.add(r.id) : selected.delete(r.id)));
      } });
      const send = async (scheduled) => {
        const ids = [...selected];
        if (!ids.length) return toast('Pick at least one client.', true);
        modal(scheduled ? 'Schedule onboarding emails' : 'Send onboarding emails now', [
          h('p', {}, `${ids.length} clients will each get their own email with the engagement letter, a retainer invoice and their request list in the body${scheduled ? `, at ${fmtStamp(when.value)}` : ''}.`),
          h('div', { class: 'callout sim' }, h('b', {}, 'Simulated. '), `Sent from ${staffName(3)}'s Outlook mailbox in the real build. Retainer invoices are created now and go out in the next QuickBooks export.`),
        ], [{ label: scheduled ? 'Schedule' : 'Send now', kind: 'accent', run: async () => {
          const out = await api('POST', 'api/onboarding/send', { ids, scheduled_for: scheduled ? when.value : null });
          const ok = out.results.filter((r) => !r.skipped).length;
          toast(scheduled ? `${ok} emails scheduled. They'll send on their own.` : `${ok} onboarding emails sent, each personalized for its client.`);
          await load();
        } }]);
      };
      area.replaceChildren(
        h('div', { class: 'card' },
          h('div', { class: 'card-head' }, h('h2', {}, `${data.rows.length} clients ready for onboarding`),
            h('button', { class: 'btn accent', onclick: () => send(false), disabled: !data.rows.length }, 'Send now'),
            h('span', { class: 'small muted' }, 'or'), when, h('button', { class: 'btn', onclick: () => send(true), disabled: !data.rows.length }, 'Schedule')),
          data.rows.length ? h('div', { class: 'table-wrap' }, h('table', {},
            h('thead', {}, h('tr', {}, h('th', {}, all), ['Client', 'Job', 'Fee', 'Retainer', 'Recipients', 'Items', 'Auditor', ''].map((x) => h('th', {}, x)))),
            h('tbody', {}, data.rows.map((r) => h('tr', {},
              h('td', {}, h('input', { type: 'checkbox', checked: true, 'aria-label': `Select ${r.client_name}`, onchange: (ev) => (ev.target.checked ? selected.add(r.id) : selected.delete(r.id)) })),
              h('td', {}, h('a', { href: `#/job/${r.id}` }, h('b', {}, r.client_name)), h('span', { class: 'sub' }, `FY${r.fiscal_year} · ${r.location}`)),
              h('td', {}, r.job_type), h('td', {}, money(r.fee)), h('td', {}, money2(r.retainer)),
              h('td', { class: 'nowrap' }, `${r.to_count} to, ${r.cc_count} cc`), h('td', {}, String(r.total_items)), h('td', {}, r.auditor_name),
              h('td', {}, h('button', { class: 'btn small', onclick: async () => mailPreview(`Preview: ${r.client_name}`, await api('POST', 'api/onboarding/preview', { id: r.id }), null, null) }, 'Preview'))))))) :
            h('div', { class: 'empty' }, 'No clients match. Try another month or job type, or roll more clients over from the master list.')),
        data.scheduled.length ? h('div', { class: 'card' }, h('h2', {}, 'Scheduled to send'),
          h('ul', { class: 'list' }, data.scheduled.map((m) => h('li', {}, h('div', { class: 'grow' }, h('b', {}, m.client_name), h('div', { class: 'small muted' }, m.subject)),
            h('span', { class: 'chip dir-sched' }, fmtStamp(m.scheduled_for))))),
          h('button', { class: 'btn small', style: { marginTop: '8px' }, onclick: load }, 'Refresh')) : '');
    }
    month.addEventListener('change', load);
    typeBoxes.forEach((x) => x.box.addEventListener('change', load));
    await load();
    return [
      pageHead('December onboarding', 'Bulk sends by year-end and job type. Each client gets one personalized email with the engagement letter, the retainer invoice and the request list in the body.'),
      h('div', { class: 'card' }, h('div', { class: 'filters' }, month, typeBoxes.map((x) => h('label', { class: 'check' }, x.box, x.t)))),
      area,
    ];
  }

  // =====================================================================
  // Billing
  // =====================================================================
  async function pageBilling() {
    const d = await api('GET', 'api/billing');
    const exportNow = () => act(async () => {
      const out = await api('POST', 'api/billing/export');
      window.location.href = `api/billing/batches/${out.batch_id}/csv`;
      return out;
    }, (out) => `${out.count} invoices exported. The QuickBooks import file is downloading.`);
    const open = d.engagements.filter((e) => e.stage !== 'Closed' || e.balance > 0);
    const show = h('select', { 'aria-label': 'Which invoices' }, h('option', { value: 'attention' }, 'New or unpaid'), h('option', { value: 'all' }, 'All invoices'));
    const invoiceArea = h('div');
    const drawInvoices = () => {
      const list = show.value === 'all' ? d.invoices : d.invoices.filter((v) => !v.batch_id || !v.paid_at);
      invoiceArea.replaceChildren(table(['Invoice', 'Client', 'Template', 'Amount ', 'Issued', 'Paid', 'Export'], list.map((v) => h('tr', {},
        h('td', {}, h('b', {}, v.number)), h('td', {}, h('a', { href: `#/job/${v.engagement_id}/billing` }, v.client_name), h('span', { class: 'sub' }, `${v.location} · FY${v.fiscal_year}`)),
        h('td', {}, v.template), h('td', { class: 'right' }, money2(v.amount)), h('td', { class: 'nowrap' }, fmtDate(v.issued_at)),
        h('td', { class: 'nowrap' }, v.paid_at ? `✓ ${fmtDate(v.paid_at)}` : h('button', { class: 'btn small', onclick: () => act(() => api('POST', `api/invoices/${v.id}/pay`), 'Payment recorded.') }, 'Record payment')),
        h('td', {}, v.batch_id ? `Batch ${v.batch_id}` : h('span', { class: 'chip st-Sent' }, 'New')))), { empty: 'Nothing new or unpaid.' }));
    };
    show.addEventListener('change', drawInvoices);
    drawInvoices();
    return [
      pageHead('Billing', 'Retainer billing with a running total for every job, and batch invoices for QuickBooks. No payment processor is required.',
        [h('button', { class: 'btn accent', onclick: exportNow, disabled: !d.unexported }, `Export ${d.unexported} new invoices to QuickBooks`)]),
      h('div', { class: 'kpis' }, d.byLocation.map((l) => h('div', { class: 'kpi' }, h('b', {}, money(l.paid)),
        h('span', {}, `${l.location}: collected of ${money(l.billed)} billed (${money(l.fee)} in fees)`)))),
      h('div', { class: 'callout sim' }, h('b', {}, 'How QuickBooks fits. '), 'The export is a QuickBooks Online invoice import file (CSV) with each office as the QuickBooks location. "Record payment" stands in for payments syncing back from QuickBooks. The real build would use the QuickBooks API for both.'),
      h('div', { class: 'card' }, h('div', { class: 'card-head' }, h('h2', {}, 'Invoices'), show), invoiceArea),
      h('div', { class: 'grid two' },
        h('div', { class: 'card' }, h('h2', {}, 'Running totals: open jobs and unpaid balances'),
          table(['Client', 'Fee ', 'Billed ', 'Paid ', 'Balance '], open.map((e) => h('tr', { class: 'click', onclick: () => go(`#/job/${e.id}/billing`) },
            h('td', {}, h('b', {}, e.client_name), h('span', { class: 'sub' }, `FY${e.fiscal_year} · ${e.stage}`)),
            h('td', { class: 'right' }, money(e.fee)), h('td', { class: 'right' }, money(e.billed)), h('td', { class: 'right' }, money(e.paid)), h('td', { class: 'right' }, h('b', {}, money(e.balance))))))),
        h('div', { class: 'card' }, h('h2', {}, 'QuickBooks export batches'),
          h('ul', { class: 'list' }, d.batches.map((b) => h('li', {}, h('div', { class: 'grow' }, h('b', {}, `Batch ${b.id}`), h('div', { class: 'small muted' }, `${fmtStamp(b.created_at)} · ${b.by_name || ''}`)),
            b.invoice_count ? h('a', { class: 'btn small', href: `api/billing/batches/${b.id}/csv` }, `Download (${b.invoice_count})`) : h('span', { class: 'small muted' }, 'History')))))),
    ];
  }

  // =====================================================================
  // Reports
  // =====================================================================
  async function pageReports() {
    const r = await api('GET', 'api/reports');
    const matrix = (title, data) => {
      const keys = Object.keys(data).sort();
      const max = Math.max(1, ...keys.map((k) => Object.values(data[k]).reduce((a, b) => a + b, 0)));
      return h('div', { class: 'card' }, h('h2', {}, title),
        table(['', ...r.stages, 'Total'], keys.map((k) => {
          const total = Object.values(data[k]).reduce((a, b) => a + b, 0);
          return h('tr', {}, h('td', { class: 'nowrap' }, h('b', {}, k)), r.stages.map((s) => h('td', {}, data[k][s] ? String(data[k][s]) : h('span', { class: 'muted' }, '·'))),
            h('td', {}, h('div', { class: 'bar-cell' }, h('b', {}, String(total)), h('div', { class: 'bar', style: { width: `${Math.round((total / max) * 80)}px` } }))));
        })));
    };
    const BASE = { 'Engagement letter sent to signed': '8 days', 'Retainer invoiced to paid': '22.5 days', 'Draft to final': '7 days' };
    return [
      pageHead('Reports', `${r.openCount} open jobs you can see, across every stage. Everything here comes from the same live data.`),
      h('div', { class: 'kpis' }, r.turnaround.map((t) => h('div', { class: 'kpi teal' }, h('b', {}, t.median === null ? '–' : `${t.median} days`),
        h('span', {}, `${t.label} (median of ${t.n}). Leonardo's sheet today: ${BASE[t.label]}.`)))),
      matrix('Open jobs by office and stage', r.byLocation),
      matrix('Who has it now', r.byOwner), matrix('By auditor', r.byAuditor), matrix('By reviewer', r.byReviewer), matrix('By job type', r.byJobType),
      h('div', { class: 'card' }, h('h2', {}, 'Overdue client items (requested more than 14 days ago)'),
        table(['Client', 'Auditor', 'Request sent', 'Items outstanding'], r.overdue.map((o) => h('tr', { class: 'click', onclick: () => go(`#/job/${o.id}/requests`) },
          h('td', {}, h('b', {}, o.client_name)), h('td', {}, o.auditor_name), h('td', {}, `${fmtDate(o.request_sent)} (${o.days} days)`), h('td', {}, String(o.items)))), { empty: 'Nothing overdue.' })),
      r.fees ? h('div', { class: 'card' }, h('h2', {}, 'Fees by office'),
        table(['Office', 'Year', 'Jobs', 'Fees ', 'Same clients last year ', 'Change ', 'Billed ', 'Collected '], r.fees.map((f) => h('tr', {},
          h('td', {}, h('b', {}, f.location)), h('td', {}, String(f.year)), h('td', {}, String(f.jobs)), h('td', { class: 'right' }, money(f.fee)),
          h('td', { class: 'right' }, money(f.prior_fee)), h('td', { class: 'right' }, f.prior_fee ? `${(((f.fee - f.prior_fee) / f.prior_fee) * 100).toFixed(1)}%` : '–'),
          h('td', { class: 'right' }, money(f.billed)), h('td', { class: 'right' }, money(f.paid)))))) : null,
    ];
  }

  // =====================================================================
  // Outbox, management companies, audit log
  // =====================================================================
  async function pageOutbox() {
    const kind = h('select', {}, [['', 'All emails'], ['request', 'Request lists'], ['followup', 'Reminders'], ['onboarding', 'Onboarding'], ['reply', 'Client replies'], ['outlook', 'From Outlook'], ['portal_invite', 'Portal invites'], ['handoff', 'Team notices']]
      .map(([v, t]) => h('option', { value: v }, t)));
    const list = h('div');
    const load = async () => list.replaceChildren(...[].concat(mailList(await api('GET', `api/emails${kind.value ? `?kind=${kind.value}` : ''}`), true)));
    kind.addEventListener('change', load);
    await load();
    return [
      pageHead('Outbox', 'Every email the system sent, scheduled or captured, for the clients you can see.'),
      h('div', { class: 'callout sim' }, h('b', {}, 'Nothing leaves this computer. '), 'In the real build, emails send from each person\'s own Outlook mailbox, so they look like normal firm email and replies come back to Outlook.'),
      h('div', { class: 'filters' }, kind),
      list,
    ];
  }

  async function pageCompanies() {
    const list = await api('GET', 'api/mgmt-companies');
    return [
      pageHead('Management companies', 'Each company is stored once and linked to every client it manages. Update it here and every linked client shows the change.'),
      h('div', { class: 'grid two' }, list.map((m) => {
        const cn = h('input', { type: 'text', value: m.contact_name || '' });
        const em = h('input', { type: 'email', value: m.email || '' });
        const ph = h('input', { type: 'text', value: m.phone || '' });
        return h('div', { class: 'card' },
          h('div', { class: 'card-head' }, h('h2', {}, m.name), h('span', { class: 'chip st-Sent' }, `${m.clients.length} clients you can see`)),
          isAdmin() ? h('div', { class: 'form-row' }, h('label', { class: 'field' }, 'Contact', cn), h('label', { class: 'field' }, 'Email', em), h('label', { class: 'field' }, 'Phone', ph),
            h('button', { class: 'btn small', onclick: () => act(() => api('PATCH', `api/mgmt-companies/${m.id}`, { contact_name: cn.value, email: em.value, phone: ph.value }), `Saved. All ${m.clients.length} linked clients now show the new details.`) }, 'Save'))
            : h('dl', { class: 'facts' }, h('dt', {}, 'Contact'), h('dd', {}, m.contact_name || '–'), h('dt', {}, 'Email'), h('dd', {}, m.email || '–'), h('dt', {}, 'Phone'), h('dd', {}, m.phone || '–')),
          h('div', { style: { marginTop: '10px' } }, m.clients.map((c) => h('span', { class: 'attach' }, c.name))),
          h('div', { style: { marginTop: '8px' } }, h('a', { href: `#/master?mgmt=${m.id}&open=0` }, 'Show these clients in the master list')));
      })),
    ];
  }

  async function pageAudit() {
    const rows = await api('GET', 'api/audit');
    return [
      pageHead('Audit log', 'Who did what and when: every change and every email, newest first.',
        [h('button', { class: 'btn', onclick: () => modal('Reset the demo data?', [
          h('p', {}, 'This puts every client, file, message, signature and email back to the starting point, for everyone using the demo. Use it after a client demo.'),
          h('div', { class: 'callout sim' }, 'Anything people added (uploads, comments, signatures, rolled-over jobs) will be removed.'),
        ], [{ label: 'Reset demo data', kind: 'accent', run: async () => {
          await api('POST', 'api/admin/reset-demo');
          state.expanded.clear();
          toast('Demo data reset to the starting point.');
          await refresh();
        } }]) }, 'Reset demo data')]),
      h('div', { class: 'card' }, table(['When', 'Who', 'Action', 'Detail'], rows.map((r) => h('tr', {},
        h('td', { class: 'nowrap' }, fmtStamp(r.at)), h('td', {}, r.staff_name || 'System'), h('td', {}, h('b', {}, r.action)), h('td', {}, r.detail || ''))))),
    ];
  }

  // =====================================================================
  // Karbon proof checklist
  // =====================================================================
  const PROOF = [
    ['MC-03', 'Roll over one client at a time', 'Rolled every client at year-end in one batch.', 'Roll over any single client whenever it suits, from August on. Last year\'s job can still be open.',
      'Master list: tick "Due for rollover", find Coral Ridge Townhomes, click Roll over. Kingfisher Lakes shows fiscal 2025 still in Draft while fiscal 2026 is already in Admin.', 'ok'],
    ['MC-06', 'Office location', 'No location field.', 'Boca or Stuart on every client. Filter the master list and reports by office, and it flows to QuickBooks as the location.', 'Master list: filter "All offices" to Stuart. Reports: open jobs by office.', 'ok'],
    ['MC-09', 'Due dates optional', 'Due dates were required at setup.', 'The due date is optional at rollover and can be added or cleared any time.', 'Roll over a client and leave the due date blank, or clear one on a job\'s Overview tab.', 'ok'],
    ['WF-01', 'At least six stages', 'Only four workflow steps.', 'Eight stages: Onboarding, Admin, Auditor, Reviewer, Tax, Draft, Final, Closed. The real build makes them configurable.', 'Open any job: the stage bar shows all eight.', 'ok'],
    ['WF-02', 'Send a job back, with notice', 'Jobs could only move forward.', 'Send back to any earlier stage with a required reason. The receiver gets an email and a task.', 'Sign in as Priya Shah, open Driftwood Key, click Send back. Its History tab already shows one send-back.', 'ok'],
    ['CM-01', 'Email from the firm\'s Outlook', 'Gmail only.', 'Every email is from the person\'s own firm address (for example dana@...), with the request list in the body.', 'Open a job\'s Emails tab, or the Outbox.', 'sim'],
    ['CM-02', 'Two-way Outlook sync, including phones', 'One-way sync only.', 'Client replies and emails sent from Outlook on a phone are captured on the job for the whole team.', 'On a job\'s Request list tab: "Simulate a client reply" and "Simulate an Outlook email from a phone".', 'sim'],
    ['CM-03', 'CC and any number of recipients', 'No CC and a limit on recipients.', 'Heron Bay Master Association has 12 people on every email: 3 to and 9 copied.', 'Onboarding: click Preview next to Heron Bay.', 'ok'],
    ['BL-01', '50/50 retainer with a running total', 'Not supported the way Leonardo bills.', 'Retainer percent per job (50% by default), a live billed, paid and balance total, and the final invoice on close.', 'Open any job\'s Billing tab, or the Billing page.', 'ok'],
    ['BL-02', 'Batch invoices to QuickBooks, several templates', 'QuickBooks batch invoicing stuck in beta.', 'Exports new invoices in one QuickBooks import file, with "Retainer" and "Final balance" templates.', 'Billing: Export new invoices to QuickBooks.', 'ok'],
    ['BL-03', 'Payments sync back, no forced processor', 'Pushed its own payment processor (3% fee).', 'Payments are recorded against the invoice; no processor is involved. The real build reads them from QuickBooks.', 'Billing: Record payment on Starfish Harbor\'s retainer and watch the job move to Admin.', 'sim'],
    ['RP-01', 'Reporting across every stage', 'Limited.', 'Open jobs by office, auditor, reviewer, job type and current owner; turnaround times; overdue items; fees by office.', 'Reports.', 'ok'],
    ['SC-01', 'Auditors see only their own clients', 'Required as a must-have.', 'Enforced by the server. Dana sees 13 of 42 jobs and no fees; asking for anyone else\'s job returns "not found".', 'Switch person to Dana Ruiz and open the master list.', 'ok'],
    ['IN-01', 'Works with Microsoft 365', 'Built around Google.', 'The design assumes Microsoft sign-in, Outlook and SharePoint. The demo shows where each plugs in.', 'Sign-in screen, email previews and the "saved to SharePoint" path on client files.', 'sim'],
  ];
  const LIKED = [
    ['One platform for everyone', 'Every role signs in to the same app.'], ['Daily task lists', 'My day, updated every 15 seconds.'],
    ['Ad hoc tasks', 'Assign a task to anyone and see when it\'s done.'], ['Auditor privacy', 'Enforced on the server.'],
    ['Prerequisite gates', 'Ready-to-start check: letter signed and retainer paid.'], ['Automatic follow-ups', 'One combined reminder per client.'],
    ['Request list in the email body', 'Every request and reminder email.'], ['Attachments saved automatically', 'Filed by year and request item.'],
  ];
  const GAPS = ['Microsoft sign-in with multi-factor authentication', 'Sending and receiving through Outlook (Microsoft Graph)', 'Saving files to SharePoint',
    'QuickBooks API for invoices and payments', 'Claude reading the actual documents (not file names)', 'Importing and cleaning the real Google Sheet',
    'Hosting, backups and monitoring in Leonardo\'s Microsoft tenant', 'Retention policy and legal hold for correspondence', 'Security testing and accessibility review',
    'Client sign-in by one-time email link or code (no passwords), with sessions that expire', 'Virus scanning of every uploaded file', 'Counsel-approved wording for the portal authorization letter'];
  const PORTAL = [
    ['Authorization letter first', 'Each client user reads and signs the portal authorization before anything opens. The signature stores their name, title, time, IP address and a SHA-256 fingerprint of the exact letter, with a signed PDF copy.', 'Sign in as Ray Rasmussen (Mangrove Isle).'],
    ['Real documents with metadata', 'Files are actually uploaded and can be previewed. Each records size, type, page count, the sender\'s "last modified" date, who uploaded it, the exact upload time, the channel and a fingerprint that proves it hasn\'t changed.', 'Sign in as Joyce Dawson (Egret Landing), open the Documents tab, click any file.'],
    ['Answers without files', 'Clients can answer in writing, say an item doesn\'t apply, or promise a date. These show up for the auditor to accept.', 'Egret Landing: the investments and reserve study items.'],
    ['Comments and messages', 'A conversation on each item and a general message thread, shared by the whole board and manager. Staff internal notes never reach the client.', 'Compare the portal\'s Messages tab with Dana\'s Client messages tab.'],
    ['Sharing both ways', 'Leonardo can share forms and drafts; the client downloads, signs and uploads them back.', 'Egret Landing: Bank Confirmation Authorization Form.'],
    ['One review queue', 'Portal uploads, email attachments and files received by mail all land in the auditor\'s review queue with a suggested item and a period check.', 'Upload a file in the portal, then sign in as Dana Ruiz.'],
  ];

  async function pageProof() {
    return [
      pageHead('Karbon checklist', 'The 14 dealbreakers from the Karbon trial, and how to see each one handled in this demo.'),
      h('div', { class: 'callout' }, h('b', {}, 'Working '), 'means the feature runs in this demo as it would in a real build. ', h('b', {}, 'Simulated '),
        'means the behavior is shown, but the connection to Microsoft 365 or QuickBooks is stood in for, because a demo on one laptop can\'t connect to Leonardo\'s real systems.'),
      h('div', { class: 'card proof' }, table(['ID', 'Dealbreaker', 'What went wrong in Karbon', 'How the Practice Hub handles it', 'Try it', 'Status'], PROOF.map((p) => h('tr', {},
        h('td', {}, p[0]), h('td', {}, h('b', {}, p[1])), h('td', {}, p[2]), h('td', {}, p[3]), h('td', { class: 'small' }, p[4]),
        h('td', {}, h('span', { class: `chip ${p[5] === 'ok' ? 'status-ok' : 'status-sim'}` }, p[5] === 'ok' ? 'Working' : 'Simulated')))))),
      h('div', { class: 'grid two' },
        h('div', { class: 'card' }, h('h2', {}, 'What Leonardo liked about Karbon, kept'),
          h('ul', { class: 'list' }, LIKED.map(([a, b]) => h('li', {}, h('span', { class: 'chip status-ok' }, '✓'), h('div', { class: 'grow' }, h('b', {}, a), h('div', { class: 'small muted' }, b)))))),
        h('div', { class: 'card' }, h('h2', {}, 'What a real in-house build would still need'),
          h('div', { class: 'small muted', style: { marginBottom: '6px' } }, 'This is a proof of concept. Before real client data could go in, it would need:'),
          h('ul', { class: 'list' }, GAPS.map((g) => h('li', {}, h('span', { class: 'chip status-sim' }, 'To do'), h('div', { class: 'grow' }, g)))))),
      h('div', { class: 'card proof' }, h('h2', {}, 'Beyond Karbon: the client portal'),
        h('div', { class: 'small muted', style: { marginBottom: '8px' } }, 'A full two-way experience for associations. Email still works for clients who prefer it; the portal is an addition, not a requirement.'),
        table(['Feature', 'How it works', 'Try it'], PORTAL.map((p) => h('tr', {}, h('td', {}, p[0]), h('td', {}, p[1]), h('td', { class: 'small' }, p[2]))))),
    ];
  }

  // =====================================================================
  // Router
  // =====================================================================
  const ROUTES = [
    [/^#\/today$/, 'today', pageToday], [/^#\/master(?:\?(.*))?$/, 'master', pageMaster], [/^#\/job\/(\d+)(?:\/(\w+))?$/, 'master', pageJob],
    [/^#\/followups$/, 'followups', pageFollowups], [/^#\/onboarding$/, 'onboarding', pageOnboarding], [/^#\/billing$/, 'billing', pageBilling],
    [/^#\/reports$/, 'reports', pageReports], [/^#\/outbox$/, 'outbox', pageOutbox], [/^#\/companies$/, 'companies', pageCompanies],
    [/^#\/audit$/, 'audit', pageAudit], [/^#\/proof$/, 'proof', pageProof],
  ];

  async function router(isRefresh) {
    clearInterval(state.timer);
    const hash = location.hash || '#/today';
    if (!state.config) { try { state.config = await api('GET', 'api/client-config'); } catch { state.config = {}; } }
    if (!state.user) {
      // Only ask for app settings once someone is signed in; asking earlier
      // would bounce back to the sign-in page over and over.
      try {
        state.user = await api('GET', 'api/me');
        if (state.user && state.user.kind !== 'client') state.meta = await api('GET', 'api/meta');
      } catch { state.user = null; }
    }
    if (!state.user || hash === '#/login') {
      if (state.user && hash === '#/login') { go(state.user.kind === 'client' ? '#/portal' : '#/today'); return; }
      app.replaceChildren(await pageLogin());
      return;
    }
    // Client contacts only ever see the portal (the server enforces this too).
    if (state.user.kind === 'client') {
      if (!hash.startsWith('#/portal')) { go('#/portal'); return; }
      await window.PortalApp.route(app, hash, isRefresh);
      return;
    }
    if (hash.startsWith('#/portal')) { go('#/today'); return; }
    for (const [re, key, fn] of ROUTES) {
      const m = re.exec(hash);
      if (!m) continue;
      try {
        const content = await fn(...m.slice(1));
        app.replaceChildren(...shell(key, content));
      } catch (e) {
        if (e.status === 401) return;
        app.replaceChildren(...shell(key, [pageHead('Something went wrong'), h('div', { class: 'card' }, e.message, ' ', h('a', { href: '#/today' }, 'Back to My day'))]));
      }
      if (!isRefresh && state.lastHash !== hash) window.scrollTo(0, 0);
      state.lastHash = hash;
      return;
    }
    go('#/today');
  }

  // Share the building blocks with the client portal (web/portal.js).
  window.HubUI = {
    h, api, toast, modal, go, state, fmtDate, fmtStamp, fmtSec, fileSize, first, shortItem,
    docList, docCard, previewDocument, thread, composer, dropZone, uploadFiles,
    signOut: async () => { await api('POST', 'api/logout'); state.user = null; state.meta = null; go('#/login'); },
  };

  // Errors from act() were already shown to the person; don't also log them as unhandled.
  window.addEventListener('unhandledrejection', (ev) => { if (ev.reason && ev.reason.shown) ev.preventDefault(); });
  window.addEventListener('hashchange', () => router());
  router();
})();
