/**
 * AETHER_NET // CORE ENGINE
 * Superclusters, Decryption Shards, Quantum Parity Matrix, SysAdmin Backsite
 */

const SECTORS_DATA = [
  {
    id: '1',
    title: 'SECTOR 1: PROMPT ENGINEERING',
    location: 'Achter de Hoofdtent',
    tasks: [
      { id: 's1-a', code: 'Subroutine A', name: 'Audio Prompt Reconstructie', desc: 'Verstoring in spraakmodule. Stuur 1 operator naar het zendstation met Comms-Radio. Bouw het fysieke LEGO-prototype na via enkel gesproken commando\'s.' },
      { id: 's1-b', code: 'Subroutine B', name: 'Blind Vector Navigatie', desc: 'Visuele sensoren offline. Blinddoek 1 clusterlid (De Robot). Stuur de Robot met strikte stap-commando\'s foutloos door het mijnenveld.' },
      { id: 's1-c', code: 'Subroutine C', name: 'Data Censuur Protocol', desc: 'Datafilter corruptie. Lees het protocol voor aan de Sector Node zonder de 8 verboden woorden te triggeren.' }
    ]
  },
  {
    id: '2',
    title: 'SECTOR 2: CREATIVE NEURAL NET',
    location: 'Bij het Open Veld',
    tasks: [
      { id: 's2-a', code: 'Subroutine A', name: 'Hallucinatie Render', desc: 'Generatieve beeldfout. 1 clusterlid trekt een prompt en tekent deze direct. Het team moet binnen 2 minuten de exacte prompttekst decoderen.' },
      { id: 's2-b', code: 'Subroutine B', name: 'Kinematische Kalibratie', desc: 'Bekijk de robotdans van de Sector Node en repliceer deze binnen 2 minuten synchroon met het volledige cluster.' },
      { id: 's2-c', code: 'Subroutine C', name: 'Deepfake Data Scan', desc: 'Visuele fraude gedetecteerd. Analyseer de 10 data-afbeeldingen bij de Node en markeer alle 5 de AI-deepfakes.' }
    ]
  },
  {
    id: '3',
    title: 'SECTOR 3: CYBERSECURITY FIREWALL',
    location: 'In het Bos',
    tasks: [
      { id: 's3-a', code: 'Subroutine A', name: 'DDoS Firewall Breach', desc: 'Serveroverbelasting. Steek de firewall-zone over. Minstens 6 clusterleden moeten de overkant bereiken zonder geraakt te worden door trefballen.' },
      { id: 's3-b', code: 'Subroutine B', name: 'Laser Grid Defusal', desc: 'Inbraakdetectie actief. Doorkruis het touwenweb met belletjes. Het alarm mag maximaal 1 keer geactiveerd worden.' },
      { id: 's3-c', code: 'Subroutine C', name: 'Hardware Register Extractie', desc: 'Fysieke registerschade. Haal 5 microchips uit het koelvloeistof-reservoir met enkel eetstokjes.' }
    ]
  },
  {
    id: '4',
    title: 'SECTOR 4: MACHINE LEARNING LOGIC',
    location: 'Bij het Kampvuur',
    tasks: [
      { id: 's4-a', code: 'Subroutine A', name: 'Algoritme Patroonherkenning', desc: 'Onbekend sorteeralgoritme. Analyseer de datakaarten en ontdek de verborgen sorteerregel binnen 2 pogingen.' },
      { id: 's4-b', code: 'Subroutine B', name: 'Neural Deadlock Bugfix', desc: 'Deadlock in het netwerk. Los de fysieke knoop van teamhanden op tot een schone ring zonder het contact te verbreken.' },
      { id: 's4-c', code: 'Subroutine C', name: 'Binaire Data Decryptie', desc: 'Gecodeerd datafragment. Converteer de reeks binaire getallen via de ASCII-tabel naar het juiste wachtwoord.' }
    ]
  }
];

const TEAMS_INFO = {
  chatgpt: { name: 'Supercluster ChatGPT', icon: '🟢' },
  midjourney: { name: 'Supercluster Midjourney', icon: '🎨' },
  gemini: { name: 'Supercluster Gemini', icon: '✨' },
  claude: { name: 'Supercluster Claude', icon: '🧠' },
  sora: { name: 'Supercluster Sora', icon: '🎬' },
  copilot: { name: 'Supercluster Copilot', icon: '⚡' }
};

