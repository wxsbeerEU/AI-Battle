/**
 * AETHER_OS - SOUND ENGINE, GAME FLOW, 6-COLOR MASTERMIND & MISSION STAGING
 */

// LIJST MET 16 DROPSPEL MISSIES (Aanpasbaar)
const SECTORS_DATA = [
  { id: 't-1', code: 'Opdracht 1', name: 'De Masterchef Brigade', location: 'Terrein Ter Duinen', desc: 'Zoek een buitentrap of ingang. Maak een groepsfoto waarbij iedereen een restaurantfunctie uitbeeldt (1 boze chef, 2 obers, 3 afwassers, 4 hongerige gasten).' },
  { id: 't-2', code: 'Opdracht 2', name: 'Parkeerplaats Datamining', location: 'Parking / Straat', desc: 'Vind op nummerplaten 3 auto\'s die een A, een I of het cijfer 4 bevatten. Stuur 3 duidelijke foto\'s door.' },
  { id: 't-3', code: 'Opdracht 3', name: 'Het Verborgen Wifi-Wachtwoord', location: 'Borden aan de School', desc: 'Vind een officieel bord. Maak een woord van minstens 6 letters met enkel letters die op dit bord staan.' },
  { id: 't-4', code: 'Opdracht 4', name: 'De Stille Serverruimte', location: 'Bankje of Stoep', desc: 'Het team moet 45 seconden muisstil op de grond/bank liggen opladen. Stuur een video van 15 seconden waarin niemand beweegt of lacht.' },
  { id: 't-5', code: 'Opdracht 5', name: 'De AI Kleurenpalet Scan', location: 'Bermen / Tuinen', desc: 'Verzamel binnen 3 minuten 4 natuurlijke voorwerpen: iets groens (blad), iets bruins (takje), iets wit/grijs (steen/schelp) en iets geels/roods (bloem/bes).' },
  { id: 't-6', code: 'Opdracht 6', name: 'Huisnummer Rekensom', location: 'In de Straat', desc: 'Vind in de straat 2 verschillende huisnummers die samen exact 50 vormen. Maak een selfie van teamleden bij elk van die twee huizen.' },
  { id: 't-7', code: 'Opdracht 7', name: 'Binaire Boomknuffel', location: 'Directe Omgeving', desc: 'Vind de dikste boom in de straat. Hoeveel kinderen zijn er nodig om met gespreide armen de stam helemaal te omcirkelen? Stuur foto + aantal.' },
  { id: 't-8', code: 'Opdracht 8', name: 'De Straat-Microchip', location: 'Op het Trottoir', desc: 'Vind een riooldeksel of watermeter-plaatje. Gebruik krijt of takjes om het om te toveren tot een moederbord met lijnen eromheen.' },
  { id: 't-9', code: 'Opdracht 9', name: 'De Menselijke QR-Code', location: 'Grasveld', desc: 'Vorm met minimaal 8 kinderen liggend op de grond een perfect vierkant met een stip in het midden (zoals de hoek van een QR-code).' },
  { id: 't-10', code: 'Opdracht 10', name: '10-Sec Slowmotion Sprint', location: 'Vrij Pad', desc: 'Maak een video van 10 seconden waarin het hele team een sprintje trekt in extreem overdreven slow-motion zónder te lachen.' },
  { id: 't-11', code: 'Opdracht 11', name: 'Data-Transportketting', location: 'Vrije Ruimte', desc: 'Ga op een rij staan met 1m tussenafstand. Geef een voorwerp (dennenappel of schoen) door via de ellebogen of knieën (handen op de rug!).' },
  { id: 't-12', code: 'Opdracht 12', name: 'De Stoeprand-Balans', location: 'Stoeprand', desc: 'Alle 10 de kinderen moeten tegelijk op de rand van de stoep op één been balanceren gedurende 20 seconden. Stuur video van 10 sec.' },
  { id: 't-13', code: 'Opdracht 13', name: 'Het AI-Portret met Natuur', location: 'Op de Grond', desc: 'Maak op de grond met takjes, steentjes, zand en bladeren een robotgezicht van minstens 50 cm breed.' },
  { id: 't-14', code: 'Opdracht 14', name: 'Verkeersbord Decoder', location: 'In de Straat', desc: 'Zoek een verkeersbord in de straat. Bedenk als team een maffe nieuwe betekenis gelinkt aan robots/AI en stuur foto + tekst door.' },
  { id: 't-15', code: 'Opdracht 15', name: 'Lengte-Algoritme', location: 'Tegen een Muur', desc: 'Ga binnen 30 seconden op een rij staan, exact gesorteerd van klein naar groot, met de ruggen tegen een muur/hek. Iedereen geeft een robot-saluut.' },
  { id: 't-16', code: 'Opdracht 16', name: 'Geluidsfragment Hack', location: 'Willekeurige Plek', desc: 'Neem een spraakbericht op van 10 seconden waarin het hele team tegelijk een bizar computer/robotgeluid maakt (piepjes, lasers, storingen).' }
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
let audioCtx = null;

// SYNTHESIZER SOUND ENGINE
function getAudioContext() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playGlitchNoise() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch(e) {}
}

