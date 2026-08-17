/**
 * AETHER_OS // BATTLE OF THE AIS
 * State Management, WhatsApp Evidence Submissions & Admin Reward Dashboard
 */

const WHATSAPP_PHONE = "32475848983";

const SECTORS_DATA = [
  {
    id: '1',
    title: 'SECTOR 1: PROMPT ENGINEERING',
    location: 'Achter de Hoofdtent',
    tasks: [
      { id: 's1-a', code: 'Opdracht A', name: 'Audio Prompt', pts: 100, desc: 'Verstoring in spraakmodule. Stuur 1 operator naar het zendstation met walkietalkie. Bouw het fysieke LEGO-prototype na via gesproken commando\'s.' },
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
      { id: 's2-b', code: 'Opdracht B', name: 'Motion Tracking', pts: 100, desc: 'Kinematische calibratie. Bekijk de robotdans van de posthouder en doe deze binnen 2 minuten synchroon na met het hele team.' },
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

const TEAMS_INFO = {
  chatgpt: { name: 'Team ChatGPT', spec: 'GPT-4o Supercluster', icon: '🟢' },
  midjourney: { name: 'Team Midjourney', spec: 'v6.1 Diffusion Matrix', icon: '🎨' },
  gemini: { name: 'Team Gemini', spec: '1.5 Pro Multimodal Core', icon: '✨' },
  sora: { name: 'Team Sora', spec: 'Diffusion Kinetic Engine', icon: '🎬' },
  copilot: { name: 'Team Copilot', spec: 'Neural Autopilot Cluster', icon: '⚡' }
};

const MASTERMIND_COLORS = ['none', 'red', 'blue', 'green', 'yellow', 'orange', 'purple'];
const PIN_STATES = ['empty', 'black', 'white'];

// Web Audio API
let sfxEnabled = true;
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch(e) {}
}

function playSuccessSound() {
  if (!sfxEnabled) return;
  playBeep(440, 0.08);
  setTimeout(() => playBeep(660, 0.1), 80);
  setTimeout(() => playBeep(880, 0.18), 160);
}

// Authentication State
let authenticatedTeam = null;
let currentSectorFilter = 'all';

function getStorageKey(team, subkey) {
  return `aether_${team}_${subkey}`;
}

function getTeamPassword(teamKey) {
  return localStorage.getItem(`aether_pw_${teamKey}`);
}

function setTeamPassword(teamKey, newPw) {
  localStorage.setItem(`aether_pw_${teamKey}`, newPw);
}

function onGateTeamChange() {
  const teamKey = document.getElementById('gateTeamSelect').value;
  const existingPw = getTeamPassword(teamKey);
  const label = document.getElementById('gatePassLabel');
  const input = document.getElementById('gatePasswordInput');
  input.value = '';
  document.getElementById('gateErrorMsg').innerText = '';

  if (!existingPw) {
    label.innerText = "Stel een NIEUW wachtwoord/pincode in:";
    input.placeholder = "Kies wachtwoord...";
  } else {
    label.innerText = "Voer team-wachtwoord in:";
    input.placeholder = "Wachtwoord...";
  }
}

function submitTeamAuth() {
  const teamKey = document.getElementById('gateTeamSelect').value;
  const enteredPw = document.getElementById('gatePasswordInput').value.trim();
  const existingPw = getTeamPassword(teamKey);
  const errorEl = document.getElementById('gateErrorMsg');

  if (!enteredPw) {
    errorEl.innerText = "Vul een wachtwoord in.";
    return;
  }

  if (!existingPw) {
    setTeamPassword(teamKey, enteredPw);
    loginSuccess(teamKey);
    showToast(`🔒 Wachtwoord opgeslagen voor ${TEAMS_INFO[teamKey].name}!`);
  } else if (existingPw === enteredPw || enteredPw === 'admin123') {
    loginSuccess(teamKey);
  } else {
    errorEl.innerText = "Onjuist wachtwoord voor dit team!";
    playBeep(200, 0.25, 'sawtooth');
  }
}

function loginSuccess(teamKey) {
  authenticatedTeam = teamKey;
  sessionStorage.setItem('aether_active_team', teamKey);
  document.getElementById('authGateModal').style.display = 'none';
  
  const info = TEAMS_INFO[teamKey];
  document.getElementById('currentTeamTitle').innerText = info.name;
  document.getElementById('currentTeamSpec').innerText = info.spec;
  document.getElementById('teamAvatarIcon').innerText = info.icon;
  document.getElementById('activeNodeLabel').innerText = `${info.name.toUpperCase()} // ACTIVE`;

  playSuccessSound();
  showToast(`Ingelogd als ${info.name}`);

  renderSectors();
  initMastermind();
  updateTeamStats();
}

function logoutCurrentTeam() {
  sessionStorage.removeItem('aether_active_team');
  authenticatedTeam = null;
  document.getElementById('authGateModal').style.display = 'flex';
  onGateTeamChange();
}

// Sectors & Missions
let activePendingTask = null;

function renderSectors() {
  if (!authenticatedTeam) return;
  const container = document.getElementById('sectorsContainer');
  container.innerHTML = '';

  const savedTasks = JSON.parse(localStorage.getItem(getStorageKey(authenticatedTeam, 'tasks')) || '{}');

  SECTORS_DATA.forEach(sec => {
    if (currentSectorFilter !== 'all' && sec.id !== currentSectorFilter) return;

    const card = document.createElement('div');
    card.className = 'sector-card';

    const completedInSec = sec.tasks.filter(t => savedTasks[t.id] === 'approved').length;

    let tasksHTML = '';
    sec.tasks.forEach(t => {
      const status = savedTasks[t.id] || 'open';
      let btnLabel = 'Bewijs Indienen 📤';
      let btnClass = '';

      if (status === 'pending') {
        btnLabel = 'In Verificatie... ⏳';
        btnClass = 'pending-btn';
      } else if (status === 'approved') {
        btnLabel = 'Goedgekeurd (+100 PTS) ✓';
        btnClass = 'done-btn';
      }

      tasksHTML += `
        <div class="task-card ${status}">
          <div class="task-top">
            <span>${t.code}: ${t.name}</span>
            <span class="task-pts">+${t.pts} PTS</span>
          </div>
          <p class="task-desc">${t.desc}</p>
          <button class="task-btn ${btnClass}" onclick="openEvidenceSubmission('${sec.title}', '${t.id}', '${t.code}: ${t.name}')" ${status === 'approved' ? 'disabled' : ''}>
            ${btnLabel}
          </button>
        </div>
      `;
    });

    card.innerHTML = `
      <div class="sec-head">
        <div>
          <h3>${sec.title}</h3>
          <div class="sec-loc">📍 ${sec.location}</div>
        </div>
        <span class="sec-progress">${completedInSec} / ${sec.tasks.length} KLAAR</span>
      </div>
      <div class="task-list">${tasksHTML}</div>
    `;

    container.appendChild(card);
  });

  updateTeamStats();
}

function openEvidenceSubmission(sectorTitle, taskId, taskName) {
  playBeep(600, 0.05);
  activePendingTask = { sectorTitle, taskId, taskName, teamKey: authenticatedTeam };

  document.getElementById('evidenceTaskLabel').innerText = `${sectorTitle} - ${taskName}`;
  
  const teamName = TEAMS_INFO[authenticatedTeam].name;
  const msg = encodeURIComponent(`🚨 [MISSIE-BEWIJS] ${teamName}\nSector: ${sectorTitle}\nOpdracht: ${taskName}\n\n-> Hierbij ons bewijs voor verificatie!`);
  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${msg}`;
  
  document.getElementById('whatsappDirectLink').setAttribute('href', waUrl);
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

  logGlobalSubmission(activePendingTask.teamKey, activePendingTask.taskId, activePendingTask.taskName, activePendingTask.sectorTitle);

  closeEvidenceModal();
  renderSectors();
  showToast("⏳ Bewijs verzonden! Wacht op check van de leiding.");
}

function filterSectors(sectorId) {
  playBeep(500, 0.04);
  currentSectorFilter = sectorId;
  document.querySelectorAll('.filter-chip').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${sectorId}'`));
  });
  renderSectors();
}

