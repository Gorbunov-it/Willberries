const funSearch = function (params) {
  const input = document.querySelector(".search-block > input");
  const btnSeacrh = document.querySelector(".search-block > button");

  input.addEventListener("input", function (event) {
    console.log(event.target.value);
  });

  btnSeacrh.addEventListener("click", function () {
    console.log(input.value);
  });
};

funSearch();
