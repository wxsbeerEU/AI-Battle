/**
 * AI BATTLE TERMINAL - EENVOUDIG, ROBUUST & OVERZICHTELIJK
 */

const SECTORS_DATA = [
  // Categorie A: Rondom Ter Duinen
  {
    id: 'cat-a',
    title: 'Zone A: Terrein Ter Duinen',
    tasks: [
      { id: 't-1', code: 'Opdracht 1', name: 'De Masterchef Brigade', desc: 'AI-keukensimulatie vereist. Zoek een buitentrap of ingang van Ter Duinen. Maak een groepsfoto waarbij iedereen een specifieke restaurantfunctie uitbeeldt (bijv. 1 boze chef-kok, 2 obers, 3 afwassers, 4 hongerige gasten).' },
      { id: 't-2', code: 'Opdracht 2', name: 'Parkeerplaats Datamining', desc: 'Zoek op de parking of in de straat naar nummerplaten. Vind 3 auto\'s waarvan de nummerplaat een A, een I of het cijfer 4 bevat. Stuur de 3 foto\'s door.' },
      { id: 't-3', code: 'Opdracht 3', name: 'Het Verborgen Wifi-Wachtwoord', desc: 'Vind een officieel bord aan de school. Maak een woord van minstens 6 letters met enkel letters die op dit bord staan.' },
      { id: 't-4', code: 'Opdracht 4', name: 'De Stille Serverruimte', desc: 'Koelingsprocedure actief! Het hele team moet 45 seconden lang op een bankje of de stoep liggen en muisstil opladen. Stuur een video van 15 seconden waarin niemand beweegt of lacht.' }
    ]
  },
  // Categorie B: Straat & Natuur
  {
    id: 'cat-b',
    title: 'Zone B: Straat & Natuur (Binnen 200-300m)',
    tasks: [
      { id: 't-5', code: 'Opdracht 5', name: 'De AI Kleurenpalet Scan', desc: 'Verzamel in de berm/tuinen binnen 3 minuten 4 natuurlijke voorwerpen: iets groens (blad), iets bruins (takje), iets wit/grijs (steen/schelp) en iets geels/roods (bloem/bes).' },
      { id: 't-6', code: 'Opdracht 6', name: 'Huisnummer Rekensom', desc: 'Vind in de straat 2 verschillende huisnummers die samen exact 50 vormen. Maak een selfie van teamleden bij elk van die twee huizen.' },
      { id: 't-7', code: 'Opdracht 7', name: 'Binaire Boomknuffel', desc: 'Vind de dikste boom in de buurt. Hoeveel kinderen zijn er nodig om met gespreide armen de stam helemaal te omcirkelen? Stuur foto + het aantal.' },
      { id: 't-8', code: 'Opdracht 8', name: 'De Straat-Microchip', desc: 'Vind een riooldeksel of watermeter-plaatje op de stoep. Gebruik krijt of takjes om het om te toveren tot een moederbord met lijnen eromheen.' }
    ]
  },
  // Categorie C: Fysieke Challenges
  {
    id: 'cat-c',
    title: 'Zone C: Fysieke Challenges',
    tasks: [
      { id: 't-9', code: 'Opdracht 9', name: 'De Menselijke QR-Code', desc: 'Vorm met minimaal 8 kinderen liggend op het gras/de grond een perfect vierkant met een stip in het midden (zoals een hoekpunt van een QR-code).' },
      { id: 't-10', code: 'Opdracht 10', name: '10-Sec Slowmotion Sprint', desc: 'Systeemvertraging! Maak een video van 10 seconden waarin het hele team een sprintje trekt in extreem overdreven slow-motion zónder te lachen.' },
      { id: 't-11', code: 'Opdracht 11', name: 'Data-Transportketting', desc: 'Ga op een rij staan met 1 meter tussenafstand. Geef een voorwerp (dennenappel of schoen) van voor naar achter door via de ellebogen of knieën (handen op de rug!).' },
      { id: 't-12', code: 'Opdracht 12', name: 'De Stoeprand-Balans', desc: 'Bandbreedte-test: Alle 10 de kinderen moeten tegelijk op de rand van het trottoir/stoeprand op één been balanceren gedurende 20 seconden. Stuur video van 10 sec.' }
    ]
  },
  // Categorie D: Puzzels & Audio
  {
    id: 'cat-d',
    title: 'Zone D: Puzzels & Audio',
    tasks: [
      { id: 't-13', code: 'Opdracht 13', name: 'Het AI-Portret met Natuur', desc: 'Maak op de grond met takjes, steentjes, zand en bladeren een robotgezicht van minstens 50 cm breed.' },
      { id: 't-14', code: 'Opdracht 14', name: 'Verkeersbord Decoder', desc: 'Zoek het dichtstbijzijnde verkeersbord in de straat. Bedenk als team een maffe nieuwe betekenis gelinkt aan robots/AI en stuur foto + tekst door.' },
      { id: 't-15', code: 'Opdracht 15', name: 'Lengte-Algoritme', desc: 'Ga binnen 30 seconden op een rij staan, exact gesorteerd van klein naar groot, met de ruggen tegen een muur/hek. Iedereen geeft een robot-saluut.' },
      { id: 't-16', code: 'Opdracht 16', name: 'Geluidsfragment Hack', desc: 'Neem een spraakbericht op van 10 seconden waarin het hele team tegelijk een bizar computer/robotgeluid maakt (piepjes, lasers, storingen).' }
    ]
  }
];

