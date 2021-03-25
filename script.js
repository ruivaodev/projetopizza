let cart = [];
let modalQt = 1;
let modalKey = 0;
// clone dos itens que estão no pizza.js atraves das divs
// LISTAGEM DE PIZZA.
pizzaJson.map((item, index) => {
  let pizzaItem = document.querySelector(".models .pizza-item").cloneNode(true);

  pizzaItem.setAttribute("data-key", index);
  pizzaItem.querySelector(".pizza-item--img img").src = item.img;
  pizzaItem.querySelector(
    ".pizza-item--price"
  ).innerHTML = `R$ ${item.price.toFixed(2)}`;

  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;
  pizzaItem.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();

    let key = e.target.closest(".pizza-item").getAttribute("data-key");

    modalQt = 1;
    modalKey = key; // sempre que clicar para pegar a pizza ela vai dizer qual é
    //mostrar a pizza selecionada e salvar ela.

    document.querySelector(".pizzaBig img").src = pizzaJson[key].img;
    document.querySelector(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
    document.querySelector(".pizzaInfo--desc").innerHTML =
      pizzaJson[key].description;
    document.querySelector(
      ".pizzaInfo--actualPrice"
    ).innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

    document
      .querySelector(".pizzaInfo--size.selected")
      .classList.remove("selected");

    document.querySelectorAll(".pizzaInfo--size").forEach((size, sizeIndex) => {
      if (sizeIndex == 2) {
        size.classList.add("selected");
      }
      size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    document.querySelector(".pizzaInfo--qt").innerHTML = modalQt;

    document.querySelector(".pizzaWindowArea").style.opacity = 0;
    document.querySelector(".pizzaWindowArea").style.display = "flex";
    setTimeout(() => {
      document.querySelector(".pizzaWindowArea").style.opacity = 1;
    }, 200);
  });
  // para abrir o modal listado no item acima.

  document.querySelector(".pizza-area").append(pizzaItem);
});

// EVENTOS DO MODAL

function closeModal() {
  document.querySelector(".pizzaWindowArea").style.opacity = 0;
  setTimeout(() => {
    document.querySelector(".pizzaWindowArea").style.display = "none";
  }, 500);
}

document
  .querySelectorAll(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton")
  .forEach((item) => {
    item.addEventListener("click", closeModal);
  });

// adicionando ações aos botoes de + e -

document.querySelector(".pizzaInfo--qtmenos").addEventListener("click", () => {
  if (modalQt > 1) {
    modalQt--;
    document.querySelector(".pizzaInfo--qt").innerHTML = modalQt;
  }
});

document.querySelector(".pizzaInfo--qtmais").addEventListener("click", () => {
  modalQt++;
  document.querySelector(".pizzaInfo--qt").innerHTML = modalQt;
});

//adicionando a função selected aos botoes dos tamanhos
document.querySelectorAll(".pizzaInfo--size").forEach((size, sizeIndex) => {
  size.addEventListener("click", (e) => {
    document
      .querySelector(".pizzaInfo--size.selected")
      .classList.remove("selected");
    size.classList.add("selected");
  });
});

// carrinho de compras

//qual pizza?
document
  .querySelector(".pizzaInfo--addButton")
  .addEventListener("click", () => {
    //qual tamanho?
    let size = parseInt(
      document
        .querySelector(".pizzaInfo--size.selected")
        .getAttribute("data-key")
    );

    //mesmas pizzas e do mesmo tamanho precisam estar juntas
    let identifier = pizzaJson[modalKey].id + "@" + size;

    let key = cart.findIndex((item) => item.identifier == identifier);
    //verificando se é o mesmo id

    if (key > -1) {
      cart[key].qt += modalQt;
    } else {
      cart.push({
        identifier,
        id: pizzaJson[modalKey].id,
        size,
        qt: modalQt,
      });
    }
    uptadeCart();
    closeModal();
  });
// funçoes do carrinho de compras

function uptadeCart() {
  if (cart.length > 0) {
    document.querySelector("aside").classList.add("show");
  } else {
    document.querySelector("aside").classList.remove("show");
  }
}
