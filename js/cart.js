const funCart = function (params) {
  const btnCart = document.querySelector(".button-cart");
  const modal_cart = document.getElementById("modal-cart");
  const modalForm = document.querySelector(".modal-form");
  const btnModalCart = modal_cart.querySelector(".modal-close");
  const goodsContainer = document.querySelector(".long-goods-list");
  const carttable = document.querySelector(".cart-table__goods");
  const card_table__total = document.querySelector(".card-table__total");
  const nameCustomer = modalForm.querySelector('input[name="nameCustomer"]');
  const phoneCustomer = modalForm.querySelector('input[name="phoneCustomer"]');

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.filter((good) => {
      return good.id !== id;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };

  const addCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.map((good) => {
      if (good.id === id) {
        good.count++;
      }
      return good;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };

  const reduceCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.map((good) => {
      if (good.id === id) {
        if (good.count > 0) {
          good.count--;
        }
      }
      return good;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };

  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem("goods"));
    const clickedGood = goods.find((good) => good.id === id);
    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

    if (cart.some((good) => good.id === clickedGood.id)) {
      cart.map((good) => {
        if (good.id === clickedGood.id) {
          good.count++;
        }
        return good;
      });
    } else {
      clickedGood.count = 1;
      cart.push(clickedGood);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const renderCartGoods = (goods) => {
    carttable.innerHTML = "";
    goods.forEach((good) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${good.name}</td>
        <td>${good.price}$</td>
        <td><button class="cart-btn-minus"">-</button></td>
        <td>${good.count}</td>
        <td><button class="cart-btn-plus"">+</button></td>
        <td>${good.price * good.count}$</td>
        <td><button class="cart-btn-delete"">x</button></td>
      `;
      carttable.append(tr);

      tr.addEventListener("click", (event) => {
        if (event.target.classList.contains("cart-btn-minus")) {
          reduceCartItem(good.id);
        } else if (event.target.classList.contains("cart-btn-plus")) {
          addCartItem(good.id);
        } else if (event.target.classList.contains("cart-btn-delete")) {
          deleteCartItem(good.id);
        }
      });
    });

    let count = 0;
    goods.forEach((good) => {
      count = count + good.price * good.count;
    });
    card_table__total.innerHTML = `${count}$`;
  };

  const getNameCustomer = (event) => {
    return nameCustomer.value;
  };

  const getPhoneCustomer = () => {
    return phoneCustomer.value;
  };

  const ClearInput = () => {
    nameCustomer.value = "";
    phoneCustomer.value = "";
  };

  const sendForm = () => {
    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        cart: cart,
        name: getNameCustomer(),
        phone: getPhoneCustomer(),
      }),
    }).then(() => {
      ClearInput();
      localStorage.setItem("cart", JSON.stringify([]));
      modal_cart.style.display = "";
    });
  };

  btnCart.addEventListener("click", (event) => {
    const cartArray = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    renderCartGoods(cartArray);
    modal_cart.style.display = "flex";
  });

  btnModalCart.addEventListener("click", (event) => {
    // if (!event.target.closest(".modal") && event.target.classList.contains("overlay")) {
    // }
    modal_cart.style.display = "";
  });

  modalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendForm();
  });

  if (goodsContainer) {
    goodsContainer.addEventListener("click", (event) => {
      if (event.target.closest(".add-to-cart")) {
        const buttonToCart = event.target.closest(".add-to-cart");
        const goodId = buttonToCart.dataset.id;
        addToCart(goodId);
      }
    });
  }
};

funCart();