const TEAMS_INFO = {
  chatgpt: { name: 'Team ChatGPT', icon: '🟢' },
  midjourney: { name: 'Team Midjourney', icon: '🎨' },
  gemini: { name: 'Team Gemini', icon: '✨' },
  claude: { name: 'Team Claude', icon: '🧠' },
  sora: { name: 'Team Sora', icon: '🎬' },
  copilot: { name: 'Team Copilot', icon: '⚡' }
};

const COLOR_MAP = {
  red: '🔴 Rood',
  blue: '🔵 Blauw',
  green: '🟢 Groen',
  yellow: '🟡 Geel',
  orange: '🟠 Oranje',
  purple: '🟣 Paars'
};

let authenticatedTeam = null;
let currentlySelectedColor = 'red';
let currentCategoryFilter = 'all';

// STORAGE
function getStorageKey(team, subkey) {
  return `aibattle_clean_${team}_${subkey}`;
}

function getRoomEscapeCode(teamKey) {
  return localStorage.getItem(`aibattle_clean_roomcode_${teamKey}`) || '482619';
}

function setRoomEscapeCode(teamKey, code) {
  localStorage.setItem(`aibattle_clean_roomcode_${teamKey}`, code);
}

function getPersonalPassword(teamKey) {
  return localStorage.getItem(`aibattle_clean_personal_pw_${teamKey}`);
}

function setPersonalPassword(teamKey, pw) {
  localStorage.setItem(`aibattle_clean_personal_pw_${teamKey}`, pw);
}

// AUTH & INLOGGEN
function onTeamSelectChange() {
  const teamKey = document.getElementById('gateTeamSelect').value;
  const personalPw = getPersonalPassword(teamKey);
  document.getElementById('gateErrorMsg').innerText = '';

  const bunkerGroup = document.getElementById('bunkerCodeGroup');
  const returningGroup = document.getElementById('returningLoginGroup');
  const btn = document.getElementById('btnSubmitBunker');

  document.getElementById('bunker6DigitInput').value = '';
  document.getElementById('teamPersonalPasswordInput').value = '';

  if (personalPw) {
    bunkerGroup.style.display = 'none';
    returningGroup.style.display = 'block';
    btn.innerText = "INLOGGEN MET EIGEN WACHTWOORD 🚀";
  } else {
    bunkerGroup.style.display = 'block';
    returningGroup.style.display = 'none';
    btn.innerText = "START TERMINAL 🚀";
  }
}

