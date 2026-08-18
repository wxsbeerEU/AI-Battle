/**
 * AETHER_OS - 100% REALTIME FIREBASE POWERED ENGINE
 */

// =========================================================================
// 1. FIREBASE CONFIGURATIE (AI-BATTLE)
// =========================================================================
const firebaseConfig = {
  apiKey: "AIzaSyBkO-N0BF7tbIpSQhWwALD_hx3xCZRzecQ",
  authDomain: "ai-battle-46230.firebaseapp.com",
  databaseURL: "https://ai-battle-46230-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ai-battle-46230",
  storageBucket: "ai-battle-46230.firebasestorage.app",
  messagingSenderId: "621832467978",
  appId: "1:621832467978:web:056566ee48cbdad30651f3"
};

let db = null;
let isFirebaseReady = false;

try {
  firebase.initializeApp(firebaseConfig);
  db = firebase.database();
  isFirebaseReady = true;
} catch (err) {
  console.error("Firebase init fout:", err);
}

// 24 DROPSPEL MISSIES
const SECTORS_DATA = [
  { 
    id: 't-1', 
    code: 'Opdracht 1', 
    name: 'Wiskundige Huizenscan', 
    location: 'Woonstraten rond De Bronne / Ter Duinen', 
    desc: 'Zoek een huisnummer dat deelbaar is door zowel 6 als 4 (bijv. 12, 24, 36, 48...). Maak een duidelijke foto van het team bij het huisnummer.' 
  },
  { 
    id: 't-2', 
    code: 'Opdracht 2', 
    name: 'High-Five Protocol', 
    location: 'Winkelstraat of Zeelaan', 
    desc: 'Geef 10 willekeurige voorbijgangers een enthousiaste high-five. Maak een korte video of compilatie waarin minstens 3 high-fives te zien zijn.' 
  },
  { 
    id: 't-3', 
    code: 'Opdracht 3', 
    name: 'Honden-Biometrie', 
    location: 'Wandelpaden / Park', 
    desc: 'Vraag netjes aan een baasje of jullie een groepsselfie mogen maken met hun hond. Stuur de foto door!' 
  },
  { 
    id: 't-4', 
    code: 'Opdracht 4', 
    name: 'De Snorren-Scan', 
    location: 'Dorp / Markt / Zeelaan', 
    desc: 'Zoek een persoon met enkel een snor (geen volle baard). Vraag vriendelijk om een selfie met jullie team.' 
  },
  { 
    id: 't-5', 
    code: 'Opdracht 5', 
    name: 'Colruyt Flashmob', 
    location: 'Colruyt Koksijde', 
    desc: 'Wandel naar de Colruyt (of parking/inkom). Doe met de hele groep tegelijk een synchroon TikTok-dansje en stuur de video door!' 
  },
  { 
    id: 't-6', 
    code: 'Opdracht 6', 
    name: 'Megastraat Datamining', 
    location: 'Koksijde Centrum / Straten', 
    desc: 'Zoek een officieel straatnaambord met minstens 15 letters (exclusief spaties/symbolen). Maak een selfie met het bord.' 
  },
  { 
    id: 't-7', 
    code: 'Opdracht 7', 
    name: 'Dubbele Cijfercode', 
    location: 'Openbare Parking', 
    desc: 'Vind een geparkeerde auto met een nummerplaat die minstens 2 dezelfde cijfers bevat (bijv. 1-ABC-223). Stuur de foto van de plaat.' 
  },
  { 
    id: 't-8', 
    code: 'Opdracht 8', 
    name: 'Vlaggen-Observatie', 
    location: 'Gemeentehuis / Hotels / Strandlaan', 
    desc: 'Zoek een gebouw waar een officiële vlag aan wappert. Maak een groepsfoto met het gebouw en de vlag duidelijk in beeld.' 
  },
  { 
    id: 't-9', 
    code: 'Opdracht 9', 
    name: 'Het Straat-Interview', 
    location: 'Dorpsplein / Bankjes', 
    desc: 'Neem een interview af van minstens 1 volle minuut met een voorbijganger (over hun dag, lievelingseten of de ontspoorde AI). Stuur de video door.' 
  },
  { 
    id: 't-10', 
    code: 'Opdracht 10', 
    name: 'Rode Auto Infiltratie', 
    location: 'Parking / Straten', 
    desc: 'Vind een felrode auto. Maak een groepsfoto waarbij iedereen als een geheim agent rond de rode auto staat geslopen.' 
  },
  { 
    id: 't-11', 
    code: 'Opdracht 11', 
    name: 'Beklim de Hoge Blekker', 
    location: 'Natuurgebied De Hoge Blekker', 
    desc: 'Wandel naar De Hoge Blekker en bereik de absolute top van de duin (of zo hoog als mogelijk). Maak een overwinningsfoto bovenop de top!' 
  },
  { 
    id: 't-12', 
    code: 'Opdracht 12', 
    name: 'Natuurhistorische Safari', 
    location: 'Natuurmuseum / Natuureducatief Centrum Koksijde', 
    desc: 'Wandel naar het Natuurmuseum (of de ingang). Laat iedereen van de groep tegelijk een wild dier theatraal nadoen op video (met geluid!).' 
  },
  { 
    id: 't-13', 
    code: 'Opdracht 13', 
    name: 'Menselijke Piramide', 
    location: 'Grasveld / Plein', 
    desc: 'Bouw met het hele team een stabiele menselijke piramide van minstens 2 of 3 verdiepingen. Houd dit 5 seconden vast voor de foto!' 
  },
  { 
    id: 't-14', 
    code: 'Opdracht 14', 
    name: 'Huisnummer Som 10', 
    location: 'Woonwijk', 
    desc: 'Zoek een huisnummer waarvan de afzonderlijke cijfers opgeteld exact 10 vormen (bijv. 19, 28, 37, 46, 55, 64, 73, 82, 91 of 145). Stuur de foto.' 
  },
  { 
    id: 't-15', 
    code: 'Opdracht 15', 
    name: 'Het Geheime Woord: Teletubbie', 
    location: 'Winkelstraat / Park', 
    desc: 'Laat een willekeurige voorbijganger spontaan of via een slimme vraag het woord "Teletubbie" hardop uitspreken op video.' 
  },
  { 
    id: 't-16', 
    code: 'Opdracht 16', 
    name: 'De Brooddoos Monoloog', 
    location: 'Willekeurige Plek', 
    desc: 'Laat 1 iemand van jullie groep 1 volle minuut (60 seconden aan een stuk) zonder pauze vol passie over een brooddoos praten op video.' 
  },
  { 
    id: 't-17', 
    code: 'Opdracht 17', 
    name: 'Sint-Pieterskerk Standbeelden & Gebed', 
    location: 'Sint-Pieterskerk Koksijde-Dorp', 
    desc: 'Wandel naar de Sint-Pieterskerk. Maak 2 foto\'s: 1) Waarbij iedereen buiten een heilig standbeeld nadoet, en 2) Waarbij het hele team theatraal in gebedshouding staat.' 
  },
  { 
    id: 't-18', 
    code: 'Opdracht 18', 
    name: 'Historische Extractie', 
    location: 'Militair Kerkhof Koksijde (Kerkstraat / Robert Vandammestraat)', 
    desc: 'Wandel naar het militaire kerkhof. Betreed het domein in absolute stilte en respect. Zoek de oudste datum die jullie op een grafsteen vinden en stuur een duidelijke foto door.' 
  },
  { 
    id: 't-19', 
    code: 'Opdracht 19', 
    name: 'Noodprotocol 112', 
    location: 'In de Straat / Openbaar Domein', 
    desc: 'Voor de veiligheid van het netwerk: vind in het openbaar domein een bord, sticker, stickerpaal, AED-kast of voertuig waar het noodnummer "112" op vermeld staat. Stuur de foto!' 
  },
  { 
    id: 't-20', 
    code: 'Opdracht 20', 
    name: 'Straten Alliteratie Scan', 
    location: 'Woonwijken Koksijde', 
    desc: 'Vind in de omgeving 3 verschillende officiële straatnaamborden die met exact dezelfde letter beginnen (bijv. 3x met een K, P of Z). Maak een collage of stuur de 3 foto\'s door.' 
  },
  { 
    id: 't-21', 
    code: 'Opdracht 21', 
    name: 'De Opvallende Voordeur', 
    location: 'Woonstraten / Villa\'s', 
    desc: 'Zoek een huis met een extreem opvallende, felle of artistieke voordeur (bijv. felgeel, knalrood of speciaal houtwerk). Maak een selfie met het team voor de deur (met respect voor de bewoners).' 
  },
  { 
    id: 't-22', 
    code: 'Opdracht 22', 
    name: 'Tongbreker Decryptie', 
    location: 'Willekeurige Plek', 
    desc: 'Laat 1 teamlid 5x achter elkaar zónder haperen een moeilijke tongbreker uitspreken op video (bijv. "De koetsier poetst de postkoets" of "De knecht snijdt recht").' 
  },
  { 
    id: 't-23', 
    code: 'Opdracht 23', 
    name: 'Speelplein Kleutertijd', 
    location: 'Openbaar Speelplein in de buurt', 
    desc: 'Zoek een speelplein. Maak een grappige en overdreven groepsfoto waarbij iedereen van het team doet alsof jullie 4-jarige kleutertjes zijn (op de schommel, glijbaan of in het zand).' 
  },
  { 
    id: 't-24', 
    code: 'Opdracht 24', 
    name: 'De Menselijke Knoop Ontsnapping', 
    location: 'Grasveld / Park', 
    desc: 'Ga in een kring staan, steek je handen naar het midden en pak willekeurige handen van anderen vast. Ontrafel deze menselijke knoop zonder elkaars handen los te laten! Film de ontsnapping.' 
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
  red: '🔴 EMP_PULSE',
  blue: '🔵 FIREWALL',
  green: '🟢 OVERRIDE',
  yellow: '🟡 DATA_PURGE',
  orange: '🟠 THROTTLE',
  purple: '🟣 NEURAL_SHOCK'
};

let authenticatedTeam = null;
let isAdminAuthenticated = false;

let currentTeamState = {
  credits: 0,
  active_row: 1,
  tasks: {},
  mastermind: {},
  personalPassword: null,
  lockout: false,
  activeCodeType: 'primary'
};

let primarySecretCode = ['green', 'red', 'yellow', 'blue', 'orange', 'purple'];
let backupSecretCode = ['blue', 'purple', 'red', 'green', 'yellow', 'orange'];
let pendingCrackedTeam = null;
let currentlySelectedColor = 'red';
let audioCtx = null;
let totalSeconds = 120 * 60;
let timerRunning = true;
let activeMissionAudioUrl = null;

// SYNTHESIZER SOUND ENGINE
function getAudioContext() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playGlitchNoise() {
  if (isAdminAuthenticated) return;
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
  if (isAdminAuthenticated) return;
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
  if (isAdminAuthenticated) return;
  playBeep(440, 0.1);
  setTimeout(() => playBeep(554, 0.1), 120);
  setTimeout(() => playBeep(659, 0.15), 240);
  setTimeout(() => playBeep(880, 0.3), 380);
}

// THEMATISCHE POPUP / ALERT
function showCustomAlert(text, header = "⚠️ SYSTEEM MELDING") {
  if (isAdminAuthenticated) return;
  playGlitchNoise();
  document.getElementById('customAlertHeader').innerText = header;
  document.getElementById('customAlertText').innerText = text;
  document.getElementById('customAlertModal').style.display = 'flex';
}

function closeCustomAlert() {
  playBeep(400, 0.05);
  document.getElementById('customAlertModal').style.display = 'none';
}

function dismissSabotageModal() {
  playBeep(600, 0.1);
  document.getElementById('sabotageModal').style.display = 'none';
}

function dismissBonusTokensModal() {
  playBeep(600, 0.1);
  document.getElementById('bonusTokensModal').style.display = 'none';
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
  const errorEl = document.getElementById('gateErrorMsg');
  errorEl.innerText = '';

  const bunkerGroup = document.getElementById('bunkerCodeGroup');
  const returningGroup = document.getElementById('returningLoginGroup');
  const btn = document.getElementById('btnSubmitBunker');

  document.getElementById('bunker6DigitInput').value = '';
  document.getElementById('teamPersonalPasswordInput').value = '';

  if (isFirebaseReady) {
    db.ref(`teams/${teamKey}/personalPassword`).once('value', snapshot => {
      const personalPw = snapshot.val();
      if (personalPw) {
        bunkerGroup.style.display = 'none';
        returningGroup.style.display = 'block';
        btn.innerText = "[ INLOGGEN MET EIGEN WACHTWOORD 🚀 ]";
      } else {
        bunkerGroup.style.display = 'block';
        returningGroup.style.display = 'none';
        btn.innerText = "[ VERIFIEER CODE & ONTGRENDEL TERMINAL 🔓 ]";
      }
    });
  }
}

function handleRoomCodeSubmit() {
  const teamKey = document.getElementById('gateTeamSelect').value;
  const errorEl = document.getElementById('gateErrorMsg');

  if (isFirebaseReady) {
    db.ref(`teams/${teamKey}`).once('value', snapshot => {
      const teamData = snapshot.val() || {};
      const personalPw = teamData.personalPassword;
      const roomCode = teamData.roomEscapeCode || '2543';

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
        if (!enteredCode) {
          errorEl.innerText = "Voer de lokaalcode in (2543 of 4325)!";
          return;
        }
        if (enteredCode === '2543' || enteredCode === '4325' || enteredCode === roomCode || enteredCode === 'admin123') {
          playVictoryFanfare();
          authenticatedTeam = teamKey;
          document.getElementById('screenRoomCode').style.display = 'none';
          document.getElementById('screenSetPassword').style.display = 'flex';
        } else {
          errorEl.innerText = "Onjuiste lokaalcode! Controleer de puzzels in De Bronne.";
        }
      }
    });
  }
}

