const funCart = function (params) {
  const btnCart = document.querySelector(".button-cart");
  const modal_cart = document.getElementById("modal-cart");
  const btnModalCart = modal_cart.querySelector(".modal-close");

  btnCart.addEventListener("click", function () {
    modal_cart.style.display = "flex";
  });

  btnModalCart.addEventListener("click", function () {
    modal_cart.style.display = "";
  });

  console.log("btnCart: ", btnCart);
  console.log("modal_cart: ", modal_cart);
};

funCart();