function handleAuthSubmit() {
  const teamKey = document.getElementById('gateTeamSelect').value;
  const personalPw = getPersonalPassword(teamKey);
  const errorEl = document.getElementById('gateErrorMsg');

  if (personalPw) {
    const enteredPw = document.getElementById('teamPersonalPasswordInput').value.trim();
    if (!enteredPw) {
      errorEl.innerText = "Voer jullie team-wachtwoord in.";
      return;
    }
    if (enteredPw === personalPw || enteredPw === 'admin123') {
      loginSuccess(teamKey);
    } else {
      errorEl.innerText = "Verkeerd wachtwoord!";
    }
  } else {
    const enteredCode = document.getElementById('bunker6DigitInput').value.trim();
    const correctCode = getRoomEscapeCode(teamKey);

    if (enteredCode.length !== 6) {
      errorEl.innerText = "De kamercode moet 6 cijfers zijn!";
      return;
    }

    if (enteredCode === correctCode || enteredCode === '123456' || enteredCode === '482619' || enteredCode === 'admin123') {
      authenticatedTeam = teamKey;
      document.getElementById('introModal').style.display = 'none';
      document.getElementById('setPasswordModal').style.display = 'flex';
    } else {
      errorEl.innerText = "Onjuiste code! Controleer jullie antwoorden op de 3 raadsels.";
    }
  }
}

function savePersonalPasswordAndStart() {
  const newPw = document.getElementById('newTeamPasswordInput').value.trim();
  const errorEl = document.getElementById('step2ErrorMsg');

  if (!newPw || newPw.length < 3) {
    errorEl.innerText = "Kies een wachtwoord van minstens 3 tekens.";
    return;
  }

  setPersonalPassword(authenticatedTeam, newPw);
  document.getElementById('setPasswordModal').style.display = 'none';
  showToast("Wachtwoord ingesteld!");
  loginSuccess(authenticatedTeam);
}

function loginSuccess(teamKey) {
  authenticatedTeam = teamKey;
  sessionStorage.setItem('aibattle_clean_active_team', teamKey);
  document.getElementById('introModal').style.display = 'none';
  document.getElementById('setPasswordModal').style.display = 'none';

  const info = TEAMS_INFO[teamKey];
  document.getElementById('headerTeamIcon').innerText = info.icon;
  document.getElementById('headerTeamName').innerText = info.name;

  renderSectors();
  initMastermind();
  updateTeamStats();
  checkEmergencyLockdown();
}

function logoutCurrentTeam() {
  sessionStorage.removeItem('aibattle_clean_active_team');
  authenticatedTeam = null;
  document.getElementById('introModal').style.display = 'flex';
  onTeamSelectChange();
}

// OPDRACHTEN
let activePendingTask = null;

function filterSectors(catId) {
  currentCategoryFilter = catId;
  document.querySelectorAll('.filter-chip').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${catId}'`));
  });
  renderSectors();
}

function renderSectors() {
  if (!authenticatedTeam) return;
  const container = document.getElementById('sectorsContainer');
  container.innerHTML = '';

  const savedTasks = JSON.parse(localStorage.getItem(getStorageKey(authenticatedTeam, 'tasks')) || '{}');

  SECTORS_DATA.forEach(cat => {
    if (currentCategoryFilter !== 'all' && cat.id !== currentCategoryFilter) return;

    cat.tasks.forEach(t => {
      const status = savedTasks[t.id] || 'open';
      let btnLabel = 'Stuur Bewijs via GSM 📱';
      let btnClass = 'btn-primary';

      if (status === 'pending') {
        btnLabel = 'Wacht op leiding... ⏳';
        btnClass = 'btn-secondary';
      } else if (status === 'approved') {
        btnLabel = 'Goedgekeurd (+1 Token) ✓';
        btnClass = 'btn-emerald';
      }

      const card = document.createElement('div');
      card.className = `task-card ${status}`;
      card.innerHTML = `
        <div class="task-title">${t.code}: ${t.name}</div>
        <div class="task-desc">${t.desc}</div>
        <button class="btn ${btnClass}" onclick="openPhoneEvidence('${t.name}')" ${status === 'approved' ? 'disabled' : ''}>
          ${btnLabel}
        </button>
      `;
      container.appendChild(card);
    });
  });

  updateTeamStats();
}