function playBeep(freq = 600, duration = 0.08) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch(e) {}
}

function playVictoryFanfare() {
  playBeep(440, 0.1);
  setTimeout(() => playBeep(554, 0.1), 120);
  setTimeout(() => playBeep(659, 0.15), 240);
  setTimeout(() => playBeep(880, 0.3), 380);
}

// STORAGE HELPERS
function getStorageKey(team, subkey) {
  return `aether_master_${team}_${subkey}`;
}

function getRoomEscapeCode(teamKey) {
  return localStorage.getItem(`aether_master_roomcode_${teamKey}`) || '482619';
}

function setRoomEscapeCode(teamKey, code) {
  localStorage.setItem(`aether_master_roomcode_${teamKey}`, code);
}

function getPersonalPassword(teamKey) {
  return localStorage.getItem(`aether_master_personal_pw_${teamKey}`);
}

function setPersonalPassword(teamKey, pw) {
  localStorage.setItem(`aether_master_personal_pw_${teamKey}`, pw);
}

// FASE 1 & 2: INTRO & KAMERCODE FLOW
function goFromIntroToRoomCode() {
  getAudioContext();
  playGlitchNoise();
  document.getElementById('screenIntro').style.display = 'none';
  document.getElementById('screenRoomCode').style.display = 'flex';
  onTeamSelectChange();
}

function backToIntro() {
  document.getElementById('screenRoomCode').style.display = 'none';
  document.getElementById('screenIntro').style.display = 'flex';
}

function onTeamSelectChange() {
  const teamKey = document.getElementById('gateTeamSelect').value;
  const personalPw = getPersonalPassword(teamKey);
  const errorEl = document.getElementById('gateErrorMsg');
  errorEl.innerText = '';

  const bunkerGroup = document.getElementById('bunkerCodeGroup');
  const returningGroup = document.getElementById('returningLoginGroup');
  const btn = document.getElementById('btnSubmitBunker');

  document.getElementById('bunker6DigitInput').value = '';
  document.getElementById('teamPersonalPasswordInput').value = '';

  if (personalPw) {
    bunkerGroup.style.display = 'none';
    returningGroup.style.display = 'block';
    btn.innerText = "[ INLOGGEN MET EIGEN WACHTWOORD 🚀 ]";
  } else {
    bunkerGroup.style.display = 'block';
    returningGroup.style.display = 'none';
    btn.innerText = "[ VERIFIEER CODE & ONTGRENDEL 🔓 ]";
  }
}

