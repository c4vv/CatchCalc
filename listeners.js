import { POKEMON } from './pokemon.js';

function updateCatchChance() {
  // hp, ball-rate, pokemon-rate, status-rate
  resetInvalid();
  console.log("update");
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
  console.log(x,y,chance,percent);

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

function populatePokemonDropdown(filter = '') {
    const pokemonList = document.getElementById('pokemonList');
    const selectedPokemonInput = document.getElementById('selectedPokemon');
    const pokemonCatchRate = document.getElementById('pokemon-rate');

    pokemonList.innerHTML = '';
    const filteredPokemon = POKEMON.filter(pokemon =>
        pokemon[0].name.toLowerCase().includes(filter.toLowerCase())
    );
    filteredPokemon.forEach(pokemon => {
        const li = document.createElement('li');
        li.textContent = pokemon[0].name;
        li.className = 'dropdown-item-text';
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => {
            selectedPokemonInput.value = pokemon[0].name;
            pokemonCatchRate.value = pokemon[0].catch_rate;
            updateCatchChance();
        });
        pokemonList.appendChild(li);
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

    const searchInput = document.getElementById('searchInput');

    // Initialize Dropdowns
    populatePokemonDropdown();
    initializeStatusDropdown();

    // Add event listener to filter the list based on input
    searchInput.addEventListener('input', () => {
        populatePokemonDropdown(searchInput.value);
    });
});
