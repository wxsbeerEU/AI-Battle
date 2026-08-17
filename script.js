/**
 * CYBER_CORE ENGINE // BATTLE OF THE AIS
 * Team Authentication, WhatsApp Evidence Submissions, Admin Reward Center.
 */

const WHATSAPP_PHONE = "32475848983"; // 0475848983 in internationaal formaat

const SECTORS_DATA = [
  {
    id: '1',
    title: 'SECTOR 1: PROMPT ENGINEERING',
    location: 'Achter de Hoofdtent',
    color: '#00e5ff',
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
    color: '#b336ff',
    tasks: [
      { id: 's2-a', code: 'Opdracht A', name: 'Hallucination Drawing', pts: 100, desc: 'Generatieve beeldfout. 1 teamlid trekt een prompt en tekent deze direct. Het team moet binnen 2 minuten de exacte prompttekst decoderen.' },
      { id: 's2-b', code: 'Opdracht B', name: 'Motion Tracking', pts: 100, desc: 'Kinematische calibratie. Bekijk de robotdans van de posthouder en repliceer deze binnen 2 minuten 100% synchroon met het volledige team.' },
      { id: 's2-c', code: 'Opdracht C', name: 'Deepfake Detector', pts: 100, desc: 'Visuele fraude gedetecteerd. Analyseer de 10 data-afbeeldingen bij de posthouder en markeer alle 5 de AI-deepfakes.' }
    ]
  },
  {
    id: '3',
    title: 'SECTOR 3: CYBERSECURITY FIREWALL',
    location: 'In het Bos',
    color: '#ff2a5f',
    tasks: [
      { id: 's3-a', code: 'Opdracht A', name: 'DDoS Attack', pts: 100, desc: 'Serveroverbelasting. Steek de firewall-zone over. Minstens 6 teamleden moeten de overkant bereiken zonder geraakt te worden door trefballen.' },
      { id: 's3-b', code: 'Opdracht B', name: 'Laser Grid Defusal', pts: 100, desc: 'Inbraakdetectie actief. Doorkruis het touwenweb met belletjes. Het alarm mag maximaal 1 keer geactiveerd worden.' },
      { id: 's3-c', code: 'Opdracht C', name: 'Hardware Extraction', pts: 100, desc: 'Fysieke registerschade. Haal 5 microchips uit het koelvloeistof-reservoir (de bak) met enkel eetstokjes.' }
    ]
  },
  {
    id: '4',
    title: 'SECTOR 4: MACHINE LEARNING LOGIC',
    location: 'Bij het Kampvuur',
    color: '#ffd900',
    tasks: [
      { id: 's4-a', code: 'Opdracht A', name: 'Pattern Recognition', pts: 100, desc: 'Onbekend sorteeralgoritme. Analyseer de datakaarten en ontdek de verborgen sorteerregel binnen 2 pogingen.' },
      { id: 's4-b', code: 'Opdracht B', name: 'Bug Fixing', pts: 100, desc: 'Deadlock in het systeem. Los de fysieke knoop van teamhanden op tot een schone ring zonder het contact te verbreken.' },
      { id: 's4-c', code: 'Opdracht C', name: 'Binary Decoder', pts: 100, desc: 'Gecodeerd datafragment. Converteer de reeks binaire getallen via de ASCII-tabel naar het juiste wachtwoord.' }
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

// ==========================================================================
// AUDIO SYNTH
// ==========================================================================
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

// ==========================================================================
// TEAM AUTHENTICATION & LOGIN
// ==========================================================================
let authenticatedTeam = null;
let currentSectorFilter = 'all';

function getStorageKey(team, subkey) {
  return `cybercore_${team}_${subkey}`;
}

function getTeamPassword(teamKey) {
  return localStorage.getItem(`cybercore_pw_${teamKey}`);
}

function setTeamPassword(teamKey, newPw) {
  localStorage.setItem(`cybercore_pw_${teamKey}`, newPw);
}

function onGateTeamChange() {
  const teamKey = document.getElementById('gateTeamSelect').value;
  const existingPw = getTeamPassword(teamKey);
  const label = document.getElementById('gatePassLabel');
  const input = document.getElementById('gatePasswordInput');
  input.value = '';
  document.getElementById('gateErrorMsg').style.display = 'none';

  if (!existingPw) {
    label.innerText = "Stel een NIEUW wachtwoord in voor dit team:";
    input.placeholder = "Kies wachtwoord/pincode...";
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
    errorEl.innerText = "Wachtwoord mag niet leeg zijn.";
    errorEl.style.display = 'block';
    return;
  }

  // Eerste keer instellen of controleren
  if (!existingPw) {
    setTeamPassword(teamKey, enteredPw);
    loginSuccess(teamKey);
    showToast(`🔒 Nieuw wachtwoord opgeslagen voor ${TEAMS_INFO[teamKey].name}!`);
  } else if (existingPw === enteredPw || enteredPw === 'admin123') {
    loginSuccess(teamKey);
  } else {
    errorEl.innerText = "Onjuist wachtwoord voor dit team!";
    errorEl.style.display = 'block';
    playBeep(200, 0.3, 'sawtooth');
  }
}

function loginSuccess(teamKey) {
  authenticatedTeam = teamKey;
  sessionStorage.setItem('cybercore_active_team', teamKey);
  document.getElementById('authGateModal').style.display = 'none';
  
  const info = TEAMS_INFO[teamKey];
  document.getElementById('currentTeamTitle').innerText = info.name;
  document.getElementById('currentTeamSpec').innerText = info.spec;
  document.getElementById('teamAvatarIcon').innerText = info.icon;
  document.getElementById('activeNodeLabel').innerText = `NODE // ${info.name.toUpperCase()}`;

  playSuccessSound();
  showToast(`✅ Ingelogd als ${info.name}`);

  renderSectors();
  initMastermind();
  updateTeamStats();
}

function logoutCurrentTeam() {
  sessionStorage.removeItem('cybercore_active_team');
  authenticatedTeam = null;
  document.getElementById('authGateModal').style.display = 'flex';
  onGateTeamChange();
}

// ==========================================================================
// SECTORS & VERIFICATION MODAL
// ==========================================================================
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
    card.style.setProperty('--sector-color', sec.color);

    const completedInSec = sec.tasks.filter(t => savedTasks[t.id] === 'approved').length;

    let tasksHTML = '';
    sec.tasks.forEach(t => {
      const status = savedTasks[t.id] || 'open'; // open, pending, approved
      let btnLabel = '📤 BEWIJS INDIENEN';
      let btnClass = '';

      if (status === 'pending') {
        btnLabel = '⏳ IN VERIFICATIE...';
        btnClass = 'pending-btn';
      } else if (status === 'approved') {
        btnLabel = '✓ GOEDGEKEURD (+100 PTS)';
        btnClass = 'done-btn';
      }

      tasksHTML += `
        <div class="task-item ${status}" id="task-${t.id}">
          <div class="task-header">
            <span class="task-name">${t.code}: ${t.name}</span>
            <span style="font-size:0.75rem; color:var(--neon-green)">+${t.pts} PTS</span>
          </div>
          <p class="task-body">"${t.desc}"</p>
          <div class="task-actions">
            <button class="task-btn ${btnClass}" onclick="openEvidenceSubmission('${sec.title}', '${t.id}', '${t.code}: ${t.name}')" ${status === 'approved' ? 'disabled' : ''}>
              ${btnLabel}
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
      <div class="task-list">${tasksHTML}</div>
    `;

    container.appendChild(card);
  });

  updateTeamStats();
}

function openEvidenceSubmission(sectorTitle, taskId, taskName) {
  playBeep(600, 0.08);
  activePendingTask = { sectorTitle, taskId, taskName, teamKey: authenticatedTeam };

  document.getElementById('evidenceTaskLabel').innerText = `${sectorTitle} - ${taskName}`;
  
  // WhatsApp Link pre-fill
  const teamName = TEAMS_INFO[authenticatedTeam].name;
  const msg = encodeURIComponent(`🚨 [CYBER-BEWIJS] ${teamName}\nSector: ${sectorTitle}\nOpdracht: ${taskName}\n\n-> Hierbij ons bewijs voor verificatie!`);
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

  // Log globally for Admin Inbox
  logGlobalSubmission(activePendingTask.teamKey, activePendingTask.taskId, activePendingTask.taskName, activePendingTask.sectorTitle);

  closeEvidenceModal();
  renderSectors();
  showToast("⏳ Bewijs geregistreerd! Wacht op goedkeuring van de leiding.");
}

function filterSectors(sectorId) {
  playBeep(500, 0.05);
  currentSectorFilter = sectorId;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${sectorId}'`));
  });
  renderSectors();
}

