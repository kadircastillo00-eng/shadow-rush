// ═══════════════════════════════════════════════════════════
//  Shadow Rush — Panel de depuración AdMob (visible en pantalla)
//
//  Permite ver en el propio teléfono, sin PC ni adb, el código y
//  mensaje exacto de cada LoadAdError, además de las cargas y
//  muestras exitosas de banner/interstitial/rewarded.
//
//  Se importa desde ad-manager.js y se auto-inicializa al cargar
//  (los elementos ya existen en el DOM porque este script se carga
//  como módulo diferido al final de <body>, después del HTML).
// ═══════════════════════════════════════════════════════════

const MAX_ENTRIES = 200;
let _logEl, _panelEl, _toggleBtn, _clearBtn, _closeBtn;
let _ready = false;
const _queue = []; // entradas registradas antes de que el DOM esté listo

function _fmtTime() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function _render(level, text) {
  if (!_ready) { _queue.push([level, text]); return; }
  const row = document.createElement('div');
  row.className = `admob-debug-entry ${level}`;
  const ts = document.createElement('span');
  ts.className = 'admob-debug-ts';
  ts.textContent = _fmtTime();
  row.appendChild(ts);
  row.appendChild(document.createTextNode(text));
  _logEl.appendChild(row);
  // Limita el historial para no acumular memoria indefinidamente
  while (_logEl.children.length > MAX_ENTRIES) _logEl.removeChild(_logEl.firstChild);
  _logEl.scrollTop = _logEl.scrollHeight;
}

/**
 * Registra una línea en el panel visible.
 * @param {'ok'|'err'|'warn'|'info'} level
 * @param {string} text
 */
export function admobDebugLog(level, text) {
  _render(level, text);
}

/** Registra un LoadAdError/AdMobError con code/message/domain explícitos. */
export function admobDebugLogError(tag, err) {
  const code    = err?.code    ?? err?.errorCode    ?? '(sin código)';
  const message = err?.message ?? err?.errorMessage ?? '(sin mensaje)';
  const domain  = err?.domain  ?? '';
  admobDebugLog('err', `${tag} — code=${code}${domain ? ' domain=' + domain : ''} — "${message}"`);
}

function _init() {
  _panelEl   = document.getElementById('admob-debug-panel');
  _logEl     = document.getElementById('admob-debug-log');
  _toggleBtn = document.getElementById('admob-debug-toggle');
  _clearBtn  = document.getElementById('admob-debug-clear');
  _closeBtn  = document.getElementById('admob-debug-close');
  if (!_panelEl || !_logEl || !_toggleBtn) return; // panel no presente en este build

  _toggleBtn.addEventListener('click', () => _panelEl.classList.toggle('hidden'));
  _closeBtn?.addEventListener('click', () => _panelEl.classList.add('hidden'));
  _clearBtn?.addEventListener('click', () => { _logEl.innerHTML = ''; });

  _ready = true;
  // Vuelca lo que se haya registrado antes de que el DOM estuviera listo
  _queue.forEach(([level, text]) => _render(level, text));
  _queue.length = 0;
  admobDebugLog('info', 'Panel de depuración AdMob listo');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _init);
} else {
  _init();
}
