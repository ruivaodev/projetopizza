//não é inteligente usar isso, estou usando por ser a pratica do professor.

pizzaJson.map((item, index) => {
  let pizzaItem = document.querySelector(".models .pizza-item").cloneNode(true);

  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;

  document.querySelector(".pizza-area").append(pizzaItem);
});