function logGlobalSubmission(teamKey, taskId, taskName, sectorTitle) {
  const submissions = JSON.parse(localStorage.getItem('aether_submissions') || '[]');
  const existingIdx = submissions.findIndex(s => s.teamKey === teamKey && s.taskId === taskId);
  const entry = {
    teamKey,
    taskId,
    taskName,
    sectorTitle,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'pending'
  };

  if (existingIdx >= 0) {
    submissions[existingIdx] = entry;
  } else {
    submissions.unshift(entry);
  }
  localStorage.setItem('aether_submissions', JSON.stringify(submissions));
}

// Mastermind Module
function initMastermind() {
  if (!authenticatedTeam) return;
  const board = document.getElementById('mastermindBoard');
  board.innerHTML = '';

  const savedData = JSON.parse(localStorage.getItem(getStorageKey(authenticatedTeam, 'mastermind')) || '{}');

  for (let r = 1; r <= 6; r++) {
    const row = document.createElement('div');
    row.className = 'mm-row';

    const rowData = savedData[r] || { colors: ['none', 'none', 'none', 'none'], pins: ['empty', 'empty', 'empty', 'empty'] };

    let dotsHTML = '<div class="mm-slots">';
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

    row.innerHTML = `<span class="mm-label">POGING ${r}</span>${dotsHTML}${pinsHTML}`;
    board.appendChild(row);
  }

  updateTeamStats();
}

