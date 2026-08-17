/**
 * AI CORE ENGINE - THE BATTLE OF THE AIS
 * 6 Teams, Emergency Lockdown Sync, Audio Playback & Phone Evidence Workflow
 */

const LEIDING_PHONE = "0475 84 89 83";

const SECTORS_DATA = [
  {
    id: '1',
    title: 'SECTOR 1: PROMPT ENGINEERING',
    location: 'Achter de Hoofdtent',
    tasks: [
      { id: 's1-a', code: 'Opdracht A', name: 'Audio Prompt', pts: 100, desc: 'Verstoring in spraakmodule. Stuur 1 operator naar het zendstation met walkietalkie. Bouw het fysieke LEGO-prototype na via enkel gesproken commando\'s.' },
      { id: 's1-b', code: 'Opdracht B', name: 'Blind Algorithm', pts: 100, desc: 'Visuele sensoren offline. Blinddoek 1 teamlid (De Robot). Stuur de Robot met strikte stap-commando\'s foutloos door het mijnenveld.' },
      { id: 's1-c', code: 'Opdracht C', name: 'Censuur Filter', pts: 100, desc: 'Datafilter corruptie. Lees het protocol voor aan de posthouder zonder de 8 verboden woorden te activeren.' }
    ]
  },
  {
    id: '2',
    title: 'SECTOR 2: CREATIVE NEURAL NET',
    location: 'Bij het Open Veld',
    tasks: [
      { id: 's2-a', code: 'Opdracht A', name: 'Hallucination Drawing', pts: 100, desc: 'Generatieve beeldfout. 1 teamlid trekt een prompt en tekent deze direct. Het team moet binnen 2 minuten de exacte prompttekst raden.' },
      { id: 's2-b', code: 'Opdracht B', name: 'Motion Tracking', pts: 100, desc: 'Kinematische calibratie. Bekijk de robotdans van de posthouder en doe deze binnen 2 minuten 100% synchroon na met het hele team.' },
      { id: 's2-c', code: 'Opdracht C', name: 'Deepfake Detector', pts: 100, desc: 'Visuele fraude gedetecteerd. Analyseer de 10 data-afbeeldingen bij de posthouder en markeer alle 5 de AI-deepfakes.' }
    ]
  },
  {
    id: '3',
    title: 'SECTOR 3: CYBERSECURITY FIREWALL',
    location: 'In het Bos',
    tasks: [
      { id: 's3-a', code: 'Opdracht A', name: 'DDoS Attack', pts: 100, desc: 'Serveroverbelasting. Steek de firewall-zone over. Minstens 6 teamleden moeten de overkant bereiken zonder geraakt te worden door trefballen.' },
      { id: 's3-b', code: 'Opdracht B', name: 'Laser Grid Defusal', pts: 100, desc: 'Inbraakdetectie actief. Doorkruis het touwenweb met belletjes. Het alarm mag maximaal 1 keer afgaan.' },
      { id: 's3-c', code: 'Opdracht C', name: 'Hardware Extraction', pts: 100, desc: 'Fysieke registerschade. Haal 5 microchips uit het koelvloeistof-reservoir (de bak) met enkel eetstokjes.' }
    ]
  },
  {
    id: '4',
    title: 'SECTOR 4: MACHINE LEARNING LOGIC',
    location: 'Bij het Kampvuur',
    tasks: [
      { id: 's4-a', code: 'Opdracht A', name: 'Pattern Recognition', pts: 100, desc: 'Onbekend sorteeralgoritme. Analyseer de datakaarten en ontdek de verborgen sorteerregel binnen 2 pogingen.' },
      { id: 's4-b', code: 'Opdracht B', name: 'Bug Fixing', pts: 100, desc: 'Deadlock in het systeem. Los de fysieke knoop van teamhanden op tot een schone ring zonder het contact te verbreken.' },
      { id: 's4-c', code: 'Opdracht C', name: 'Binary Decoder', pts: 100, desc: 'Gecodeerd datafragment. Converteer de reeks binaire getallen via de ASCII-tabel naar het juiste wachtwoord.' }
    ]
  }
];

