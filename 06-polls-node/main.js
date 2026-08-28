/* ============================================================
   MAIN.JS — Pulse (live polls)
   Sesión anónima por pestaña (sessionStorage) + API real.
   Una sola página, dos vistas: crear (por defecto) o ver/votar
   (cuando la URL trae ?p=ID).
============================================================ */

function getSessionId() {
  let id = sessionStorage.getItem('pulse_session');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('pulse_session', id);
  }
  return id;
}
const sessionId = getSessionId();

const params = new URLSearchParams(location.search);
const pollId  = params.get('p');

const createView = document.getElementById('createView');
const pollView    = document.getElementById('pollView');

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ============================================================
   VISTA: CREAR
============================================================ */
function initCreateView() {
  const form           = document.getElementById('pollForm');
  const questionInput  = document.getElementById('question');
  const optionsInputs  = document.getElementById('optionsInputs');
  const addOptionBtn   = document.getElementById('addOption');
  const createError    = document.getElementById('createError');
  const pollsList       = document.getElementById('pollsList');
  const pollsCount      = document.getElementById('pollsCount');
  const pollsEmpty      = document.getElementById('pollsEmpty');

  const MAX_OPTIONS = 6;

  addOptionBtn.addEventListener('click', () => {
    const count = optionsInputs.querySelectorAll('.option-input').length;
    if (count >= MAX_OPTIONS) return;
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'option-input';
    input.maxLength = 80;
    input.placeholder = `Option ${count + 1}`;
    optionsInputs.appendChild(input);
    if (count + 1 >= MAX_OPTIONS) addOptionBtn.hidden = true;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    createError.textContent = '';

    const question = questionInput.value.trim();
    const options = Array.from(optionsInputs.querySelectorAll('.option-input'))
      .map(i => i.value.trim())
      .filter(Boolean);

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    try {
      const res = await fetch('api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, options, sessionId }),
      });
      const data = await res.json();

      if (!res.ok) {
        createError.textContent = data.error || 'Something went wrong.';
        submitBtn.disabled = false;
        return;
      }

      location.search = `?p=${data.id}`;
    } catch {
      createError.textContent = 'Network error — please try again.';
      submitBtn.disabled = false;
    }
  });

  async function loadPolls() {
    try {
      const res = await fetch(`api/polls?sessionId=${encodeURIComponent(sessionId)}`);
      const data = await res.json();
      renderPolls(data.polls || []);
    } catch {
      // silencioso
    }
  }

  function renderPolls(polls) {
    pollsList.innerHTML = '';
    pollsCount.textContent = polls.length ? `(${polls.length})` : '';
    pollsEmpty.classList.toggle('hidden', polls.length > 0);

    polls.forEach(poll => {
      const li = document.createElement('li');
      li.className = 'poll-row';
      li.innerHTML = `
        <div class="poll-row-main">
          <a href="?p=${poll.id}" class="poll-row-question">${escapeHtml(poll.question)}</a>
          <span class="poll-row-votes">${poll.totalVotes} vote${poll.totalVotes === 1 ? '' : 's'}</span>
        </div>
        <button class="poll-copy" type="button" data-id="${poll.id}">Copy link</button>
        <button class="poll-delete" type="button" data-id="${poll.id}">Delete</button>
      `;
      pollsList.appendChild(li);
    });
  }

  pollsList.addEventListener('click', async (e) => {
    const copyBtn = e.target.closest('.poll-copy');
    const delBtn  = e.target.closest('.poll-delete');

    if (copyBtn) {
      const url = `${location.origin}${location.pathname}?p=${copyBtn.dataset.id}`;
      try {
        await navigator.clipboard.writeText(url);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy link'; }, 1600);
      } catch { /* clipboard bloqueado */ }
    }

    if (delBtn) {
      delBtn.disabled = true;
      try {
        await fetch(`api/polls/${delBtn.dataset.id}?sessionId=${encodeURIComponent(sessionId)}`, { method: 'DELETE' });
        loadPolls();
      } catch {
        delBtn.disabled = false;
      }
    }
  });

  loadPolls();
}

/* ============================================================
   VISTA: VER / VOTAR
============================================================ */
function initPollView() {
  const questionEl = document.getElementById('pollQuestion');
  const totalEl     = document.getElementById('pollTotal');
  const optionsEl   = document.getElementById('pollOptions');
  const voteError   = document.getElementById('voteError');

  let refreshTimer = null;

  async function loadPoll() {
    try {
      const res = await fetch(`api/polls/${pollId}?sessionId=${encodeURIComponent(sessionId)}`);
      if (!res.ok) {
        questionEl.textContent = 'Poll not found';
        totalEl.textContent = 'This poll does not exist or was removed.';
        return;
      }
      const data = await res.json();
      render(data);
    } catch {
      // se reintenta en el próximo ciclo de refresco
    }
  }

  function render(data) {
    questionEl.textContent = data.question;
    totalEl.textContent = `${data.totalVotes} vote${data.totalVotes === 1 ? '' : 's'} so far`;

    optionsEl.innerHTML = '';
    Object.entries(data.options).forEach(([optionId, opt]) => {
      const pct = data.totalVotes ? Math.round((opt.votes / data.totalVotes) * 100) : 0;
      const voted = !!data.votedOptionId;
      const chosen = data.votedOptionId === optionId;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'poll-option' + (voted ? ' voted' : '') + (chosen ? ' chosen' : '');
      btn.disabled = voted;
      btn.dataset.optionId = optionId;
      btn.innerHTML = `
        <span class="poll-option-fill" style="width:${voted ? pct : 0}%"></span>
        <span class="poll-option-label">
          <span>${escapeHtml(opt.text)}${chosen ? ' ✓' : ''}</span>
          ${voted ? `<span class="poll-option-pct">${pct}%</span>` : ''}
        </span>
      `;
      optionsEl.appendChild(btn);
    });
  }

  optionsEl.addEventListener('click', async (e) => {
    const btn = e.target.closest('.poll-option');
    if (!btn || btn.disabled) return;

    voteError.textContent = '';
    optionsEl.querySelectorAll('.poll-option').forEach(b => (b.disabled = true));

    try {
      const res = await fetch(`api/polls/${pollId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId: btn.dataset.optionId, sessionId }),
      });
      const data = await res.json();
      if (!res.ok) {
        voteError.textContent = data.error || 'Could not register your vote.';
      }
      loadPoll();
    } catch {
      voteError.textContent = 'Network error — please try again.';
    }
  });

  loadPoll();
  // Se refresca solo para sentirse "en vivo" mientras la pestaña está abierta.
  refreshTimer = setInterval(loadPoll, 3000);
  window.addEventListener('pagehide', () => clearInterval(refreshTimer));
}

/* ============================================================
   LIMPIEZA AL CERRAR LA PESTAÑA
   Solo en pagehide — a propósito NO en visibilitychange, porque
   eso también dispara al cambiar de pestaña sin cerrarla.
============================================================ */
function cleanupOnExit() {
  const blob = new Blob([JSON.stringify({ sessionId })], { type: 'application/json' });
  navigator.sendBeacon('api/cleanup', blob);
}
window.addEventListener('pagehide', cleanupOnExit);

/* ============================================================
   INIT
============================================================ */
if (pollId) {
  createView.hidden = true;
  pollView.hidden = false;
  initPollView();
} else {
  initCreateView();
}
