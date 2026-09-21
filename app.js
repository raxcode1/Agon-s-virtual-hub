const tips = [
  { title: "Check the person, not the point.", text: "An ad hominem attacks the speaker instead of addressing the claim. Bring the discussion back to evidence." },
  { title: "Restate the real claim.", text: "A straw man weakens an argument by replacing it with an easier version. Ask what was actually said." },
  { title: "Compare like with like.", text: "False equivalence treats two unlike situations as equal. Identify the relevant difference before accepting the comparison." },
  { title: "Ask what is missing.", text: "A hasty generalization uses too little evidence. Test whether the example really supports a broad conclusion." },
  { title: "Separate cause from sequence.", text: "Something happening after another event does not prove it caused the event. Look for the missing link." },
  { title: "Watch the forced choice.", text: "A false dilemma presents only two options when more exist. Name a third possibility or question the framing." },
  { title: "Find the burden of proof.", text: "The person making a claim should support it. Do not let an unsupported assertion become the starting premise." },
  { title: "Notice the emotional shortcut.", text: "Appeals to fear, pity, or outrage can distract from evidence. Acknowledge the feeling, then return to the facts." }
];

const screens = {
  welcome: document.querySelector("#welcome-screen"),
  setup: document.querySelector("#setup-screen"),
  simulation: document.querySelector("#simulation-screen"),
  results: document.querySelector("#results-screen")
};
const consentCheckbox = document.querySelector("#consent-checkbox");
const beginButton = document.querySelector("#begin-button");
const argumentList = document.querySelector("#argument-list");
const countBadge = document.querySelector("#argument-count");
const addArgumentButton = document.querySelector("#add-argument-button");
const startSimulationButton = document.querySelector("#start-simulation-button");
const setupMessage = document.querySelector("#setup-message");
const timer = document.querySelector("#timer");
const timerButton = document.querySelector("#timer-button");
const timerHelp = document.querySelector("#timer-help");
const simulationTitle = document.querySelector("#simulation-title");
const roundLabel = document.querySelector("#round-label");
const progressBar = document.querySelector("#progress-bar");
const tipTitle = document.querySelector("#tip-title");
const tipText = document.querySelector("#tip-text");
const averageTime = document.querySelector("#average-time");
const roundTotal = document.querySelector("#round-total");
const rankName = document.querySelector("#rank-name");
const rankDescription = document.querySelector("#rank-description");

let argumentsList = [];
let roundIndex = 0;
let responseTimes = [];
let timerStartedAt = 0;
let timerInterval = null;
let tipInterval = null;
const tipIntervalMs = 15000;

