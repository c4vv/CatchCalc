function updateCatchChance(){
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
document.addEventListener("DOMContentLoaded", function(event) {
  resetInvalid();
  updateCatchChance();
  document.querySelector('.btn')
  .addEventListener('click', () => {
      updateCatchChance();
  });
  console.log("test");
});