// FASE 3: EIGEN WACHTWOORD
function savePasswordAndShowTutorial() {
  const newPw = document.getElementById('newTeamPasswordInput').value.trim();
  const errorEl = document.getElementById('step2ErrorMsg');

  if (!newPw || newPw.length < 3) {
    errorEl.innerText = "Kies een wachtwoord van minstens 3 tekens.";
    return;
  }

  if (isFirebaseReady) {
    db.ref(`teams/${authenticatedTeam}/personalPassword`).set(newPw);
  }

  playVictoryFanfare();
  document.getElementById('screenSetPassword').style.display = 'none';
  openTutorialModal();
}

function openTutorialModal() {
  const teamInfo = TEAMS_INFO[authenticatedTeam || 'chatgpt'];
  document.getElementById('tutorialTeamBadge').innerText = `TARGET: ${teamInfo.name.toUpperCase()}`;
  document.getElementById('screenTutorial').style.display = 'flex';
}

function closeTutorialModal() {
  playBeep(500, 0.08);
  document.getElementById('screenTutorial').style.display = 'none';
  if (authenticatedTeam) {
    launchCockpit(authenticatedTeam);
  }
}

function finishTutorialAndLaunchCockpit() {
  closeTutorialModal();
}

function launchCockpit(teamKey) {
  authenticatedTeam = teamKey;
  
  document.getElementById('screenIntro').style.display = 'none';
  document.getElementById('screenRoomCode').style.display = 'none';
  document.getElementById('screenSetPassword').style.display = 'none';
  document.getElementById('screenTutorial').style.display = 'none';
  document.getElementById('transmittingModal').style.display = 'none';
  document.getElementById('mainCockpit').style.display = 'flex';

  const info = TEAMS_INFO[teamKey];
  document.getElementById('headerTeamIcon').innerText = info.icon;
  document.getElementById('headerTeamName').innerText = `Target: ${info.name.replace('Team ', '')}`;

  setupFirebaseTeamListener(teamKey);
}

