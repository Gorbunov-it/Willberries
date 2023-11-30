const funSearch = () => {
  const input = document.querySelector(".search-block > input");
  const btnSeacrh = document.querySelector(".search-block > button");

  btnSeacrh.addEventListener("click", () => {
    console.log(input.value);
  });
};

funSearch();