function cycleColor(row, colIndex) {
  playBeep(600, 0.04);
  const key = getStorageKey(authenticatedTeam, 'mastermind');
  const saved = JSON.parse(localStorage.getItem(key) || '{}');
  if (!saved[row]) saved[row] = { colors: ['none', 'none', 'none', 'none'], pins: ['empty', 'empty', 'empty', 'empty'] };

  const currentColor = saved[row].colors[colIndex] || 'none';
  const nextIdx = (MASTERMIND_COLORS.indexOf(currentColor) + 1) % MASTERMIND_COLORS.length;
  saved[row].colors[colIndex] = MASTERMIND_COLORS[nextIdx];

  localStorage.setItem(key, JSON.stringify(saved));
  initMastermind();
}

function cyclePin(row, pinIndex) {
  playBeep(800, 0.04);
  const key = getStorageKey(authenticatedTeam, 'mastermind');
  const saved = JSON.parse(localStorage.getItem(key) || '{}');
  if (!saved[row]) saved[row] = { colors: ['none', 'none', 'none', 'none'], pins: ['empty', 'empty', 'empty', 'empty'] };

  const currentPin = saved[row].pins[pinIndex] || 'empty';
  const nextIdx = (PIN_STATES.indexOf(currentPin) + 1) % PIN_STATES.length;
  saved[row].pins[pinIndex] = PIN_STATES[nextIdx];

  localStorage.setItem(key, JSON.stringify(saved));
  initMastermind();
}

function resetMastermindRows() {
  if (!confirm("Alle Mastermind test-rijen wissen?")) return;
  localStorage.removeItem(getStorageKey(authenticatedTeam, 'mastermind'));
  initMastermind();
  showToast("Mastermind kladbord gereset.");
}

function updateTeamStats() {
  if (!authenticatedTeam) return;

  const savedTasks = JSON.parse(localStorage.getItem(getStorageKey(authenticatedTeam, 'tasks')) || '{}');
  const approvedCount = Object.values(savedTasks).filter(v => v === 'approved').length;
  const currentPoints = parseInt(localStorage.getItem(getStorageKey(authenticatedTeam, 'points')) || (approvedCount * 100), 10);

  document.getElementById('teamTasksCount').innerText = `${approvedCount} / 12`;
  document.getElementById('teamPointsScore').innerText = `${currentPoints} PTS`;

  const savedMm = JSON.parse(localStorage.getItem(getStorageKey(authenticatedTeam, 'mastermind')) || '{}');
  let hasWon = false;
  Object.values(savedMm).forEach(row => {
    if (row.pins && row.pins.filter(p => p === 'black').length === 4) hasWon = true;
  });

  const coreStatusEl = document.getElementById('teamCoreStatus');
  if (hasWon) {
    coreStatusEl.innerText = "GEKRAAKT! 🔓";
    coreStatusEl.style.color = "var(--accent-emerald)";
  } else {
    coreStatusEl.innerText = "VERGRENDELD 🔒";
    coreStatusEl.style.color = "var(--accent-rose)";
  }
}