function showScreen(screen) {
  Object.values(screens).forEach((currentScreen) => { currentScreen.hidden = currentScreen !== screen; });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function formatTime(milliseconds) {
  const seconds = milliseconds / 1000;
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainder = (seconds % 60).toFixed(1).padStart(4, "0");
  return `${minutes}:${remainder}`;
}

function updateSetupState() {
  const inputs = [...argumentList.querySelectorAll("input")];
  const filledCount = inputs.filter((input) => input.value.trim()).length;
  countBadge.textContent = `${filledCount} / 7`;
  startSimulationButton.disabled = filledCount < 2;
  addArgumentButton.disabled = inputs.length >= 7;
}

function addArgument(value = "") {
  const row = document.createElement("div");
  row.className = "argument-row";
  const number = argumentList.children.length + 1;
  row.innerHTML = `<span>${String(number).padStart(2, "0")}</span><input type="text" maxlength="180" placeholder="Write an anticipated argument..." value=""><button class="remove-button" type="button" aria-label="Remove argument">&times;</button>`;
  const input = row.querySelector("input");
  input.value = value;
  input.addEventListener("input", updateSetupState);
  row.querySelector(".remove-button").addEventListener("click", () => { row.remove(); renumberArguments(); });
  argumentList.append(row);
  updateSetupState();
  input.focus();
}

function renumberArguments() {
  [...argumentList.children].forEach((row, index) => { row.querySelector("span").textContent = String(index + 1).padStart(2, "0"); });
  updateSetupState();
}

function showRandomTip() {
  const tip = tips[Math.floor(Math.random() * tips.length)];
  tipTitle.textContent = tip.title;
  tipText.textContent = tip.text;
}

function renderRound() {
  const currentArgument = argumentsList[roundIndex];
  clearInterval(tipInterval);
  simulationTitle.textContent = currentArgument;
  roundLabel.textContent = `Round ${roundIndex + 1} of ${argumentsList.length}`;
  progressBar.style.width = `${(roundIndex / argumentsList.length) * 100}%`;
  showRandomTip();
  tipInterval = setInterval(showRandomTip, tipIntervalMs);
  timer.textContent = "00:00.0";
  timerButton.textContent = "Start timer";
  timerButton.classList.remove("is-running");
  timerHelp.textContent = "Take a breath, structure your answer out loud, then stop the timer.";
}

function stopTimer() {
  if (!timerInterval) return;
  clearInterval(timerInterval);
  timerInterval = null;
  const elapsed = performance.now() - timerStartedAt;
  responseTimes.push(elapsed);
  timer.textContent = formatTime(elapsed);
  timerButton.classList.remove("is-running");
  timerButton.textContent = roundIndex === argumentsList.length - 1 ? "See results" : "Next argument";
  timerHelp.textContent = "Good. Continue when you are ready.";
}

function startTimer() {
  timerStartedAt = performance.now();
  timerInterval = setInterval(() => { timer.textContent = formatTime(performance.now() - timerStartedAt); }, 100);
  timerButton.classList.add("is-running");
  timerButton.textContent = "Stop timer";
  timerHelp.textContent = "Speak your response out loud, then stop when you finish.";
}

function showResults() {
  clearInterval(tipInterval);
  tipInterval = null;
  const average = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
  const seconds = average / 1000;
  const rank = seconds <= 8 ? ["Legendary Lawyer", "Instantaneous response reflexes."] : seconds <= 15 ? ["Senior Lawyer", "Fast response reflexes with a clear structure."] : seconds <= 25 ? ["Junior Lawyer", "You defend your position, with room to sharpen the transition."] : seconds <= 38 ? ["Student Lawyer", "You are building your response structure."] : ["Condemned", "Give yourself more time to identify the main point and begin again."];
  averageTime.textContent = formatTime(average);
  roundTotal.textContent = `Across ${responseTimes.length} rounds`;
  rankName.textContent = rank[0];
  rankDescription.textContent = rank[1];
  progressBar.style.width = "100%";
  showScreen(screens.results);
}

consentCheckbox.addEventListener("change", () => { beginButton.disabled = !consentCheckbox.checked; });
beginButton.addEventListener("click", () => { showScreen(screens.setup); addArgument(); addArgument(); });
addArgumentButton.addEventListener("click", () => addArgument());
document.querySelector("#argument-form").addEventListener("submit", (event) => {
  event.preventDefault();
  argumentsList = [...argumentList.querySelectorAll("input")].map((input) => input.value.trim()).filter(Boolean).sort(() => Math.random() - 0.5);
  if (argumentsList.length < 2) { setupMessage.textContent = "Add at least two arguments to begin."; return; }
  roundIndex = 0;
  responseTimes = [];
  renderRound();
  showScreen(screens.simulation);
});
timerButton.addEventListener("click", () => {
  if (timerInterval) { stopTimer(); return; }
  if (responseTimes.length > roundIndex) { roundIndex += 1; if (roundIndex === argumentsList.length) { showResults(); return; } renderRound(); }
  startTimer();
});
document.querySelector("#quit-button").addEventListener("click", () => { if (timerInterval) clearInterval(timerInterval); if (tipInterval) clearInterval(tipInterval); timerInterval = null; tipInterval = null; argumentsList = []; responseTimes = []; argumentList.innerHTML = ""; showScreen(screens.welcome); });
document.querySelector("#restart-button").addEventListener("click", () => { showScreen(screens.setup); argumentList.innerHTML = ""; addArgument(); addArgument(); });
document.querySelector("#home-button").addEventListener("click", () => { argumentList.innerHTML = ""; showScreen(screens.welcome); });