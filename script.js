const inputString = document.getElementById("search-input");
const inputBtn = document.getElementById("search-button");
const poke_name = document.getElementById("pokemon-name");
const poke_id = document.getElementById("pokemon-id");
const poke_hp = document.getElementById("hp");
const poke_exp = document.getElementById("xp");
const poke_weight = document.getElementById("weight");
const poke_height = document.getElementById("height");
const poke_img = document.getElementById("sprite");
const poke_attack = document.getElementById("attack");
const poke_defense = document.getElementById("defense");
const poke_special_attack = document.getElementById("special-attack");
const poke_special_defense = document.getElementById("special-defense");
const poke_speed = document.getElementById("speed");
const poke_types = document.getElementById("types");
const poke_abilities = document.getElementById("abilities");
const poke_cries = document.getElementById("cries");
const poke_warning = document.getElementById("warning");
const error_display = document.getElementById("error");
const titles = document.getElementById("titles");


inputBtn.addEventListener('click', function(e){
  clearCurrentSearch();
  if(inputString.value == ''){
    error_display.innerHTML = 'Please enter a Pokémon name or ID!';
  }else{
    getPokemonInfo(inputString.value.toLowerCase());
  }
  
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

const ELEMENT_COLORS = [
  {name: 'NORMAL', color:'#aaaa99',},
  {name: 'FIRE', color: '#ff4422',},
  {name: 'WATER', color: '#3399ff',},
  {name: 'ELECTRIC', color: '#3399ff',},
  {name: 'GRASS', color: '#3399ff',},
  {name: 'ICE', color: '#3399ff',},
  {name: 'FIGHTING', color: '#3399ff',},
  {name: 'POISON', color: '#aa5599',},
  {name: 'GROUND', color: '#ddbb55',},
  {name: 'FLYING', color: '#8899ff',},
  {name: 'PSYCHIC', color: '#ff5599',},
  {name: 'BUG', color: '#aabb22',},
  {name: 'ROCK', color: '#bbaa66',},
  {name: 'GHOST', color: '#6666bb',},
  {name: 'DRAGON', color: '#7766ee',},
  {name: 'DARK', color: '#775544',},
  {name: 'STEEL', color: '#aaaabb',},
  {name: 'FAIRY', color: '#ee99ee',},
]

function elementHighlight(input){
  
  let colorValue = '';

  ELEMENT_COLORS.forEach(element =>{
    if(input == element.name){
      colorValue = element.color;
    }
  })
  return colorValue;
}

function displayPokemonInfo(info){
  const poke_data = info.types;
  const poke_moves = info.abilities;
  poke_types.innerHTML = `TYPE(s) : `

  poke_data.forEach(element => {
      poke_types.innerHTML += `<span style="color:${elementHighlight(element.type.name.toUpperCase())};">${element.type.name.toUpperCase()}</span>`;
  });

  poke_moves.forEach(element => {
    poke_abilities.innerHTML += `<span>${element.ability.name.toUpperCase()} `;
  })

  poke_name.innerHTML = `NAME : <span>${info.name.toUpperCase()}</span>`;
  poke_id.innerHTML = `ID : <span>#${info.id}</span>`;
  poke_img.src = `${info.sprites.front_default}`;
  titles.innerHTML = `<u>BASE</u><span><u>STAT</u></span>`
  poke_hp.innerHTML = `HP : <span>${info.stats[0].base_stat}</span>`;
  poke_exp.innerHTML = `XP : <span>${info.base_experience}`;
  poke_weight.innerHTML = `Weight : <span>${info.weight}</span>`;
  poke_height.innerHTML = `Height : <span>${info.height}</span>`;
  poke_attack.innerHTML = `Attack : <span>${info.stats[1].base_stat}</span>`;
  poke_defense.innerHTML = `Defense : <span>${info.stats[2].base_stat}</span>`;
  poke_special_attack.innerHTML = `Special Attack : <span>${info.stats[3].base_stat}</span>`;
  poke_special_defense.innerHTML = `Special Defense : <span>${info.stats[4].base_stat}</span>`;
  poke_speed.innerHTML = `Speed : <span>${info.stats[5].base_stat}</span>`;
  poke_cries.innerHTML += `<audio controls volume="0.2">
  <source src="${info.cries.latest}" type="audio/ogg">
  Your browser does not support the audio element.
  </audio>`
  poke_warning.innerHTML = `<span></span>volume warning!<span></span>`;
  poke_warning.classList.add('red');
}

const elements = [poke_types, poke_name, poke_hp, poke_id, poke_exp, poke_weight, poke_height, poke_attack, poke_defense, poke_special_attack, poke_special_defense, poke_speed, error, titles, poke_abilities, poke_warning, poke_cries];

function clearCurrentSearch(){
  
  poke_img.src = "Poke.png";
  elements.forEach(el => {
    el.innerHTML = "";
  })

}