const COLOR_MAP = {
  red: '🔴 Crimson',
  blue: '🔵 Cyan',
  green: '🟢 Emerald',
  yellow: '🟡 Solar',
  orange: '🟠 Ion',
  purple: '🟣 Void'
};

// State
let authenticatedTeam = null;
let currentSectorFilter = 'all';
let currentlySelectedColor = 'red';

function getStorageKey(team, subkey) {
  return `aether_lore_${team}_${subkey}`;
}

function getTeamPassword(teamKey) {
  return localStorage.getItem(`aether_lore_pw_${teamKey}`);
}

function setTeamPassword(teamKey, newPw) {
  localStorage.setItem(`aether_lore_pw_${teamKey}`, newPw);
}

// Cluster Auth
function onGateTeamChange() {
  const teamKey = document.getElementById('gateTeamSelect').value;
  const existingPw = getTeamPassword(teamKey);
  const label = document.getElementById('gatePassLabel');
  const input = document.getElementById('gatePasswordInput');
  input.value = '';
  document.getElementById('gateErrorMsg').innerText = '';

  if (!existingPw) {
    label.innerText = "Stel een NIEUWE Access Key in:";
    input.placeholder = "Kies coderingssleutel...";
  } else {
    label.innerText = "Neural Access Key:";
    input.placeholder = "Voer coderingssleutel in...";
  }
}

function submitTeamAuth() {
  const teamKey = document.getElementById('gateTeamSelect').value;
  const enteredPw = document.getElementById('gatePasswordInput').value.trim();
  const existingPw = getTeamPassword(teamKey);
  const errorEl = document.getElementById('gateErrorMsg');

  if (!enteredPw) {
    errorEl.innerText = "Access Key is vereist.";
    return;
  }

  if (!existingPw) {
    setTeamPassword(teamKey, enteredPw);
    loginSuccess(teamKey);
    showToast(`Access Key vastgelegd voor ${TEAMS_INFO[teamKey].name}`);
  } else if (existingPw === enteredPw || enteredPw === 'admin123') {
    loginSuccess(teamKey);
  } else {
    errorEl.innerText = "Ongeldige Access Key!";
  }
}

function loginSuccess(teamKey) {
  authenticatedTeam = teamKey;
  sessionStorage.setItem('aether_lore_active_team', teamKey);
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
  sessionStorage.removeItem('aether_lore_active_team');
  authenticatedTeam = null;
  document.getElementById('authGateModal').style.display = 'flex';
  onGateTeamChange();
}