// Minstens 6 AI Teams
const TEAMS_INFO = {
  chatgpt: { name: 'Team ChatGPT', icon: '🟢' },
  midjourney: { name: 'Team Midjourney', icon: '🎨' },
  gemini: { name: 'Team Gemini', icon: '✨' },
  claude: { name: 'Team Claude', icon: '🧠' },
  sora: { name: 'Team Sora', icon: '🎬' },
  copilot: { name: 'Team Copilot', icon: '⚡' }
};

const MASTERMIND_COLORS = ['none', 'red', 'blue', 'green', 'yellow', 'orange', 'purple'];
const PIN_STATES = ['empty', 'black', 'white'];

// Auth State
let authenticatedTeam = null;
let currentSectorFilter = 'all';

function getStorageKey(team, subkey) {
  return `aicore_${team}_${subkey}`;
}

function getTeamPassword(teamKey) {
  return localStorage.getItem(`aicore_pw_${teamKey}`);
}

function setTeamPassword(teamKey, newPw) {
  localStorage.setItem(`aicore_pw_${teamKey}`, newPw);
}

function onGateTeamChange() {
  const teamKey = document.getElementById('gateTeamSelect').value;
  const existingPw = getTeamPassword(teamKey);
  const label = document.getElementById('gatePassLabel');
  const input = document.getElementById('gatePasswordInput');
  input.value = '';
  document.getElementById('gateErrorMsg').innerText = '';

  if (!existingPw) {
    label.innerText = "Kies een NIEUWE toegangscode voor dit team:";
    input.placeholder = "Kies pincode of wachtwoord...";
  } else {
    label.innerText = "Toegangscode / Pincode:";
    input.placeholder = "Voer code in...";
  }
}

function submitTeamAuth() {
  const teamKey = document.getElementById('gateTeamSelect').value;
  const enteredPw = document.getElementById('gatePasswordInput').value.trim();
  const existingPw = getTeamPassword(teamKey);
  const errorEl = document.getElementById('gateErrorMsg');

  if (!enteredPw) {
    errorEl.innerText = "Voer een code in.";
    return;
  }

  if (!existingPw) {
    setTeamPassword(teamKey, enteredPw);
    loginSuccess(teamKey);
    showToast(`Toegangscode opgeslagen voor ${TEAMS_INFO[teamKey].name}`);
  } else if (existingPw === enteredPw || enteredPw === 'admin123') {
    loginSuccess(teamKey);
  } else {
    errorEl.innerText = "Onjuiste toegangscode!";
  }
}

function loginSuccess(teamKey) {
  authenticatedTeam = teamKey;
  sessionStorage.setItem('aicore_active_team', teamKey);
  document.getElementById('authGateModal').style.display = 'none';

  const info = TEAMS_INFO[teamKey];
  document.getElementById('headerTeamIcon').innerText = info.icon;
  document.getElementById('headerTeamName').innerText = info.name;

  renderSectors();
  initMastermind();
  updateTeamStats();
  checkEmergencyLockdown();
}

function logoutCurrentTeam() {
  sessionStorage.removeItem('aicore_active_team');
  authenticatedTeam = null;
  document.getElementById('authGateModal').style.display = 'flex';
  onGateTeamChange();
}

// Opdrachten & GSM Bewijs
let activePendingTask = null;