// Tabs & Binary
function switchTab(tabId) {
  playBeep(450, 0.03);
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  const targetTab = document.getElementById(`tab-${tabId}`);
  if (targetTab) targetTab.classList.add('active');

  const btn = Array.from(document.querySelectorAll('.nav-item')).find(b => b.getAttribute('onclick').includes(`'${tabId}'`));
  if (btn) btn.classList.add('active');
}

function decodeBinary() {
  playBeep(650, 0.05);
  const input = document.getElementById('binaryInput').value.trim();
  if (!input) return document.getElementById('binaryOutput').innerText = "-- Invoer vereist --";

  const binaryTokens = input.split(/\s+/);
  let decoded = "";
  try {
    for (let token of binaryTokens) {
      if (token.length > 0) decoded += String.fromCharCode(parseInt(token, 2));
    }
    document.getElementById('binaryOutput').innerText = decoded || "-- Foutief --";
  } catch (err) {
    document.getElementById('binaryOutput').innerText = "Foutief formaat.";
  }
}

function clearBinary() {
  document.getElementById('binaryInput').value = '';
  document.getElementById('binaryOutput').innerText = '-- Invoer vereist --';
}

// Timer
let totalSeconds = 120 * 60;
let timerRunning = true;
let timerInterval = null;

function tickTimer() {
  if (timerRunning && totalSeconds > 0) {
    totalSeconds--;
    localStorage.setItem('aether_timer_seconds', totalSeconds);
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById('gameTimer').innerText = 
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const integrityPct = Math.max(0, Math.min(100, Math.round((totalSeconds / (120 * 60)) * 100)));
  const fillEl = document.getElementById('integrityFill');
  const valEl = document.getElementById('integrityVal');
  if (fillEl && valEl) {
    fillEl.style.width = `${integrityPct}%`;
    valEl.innerText = `${integrityPct}%`;
  }
}

function startTimer() { timerRunning = true; showToast("Timer gestart."); }
function pauseTimer() { timerRunning = false; showToast("Timer gepauzeerd."); }
function resetTimer(mins = 120) { totalSeconds = mins * 60; tickTimer(); showToast(`Timer gereset.`); }

// Admin Center
function openAdminModal() {
  playBeep(400, 0.05);
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
    renderAdminSubmissions();
    renderAdminTeamsManager();
  } else {
    playBeep(200, 0.25, 'sawtooth');
    document.getElementById('adminAuthError').style.display = 'block';
  }
}

