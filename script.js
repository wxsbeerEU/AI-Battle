/**
 * CYBER_CORE ENGINE // BATTLE OF THE AIS
 * State management, interactive mastermind, live broadcast, and audio synth.
 */

const SECTORS_DATA = [
  {
    id: '1',
    title: 'SECTOR 1: PROMPT ENGINEERING',
    location: 'Achter de Hoofdtent',
    color: '#00e5ff',
    tasks: [
      {
        id: 's1-a',
        code: 'Opdracht A',
        name: 'Audio Prompt',
        desc: 'Verstoring in spraakmodule. Stuur 1 operator naar het zendstation met walkietalkie. Bouw het fysieke LEGO-prototype na via enkel gesproken commando\'s.'
      },
      {
        id: 's1-b',
        code: 'Opdracht B',
        name: 'Blind Algorithm',
        desc: 'Visuele sensoren offline. Blinddoek 1 teamlid (De Robot). Stuur de Robot met strikte stap-commando\'s foutloos door het mijnenveld.'
      },
      {
        id: 's1-c',
        code: 'Opdracht C',
        name: 'Censuur Filter',
        desc: 'Datafilter corruptie. Lees het protocol voor aan de posthouder zonder de 8 verboden woorden te activeren.'
      }
    ]
  },
  {
    id: '2',
    title: 'SECTOR 2: CREATIVE NEURAL NET',
    location: 'Bij het Open Veld',
    color: '#b336ff',
    tasks: [
      {
        id: 's2-a',
        code: 'Opdracht A',
        name: 'Hallucination Drawing',
        desc: 'Generatieve beeldfout. 1 teamlid trekt een prompt en tekent deze direct. Het team moet binnen 2 minuten de exacte prompttekst decoderen.'
      },
      {
        id: 's2-b',
        code: 'Opdracht B',
        name: 'Motion Tracking',
        desc: 'Kinematische calibratie. Bekijk de robotdans van de posthouder en repliceer deze binnen 2 minuten 100% synchroon met het volledige team.'
      },
      {
        id: 's2-c',
        code: 'Opdracht C',
        name: 'Deepfake Detector',
        desc: 'Visuele fraude gedetecteerd. Analyseer de 10 data-afbeeldingen bij de posthouder en markeer alle 5 de AI-deepfakes.'
      }
    ]
  },
  {
    id: '3',
    title: 'SECTOR 3: CYBERSECURITY FIREWALL',
    location: 'In het Bos',
    color: '#ff2a5f',
    tasks: [
      {
        id: 's3-a',
        code: 'Opdracht A',
        name: 'DDoS Attack',
        desc: 'Serveroverbelasting. Steek de firewall-zone over. Minstens 6 teamleden moeten de overkant bereiken zonder geraakt te worden door trefballen.'
      },
      {
        id: 's3-b',
        code: 'Opdracht B',
        name: 'Laser Grid Defusal',
        desc: 'Inbraakdetectie actief. Doorkruis het touwenweb met belletjes. Het alarm mag maximaal 1 keer geactiveerd worden.'
      },
      {
        id: 's3-c',
        code: 'Opdracht C',
        name: 'Hardware Extraction',
        desc: 'Fysieke registerschade. Haal 5 microchips uit het koelvloeistof-reservoir (de bak) met enkel eetstokjes.'
      }
    ]
  },
  {
    id: '4',
    title: 'SECTOR 4: MACHINE LEARNING LOGIC',
    location: 'Bij het Kampvuur',
    color: '#ffd900',
    tasks: [
      {
        id: 's4-a',
        code: 'Opdracht A',
        name: 'Pattern Recognition',
        desc: 'Onbekend sorteeralgoritme. Analyseer de datakaarten en ontdek de verborgen sorteerregel binnen 2 pogingen.'
      },
      {
        id: 's4-b',
        code: 'Opdracht B',
        name: 'Bug Fixing',
        desc: 'Deadlock in het systeem. Los de fysieke knoop van teamhanden op tot een schone ring zonder het contact te verbreken.'
      },
      {
        id: 's4-c',
        code: 'Opdracht C',
        name: 'Binary Decoder',
        desc: 'Gecodeerd datafragment. Converteer de reeks binaire getallen via de ASCII-tabel naar het juiste wachtwoord.'
      }
    ]
  }
];

