const inputString = document.getElementById("search-input");
const inputBtn = document.getElementById("search-button");
const poke_name = document.getElementById("pokemon-name");
const poke_id = document.getElementById("pokemon-id");
const poke_hp = document.getElementById("hp");
const poke_weight = document.getElementById("weight");
const poke_height = document.getElementById("height");
const poke_img = document.getElementById("sprite");
const poke_attack = document.getElementById("attack");
const poke_defense = document.getElementById("defense");
const poke_special_attack = document.getElementById("special-attack");
const poke_special_defense = document.getElementById("special-defense");
const poke_speed = document.getElementById("speed");
const poke_types = document.getElementById("types");
const error_display = document.getElementById("error");
const titles = document.getElementById("titles");


inputBtn.addEventListener('click', function(e){
  clearCurrentSearch();
  getPokemonInfo(inputString.value.toLowerCase())
});


function getPokemonInfo(request) {
  
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${request}`;
  
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayPokemonInfo(data);
      })
    .catch(error => {
      error_display.innerHTML = "Pokémon not found!";
  });

}

function displayPokemonInfo(info){
  
  const poke_data = info.types;
  
  poke_types.innerHTML = `TYPE(s) : `

  poke_data.forEach(element => {
      poke_types.innerHTML += `<span>${element.type.name.toUpperCase()}</span>`;
  });

  poke_name.innerHTML = `NAME : <span>${info.name.toUpperCase()}</span>`;
  poke_id.innerHTML = `ID : <span>#${info.id}</span>`;
  poke_img.src = `${info.sprites.front_default}`;
  titles.innerHTML = `BASE<span>STAT</span>`
  poke_hp.innerHTML = `HP : <span>${info.order}</span>`;
  poke_weight.innerHTML = `Weight : <span>${info.weight}</span>`;
  poke_height.innerHTML = `Height : <span>${info.height}</span>`;
  poke_attack.innerHTML = `Attack : <span>${info.stats[1].base_stat}</span>`;
  poke_defense.innerHTML = `Defense : <span>${info.stats[2].base_stat}</span>`;
  poke_special_attack.innerHTML = `Special Attack : <span>${info.stats[3].base_stat}</span>`;
  poke_special_defense.innerHTML = `Special Defense : <span>${info.stats[4].base_stat}</span>`;
  poke_speed.innerHTML = `Speed : <span>${info.stats[5].base_stat}</span>`;

}

const elements = [poke_types, poke_name, poke_hp, poke_weight, poke_height, poke_attack, poke_defense, poke_special_attack, poke_special_defense, poke_speed, error, titles];

function clearCurrentSearch(){
  
  poke_img.src = "Poke.png";
  elements.forEach(el => {
    el.innerHTML = "";
  })

}
