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
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('HTTP ERROR');
      }
    })
    .then((jsonData) => {
      return jsonData.results;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function fetchAndPopulatePokemons() {
  const buttonElement = document.createElement('button');
  buttonElement.setAttribute('type', 'button');
  buttonElement.textContent = 'Get Pokemon!';
  buttonElement.classList.add('pokemon-button');
  buttonElement.id = 'poke-button';
  document.body.appendChild(buttonElement);

  const pokemonBtn = document.getElementById('poke-button');
  const selectElement = document.createElement('select');
  selectElement.id = 'pokemon-select';
  selectElement.classList.add('pokemon-select');
  document.body.appendChild(selectElement);
  pokemonBtn.addEventListener('click', () => {
    populatePokemons();
  });
}

async function populatePokemons() {
  try {
    const pokemonsArr = await fetchData(
      'https://pokeapi.co/api/v2/pokemon?limit=151'
    );
    const selectElement = document.getElementById('pokemon-select');
    pokemonsArr.forEach((pokemon, index) => {
      const pokemonOption = document.createElement('option');
      pokemonOption.textContent = pokemon.name;
      pokemonOption.value = index + 1;
      selectElement.appendChild(pokemonOption);
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function fetchImage(url, pokemonImg, pokemonName) {
  try {
    const pokemonData = await fetch(url);
    if (pokemonData.ok) {
      const jsonPokemonData = await pokemonData.json();
      pokemonImg.src = `${jsonPokemonData['sprites']['other']['dream_world']['front_default']}`;
      pokemonImg.alt = `image of ${pokemonName}`;
    } else {
      throw new Error('HTTP ERROR');
    }
  } catch (error) {
    console.log(error.message);
  }
}

function main() {
  try {
    fetchAndPopulatePokemons();
    const pokemonImg = document.createElement('img');
    pokemonImg.src = '#';
    pokemonImg.alt = '';
    document.body.appendChild(pokemonImg);
    const pokemonSelect = document.getElementById('pokemon-select');
    pokemonSelect.addEventListener('change', (e) => {
      const selectedPokemonUrl = `https:/pokeapi.co/api/v2/pokemon/${e.target.value}/`;
      const pokemonName = e.target.options[e.target.selectedIndex].text;
      fetchImage(selectedPokemonUrl, pokemonImg, pokemonName);
    });
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('load', main);