function handleRoomCodeSubmit() {
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
      launchCockpit(teamKey);
    } else {
      errorEl.innerText = "Verkeerd wachtwoord! Vraag hulp aan de leiding.";
    }
  } else {
    const enteredCode = document.getElementById('bunker6DigitInput').value.trim();
    const correctCode = getRoomEscapeCode(teamKey);

    if (enteredCode.length !== 6) {
      errorEl.innerText = "De kamercode moet exact 6 cijfers zijn!";
      return;
    }

    if (enteredCode === correctCode || enteredCode === '123456' || enteredCode === '482619' || enteredCode === 'admin123') {
      playVictoryFanfare();
      authenticatedTeam = teamKey;
      document.getElementById('screenRoomCode').style.display = 'none';
      document.getElementById('screenSetPassword').style.display = 'flex';
    } else {
      errorEl.innerText = "Onjuiste 6-cijferige code! Controleer jullie 3 raadsels.";
    }
  }
}

// FASE 3: EIGEN WACHTWOORD VASTLEGGEN
function savePasswordAndLaunchCockpit() {
  const newPw = document.getElementById('newTeamPasswordInput').value.trim();
  const errorEl = document.getElementById('step2ErrorMsg');

  if (!newPw || newPw.length < 3) {
    errorEl.innerText = "Kies een wachtwoord van minstens 3 tekens.";
    return;
  }

  setPersonalPassword(authenticatedTeam, newPw);
  playVictoryFanfare();
  showToast("Wachtwoord succesvol opgeslagen!");
  launchCockpit(authenticatedTeam);
}

function launchCockpit(teamKey) {
  authenticatedTeam = teamKey;
  sessionStorage.setItem('aether_master_active_team', teamKey);
  
  document.getElementById('screenIntro').style.display = 'none';
  document.getElementById('screenRoomCode').style.display = 'none';
  document.getElementById('screenSetPassword').style.display = 'none';

  const info = TEAMS_INFO[teamKey];
  document.getElementById('headerTeamIcon').innerText = info.icon;
  document.getElementById('headerTeamName').innerText = info.name;

  renderSectors();
  initMastermind();
  updateTeamStats();
  checkEmergencyLockdown();
}

function logoutCurrentTeam() {
  sessionStorage.removeItem('aether_master_active_team');
  authenticatedTeam = null;
  document.getElementById('screenIntro').style.display = 'flex';
  document.getElementById('screenRoomCode').style.display = 'none';
  document.getElementById('screenSetPassword').style.display = 'none';
}

// FASE 4: GEFASEERDE MISSIES (Steeds 3-4 actieve opdrachten)
let activePendingTask = null;

function renderSectors() {
  if (!authenticatedTeam) return;
  const container = document.getElementById('sectorsContainer');
  container.innerHTML = '';

  const savedTasks = JSON.parse(localStorage.getItem(getStorageKey(authenticatedTeam, 'tasks')) || '{}');
  const completedCount = Object.values(savedTasks).filter(v => v === 'approved').length;
  
  // Update voortgangsbalk
  document.getElementById('missionProgressCounter').innerText = `${completedCount} / ${SECTORS_DATA.length}`;
  const pct = (completedCount / SECTORS_DATA.length) * 100;
  document.getElementById('missionProgressBar').style.width = `${pct}%`;

  // Bepaal welke taken actief zijn: minstens 3 tegelijk, ontgrendelt nieuwe bij voltooien
  const maxVisibleIndex = Math.min(SECTORS_DATA.length, Math.max(3, completedCount + 3));

  SECTORS_DATA.slice(0, maxVisibleIndex).forEach(t => {
    const status = savedTasks[t.id] || 'open';
    let btnLabel = '[ STUUR BEWIJS VIA GSM 📱 ]';
    let btnClass = '';

    if (status === 'pending') {
      btnLabel = '[ WACHT OP LEIDING... ⏳ ]';
      btnClass = 'pending-btn';
    } else if (status === 'approved') {
      btnLabel = '[ GOEDGEKEURD ✓ ]';
      btnClass = 'done-btn';
    }

    const card = document.createElement('div');
    card.className = `task-card ${status}`;
    card.innerHTML = `
      <div class="task-head">${t.code}: ${t.name}</div>
      <div class="task-loc">📍 ${t.location}</div>
      <p class="task-body">${t.desc}</p>
      <button class="retro-btn ${btnClass}" onclick="openPhoneEvidence('${t.name}')" ${status === 'approved' ? 'disabled' : ''}>
        ${btnLabel}
      </button>
    `;
    container.appendChild(card);
  });

  updateTeamStats();
}

