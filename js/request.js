import { urls } from "./dataApi.js";
import { loading } from "./loading.js";

async function getMovies(url, params) {
  const urlParams = url + params;
  const response = await fetch(urlParams);
  const data = await response.json();

  renderCards(data.results);
}

function createCardMovie(movie) {
  const container = document.createElement("a");
  container.href = "./movie.html";
  container.classList.add("card");

  container.onclick = () => {
    localStorage.setItem("@DEVFLIX", JSON.stringify(movie.id));
  }

  const figure = document.createElement("figure");
  figure.classList.add("figure");

  const imageMovie = document.createElement("img");
  imageMovie.src = urls.image + "w500" +movie.poster_path;
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

getMovies(urls.movies, "&page=1");

window.addEventListener("load", () => {
  loading();
});


document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.getElementById("search");

  if(search.value) {
    loading();
    getMovies(urls.search, search.value);
    search.value = "";
    search.blur();
  }
})