function logoutCurrentTeam() {
  authenticatedTeam = null;
  document.getElementById('mainCockpit').style.display = 'none';
  document.getElementById('screenIntro').style.display = 'flex';
  document.getElementById('screenRoomCode').style.display = 'none';
  document.getElementById('screenSetPassword').style.display = 'none';
  document.getElementById('screenTutorial').style.display = 'none';
  document.getElementById('transmittingModal').style.display = 'none';
}

// FASE 4: MISSIES RENDERING & GSM BEWIJS
let activePendingTask = null;

function renderSectors() {
  if (!authenticatedTeam) return;
  const container = document.getElementById('sectorsContainer');
  container.innerHTML = '';

  const savedTasks = currentTeamState.tasks || {};
  const completedCount = Object.values(savedTasks).filter(v => v === 'approved').length;
  
  document.getElementById('missionProgressCounter').innerText = `${completedCount} / ${SECTORS_DATA.length}`;
  const pct = (completedCount / SECTORS_DATA.length) * 100;
  document.getElementById('missionProgressBar').style.width = `${pct}%`;

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

  if (isFirebaseReady) {
    db.ref(`teams/${activePendingTask.teamKey}/tasks/${foundTask.id}`).set('pending');
    db.ref(`submissions/tasks/${activePendingTask.teamKey}_${foundTask.id}`).set({
      teamKey: activePendingTask.teamKey,
      taskId: foundTask.id,
      taskName: activePendingTask.taskName,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'pending'
    });
  }

  closeEvidenceModal();
  showCustomAlert("Transmissie verzonden naar de centrale basis. De leiding controleert het bewijs!", "📡 TRANSMISSIE BEVESTIGD");
}

