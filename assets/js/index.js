function showInput() {
  if (window.innerWidth < 1100){
    const input = document.querySelector("#loc");
    input.style.visibility = "visible";
  }
}


  function hideInput() {
    if (window.innerWidth < 1100 ){
    const input = document.querySelector("#loc");
    input.style.visibility = "hidden";
    }
  }