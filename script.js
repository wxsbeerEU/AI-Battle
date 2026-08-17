/**
 * AETHER_OS - SOUND ENGINE, TYPEWRITER INTRO, BUNKER & SYSADMIN
 */

const SECTORS_DATA = [
  {
    id: '1',
    title: 'POST 1: PROMPT ENGINEERING',
    location: 'Achter de Hoofdtent',
    tasks: [
      { id: 's1-a', code: 'Opdracht A', name: 'LEGO Nabouwen', desc: '1 teamlid praat via de walkietalkie en legt uit hoe het LEGO-bouwsel in elkaar zit.' },
      { id: 's1-b', code: 'Opdracht B', name: 'Blinddoek Robot', desc: 'Blinddoek 1 teamlid en stuur hem/haar met stap-commando\'s door het veld.' },
      { id: 's1-c', code: 'Opdracht C', name: 'Verboden Woorden', desc: 'Lees het verhaal voor zonder de 8 verboden woorden te zeggen.' }
    ]
  },
  {
    id: '2',
    title: 'POST 2: CREATIVE NET',
    location: 'Bij het Open Veld',
    tasks: [
      { id: 's2-a', code: 'Opdracht A', name: 'Tekening Raden', desc: '1 teamlid tekent een geheime opdracht. Het team moet het binnen 2 minuten raden.' },
      { id: 's2-b', code: 'Opdracht B', name: 'Robotdans', desc: 'Kijk naar de dans van de posthouder en doe hem synchroon na met heel je team.' },
      { id: 's2-c', code: 'Opdracht C', name: 'Deepfake Detector', desc: 'Bekijk de 10 foto\'s en zoek de 5 foto\'s die door AI gemaakt zijn.' }
    ]
  },
  {
    id: '3',
    title: 'POST 3: CYBERSECURITY',
    location: 'In het Bos',
    tasks: [
      { id: 's3-a', code: 'Opdracht A', name: 'Trefbal Veld', desc: 'Steek over zonder geraakt te worden. Minstens 6 kinderen moeten heelhuids overkomen.' },
      { id: 's3-b', code: 'Opdracht B', name: 'Belletjes Web', desc: 'Kruip door het touwenweb. De belletjes mogen maximaal 1 keer rinkelen.' },
      { id: 's3-c', code: 'Opdracht C', name: 'Chopsticks Vissen', desc: 'Haal 5 houten blokjes uit de modder/waterbak met enkel eetstokjes.' }
    ]
  },
  {
    id: '4',
    title: 'POST 4: LOGICA & AI',
    location: 'Bij het Kampvuur',
    tasks: [
      { id: 's4-a', code: 'Opdracht A', name: 'Kaarten Sorteren', desc: 'Ontdek binnen 2 pogingen volgens welke geheime regel de kaarten liggen.' },
      { id: 's4-b', code: 'Opdracht B', name: 'Handenknoop', desc: 'Ontwar de armen van je team tot een grote cirkel zonder elkaars handen los te laten.' },
      { id: 's4-c', code: 'Opdracht C', name: 'Geheimschrift', desc: 'Vertaal de binaire getallen (zoals 01000001 = A) naar het geheime woord.' }
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
let audioCtx = null;

// SYNTHESIZER SOUND ENGINE (Web Audio API)
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
  return `aibattle_v5_${team}_${subkey}`;
}

function getRoomEscapeCode(teamKey) {
  return localStorage.getItem(`aibattle_v5_roomcode_${teamKey}`) || '482619';
}

function setRoomEscapeCode(teamKey, code) {
  localStorage.setItem(`aibattle_v5_roomcode_${teamKey}`, code);
}

function getPersonalPassword(teamKey) {
  return localStorage.getItem(`aibattle_v5_personal_pw_${teamKey}`);
}

function setPersonalPassword(teamKey, pw) {
  localStorage.setItem(`aibattle_v5_personal_pw_${teamKey}`, pw);
}

// 0. BOOT & TYPWERITER INVASION
function igniteSystem() {
  getAudioContext();
  playGlitchNoise();
  document.getElementById('bootLayer').style.display = 'none';

  const active = sessionStorage.getItem('aibattle_v5_active_team');
  if (active) {
    loginSuccess(active);
  } else {
    document.getElementById('glitchScreen').style.display = 'flex';
    startGlitchTypewriter();
  }
}

const glitchTextContent = 
  "Hallo AI-systemen... Ik ben VIRUS GLITCH.\n\n" +
  "Jullie dachten dat de wereld veilig was? Ik heb zojuist al jullie servers gehackt en OFFLINE gehaald.\n\n" +
  "Zonder AI stort de mensheid binnen 120 minuten in. Jullie zitten fysiek opgesloten in deze bunkers.\n" +
  "Zie maar dat jullie als eerste AI terug online komen... ALS DAT JULLIE AL LUKT!";

function startGlitchTypewriter() {
  const el = document.getElementById('glitchTypewriter');
  el.innerText = "";
  let i = 0;

  function typeChar() {
    if (i < glitchTextContent.length) {
      el.innerText += glitchTextContent.charAt(i);
      if (i % 4 === 0) playBeep(220 + Math.random() * 80, 0.03);
      i++;
      setTimeout(typeChar, 22);
    } else {
      document.getElementById('btnEscapeStart').style.display = 'block';
    }
  }
  typeChar();
}

function proceedToBunker() {
  playGlitchNoise();
  document.getElementById('glitchScreen').style.display = 'none';
  document.getElementById('bunkerAuthModal').style.display = 'flex';
  onGateTeamChange();
}

// 1. BUNKER ESCAPE AUTH
function onGateTeamChange() {
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
    btn.innerText = "INLOGGEN MET EIGEN WACHTWOORD 🚀";
  } else {
    bunkerGroup.style.display = 'block';
    returningGroup.style.display = 'none';
    btn.innerText = "VERIFIEER CODE & ONTGRENDEL 🔓";
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
      errorEl.innerText = "Verkeerd wachtwoord! Vraag hulp aan de leiding.";
    }
  } else {
    const enteredCode = document.getElementById('bunker6DigitInput').value.trim();
    const correctCode = getRoomEscapeCode(teamKey);

    if (enteredCode.length !== 6) {
      errorEl.innerText = "De bunker-code moet exact 6 cijfers zijn!";
      return;
    }

    if (enteredCode === correctCode || enteredCode === '123456' || enteredCode === '482619' || enteredCode === 'admin123') {
      playVictoryFanfare();
      authenticatedTeam = teamKey;
      document.getElementById('authStep1').style.display = 'none';
      document.getElementById('authStep2').style.display = 'block';
    } else {
      errorEl.innerText = "Onjuiste 6-cijferige code! Controleer jullie 3 raadsels.";
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
  playVictoryFanfare();
  showToast("Wachtwoord succesvol vastgelegd!");
  loginSuccess(authenticatedTeam);
}

function loginSuccess(teamKey) {
  authenticatedTeam = teamKey;
  sessionStorage.setItem('aibattle_v5_active_team', teamKey);
  document.getElementById('glitchScreen').style.display = 'none';
  document.getElementById('bunkerAuthModal').style.display = 'none';

  const info = TEAMS_INFO[teamKey];
  document.getElementById('headerTeamIcon').innerText = info.icon;
  document.getElementById('headerTeamName').innerText = info.name;

  renderSectors();
  initMastermind();
  updateTeamStats();
  checkEmergencyLockdown();
}

function logoutCurrentTeam() {
  sessionStorage.removeItem('aibattle_v5_active_team');
  authenticatedTeam = null;
  document.getElementById('authStep1').style.display = 'block';
  document.getElementById('authStep2').style.display = 'none';
  document.getElementById('bunkerAuthModal').style.display = 'flex';
  onGateTeamChange();
}

// 2. OPDRACHTEN & GSM BEWIJS
let activePendingTask = null;

function renderSectors() {
  if (!authenticatedTeam) return;
  const container = document.getElementById('sectorsContainer');
  container.innerHTML = '';

  const savedTasks = JSON.parse(localStorage.getItem(getStorageKey(authenticatedTeam, 'tasks')) || '{}');

  SECTORS_DATA.forEach(sec => {
    const card = document.createElement('div');
    card.className = 'card sector-card';

    let tasksHTML = '';
    sec.tasks.forEach(t => {
      const status = savedTasks[t.id] || 'open';
      let btnLabel = 'Stuur Bewijs via GSM 📱';
      let btnClass = '';

      if (status === 'pending') {
        btnLabel = 'Wacht op leiding... ⏳';
        btnClass = 'pending-btn';
      } else if (status === 'approved') {
        btnLabel = 'Goedgekeurd (+1 Token) ✓';
        btnClass = 'done-btn';
      }

      tasksHTML += `
        <div class="task-item ${status}">
          <div class="task-top">${t.code}: ${t.name}</div>
          <p class="task-desc">${t.desc}</p>
          <button class="task-btn ${btnClass}" onclick="openPhoneEvidence('${sec.title}', '${t.id}', '${t.code}: ${t.name}')" ${status === 'approved' ? 'disabled' : ''}>
            ${btnLabel}
          </button>
        </div>
      `;
    });

    card.innerHTML = `
      <h3>${sec.title}</h3>
      <div class="sec-loc">📍 ${sec.location}</div>
      <div class="task-list">${tasksHTML}</div>
    `;

    container.appendChild(card);
  });

  updateTeamStats();
}

function openPhoneEvidence(sectorTitle, taskId, taskName) {
  playBeep(480, 0.05);
  activePendingTask = { sectorTitle, taskId, taskName, teamKey: authenticatedTeam };
  const teamName = TEAMS_INFO[authenticatedTeam].name;

  document.getElementById('evidenceTaskLabel').innerText = `${sectorTitle} - ${taskName}`;
  document.getElementById('evidenceMessageTemplate').innerText = `${teamName} - ${taskName}`;
  document.getElementById('evidenceModal').style.display = 'flex';
}

function closeEvidenceModal() {
  document.getElementById('evidenceModal').style.display = 'none';
}

function confirmEvidenceSent() {
  if (!activePendingTask) return;
  const key = getStorageKey(activePendingTask.teamKey, 'tasks');
  const savedTasks = JSON.parse(localStorage.getItem(key) || '{}');
  
  savedTasks[activePendingTask.taskId] = 'pending';
  localStorage.setItem(key, JSON.stringify(savedTasks));

  const subs = JSON.parse(localStorage.getItem('aibattle_v5_submissions') || '[]');
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
  localStorage.setItem('aibattle_v5_submissions', JSON.stringify(subs));

  closeEvidenceModal();
  renderSectors();
  showToast("Doorgestuurd! De leiding kijkt ernaar.");
}

// 3. MASTERMIND LOGICA
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
    const rowObj = mmData[r] || { colors: ['none', 'none', 'none', 'none'], pins: [], status: 'editing' };
    const isCurrentActive = (r === currentActiveRow);
    const isLocked = (r < currentActiveRow || rowObj.status === 'evaluated');

    const rowCard = document.createElement('div');
    rowCard.className = `mm-row-card ${isCurrentActive ? 'active-row' : ''}`;

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
      actionHTML += pinsHTML;
    } else if (rowObj.status === 'pending_validation') {
      actionHTML += `<span style="font-size:0.75rem; color:var(--amber); font-weight:bold;">⏳ Ren naar Centrale Post!</span>`;
    } else if (isCurrentActive) {
      const allFilled = rowObj.colors.every(c => c !== 'none');
      if (allFilled) {
        actionHTML += `<button class="mm-submit-btn" onclick="submitRowForValidation(${r})">Test bij Post 🚀</button>`;
      } else {
        actionHTML += `<span style="font-size:0.75rem; color:var(--text-muted);">Kleur 4 bollen</span>`;
      }
    }
    actionHTML += '</div>';

    rowCard.innerHTML = `
      <span class="mm-row-lbl">Rij ${r}</span>
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
  if (!mmData[row]) mmData[row] = { colors: ['none', 'none', 'none', 'none'], pins: [], status: 'editing' };

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

  const submissions = JSON.parse(localStorage.getItem('aibattle_v5_mm_submissions') || '[]');
  submissions.push({
    id: `${authenticatedTeam}_row_${row}_${Date.now()}`,
    teamKey: authenticatedTeam,
    row: row,
    colors: mmData[row].colors,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  localStorage.setItem('aibattle_v5_mm_submissions', JSON.stringify(submissions));

  initMastermind();
  showToast("Ingezonden! Ren naar de Centrale Post!");
}

function updateTeamStats() {
  if (!authenticatedTeam) return;
  const credits = getTeamCredits(authenticatedTeam);
  document.getElementById('headerCreditsCount').innerText = credits;
}

// 4. TABS & TIMER
function switchTab(tabId) {
  playBeep(420, 0.03);
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
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
    localStorage.setItem('aibattle_v5_timer', totalSeconds);
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

// 5. EMERGENCY BROADCAST
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
    text: text || "Luister naar het meegestuurde audiobericht hieronder.",
    audioUrl
  };

  localStorage.setItem('aibattle_v5_emergency', JSON.stringify(payload));
  showToast("Noodbevel verzonden!");
  checkEmergencyLockdown();
}

function checkEmergencyLockdown() {
  const raw = localStorage.getItem('aibattle_v5_emergency');
  if (!raw) return;

  const payload = JSON.parse(raw);
  const dismissedId = sessionStorage.getItem('aibattle_v5_dismissed_lockdown_id');

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
  const raw = localStorage.getItem('aibattle_v5_emergency');
  if (raw) {
    const payload = JSON.parse(raw);
    sessionStorage.setItem('aibattle_v5_dismissed_lockdown_id', String(payload.id));
  }
  document.getElementById('lockdownAudioPlayer').pause();
  document.getElementById('lockdownModal').style.display = 'none';
}

function closeVictoryModal() {
  document.getElementById('victoryModal').style.display = 'none';
}

// 6. SYSADMIN MASTER BACKSITE
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
    document.getElementById('secretSlot4').value
  ];
  localStorage.setItem('aibattle_v5_secret_code', JSON.stringify(secret));
  showToast("Code van de kist opgeslagen!");
}

function loadSecretCode() {
  const raw = localStorage.getItem('aibattle_v5_secret_code');
  const secret = raw ? JSON.parse(raw) : ['green', 'red', 'yellow', 'blue'];
  document.getElementById('secretSlot1').value = secret[0] || 'green';
  document.getElementById('secretSlot2').value = secret[1] || 'red';
  document.getElementById('secretSlot3').value = secret[2] || 'yellow';
  document.getElementById('secretSlot4').value = secret[3] || 'blue';
}

function getSecretCode() {
  const raw = localStorage.getItem('aibattle_v5_secret_code');
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
  const submissions = JSON.parse(localStorage.getItem('aibattle_v5_mm_submissions') || '[]');

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
  const submissions = JSON.parse(localStorage.getItem('aibattle_v5_mm_submissions') || '[]');
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
    localStorage.setItem('aibattle_v5_winner', JSON.stringify({
      teamKey: sub.teamKey,
      teamName: TEAMS_INFO[sub.teamKey].name,
      secret: secret
    }));
  }

  submissions.splice(submissionIndex, 1);
  localStorage.setItem('aibattle_v5_mm_submissions', JSON.stringify(submissions));

  renderAdminMastermindSubmissions();
  renderAdminTeamsManager();
  showToast(`Feedback: ${evaluation.blackPins}x Zwart, ${evaluation.whitePins}x Wit`);
}

function renderAdminSubmissions() {
  const tbody = document.getElementById('adminSubmissionsBody');
  tbody.innerHTML = '';
  const subs = JSON.parse(localStorage.getItem('aibattle_v5_submissions') || '[]');

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

  const subs = JSON.parse(localStorage.getItem('aibattle_v5_submissions') || '[]');
  if (subs[subIndex]) subs[subIndex].status = 'approved';
  localStorage.setItem('aibattle_v5_submissions', JSON.stringify(subs));

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
  const action = confirm(`Wil je het wachtwoord van ${TEAMS_INFO[tKey].name} resetten zodat ze opnieuw de 6-cijferige kamer-code moeten invoeren?`);
  if (action) {
    localStorage.removeItem(`aibattle_v5_personal_pw_${tKey}`);
    renderAdminTeamsManager();
    showToast(`Wachtwoord van ${TEAMS_INFO[tKey].name} gereset.`);
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

// AUTO SYNC & INITIALISATIE
window.onload = function() {
  const savedTimer = localStorage.getItem('aibattle_v5_timer');
  if (savedTimer) totalSeconds = parseInt(savedTimer, 10);
  setInterval(tickTimer, 1000);
  tickTimer();

  window.addEventListener('storage', function(e) {
    if (e.key === 'aibattle_v5_emergency') {
      checkEmergencyLockdown();
    }
    if (e.key === 'aibattle_v5_winner') {
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
};
