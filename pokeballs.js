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

function diveMult() { // If you select this it's assumed you're surfing
  return 3.5;
}

function lureMult() { // If you select this it's assumed you're fishing
  return 4.0;
}

function quickMult() { // If you select this it's assumed it's turn 1
  return 5.0;
}

function timerMult(turnsCompleted) {
  return 1 + Math.min(3, turnsCompleted*0.3);
}

function levelMult() { // If you select this it's assumed you're the same level
  return 4.0;
}

function loveMult() { // If you select this it's assumed you're same species opposite gender
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

function duskMult() { // If you select this it's assumed it's night
  return 2.5;
}

function repeatMult(chainCount) {
  return Math.min(2.5, 1 + chainCount / 10.0);
}

function nestMult(level) {
  return Math.min(Math.max(7-(0.2*(level-1)), 1.0), 4.0);
}

function heavyMult(pokemon) {
  if (pokemon.weight >= 3000)
    return 4.0;
  else if (pokemon.weight >= 2000)
    return 3.0;
  else if (pokemon.weight >= 1000)
    return 2.0;
  return 1.0;
}

function dreamMult(turnsAsleep) {
  return -1.0;
}

function fastMult(pokemon) {
  if (pokemon.speed >= 100)
    return 4.0;
  return 1.0;
}

var POKEBALLS = [];
POKEBALLS[1] = {"name": "Pokeball",         "function": pokeMult,       "parameter":"None",             "default":"",   "min":"",   "max":""};
POKEBALLS[2] = {"name": "Great Ball",       "function": greatMult,      "parameter":"None",             "default":"",   "min":"",   "max":""};
POKEBALLS[3] = {"name": "Ultra Ball",       "function": ultraMult,      "parameter":"None",             "default":"",   "min":"",   "max":""};
POKEBALLS[4] = {"name": "Net Ball",         "function": netMult,        "parameter":"pokemon",          "default":"",   "min":"",   "max":""};
POKEBALLS[5] = {"name": "Timer Ball",       "function": timerMult,      "parameter":"Turns Completed",  "default":"10", "min":"0",  "max":""};
POKEBALLS[7] = {"name": "Quick Ball",       "function": quickMult,      "parameter":"None",             "default":"",   "min":"",   "max":""};
POKEBALLS[6] = {"name": "Dusk Ball",        "function": duskMult,       "parameter":"None",             "default":"",   "min":"",   "max":""};
POKEBALLS[8] = {"name": "Love Ball",        "function": loveMult,       "parameter":"None",             "default":"",   "min":"",   "max":""};

POKEBALLS[9] = {"name": "Cherish Ball",     "function": cherishMult,    "parameter":"None",             "default":"",   "min":"",   "max":""};
POKEBALLS[10] = {"name": "Dive Ball",       "function": diveMult,       "parameter":"None",             "default":"",   "min":"",   "max":""};
POKEBALLS[11] = {"name": "Fast Ball",       "function": fastMult,       "parameter":"pokemon",          "default":"",   "min":"",   "max":""};
POKEBALLS[12] = {"name": "Friend Ball",     "function": friendMult,     "parameter":"pokemon",          "default":"",   "min":"",   "max":""};
POKEBALLS[13] = {"name": "Heal Ball",       "function": healMult,       "parameter":"None",             "default":"",   "min":"",   "max":""};
POKEBALLS[14] = {"name": "Heavy Ball",      "function": heavyMult,      "parameter":"pokemon",          "default":"",   "min":"",   "max":""};
POKEBALLS[15] = {"name": "Level Ball",      "function": levelMult,      "parameter":"None",             "default":"",   "min":"",   "max":""};
POKEBALLS[16] = {"name": "Lure Ball",       "function": lureMult,       "parameter":"None",             "default":"",   "min":"",   "max":""};
POKEBALLS[17] = {"name": "Luxury Ball",     "function": luxuryMult,     "parameter":"None",             "default":"",   "min":"",   "max":""};
POKEBALLS[18] = {"name": "Moon Ball",       "function": moonMult,       "parameter":"pokemon",          "default":"",   "min":"",   "max":""};
POKEBALLS[19] = {"name": "Nest Ball",       "function": nestMult,       "parameter":"Level",            "default":"16", "min":"1",  "max":"100"};
POKEBALLS[20] = {"name": "Premier Ball",    "function": premierMult,    "parameter":"None",             "default":"",   "min":"",   "max":""};
POKEBALLS[21] = {"name": "Repeat Ball",     "function": repeatMult,     "parameter":"Catching Streak",  "default":"15", "min":"0",  "max":""};
POKEBALLS[22] = {"name": "Safari Ball",     "function": safariMult,     "parameter":"None",             "default":"",   "min":"",   "max":""};
//POKEBALLS[23] = {"name": "Dream Ball",      "function": dreamMult,      "parameter":"Sleep Turns Used", "default":"3",  "min":"0",  "max":"3"};

export { POKEBALLS };