const TEAMS_INFO = {
  chatgpt: { name: 'Team ChatGPT', spec: 'LLM Supercluster // NLP Module', icon: '🟢' },
  midjourney: { name: 'Team Midjourney', spec: 'Generative Canvas // Diffusion Matrix', icon: '🎨' },
  gemini: { name: 'Team Gemini', spec: 'Multimodal Core // Quantum Context', icon: '✨' },
  sora: { name: 'Team Sora', spec: 'Kinetic Synth // Temporal Pipeline', icon: '🎬' },
  copilot: { name: 'Team Copilot', spec: 'Neural Autopilot // SysOps Cluster', icon: '⚡' }
};

const MASTERMIND_COLORS = ['none', 'red', 'blue', 'green', 'yellow', 'orange', 'purple'];
const PIN_STATES = ['empty', 'black', 'white'];

// Web Audio API Synth
let sfxEnabled = true;
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playBeep(freq = 600, duration = 0.08, type = 'sine') {
  if (!sfxEnabled) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch(e) {}
}

function playSuccessSound() {
  if (!sfxEnabled) return;
  playBeep(440, 0.1);
  setTimeout(() => playBeep(660, 0.15), 100);
  setTimeout(() => playBeep(880, 0.25), 200);
}

// State
let currentTeam = 'chatgpt';
let currentSectorFilter = 'all';

function getStorageKey(team, subkey) {
  return `cybercore_${team}_${subkey}`;
}

// Render Sectors
function renderSectors() {
  const container = document.getElementById('sectorsContainer');
  container.innerHTML = '';

  const savedTasks = JSON.parse(localStorage.getItem(getStorageKey(currentTeam, 'tasks')) || '{}');

  SECTORS_DATA.forEach(sec => {
    if (currentSectorFilter !== 'all' && sec.id !== currentSectorFilter) return;

    const card = document.createElement('div');
    card.className = 'sector-card';
    card.style.setProperty('--sector-color', sec.color);

    const completedInSec = sec.tasks.filter(t => savedTasks[t.id]).length;

    let tasksHTML = '';
    sec.tasks.forEach(t => {
      const isDone = !!savedTasks[t.id];
      tasksHTML += `
        <div class="task-item ${isDone ? 'completed' : ''}" id="card-${t.id}">
          <div class="task-header">
            <span class="task-name">${t.code}: ${t.name}</span>
          </div>
          <p class="task-body">"${t.desc}"</p>
          <div class="task-actions">
            <button class="task-btn" onclick="toggleTaskStatus('${t.id}')">
              ${isDone ? '✓ VOLTOOID' : '○ MARKEER KLAAR'}
            </button>
          </div>
        </div>
      `;
    });

    card.innerHTML = `
      <div class="sector-header">
        <div>
          <h3 class="sector-title">${sec.title}</h3>
          <span class="sector-loc">📍 ${sec.location}</span>
        </div>
        <span class="sector-progress-badge">${completedInSec} / ${sec.tasks.length} KLAAR</span>
      </div>
      <div class="task-list">
        ${tasksHTML}
      </div>
    `;

    container.appendChild(card);
  });

  updateTeamStats();
}

function toggleTaskStatus(taskId) {
  playBeep(700, 0.08);
  const key = getStorageKey(currentTeam, 'tasks');
  const savedTasks = JSON.parse(localStorage.getItem(key) || '{}');
  
  savedTasks[taskId] = !savedTasks[taskId];
  localStorage.setItem(key, JSON.stringify(savedTasks));
  
  if (savedTasks[taskId]) {
    playSuccessSound();
    showToast(`✅ Opdracht voltooid! Vergeet je paraaf op de Hack-Kaart niet.`);
  }

  renderSectors();
}

