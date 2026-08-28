/* ============================================================
   MAIN.JS — Snip (link shortener)
   Sesión anónima por pestaña (sessionStorage) + API real.
============================================================ */

/* ── Sesión: un id aleatorio por pestaña, se pierde al cerrarla ── */
function getSessionId() {
  let id = sessionStorage.getItem('snip_session');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('snip_session', id);
  }
  return id;
}
const sessionId = getSessionId();

const form       = document.getElementById('shortenForm');
const urlInput   = document.getElementById('urlInput');
const formError  = document.getElementById('formError');
const result     = document.getElementById('result');
const resultLink = document.getElementById('resultLink');
const copyBtn    = document.getElementById('copyBtn');
const linksList  = document.getElementById('linksList');
const linksCount = document.getElementById('linksCount');
const linksEmpty = document.getElementById('linksEmpty');

function shortUrlFor(code) {
  return `${location.origin}/snip/s/${code}`;
}

/* ── Cargar y pintar los links de esta sesión ── */
async function loadLinks() {
  try {
    const res = await fetch(`api/links?sessionId=${encodeURIComponent(sessionId)}`);
    const data = await res.json();
    renderLinks(data.links || []);
  } catch {
    // silencioso: si falla, la lista simplemente se queda vacía
  }
}

function renderLinks(links) {
  linksList.innerHTML = '';
  linksCount.textContent = links.length ? `(${links.length})` : '';
  linksEmpty.classList.toggle('hidden', links.length > 0);

  links.forEach(link => {
    const li = document.createElement('li');
    li.className = 'link-row';
    li.innerHTML = `
      <div class="link-main">
        <a href="s/${link.code}" class="link-code" target="_blank" rel="noopener">/s/${link.code}</a>
        <span class="link-target">${escapeHtml(link.url)}</span>
      </div>
      <span class="link-clicks">${link.clicks || 0} click${link.clicks === 1 ? '' : 's'}</span>
      <button class="link-delete" type="button" aria-label="Delete" data-code="${link.code}">×</button>
    `;
    linksList.appendChild(li);
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ── Crear un link ── */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formError.textContent = '';

  const url = urlInput.value.trim();
  const submitBtn = form.querySelector('button');
  submitBtn.disabled = true;

  try {
    const res = await fetch('api/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, sessionId }),
    });
    const data = await res.json();

    if (!res.ok) {
      formError.textContent = data.error || 'Something went wrong.';
      return;
    }

    const full = shortUrlFor(data.code);
    resultLink.href = full;
    resultLink.textContent = full;
    result.hidden = false;
    copyBtn.textContent = 'Copy';
    copyBtn.classList.remove('copied');

    urlInput.value = '';
    loadLinks();
  } catch {
    formError.textContent = 'Network error — please try again.';
  } finally {
    submitBtn.disabled = false;
  }
});

/* ── Copiar el link al portapapeles ── */
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(resultLink.href);
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
      copyBtn.classList.remove('copied');
    }, 1800);
  } catch {
    // clipboard API bloqueada — el usuario puede seleccionar el texto a mano
  }
});

/* ── Borrar un link puntual ── */
linksList.addEventListener('click', async (e) => {
  const btn = e.target.closest('.link-delete');
  if (!btn) return;
  const code = btn.dataset.code;
  btn.disabled = true;
  try {
    await fetch(`api/links/${code}?sessionId=${encodeURIComponent(sessionId)}`, { method: 'DELETE' });
    loadLinks();
  } catch {
    btn.disabled = false;
  }
});

/* ── Limpieza al cerrar la pestaña ──
   Solo en pagehide (cierre real / navegar fuera) — a propósito NO se
   usa visibilitychange aquí, porque eso también dispara al cambiar de
   pestaña sin cerrarla, y borraría los links solo por dejar de mirarlos. */
function cleanupOnExit() {
  const blob = new Blob([JSON.stringify({ sessionId })], { type: 'application/json' });
  navigator.sendBeacon('api/cleanup', blob);
}
window.addEventListener('pagehide', cleanupOnExit);

loadLinks();
