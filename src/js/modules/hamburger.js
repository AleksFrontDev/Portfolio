function hamburger() {
  const hamburger = document.querySelector(".hamburger"),
    menu = document.querySelector(".menu"),
    closeElem = document.querySelector(".menu_close");

  function openHamb() {
    hamburger.addEventListener("click", () => {
      menu.classList.add("active");
      console.log("Menu opened");
    });
  }

  function closeHamb() {
    closeElem.addEventListener("click", () => {
      menu.classList.remove("active");
      console.log("Menu closed");
    });
  }

  openHamb();
  closeHamb();
}

export default hamburger;
