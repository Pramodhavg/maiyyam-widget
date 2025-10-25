(function () {
  const TAG = '[Maiyyam]';

  // ---- SETTINGS ----
  const WEBHOOK_URL = 'https://aiagent61999.app.n8n.cloud/webhook/afe2bd8b-6f8c-4e2e-b296-941cc86422b8/chat';
  const LOGO_URL    = 'https://dme2wmiz2suov.cloudfront.net/Institution(3815)/Logo/2642439-Group_21.png';
  const PFX = 'maiy-';

  // ---- SAFE HELPERS ----
  function onReady(fn){ (document.readyState === 'loading') ? document.addEventListener('DOMContentLoaded', fn) : fn(); }
  function $(id){ return document.getElementById(id); }
  function log(){ try{ console.log(TAG, ...arguments); }catch{} }
  function warn(){ try{ console.warn(TAG, ...arguments); }catch{} }
  function err(){ try{ console.error(TAG, ...arguments); }catch{} }

  // ---- STYLES ----
  const styleText = `
  :root{
    --maiy-brand:#d9346d; --maiy-text:#e5e7eb; --maiy-muted:#1f2937; --maiy-bg:#0b0f14; --maiy-panel:#ffffff;
    --maiy-radius:16px; --maiy-shadow:0 18px 50px rgba(0,0,0,.18);
    --maiy-w:400px; --maiy-wm:calc(100vw - 32px); --maiy-h:60vh; --maiy-bubblew:82%;
    --maiy-font:"Inter","Poppins","Helvetica Neue",Arial,sans-serif;
  }
  #${PFX}root{ font-family:var(--maiy-font); }
  #${PFX}launcher{ position:fixed; right:22px; bottom:22px; width:60px;height:60px;border-radius:50%;
    background:var(--maiy-brand); box-shadow:var(--maiy-shadow); display:grid; place-items:center; cursor:pointer; color:#fff; border:none; z-index:100000; }
  #${PFX}launcher svg{ width:28px;height:28px; display:block; }
  #${PFX}launcher[aria-expanded="true"] .${PFX}icon-open{ display:none; }
  #${PFX}launcher[aria-expanded="false"] .${PFX}icon-close{ display:none; }

  #${PFX}hint{ position:fixed; bottom:92px; z-index:120000; left: var(--maiy-hint-left,0px); transform: translateX(-50%);
    background:#0f172a; color:#fff; font-size:14px; padding:10px 30px 10px 12px; border-radius:12px;
    box-shadow:var(--maiy-shadow); display:none; max-width:calc(100vw - 120px); white-space:nowrap; }
  #${PFX}hint.${PFX}show{ display:block; animation:${PFX}fadein .22s ease-out; }
  #${PFX}hint::after{ content:""; position:absolute; left:50%; transform:translateX(-50%);
    bottom:-8px; border-left:8px solid transparent; border-right:8px solid transparent; border-top:8px solid #0f172a; }
  #${PFX}hint button{ position:absolute; right:6px; top:4px; width:20px; height:20px; border-radius:50%; background:#111827; color:#fff; border:1px solid #374151;
    font-size:14px; line-height:18px; cursor:pointer; }
  @keyframes ${PFX}fadein{ from{opacity:0; transform:translateX(-50%) translateY(4px);} to{opacity:1; transform:translateX(-50%) translateY(0);} }

  #${PFX}panel{ position:fixed; right:22px; bottom:92px; width:var(--maiy-w); max-width:var(--maiy-w); background:var(--maiy-panel);
    border-radius:var(--maiy-radius); box-shadow:var(--maiy-shadow); overflow:hidden; display:none; flex-direction:column; contain:content; z-index:110000; border:1px solid #f1f5f9; }
  #${PFX}panel.${PFX}open{ display:flex; }
  @media (max-width:520px){ #${PFX}panel{ width:var(--maiy-wm); max-width:var(--maiy-wm); right:16px; left:16px; } }

  #${PFX}header{ background:var(--maiy-brand); color:#fff; height:56px; padding:8px 12px; display:flex; align-items:center; }
  #${PFX}header img{ height:30px; object-fit:contain; }
  .${PFX}spacer{ flex:1; }
  #${PFX}kebab{ width:34px; height:34px; border-radius:8px; border:none; color:#fff; background:rgba(255,255,255,.16); cursor:pointer; display:grid; place-items:center; }
  #${PFX}kebab svg{ width:18px; height:18px; }
  #${PFX}menu{ position:absolute; right:16px; top:56px; background:#1f2937; color:#e5e7eb; border-radius:12px; padding:6px; box-shadow:var(--maiy-shadow); display:none; z-index:130000; width:220px; }
  #${PFX}menu.${PFX}open{ display:block; }
  .${PFX}menu-item{ display:flex; gap:10px; align-items:center; padding:10px; border-radius:8px; cursor:pointer; }
  .${PFX}menu-item:hover{ background:#374151; }
  .${PFX}menu-hr{ height:1px; background:#374151; margin:4px 6px; }

  #${PFX}body{ height:var(--maiy-h); max-height:var(--maiy-h); overflow:auto; padding:16px; background:var(--maiy-bg); color:var(--maiy-text); }

  .${PFX}row{ display:flex; gap:10px; margin:12px 0; }
  .${PFX}row.${PFX}bot{ justify-content:flex-start; }
  .${PFX}row.${PFX}user{ justify-content:flex-end; }
  .${PFX}avatar{ width:30px;height:30px; border-radius:50%; overflow:hidden; flex:0 0 auto; display:none; background:#fff; border:1px solid #e5e7eb; }
  .${PFX}row.${PFX}bot .${PFX}avatar{ display:block; }
  .${PFX}avatar img{ width:100%; height:100%; object-fit:contain; padding:2px; }
  .${PFX}content{ max-width:var(--maiy-bubblew); }
  .${PFX}name{ font-size:12px; font-weight:700; color:#9ca3af; margin:0 0 4px 6px; }
  .${PFX}bubble{ padding:12px 14px; border-radius:14px; line-height:1.45; font-size:14px; box-shadow:0 1px 0 rgba(0,0,0,.25); word-wrap:break-word; white-space:pre-wrap; }
  .${PFX}bot .${PFX}bubble{ background:#111f2c; color:#dbeafe; border-top-left-radius:8px; }
  .${PFX}user .${PFX}bubble{ background:var(--maiy-brand); color:#fff; border-top-right-radius:8px; }

  .${PFX}typing{ display:inline-flex; gap:4px; align-items:center; }
  .${PFX}dot{ width:6px; height:6px; border-radius:50%; background:#9ca3af; opacity:.4; animation:${PFX}blink 1s infinite; }
  .${PFX}dot:nth-child(2){ animation-delay:.15s; } .${PFX}dot:nth-child(3){ animation-delay:.3s; }
  @keyframes ${PFX}blink{ 0%,100%{opacity:.2} 50%{opacity:1} }

  #${PFX}form{ display:flex; gap:8px; padding:12px; border-top:1px solid #111827; background:var(--maiy-bg); }
  #${PFX}input{ flex:1; padding:12px 14px; border:2px solid var(--maiy-brand); border-radius:12px; font-size:14px; font-family:var(--maiy-font); background:#0f172a; color:#fff; }
  #${PFX}input::placeholder{ color:#cbd5e1; }
  #${PFX}input:disabled{ opacity:.6; cursor:not-allowed; }
  #${PFX}sendBtn{ background:var(--maiy-brand); color:#fff; border:none; padding:0 16px; border-radius:12px; cursor:pointer; font-weight:700; display:grid; place-items:center; }
  #${PFX}sendBtn[disabled]{ opacity:.6; cursor:not-allowed; }
  #${PFX}sendBtn svg{ width:18px; height:18px; display:block; }
  .${PFX}spinner{ width:18px; height:18px; border:2px solid rgba(255,255,255,.5); border-top-color:#fff; border-radius:50%; animation:${PFX}spin 0.8s linear infinite; }
  @keyframes ${PFX}spin{ to{ transform:rotate(360deg);} }

  #${PFX}modal{ position:fixed; inset:0; background:rgba(0,0,0,.5); display:none; align-items:center; justify-content:center; z-index:200000; }
  #${PFX}modal.${PFX}open{ display:flex; }
  .${PFX}modal-card{ width:min(520px, 92vw); background:#111827; color:#e5e7eb; border-radius:14px; box-shadow:var(--maiy-shadow); padding:14px; }
  .${PFX}modal-h{ font-weight:800; margin:4px 0 10px 2px; }
  .${PFX}list{ max-height:50vh; overflow:auto; margin-top:8px; }
  .${PFX}conv{ display:flex; justify-content:space-between; align-items:center; padding:10px; border-radius:10px; }
  .${PFX}conv:nth-child(odd){ background:#1f2937; }
  .${PFX}left{ display:flex; flex-direction:column; gap:6px; }
  .${PFX}title{ font-weight:700; }
  .${PFX}meta{ font-size:12px; color:#9ca3af; }
  .${PFX}actions{ display:flex; gap:8px; }
  .${PFX}btn{ background:#374151; color:#e5e7eb; border:none; padding:6px 10px; border-radius:8px; cursor:pointer; }
  .${PFX}btn:hover{ background:#4b5563; }

  .${PFX}poll{ background:#0b1220; border:1px solid #1f2a44; border-radius:14px; padding:14px; margin-top:6px; }
  .${PFX}poll-title{ font-weight:700; margin:4px 6px 10px; color:#cfe3ff; }
  .${PFX}poll-btn{ width:100%; text-align:left; background:#122034; color:#e5edff; border:1px solid #20324f; border-radius:12px; padding:12px 14px; margin:10px 0; cursor:pointer; font:inherit; }
  .${PFX}poll-btn:hover{ background:#162742; }
  `;

  const html = `
    <button id="${PFX}launcher" aria-label="Open chat" aria-expanded="false">
      <svg class="${PFX}icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-width="2" d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z"/></svg>
      <svg class="${PFX}icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-width="2" d="M6 6l12 12M18 6l-12 12"/></svg>
    </button>

    <div id="${PFX}hint">Hi there! Need clarity?
      <button id="${PFX}hintClose" aria-label="Hide">×</button>
    </div>

    <div id="${PFX}panel" aria-live="polite">
      <div id="${PFX}header">
        <img src="${LOGO_URL}" alt="Maiyyam logo"/>
        <div class="${PFX}spacer"></div>
        <button id="${PFX}kebab" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
        </button>
        <div id="${PFX}menu">
          <div class="${PFX}menu-item" id="${PFX}newConv">➕ New Conversation</div>
          <div class="${PFX}menu-hr"></div>
          <div class="${PFX}menu-item" id="${PFX}openPrev">💬 Previous Conversations</div>
        </div>
      </div>

      <div id="${PFX}body"></div>

      <form id="${PFX}form">
        <input id="${PFX}input" placeholder="Type your message..." autocomplete="off"/>
        <button type="submit" id="${PFX}sendBtn" aria-label="Send message">
          <svg id="${PFX}sendIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" d="M22 2L11 13" />
            <path stroke-width="2" d="M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </form>
    </div>

    <div id="${PFX}modal" role="dialog" aria-modal="true">
      <div class="${PFX}modal-card">
        <div class="${PFX}modal-h">Previous Conversations</div>
        <div class="${PFX}list" id="${PFX}convList"></div>
        <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:10px;">
          <button class="${PFX}btn" id="${PFX}clearAll">Clear All</button>
          <button class="${PFX}btn" id="${PFX}closeModal">Close</button>
        </div>
      </div>
    </div>
  `;

  // ---- BOOT ----
  onReady(() => {
    try {
      log('boot start');

      // root
      const root = document.createElement('div');
      root.id = ${PFX}root;
      document.body.appendChild(root);

      // style
      const style = document.createElement('style');
      style.textContent = styleText;
      document.head.appendChild(style);

      // html
      root.innerHTML = html;

      // refs
      const panel        = $(${PFX}panel);
      const launcher     = $(${PFX}launcher);
      const hint         = $(${PFX}hint);
      const hintClose    = $(${PFX}hintClose);
      const bodyEl       = $(${PFX}body);
      const form         = $(${PFX}form);
      const input        = $(${PFX}input);
      const sendBtn      = $(${PFX}sendBtn);
      const sendIcon     = $(${PFX}sendIcon);
      const kebab        = $(${PFX}kebab);
      const menu         = $(${PFX}menu);
      const newConvBtn   = $(${PFX}newConv);
      const openPrevBtn  = $(${PFX}openPrev);
      const prevModal    = $(${PFX}modal);
      const convList     = $(${PFX}convList);
      const clearAllBtn  = $(${PFX}clearAll);
      const closeModalBtn= $(${PFX}closeModal);

      if (!panel || !launcher || !form || !input) {
        throw new Error('essential nodes missing');
      }

      // state
      const STORE_KEY = 'maiyyam_conversations_v1';
      const PERSIST   = true;
      let conversations = loadConversations();
      let currentId  = startOrResume();
      let sessionId  = makeSessionId();
      let waiting = false, hintTimer = null;

      // confirmation detector & handoff
      const CONFIRM_RE = /your counselling appointment is confirmed/i;
      const HANDOFF_DELAY_MS = 1500;
      let handoffScheduled = false;

      function makeSessionId(){ return (globalThis.crypto?.randomUUID?.() ?? String(Date.now())) + '-' + Math.random().toString(36).slice(2,7); }
      function loadConversations(){ if(!PERSIST) return {}; try{ return JSON.parse(localStorage.getItem(STORE_KEY)||'{}'); }catch{ return {}; } }
      function saveConversations(){ if(!PERSIST) return; localStorage.setItem(STORE_KEY, JSON.stringify(conversations)); }

      function startOrResume(){
        const ids = Object.keys(conversations);
        if (ids.length) return ids[ids.length-1];
        const id = String(Date.now());
        conversations[id] = { id, title:'Conversation', createdAt:Date.now(), messages:[{role:'bot', text:'Welcome to Maiyyam. How can we help you?', t:Date.now()}] };
        saveConversations(); return id;
      }
      function startNew(){
        const id = String(Date.now());
        conversations[id] = { id, title:'Conversation', createdAt:Date.now(), messages:[{role:'bot', text:'Welcome to Maiyyam. How can we help you?', t:Date.now()}] };
        saveConversations(); currentId = id; sessionId = makeSessionId(); renderMessages(true);
      }

      // UI helpers
      function push(role,text){ conversations[currentId].messages.push({role,text,t:Date.now()}); saveConversations(); }
      function renderMessages(fresh=false){
        bodyEl.innerHTML = '';
        const msgs = conversations[currentId]?.messages || [];
        for(const m of msgs){ (m.role==='user') ? addUser(m.text,false) : addBot(m.text,false); }
        if (!msgs.length && fresh===false){ addBot('Welcome to Maiyyam. How can we help you?', true, false); }
        bodyEl.scrollTop = bodyEl.scrollHeight;
      }
      function addBot(text, store=true, scroll=true){
        const row = document.createElement('div');
        row.className = ${PFX}row ${PFX}bot;
        row.innerHTML = `
          <div class="${PFX}avatar"><img src="${LOGO_URL}" alt="Maiyyam Assistant"/></div>
          <div class="${PFX}content">
            <div class="${PFX}name">Maiyyam Assistant</div>
            <div class="${PFX}bubble">${text}</div>
          </div>`;
        bodyEl.appendChild(row);
        if (scroll) bodyEl.scrollTop = bodyEl.scrollHeight;
        if (store) push('bot', text);
        if (CONFIRM_RE.test(text)) scheduleHandoff();
      }
      function addUser(text, store=true){
        const row = document.createElement('div');
        row.className = ${PFX}row ${PFX}user;
        row.innerHTML = <div class="${PFX}content"><div class="${PFX}bubble">${text}</div></div>;
        bodyEl.appendChild(row);
        bodyEl.scrollTop = bodyEl.scrollHeight;
        if (store) push('user', text);
      }
      function addTyping(){
        const row = document.createElement('div');
        row.className = ${PFX}row ${PFX}bot;
        row.innerHTML = `
          <div class="${PFX}avatar"><img src="${LOGO_URL}" alt=""/></div>
          <div class="${PFX}content">
            <div class="${PFX}name" style="visibility:hidden;">.</div>
            <div class="${PFX}bubble"><span class="${PFX}typing"><span class="${PFX}dot"></span><span class="${PFX}dot"></span><span class="${PFX}dot"></span></span></div>
          </div>`;
        bodyEl.appendChild(row);
        bodyEl.scrollTop = bodyEl.scrollHeight;
        return () => row.remove();
      }
      function addSlotPoll(slots){
        const row = document.createElement('div'); row.className = ${PFX}row ${PFX}bot;
        const buttons = slots.map(s => {
          const label = s.readable || s.start_local || s.start_rfc3339 || '';
          return <button class="${PFX}poll-btn" data-slot="${encodeURIComponent(label)}">${label}</button>;
        }).join('');
        row.innerHTML = `
          <div class="${PFX}avatar"><img src="${LOGO_URL}" alt=""/></div>
          <div class="${PFX}content" style="max-width:100%;">
            <div class="${PFX}poll">
              <div class="${PFX}poll-title">Select any of these</div>
              ${buttons}
              <button class="${PFX}poll-btn" data-propose="1">Propose different date and time</button>
            </div>
          </div>`;
        bodyEl.appendChild(row); bodyEl.scrollTop = bodyEl.scrollHeight;
        row.addEventListener('click', (e)=>{
          const btn = e.target.closest('button'); if(!btn) return;
          if (btn.dataset.propose){ sendDirect('Propose different date and time'); row.querySelectorAll('button').forEach(b=>b.disabled=true); return; }
          const label = decodeURIComponent(btn.dataset.slot || ''); sendDirect(label); row.querySelectorAll('button').forEach(b=>b.disabled=true);
        });
      }

      // hint positioning
      function positionHint(){
        const r = launcher.getBoundingClientRect();
        const pad = 16;
        let cx = r.left + r.width/2;
        cx = Math.max(pad, Math.min(cx, window.innerWidth - pad));
        hint.style.setProperty('--maiy-hint-left', cx + 'px');
      }
      window.addEventListener('resize', positionHint);
      window.addEventListener('scroll', positionHint, true);
      function showHintDelayed(){
        if (panel.classList.contains(${PFX}open)) return;
        clearTimeout(hintTimer);
        hintTimer = setTimeout(()=>{ positionHint(); hint.classList.add(${PFX}show); }, 2000);
      }
      function hideHint(){ hint.classList.remove(${PFX}show); clearTimeout(hintTimer); }

      // panel/menu wiring
      function togglePanel(open){
        const isOpen = open ?? !panel.classList.contains(${PFX}open);
        panel.classList.toggle(${PFX}open, isOpen);
        launcher.setAttribute('aria-expanded', String(isOpen));
        menu.classList.remove(${PFX}open);
        if (isOpen){ hideHint(); renderMessages(true); input.focus(); }
        else { showHintDelayed(); }
      }

      launcher.addEventListener('click', ()=> togglePanel());
      document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape' && panel.classList.contains(${PFX}open)) togglePanel(false); });
      kebab.addEventListener('click', (e)=>{ e.stopPropagation(); menu.classList.toggle(${PFX}open); });
      document.addEventListener('click', ()=> menu.classList.remove(${PFX}open));
      newConvBtn.addEventListener('click', ()=>{ startNew(); menu.classList.remove(${PFX}open); input.focus(); });
      openPrevBtn.addEventListener('click', ()=>{ menu.classList.remove(${PFX}open); openPrevModal(); });
      input.addEventListener('keydown', (e)=>{ if (waiting && (e.key === 'Enter' || e.key.length === 1)) e.preventDefault(); });
      hintClose.addEventListener('click', ()=>{ hideHint(); });

      // previous conv modal
      function openPrevModal(){
        convList.innerHTML = '';
        const ids = Object.keys(conversations);
        if (!ids.length){
          convList.innerHTML = <div class="${PFX}meta" style="padding:10px;">No conversations yet.</div>;
        } else {
          for (const id of ids){
            const c = conversations[id];
            const first = c.messages.find(m=>m.text)?.text ?? '';
            const date = new Date(c.createdAt).toLocaleString();
            const el = document.createElement('div'); el.className = ${PFX}conv;
            el.innerHTML = `
              <div class="${PFX}left">
                <div class="${PFX}title">${c.title}</div>
                <div class="${PFX}meta">${date}${first ? ' — ' + first.slice(0,40)+'…' : ''}</div>
              </div>
              <div class="${PFX}actions">
                <button class="${PFX}btn" data-act="load" data-id="${id}">Open</button>
                <button class="${PFX}btn" data-act="del" data-id="${id}">Delete</button>
              </div>`;
            convList.appendChild(el);
          }
        }
        prevModal.classList.add(${PFX}open);
      }
      convList.addEventListener('click', (e)=>{
        const btn = e.target.closest('button'); if(!btn) return;
        const id = btn.dataset.id, act = btn.dataset.act;
        if (act === 'load'){ currentId = id; renderMessages(true); prevModal.classList.remove(${PFX}open); togglePanel(true); }
        else if (act === 'del'){ delete conversations[id]; saveConversations(); openPrevModal();
          if (id === currentId){ const ids = Object.keys(conversations); currentId = ids[ids.length-1] || startOrResume(); renderMessages(true); } }
      });
      clearAllBtn.addEventListener('click', ()=>{ conversations = {}; saveConversations(); currentId = startOrResume(); renderMessages(true); openPrevModal(); });
      closeModalBtn.addEventListener('click', ()=> prevModal.classList.remove(${PFX}open));

      // slots + scheduling
      function extractSlots(data){
        let slots = data?.suggested_slots ?? data?.slots ?? data?.meta?.suggested_slots;
        if (typeof slots === 'string'){ try { slots = JSON.parse(slots); } catch {} }
        return Array.isArray(slots) ? slots : [];
      }
      function scheduleHandoff(){
        if (handoffScheduled) return;
        handoffScheduled = true;
        conversations[currentId].title = 'Completed booking';
        saveConversations();
        setTimeout(()=>{ startNew(); }, HANDOFF_DELAY_MS);
      }

      // "12/10 at 3pm" -> SLOT_PICK:YYYY-MM-DDThh:mm
      function rewriteNumericDateTimeToSlotPick(input) {
        const s = String(input || "");
        const re = /\b(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{2,4}))?\b(?:.?\b(?:at|by|around)\b)?\s([0-2]?\d)(?:[.:](\d{2}))?\s*(a\.?m?\.?|p\.?m?\.?|am|pm)?\b/i;
        const m = s.match(re); if (!m) return input;
        let [, dd, mm, yyyy, hh, min, ap] = m;
        const now = new Date();
        let Y = yyyy ? (yyyy.length === 2 ? 2000 + +yyyy : +yyyy) : now.getFullYear();
        let H = +hh, M = +mm, D = +dd, MIN = min ? +min : 0;
        if (ap){ const apu = ap.replace(/\./g,"").toLowerCase(); if (apu==="pm"&&H<12)H+=12; if (apu==="am"&&H===12)H=0; }
        else { if (H>=1 && H<=8) H+=12; }
        const pad = n=>String(n).padStart(2,"0");
        return SLOT_PICK:${Y}-${pad(M)}-${pad(D)}T${pad(H)}:${pad(MIN)}:00+05:30;
      }

      // network
      async function postJSON(url, payload, {timeoutMs=20000} = {}){
        const controller = new AbortController();
        const t = setTimeout(()=>controller.abort(), timeoutMs);
        try{
          const res = await fetch(url, { method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(payload), signal: controller.signal });
          const ct = res.headers.get('content-type') || '';
          if (ct.includes('application/json')) return await res.json();
          const txt = await res.text();
          return txt ? { reply: txt } : {};
        } finally { clearTimeout(t); }
      }

      async function sendDirect(userText){
        if (!userText) return;
        addUser(userText);
        waiting = true; input.disabled = true; sendBtn.disabled = true;
        sendIcon.style.display = 'none';
        const sp = document.createElement('div'); sp.className=${PFX}spinner; sp.id=${PFX}spinner; sendBtn.appendChild(sp);
        const stopTyping = addTyping();

        const outgoing = rewriteNumericDateTimeToSlotPick(userText);
        const payload = { sessionId, key: web:${sessionId}, message: outgoing };

        let data = null;
        try{
          data = await postJSON(WEBHOOK_URL, payload);
        }catch{
          try{
            data = await postJSON(WEBHOOK_URL, { sessionId, key: web:${sessionId}, message: userText }, {timeoutMs:20000});
          }catch(e){
            stopTyping();
            addBot('Sorry—connection hiccup. Please send that once more.');
            waiting = false; input.disabled = false; sendBtn.disabled = false;
            document.getElementById(${PFX}spinner)?.remove(); sendIcon.style.display = '';
            return;
          }
        }

        stopTyping();

        if (data?.end_conversation === true){
          if (data.reply) addBot(data.reply);
          scheduleHandoff();
          finishWait();
          return;
        }

        const slots = extractSlots(data);
        if (slots.length){ addSlotPoll(slots); finishWait(); return; }

        let replyText = '';
        if (typeof data === 'string') replyText = data;
        else if (typeof data?.reply === 'string' && data.reply.trim()) replyText = data.reply;
        else if (typeof data?.message === 'string' && data.message.trim()) replyText = data.message;
        else replyText = 'I couldn’t parse a reply, but I’m here if you try again.';
        addBot(replyText);
        if (CONFIRM_RE.test(replyText)) scheduleHandoff();

        finishWait();
      }

      function finishWait(){
        waiting = false; input.disabled = false; sendBtn.disabled = false;
        document.getElementById(${PFX}spinner)?.remove(); sendIcon.style.display = '';
        input.focus();
      }

      // form submit
      form.addEventListener('submit', async (e)=>{
        e.preventDefault();
        if (waiting) return;
        const text = input.value.trim(); if(!text) return;
        input.value = '';
        await sendDirect(text);
      });

      // initial
      launcher.setAttribute('aria-expanded','false');
      showHintDelayed();

      log('boot done');
      // ---- end try
    } catch (e) {
      err('boot error', e && (e.stack || e.message || e));
    }

    // local helpers inside boot scope
    function showHintDelayed(){}
    // (shadowed by the real one above after boot success)
  });
})();
