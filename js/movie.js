import { urls } from './dataApi.js';
import { loading } from './loading.js';

export async function getMovieId(id) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f6541db294ac187416fae0f1b9effcce&language=pt-BR`);
  const data = await response.json();
  renderInfoOfMovie(data);
}

async function getTrailer(id) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=f6541db294ac187416fae0f1b9effcce&language=pt-BR`);
  const data = await response.json();
}

function getLocalStorage() {
  const id = parseInt(localStorage.getItem("@DEVFLIX"));
  getMovieId(id);
}

function formatDate(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function formatGenres(genres) {
  let textGenres = "";
  for(let i = 0; i < genres.length; i++) {
    if(i == genres.length - 1) {
      textGenres = textGenres + ' e ' + genres[i].name;
      break;
    } else if(i == genres.length - 2){
      textGenres = textGenres + genres[i].name;
    } else {
      textGenres = textGenres + genres[i].name + ', ';
    }
  }

  return textGenres;
}

function formatStar(vote_average) {
  vote_average = vote_average.toString();
  const [movieNote, ] = vote_average.split(".");

  let images = "";

  for(let i = 1; i <= movieNote; i++) {
    let img = `<img class="star-movie" src="./img/start.svg" alt="">`;
    images = images + img;
  }

  const temp = 10 - parseInt(movieNote);
  for(let i = 1; i <= temp; i++) {
    let img = `<img class="star-movie" src="./img/start2.svg" alt="">`;
    images = images + img;
  }

  return images;
}

function  createCard({
  id,
  title,
  genres,
  vote_average,
  release_date,
  overview,
  poster_path
}) {
  let card = `
    <section id="container-movie-info" class="container">
      <div id="image-info-movie">
        <img id="poster" src="${urls.image + "w500" + poster_path}" alt="Poster do filme ${title}">
      </div>
      <div id="box-info-movie">
        <h2 id="name-movie">${title}</h2>
        <p id="release-date">${formatDate(release_date)}</p>
        <p id="genres">${formatGenres(genres)}</p>
        <div id="box-vote-movie">${formatStar(vote_average)}</div>
        <button id="button-watch-movie">Assistir trailer</button>
      </div>
      <p id="sinopse-movie">${overview}</p>
        <!-- <iframe src="https://www.youtube.com/embed/yL65RwsVjA8" frameborder="0" allowfullscreen></iframe> -->
    </section>
  `;

  return card;
}

function renderInfoOfMovie(movie) {
  const main = document.getElementById("main-movie");
  main.innerHTML = "";

  const dataMovie = {
    id: movie.id,
    title: movie.title,
    genres: movie.genres,
    vote_average: movie.vote_average,
    release_date: movie.release_date,
    overview: movie.overview,
    poster_path: movie.poster_path
  }

  const body = document.getElementById("background-image");
  body.style.backgroundImage = `url(${urls.image+ "w1280" +movie.backdrop_path})`;

  const containerMovie = createCard(dataMovie);
  
  main.innerHTML = containerMovie;
}

function responsivenessOfBoxSinopse(e) {
  const sinopseMovie = document.getElementById("sinopse-movie");
  const boxInfoMovie = document.getElementById("box-info-movie");
  const containerMovieInfo =  document.getElementById("container-movie-info");
  
  if(e.currentTarget.innerWidth > 530) {
    sinopseMovie.remove();
    boxInfoMovie.appendChild(sinopseMovie);
  } else {
    sinopseMovie.remove();
    containerMovieInfo.appendChild(sinopseMovie);
  }
}

window.addEventListener("resize", (e) => responsivenessOfBoxSinopse(e));

window.addEventListener("load", (e) => {
  loading();
  getLocalStorage();
  setTimeout(() => {
    responsivenessOfBoxSinopse(e);
  }, 180);
});