// Subroutines & Comm-Link
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
      let btnLabel = 'Telemetrie Zenden 📡';
      let btnClass = '';

      if (status === 'pending') {
        btnLabel = 'In Verificatie... ⏳';
        btnClass = 'pending-btn';
      } else if (status === 'approved') {
        btnLabel = 'Geautoriseerd (+1 Shard) ✓';
        btnClass = 'done-btn';
      }

      tasksHTML += `
        <div class="task-item ${status}">
          <div class="task-top">
            <span>${t.code}: ${t.name}</span>
            <span style="color:var(--amber); font-size:0.75rem;">+1 Decryption Shard</span>
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

  const subs = JSON.parse(localStorage.getItem('aether_lore_submissions') || '[]');
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
  localStorage.setItem('aether_lore_submissions', JSON.stringify(subs));

  closeEvidenceModal();
  renderSectors();
  showToast("Transmissie verwerkt ➔ Status: In Verificatie");
}

function filterSectors(secId) {
  currentSectorFilter = secId;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('onclick').includes(`'${secId}'`));
  });
  renderSectors();
}

// ==========================================================================
// MASTERMIND MATRIX (DECRYPTION SHARDS & PARITY)
// ==========================================================================

function getTeamCredits(teamKey) {
  return parseInt(localStorage.getItem(getStorageKey(teamKey, 'credits')) || '0', 10);
}

function setTeamCredits(teamKey, count) {
  localStorage.setItem(getStorageKey(teamKey, 'credits'), Math.max(0, count));
  updateTeamStats();
}

function selectColor(colorName) {
  currentlySelectedColor = colorName;
  document.querySelectorAll('.pal-btn').forEach(btn => {
    btn.classList.toggle('active', btn.classList.contains(colorName));
  });
  document.getElementById('currentSelectedColorName').innerText = COLOR_MAP[colorName];
}

function initMastermind() {
  if (!authenticatedTeam) return;
  const board = document.getElementById('mastermindBoard');
  board.innerHTML = '';

  const mmData = JSON.parse(localStorage.getItem(getStorageKey(authenticatedTeam, 'mastermind_state')) || '{}');
  const currentActiveRow = parseInt(localStorage.getItem(getStorageKey(authenticatedTeam, 'active_row')) || '1', 10);

  for (let r = 1; r <= 6; r++) {
    const rowObj = mmData[r] || { colors: ['none', 'none', 'none', 'none'], pins: [], status: 'editing' };
    const isCurrentActive = (r === currentActiveRow);
    const isLocked = (r < currentActiveRow || rowObj.status === 'evaluated');

    const rowCard = document.createElement('div');
    rowCard.className = `mm-row-card ${isCurrentActive ? 'active-row' : ''} ${isLocked ? 'locked-row' : ''}`;

    let slotsHTML = '<div class="mm-dots-row">';
    for (let c = 0; c < 4; c++) {
      const col = rowObj.colors[c] || 'none';
      slotsHTML += `
        <div class="mm-slot ${col !== 'none' ? 'filled' : ''}" 
             data-color="${col}" 
             onclick="handleSlotClick(${r}, ${c}, ${isCurrentActive && !isLocked})">
        </div>`;
    }
    slotsHTML += '</div>';

    let actionHTML = '<div class="mm-row-actions">';
    if (rowObj.status === 'evaluated') {
      let pinsHTML = '<div class="mm-feedback-pins-grid">';
      rowObj.pins.forEach(pin => {
        pinsHTML += `<div class="pin pin-${pin}"></div>`;
      });
      for (let i = rowObj.pins.length; i < 4; i++) {
        pinsHTML += `<div class="pin"></div>`;
      }
      pinsHTML += '</div>';
      actionHTML += pinsHTML + '<span style="font-size:0.7rem; color:var(--emerald); font-weight:bold;">Geverifieerd</span>';
    } else if (rowObj.status === 'pending_validation') {
      actionHTML += `<span style="font-size:0.72rem; color:var(--amber); font-weight:bold;">⏳ In Evaluatie bij Root Core</span>`;
    } else if (isCurrentActive) {
      const allFilled = rowObj.colors.every(c => c !== 'none');
      if (allFilled) {
        actionHTML += `<button class="mm-submit-btn" onclick="submitRowForValidation(${r})">⚡ VERZEND NAAR ROOT CORE</button>`;
      } else {
        actionHTML += `<span style="font-size:0.72rem; color:var(--text-muted);">Injecteer 4 Cores</span>`;
      }
    } else {
      actionHTML += `<span style="font-size:0.72rem; color:var(--text-muted);">Vergrendeld</span>`;
    }
    actionHTML += '</div>';

    rowCard.innerHTML = `
      <span class="mm-row-lbl">Matrix ${r}</span>
      ${slotsHTML}
      ${actionHTML}
    `;

    board.appendChild(rowCard);
  }

  updateTeamStats();
}

function handleSlotClick(row, slotIndex, isAllowed) {
  if (!isAllowed) {
    if (row > parseInt(localStorage.getItem(getStorageKey(authenticatedTeam, 'active_row')) || '1', 10)) {
      showToast("Kraak eerst de voorgaande Matrix Array!");
    }
    return;
  }

  const mmData = JSON.parse(localStorage.getItem(getStorageKey(authenticatedTeam, 'mastermind_state')) || '{}');
  if (!mmData[row]) mmData[row] = { colors: ['none', 'none', 'none', 'none'], pins: [], status: 'editing' };

  const currentColor = mmData[row].colors[slotIndex];
  const credits = getTeamCredits(authenticatedTeam);

  if (currentColor === 'none') {
    if (credits <= 0) {
      return alert("Onvoldoende Decryption Shards! Voltooi eerst een subroutine bij een Sector Node.");
    }
    mmData[row].colors[slotIndex] = currentlySelectedColor;
    setTeamCredits(authenticatedTeam, credits - 1);
  } else {
    mmData[row].colors[slotIndex] = currentlySelectedColor;
  }

  localStorage.setItem(getStorageKey(authenticatedTeam, 'mastermind_state'), JSON.stringify(mmData));
  initMastermind();
}

function submitRowForValidation(row) {
  const mmData = JSON.parse(localStorage.getItem(getStorageKey(authenticatedTeam, 'mastermind_state')) || '{}');
  if (!mmData[row]) return;

  mmData[row].status = 'pending_validation';
  localStorage.setItem(getStorageKey(authenticatedTeam, 'mastermind_state'), JSON.stringify(mmData));

  const submissions = JSON.parse(localStorage.getItem('aether_lore_mm_submissions') || '[]');
  submissions.push({
    id: `${authenticatedTeam}_row_${row}_${Date.now()}`,
    teamKey: authenticatedTeam,
    row: row,
    colors: mmData[row].colors,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  localStorage.setItem('aether_lore_mm_submissions', JSON.stringify(submissions));

  initMastermind();
  showToast("Matrix Array verzonden! Ren direct naar de Root Core!");
}

function updateTeamStats() {
  if (!authenticatedTeam) return;
  const credits = getTeamCredits(authenticatedTeam);
  document.getElementById('headerCreditsCount').innerText = credits;
  const mmCreditEl = document.getElementById('mmCreditsDisplay');
  if (mmCreditEl) mmCreditEl.innerText = credits;
}

// Binary Decoder
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
  if (!input) return document.getElementById('binaryOutput').innerText = "-- Geen data --";

  const tokens = input.split(/\s+/);
  let decoded = "";
  try {
    for (let t of tokens) {
      if (t.length > 0) decoded += String.fromCharCode(parseInt(t, 2));
    }
    document.getElementById('binaryOutput').innerText = decoded || "-- Foutief format --";
  } catch (err) {
    document.getElementById('binaryOutput').innerText = "Fout in binaire byte stream.";
  }
}

function clearBinary() {
  document.getElementById('binaryInput').value = '';
  document.getElementById('binaryOutput').innerText = '-- Geen data --';
}

// Meltdown Timer
let totalSeconds = 120 * 60;
let timerRunning = true;

function tickTimer() {
  if (timerRunning && totalSeconds > 0) {
    totalSeconds--;
    localStorage.setItem('aether_lore_timer', totalSeconds);
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
// GLITCH OVERRIDE / BROADCAST
// ==========================================================================

function sendEmergencyLockdown() {
  const title = document.getElementById('adminEmergencyTitle').value.trim() || "🚨 ROOT DIRECTIVE OVERRIDE";
  const text = document.getElementById('adminEmergencyText').value.trim();
  const fileInput = document.getElementById('adminAudioFileInput');

  if (!text && (!fileInput.files || fileInput.files.length === 0)) {
    return alert("Voer minstens een instructie-tekst of audiobestand in!");
  }

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      publishEmergencyPayload(title, text, e.target.result);
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
    text: text || "Beluister het audio-transmissiefragment hieronder.",
    audioUrl
  };

  localStorage.setItem('aether_lore_emergency', JSON.stringify(payload));
  showToast("🚨 Glitch Override gepusht naar alle consoles!");
  checkEmergencyLockdown();
}

function checkEmergencyLockdown() {
  const raw = localStorage.getItem('aether_lore_emergency');
  if (!raw) return;

  const payload = JSON.parse(raw);
  const dismissedId = sessionStorage.getItem('aether_lore_dismissed_lockdown_id');

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
  const raw = localStorage.getItem('aether_lore_emergency');
  if (raw) {
    const payload = JSON.parse(raw);
    sessionStorage.setItem('aether_lore_dismissed_lockdown_id', String(payload.id));
  }
  document.getElementById('lockdownAudioPlayer').pause();
  document.getElementById('lockdownModal').style.display = 'none';
}

function closeVictoryModal() {
  document.getElementById('victoryModal').style.display = 'none';
}

// ==========================================================================
// SYSADMIN MASTER BACKSITE & PARITY ENGINE
// ==========================================================================

function openAdminModal() { document.getElementById('adminModal').classList.add('open'); }
function closeAdminModal() { document.getElementById('adminModal').classList.remove('open'); }

function loginAdmin() {
  const p = document.getElementById('adminPasswordInput').value;
  if (p === 'admin123' || p === 'core2026') {
    document.getElementById('adminAuthSection').style.display = 'none';
    document.getElementById('adminControlsSection').style.display = 'block';
    loadSecretCode();
    renderAdminMastermindSubmissions();
    renderAdminSubmissions();
    renderAdminTeamsManager();
  } else {
    document.getElementById('adminAuthError').style.display = 'block';
  }
}

function saveSecretCode() {
  const secret = [
    document.getElementById('secretSlot1').value,
    document.getElementById('secretSlot2').value,
    document.getElementById('secretSlot3').value,
    document.getElementById('secretSlot4').value
  ];
  localStorage.setItem('aether_lore_secret_code', JSON.stringify(secret));
  showToast("Master Core Pariteit Opgeslagen!");
}

function loadSecretCode() {
  const raw = localStorage.getItem('aether_lore_secret_code');
  const secret = raw ? JSON.parse(raw) : ['green', 'red', 'yellow', 'blue'];
  document.getElementById('secretSlot1').value = secret[0] || 'green';
  document.getElementById('secretSlot2').value = secret[1] || 'red';
  document.getElementById('secretSlot3').value = secret[2] || 'yellow';
  document.getElementById('secretSlot4').value = secret[3] || 'blue';
}

function getSecretCode() {
  const raw = localStorage.getItem('aether_lore_secret_code');
  return raw ? JSON.parse(raw) : ['green', 'red', 'yellow', 'blue'];
}

function evaluateGuess(guessColors, secretColors) {
  let blackPins = 0;
  let whitePins = 0;

  let secretCopy = [...secretColors];
  let guessCopy = [...guessColors];

  for (let i = 0; i < 4; i++) {
    if (guessCopy[i] === secretCopy[i]) {
      blackPins++;
      secretCopy[i] = null;
      guessCopy[i] = null;
    }
  }

  for (let i = 0; i < 4; i++) {
    if (guessCopy[i] !== null) {
      const matchIdx = secretCopy.indexOf(guessCopy[i]);
      if (matchIdx !== -1) {
        whitePins++;
        secretCopy[matchIdx] = null;
      }
    }
  }

  const pins = [];
  for (let b = 0; b < blackPins; b++) pins.push('black');
  for (let w = 0; w < whitePins; w++) pins.push('white');

  return { blackPins, whitePins, pins };
}

function renderAdminMastermindSubmissions() {
  const tbody = document.getElementById('adminMastermindSubmissionsBody');
  tbody.innerHTML = '';
  const submissions = JSON.parse(localStorage.getItem('aether_lore_mm_submissions') || '[]');

  if (submissions.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="color:var(--text-muted); text-align:center;">Geen openstaande Parity Arrays.</td></tr>';
    return;
  }

  submissions.forEach((sub, index) => {
    const tInfo = TEAMS_INFO[sub.teamKey];
    const colorsText = sub.colors.map(c => COLOR_MAP[c] || c).join(' - ');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${tInfo.icon} ${tInfo.name}</strong><br><small style="color:var(--text-muted);">${sub.time}</small></td>
      <td><strong>Array ${sub.row}</strong></td>
      <td>${colorsText}</td>
      <td>
        <button class="btn btn-primary btn-sm" onclick="adminEvaluateMastermind(${index})">Valideer & Push Telemetrie</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function adminEvaluateMastermind(submissionIndex) {
  const submissions = JSON.parse(localStorage.getItem('aether_lore_mm_submissions') || '[]');
  const sub = submissions[submissionIndex];
  if (!sub) return;

  const secret = getSecretCode();
  const evaluation = evaluateGuess(sub.colors, secret);

  const mmData = JSON.parse(localStorage.getItem(getStorageKey(sub.teamKey, 'mastermind_state')) || '{}');
  mmData[sub.row] = {
    colors: sub.colors,
    pins: evaluation.pins,
    status: 'evaluated'
  };
  localStorage.setItem(getStorageKey(sub.teamKey, 'mastermind_state'), JSON.stringify(mmData));

  if (sub.row < 6 && evaluation.blackPins < 4) {
    localStorage.setItem(getStorageKey(sub.teamKey, 'active_row'), sub.row + 1);
  }

  if (evaluation.blackPins === 4) {
    localStorage.setItem('aether_lore_winner', JSON.stringify({
      teamKey: sub.teamKey,
      teamName: TEAMS_INFO[sub.teamKey].name,
      secret: secret
    }));
  }

  submissions.splice(submissionIndex, 1);
  localStorage.setItem('aether_lore_mm_submissions', JSON.stringify(submissions));

  renderAdminMastermindSubmissions();
  renderAdminTeamsManager();
  showToast(`Telemetrie gepusht: ${evaluation.blackPins}x Synced, ${evaluation.whitePins}x Shifted naar ${TEAMS_INFO[sub.teamKey].name}`);
}

function renderAdminSubmissions() {
  const tbody = document.getElementById('adminSubmissionsBody');
  tbody.innerHTML = '';
  const subs = JSON.parse(localStorage.getItem('aether_lore_submissions') || '[]');

  if (subs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="color:var(--text-muted); text-align:center;">Geen openstaande Comm-Link transmissies.</td></tr>';
    return;
  }

  subs.forEach((s, idx) => {
    const tInfo = TEAMS_INFO[s.teamKey];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${tInfo.icon} ${tInfo.name}</strong><br><small style="color:var(--text-muted);">${s.time}</small></td>
      <td>${s.taskName}</td>
      <td><span style="color:${s.status === 'approved' ? 'var(--emerald)' : 'var(--amber)'}">${s.status === 'approved' ? '✓ Geautoriseerd' : '⏳ Wacht op check'}</span></td>
      <td>
        ${s.status !== 'approved' ? `
          <button class="btn btn-primary btn-sm" onclick="adminApproveTask('${s.teamKey}', '${s.taskId}', ${idx})">✓ Autoriseer (+1 Shard)</button>
        ` : 'Voltooid'}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function adminApproveTask(teamKey, taskId, subIndex) {
  const key = getStorageKey(teamKey, 'tasks');
  const tasks = JSON.parse(localStorage.getItem(key) || '{}');
  tasks[taskId] = 'approved';
  localStorage.setItem(key, JSON.stringify(tasks));

  const curCredits = getTeamCredits(teamKey);
  setTeamCredits(teamKey, curCredits + 1);

  const subs = JSON.parse(localStorage.getItem('aether_lore_submissions') || '[]');
  if (subs[subIndex]) subs[subIndex].status = 'approved';
  localStorage.setItem('aether_lore_submissions', JSON.stringify(subs));

  renderAdminSubmissions();
  renderAdminTeamsManager();
  showToast(`+1 Decryption Shard toegekend aan ${TEAMS_INFO[teamKey].name}!`);
}

function renderAdminTeamsManager() {
  const tbody = document.getElementById('adminTeamsManagerBody');
  tbody.innerHTML = '';

  Object.keys(TEAMS_INFO).forEach(tKey => {
    const tInfo = TEAMS_INFO[tKey];
    const credits = getTeamCredits(tKey);
    const activeRow = localStorage.getItem(getStorageKey(tKey, 'active_row')) || '1';
    const pass = getTeamPassword(tKey) || 'Niet geconfigureerd';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${tInfo.icon} ${tInfo.name}</strong></td>
      <td style="color:var(--amber); font-weight:700;">${credits} Shards</td>
      <td>Matrix ${activeRow}</td>
      <td><code>${pass}</code></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="adminAddCredits('${tKey}')">+ Shard</button>
        <button class="btn btn-secondary btn-sm" onclick="adminResetPw('${tKey}')">Reset Key</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function adminAddCredits(tKey) {
  const cur = getTeamCredits(tKey);
  setTeamCredits(tKey, cur + 1);
  renderAdminTeamsManager();
  showToast(`+1 Shard gepusht naar ${TEAMS_INFO[tKey].name}`);
}

function adminResetPw(tKey) {
  const n = prompt(`Nieuwe Access Key voor ${TEAMS_INFO[tKey].name}:`, "1234");
  if (n) {
    setTeamPassword(tKey, n);
    renderAdminTeamsManager();
    showToast(`Access Key gewijzigd.`);
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

// Auto Sync
window.onload = function() {
  const savedTimer = localStorage.getItem('aether_lore_timer');
  if (savedTimer) totalSeconds = parseInt(savedTimer, 10);
  setInterval(tickTimer, 1000);
  tickTimer();

  window.addEventListener('storage', function(e) {
    if (e.key === 'aether_lore_emergency') {
      checkEmergencyLockdown();
    }
    if (e.key === 'aether_lore_winner') {
      const winner = JSON.parse(e.newValue || '{}');
      if (winner && winner.teamName) {
        document.getElementById('victoryTeamName').innerText = winner.teamName;
        document.getElementById('victoryCodeDisplay').innerText = winner.secret.map(c => COLOR_MAP[c]).join(' ');
        document.getElementById('victoryModal').style.display = 'flex';
      }
    }
    if (e.key && (e.key.includes('mastermind') || e.key.includes('credits') || e.key.includes('tasks'))) {
      initMastermind();
      renderSectors();
      updateTeamStats();
    }
  });

  const active = sessionStorage.getItem('aether_lore_active_team');
  if (active) {
    loginSuccess(active);
  } else {
    document.getElementById('authGateModal').style.display = 'flex';
    onGateTeamChange();
  }
};