function filterSectors(sectorId) {
  playBeep(500, 0.05);
  currentSectorFilter = sectorId;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${sectorId}'`));
  });
  renderSectors();
}

// Mastermind Simulator
function initMastermind() {
  const board = document.getElementById('mastermindBoard');
  board.innerHTML = '';

  const savedData = JSON.parse(localStorage.getItem(getStorageKey(currentTeam, 'mastermind')) || '{}');

  for (let r = 1; r <= 6; r++) {
    const row = document.createElement('div');
    row.className = 'mm-row';
    row.id = `mm-row-${r}`;

    const rowData = savedData[r] || { colors: ['none', 'none', 'none', 'none'], pins: ['empty', 'empty', 'empty', 'empty'] };

    let dotsHTML = '<div class="color-slots">';
    for (let c = 0; c < 4; c++) {
      const col = rowData.colors[c] || 'none';
      dotsHTML += `<div class="color-dot" data-color="${col}" onclick="cycleColor(${r}, ${c})"></div>`;
    }
    dotsHTML += '</div>';

    let pinsHTML = '<div class="feedback-pins">';
    for (let p = 0; p < 4; p++) {
      const pinState = rowData.pins[p] || 'empty';
      pinsHTML += `<div class="pin pin-${pinState}" onclick="cyclePin(${r}, ${p})"></div>`;
    }
    pinsHTML += '</div>';

    row.innerHTML = `
      <span class="row-label">POGING ${r}</span>
      ${dotsHTML}
      ${pinsHTML}
    `;

    board.appendChild(row);
  }

  updateTeamStats();
}

function cycleColor(row, colIndex) {
  playBeep(600, 0.05);
  const key = getStorageKey(currentTeam, 'mastermind');
  const saved = JSON.parse(localStorage.getItem(key) || '{}');
  if (!saved[row]) saved[row] = { colors: ['none', 'none', 'none', 'none'], pins: ['empty', 'empty', 'empty', 'empty'] };

  const currentColor = saved[row].colors[colIndex] || 'none';
  const nextIdx = (MASTERMIND_COLORS.indexOf(currentColor) + 1) % MASTERMIND_COLORS.length;
  saved[row].colors[colIndex] = MASTERMIND_COLORS[nextIdx];

  localStorage.setItem(key, JSON.stringify(saved));
  initMastermind();
}

function cyclePin(row, pinIndex) {
  playBeep(800, 0.05);
  const key = getStorageKey(currentTeam, 'mastermind');
  const saved = JSON.parse(localStorage.getItem(key) || '{}');
  if (!saved[row]) saved[row] = { colors: ['none', 'none', 'none', 'none'], pins: ['empty', 'empty', 'empty', 'empty'] };

  const currentPin = saved[row].pins[pinIndex] || 'empty';
  const nextIdx = (PIN_STATES.indexOf(currentPin) + 1) % PIN_STATES.length;
  saved[row].pins[pinIndex] = PIN_STATES[nextIdx];

  localStorage.setItem(key, JSON.stringify(saved));
  initMastermind();
}

function resetMastermindRows() {
  if (!confirm("Weet je zeker dat je alle Mastermind test-rijen van dit team wilt wissen?")) return;
  localStorage.removeItem(getStorageKey(currentTeam, 'mastermind'));
  initMastermind();
  showToast("🧹 Mastermind kladbord gewist.");
}

// Team switching
function onTeamChanged() {
  const select = document.getElementById('teamSelect');
  currentTeam = select.value;
  const info = TEAMS_INFO[currentTeam];

  document.getElementById('currentTeamTitle').innerText = info.name;
  document.getElementById('currentTeamSpec').innerText = info.spec;
  document.getElementById('teamAvatarIcon').innerText = info.icon;

  playBeep(520, 0.1);
  showToast(`Ingelogd als ${info.name}`);

  renderSectors();
  initMastermind();
}

