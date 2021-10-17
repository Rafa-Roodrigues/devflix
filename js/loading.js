export function loading() {
  const boxLoader = document.getElementsByClassName("box-loader")[0];
  boxLoader.style.display = "flex";

  setTimeout(() => {
    boxLoader.style.display = "none";
  }, 1500);
}