let divMostrar = document.createElement("div");
let cuerpoModal = document.querySelector("#cuerpoModal");
divMostrar.setAttribute("id", "mostrar");
let body = document.body;
body.style.backgroundImage =
  "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShvuM32GAzdcShanfBk9V80RBpk1_IVNoPkA&s')";
body.style.overflowX = "hidden";
fetch("/assets/json/productos.json")
  .then((respuesta) => respuesta.json())
  .then((datos) => {
    let pizzas = Object.values(datos.pizza);
    let postres = Object.values(datos.postres);
    let bebidas = Object.values(datos.bebidas);

    
    agregarElementos(pizzas, "Pizzas");
    agregarElementos(postres, "Postres");
    agregarElementos(bebidas, "Bebidas");
    deshabilitarBoton(pizzas);
    deshabilitarBoton(postres);
    deshabilitarBoton(bebidas);
  })
  .catch((error) => {
    console.log(error);
  });

function agregarElementos(producto, nombreProducto) {
  let divProductos = document.createElement("div");
  divProductos.setAttribute("id", `${nombreProducto}`);
  divProductos.classList.add("row", "column-gap-5");
  divProductos.style.margin = "2% 1% 3% 8%";

  let divTitulo = document.createElement("div");
  divTitulo.setAttribute("id", "tituloProducto");
  let titulo = document.createElement("h1");
  titulo.style.boxShadow = "5px 5px 15px rgba(0, 0, 0, 0.3)";
  titulo.style.color = "white";
  titulo.style.textShadow = "3px 3px 8px rgba(0, 0, 0, 0.6)";
  titulo.style.padding = "0.2% 25% 0.5% 25%";
  titulo.style.borderRadius = "20px";
  titulo.style.border = "solid black 2px";
  titulo.style.background =
    "linear-gradient(to left, #ffcc33,rgb(249, 73, 33))";
  let textoTitulo = document.createTextNode(`${nombreProducto}`);

  divTitulo.classList.add("d-flex", "justify-content-center");
  titulo.appendChild(textoTitulo);

  divProductos.appendChild(divTitulo);

  producto.forEach((element) => {
    divTitulo.appendChild(titulo);
    let divCard = document.createElement("div");
    divCard.classList.add("card", "col-4");
    divCard.style.width = "18rem";
    divCard.style.border = "solid black 2px";

    let imagenCard = document.createElement("img");
    imagenCard.setAttribute("src", `${element.imagen}`);
    imagenCard.setAttribute("class", "card-img-top");
    imagenCard.style.aspectRatio = "1 / 1";
    imagenCard.style.width = "100%";
    imagenCard.style.objectFit = "cover";

    let divCardBody = document.createElement("div");
    divCardBody.setAttribute("class", "card-body");
    divCard.style.marginTop = "20px";
    divCard.style.background = "linear-gradient(pink, white)";

    let tituloCard = document.createElement("h5");
    let textoTituloCard = document.createTextNode(`${element.nombre}`);
    tituloCard.appendChild(textoTituloCard);
    tituloCard.classList.add("card-tittle", "d-flex", "justify-content-center");

    let descripcionCard = document.createElement("p");
    let subrayadoIngredientes = document.createElement("b");
    let subtituloIngredientes = document.createTextNode("Ingredientes: ");
    let ingredientes = document.createTextNode(element.ingredientes);
    subrayadoIngredientes.appendChild(subtituloIngredientes);
    let divBoton = document.createElement("div");
    let boton = document.createElement("button");
    let textoBoton = document.createTextNode("Agregar");

    boton.style.padding = "0%";
    boton.classList.add(
      "btn",
      "btn-warning",
      "d-flex",
      "justify-content-center"
    );

    boton.appendChild(textoBoton);
    divBoton.appendChild(boton);

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
    boton.setAttribute("id", `btn${element.nombre}`);
    boton.addEventListener("click", () => {agregarCarrito(element);
    boton.setAttribute("disabled", "true");
    boton.innerText = "Agregado";
    boton.classList.add("btn-success");
    boton.classList.remove("btn-warning");});
    boton.style.padding = "5px 50px";
    boton.style.fontSize = "20px";
    divBoton.classList.add("d-flex", "justify-content-center");
    divCardBody.appendChild(divBoton);

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

    divProductos.appendChild(divCard);
  });
  divMostrar.appendChild(divProductos);
  body.appendChild(divMostrar);
}

function agregarCarrito(productoSeleccionado) {
  let productoCarrito = {
    nombre: `${productoSeleccionado.nombre}`,
    imagen: `${productoSeleccionado.imagen}`,
    precio: `${productoSeleccionado.precio}`,
  };
  localStorage.setItem(
    `${productoSeleccionado.nombre}`,
    JSON.stringify(productoCarrito)
  );
}

