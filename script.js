const inputString = document.getElementById("search-input");
const inputBtn = document.getElementById("search-button");
const inputRandomBtn = document.getElementById("random-button");
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
const poke_flavour = document.getElementById("flavor");
const poke_cries = document.getElementById("cries");
const poke_warning = document.getElementById("warning");
const error_display = document.getElementById("error");
const titles = document.getElementById("titles");
const poke_card = document.getElementById("poke-infos");
const header = document.getElementById("header-container");

inputRandomBtn.addEventListener('click', function(e){
  clearCurrentSearch();
  const input_string = Math.floor(Math.random() * 1025).toString();
  if(input_string == ''){
    error_display.innerHTML = 'Please enter a Pokémon name or ID!';
  }else{
    displayPokemonInfo(input_string);
    
  }
})

inputBtn.addEventListener('click', function(e){
  clearCurrentSearch();
  const input_string = inputString.value;
  if(input_string == ''){
    error_display.innerHTML = 'Please enter a Pokémon name or ID!';
  }else{
    displayPokemonInfo(input_string);
    
  }
  
});

async function fetchData(apiUrl) {
  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      error_display.innerHTML = 'Pokémon not found!';
      return null; 
  }
}

const ELEMENT_COLORS = [
  {name: 'NORMAL', color:'#aaaa99',},
  {name: 'FIRE', color: '#ff4422',},
  {name: 'WATER', color: '#3399ff',},
  {name: 'ELECTRIC', color: '#f0de00',},
  {name: 'GRASS', color: '#77cc55',},
  {name: 'ICE', color: '#66ccff',},
  {name: 'FIGHTING', color: '#bb5544',},
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

// const CLASS_COLORS = [
//   {color: 'RED', background:'#e87070', accent:'red',},
//   {color: 'BLUE', background:'#64c0bb', accent:'blue',},
//   {color: 'YELLOW', background:'#998d00', accent:'#f0de00',},
//   {color: 'GREEN', background:'#309c00', accent:'green',},
//   {color: 'BLACK', background:'#575555', accent:'black',},
//   {color: 'BROWN', background:'#d5b38b', accent:'brown',},
//   {color: 'PURPLE', background:'#d181e0', accent:'purple',},
//   {color: 'GRAY', background:'#90908f', accent:'gray',},
//   {color: 'WHITE', background:'#b9b9b7', accent:'white',},
//   {color: 'PINK', background:'#da6f9d', accent: '#ec008c',},
// ]

const CLASS_COLORS = [
  {color: 'RED', background:'#575555', accent:'red',},
  {color: 'BLUE', background:'#575555', accent:'blue',},
  {color: 'YELLOW', background:'#575555', accent:'#f0de00',},
  {color: 'GREEN', background:'#575555', accent:'green',},
  {color: 'BLACK', background:'#575555', accent:'black',},
  {color: 'BROWN', background:'#575555', accent:'brown',},
  {color: 'PURPLE', background:'#575555', accent:'purple',},
  {color: 'GRAY', background:'#575555', accent:'gray',},
  {color: 'WHITE', background:'#575555', accent:'white',},
  {color: 'PINK', background:'#575555', accent: '#ec008c',},
]




function colorCard(colorName){
  CLASS_COLORS.forEach(el => {
    if(colorName === el.color){
      // poke_card.style = `background-color:${el.background};border-left: 10px solid ${el.accent};`
      poke_card.style = `background-image: linear-gradient(180deg, ${el.background} 80%, ${el.accent});;border-left: 10px solid ${el.accent};`
      // poke_card.style = `border-left: 10px solid ${el.accent};`
    }
  })

}

function elementHighlight(input){
  
  let colorValue = '';

  ELEMENT_COLORS.forEach(element =>{
    if(input == element.name){
      colorValue = element.color;
    }
  })
  return colorValue;
}

async function displayPokemonInfo(input){

  // const apiUrl = input; 
  const info = await fetchData('https://pokeapi.co/api/v2/pokemon/' + input.toLowerCase());
  // console.log(info);
  const pokeSpeciesData = await fetchData('https://pokeapi.co/api/v2/pokemon-species/' + input.toLowerCase()); 
  const poke_data = info.types;
  // console.log(pokeSpeciesData);
  const poke_moves = info.abilities;

  let pokeTypeString = '';
  let pokeFlavorString = '';

  for(let i = 0; i < pokeSpeciesData.genera.length; i++){
    if(pokeSpeciesData.genera[i].language.name == 'en'){
      pokeTypeString = pokeSpeciesData.genera[i].genus;
      break;
    }
  }

  for(let i = 0; i < pokeSpeciesData.flavor_text_entries.length; i++){
    if(pokeSpeciesData.flavor_text_entries[i].language.name == 'en'){
      pokeFlavorString = pokeSpeciesData.flavor_text_entries[i].flavor_text;
      break;
    }
  }
  
  
  header.style = 'margin-top: 50px;';
  

  poke_types.innerHTML = ``

  poke_data.forEach(element => {
      poke_types.innerHTML += `<span style="padding: 2px; border-radius: 3px;color:${elementHighlight(element.type.name.toUpperCase())}; border: 1px solid ${elementHighlight(element.type.name.toUpperCase())}">${element.type.name.toUpperCase()}</span>`;
  });

  poke_moves.forEach(element => {
    poke_abilities.innerHTML += `<span><small>${element.ability.name.toUpperCase()}</small> `;
  })

  poke_name.innerHTML = `NAME : <span>${info.name.toUpperCase()} #${info.id}</span>`;
  poke_id.innerHTML = `TYPE : <span>${pokeTypeString}</span>`;
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
  poke_flavour.innerHTML = `<span></span><small class='wrap'>${pokeFlavorString}</small><span></span>`;
  poke_cries.innerHTML += `<audio controls volume="0.2">
  <source src="${info.cries.latest}" type="audio/ogg">
  Your browser does not support this audio element.
  </audio>`
  poke_warning.innerHTML = `<span></span>volume warning!<span></span>`;
  poke_warning.style = 'text-shadow: 0px 0px 4px black;'

  colorCard(pokeSpeciesData.color.name.toUpperCase())
  poke_card.classList.add('poke-infos-display')
}

const elements = [poke_flavour, poke_types, poke_name, poke_hp, poke_id, poke_exp, poke_weight, poke_height, poke_attack, poke_defense, poke_special_attack, poke_special_defense, poke_speed, error, titles, poke_abilities, poke_warning, poke_cries];

function clearCurrentSearch(){
  header.style = 'margin-top: 200px;';
  poke_card.classList.toggle('poke-infos-display');
  poke_card.style = "";
  poke_img.src = "Poke.png";
  elements.forEach(el => {
    el.innerHTML = "";
  })

}
