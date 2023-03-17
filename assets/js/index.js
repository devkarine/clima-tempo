function showInput() {
  if (window.innerWidth < 720){
    const input = document.querySelector("#loc");
    input.style.visibility = "visible";
  }
}


  function hideInput() {
    if (window.innerWidth < 720){
    const input = document.querySelector("#loc");
    input.style.visibility = "hidden";
    }
  }