// Global Submission Tracking for Admin
function logGlobalSubmission(teamKey, taskId, taskName, sectorTitle) {
  const submissions = JSON.parse(localStorage.getItem('cybercore_submissions') || '[]');
  // Check if exists
  const existingIdx = submissions.findIndex(s => s.teamKey === teamKey && s.taskId === taskId);
  const entry = {
    id: `${teamKey}_${taskId}_${Date.now()}`,
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
  localStorage.setItem('cybercore_submissions', JSON.stringify(submissions));
}

// ==========================================
// MASTERMIND MODULE
// ==========================================
function initMastermind() {
  if (!authenticatedTeam) return;
  const board = document.getElementById('mastermindBoard');
  board.innerHTML = '';

  const savedData = JSON.parse(localStorage.getItem(getStorageKey(authenticatedTeam, 'mastermind')) || '{}');

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

    row.innerHTML = `<span class="row-label">POGING ${r}</span>${dotsHTML}${pinsHTML}`;
    board.appendChild(row);
  }

  updateTeamStats();
}

function cycleColor(row, colIndex) {
  playBeep(600, 0.05);
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
  playBeep(800, 0.05);
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
  if (!confirm("Weet je zeker dat je alle Mastermind rijen wilt wissen?")) return;
  localStorage.removeItem(getStorageKey(authenticatedTeam, 'mastermind'));
  initMastermind();
  showToast("🧹 Mastermind kladbord gewist.");
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
    coreStatusEl.style.color = "var(--neon-green)";
  } else {
    coreStatusEl.innerText = "VERGRENDELD 🔒";
    coreStatusEl.style.color = "var(--neon-pink)";
  }
}