// MASTERMIND ENGINE (6 SLOTS)
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

  const mmData = currentTeamState.mastermind || {};
  const currentActiveRow = currentTeamState.active_row || 1;

  for (let r = 1; r <= 6; r++) {
    const rowObj = mmData[r] || { colors: ['none', 'none', 'none', 'none', 'none', 'none'], pins: [], status: 'editing' };
    const isCurrentActive = (r === currentActiveRow);
    const isLocked = (r < currentActiveRow || rowObj.status === 'evaluated' || rowObj.status === 'cracked_pending');

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
      (rowObj.pins || []).forEach(pin => {
        pinsHTML += `<div class="pin pin-${pin}"></div>`;
      });
      for (let i = (rowObj.pins || []).length; i < 6; i++) {
        pinsHTML += `<div class="pin"></div>`;
      }
      pinsHTML += '</div>';
      actionHTML += pinsHTML;
    } else if (rowObj.status === 'cracked_pending') {
      actionHTML += `<span style="font-size:0.8rem; color:var(--primary); font-weight:bold;">⚡ UPLOADING...</span>`;
    } else if (isCurrentActive) {
      const allFilled = rowObj.colors.every(c => c !== 'none');
      if (allFilled) {
        actionHTML += `<button class="retro-btn btn-sm btn-emerald" onclick="submitRowForValidation(${r})">[ LANCEER 🚀 ]</button>`;
      } else {
        actionHTML += `<span style="font-size:0.75rem; color:var(--text-muted);">Vul 6 slots</span>`;
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

  const mmData = currentTeamState.mastermind || {};
  if (!mmData[row]) mmData[row] = { colors: ['none', 'none', 'none', 'none', 'none', 'none'], pins: [], status: 'editing' };

  const currentColor = mmData[row].colors[slotIndex];
  const credits = currentTeamState.credits || 0;

  if (currentColor === 'none') {
    if (credits <= 0) {
      return showCustomAlert("Onvoldoende Quantum-Tokens! Voer eerst een dropspel-opdracht uit om nieuwe tokens te verdienen.", "⚠️ GEEN TOKENS");
    }
    playBeep(640, 0.05);
    mmData[row].colors[slotIndex] = currentlySelectedColor;
    
    if (isFirebaseReady) {
      db.ref(`teams/${authenticatedTeam}/credits`).set(Math.max(0, credits - 1));
      db.ref(`teams/${authenticatedTeam}/mastermind/${row}`).set(mmData[row]);
    }
  } else {
    playBeep(580, 0.05);
    mmData[row].colors[slotIndex] = currentlySelectedColor;
    if (isFirebaseReady) {
      db.ref(`teams/${authenticatedTeam}/mastermind/${row}`).set(mmData[row]);
    }
  }
}

function submitRowForValidation(row) {
  const mmData = currentTeamState.mastermind || {};
  if (!mmData[row]) return;

  const targetSecret = (currentTeamState.activeCodeType === 'backup') ? backupSecretCode : primarySecretCode;
  const evaluation = evaluateGuess(mmData[row].colors, targetSecret);

  playBeep(750, 0.08);

  if (evaluation.blackPins === 6) {
    mmData[row].pins = evaluation.pins;
    mmData[row].status = 'cracked_pending';

    if (isFirebaseReady) {
      db.ref(`teams/${authenticatedTeam}/mastermind/${row}`).set(mmData[row]);
      db.ref('gameState/crackedAlert').set({
        teamKey: authenticatedTeam,
        teamName: TEAMS_INFO[authenticatedTeam].name,
        row: row,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }

    document.getElementById('transmittingModal').style.display = 'flex';
  } else {
    mmData[row].pins = evaluation.pins;
    mmData[row].status = 'evaluated';

    if (isFirebaseReady) {
      db.ref(`teams/${authenticatedTeam}/mastermind/${row}`).set(mmData[row]);
      if (row < 6) {
        db.ref(`teams/${authenticatedTeam}/active_row`).set(row + 1);
      }
    }
    showCustomAlert(`Tegenaanval Verwerkt!\nFeedback: ${evaluation.blackPins}x Zwart (Exact), ${evaluation.whitePins}x Wit (Positiefout)`, "📡 TELEMETRIE RAPPORT");
  }
}

function updateTeamStats() {
  if (!authenticatedTeam) return;
  document.getElementById('headerCreditsCount').innerText = currentTeamState.credits || 0;
}

// TABS & TIMER
function switchTab(tabId) {
  playBeep(420, 0.03);
  document.querySelectorAll('.tab-panel').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

  const target = document.getElementById(`tab-${tabId}`);
  if (target) target.classList.add('active');

  const btn = tabId === 'sectors' ? document.getElementById('tabBtnSectors') : document.getElementById('tabBtnMastermind');
  if (btn) btn.classList.add('active');
}

function tickTimer() {
  if (timerRunning && totalSeconds > 0) {
    totalSeconds--;
  }

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  document.getElementById('gameTimer').innerText = 
    `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function startTimer() {
  if (isFirebaseReady) db.ref('gameState/timerRunning').set(true);
}

function pauseTimer() {
  if (isFirebaseReady) db.ref('gameState/timerRunning').set(false);
}

function resetTimer(mins = 120) {
  if (isFirebaseReady) {
    db.ref('gameState/totalSeconds').set(mins * 60);
    db.ref('gameState/timerRunning').set(true);
  }
}

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

  if (isFirebaseReady) {
    db.ref('gameState/emergency').set(payload);
  }
}

function checkEmergencyLockdown(payload) {
  if (!payload || isAdminAuthenticated) return;
  const dismissedId = sessionStorage.getItem('aether_dismissed_emergency');

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
  const rawId = document.getElementById('lockdownTitle').dataset.emergencyId;
  sessionStorage.setItem('aether_dismissed_emergency', String(rawId || Date.now()));
  document.getElementById('lockdownAudioPlayer').pause();
  document.getElementById('lockdownModal').style.display = 'none';
}

function closeVictoryModal() {
  document.getElementById('victoryModal').style.display = 'none';
}

// STARTSEIN & AUDIO BROADCAST VANUIT ADMIN
function adminStartMissionBroadcast() {
  const fileInput = document.getElementById('adminMissionAudioFileInput');

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      broadcastMissionStart(e.target.result);
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    broadcastMissionStart(null);
  }
}

function broadcastMissionStart(audioDataUrl) {
  if (isFirebaseReady) {
    db.ref('gameState/missionStarted').set(true);
    db.ref('gameState/timerRunning').set(true);
    if (audioDataUrl) {
      db.ref('gameState/missionAudioUrl').set(audioDataUrl);
    }
  }
  alert("Spel gestart! Lokaalcode-invoer is vrijgegeven en het audiobericht wordt afgespeeld bij de teams.");
}

function replayMissionAudio() {
  if (activeMissionAudioUrl) {
    const player = document.getElementById('globalMissionAudioPlayer');
    player.src = activeMissionAudioUrl;
    player.play().catch(() => {});
  }
}

// SYSADMIN LEIDING PANEEL
function openAdminModal() {
  document.getElementById('adminModal').style.display = 'flex';
}

function closeAdminModal() {
  document.getElementById('adminModal').style.display = 'none';
}

function loginAdmin() {
  const p = document.getElementById('adminPasswordInput').value;
  if (p === 'admin123' || p === 'core2026') {
    isAdminAuthenticated = true;
    document.getElementById('adminAuthSection').style.display = 'none';
    document.getElementById('adminControlsSection').style.display = 'block';
    loadSecretCodesUI();
    setupAdminRealtimeListeners();
  } else {
    document.getElementById('adminAuthError').style.display = 'block';
  }
}

function saveSecretCodes() {
  const primary = [
    document.getElementById('secretSlot1').value,
    document.getElementById('secretSlot2').value,
    document.getElementById('secretSlot3').value,
    document.getElementById('secretSlot4').value,
    document.getElementById('secretSlot5').value,
    document.getElementById('secretSlot6').value
  ];

  const backup = [
    document.getElementById('backupSlot1').value,
    document.getElementById('backupSlot2').value,
    document.getElementById('backupSlot3').value,
    document.getElementById('backupSlot4').value,
    document.getElementById('backupSlot5').value,
    document.getElementById('backupSlot6').value
  ];

  if (isFirebaseReady) {
    db.ref('gameState/primarySecretCode').set(primary);
    db.ref('gameState/backupSecretCode').set(backup);
  }
  alert("Primaire en Backup Codes opgeslagen in Firebase!");
}

function loadSecretCodesUI() {
  document.getElementById('secretSlot1').value = primarySecretCode[0] || 'green';
  document.getElementById('secretSlot2').value = primarySecretCode[1] || 'red';
  document.getElementById('secretSlot3').value = primarySecretCode[2] || 'yellow';
  document.getElementById('secretSlot4').value = primarySecretCode[3] || 'blue';
  document.getElementById('secretSlot5').value = primarySecretCode[4] || 'orange';
  document.getElementById('secretSlot6').value = primarySecretCode[5] || 'purple';

  document.getElementById('backupSlot1').value = backupSecretCode[0] || 'blue';
  document.getElementById('backupSlot2').value = backupSecretCode[1] || 'purple';
  document.getElementById('backupSlot3').value = backupSecretCode[2] || 'red';
  document.getElementById('backupSlot4').value = backupSecretCode[3] || 'green';
  document.getElementById('backupSlot5').value = backupSecretCode[4] || 'yellow';
  document.getElementById('backupSlot6').value = backupSecretCode[5] || 'orange';
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

// LEIDING ACTIE 1: ALARM TRIGGEREN VOOR SPOEDTERUGKEER
function adminTriggerGlobalReturn() {
  if (isFirebaseReady && pendingCrackedTeam) {
    const winningCode = (currentTeamState.activeCodeType === 'backup') ? backupSecretCode : primarySecretCode;
    db.ref('gameState/winner').set({
      teamKey: pendingCrackedTeam.teamKey,
      teamName: pendingCrackedTeam.teamName,
      secret: winningCode
    });
    db.ref('gameState/crackedAlert').remove();
    document.getElementById('adminCrackAlertBox').style.display = 'none';
  }
}

// LEIDING ACTIE 2: ENKEL DIT TEAM SABOTEREN EN OVERZETTEN OP BACKUP CODE
function adminSabotageTeamCode() {
  if (!pendingCrackedTeam || !isFirebaseReady) return;

  const tKey = pendingCrackedTeam.teamKey;
  const tName = pendingCrackedTeam.teamName;

  db.ref(`teams/${tKey}/activeCodeType`).set('backup');
  db.ref(`teams/${tKey}/mastermind`).remove();
  db.ref(`teams/${tKey}/active_row`).set(1);
  db.ref(`teams/${tKey}/credits`).transaction(current => (current || 0) + 6);

  db.ref(`teams/${tKey}/sabotageNotice`).set({
    id: Date.now(),
    title: "⚡ AI KERN SABOTAGE: PARAMETERS GEWIJZIGD",
    text: "De corrupte AI heeft jullie aanval op de primaire kern afgeweerd en de decryptieparameters gewijzigd! Jullie terminal is overgeschakeld naar het secundaire back-up protocol. Er zijn 6 compensatie-tokens toegevoegd. Herstart direct de tegenaanval!"
  });

  db.ref('gameState/crackedAlert').remove();
  document.getElementById('adminCrackAlertBox').style.display = 'none';

  alert(`Sabotage uitgevoerd! ${tName} staat nu op de Backup Code en heeft +6 tokens ontvangen.`);
}

// REALTIME ADMIN LISTENERS
function setupAdminRealtimeListeners() {
  if (!isFirebaseReady) return;

  db.ref('submissions/tasks').on('value', snapshot => {
    const tbody = document.getElementById('adminSubmissionsBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const submissions = snapshot.val() || {};
    const entries = Object.entries(submissions);

    if (entries.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="color:var(--text-muted); text-align:center;">Geen openstaande opdrachten.</td></tr>';
      return;
    }

    entries.forEach(([subKey, s]) => {
      const tInfo = TEAMS_INFO[s.teamKey];
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${tInfo.icon} ${tInfo.name}</strong></td>
        <td>${s.taskName}</td>
        <td><span style="color:${s.status === 'approved' ? 'var(--emerald)' : 'var(--amber)'}">${s.status === 'approved' ? '✓ Goedgekeurd' : '⏳ Wacht op check'}</span></td>
        <td>
          ${s.status !== 'approved' ? `
            <button class="retro-btn btn-sm btn-emerald" onclick="adminApproveTaskFB('${subKey}', '${s.teamKey}', '${s.taskId}')">[ GOEDKEUREN (+1 Token) ]</button>
          ` : 'Voltooid'}
        </td>
      `;
      tbody.appendChild(tr);
    });
  });

  db.ref('teams').on('value', snapshot => {
    const tbody = document.getElementById('adminTeamsManagerBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const teamsData = snapshot.val() || {};

    Object.keys(TEAMS_INFO).forEach(tKey => {
      const tInfo = TEAMS_INFO[tKey];
      const tData = teamsData[tKey] || {};
      const credits = tData.credits || 0;
      const activeRow = tData.active_row || 1;
      const activeCodeType = tData.activeCodeType === 'backup' ? '🟠 Backup Code' : '🟢 Primaire Code';
      const personalPw = tData.personalPassword || 'Nog niet gekozen';
      const isLocked = tData.lockout === true;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${tInfo.icon} ${tInfo.name}</strong></td>
        <td style="color:var(--amber); font-weight:bold;">
          <span id="creditsVal_${tKey}">${credits}</span> Tokens
          <button class="retro-btn btn-sm" style="padding:0.15rem 0.4rem; margin-left:0.4rem;" onclick="adminAdjustTokens('${tKey}', 1)">+1</button>
          <button class="retro-btn btn-sm" style="padding:0.15rem 0.4rem;" onclick="adminAdjustTokens('${tKey}', -1)">-1</button>
        </td>
        <td>Rij ${activeRow}</td>
        <td><code>${activeCodeType}</code></td>
        <td><code>${personalPw}</code></td>
        <td>
          <button class="retro-btn btn-sm btn-emerald" onclick="adminGiveBonusTokensPrompt('${tKey}')">🎁 Bonus Tokens</button>
          <button class="retro-btn btn-sm ${isLocked ? 'btn-emerald' : 'btn-danger'}" style="margin-left:0.3rem;" onclick="adminToggleTeamLockout('${tKey}', ${!isLocked})">
            ${isLocked ? 'Vrijgeven' : '⚡ Lockout'}
          </button>
          <button class="retro-btn btn-sm" style="margin-left:0.3rem;" onclick="adminResetTeamPassword('${tKey}')">Reset PW</button>
          <button class="retro-btn btn-sm btn-danger" style="margin-left:0.3rem;" onclick="adminResetTeamFull('${tKey}')">Reset Team</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  });
}

function adminGiveBonusTokensPrompt(tKey) {
  const tInfo = TEAMS_INFO[tKey];
  const input = prompt(`Hoeveel BONUS tokens wil je toekennen aan ${tInfo.name}? (Bijv. 2, 3 of 5):`, "2");
  if (!input) return;

  const amount = parseInt(input, 10);
  if (isNaN(amount) || amount <= 0) {
    return alert("Voer een geldig getal groter dan 0 in!");
  }

  if (isFirebaseReady) {
    db.ref(`teams/${tKey}/credits`).transaction(current => (current || 0) + amount);
    db.ref(`teams/${tKey}/bonusNotice`).set({
      id: Date.now(),
      amount: amount,
      title: "⚡ SYSTEEM INBREUK // AI VERZWAKT",
      text: `De centrale AI verzwakt door jullie acties! Jullie ontvangen +${amount} Bonus Quantum-Tokens voor de tegenaanval!`
    });
  }
}

function adminApproveTaskFB(subKey, teamKey, taskId) {
  if (isFirebaseReady) {
    db.ref(`teams/${teamKey}/tasks/${taskId}`).set('approved');
    db.ref(`teams/${teamKey}/credits`).transaction(current => (current || 0) + 1);
    db.ref(`submissions/tasks/${subKey}`).remove();
  }
}

function adminAdjustTokens(tKey, amount) {
  if (isFirebaseReady) {
    db.ref(`teams/${tKey}/credits`).transaction(current => Math.max(0, (current || 0) + amount));
  }
}

function adminToggleTeamLockout(tKey, lockStatus) {
  if (isFirebaseReady) {
    db.ref(`teams/${tKey}/lockout`).set(lockStatus);
  }
}

function adminResetTeamPassword(tKey) {
  if (confirm(`Wil je het wachtwoord van ${TEAMS_INFO[tKey].name} resetten in Firebase?`)) {
    if (isFirebaseReady) {
      db.ref(`teams/${tKey}/personalPassword`).remove();
    }
  }
}

function adminResetTeamFull(tKey) {
  if (confirm(`LET OP: Wil je ALLE data van ${TEAMS_INFO[tKey].name} wissen in Firebase?`)) {
    if (isFirebaseReady) {
      db.ref(`teams/${tKey}`).set({
        credits: 0,
        active_row: 1,
        roomEscapeCode: '2543',
        personalPassword: null,
        lockout: false,
        activeCodeType: 'primary',
        tasks: {},
        mastermind: {}
      });
    }
  }
}

function adminResetAllGameData() {
  if (confirm("🚨 WEET JE DIT ZEKER? Dit wist ALLE data van ALLE 6 teams, alle inzendingen, winnaars en reset de timer in Firebase!")) {
    if (isFirebaseReady) {
      db.ref('submissions').remove();
      db.ref('gameState/winner').remove();
      db.ref('gameState/crackedAlert').remove();
      db.ref('gameState/emergency').remove();
      db.ref('gameState/missionStarted').set(false);
      db.ref('gameState/missionAudioUrl').remove();
      db.ref('gameState/totalSeconds').set(7200);
      db.ref('gameState/timerRunning').set(false);

      Object.keys(TEAMS_INFO).forEach(tKey => {
        db.ref(`teams/${tKey}`).set({
          credits: 0,
          active_row: 1,
          roomEscapeCode: '2543',
          personalPassword: null,
          lockout: false,
          activeCodeType: 'primary',
          tasks: {},
          mastermind: {}
        });
      });
    }
    alert("Volledig spel gereset in Firebase!");
    setTimeout(() => location.reload(), 500);
  }
}

// Sneltoetsen: Ctrl + Shift + A (Open Admin), Escape (Sluit Modals)
window.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
    e.preventDefault();
    openAdminModal();
  } else if (e.key === 'Escape') {
    closeAdminModal();
    closeEvidenceModal();
    closeTutorialModal();
    closeCustomAlert();
    dismissSabotageModal();
    dismissBonusTokensModal();
  }
});

