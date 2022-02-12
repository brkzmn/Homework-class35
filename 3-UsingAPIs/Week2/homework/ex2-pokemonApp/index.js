'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
function fetchData(url) {
  return fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((jsonData) => {
    return jsonData.results;
  })
  .catch((error) => {
    console.log(error);
    return error;
  });
}

async function fetchAndPopulatePokemons(pokemonList) {

  const buttonElement = document.createElement("button");
  buttonElement.setAttribute("type", "button");
  buttonElement.textContent = "Get Pokemon!";
  buttonElement.classList.add("pokemon-button");
  buttonElement.id = "pokeButton"
  document.body.appendChild(buttonElement);

  const pokemonBtn = document.getElementById("pokeButton");
  const selectElement = document.createElement("select");
  selectElement.classList.add("pokemon-select");
  document.body.appendChild(selectElement);
  pokemonBtn.addEventListener("click", populatePokemons);
  function populatePokemons() {
      pokemonList.forEach((pokemon) => {
        const pokemonOption = document.createElement("option");
        pokemonOption.textContent = pokemon.name;
        pokemonOption.value = pokemon.name
        selectElement.appendChild(pokemonOption);
      });
  }
  return selectElement
}

async function fetchImage(url, pokemonImg, pokemonName) {
  const pokemonData = await fetch(url);
  const jsonPokemonData = await pokemonData.json();
  pokemonImg.src = `${jsonPokemonData["sprites"]["other"]["dream_world"]["front_default"]}`;
  pokemonImg.alt = `image of ${pokemonName}`;

}

async function main() {
  try {
    let selectedPokemonUrl;
    let pokemonName;
  
    const pokemonsArr = await fetchData("https://pokeapi.co/api/v2/pokemon?limit=151");
    const pokemonSelect = await fetchAndPopulatePokemons(pokemonsArr);
  
    const pokemonImg = document.createElement("img");
    pokemonImg.src = "#";
    pokemonImg.alt = "";
    document.body.appendChild(pokemonImg);
    pokemonSelect.addEventListener("change", (e) => {
      const filteredPokemon = pokemonsArr.filter((pokemon) => {
        return pokemon.name === e.target.value;
      });
      selectedPokemonUrl = filteredPokemon[0].url;
      pokemonName = filteredPokemon[0].name;
      fetchImage(selectedPokemonUrl, pokemonImg, pokemonName);
    })
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('load', main);