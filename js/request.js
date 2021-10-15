const APIMOVIES = 'https://api.themoviedb.org/3/discover/movie?api_key=f6541db294ac187416fae0f1b9effcce&language=pt-BR';
const IMAGEPATH = 'https://image.tmdb.org/t/p/w500/';
const APISEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=f6541db294ac187416fae0f1b9effcce&language=pt-BR&include_adult=false&query=';

export async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}