// REALTIME LISTENERS VOOR SPELERSCONSOLES
function setupFirebaseTeamListener(teamKey) {
  if (!isFirebaseReady) return;

  db.ref(`teams/${teamKey}`).on('value', snapshot => {
    if (isAdminAuthenticated) return;
    const data = snapshot.val() || {};
    
    if (authenticatedTeam === teamKey && !data.personalPassword && document.getElementById('mainCockpit').style.display === 'flex') {
      logoutCurrentTeam();
      return;
    }

    currentTeamState = {
      credits: data.credits || 0,
      active_row: data.active_row || 1,
      tasks: data.tasks || {},
      mastermind: data.mastermind || {},
      personalPassword: data.personalPassword || null,
      lockout: data.lockout === true,
      activeCodeType: data.activeCodeType || 'primary'
    };

    // Check voor Bonus Tokens pop-up
    if (data.bonusNotice) {
      playVictoryFanfare();
      document.getElementById('bonusTokensTitle').innerText = data.bonusNotice.title;
      document.getElementById('bonusTokensText').innerText = data.bonusNotice.text;
      document.getElementById('bonusTokensModal').style.display = 'flex';
      db.ref(`teams/${teamKey}/bonusNotice`).remove();
    }

    // Check voor Sabotage pop-up
    if (data.sabotageNotice) {
      document.getElementById('transmittingModal').style.display = 'none';
      playGlitchNoise();
      document.getElementById('sabotageTitle').innerText = data.sabotageNotice.title;
      document.getElementById('sabotageText').innerText = data.sabotageNotice.text;
      document.getElementById('sabotageModal').style.display = 'flex';
      db.ref(`teams/${teamKey}/sabotageNotice`).remove();
    }

    document.getElementById('teamLockoutModal').style.display = currentTeamState.lockout ? 'flex' : 'none';

    renderSectors();
    initMastermind();
    updateTeamStats();
  });
}

