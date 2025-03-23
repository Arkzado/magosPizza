let divMostrar = document.querySelector("#mostrar");
divMostrar.setAttribute;
fetch("/assets/json/productos.json")
  .then((respuesta) => respuesta.json())
  .then((datos) => {
    let pizzas = Object.values(datos.pizza);
    let postres = Object.values(datos.postres);
    let bebidas = Object.values(datos.bebidas);

    agregarElementos(pizzas);
    agregarElementos(postres);
    agregarElementos(bebidas);
  })
  .catch((error) => {
    console.log(error);
  });

function agregarElementos(producto) {
  console.log(producto);
  producto.forEach((element) => {
    let divCard = document.createElement("div");
    divCard.classList.add("card", "col-4");
    divCard.setAttribute("style", "width: 18rem;");

    let imagenCard = document.createElement("img");
    imagenCard.setAttribute("src", `${element.imagen}`);
    imagenCard.setAttribute("class", "card-img-top");
    imagenCard.style.aspectRatio = "1 / 1";
    imagenCard.style.width = "100%";
    imagenCard.style.objectFit = "cover";

    let divCardBody = document.createElement("div");
    divCardBody.setAttribute("class", "card-body");

    let tituloCard = document.createElement("h5");
    let textoTitulo = document.createTextNode(`${element.nombre}`);
    tituloCard.appendChild(textoTitulo);
    tituloCard.classList.add("card-tittle", "d-flex", "justify-content-center");

    let descripcionCard = document.createElement("p");
    let subrayadoIngredientes = document.createElement("b");
    let subtituloIngredientes = document.createTextNode("Ingredientes: ");
    let ingredientes = document.createTextNode(element.ingredientes);
    subrayadoIngredientes.appendChild(subtituloIngredientes);

    let saltoLinea = document.createElement("br");
    let saltoLinea2 = document.createElement("br");
    let subrayadoTamaño = document.createElement("b");
    let subtituloTamaño = document.createTextNode("Tamaño: ");
    subrayadoTamaño.appendChild(subtituloTamaño);
    let tamaño = document.createTextNode(element.tamaño);

    let subrayadoPrecio = document.createElement("b");
    let subtituloPrecio = document.createTextNode("Precio: ");
    subrayadoPrecio.appendChild(subtituloPrecio);
    let precio = document.createTextNode(`$${element.precio}`);

    divCardBody.appendChild(tituloCard); // titulo

    descripcionCard.appendChild(subrayadoIngredientes); //subtitulo ingredientes
    descripcionCard.appendChild(ingredientes); //ingredientes
    descripcionCard.appendChild(saltoLinea); //br
    descripcionCard.appendChild(subrayadoTamaño); //subtitulo tamaño
    descripcionCard.appendChild(tamaño); // tamaño
    descripcionCard.appendChild(saltoLinea2); //br
    descripcionCard.appendChild(subrayadoPrecio); //subtitulo precio
    descripcionCard.appendChild(precio);
    divCardBody.appendChild(descripcionCard);
    divCard.appendChild(imagenCard);
    divCard.appendChild(divCardBody);

    divMostrar.appendChild(divCard);
  });
}
