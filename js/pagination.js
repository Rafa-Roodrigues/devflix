let movies = [
  {movie: ""},
  {movie: ""},
  {movie: ""},
  {movie: ""},
  {movie: ""},
  {movie: ""},
  {movie: ""},
  {movie: ""},
  {movie: ""},
  {movie: ""},
  {movie: ""},
  {movie: ""},
  {movie: ""},
  {movie: ""},
  {movie: ""},
  {movie: ""},
  {movie: ""},
  {movie: ""},
  {movie: ""},
  {movie: ""},
]

let totalPages = 500;
let paginaAtual = 10;
let cont = 0;
const numberPage = document.getElementById("numberPages");



function createElementHTML( element, value, event) {
  const elementCreated = document.createElement(element);
  
  elementCreated.innerHTML = value;

  if(event) {
    elementCreated.onclick = (e) => {
      paginaAtual = e.target.innerText;
      temp();
    }
  }

  return elementCreated;
}

function temp() {
  numberPage.innerHTML = "";
  
    if(paginaAtual > 1) {
    const a = createElementHTML("a", 1, true);
    const span = createElementHTML("span", "...", false);
    
    numberPage.appendChild(a);
    numberPage.appendChild(span);
  }

  for(let i = paginaAtual; i <= totalPages; i++) {
    cont++;
    const element = createElementHTML("a", i, true);
    
    numberPage.appendChild(element);
  
    if(cont == 5) {
      break;
    }
  }

  if(paginaAtual < 496) {
    const a = createElementHTML("a", 500, true);
    const span = createElementHTML("span", "...", false);
    
    numberPage.appendChild(span);
    numberPage.appendChild(a);
  }

  cont = 0;
}

temp();
