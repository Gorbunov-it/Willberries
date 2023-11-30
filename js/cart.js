const funCart = (params) => {
  const btnCart = document.querySelector(".button-cart");
  const modal_cart = document.getElementById("modal-cart");
  const btnModalCart = modal_cart.querySelector(".modal-close");

  btnCart.addEventListener("click", () => {
    modal_cart.style.display = "flex";
  });

  btnModalCart.addEventListener("click", () => {
    modal_cart.style.display = "";
  });
};

funCart();
