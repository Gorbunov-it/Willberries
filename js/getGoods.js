const getGoods = function () {
  const links = document.querySelectorAll(".navigation-link");
  console.log("links: ", links);

  const getData = () => {
    fetch("./db/db.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        localStorage.setItem("goods", JSON.stringify(data));
        // console.log("localStorage: ", localStorage);
      });
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      getData();
    });
  });

  // localStorage.setItem("goods", JSON.stringify([1, 2, 3, 4, 5]));
  // console.log("localStorage: ", JSON.parse(localStorage.getItem("goods")));

  // localStorage.removeItem("goods");
  // console.log("localStorage: ", localStorage);
};

getGoods();