function openPhoneEvidence(taskName) {
  playBeep(480, 0.05);
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
  
  const foundTask = SECTORS_DATA.find(t => t.name === activePendingTask.taskName);
  if (!foundTask) return;

  const key = getStorageKey(activePendingTask.teamKey, 'tasks');
  const savedTasks = JSON.parse(localStorage.getItem(key) || '{}');
  savedTasks[foundTask.id] = 'pending';
  localStorage.setItem(key, JSON.stringify(savedTasks));

  const subs = JSON.parse(localStorage.getItem('aether_master_submissions') || '[]');
  const existing = subs.findIndex(s => s.teamKey === activePendingTask.teamKey && s.taskId === foundTask.id);
  const entry = {
    teamKey: activePendingTask.teamKey,
    taskId: foundTask.id,
    taskName: activePendingTask.taskName,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'pending'
  };

  if (existing >= 0) subs[existing] = entry;
  else subs.unshift(entry);
  localStorage.setItem('aether_master_submissions', JSON.stringify(subs));

  closeEvidenceModal();
  renderSectors();
  showToast("Doorgestuurd! De leiding kijkt ernaar.");
}

// MASTERMIND ENGINE (6 KLEUREN)
function getTeamCredits(teamKey) {
  return parseInt(localStorage.getItem(getStorageKey(teamKey, 'credits')) || '0', 10);
}

function setTeamCredits(teamKey, count) {
  localStorage.setItem(getStorageKey(teamKey, 'credits'), Math.max(0, count));
  updateTeamStats();
}

