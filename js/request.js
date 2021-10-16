import { urls } from "./dataApi.js";

async function getMovies(url, params) {
  const urlParams = url + params;
  const response = await fetch(urlParams);
  const data = await response.json();

  return data;
}

function createCardMovie(movie) {
  const container = document.createElement("div");
  container.classList.add("card");

  const figure = document.createElement("figure");
  figure.classList.add("figure");

  const imageMovie = document.createElement("img");
  imageMovie.src = urls.image + movie.poster_path;
  imageMovie.alt = `Imagem do filmes ${movie.title}`;

  const boxInfo = document.createElement("div");
  boxInfo.classList.add("box-info");

  const nameMovie = document.createElement("p");
  nameMovie.innerHTML = movie.title;

  const vote = document.createElement("span");
  vote.classList.add("vote_average");
  vote.innerHTML = `${movie.vote_average}/10`;

  const star = document.createElement("img");
  star.classList.add("star");
  star.src = "./img/start.svg";
  star.alt = "Imagem de uma estrela amarela";

  const span = document.createElement("span");
  
  figure.appendChild(imageMovie);
  span.appendChild(star);
  span.appendChild(vote);
  boxInfo.appendChild(nameMovie);
  boxInfo.appendChild(span);

  container.appendChild(figure);
  container.appendChild(boxInfo);

  return container;
}

async function request(url, params) {
  const movies = await getMovies(url, params);
  renderCards(movies.results);
}

function renderCards(movies) {
  const container = document.getElementById("container-movies");
  container.innerHTML = "";
  
  movies.forEach(movie => {
    if(movie.poster_path) {
      let card = createCardMovie(movie);
      container.appendChild(card);
    }
  });
}



window.addEventListener("load", request(urls.movies, "&page=1"));

