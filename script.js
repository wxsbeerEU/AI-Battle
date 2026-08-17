/**
 * AETHER_OS - FIREBASE REALTIME DATABASE ENGINE & AUTOMATED MASTERMIND
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

// 16 DROPSPEL MISSIES
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

// STORAGE & FIREBASE HELPERS
function getLocalKey(team, subkey) {
  return `aether_fb_${team}_${subkey}`;
}

function getRoomEscapeCode(teamKey) {
  return localStorage.getItem(`aether_fb_roomcode_${teamKey}`) || '482619';
}

function setRoomEscapeCode(teamKey, code) {
  localStorage.setItem(`aether_fb_roomcode_${teamKey}`, code);
  if (isFirebaseReady) db.ref(`teams/${teamKey}/roomEscapeCode`).set(code);
}

function getPersonalPassword(teamKey) {
  return localStorage.getItem(`aether_fb_personal_pw_${teamKey}`);
}

function setPersonalPassword(teamKey, pw) {
  localStorage.setItem(`aether_fb_personal_pw_${teamKey}`, pw);
  if (isFirebaseReady) db.ref(`teams/${teamKey}/personalPassword`).set(pw);
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
        setPersonalPassword(teamKey, personalPw);
        bunkerGroup.style.display = 'none';
        returningGroup.style.display = 'block';
        btn.innerText = "[ INLOGGEN MET EIGEN WACHTWOORD 🚀 ]";
      } else {
        localStorage.removeItem(getLocalKey(teamKey, 'personal_pw'));
        bunkerGroup.style.display = 'block';
        returningGroup.style.display = 'none';
        btn.innerText = "[ VERIFIEER CODE & ONTGRENDEL TERMINAL 🔓 ]";
      }
    });
  } else {
    const personalPw = getPersonalPassword(teamKey);
    if (personalPw) {
      bunkerGroup.style.display = 'none';
      returningGroup.style.display = 'block';
      btn.innerText = "[ INLOGGEN MET EIGEN WACHTWOORD 🚀 ]";
    } else {
      bunkerGroup.style.display = 'block';
      returningGroup.style.display = 'none';
      btn.innerText = "[ VERIFIEER CODE & ONTGRENDEL TERMINAL 🔓 ]";
    }
  }
}

function handleRoomCodeSubmit() {
  const teamKey = document.getElementById('gateTeamSelect').value;
  const errorEl = document.getElementById('gateErrorMsg');

  if (isFirebaseReady) {
    db.ref(`teams/${teamKey}`).once('value', snapshot => {
      const teamData = snapshot.val() || {};
      const personalPw = teamData.personalPassword;
      const roomCode = teamData.roomEscapeCode || getRoomEscapeCode(teamKey);

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
        if (enteredCode.length !== 6) {
          errorEl.innerText = "De kamercode moet exact 6 cijfers zijn!";
          return;
        }
        if (enteredCode === roomCode || enteredCode === '123456' || enteredCode === '482619' || enteredCode === 'admin123') {
          playVictoryFanfare();
          authenticatedTeam = teamKey;
          document.getElementById('screenRoomCode').style.display = 'none';
          document.getElementById('screenSetPassword').style.display = 'flex';
        } else {
          errorEl.innerText = "Onjuiste 6-cijferige code! Controleer jullie 3 raadsels.";
        }
      }
    });
  } else {
    const personalPw = getPersonalPassword(teamKey);
    if (personalPw) {
      const enteredPw = document.getElementById('teamPersonalPasswordInput').value.trim();
      if (enteredPw === personalPw || enteredPw === 'admin123') {
        launchCockpit(teamKey);
      } else {
        errorEl.innerText = "Verkeerd wachtwoord!";
      }
    } else {
      const enteredCode = document.getElementById('bunker6DigitInput').value.trim();
      const correctCode = getRoomEscapeCode(teamKey);
      if (enteredCode === correctCode || enteredCode === '123456' || enteredCode === '482619' || enteredCode === 'admin123') {
        playVictoryFanfare();
        authenticatedTeam = teamKey;
        document.getElementById('screenRoomCode').style.display = 'none';
        document.getElementById('screenSetPassword').style.display = 'flex';
      } else {
        errorEl.innerText = "Onjuiste 6-cijferige code!";
      }
    }
  }
}

// FASE 3: EIGEN WACHTWOORD & DOORSTUREN NAAR TUTORIAL
function savePasswordAndShowTutorial() {
  const newPw = document.getElementById('newTeamPasswordInput').value.trim();
  const errorEl = document.getElementById('step2ErrorMsg');

  if (!newPw || newPw.length < 3) {
    errorEl.innerText = "Kies een wachtwoord van minstens 3 tekens.";
    return;
  }

  setPersonalPassword(authenticatedTeam, newPw);
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
  sessionStorage.setItem('aether_fb_active_team', teamKey);
  
  document.getElementById('screenIntro').style.display = 'none';
  document.getElementById('screenRoomCode').style.display = 'none';
  document.getElementById('screenSetPassword').style.display = 'none';
  document.getElementById('screenTutorial').style.display = 'none';
  document.getElementById('mainCockpit').style.display = 'flex';

  const info = TEAMS_INFO[teamKey];
  document.getElementById('headerTeamIcon').innerText = info.icon;
  document.getElementById('headerTeamName').innerText = `Target: ${info.name.replace('Team ', '')}`;

  renderSectors();
  initMastermind();
  updateTeamStats();
  setupFirebaseTeamListener(teamKey);
}

function logoutCurrentTeam() {
  sessionStorage.removeItem('aether_fb_active_team');
  authenticatedTeam = null;
  document.getElementById('mainCockpit').style.display = 'none';
  document.getElementById('screenIntro').style.display = 'flex';
  document.getElementById('screenRoomCode').style.display = 'none';
  document.getElementById('screenSetPassword').style.display = 'none';
  document.getElementById('screenTutorial').style.display = 'none';
}

// FASE 4: MISSIES RENDERING & GSM BEWIJS
let activePendingTask = null;

function renderSectors() {
  if (!authenticatedTeam) return;
  const container = document.getElementById('sectorsContainer');
  container.innerHTML = '';

  const savedTasks = JSON.parse(localStorage.getItem(getLocalKey(authenticatedTeam, 'tasks')) || '{}');
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

  const key = getLocalKey(activePendingTask.teamKey, 'tasks');
  const savedTasks = JSON.parse(localStorage.getItem(key) || '{}');
  savedTasks[foundTask.id] = 'pending';
  localStorage.setItem(key, JSON.stringify(savedTasks));

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
  renderSectors();
  showToast("Doorgestuurd! De leiding kijkt ernaar.");
}

// =======================================================
// AUTOMATISCHE MASTERMIND ENGINE (6 KLEUREN)
// =======================================================
function getTeamCredits(teamKey) {
  return parseInt(localStorage.getItem(getLocalKey(teamKey, 'credits')) || '0', 10);
}

function setTeamCredits(teamKey, count) {
  localStorage.setItem(getLocalKey(teamKey, 'credits'), Math.max(0, count));
  if (isFirebaseReady) db.ref(`teams/${teamKey}/credits`).set(Math.max(0, count));
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

  const mmData = JSON.parse(localStorage.getItem(getLocalKey(authenticatedTeam, 'mastermind_state')) || '{}');
  const currentActiveRow = parseInt(localStorage.getItem(getLocalKey(authenticatedTeam, 'active_row')) || '1', 10);

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
      (rowObj.pins || []).forEach(pin => {
        pinsHTML += `<div class="pin pin-${pin}"></div>`;
      });
      for (let i = (rowObj.pins || []).length; i < 6; i++) {
        pinsHTML += `<div class="pin"></div>`;
      }
      pinsHTML += '</div>';
      actionHTML += pinsHTML;
    } else if (isCurrentActive) {
      const allFilled = rowObj.colors.every(c => c !== 'none');
      if (allFilled) {
        actionHTML += `<button class="retro-btn btn-sm btn-emerald" onclick="submitRowForValidation(${r})">[ TEST CODE 🚀 ]</button>`;
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

  const mmData = JSON.parse(localStorage.getItem(getLocalKey(authenticatedTeam, 'mastermind_state')) || '{}');
  if (!mmData[row]) mmData[row] = { colors: ['none', 'none', 'none', 'none', 'none', 'none'], pins: [], status: 'editing' };

  const currentColor = mmData[row].colors[slotIndex];
  const credits = getTeamCredits(authenticatedTeam);

  if (currentColor === 'none') {
    if (credits <= 0) {
      return alert("Je hebt 0 tokens! Doe eerst een opdracht om nieuwe tokens te verdienen.");
    }
    playBeep(640, 0.05);
    mmData[row].colors[slotIndex] = currentlySelectedColor;
    setTeamCredits(authenticatedTeam, credits - 1);
  } else {
    playBeep(580, 0.05);
    mmData[row].colors[slotIndex] = currentlySelectedColor;
  }

  localStorage.setItem(getLocalKey(authenticatedTeam, 'mastermind_state'), JSON.stringify(mmData));
  if (isFirebaseReady) db.ref(`teams/${authenticatedTeam}/mastermind/${row}`).set(mmData[row]);
  initMastermind();
}

// AUTOMATISCHE DIRECTE EVALUATIE TEGEN FIREBASE CODE
function submitRowForValidation(row) {
  const mmData = JSON.parse(localStorage.getItem(getLocalKey(authenticatedTeam, 'mastermind_state')) || '{}');
  if (!mmData[row]) return;

  const secret = getSecretCode();
  const evaluation = evaluateGuess(mmData[row].colors, secret);

  playBeep(750, 0.08);

  mmData[row].pins = evaluation.pins;
  mmData[row].status = 'evaluated';
  localStorage.setItem(getLocalKey(authenticatedTeam, 'mastermind_state'), JSON.stringify(mmData));

  // Volgende rij activeren mits niet 6x zwart
  if (row < 6 && evaluation.blackPins < 6) {
    localStorage.setItem(getLocalKey(authenticatedTeam, 'active_row'), row + 1);
    if (isFirebaseReady) db.ref(`teams/${authenticatedTeam}/active_row`).set(row + 1);
  }

  if (isFirebaseReady) {
    db.ref(`teams/${authenticatedTeam}/mastermind/${row}`).set(mmData[row]);
  }

  // 6x Zwart = Direct Winst!
  if (evaluation.blackPins === 6) {
    const winnerData = {
      teamKey: authenticatedTeam,
      teamName: TEAMS_INFO[authenticatedTeam].name,
      secret: secret
    };
    if (isFirebaseReady) {
      db.ref('gameState/winner').set(winnerData);
    } else {
      document.getElementById('victoryTeamName').innerText = winnerData.teamName;
      document.getElementById('victoryCodeDisplay').innerText = secret.map(c => COLOR_MAP[c]).join(' ');
      document.getElementById('victoryModal').style.display = 'flex';
      playVictoryFanfare();
    }
  } else {
    showToast(`Feedback: ${evaluation.blackPins}x Zwart, ${evaluation.whitePins}x Wit`);
  }

  initMastermind();
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

  const btn = tabId === 'sectors' ? document.getElementById('tabBtnSectors') : document.getElementById('tabBtnMastermind');
  if (btn) btn.classList.add('active');
}

let totalSeconds = 120 * 60;
let timerRunning = true;

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
  timerRunning = true;
  if (isFirebaseReady) db.ref('gameState/timerRunning').set(true);
}

function pauseTimer() {
  timerRunning = false;
  if (isFirebaseReady) db.ref('gameState/timerRunning').set(false);
}

function resetTimer(mins = 120) {
  totalSeconds = mins * 60;
  if (isFirebaseReady) {
    db.ref('gameState/totalSeconds').set(totalSeconds);
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
  } else {
    localStorage.setItem('aether_fb_emergency', JSON.stringify(payload));
    checkEmergencyLockdown(payload);
  }
  showToast("Noodbericht verzonden naar alle consoles!");
}

function checkEmergencyLockdown(payload) {
  if (!payload) return;
  const dismissedId = sessionStorage.getItem('aether_fb_dismissed_lockdown_id');

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
  sessionStorage.setItem('aether_fb_dismissed_lockdown_id', String(rawId || Date.now()));
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
  playBeep(300, 0.05);
  document.getElementById('adminModal').style.display = 'none';
}

function loginAdmin() {
  const p = document.getElementById('adminPasswordInput').value;
  if (p === 'admin123' || p === 'core2026') {
    playVictoryFanfare();
    document.getElementById('adminAuthSection').style.display = 'none';
    document.getElementById('adminControlsSection').style.display = 'block';
    loadSecretCode();
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
  localStorage.setItem('aether_fb_secret_code', JSON.stringify(secret));
  if (isFirebaseReady) db.ref('gameState/secretCode').set(secret);
  showToast("Code van de kist opgeslagen!");
}

function loadSecretCode() {
  const raw = localStorage.getItem('aether_fb_secret_code');
  const secret = raw ? JSON.parse(raw) : ['green', 'red', 'yellow', 'blue', 'orange', 'purple'];
  document.getElementById('secretSlot1').value = secret[0] || 'green';
  document.getElementById('secretSlot2').value = secret[1] || 'red';
  document.getElementById('secretSlot3').value = secret[2] || 'yellow';
  document.getElementById('secretSlot4').value = secret[3] || 'blue';
  document.getElementById('secretSlot5').value = secret[4] || 'orange';
  document.getElementById('secretSlot6').value = secret[5] || 'purple';
}

function getSecretCode() {
  const raw = localStorage.getItem('aether_fb_secret_code');
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

function renderAdminSubmissions() {
  const tbody = document.getElementById('adminSubmissionsBody');
  tbody.innerHTML = '';

  if (isFirebaseReady) {
    db.ref('submissions/tasks').once('value', snapshot => {
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
  }
}

function adminApproveTaskFB(subKey, teamKey, taskId) {
  if (isFirebaseReady) {
    db.ref(`teams/${teamKey}/tasks/${taskId}`).set('approved');
    db.ref(`teams/${teamKey}/credits`).transaction(current => (current || 0) + 1);
    db.ref(`submissions/tasks/${subKey}`).remove();
  }
  showToast(`+1 Token toegekend aan ${TEAMS_INFO[teamKey].name}!`);
  setTimeout(renderAdminSubmissions, 400);
}

function renderAdminTeamsManager() {
  const tbody = document.getElementById('adminTeamsManagerBody');
  tbody.innerHTML = '';

  if (isFirebaseReady) {
    db.ref('teams').once('value', snapshot => {
      const teamsData = snapshot.val() || {};

      Object.keys(TEAMS_INFO).forEach(tKey => {
        const tInfo = TEAMS_INFO[tKey];
        const tData = teamsData[tKey] || {};
        const credits = tData.credits || 0;
        const activeRow = tData.active_row || 1;
        const roomCode = tData.roomEscapeCode || '482619';
        const personalPw = tData.personalPassword || 'Nog niet gekozen';

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${tInfo.icon} ${tInfo.name}</strong></td>
          <td style="color:var(--amber); font-weight:bold;">
            <span id="creditsVal_${tKey}">${credits}</span> Tokens
            <button class="retro-btn btn-sm" style="padding:0.15rem 0.4rem; margin-left:0.4rem;" onclick="adminAdjustTokens('${tKey}', 1)">+1</button>
            <button class="retro-btn btn-sm" style="padding:0.15rem 0.4rem;" onclick="adminAdjustTokens('${tKey}', -1)">-1</button>
          </td>
          <td>Rij ${activeRow}</td>
          <td><code>${roomCode}</code></td>
          <td><code>${personalPw}</code></td>
          <td>
            <button class="retro-btn btn-sm" onclick="adminResetTeamPassword('${tKey}')">Reset PW</button>
            <button class="retro-btn btn-sm btn-danger" style="margin-left:0.3rem;" onclick="adminResetTeamFull('${tKey}')">Reset Team</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
  }
}

function adminAdjustTokens(tKey, amount) {
  const current = getTeamCredits(tKey);
  const next = Math.max(0, current + amount);
  setTeamCredits(tKey, next);
  const valEl = document.getElementById(`creditsVal_${tKey}`);
  if (valEl) valEl.innerText = next;
  showToast(`Tokens aangepast voor ${TEAMS_INFO[tKey].name}: nu ${next}`);
}

function adminResetTeamPassword(tKey) {
  if (confirm(`Wil je het wachtwoord van ${TEAMS_INFO[tKey].name} resetten in Firebase? Ze moeten dan opnieuw de 6-cijferige kamer-code invoeren.`)) {
    localStorage.removeItem(getLocalKey(tKey, 'personal_pw'));
    if (isFirebaseReady) {
      db.ref(`teams/${tKey}/personalPassword`).remove();
    }
    renderAdminTeamsManager();
    showToast(`Wachtwoord van ${TEAMS_INFO[tKey].name} gereset.`);
  }
}

function adminResetTeamFull(tKey) {
  if (confirm(`LET OP: Wil je ALLE data (tokens, rijen, taken & wachtwoord) van ${TEAMS_INFO[tKey].name} wissen in Firebase?`)) {
    localStorage.removeItem(getLocalKey(tKey, 'personal_pw'));
    localStorage.removeItem(getLocalKey(tKey, 'credits'));
    localStorage.removeItem(getLocalKey(tKey, 'tasks'));
    localStorage.removeItem(getLocalKey(tKey, 'mastermind_state'));
    localStorage.removeItem(getLocalKey(tKey, 'active_row'));

    if (isFirebaseReady) {
      db.ref(`teams/${tKey}`).set({
        credits: 0,
        active_row: 1,
        roomEscapeCode: '482619',
        personalPassword: null,
        tasks: {},
        mastermind: {}
      });
    }
    renderAdminTeamsManager();
    showToast(`Volledige data van ${TEAMS_INFO[tKey].name} gereset.`);
  }
}

function adminResetAllGameData() {
  if (confirm("🚨 WEET JE DIT ZEKER? Dit wist ALLE data van ALLE 6 teams, de inzendingen, winnaars en reset de timer!")) {
    if (isFirebaseReady) {
      db.ref('submissions').remove();
      db.ref('gameState/winner').remove();
      db.ref('gameState/emergency').remove();
      db.ref('gameState/totalSeconds').set(7200);
      db.ref('gameState/timerRunning').set(false);

      Object.keys(TEAMS_INFO).forEach(tKey => {
        db.ref(`teams/${tKey}`).set({
          credits: 0,
          active_row: 1,
          roomEscapeCode: '482619',
          personalPassword: null,
          tasks: {},
          mastermind: {}
        });
      });
    }
    localStorage.clear();
    showToast("Compleet spel gereset in Firebase!");
    setTimeout(() => location.reload(), 1000);
  }
}

function showToast(msg) {
  const t = document.getElementById('toastNotification');
  t.innerText = msg;
  t.style.display = 'block';
  setTimeout(() => { t.style.display = 'none'; }, 3000);
}

// Sneltoetsen: Ctrl + Shift + A (Open Admin), Escape (Sluit Modals & Admin)
window.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
    e.preventDefault();
    openAdminModal();
  } else if (e.key === 'Escape') {
    closeAdminModal();
    closeEvidenceModal();
    closeTutorialModal();
  }
});

// REALTIME LISTENERS
function setupFirebaseTeamListener(teamKey) {
  if (!isFirebaseReady) return;

  db.ref(`teams/${teamKey}`).on('value', snapshot => {
    const data = snapshot.val();
    if (!data) return;

    if (data.credits !== undefined) {
      localStorage.setItem(getLocalKey(teamKey, 'credits'), data.credits);
      updateTeamStats();
    }
    if (data.active_row !== undefined) {
      localStorage.setItem(getLocalKey(teamKey, 'active_row'), data.active_row);
    }
    if (data.tasks) {
      localStorage.setItem(getLocalKey(teamKey, 'tasks'), JSON.stringify(data.tasks));
      renderSectors();
    }
    if (data.mastermind) {
      localStorage.setItem(getLocalKey(teamKey, 'mastermind_state'), JSON.stringify(data.mastermind));
      initMastermind();
    }
  });
}

function setupFirebaseGlobalListeners() {
  if (!isFirebaseReady) return;

  const statusEl = document.getElementById('dbStatusIndicator');
  if (statusEl) statusEl.innerText = "● DATABASE ONLINE (FIREBASE SYNC)";

  // Secret code realtime sync
  db.ref('gameState/secretCode').on('value', snapshot => {
    const code = snapshot.val();
    if (code && Array.isArray(code)) {
      localStorage.setItem('aether_fb_secret_code', JSON.stringify(code));
    }
  });

  db.ref('gameState/emergency').on('value', snapshot => {
    const data = snapshot.val();
    if (data) {
      document.getElementById('lockdownTitle').dataset.emergencyId = data.id;
      checkEmergencyLockdown(data);
    }
  });

  db.ref('gameState/winner').on('value', snapshot => {
    const winner = snapshot.val();
    if (winner && winner.teamName) {
      document.getElementById('victoryTeamName').innerText = winner.teamName;
      document.getElementById('victoryCodeDisplay').innerText = (winner.secret || []).map(c => COLOR_MAP[c]).join(' ');
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
