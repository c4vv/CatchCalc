import { POKEMON } from './pokemon.js';
import { POKEBALLS } from './pokeballs.js';

var activePokemon = POKEMON[132][0];
var activePokeball = POKEBALLS[1];

function updateCatchChance() {
  // hp, ball-rate, pokemon-rate, status-rate
  resetInvalid();
  console.log("update catch chance");
  let invalid = false;
  let hp = document.getElementById('hp');
  let ballRate = document.getElementById('ball-rate');
  let pokemonRate = document.getElementById('pokemon-rate');
  let statusRate = document.getElementById('status-rate');

  if(!(isNumeric(hp.value))){
    hp.classList.add('is-invalid');
    invalid = true;
  }
  if(!(isNumeric(ballRate.value))){
    ballRate.classList.add('is-invalid');
    invalid = true;
  }
  if(!(isNumeric(pokemonRate.value))){
    pokemonRate.classList.add('is-invalid');
    invalid = true;
  }
  if(!(isNumeric(statusRate.value))){
    statusRate.classList.add('is-invalid');
    invalid = true;
    }
  if(invalid){
    return
  }
  let hpValue = Number(hp.value);
  let ballRateValue = Number(ballRate.value);
  let pokemonRateValue = Number(pokemonRate.value);
  let statusRateValue = Number(statusRate.value);

  // with rounding to get to dragonfly cave's numbers
  // let x = Math.max(1, Math.floor(Math.floor((3 * 100 - 2 * hpValue) * Math.floor(pokemonRateValue * ballRateValue) / (3 * 100)) * statusRateValue));
  // let y = Math.floor(1048560 / Math.floor(Math.sqrt(Math.floor(Math.sqrt(16711680 / x)))));

  let x = Math.max(1, (3 * 100 - 2 * hpValue) * (pokemonRateValue * ballRateValue) / (3 * 100) * statusRateValue);
  let y = 1048560 / Math.sqrt(Math.sqrt(16711680 / x));
  let chance = y / 65536;
  let percent = Math.pow(chance, 4);
  percent = Math.min(percent, 1); // Cap it at 100%
  console.log(x,y,chance,percent,activePokemon.weight);

  document.getElementById("catch-chance").innerHTML =  (Math.round(percent * 10000) / 100)+"%";

}


function isNumeric(str) {
  console.log(str);
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function sanitize(string) {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match]));
}

function resetInvalid(){
  Array.from(document.querySelectorAll('.is-invalid')).forEach(
  (el) => el.classList.remove('is-invalid')
  );
}

function updateBallRate() {
    const pokeballCatchRate = document.getElementById('ball-rate');
    if (activePokeball.parameter == "pokemon") {
        pokeballCatchRate.value = activePokeball.function(activePokemon);
    } else if (activePokeball.parameter == "None") {
        pokeballCatchRate.value = activePokeball.function();
    } else { // Parameterized pokeball
        const existingInput = document.getElementById('deleteLaterInput');
        pokeballCatchRate.value = activePokeball.function(parseInt(existingInput.value));
    }
    updateCatchChance();
}

function populatePokemonDropdown(filter = '') {
    const pokemonList = document.getElementById('pokemonList');
    const selectedPokemonInput = document.getElementById('selectedPokemon');
    const pokemonCatchRate = document.getElementById('pokemon-rate');
    
    // Filter the contents of pokeball list from search input
    pokemonList.innerHTML = '';
    const filteredPokemon = POKEMON.filter(pokemon => pokemon[0].name.toLowerCase().includes(filter.toLowerCase()));
    filteredPokemon.forEach(pokemon => {
        const li = document.createElement('li');
        li.textContent = pokemon[0].name;
        li.className = 'dropdown-item-text';
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => {
            activePokemon = pokemon[0];
            selectedPokemonInput.value = pokemon[0].name;
            pokemonCatchRate.value = pokemon[0].catch_rate;
            // If the active Pokeball relies on the active Pokemon's stats, then update the ball value.
            if (activePokeball.parameter == "pokemon")
                updateBallRate();
        });
        pokemonList.appendChild(li);
    });
}

