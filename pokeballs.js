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

function quickMult(turn) { // If you select this I assume it's turn 1
  return 5;
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