function renderSectors() {
  if (!authenticatedTeam) return;
  const container = document.getElementById('sectorsContainer');
  container.innerHTML = '';

  const savedTasks = JSON.parse(localStorage.getItem(getStorageKey(authenticatedTeam, 'tasks')) || '{}');

  SECTORS_DATA.forEach(sec => {
    if (currentSectorFilter !== 'all' && sec.id !== currentSectorFilter) return;

    const card = document.createElement('div');
    card.className = 'card sector-card';

    let tasksHTML = '';
    sec.tasks.forEach(t => {
      const status = savedTasks[t.id] || 'open';
      let btnLabel = 'Bewijs Versturen 📱';
      let btnClass = '';

      if (status === 'pending') {
        btnLabel = 'In Verificatie... ⏳';
        btnClass = 'pending-btn';
      } else if (status === 'approved') {
        btnLabel = 'Goedgekeurd (+100 PTS) ✓';
        btnClass = 'done-btn';
      }

      tasksHTML += `
        <div class="task-item ${status}">
          <div class="task-top">
            <span>${t.code}: ${t.name}</span>
            <span style="color:var(--emerald)">+${t.pts} PTS</span>
          </div>
          <p class="task-desc">${t.desc}</p>
          <button class="task-btn ${btnClass}" onclick="openPhoneEvidence('${sec.title}', '${t.id}', '${t.code}: ${t.name}')" ${status === 'approved' ? 'disabled' : ''}>
            ${btnLabel}
          </button>
        </div>
      `;
    });

    card.innerHTML = `
      <div class="sec-title-row">
        <div>
          <h3>${sec.title}</h3>
          <div class="sec-loc">📍 ${sec.location}</div>
        </div>
      </div>
      <div class="task-list">${tasksHTML}</div>
    `;

    container.appendChild(card);
  });

  updateTeamStats();
}

function openPhoneEvidence(sectorTitle, taskId, taskName) {
  activePendingTask = { sectorTitle, taskId, taskName, teamKey: authenticatedTeam };
  const teamName = TEAMS_INFO[authenticatedTeam].name;

  document.getElementById('evidenceTaskLabel').innerText = `${sectorTitle} - ${taskName}`;
  document.getElementById('evidenceMessageTemplate').innerText = `${teamName} | ${taskName}`;
  document.getElementById('evidenceModal').classList.add('open');
}

function closeEvidenceModal() {
  document.getElementById('evidenceModal').classList.remove('open');
}

function confirmEvidenceSent() {
  if (!activePendingTask) return;
  const key = getStorageKey(activePendingTask.teamKey, 'tasks');
  const savedTasks = JSON.parse(localStorage.getItem(key) || '{}');
  
  savedTasks[activePendingTask.taskId] = 'pending';
  localStorage.setItem(key, JSON.stringify(savedTasks));

  // Log in leiding inbox
  const subs = JSON.parse(localStorage.getItem('aicore_submissions') || '[]');
  const existing = subs.findIndex(s => s.teamKey === activePendingTask.teamKey && s.taskId === activePendingTask.taskId);
  const entry = {
    teamKey: activePendingTask.teamKey,
    taskId: activePendingTask.taskId,
    taskName: activePendingTask.taskName,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'pending'
  };

  if (existing >= 0) subs[existing] = entry;
  else subs.unshift(entry);
  localStorage.setItem('aicore_submissions', JSON.stringify(subs));

  closeEvidenceModal();
  renderSectors();
  showToast("Opdracht gemarkeerd als 'In Verificatie'");
}

function filterSectors(secId) {
  currentSectorFilter = secId;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('onclick').includes(`'${secId}'`));
  });
  renderSectors();
}

// Mastermind
function initMastermind() {
  if (!authenticatedTeam) return;
  const board = document.getElementById('mastermindBoard');
  board.innerHTML = '';
  const savedData = JSON.parse(localStorage.getItem(getStorageKey(authenticatedTeam, 'mastermind')) || '{}');

  for (let r = 1; r <= 6; r++) {
    const row = document.createElement('div');
    row.className = 'mm-row';

    const rowData = savedData[r] || { colors: ['none', 'none', 'none', 'none'], pins: ['empty', 'empty', 'empty', 'empty'] };

    let dotsHTML = '<div class="mm-dots">';
    for (let c = 0; c < 4; c++) {
      const col = rowData.colors[c] || 'none';
      dotsHTML += `<div class="mm-dot" data-color="${col}" onclick="cycleColor(${r}, ${c})"></div>`;
    }
    dotsHTML += '</div>';

    let pinsHTML = '<div class="mm-pins">';
    for (let p = 0; p < 4; p++) {
      const pinState = rowData.pins[p] || 'empty';
      pinsHTML += `<div class="pin pin-${pinState}" onclick="cyclePin(${r}, ${p})"></div>`;
    }
    pinsHTML += '</div>';

    row.innerHTML = `<span class="mm-label">Rij ${r}</span>${dotsHTML}${pinsHTML}`;
    board.appendChild(row);
  }
}

