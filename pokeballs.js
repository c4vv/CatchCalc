function pokeMult() {
  return 1.0;
}

function luxuryMult() { // why
  return 1.0;
}

function healMult() {
  return 1.25;
}

function greatMult() {
  return 1.5;
}

function premierMult() {
  return 1.5;
}

function ultraMult() {
  return 2.0;
}

function cherishMult() {
  return 2.0;
}

function safariMult() {
  return 1.5;
}

function diveMult() { // If you select this I assume you're surfing
  return 3.5;
}

function lureMult() { // If you select this I assume you're fishing
  return 4;
}

function quickMult(turnsCompleted) { // If you select this I assume it's turn 1
  return 5;
}

function timerMult(turnsCompleted) {
  return 1 + Math.min(3, turnsCompleted*0.3);
}

function levelMult() { // If you select this I assume you're the same level
  return 4.0;
}

function loveMult() { // If you select this I assume you're same species opposite gender
  return 8.0;
}

function friendMult(pokemon) {
  if (pokemon.friendEvo)
    return 2.5;
  return 1.0;
}

function moonMult(pokemon) {
  if (pokemon.moonEvo)
    return 4.0;
  return 1.0;
}

function netMult(pokemon) {
  if (pokemon.types.includes("bug") || pokemon.types.includes("water"))
    return 3.5;
  return 1.0;
}

function duskMult(isNight) { // If you select this I assume it's night
  if (isNight)
    return 2.5;
  return 1.0;
}

function repeatMult(chainCount) {
  return Math.min(2.5, 1 + chainCount / 10.0);
}

function nestMult(level) {
  return Math.min(Math.max(7-(0.2*(level-1)), 1.0), 4.0);
}

function heavyMult(pokemon) {
  return -1.0;
}

function dreamMult(turnsAsleep) {
  return -1.0;
}

function fastMult(pokemon) {
  return -1.0;
}

var POKEBALLS = [];
POKEBALLS[1] = {"name": "Pokeball", "function": pokeMult};
POKEBALLS[2] = {"name": "Great Ball", "function": greatMult};
POKEBALLS[3] = {"name": "Ultra Ball", "function": ultraMult};
POKEBALLS[4] = {"name": "Net Ball", "function": netMult};
POKEBALLS[5] = {"name": "Timer Ball", "function": timerMult};
POKEBALLS[6] = {"name": "Dusk Ball", "function": duskMult};
POKEBALLS[7] = {"name": "Quick Ball", "function": quickMult};
POKEBALLS[8] = {"name": "Love Ball", "function": loveMult};

POKEBALLS[9] = {"name": "Cherish Ball", "function": cherishMult};
POKEBALLS[10] = {"name": "Dive Ball", "function": diveMult};
POKEBALLS[11] = {"name": "Dream Ball", "function": dreamMult};
POKEBALLS[12] = {"name": "Fast Ball", "function": fastMult};
POKEBALLS[13] = {"name": "Friend Ball", "function": friendMult};
POKEBALLS[14] = {"name": "Heal Ball", "function": healMult};
POKEBALLS[15] = {"name": "Heavy Ball", "function": heavyMult};
POKEBALLS[16] = {"name": "Level Ball", "function": levelMult};
POKEBALLS[17] = {"name": "Lure Ball", "function": lureMult};
POKEBALLS[18] = {"name": "Luxury Ball", "function": luxuryMult};
POKEBALLS[19] = {"name": "Moon Ball", "function": moonMult};
POKEBALLS[20] = {"name": "Nest Ball", "function": nestMult};
POKEBALLS[21] = {"name": "Premier Ball", "function": premierMult};
POKEBALLS[22] = {"name": "Repeat Ball", "function": repeatMult};
POKEBALLS[23] = {"name": "Safari Ball", "function": safariMult};

export { POKEBALLS };
