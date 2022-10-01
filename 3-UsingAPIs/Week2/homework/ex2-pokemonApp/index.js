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

async function fetchData(url) {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  throw new Error(
    `Unable to load resource "${url}", status is ${response.status}`
  );
}

async function fetchAndPopulatePokemons(select, url) {
  while (select.firstChild) {
    select.removeChild(select.lastChild);
  }
  const firstOption = document.createElement('option');
  select.appendChild(firstOption);
  try {
    const pokemons = await fetchData(url);
    pokemons.results.forEach((pokemon) => {
      const option = document.createElement('option');
      option.textContent = pokemon.name;
      option.setAttribute('value', pokemon.url);
      select.appendChild(option);
    });
  } catch (error) {
    firstOption.textContent = `Error loading content: "${error}"`;
  }
}

async function fetchImage(p, url) {
  while (p.firstChild) {
    p.removeChild(p.lastChild);
  }
  try {
    const pokemon = await fetchData(url);
    const pokemonUrl = pokemon.sprites.front_default;
    const img = document.createElement('img');
    img.setAttribute('src', pokemonUrl);
    img.setAttribute('alt', pokemon.name);
    p.appendChild(img);
  } catch (error) {
    p.textContent = `Error loading pokemon ${error}`;
  }
}

function main() {
  const POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

  const p = document.createElement('p');

  const displayError = (error) => {
    p.textContent = error;
    p.style.color = 'red';
  };

  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.textContent = 'Get pokemon!';

  const selector = document.createElement('select');
  selector.addEventListener('change', async (event) => {
    try {
      fetchImage(p, event.target.value);
    } catch (error) {
      displayError(error);
    }
  });
  button.addEventListener('click', async () => {
    try {
      fetchAndPopulatePokemons(selector, POKEMONS_URL);
    } catch (error) {
      displayError(error);
    }
  });

  document.body.appendChild(button);
  document.body.appendChild(selector);
  document.body.appendChild(p);
}

window.addEventListener('load', main);