function setupFirebaseGlobalListeners() {
  if (!isFirebaseReady) return;

  const statusEl = document.getElementById('dbStatusIndicator');
  if (statusEl) statusEl.innerText = "● LIVE SERVER DATABASE CONNECTED";

  // Luister naar startsein van de missie
  db.ref('gameState/missionStarted').on('value', snapshot => {
    if (isAdminAuthenticated) return;
    const isStarted = snapshot.val() === true;
    const lockedNotice = document.getElementById('introLockedNotice');
    const unlockedSection = document.getElementById('introUnlockedSection');

    if (isStarted) {
      if (lockedNotice) lockedNotice.style.display = 'none';
      if (unlockedSection) unlockedSection.style.display = 'block';
    } else {
      if (lockedNotice) lockedNotice.style.display = 'block';
      if (unlockedSection) unlockedSection.style.display = 'none';
    }
  });

  // Luister naar audiobroadcast bij de start
  db.ref('gameState/missionAudioUrl').on('value', snapshot => {
    if (isAdminAuthenticated) return;
    const audioUrl = snapshot.val();
    if (audioUrl) {
      activeMissionAudioUrl = audioUrl;
      const replayBox = document.getElementById('missionAudioReplayBox');
      if (replayBox) replayBox.style.display = 'block';

      const player = document.getElementById('globalMissionAudioPlayer');
      player.src = audioUrl;
      player.play().catch(() => {});
    }
  });

  // Luister naar Primaire en Backup Codes
  db.ref('gameState/primarySecretCode').on('value', snapshot => {
    const code = snapshot.val();
    if (code && Array.isArray(code)) primarySecretCode = code;
  });

  db.ref('gameState/backupSecretCode').on('value', snapshot => {
    const code = snapshot.val();
    if (code && Array.isArray(code)) backupSecretCode = code;
  });

  // Luister naar gekraakte code alerts in het leidingpaneel
  db.ref('gameState/crackedAlert').on('value', snapshot => {
    const alertData = snapshot.val();
    const alertBox = document.getElementById('adminCrackAlertBox');
    const alertText = document.getElementById('adminCrackAlertText');

    if (alertData && alertData.teamKey) {
      pendingCrackedTeam = alertData;
      if (alertText) {
        alertText.innerHTML = `<strong>${alertData.teamName}</strong> heeft zojuist om <strong>${alertData.time}</strong> de 6-cijferige sequentie GEKRAAKT (6x Zwart)!<br>Kies hieronder wat er moet gebeuren:`;
      }
      if (alertBox) alertBox.style.display = 'block';
    } else {
      pendingCrackedTeam = null;
      if (alertBox) alertBox.style.display = 'none';
    }
  });

  db.ref('gameState/emergency').on('value', snapshot => {
    if (isAdminAuthenticated) return;
    const data = snapshot.val();
    if (data) {
      document.getElementById('lockdownTitle').dataset.emergencyId = data.id;
      checkEmergencyLockdown(data);
    }
  });

  // Winnaars listener
  db.ref('gameState/winner').on('value', snapshot => {
    if (isAdminAuthenticated) return;
    const winner = snapshot.val();
    if (winner && winner.teamName) {
      document.getElementById('transmittingModal').style.display = 'none';

      const isWinner = (authenticatedTeam === winner.teamKey);
      const titleEl = document.getElementById('victoryMainTitle');
      const msgEl = document.getElementById('victoryMainMessage');
      const badgeEl = document.getElementById('victoryHeaderBadge');
      const iconEl = document.getElementById('victoryIcon');

      if (isWinner) {
        badgeEl.innerText = "🏆 MASTER CORE GEKRAAKT // OVERWINNING";
        iconEl.innerText = "🏆";
        titleEl.innerText = "GEFELICITEERD! JULLIE HEBBEN GEWONNEN!";
        msgEl.innerHTML = `Jullie hebben als eerste de 6 protocollen geïnjecteerd en de AI uitgeschakeld!<br><br><strong style="color:var(--emerald); font-size: 1.3rem;">RENNEN: Keer NU zo snel mogelijk terug naar Ter Duinen om de fysieke kist te openen en de barbecue te redden!</strong>`;
      } else {
        badgeEl.innerText = "⚠️ SYSTEEM MELTDOWN // MISSIE VOLTOOID";
        iconEl.innerText = "🏃💨";
        titleEl.innerText = "IEDEREEN TERUG NAAR TER DUINEN!";
        msgEl.innerHTML = `De corrupte AI is zojuist uitgeschakeld door <strong style="color:var(--primary); font-size:1.2rem;">${winner.teamName}</strong>!<br><br>De missie is afgelopen. <strong>Keer allemaal rustig en ordelijk terug naar Ter Duinen!</strong>`;
      }

      document.getElementById('victoryCodeDisplay').innerText = (winner.secret || []).map(c => COLOR_MAP[c] || c).join(' ');
      document.getElementById('victoryModal').style.display = 'flex';
      playVictoryFanfare();
    }
  });

  db.ref('gameState/totalSeconds').on('value', snapshot => {
    const val = snapshot.val();
    if (val !== null) totalSeconds = val;
  });

  db.ref('gameState/timerRunning').on('value', snapshot => {
    const val = snapshot.val();
    if (val !== null) timerRunning = val;
  });
}

// INITIALISATIE
window.onload = function() {
  setInterval(tickTimer, 1000);
  tickTimer();

  if (isFirebaseReady) {
    setupFirebaseGlobalListeners();
  }

  document.getElementById('screenIntro').style.display = 'flex';
  document.getElementById('screenRoomCode').style.display = 'none';
  document.getElementById('screenSetPassword').style.display = 'none';
  document.getElementById('screenTutorial').style.display = 'none';
};
