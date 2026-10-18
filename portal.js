'use strict';
/**
 * The client portal: what a board member or community association manager sees.
 *
 * It reuses the building blocks from app.js (window.HubUI) and adds the
 * client's own screens:
 *   1. The authorization letter, which must be signed before anything else opens.
 *   2. Requests: each requested item, where the client can upload files, answer
 *      without a file, say it doesn't apply, give a date, and comment.
 *   3. Messages: a general conversation with the Leonardo team.
 *   4. Documents: every file exchanged, both ways, with full metadata.
 *   5. Authorization: their signed letter and a downloadable signed copy.
 *
 * Everything the client sees comes from the server's /api/portal/... routes,
 * which only ever return this association's data and never internal notes.
 */
(function () {
  const ps = { home: null, engId: null, filter: 'attention', open: new Set() };
  const STATUS_CHIP = { Requested: 'stage-Onboarding', 'Needs another look': 'st-Returned', 'Under review': 'st-Sent', Accepted: 'st-Accepted', 'Not needed': 'st-NA' };
  const ui = () => window.HubUI;

  function topbar(me, clientName) {
    const { h } = ui();
    return h('header', { class: 'topbar portal-top' },
      h('img', { class: 'logo', src: 'leonardo_logo.png', alt: 'Leonardo & Company' }),
      h('div', { class: 'product' }, 'Client Portal'),
      h('div', { class: 'demo-badge' }, 'Demo · made-up data'),
      h('div', { class: 'spacer' }),
      h('div', { class: 'who' }, h('b', {}, me.name), h('span', {}, `${me.title || 'Client'} · ${clientName}`)),
      h('button', { class: 'btn btn-ghost small', onclick: () => ui().signOut() }, 'Sign out'));
  }

  function footer() {
    const { h } = ui();
    return h('footer', { class: 'portal-foot' }, 'Secure client portal · Leonardo & Company, CPAs · Proof of concept: please upload sample files only, never real client documents.');
  }

  // ---------------------------------------------------------------------
  // 1. Authorization letter
  // ---------------------------------------------------------------------
  function letterView(letter, clientName) {
    const { h } = ui();
    return h('div', { class: 'letter' },
      h('div', { class: 'letter-title' }, 'Client Portal Authorization and Electronic Communications Agreement'),
      h('div', { class: 'small muted' }, `Version ${letter.version} (${letter.date}) · ${clientName}`),
      letter.sections.map((s) => [h('h3', {}, s.heading), s.paragraphs.map((p) => h('p', {}, p)),
        s.bullets ? h('ul', {}, s.bullets.map((b) => h('li', {}, b))) : null]));
  }

  function signPage(data) {
    const { h, api, toast } = ui();
    const agree = h('input', { type: 'checkbox', id: 'agree' });
    const authority = h('input', { type: 'checkbox', id: 'authority' });
    const name = h('input', { type: 'text', autocomplete: 'name', placeholder: data.me.name });
    const title = h('input', { type: 'text', value: data.me.title || '' });
    const btn = h('button', { class: 'btn accent', type: 'submit' }, 'Sign electronically');
    const form = h('form', { class: 'sign-form', onsubmit: async (ev) => {
      ev.preventDefault();
      btn.disabled = true;
      try {
        await api('POST', 'api/portal/authorization', { signer_name: name.value, signer_title: title.value, agree: agree.checked, authority: authority.checked });
        toast('Thank you. Your authorization is signed and the portal is open.');
        await route(document.getElementById('app'), '#/portal');
      } catch (e) { toast(e.message, true); } finally { btn.disabled = false; }
    } },
    h('label', { class: 'check' }, agree, 'I have read this agreement and agree to it.'),
    h('label', { class: 'check' }, authority, `I am authorized to sign on behalf of ${data.client.name}.`),
    h('div', { class: 'form-row' },
      h('label', { class: 'field' }, h('span', {}, 'Your full name ', h('span', { class: 'hint' }, '(as Leonardo has it on file)')), name),
      h('label', { class: 'field' }, 'Your title or role', title)),
    h('div', { class: 'small muted' }, 'When you sign, the portal records your name and title, the date and time, your IP address, and a fingerprint of this exact letter, so there is a clear record of what was agreed. You can download a signed copy afterward.'),
    h('div', {}, btn));
    return [
      topbar(data.me, data.client.name),
      h('main', { class: 'portal-main' },
        h('h1', {}, 'Before you start: portal authorization'),
        h('p', { class: 'muted' }, `Leonardo & Company needs a signed authorization before ${data.client.name} can exchange documents and messages through this portal. It takes about two minutes.`),
        h('div', { class: 'callout sim' }, h('b', {}, 'Draft for review. '), data.letter.draft_notice),
        h('div', { class: 'card' }, letterView(data.letter, data.client.name), h('div', { class: 'small muted hash-line' }, `Letter fingerprint (SHA-256): ${data.letter.sha256}`)),
        h('div', { class: 'card' }, h('h2', {}, 'Sign the authorization'), form)),
      footer(),
    ];
  }

  // ---------------------------------------------------------------------
  // 2. Requests
  // ---------------------------------------------------------------------
  const bucket = (s) => (s === 'Requested' || s === 'Needs another look' ? 'attention' : s === 'Under review' ? 'review' : 'done');

  /** Apply a fresh copy of the portal data from the server and redraw. */
  function apply(home) {
    ps.home = home;
    paint();
  }

  function respondDialog(e, item, kind) {
    const { h, api, modal, toast } = ui();
    const text = h('textarea', { rows: '4' });
    const date = h('input', { type: 'date', min: new Date().toLocaleDateString('en-CA') });
    const copy = {
      answer: ['Answer without a file', 'Your answer', 'For example: "The association has no CDs or investment accounts."'],
      not_applicable: ['This doesn\'t apply to us', 'Tell us briefly why', 'For example: "We have no employees; the management company handles all staff."'],
      eta: ['We\'ll send it by…', 'Anything we should know (optional)', 'For example: "The engineer is finishing the reserve study."'],
    }[kind];
    text.placeholder = copy[2];
    modal(copy[0], [
      h('div', { class: 'small muted' }, `#${item.number} ${item.text}`),
      kind === 'eta' ? h('label', { class: 'field' }, 'Date you expect to send it', date) : null,
      h('label', { class: 'field' }, copy[1], text),
      h('div', { class: 'small muted' }, 'Leonardo will review your response and mark the item accepted or ask a follow-up question.'),
    ], [{ label: 'Send', kind: 'accent', run: async () => {
      apply(await api('POST', `api/portal/items/${item.id}/comments`, { kind, body: text.value, eta_date: date.value || null }));
      toast('Sent to Leonardo & Company.');
    } }]);
  }

  function itemCard(e, item) {
    const { h, api, toast, docList, thread, composer, dropZone, uploadFiles } = ui();
    const docs = e.documents.filter((d) => d.item_id === item.id && d.direction === 'from_client');
    const talk = e.comments.filter((c) => c.item_id === item.id);
    const open = ps.open.has(item.id);
    const toggle = () => { if (open) ps.open.delete(item.id); else ps.open.add(item.id); paint(); };
    const lastNote = talk.filter((c) => !c.from_client).slice(-1)[0];
    const eta = talk.filter((c) => c.kind === 'eta' && c.eta_date).slice(-1)[0];
    const canAct = item.client_status !== 'Accepted' && item.client_status !== 'Not needed';
    return h('div', { class: `item-card${open ? ' open' : ''}` },
      h('div', { class: 'item-head', role: 'button', tabindex: '0', 'aria-expanded': String(open), onclick: toggle,
        onkeydown: (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); toggle(); } } },
      h('span', { class: 'item-no' }, `#${item.number}`),
      h('div', { class: 'grow' }, h('div', { class: 'item-text' }, item.text),
        h('div', { class: 'small muted' }, [docs.length ? `${docs.length} file${docs.length === 1 ? '' : 's'}` : 'No files yet', talk.length ? `${talk.length} message${talk.length === 1 ? '' : 's'}` : null,
          eta ? `you said you'd send it by ${ui().fmtDate(eta.eta_date)}` : null].filter(Boolean).join(' · '))),
      h('span', { class: `chip ${STATUS_CHIP[item.client_status]}` }, item.client_status),
      h('span', { class: 'chev', 'aria-hidden': 'true' }, open ? '▴' : '▾')),
    open ? h('div', { class: 'item-body' },
      item.client_status === 'Needs another look' && (item.note || lastNote) ? h('div', { class: 'flag' }, 'From Leonardo: ', item.note || lastNote.body) : null,
      h('div', { class: 'grid two' },
        h('div', {},
          h('h3', {}, 'Your files'),
          docList(docs, { empty: 'Nothing uploaded for this item yet.' }),
          canAct ? h('div', { style: { marginTop: '10px' } }, dropZone('Drag files here', async (files, progress) => {
            const out = await uploadFiles(`api/portal/items/${item.id}/upload`, files, {}, progress);
            if (out.last) { apply(out.last); toast(`${out.uploaded} file${out.uploaded === 1 ? '' : 's'} received. Leonardo will review ${out.uploaded === 1 ? 'it' : 'them'}.`); }
          }, { compact: true })) : null,
          canAct ? h('div', { class: 'respond' }, h('span', { class: 'small muted' }, 'No file to send?'),
            h('button', { class: 'btn small', onclick: () => respondDialog(e, item, 'answer') }, 'Answer without a file'),
            h('button', { class: 'btn small', onclick: () => respondDialog(e, item, 'not_applicable') }, 'Doesn\'t apply to us'),
            h('button', { class: 'btn small', onclick: () => respondDialog(e, item, 'eta') }, 'We\'ll send it by…')) : null),
        h('div', {},
          h('h3', {}, 'Comments'),
          thread(talk, { empty: 'No comments yet. Ask a question or add context here.' }),
          composer('Add a comment about this item…', async (body) => {
            apply(await api('POST', `api/portal/items/${item.id}/comments`, { kind: 'comment', body }));
            toast('Comment sent.');
          }, { hint: 'Everyone at Leonardo working on your audit will see this.' })))) : null);
  }

  function requestsTab(e) {
    const { h, dropZone, uploadFiles, toast } = ui();
    const counts = { attention: 0, review: 0, done: 0 };
    e.items.forEach((i) => { counts[bucket(i.client_status)] += 1; });
    // An item the client has open stays on screen even after its status changes
    // (for example, right after an upload moves it to "Under review").
    const shown = e.items.filter((i) => ps.filter === 'all' || bucket(i.client_status) === ps.filter || ps.open.has(i.id));
    const seg = (key, label) => h('button', { class: ps.filter === key ? 'on' : null, onclick: () => { ps.filter = key; ps.open.clear(); paint(); } }, label);
    return [
      h('div', { class: 'filters' }, h('div', { class: 'seg' },
        seg('attention', `Needs your attention (${counts.attention})`), seg('review', `Under review (${counts.review})`), seg('done', `Accepted (${counts.done})`), seg('all', `All (${e.items.length})`))),
      shown.length ? shown.map((i) => itemCard(e, i)) : h('div', { class: 'card empty' }, ps.filter === 'attention' ? 'Nothing needs your attention right now. Thank you!' : 'Nothing here.'),
      h('div', { class: 'card' }, h('h2', {}, 'Not sure which item a file belongs to?'),
        h('div', { class: 'small muted', style: { marginBottom: '8px' } }, 'Upload it here and Leonardo will file it under the right item.'),
        dropZone('Drag files here', async (files, progress) => {
          const out = await uploadFiles(`api/portal/engagements/${e.id}/upload`, files, {}, progress);
          if (out.last) { apply(out.last); toast('Received. Leonardo will file it under the right item.'); }
        })),
    ];
  }

  // ---------------------------------------------------------------------
  // 3-5. Messages, documents, authorization
  // ---------------------------------------------------------------------
  function messagesTab(e) {
    const { h, api, toast, thread, composer } = ui();
    return h('div', { class: 'card' }, h('h2', {}, 'Messages with Leonardo & Company'),
      h('div', { class: 'small muted', style: { marginBottom: '8px' } }, `For general questions about the fiscal ${e.fiscal_year} ${e.job_type.toLowerCase()}. Questions about a specific item are best asked on that item.`),
      thread(e.comments.filter((c) => !c.item_id), { empty: 'No messages yet.' }),
      composer('Write a message…', async (body) => {
        apply(await api('POST', `api/portal/engagements/${e.id}/messages`, { body }));
        toast('Message sent.');
      }, { hint: `Goes to ${e.auditor_name} and the team on your audit.` }));
  }

  function documentsTab(e) {
    const { h, docList } = ui();
    const fromLeo = e.documents.filter((d) => d.direction === 'to_client');
    const fromYou = e.documents.filter((d) => d.direction === 'from_client');
    return [
      h('div', { class: 'card' }, h('h2', {}, `From Leonardo & Company (${fromLeo.length})`),
        h('div', { class: 'small muted', style: { marginBottom: '8px' } }, 'Forms to sign, drafts to review and copies for your records.'),
        docList(fromLeo, { empty: 'Nothing shared with you yet.' })),
      h('div', { class: 'card' }, h('h2', {}, `Sent by your association (${fromYou.length})`),
        h('div', { class: 'small muted', style: { marginBottom: '8px' } }, 'Everything your board and manager have sent, with when it arrived and who sent it. Click a name to preview it.'),
        docList(fromYou, { showItem: true, empty: 'Nothing uploaded yet.' })),
    ];
  }

  function authorizationTab() {
    const { h, fmtSec } = ui();
    const a = ps.home.authorization;
    return h('div', { class: 'card' }, h('h2', {}, 'Your portal authorization'),
      h('dl', { class: 'facts' },
        h('dt', {}, 'Signed by'), h('dd', {}, `${a.signer_name}, ${a.signer_title}`),
        h('dt', {}, 'For'), h('dd', {}, ps.home.client.name),
        h('dt', {}, 'Signed'), h('dd', {}, fmtSec(a.signed_at)),
        h('dt', {}, 'Letter version'), h('dd', {}, a.letter_version),
        h('dt', {}, 'Fingerprint'), h('dd', {}, h('code', { class: 'hash' }, a.letter_sha256))),
      h('a', { class: 'btn primary', style: { marginTop: '14px', display: 'inline-block' }, href: 'api/portal/authorization/pdf', target: '_blank', rel: 'noopener' }, 'View signed copy (PDF)'),
      h('div', { class: 'small muted', style: { marginTop: '10px' } }, 'To withdraw this authorization or change who can use the portal for your association, write to Leonardo & Company.'));
  }

  // ---------------------------------------------------------------------
  // Page assembly
  // ---------------------------------------------------------------------
  let currentTab = 'requests';

  function paint() {
    const { h, fmtDate } = ui();
    const home = ps.home;
    const app = document.getElementById('app');
    const e = home.engagements.find((x) => x.id === ps.engId) || home.engagements[0];
    let content;
    if (!e) {
      content = [h('h1', {}, `Welcome, ${home.me.name.split(' ')[0]}`), h('div', { class: 'card empty' }, 'Nothing has been requested yet. When Leonardo & Company sends your request list, it will appear here.')];
    } else {
      ps.engId = e.id;
      const accepted = e.items.filter((i) => i.client_status === 'Accepted' || i.client_status === 'Not needed').length;
      const pct = e.items.length ? Math.round((accepted / e.items.length) * 100) : 0;
      const attention = e.items.filter((i) => bucket(i.client_status) === 'attention').length;
      const tabs = [['requests', `Requests${attention ? ` (${attention} to do)` : ''}`], ['messages', `Messages (${e.comments.filter((c) => !c.item_id).length})`],
        ['documents', `Documents (${e.documents.length})`], ['authorization', 'Authorization']];
      const body = currentTab === 'messages' ? messagesTab(e) : currentTab === 'documents' ? documentsTab(e) : currentTab === 'authorization' ? authorizationTab() : requestsTab(e);
      content = [
        h('div', { class: 'page-head' }, h('div', { class: 'titles' },
          h('h1', {}, `Welcome, ${home.me.name.split(' ')[0]}`),
          h('div', { class: 'muted' }, `${home.client.name} · Fiscal ${e.fiscal_year} ${e.job_type.toLowerCase()} · year-end ${e.year_end}`)),
        home.engagements.length > 1 ? h('select', { 'aria-label': 'Engagement', value: String(e.id), onchange: (ev) => { ps.engId = Number(ev.target.value); paint(); } },
          home.engagements.map((x) => h('option', { value: String(x.id) }, `Fiscal ${x.fiscal_year} ${x.job_type}`))) : null),
        h('div', { class: 'card portal-summary' },
          h('div', { class: 'grow' },
            h('div', { class: 'small muted' }, 'Where things stand'),
            h('div', { class: 'status-line' }, e.progress),
            h('div', { class: 'progress', style: { margin: '8px 0 4px' } }, h('div', { style: { width: `${pct}%` } })),
            h('div', { class: 'small' }, `${accepted} of ${e.items.length} items complete${e.request_sent ? ` · requested ${fmtDate(e.request_sent)}` : ''}`)),
          h('div', { class: 'contact-box' }, h('div', { class: 'small muted' }, 'Your auditor'), h('b', {}, e.auditor_name), h('div', { class: 'small' }, e.auditor_email))),
        h('nav', { class: 'tabs' }, tabs.map(([k, label]) => h('a', { href: `#/portal/${k}`, class: k === currentTab ? 'active' : null }, label))),
        body,
      ];
    }
    const y = window.scrollY;
    app.replaceChildren(topbar(home.me, home.client.name), h('main', { class: 'portal-main' }, content), footer());
    window.scrollTo(0, y);
  }

  /**
   * Draw the portal for the current address (#/portal, #/portal/messages, ...).
   * Shows the authorization letter first if this person hasn't signed it yet.
   */
  async function route(app, hash) {
    const { api, h } = ui();
    try {
      const me = await api('GET', 'api/portal/me');
      if (!me.authorization) { app.replaceChildren(...signPage(me)); window.scrollTo(0, 0); return; }
      const tab = (hash.split('/')[2] || 'requests');
      const changedTab = tab !== currentTab;
      currentTab = ['requests', 'messages', 'documents', 'authorization'].includes(tab) ? tab : 'requests';
      ps.home = await api('GET', 'api/portal/home');
      // The first time the page loads, open any item Leonardo sent back, so it's seen right away.
      if (!ps.started) {
        ps.started = true;
        for (const e of ps.home.engagements) e.items.filter((i) => i.client_status === 'Needs another look').forEach((i) => ps.open.add(i.id));
      }
      paint();
      if (changedTab) window.scrollTo(0, 0);
    } catch (e) {
      if (e.status === 401) return;
      app.replaceChildren(h('main', { class: 'portal-main' }, h('div', { class: 'card' }, e.message)));
    }
  }

  window.PortalApp = { route };
})();