// ==========================================
// TABS & TOOLS
// ==========================================
function switchTab(tabId) {
  playBeep(450, 0.05);
  document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-pill').forEach(el => el.classList.remove('active'));

  const targetTab = document.getElementById(`tab-${tabId}`);
  if (targetTab) targetTab.classList.add('active');

  const btn = Array.from(document.querySelectorAll('.nav-pill')).find(b => b.getAttribute('onclick').includes(`'${tabId}'`));
  if (btn) btn.classList.add('active');
}

function decodeBinary() {
  playBeep(650, 0.08);
  const input = document.getElementById('binaryInput').value.trim();
  if (!input) return document.getElementById('binaryOutput').innerText = "-- Geen invoer --";

  const binaryTokens = input.split(/\s+/);
  let decoded = "";
  try {
    for (let token of binaryTokens) {
      if (token.length > 0) decoded += String.fromCharCode(parseInt(token, 2));
    }
    document.getElementById('binaryOutput').innerText = decoded || "-- Foutief --";
  } catch (err) {
    document.getElementById('binaryOutput').innerText = "Fout in binaire reeks.";
  }
}

function clearBinary() {
  document.getElementById('binaryInput').value = '';
  document.getElementById('binaryOutput').innerText = '-- Wacht op invoer --';
}