function renderAdminSubmissions() {
  const tbody = document.getElementById('adminSubmissionsBody');
  tbody.innerHTML = '';
  const submissions = JSON.parse(localStorage.getItem('aether_submissions') || '[]');

  if (submissions.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="color:var(--text-muted); text-align:center;">Geen openstaande WhatsApp inzendingen.</td></tr>';
    return;
  }

  submissions.forEach(sub => {
    const tInfo = TEAMS_INFO[sub.teamKey];
    const isApproved = sub.status === 'approved';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${tInfo.icon} ${tInfo.name}</strong><br><small style="color:var(--text-muted);">${sub.time}</small></td>
      <td><strong>${sub.taskName}</strong></td>
      <td><span style="color:${isApproved ? 'var(--accent-emerald)' : 'var(--accent-amber)'}">${isApproved ? '✓ Goedgekeurd' : '⏳ Wacht op check'}</span></td>
      <td>
        ${!isApproved ? `
          <button class="btn btn-primary btn-sm" onclick="adminApproveTask('${sub.teamKey}', '${sub.taskId}', 100)">✓ Beloon (+100 PTS)</button>
          <button class="btn btn-secondary btn-sm" onclick="adminRejectTask('${sub.teamKey}', '${sub.taskId}')">✕</button>
        ` : `<span style="color:var(--accent-emerald)">Toegekend</span>`}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function adminApproveTask(teamKey, taskId, pointsReward = 100) {
  const key = getStorageKey(teamKey, 'tasks');
  const tasks = JSON.parse(localStorage.getItem(key) || '{}');
  tasks[taskId] = 'approved';
  localStorage.setItem(key, JSON.stringify(tasks));

  const pointsKey = getStorageKey(teamKey, 'points');
  const currentPts = parseInt(localStorage.getItem(pointsKey) || '0', 10);
  localStorage.setItem(pointsKey, currentPts + pointsReward);

  const submissions = JSON.parse(localStorage.getItem('aether_submissions') || '[]');
  const match = submissions.find(s => s.teamKey === teamKey && s.taskId === taskId);
  if (match) match.status = 'approved';
  localStorage.setItem('aether_submissions', JSON.stringify(submissions));

  playSuccessSound();
  renderAdminSubmissions();
  renderAdminTeamsManager();
  renderSectors();
  updateTeamStats();
  showToast(`🎉 ${TEAMS_INFO[teamKey].name} beloond met +${pointsReward} PTS!`);
}

function adminRejectTask(teamKey, taskId) {
  const key = getStorageKey(teamKey, 'tasks');
  const tasks = JSON.parse(localStorage.getItem(key) || '{}');
  tasks[taskId] = 'open';
  localStorage.setItem(key, JSON.stringify(tasks));

  const submissions = JSON.parse(localStorage.getItem('aether_submissions') || '[]');
  const filtered = submissions.filter(s => !(s.teamKey === teamKey && s.taskId === taskId));
  localStorage.setItem('aether_submissions', JSON.stringify(filtered));

  renderAdminSubmissions();
  renderAdminTeamsManager();
  renderSectors();
  showToast("Inzending afgewezen.");
}

function renderAdminTeamsManager() {
  const tbody = document.getElementById('adminTeamsManagerBody');
  tbody.innerHTML = '';

  Object.keys(TEAMS_INFO).forEach(tKey => {
    const tInfo = TEAMS_INFO[tKey];
    const tasks = JSON.parse(localStorage.getItem(getStorageKey(tKey, 'tasks')) || '{}');
    const doneCount = Object.values(tasks).filter(v => v === 'approved').length;
    const points = localStorage.getItem(getStorageKey(tKey, 'points')) || (doneCount * 100);
    const pass = getTeamPassword(tKey) || 'Niet ingesteld';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${tInfo.icon} ${tInfo.name}</strong></td>
      <td><span style="color:var(--accent-emerald); font-weight:700;">${points} PTS</span></td>
      <td>${doneCount} / 12</td>
      <td><code>${pass}</code></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="adminResetPassword('${tKey}')">Reset PW</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function adminResetPassword(teamKey) {
  const newPw = prompt(`Nieuw wachtwoord voor ${TEAMS_INFO[teamKey].name}:`, "1234");
  if (newPw) {
    setTeamPassword(teamKey, newPw);
    renderAdminTeamsManager();
    showToast(`Wachtwoord gewijzigd.`);
  }
}

function publishBroadcast() {
  const text = document.getElementById('adminBroadcastInput').value.trim();
  if (!text) return;
  localStorage.setItem('aether_broadcast', text);
  document.getElementById('broadcastDisplay').innerText = text;
  document.getElementById('adminBroadcastInput').value = '';
  playSuccessSound();
  showToast("Broadcast gepubliceerd!");
}

// Toast
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  toast.innerText = message;
  toast.style.display = 'block';
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

// Setup Onload
window.onload = function() {
  const savedTimer = localStorage.getItem('aether_timer_seconds');
  if (savedTimer) totalSeconds = parseInt(savedTimer, 10);
  timerInterval = setInterval(tickTimer, 1000);
  tickTimer();

  const savedBroadcast = localStorage.getItem('aether_broadcast');
  if (savedBroadcast) document.getElementById('broadcastDisplay').innerText = savedBroadcast;

  document.getElementById('audioToggleBtn').onclick = function() {
    sfxEnabled = !sfxEnabled;
    document.getElementById('sfxStatus').innerText = sfxEnabled ? 'AAN' : 'UIT';
    if (sfxEnabled) playBeep(600, 0.08);
  };

  window.addEventListener('storage', function(e) {
    if (e.key === 'aether_broadcast') {
      document.getElementById('broadcastDisplay').innerText = e.newValue || '';
      playSuccessSound();
      showToast("Nieuw broadcast bericht!");
    }
    if (e.key && (e.key.includes('tasks') || e.key.includes('points'))) {
      renderSectors();
      updateTeamStats();
    }
  });

  const activeSessionTeam = sessionStorage.getItem('aether_active_team');
  if (activeSessionTeam) {
    loginSuccess(activeSessionTeam);
  } else {
    document.getElementById('authGateModal').style.display = 'flex';
    onGateTeamChange();
  }
};