function updateTeamStats() {
  const savedTasks = JSON.parse(localStorage.getItem(getStorageKey(currentTeam, 'tasks')) || '{}');
  const countDone = Object.values(savedTasks).filter(Boolean).length;
  document.getElementById('teamTasksCount').innerText = `${countDone} / 12`;

  const savedMm = JSON.parse(localStorage.getItem(getStorageKey(currentTeam, 'mastermind')) || '{}');
  let attemptsUsed = 0;
  let hasWon = false;

  Object.values(savedMm).forEach(row => {
    const hasColor = row.colors && row.colors.some(c => c !== 'none');
    if (hasColor) attemptsUsed++;
    if (row.pins && row.pins.filter(p => p === 'black').length === 4) {
      hasWon = true;
    }
  });

  document.getElementById('teamAttemptsCount').innerText = `${attemptsUsed} / 6`;
  const coreStatusEl = document.getElementById('teamCoreStatus');
  if (hasWon) {
    coreStatusEl.innerText = "GEKRAAKT! 🔓";
    coreStatusEl.style.color = "var(--neon-green)";
  } else {
    coreStatusEl.innerText = "VERGRENDELD 🔒";
    coreStatusEl.style.color = "var(--neon-pink)";
  }
}

// Tabs
function switchTab(tabId) {
  playBeep(450, 0.05);
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-pill').forEach(el => el.classList.remove('active'));

  const targetTab = document.getElementById(`tab-${tabId}`);
  if (targetTab) targetTab.classList.add('active');

  const btn = Array.from(document.querySelectorAll('.nav-pill')).find(b => b.getAttribute('onclick').includes(`'${tabId}'`));
  if (btn) btn.classList.add('active');
}

// Binary Tool
function decodeBinary() {
  playBeep(650, 0.08);
  const input = document.getElementById('binaryInput').value.trim();
  if (!input) {
    document.getElementById('binaryOutput').innerText = "-- Geen invoer --";
    return;
  }

  const binaryTokens = input.split(/\s+/);
  let decoded = "";

  try {
    for (let token of binaryTokens) {
      if (token.length > 0) {
        const charCode = parseInt(token, 2);
        if (isNaN(charCode)) {
          decoded += "[ERR]";
        } else {
          decoded += String.fromCharCode(charCode);
        }
      }
    }
    document.getElementById('binaryOutput').innerText = decoded || "-- Foutief formaat --";
  } catch (err) {
    document.getElementById('binaryOutput').innerText = "Fout in binaire reeks.";
  }
}

function clearBinary() {
  document.getElementById('binaryInput').value = '';
  document.getElementById('binaryOutput').innerText = '-- Wacht op invoer --';
}

// Timer & Meltdown
let totalSeconds = 120 * 60;
let timerRunning = true;
let timerInterval = null;