function modifyPokeballParameterInput(pokeball) {
    const existingPrepend = document.getElementById('deleteLaterPrepend');
    const existingInput = document.getElementById('deleteLaterInput');
    if (existingPrepend) {
        existingPrepend.remove();
        existingInput.remove();
    }
    
    // Dynamically create an input box if needed for the selected Pokeball
    const pokeballParameterInput = document.getElementById('parameterInput');
    if (pokeball.parameter != "None" && pokeball.parameter != "pokemon") {
        const parameterSpan = document.createElement('span');
        parameterSpan.className = 'input-group-text';
        parameterSpan.innerHTML = pokeball.parameter;
        const parameterDiv = document.createElement('div');
        parameterDiv.className = 'input-group-prepend';
        parameterDiv.id = 'deleteLaterPrepend';
        parameterDiv.appendChild(parameterSpan);
        
        const parameterInputBox = document.createElement('input');
        parameterInputBox.className = 'form-control mb-3';
        parameterInputBox.id = 'deleteLaterInput';
        parameterInputBox.type = 'number';
        if (pokeball.min)
            parameterInputBox.min = pokeball.min;
        if (pokeball.max)
            parameterInputBox.max = pokeball.max;
        parameterInputBox.value = pokeball.default;
        parameterInputBox.addEventListener('input', () => {updateBallRate();});

        pokeballParameterInput.appendChild(parameterDiv);
        pokeballParameterInput.appendChild(parameterInputBox);
    }
}

function populatePokeballDropdown(filter = '') {
    const pokeballList = document.getElementById('pokeballList');
    const selectedPokeballInput = document.getElementById('selectedPokeball');

    // Filter the contents of pokeball list from search input
    pokeballList.innerHTML = '';
    const filteredPokeballs = POKEBALLS.filter(pokeball => pokeball.name.toLowerCase().includes(filter.toLowerCase()));
    filteredPokeballs.forEach(pokeball => {
        const li = document.createElement('li');
        li.textContent = pokeball.name;
        li.className = 'dropdown-item-text';
        li.style.cursor = 'pointer';
        // Give each list option custom functionality defined by pokeballs.js
        li.addEventListener('click', () => {
            selectedPokeballInput.value = pokeball.name;
            activePokeball = pokeball;
            modifyPokeballParameterInput(pokeball);
            updateBallRate();
        });
        pokeballList.appendChild(li);

        // Add a separator between commonly used pokeballs and alphabetically sorted pokeballs
        if (pokeball.name == "Love Ball"){
            const separator = document.createElement('div');
            separator.className = 'dropdown-divider';
            pokeballList.appendChild(separator);
        }
    });
}

function initializeStatusDropdown() {
    const statusListParent = document.getElementById('statusList');
    const statusList = statusListParent.querySelectorAll("li");
    const selectedStatusInput = document.getElementById('selectedStatus');
    const statusRate = document.getElementById('status-rate');

    statusList.forEach(statusItem => {
        statusItem.style.cursor = 'pointer';
        var multiplier = parseFloat(statusItem.innerHTML.match(/\d\.\d/));
        statusItem.addEventListener('click', () => {
            selectedStatusInput.value = statusItem.innerHTML;
            statusRate.value = multiplier;
            updateCatchChance();
        });
    });
}

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM Content Loaded");
    resetInvalid();
    updateCatchChance();

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            updateCatchChance();
        });
    });
    
    const searchPokemon = document.getElementById('searchPokemon');
    const searchPokeballs = document.getElementById('searchPokeballs');

    // Initialize Dropdowns
    populatePokemonDropdown();
    populatePokeballDropdown();
    initializeStatusDropdown();

    // Add event listener to filter the list based on input
    searchPokemon.addEventListener('input', () => {
        populatePokemonDropdown(searchPokemon.value);
    });
    searchPokeballs.addEventListener('input', () => {
        populatePokeballDropdown(searchPokeballs.value);
    });
});