// ==========================================
// TIMER
// ==========================================
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

  document.getElementById('gameTimer').innerText = 
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const integrityPct = Math.max(0, Math.min(100, Math.round((totalSeconds / (120 * 60)) * 100)));
  const fillEl = document.getElementById('integrityFill');
  const valEl = document.getElementById('integrityVal');
  if (fillEl && valEl) {
    fillEl.style.width = `${integrityPct}%`;
    valEl.innerText = `${integrityPct}% - ${integrityPct < 25 ? 'CRITICAL' : 'STABLE'}`;
  }
}

function startTimer() { timerRunning = true; showToast("⏱️ Timer hervat."); }
function pauseTimer() { timerRunning = false; showToast("⏸️ Timer gepauzeerd."); }
function resetTimer(mins = 120) { totalSeconds = mins * 60; tickTimer(); showToast(`🔄 Timer gereset.`); }

// ==========================================
// ADMIN BACKSITE & REWARD SYSTEM
// ==========================================
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
    renderAdminSubmissions();
    renderAdminTeamsManager();
  } else {
    playBeep(200, 0.3, 'sawtooth');
    document.getElementById('adminAuthError').style.display = 'block';
  }
}

function renderAdminSubmissions() {
  const tbody = document.getElementById('adminSubmissionsBody');
  tbody.innerHTML = '';
  const submissions = JSON.parse(localStorage.getItem('cybercore_submissions') || '[]');

  if (submissions.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="color:#64748b; text-align:center;">Geen openstaande bewijzen ingediend via WhatsApp.</td></tr>';
    return;
  }

  submissions.forEach(sub => {
    const tInfo = TEAMS_INFO[sub.teamKey];
    const isApproved = sub.status === 'approved';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${tInfo.icon} ${tInfo.name}</strong><br><small style="color:#64748b;">${sub.time}</small></td>
      <td><strong>${sub.taskName}</strong><br><small style="color:#94a3b8;">${sub.sectorTitle}</small></td>
      <td><span style="color:${isApproved ? 'var(--neon-green)' : 'var(--neon-yellow)'}">${isApproved ? '✓ GOEDGEKEURD' : '⏳ WACHT OP CHECK'}</span></td>
      <td>
        ${!isApproved ? `
          <button class="mini-btn green" onclick="adminApproveTask('${sub.teamKey}', '${sub.taskId}', 100)">✓ Goedkeuren & Reward (+100 PTS)</button>
          <button class="mini-btn" onclick="adminRejectTask('${sub.teamKey}', '${sub.taskId}')">✕ Afkeuren</button>
        ` : `<span style="color:var(--neon-green)">Beloning toegekend</span>`}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function adminApproveTask(teamKey, taskId, pointsReward = 100) {
  // Update team tasks
  const key = getStorageKey(teamKey, 'tasks');
  const tasks = JSON.parse(localStorage.getItem(key) || '{}');
  tasks[taskId] = 'approved';
  localStorage.setItem(key, JSON.stringify(tasks));

  // Update points
  const pointsKey = getStorageKey(teamKey, 'points');
  const currentPts = parseInt(localStorage.getItem(pointsKey) || '0', 10);
  localStorage.setItem(pointsKey, currentPts + pointsReward);

  // Update submission record
  const submissions = JSON.parse(localStorage.getItem('cybercore_submissions') || '[]');
  const match = submissions.find(s => s.teamKey === teamKey && s.taskId === taskId);
  if (match) match.status = 'approved';
  localStorage.setItem('cybercore_submissions', JSON.stringify(submissions));

  playSuccessSound();
  renderAdminSubmissions();
  renderAdminTeamsManager();
  renderSectors();
  updateTeamStats();
  showToast(`🎉 ${TEAMS_INFO[teamKey].name} beloond met +${pointsReward} punten!`);
}

function adminRejectTask(teamKey, taskId) {
  const key = getStorageKey(teamKey, 'tasks');
  const tasks = JSON.parse(localStorage.getItem(key) || '{}');
  tasks[taskId] = 'open';
  localStorage.setItem(key, JSON.stringify(tasks));

  const submissions = JSON.parse(localStorage.getItem('cybercore_submissions') || '[]');
  const filtered = submissions.filter(s => !(s.teamKey === teamKey && s.taskId === taskId));
  localStorage.setItem('cybercore_submissions', JSON.stringify(filtered));

  renderAdminSubmissions();
  renderAdminTeamsManager();
  renderSectors();
  showToast("Inzending afgekeurd.");
}

function renderAdminTeamsManager() {
  const tbody = document.getElementById('adminTeamsManagerBody');
  tbody.innerHTML = '';

  Object.keys(TEAMS_INFO).forEach(tKey => {
    const tInfo = TEAMS_INFO[tKey];
    const tasks = JSON.parse(localStorage.getItem(getStorageKey(tKey, 'tasks')) || '{}');
    const doneCount = Object.values(tasks).filter(v => v === 'approved').length;
    const points = localStorage.getItem(getStorageKey(tKey, 'points')) || (doneCount * 100);
    const pass = getTeamPassword(tKey) || 'Nog niet ingesteld';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${tInfo.icon} ${tInfo.name}</strong></td>
      <td><span style="color:var(--neon-green); font-weight:bold;">${points} PTS</span></td>
      <td>${doneCount} / 12</td>
      <td><code>${pass}</code></td>
      <td>
        <button class="mini-btn" onclick="adminResetPassword('${tKey}')">Reset PW</button>
        <button class="mini-btn" onclick="adminAdjustPoints('${tKey}')">PTS Wijzigen</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function adminResetPassword(teamKey) {
  const newPw = prompt(`Voer nieuw wachtwoord in voor ${TEAMS_INFO[teamKey].name}:`, "1234");
  if (newPw) {
    setTeamPassword(teamKey, newPw);
    renderAdminTeamsManager();
    showToast(`Wachtwoord voor ${TEAMS_INFO[teamKey].name} gewijzigd.`);
  }
}

function adminAdjustPoints(teamKey) {
  const cur = localStorage.getItem(getStorageKey(teamKey, 'points')) || '0';
  const val = prompt(`Aantal punten voor ${TEAMS_INFO[teamKey].name}:`, cur);
  if (val !== null) {
    localStorage.setItem(getStorageKey(teamKey, 'points'), parseInt(val, 10) || 0);
    renderAdminTeamsManager();
    updateTeamStats();
  }
}

function publishBroadcast() {
  const text = document.getElementById('adminBroadcastInput').value.trim();
  if (!text) return;
  setLiveBroadcast(text);
  document.getElementById('adminBroadcastInput').value = '';
}

function quickBroadcast(text) { setLiveBroadcast(text); }

function setLiveBroadcast(msg) {
  localStorage.setItem('cybercore_broadcast', msg);
  document.getElementById('broadcastDisplay').innerText = msg;
  document.getElementById('lastBroadcastTime').innerText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  playSuccessSound();
  showToast("📡 Broadcast verstuurd naar alle schermen!");
}

// Toast
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  toast.innerText = message;
  toast.style.display = 'block';
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { toast.style.display = 'none'; }, 3500);
}

// ==========================================
// INIT
// ==========================================
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

  // Sync cross-tab/laptop events
  window.addEventListener('storage', function(e) {
    if (e.key === 'cybercore_broadcast') {
      document.getElementById('broadcastDisplay').innerText = e.newValue || '';
      playSuccessSound();
      showToast("📡 Nieuw bevel van de leiding ontvangen!");
    }
    if (e.key && e.key.includes('tasks') || e.key.includes('points')) {
      renderSectors();
      updateTeamStats();
    }
  });

  // Check of team reeds ingelogd was in deze sessie
  const activeSessionTeam = sessionStorage.getItem('cybercore_active_team');
  if (activeSessionTeam) {
    loginSuccess(activeSessionTeam);
  } else {
    document.getElementById('authGateModal').style.display = 'flex';
    onGateTeamChange();
  }
};