function selectColor(colorName) {
  playBeep(520, 0.04);
  currentlySelectedColor = colorName;
  document.querySelectorAll('.pal-btn').forEach(btn => {
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
    rowCard.className = `mm-row-item ${isCurrentActive ? 'active-row' : ''}`;

    let slotsHTML = '<div class="mm-slots-container">';
    for (let c = 0; c < 6; c++) {
      const col = rowObj.colors[c] || 'none';
      slotsHTML += `
        <div class="mm-slot-dot ${col !== 'none' ? 'filled' : ''}" 
             data-color="${col}" 
             onclick="handleSlotClick(${r}, ${c}, ${isCurrentActive && !isLocked})">
        </div>`;
    }
    slotsHTML += '</div>';

    let actionHTML = '<div class="mm-feedback-col">';
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
      actionHTML += `<span style="font-size:0.8rem; color:var(--amber);">⏳ Bij Post</span>`;
    } else if (isCurrentActive) {
      const allFilled = rowObj.colors.length === 6 && rowObj.colors.every(c => c !== 'none');
      if (allFilled) {
        actionHTML += `<button class="retro-btn btn-sm btn-emerald" onclick="submitRowForValidation(${r})">[ TEST 🚀 ]</button>`;
      } else {
        actionHTML += `<span style="font-size:0.75rem; color:var(--text-muted);">Vul 6 bollen</span>`;
      }
    }
    actionHTML += '</div>';

    rowCard.innerHTML = `
      <span class="mm-row-label">Rij ${r}</span>
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
      return alert("Je hebt 0 tokens! Doe eerst een opdracht op een post om nieuwe tokens te verdienen.");
    }
    playBeep(640, 0.05);
    mmData[row].colors[slotIndex] = currentlySelectedColor;
    setTeamCredits(authenticatedTeam, credits - 1);
  } else {
    playBeep(580, 0.05);
    mmData[row].colors[slotIndex] = currentlySelectedColor;
  }

  localStorage.setItem(getStorageKey(authenticatedTeam, 'mastermind_state'), JSON.stringify(mmData));
  initMastermind();
}

function submitRowForValidation(row) {
  const mmData = JSON.parse(localStorage.getItem(getStorageKey(authenticatedTeam, 'mastermind_state')) || '{}');
  if (!mmData[row]) return;

  playBeep(750, 0.08);
  mmData[row].status = 'pending_validation';
  localStorage.setItem(getStorageKey(authenticatedTeam, 'mastermind_state'), JSON.stringify(mmData));

  const submissions = JSON.parse(localStorage.getItem('aether_master_mm_submissions') || '[]');
  submissions.push({
    id: `${authenticatedTeam}_row_${row}_${Date.now()}`,
    teamKey: authenticatedTeam,
    row: row,
    colors: mmData[row].colors,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  localStorage.setItem('aether_master_mm_submissions', JSON.stringify(submissions));

  initMastermind();
  showToast("Ingezonden! Ren nu naar de Centrale Post!");
}

function updateTeamStats() {
  if (!authenticatedTeam) return;
  const credits = getTeamCredits(authenticatedTeam);
  document.getElementById('headerCreditsCount').innerText = credits;
}

// TABS & TIMER
function switchTab(tabId) {
  playBeep(420, 0.03);
  document.querySelectorAll('.tab-panel').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

  const target = document.getElementById(`tab-${tabId}`);
  if (target) target.classList.add('active');

  const btn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('onclick').includes(`'${tabId}'`));
  if (btn) btn.classList.add('active');
}

let totalSeconds = 120 * 60;
let timerRunning = true;

function tickTimer() {
  if (timerRunning && totalSeconds > 0) {
    totalSeconds--;
    localStorage.setItem('aether_master_timer', totalSeconds);
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

// EMERGENCY BROADCAST
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

  localStorage.setItem('aether_master_emergency', JSON.stringify(payload));
  showToast("Noodbericht verzonden!");
  checkEmergencyLockdown();
}

function checkEmergencyLockdown() {
  const raw = localStorage.getItem('aether_master_emergency');
  if (!raw) return;

  const payload = JSON.parse(raw);
  const dismissedId = sessionStorage.getItem('aether_master_dismissed_lockdown_id');

  if (dismissedId !== String(payload.id)) {
    playGlitchNoise();
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
  const raw = localStorage.getItem('aether_master_emergency');
  if (raw) {
    const payload = JSON.parse(raw);
    sessionStorage.setItem('aether_master_dismissed_lockdown_id', String(payload.id));
  }
  document.getElementById('lockdownAudioPlayer').pause();
  document.getElementById('lockdownModal').style.display = 'none';
}

function closeVictoryModal() {
  document.getElementById('victoryModal').style.display = 'none';
}

// SYSADMIN LEIDING PANEEL (6-KLEURENCODE)
function openAdminModal() {
  playBeep(400, 0.05);
  document.getElementById('adminModal').style.display = 'flex';
}

function closeAdminModal() {
  document.getElementById('adminModal').style.display = 'none';
}

function loginAdmin() {
  const p = document.getElementById('adminPasswordInput').value;
  if (p === 'admin123' || p === 'core2026') {
    playVictoryFanfare();
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
  localStorage.setItem('aether_master_secret_code', JSON.stringify(secret));
  showToast("Code van de kist opgeslagen!");
}

function loadSecretCode() {
  const raw = localStorage.getItem('aether_master_secret_code');
  const secret = raw ? JSON.parse(raw) : ['green', 'red', 'yellow', 'blue', 'orange', 'purple'];
  document.getElementById('secretSlot1').value = secret[0] || 'green';
  document.getElementById('secretSlot2').value = secret[1] || 'red';
  document.getElementById('secretSlot3').value = secret[2] || 'yellow';
  document.getElementById('secretSlot4').value = secret[3] || 'blue';
  document.getElementById('secretSlot5').value = secret[4] || 'orange';
  document.getElementById('secretSlot6').value = secret[5] || 'purple';
}

function getSecretCode() {
  const raw = localStorage.getItem('aether_master_secret_code');
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
  const submissions = JSON.parse(localStorage.getItem('aether_master_mm_submissions') || '[]');

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
        <button class="retro-btn btn-sm btn-primary" onclick="adminEvaluateMastermind(${index})">[ GEEF FEEDBACK ]</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function adminEvaluateMastermind(submissionIndex) {
  const submissions = JSON.parse(localStorage.getItem('aether_master_mm_submissions') || '[]');
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
    localStorage.setItem('aether_master_winner', JSON.stringify({
      teamKey: sub.teamKey,
      teamName: TEAMS_INFO[sub.teamKey].name,
      secret: secret
    }));
  }

  submissions.splice(submissionIndex, 1);
  localStorage.setItem('aether_master_mm_submissions', JSON.stringify(submissions));

  renderAdminMastermindSubmissions();
  renderAdminTeamsManager();
  showToast(`Feedback: ${evaluation.blackPins}x Zwart, ${evaluation.whitePins}x Wit`);
}

function renderAdminSubmissions() {
  const tbody = document.getElementById('adminSubmissionsBody');
  tbody.innerHTML = '';
  const subs = JSON.parse(localStorage.getItem('aether_master_submissions') || '[]');

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
          <button class="retro-btn btn-sm btn-emerald" onclick="adminApproveTask('${s.teamKey}', '${s.taskId}', ${idx})">[ GOEDKEUREN (+1 Token) ]</button>
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

  const subs = JSON.parse(localStorage.getItem('aether_master_submissions') || '[]');
  if (subs[subIndex]) subs[subIndex].status = 'approved';
  localStorage.setItem('aether_master_submissions', JSON.stringify(subs));

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
      <td style="color:var(--amber); font-weight:bold;">${credits} Tokens</td>
      <td>Rij ${activeRow}</td>
      <td><code>${roomCode}</code></td>
      <td><code>${personalPw}</code></td>
      <td>
        <button class="retro-btn btn-sm" onclick="adminAddCredits('${tKey}')">+ Token</button>
        <button class="retro-btn btn-sm" onclick="adminResetTeamAuth('${tKey}')">Reset PW</button>
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
    localStorage.removeItem(`aether_master_personal_pw_${tKey}`);
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

// INITIALISATIE: ALTIJD STABIEL STARTEN OP HET HOOFDSCHERM
window.onload = function() {
  const savedTimer = localStorage.getItem('aether_master_timer');
  if (savedTimer) totalSeconds = parseInt(savedTimer, 10);
  setInterval(tickTimer, 1000);
  tickTimer();

  window.addEventListener('storage', function(e) {
    if (e.key === 'aether_master_emergency') {
      checkEmergencyLockdown();
    }
    if (e.key === 'aether_master_winner') {
      const winner = JSON.parse(e.newValue || '{}');
      if (winner && winner.teamName) {
        document.getElementById('victoryTeamName').innerText = winner.teamName;
        document.getElementById('victoryCodeDisplay').innerText = winner.secret.map(c => COLOR_MAP[c]).join(' ');
        document.getElementById('victoryModal').style.display = 'flex';
        playVictoryFanfare();
      }
    }
    if (e.key && (e.key.includes('mastermind') || e.key.includes('credits') || e.key.includes('tasks'))) {
      initMastermind();
      renderSectors();
      updateTeamStats();
    }
  });

  // Start altijd gegarandeerd op het openingsscherm
  document.getElementById('screenIntro').style.display = 'flex';
  document.getElementById('screenRoomCode').style.display = 'none';
  document.getElementById('screenSetPassword').style.display = 'none';
};