function mostrarCarrito() {
  let llaves = Object.keys(localStorage);
  cuerpoModal.innerHTML = `
  <div class='row fw-bold text-center' style='margin-bottom: 10px; border-bottom: 2px solid #ddd; padding-bottom: 5px;'>
    <p class='col-2'>Imagen</p>
    <p class='col-4'>Nombre</p>
    <p class='col-2'>Precio</p>
    <p class='col-2'>Cantidad</p>
    <p class='col-2'>Eliminar</p>
  </div>`;

  llaves.forEach((productoStorage) => {
    let producto = JSON.parse(localStorage.getItem(productoStorage));

    cuerpoModal.innerHTML += `
    <div id="producto-${producto.nombre}" class='row align-items-center justify-content-between' style="margin-top: 30px">
      <img class='col-2' src='${producto.imagen}' style='width:70px'>
      <p class='col-4 text-center' style="margin: 0px; padding: 0px">${producto.nombre}</p>
      <p class='col-2'>$${producto.precio}</p>
      <input class="col-2 form-control text-center cantidad-input" type="number" min="0" value="1" data-producto="${producto.nombre}" style="width: 60px; height: 30px; padding: 2px;">
      <button onclick='borrarProducto("${producto.nombre}")' class="col-auto btn p-0" style="border: none; background: transparent; cursor: pointer;">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/026/997/111/small/trash-can-pixelated-rgb-color-ui-icon-delete-button-waste-container-simplistic-filled-8bit-graphic-element-retro-style-design-for-arcade-video-game-art-editable-isolated-image-vector.jpg" 
        style="width: 50px;">
      </button>
    </div>`;
  });

  
  document.querySelectorAll(".cantidad-input").forEach((input) => {
    input.addEventListener("change", (event) => {
      let productoNombre = event.target.dataset.producto;
      let nuevaCantidad = parseInt(event.target.value);

      if (nuevaCantidad === 0) {
        borrarProducto(productoNombre); 
      }
    });
  });
}



function borrarProducto(productoEliminado) {
  localStorage.removeItem(productoEliminado);
  document.querySelector(`#producto-${productoEliminado}`)?.remove(); 
  habilitarBoton(productoEliminado); 
  mostrarCarrito(); 
}


function deshabilitarBoton(datosObtenidos){
  let llaves = Object.keys(localStorage);
  console.log(llaves);
  llaves.forEach(nombreLlaves =>{
    datosObtenidos.forEach(datos =>{
      if(datos.nombre == nombreLlaves){
        console.log(`btn${nombreLlaves}`);
        let botonProducto = document.querySelector(`[id="btn${nombreLlaves}"]`);
        console.log(botonProducto);
        botonProducto.setAttribute("disabled", "true");
        botonProducto.innerText = "Agregado";
        botonProducto.classList.add("btn-success");
        botonProducto.classList.remove("btn-warning");
      }
    })
  })
}


function mostrarCalculos() {
  let llaves = Object.keys(localStorage);
  let total = 0;
  let subtotal = 0;
  let costoDomicilio = llaves.length > 0 ? 1500 : 0; 

  let modalCalculos = document.querySelector("#modalCalculos");
  let cuerpoModalCalculos = document.querySelector("#cuerpoModalCalculos");

  cuerpoModalCalculos.innerHTML = `
    <h2 class="text-center">Resumen de Compra</h2>
    <div class="row fw-bold text-center" style="border-bottom: 2px solid #ddd; padding-bottom: 5px;">
      <p class="col-4">Producto</p>
      <p class="col-2">Precio</p>
      <p class="col-2">Cantidad</p>
      <p class="col-2">Subtotal</p>
    </div>`;

  llaves.forEach((productoStorage) => {
    let producto = JSON.parse(localStorage.getItem(productoStorage));
    let precio = parseFloat(producto.precio);
    let cantidad = document.querySelector(`[data-producto="${producto.nombre}"]`)?.value || 1;
    let subtotalProducto = precio * cantidad;

    subtotal += subtotalProducto; 

    cuerpoModalCalculos.innerHTML += `
      <div class="row text-center align-items-center" style="margin-top: 10px;">
        <p class="col-4">${producto.nombre}</p>
        <p class="col-2">$${precio}</p>
        <p class="col-2">${cantidad}</p>
        <p class="col-2">$${subtotalProducto.toFixed(2)}</p>
      </div>`;
  });

  total = subtotal + costoDomicilio;

  
  cuerpoModalCalculos.innerHTML += `
    <div class="row text-center fw-bold mt-3">
      <p class="col-6">Subtotal:</p>
      <p class="col-3">$${subtotal.toFixed(2)}</p>
    </div>
    <div class="row text-center fw-bold">
      <p class="col-6">Domicilio:</p>
      <p class="col-3">$${costoDomicilio}</p>
    </div>
    <div class="row text-center fw-bold">
      <p class="col-6">Total:</p>
      <p class="col-3">$${total.toFixed(2)}</p>
    </div>`;

 
  let modal = new bootstrap.Modal(modalCalculos);
  modal.show();
}
function habilitarBoton(nombreProducto) {
  let botonProducto = document.querySelector(`[id="btn${nombreProducto}"]`);
  if (botonProducto) {
    botonProducto.removeAttribute("disabled");
    botonProducto.innerText = "Agregar";
    botonProducto.classList.remove("btn-success");
    botonProducto.classList.add("btn-warning");
  }
}

function cerrarModalesAbiertas() {
  let modalesAbiertos = document.querySelectorAll(".modal.show");
  modalesAbiertos.forEach((modal) => {
    let modalInstance = bootstrap.Modal.getInstance(modal);
    if (modalInstance) modalInstance.hide();
  });
}