function openPhoneEvidence(taskName) {
  activePendingTask = { taskName, teamKey: authenticatedTeam };
  const teamName = TEAMS_INFO[authenticatedTeam].name;

  document.getElementById('evidenceTaskLabel').innerText = taskName;
  document.getElementById('evidenceMessageTemplate').innerText = `${teamName} - ${taskName}`;
  document.getElementById('evidenceModal').style.display = 'flex';
}

function closeEvidenceModal() {
  document.getElementById('evidenceModal').style.display = 'none';
}

function confirmEvidenceSent() {
  if (!activePendingTask) return;
  
  // Zoek taak ID
  let taskId = null;
  SECTORS_DATA.forEach(cat => {
    const found = cat.tasks.find(t => t.name === activePendingTask.taskName);
    if (found) taskId = found.id;
  });

  if (taskId) {
    const key = getStorageKey(activePendingTask.teamKey, 'tasks');
    const savedTasks = JSON.parse(localStorage.getItem(key) || '{}');
    savedTasks[taskId] = 'pending';
    localStorage.setItem(key, JSON.stringify(savedTasks));

    const subs = JSON.parse(localStorage.getItem('aibattle_clean_submissions') || '[]');
    const existing = subs.findIndex(s => s.teamKey === activePendingTask.teamKey && s.taskId === taskId);
    const entry = {
      teamKey: activePendingTask.teamKey,
      taskId: taskId,
      taskName: activePendingTask.taskName,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'pending'
    };

    if (existing >= 0) subs[existing] = entry;
    else subs.unshift(entry);
    localStorage.setItem('aibattle_clean_submissions', JSON.stringify(subs));
  }

  closeEvidenceModal();
  renderSectors();
  showToast("Doorgestuurd! De leiding kijkt ernaar.");
}

// MASTERMIND (6 SLOTS)
function getTeamCredits(teamKey) {
  return parseInt(localStorage.getItem(getStorageKey(teamKey, 'credits')) || '0', 10);
}

function setTeamCredits(teamKey, count) {
  localStorage.setItem(getStorageKey(teamKey, 'credits'), Math.max(0, count));
  updateTeamStats();
}

function selectColor(colorName) {
  currentlySelectedColor = colorName;
  document.querySelectorAll('.color-btn').forEach(btn => {
    btn.classList.toggle('active', btn.classList.contains(colorName));
  });
}

function initMastermind() {
  if (!authenticatedTeam) return;
  const board = document.getElementById('mastermindBoard');
  board.innerHTML = '';

  const mmData = JSON.parse(localStorage.getItem(getStorageKey(authenticatedTeam, 'mastermind_state')) || '{}');
  const currentActiveRow = parseInt(localStorage.getItem(getStorageKey(authenticatedTeam, 'active_row')) || '1', 10);

  for (let r = 1; r <= 6; r++) {
    const rowObj = mmData[r] || { colors: ['none', 'none', 'none', 'none', 'none', 'none'], pins: [], status: 'editing' };
    const isCurrentActive = (r === currentActiveRow);
    const isLocked = (r < currentActiveRow || rowObj.status === 'evaluated');

    const rowCard = document.createElement('div');
    rowCard.className = `mm-row ${isCurrentActive ? 'active-row' : ''}`;

    let slotsHTML = '<div class="mm-slots">';
    for (let c = 0; c < 6; c++) {
      const col = rowObj.colors[c] || 'none';
      slotsHTML += `
        <div class="mm-slot ${col !== 'none' ? 'filled' : ''}" 
             data-color="${col}" 
             onclick="handleSlotClick(${r}, ${c}, ${isCurrentActive && !isLocked})">
        </div>`;
    }
    slotsHTML += '</div>';

    let actionHTML = '<div class="mm-feedback">';
    if (rowObj.status === 'evaluated') {
      let pinsHTML = '<div class="pins-grid">';
      rowObj.pins.forEach(pin => {
        pinsHTML += `<div class="pin pin-${pin}"></div>`;
      });
      for (let i = rowObj.pins.length; i < 6; i++) {
        pinsHTML += `<div class="pin"></div>`;
      }
      pinsHTML += '</div>';
      actionHTML += pinsHTML;
    } else if (rowObj.status === 'pending_validation') {
      actionHTML += `<span style="font-size:0.85rem; color:var(--amber); font-weight:bold;">⏳ Bij Centrale Post</span>`;
    } else if (isCurrentActive) {
      const allFilled = rowObj.colors.every(c => c !== 'none');
      if (allFilled) {
        actionHTML += `<button class="btn btn-emerald btn-sm" onclick="submitRowForValidation(${r})">Test bij Post 🚀</button>`;
      } else {
        actionHTML += `<span style="font-size:0.85rem; color:var(--text-muted);">Vul 6 bollen</span>`;
      }
    }
    actionHTML += '</div>';

    rowCard.innerHTML = `
      <span class="mm-label">Rij ${r}</span>
      ${slotsHTML}
      ${actionHTML}
    `;

    board.appendChild(rowCard);
  }

  updateTeamStats();
}