function cycleColor(row, col) {
  const key = getStorageKey(authenticatedTeam, 'mastermind');
  const saved = JSON.parse(localStorage.getItem(key) || '{}');
  if (!saved[row]) saved[row] = { colors: ['none', 'none', 'none', 'none'], pins: ['empty', 'empty', 'empty', 'empty'] };

  const curr = saved[row].colors[col] || 'none';
  const nextIdx = (MASTERMIND_COLORS.indexOf(curr) + 1) % MASTERMIND_COLORS.length;
  saved[row].colors[col] = MASTERMIND_COLORS[nextIdx];

  localStorage.setItem(key, JSON.stringify(saved));
  initMastermind();
}

function cyclePin(row, pIdx) {
  const key = getStorageKey(authenticatedTeam, 'mastermind');
  const saved = JSON.parse(localStorage.getItem(key) || '{}');
  if (!saved[row]) saved[row] = { colors: ['none', 'none', 'none', 'none'], pins: ['empty', 'empty', 'empty', 'empty'] };

  const curr = saved[row].pins[pIdx] || 'empty';
  const nextIdx = (PIN_STATES.indexOf(curr) + 1) % PIN_STATES.length;
  saved[row].pins[pIdx] = PIN_STATES[nextIdx];

  localStorage.setItem(key, JSON.stringify(saved));
  initMastermind();
}

function resetMastermindRows() {
  if (!confirm("Kladbord wissen?")) return;
  localStorage.removeItem(getStorageKey(authenticatedTeam, 'mastermind'));
  initMastermind();
}

function updateTeamStats() {
  if (!authenticatedTeam) return;
  const savedTasks = JSON.parse(localStorage.getItem(getStorageKey(authenticatedTeam, 'tasks')) || '{}');
  const approvedCount = Object.values(savedTasks).filter(v => v === 'approved').length;
  const pts = parseInt(localStorage.getItem(getStorageKey(authenticatedTeam, 'points')) || (approvedCount * 100), 10);

  document.getElementById('headerTeamScore').innerText = `${pts} PTS`;
}

// Tabs & Binary
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

  const target = document.getElementById(`tab-${tabId}`);
  if (target) target.classList.add('active');

  const btn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('onclick').includes(`'${tabId}'`));
  if (btn) btn.classList.add('active');
}

function decodeBinary() {
  const input = document.getElementById('binaryInput').value.trim();
  if (!input) return document.getElementById('binaryOutput').innerText = "-- Geen invoer --";

  const tokens = input.split(/\s+/);
  let decoded = "";
  try {
    for (let t of tokens) {
      if (t.length > 0) decoded += String.fromCharCode(parseInt(t, 2));
    }
    document.getElementById('binaryOutput').innerText = decoded || "-- Foutief --";
  } catch (err) {
    document.getElementById('binaryOutput').innerText = "Fout in binaire code.";
  }
}

function clearBinary() {
  document.getElementById('binaryInput').value = '';
  document.getElementById('binaryOutput').innerText = '-- Geen invoer --';
}

// Timer
let totalSeconds = 120 * 60;
let timerRunning = true;