function tickTimer() {
  if (timerRunning && totalSeconds > 0) {
    totalSeconds--;
    localStorage.setItem('cybercore_timer_seconds', totalSeconds);
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formatted = 
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  document.getElementById('gameTimer').innerText = formatted;

  const integrityPct = Math.max(0, Math.min(100, Math.round((totalSeconds / (120 * 60)) * 100)));
  const fillEl = document.getElementById('integrityFill');
  const valEl = document.getElementById('integrityVal');
  if (fillEl && valEl) {
    fillEl.style.width = `${integrityPct}%`;
    valEl.innerText = `${integrityPct}% - ${integrityPct < 25 ? 'CRITICAL' : (integrityPct < 50 ? 'WARNING' : 'STABLE')}`;
  }

  if (totalSeconds === 0) {
    document.getElementById('gameTimer').innerText = "00:00:00 - CORE DOWN";
  }
}

function startTimer() {
  timerRunning = true;
  showToast("⏱️ Timer gestart.");
}

function pauseTimer() {
  timerRunning = false;
  showToast("⏸️ Timer gepauzeerd.");
}

function resetTimer(minutes = 120) {
  totalSeconds = minutes * 60;
  localStorage.setItem('cybercore_timer_seconds', totalSeconds);
  tickTimer();
  showToast(`🔄 Timer gereset naar ${minutes} minuten.`);
}

// Admin Controls
function openAdminModal() {
  playBeep(400, 0.08);
  document.getElementById('adminModal').classList.add('open');
}

function closeAdminModal() {
  document.getElementById('adminModal').classList.remove('open');
}

function loginAdmin() {
  const pass = document.getElementById('adminPasswordInput').value;
  if (pass === 'admin123' || pass === 'core2026') {
    playSuccessSound();
    document.getElementById('adminAuthSection').style.display = 'none';
    document.getElementById('adminControlsSection').style.display = 'block';
    renderAdminScores();
  } else {
    playBeep(200, 0.3, 'sawtooth');
    document.getElementById('adminAuthError').style.display = 'block';
  }
}

function publishBroadcast() {
  const text = document.getElementById('adminBroadcastInput').value.trim();
  if (!text) return;
  setLiveBroadcast(text);
  document.getElementById('adminBroadcastInput').value = '';
}

function quickBroadcast(text) {
  setLiveBroadcast(text);
}

function setLiveBroadcast(msg) {
  localStorage.setItem('cybercore_broadcast', msg);
  document.getElementById('broadcastDisplay').innerText = msg;
  document.getElementById('lastBroadcastTime').innerText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  playSuccessSound();
  showToast("📡 Broadcast verstuurd naar alle schermen!");
}

function renderAdminScores() {
  const tbody = document.getElementById('adminScoresBody');
  tbody.innerHTML = '';

  Object.keys(TEAMS_INFO).forEach(tKey => {
    const tInfo = TEAMS_INFO[tKey];
    const tasks = JSON.parse(localStorage.getItem(getStorageKey(tKey, 'tasks')) || '{}');
    const doneCount = Object.values(tasks).filter(Boolean).length;
    
    const mm = JSON.parse(localStorage.getItem(getStorageKey(tKey, 'mastermind')) || '{}');
    const attempts = Object.keys(mm).length;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${tInfo.icon} ${tInfo.name}</strong></td>
      <td><span style="color:var(--neon-green)">${doneCount} / 12</span> opdrachten</td>
      <td>${attempts} / 6 pogingen</td>
      <td>
        <button class="mini-btn" onclick="resetSingleTeam('${tKey}')">Reset Data</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function resetSingleTeam(teamKey) {
  if (!confirm(`Weet je zeker dat je alle voortgang van ${TEAMS_INFO[teamKey].name} wilt wissen?`)) return;
  localStorage.removeItem(getStorageKey(teamKey, 'tasks'));
  localStorage.removeItem(getStorageKey(teamKey, 'mastermind'));
  renderAdminScores();
  renderSectors();
  initMastermind();
  showToast(`Data van ${TEAMS_INFO[teamKey].name} gewist.`);
}

// Toast
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  toast.innerText = message;
  toast.style.display = 'block';
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.style.display = 'none';
  }, 3500);
}

// Setup On Load
window.onload = function() {
  const savedTimer = localStorage.getItem('cybercore_timer_seconds');
  if (savedTimer) totalSeconds = parseInt(savedTimer, 10);
  
  timerInterval = setInterval(tickTimer, 1000);
  tickTimer();

  const savedBroadcast = localStorage.getItem('cybercore_broadcast');
  if (savedBroadcast) document.getElementById('broadcastDisplay').innerText = savedBroadcast;

  document.getElementById('audioToggleBtn').onclick = function() {
    sfxEnabled = !sfxEnabled;
    document.getElementById('sfxStatus').innerText = sfxEnabled ? 'AAN' : 'UIT';
    if (sfxEnabled) playBeep(600, 0.1);
  };

  window.addEventListener('storage', function(e) {
    if (e.key === 'cybercore_broadcast') {
      document.getElementById('broadcastDisplay').innerText = e.newValue || '';
      playSuccessSound();
      showToast("📡 Nieuw bevel van de leiding ontvangen!");
    }
  });

  renderSectors();
  initMastermind();
};