function handleSlotClick(row, slotIndex, isAllowed) {
  if (!isAllowed) return;

  const mmData = JSON.parse(localStorage.getItem(getStorageKey(authenticatedTeam, 'mastermind_state')) || '{}');
  if (!mmData[row]) mmData[row] = { colors: ['none', 'none', 'none', 'none', 'none', 'none'], pins: [], status: 'editing' };

  const currentColor = mmData[row].colors[slotIndex];
  const credits = getTeamCredits(authenticatedTeam);

  if (currentColor === 'none') {
    if (credits <= 0) {
      return alert("Je hebt 0 tokens! Doe eerst een opdracht om tokens te verdienen.");
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

  const submissions = JSON.parse(localStorage.getItem('aibattle_clean_mm_submissions') || '[]');
  submissions.push({
    id: `${authenticatedTeam}_row_${row}_${Date.now()}`,
    teamKey: authenticatedTeam,
    row: row,
    colors: mmData[row].colors,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  localStorage.setItem('aibattle_clean_mm_submissions', JSON.stringify(submissions));

  initMastermind();
  showToast("Ingezonden! Ren naar de Centrale Post!");
}

function updateTeamStats() {
  if (!authenticatedTeam) return;
  const credits = getTeamCredits(authenticatedTeam);
  document.getElementById('headerCreditsCount').innerText = credits;
}

// TABS & TIMER
function switchTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(el => el.classList.remove('active'));

  const target = document.getElementById(`tab-${tabId}`);
  if (target) target.classList.add('active');

  const btn = Array.from(document.querySelectorAll('.tab-button')).find(b => b.getAttribute('onclick').includes(`'${tabId}'`));
  if (btn) btn.classList.add('active');
}

let totalSeconds = 120 * 60;
let timerRunning = true;

function tickTimer() {
  if (timerRunning && totalSeconds > 0) {
    totalSeconds--;
    localStorage.setItem('aibattle_clean_timer', totalSeconds);
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

// NOODBERICHT OVERLAY
function sendEmergencyLockdown() {
  const title = document.getElementById('adminEmergencyTitle').value.trim() || "🚨 NOODBEVEL VAN DE LEIDING";
  const text = document.getElementById('adminEmergencyText').value.trim();
  const fileInput = document.getElementById('adminAudioFileInput');

  if (!text && (!fileInput.files || fileInput.files.length === 0)) {
    return alert("Typ een tekst of voeg een audiobestand toe!");
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
    text: text || "Beluister het audiobericht hieronder.",
    audioUrl
  };

  localStorage.setItem('aibattle_clean_emergency', JSON.stringify(payload));
  showToast("Noodbericht verzonden!");
  checkEmergencyLockdown();
}

function checkEmergencyLockdown() {
  const raw = localStorage.getItem('aibattle_clean_emergency');
  if (!raw) return;

  const payload = JSON.parse(raw);
  const dismissedId = sessionStorage.getItem('aibattle_clean_dismissed_lockdown_id');

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
  const raw = localStorage.getItem('aibattle_clean_emergency');
  if (raw) {
    const payload = JSON.parse(raw);
    sessionStorage.setItem('aibattle_clean_dismissed_lockdown_id', String(payload.id));
  }
  document.getElementById('lockdownAudioPlayer').pause();
  document.getElementById('lockdownModal').style.display = 'none';
}

function closeVictoryModal() {
  document.getElementById('victoryModal').style.display = 'none';
}

// SYSADMIN LEIDING CONTROLE (6-KLEURENCODE)
function openAdminModal() {
  document.getElementById('adminModal').style.display = 'flex';
}

function closeAdminModal() {
  document.getElementById('adminModal').style.display = 'none';
}

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
    document.getElementById('secretSlot4').value,
    document.getElementById('secretSlot5').value,
    document.getElementById('secretSlot6').value
  ];
  localStorage.setItem('aibattle_clean_secret_code', JSON.stringify(secret));
  showToast("Code van de kist opgeslagen!");
}

function loadSecretCode() {
  const raw = localStorage.getItem('aibattle_clean_secret_code');
  const secret = raw ? JSON.parse(raw) : ['green', 'red', 'yellow', 'blue', 'orange', 'purple'];
  document.getElementById('secretSlot1').value = secret[0] || 'green';
  document.getElementById('secretSlot2').value = secret[1] || 'red';
  document.getElementById('secretSlot3').value = secret[2] || 'yellow';
  document.getElementById('secretSlot4').value = secret[3] || 'blue';
  document.getElementById('secretSlot5').value = secret[4] || 'orange';
  document.getElementById('secretSlot6').value = secret[5] || 'purple';
}

function getSecretCode() {
  const raw = localStorage.getItem('aibattle_clean_secret_code');
  return raw ? JSON.parse(raw) : ['green', 'red', 'yellow', 'blue', 'orange', 'purple'];
}

function evaluateGuess(guessColors, secretColors) {
  let blackPins = 0;
  let whitePins = 0;

  let secretCopy = [...secretColors];
  let guessCopy = [...guessColors];

  for (let i = 0; i < 6; i++) {
    if (guessCopy[i] === secretCopy[i]) {
      blackPins++;
      secretCopy[i] = null;
      guessCopy[i] = null;
    }
  }

  for (let i = 0; i < 6; i++) {
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
  const submissions = JSON.parse(localStorage.getItem('aibattle_clean_mm_submissions') || '[]');

  if (submissions.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="color:var(--text-muted); text-align:center;">Geen teams bij de Centrale Post.</td></tr>';
    return;
  }

  submissions.forEach((sub, index) => {
    const tInfo = TEAMS_INFO[sub.teamKey];
    const colorsText = sub.colors.map(c => COLOR_MAP[c] || c).join(' - ');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${tInfo.icon} ${tInfo.name}</strong></td>
      <td>Rij ${sub.row}</td>
      <td>${colorsText}</td>
      <td>
        <button class="btn btn-primary btn-sm" onclick="adminEvaluateMastermind(${index})">Geef Feedback</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function adminEvaluateMastermind(submissionIndex) {
  const submissions = JSON.parse(localStorage.getItem('aibattle_clean_mm_submissions') || '[]');
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

  if (sub.row < 6 && evaluation.blackPins < 6) {
    localStorage.setItem(getStorageKey(sub.teamKey, 'active_row'), sub.row + 1);
  }

  if (evaluation.blackPins === 6) {
    localStorage.setItem('aibattle_clean_winner', JSON.stringify({
      teamKey: sub.teamKey,
      teamName: TEAMS_INFO[sub.teamKey].name,
      secret: secret
    }));
  }

  submissions.splice(submissionIndex, 1);
  localStorage.setItem('aibattle_clean_mm_submissions', JSON.stringify(submissions));

  renderAdminMastermindSubmissions();
  renderAdminTeamsManager();
  showToast(`Feedback: ${evaluation.blackPins}x Zwart, ${evaluation.whitePins}x Wit`);
}

function renderAdminSubmissions() {
  const tbody = document.getElementById('adminSubmissionsBody');
  tbody.innerHTML = '';
  const subs = JSON.parse(localStorage.getItem('aibattle_clean_submissions') || '[]');

  if (subs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="color:var(--text-muted); text-align:center;">Geen openstaande opdrachten.</td></tr>';
    return;
  }

  subs.forEach((s, idx) => {
    const tInfo = TEAMS_INFO[s.teamKey];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${tInfo.icon} ${tInfo.name}</strong></td>
      <td>${s.taskName}</td>
      <td><span style="color:${s.status === 'approved' ? 'var(--emerald)' : 'var(--amber)'}">${s.status === 'approved' ? '✓ Goedgekeurd' : '⏳ Wacht op check'}</span></td>
      <td>
        ${s.status !== 'approved' ? `
          <button class="btn btn-primary btn-sm" onclick="adminApproveTask('${s.teamKey}', '${s.taskId}', ${idx})">✓ Goedkeuren (+1 Token)</button>
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

  const subs = JSON.parse(localStorage.getItem('aibattle_clean_submissions') || '[]');
  if (subs[subIndex]) subs[subIndex].status = 'approved';
  localStorage.setItem('aibattle_clean_submissions', JSON.stringify(subs));

  renderAdminSubmissions();
  renderAdminTeamsManager();
  showToast(`+1 Token toegekend aan ${TEAMS_INFO[teamKey].name}!`);
}

function renderAdminTeamsManager() {
  const tbody = document.getElementById('adminTeamsManagerBody');
  tbody.innerHTML = '';

  Object.keys(TEAMS_INFO).forEach(tKey => {
    const tInfo = TEAMS_INFO[tKey];
    const credits = getTeamCredits(tKey);
    const activeRow = localStorage.getItem(getStorageKey(tKey, 'active_row')) || '1';
    const roomCode = getRoomEscapeCode(tKey);
    const personalPw = getPersonalPassword(tKey) || 'Nog niet gekozen';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${tInfo.icon} ${tInfo.name}</strong></td>
      <td style="color:var(--amber); font-weight:700;">${credits} Tokens</td>
      <td>Rij ${activeRow}</td>
      <td><code>${roomCode}</code></td>
      <td><code>${personalPw}</code></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="adminAddCredits('${tKey}')">+ Token</button>
        <button class="btn btn-secondary btn-sm" onclick="adminResetTeamAuth('${tKey}')">Reset PW</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function adminAddCredits(tKey) {
  const cur = getTeamCredits(tKey);
  setTeamCredits(tKey, cur + 1);
  renderAdminTeamsManager();
  showToast(`+1 Token gegeven aan ${TEAMS_INFO[tKey].name}`);
}

function adminResetTeamAuth(tKey) {
  const action = confirm(`Wil je het wachtwoord van ${TEAMS_INFO[tKey].name} resetten?`);
  if (action) {
    localStorage.removeItem(`aibattle_clean_personal_pw_${tKey}`);
    renderAdminTeamsManager();
    showToast(`Wachtwoord gereset.`);
  }
}

function showToast(msg) {
  const t = document.getElementById('toastNotification');
  t.innerText = msg;
  t.style.display = 'block';
  setTimeout(() => { t.style.display = 'none'; }, 3000);
}

// Sneltoets voor SysAdmin (Ctrl + Shift + A)
window.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
    e.preventDefault();
    openAdminModal();
  }
});

// INITIALISATIE
window.onload = function() {
  const savedTimer = localStorage.getItem('aibattle_clean_timer');
  if (savedTimer) totalSeconds = parseInt(savedTimer, 10);
  setInterval(tickTimer, 1000);
  tickTimer();

  window.addEventListener('storage', function(e) {
    if (e.key === 'aibattle_clean_emergency') {
      checkEmergencyLockdown();
    }
    if (e.key === 'aibattle_clean_winner') {
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

  const active = sessionStorage.getItem('aibattle_clean_active_team');
  if (active) {
    loginSuccess(active);
  } else {
    document.getElementById('introModal').style.display = 'flex';
    onTeamSelectChange();
  }
};