function tickTimer() {
  if (timerRunning && totalSeconds > 0) {
    totalSeconds--;
    localStorage.setItem('aicore_timer_seconds', totalSeconds);
  }

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  document.getElementById('gameTimer').innerText = 
    `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function startTimer() { timerRunning = true; }
function pauseTimer() { timerRunning = false; }
function resetTimer(mins = 120) { totalSeconds = mins * 60; tickTimer(); }

// ==========================================================================
// EMERGENCY LOCKDOWN & LIVE AUDIO SYNC
// ==========================================================================

function sendEmergencyLockdown() {
  const title = document.getElementById('adminEmergencyTitle').value.trim() || "🚨 NOODBEVEL VAN DE LEIDING";
  const text = document.getElementById('adminEmergencyText').value.trim();
  const fileInput = document.getElementById('adminAudioFileInput');

  if (!text && (!fileInput.files || fileInput.files.length === 0)) {
    return alert("Typ minstens een tekstbericht of voeg een audiobestand toe!");
  }

  // Audio file naar Base64 dataURL converteren zodat het lokaal/cross-browser afspeelt
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const audioDataUrl = e.target.result;
      publishEmergencyPayload(title, text, audioDataUrl);
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    publishEmergencyPayload(title, text, null);
  }
}

function publishEmergencyPayload(title, text, audioUrl) {
  const payload = {
    id: Date.now(),
    title,
    text: text || "Luister naar het meegestuurde audiobericht hieronder.",
    audioUrl
  };

  localStorage.setItem('aicore_emergency_lockdown', JSON.stringify(payload));
  
  // Reset admin inputs
  document.getElementById('adminEmergencyTitle').value = '';
  document.getElementById('adminEmergencyText').value = '';
  document.getElementById('adminAudioFileInput').value = '';
  
  showToast("🚨 Noodbevel verzonden! Alle team-schermen zijn nu geblokkeerd.");
  checkEmergencyLockdown();
}

function checkEmergencyLockdown() {
  const raw = localStorage.getItem('aicore_emergency_lockdown');
  if (!raw) return;

  const payload = JSON.parse(raw);
  const dismissedId = sessionStorage.getItem('aicore_dismissed_lockdown_id');

  // Toon als deze nog niet bevestigd is in de huidige sessie
  if (dismissedId !== String(payload.id)) {
    document.getElementById('lockdownTitle').innerText = payload.title;
    document.getElementById('lockdownText').innerText = payload.text;

    const audioContainer = document.getElementById('lockdownAudioContainer');
    const audioPlayer = document.getElementById('lockdownAudioPlayer');

    if (payload.audioUrl) {
      audioPlayer.src = payload.audioUrl;
      audioContainer.style.display = 'block';
      audioPlayer.play().catch(() => {});
    } else {
      audioContainer.style.display = 'none';
      audioPlayer.src = '';
    }

    document.getElementById('lockdownModal').style.display = 'flex';
  }
}

function dismissLockdown() {
  const raw = localStorage.getItem('aicore_emergency_lockdown');
  if (raw) {
    const payload = JSON.parse(raw);
    sessionStorage.setItem('aicore_dismissed_lockdown_id', String(payload.id));
  }
  const audioPlayer = document.getElementById('lockdownAudioPlayer');
  audioPlayer.pause();
  document.getElementById('lockdownModal').style.display = 'none';
}

// ==========================================================================
// ADMIN CONTROLS & SUBMISSIONS
// ==========================================================================
function openAdminModal() { document.getElementById('adminModal').classList.add('open'); }
function closeAdminModal() { document.getElementById('adminModal').classList.remove('open'); }

function loginAdmin() {
  const p = document.getElementById('adminPasswordInput').value;
  if (p === 'admin123' || p === 'core2026') {
    document.getElementById('adminAuthSection').style.display = 'none';
    document.getElementById('adminControlsSection').style.display = 'block';
    renderAdminSubmissions();
    renderAdminTeamsManager();
  } else {
    document.getElementById('adminAuthError').style.display = 'block';
  }
}

function renderAdminSubmissions() {
  const tbody = document.getElementById('adminSubmissionsBody');
  tbody.innerHTML = '';
  const subs = JSON.parse(localStorage.getItem('aicore_submissions') || '[]');

  if (subs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="color:var(--text-muted); text-align:center;">Geen openstaande inzendingen via GSM.</td></tr>';
    return;
  }

  subs.forEach(s => {
    const tInfo = TEAMS_INFO[s.teamKey];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${tInfo.icon} ${tInfo.name}</strong><br><small style="color:var(--text-muted);">${s.time}</small></td>
      <td>${s.taskName}</td>
      <td><span style="color:${s.status === 'approved' ? 'var(--emerald)' : 'var(--amber)'}">${s.status === 'approved' ? '✓ Goedgekeurd' : '⏳ Wacht op check'}</span></td>
      <td>
        ${s.status !== 'approved' ? `
          <button class="btn btn-primary btn-sm" onclick="adminApprove('${s.teamKey}', '${s.taskId}')">✓ Beloon (+100 PTS)</button>
        ` : 'Klaar'}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function adminApprove(teamKey, taskId) {
  const key = getStorageKey(teamKey, 'tasks');
  const tasks = JSON.parse(localStorage.getItem(key) || '{}');
  tasks[taskId] = 'approved';
  localStorage.setItem(key, JSON.stringify(tasks));

  const ptsKey = getStorageKey(teamKey, 'points');
  const cur = parseInt(localStorage.getItem(ptsKey) || '0', 10);
  localStorage.setItem(ptsKey, cur + 100);

  const subs = JSON.parse(localStorage.getItem('aicore_submissions') || '[]');
  const match = subs.find(s => s.teamKey === teamKey && s.taskId === taskId);
  if (match) match.status = 'approved';
  localStorage.setItem('aicore_submissions', JSON.stringify(subs));

  renderAdminSubmissions();
  renderAdminTeamsManager();
  renderSectors();
  updateTeamStats();
  showToast(`+100 PTS toegekend aan ${TEAMS_INFO[teamKey].name}!`);
}

function renderAdminTeamsManager() {
  const tbody = document.getElementById('adminTeamsManagerBody');
  tbody.innerHTML = '';

  Object.keys(TEAMS_INFO).forEach(tKey => {
    const tInfo = TEAMS_INFO[tKey];
    const tasks = JSON.parse(localStorage.getItem(getStorageKey(tKey, 'tasks')) || '{}');
    const done = Object.values(tasks).filter(v => v === 'approved').length;
    const pts = localStorage.getItem(getStorageKey(tKey, 'points')) || (done * 100);
    const pass = getTeamPassword(tKey) || 'Niet ingesteld';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${tInfo.icon} ${tInfo.name}</strong></td>
      <td style="color:var(--emerald); font-weight:700;">${pts} PTS</td>
      <td>${done} / 12</td>
      <td><code>${pass}</code></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="adminResetPw('${tKey}')">Reset PW</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function adminResetPw(tKey) {
  const n = prompt(`Nieuw wachtwoord voor ${TEAMS_INFO[tKey].name}:`, "1234");
  if (n) {
    setTeamPassword(tKey, n);
    renderAdminTeamsManager();
    showToast(`Wachtwoord gewijzigd.`);
  }
}

// Toast
let toastT = null;
function showToast(msg) {
  const t = document.getElementById('toastNotification');
  t.innerText = msg;
  t.style.display = 'block';
  clearTimeout(toastT);
  toastT = setTimeout(() => { t.style.display = 'none'; }, 3000);
}

// Onload
window.onload = function() {
  const savedTimer = localStorage.getItem('aicore_timer_seconds');
  if (savedTimer) totalSeconds = parseInt(savedTimer, 10);
  setInterval(tickTimer, 1000);
  tickTimer();

  window.addEventListener('storage', function(e) {
    if (e.key === 'aicore_emergency_lockdown') {
      checkEmergencyLockdown();
    }
    if (e.key && (e.key.includes('tasks') || e.key.includes('points'))) {
      renderSectors();
      updateTeamStats();
    }
  });

  const active = sessionStorage.getItem('aicore_active_team');
  if (active) {
    loginSuccess(active);
  } else {
    document.getElementById('authGateModal').style.display = 'flex';
    onGateTeamChange();
  }
};
