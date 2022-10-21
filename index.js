let preciof = 0;
let seguir = true;
let usuario;
let preciofiltro;
let sigue;

const filtro = document.getElementById("filtro");
const cards = document.getElementById("cards");
const mostcarrito = document.getElementById("mostrarcarrito");
const limpiar = document.getElementById("limpiar");
const carrito = document.getElementById("carrito");
let Carrito = [];
let carritoStorage = JSON.parse(localStorage.getItem("carrito"));

if(carritoStorage){
    Carrito = carritoStorage;
}

fetch("./productos/productos.json")
.then(response => response.json())
.then(data => data.forEach ( producto => {
    const {id, nombre, precio, stock, imagen} = producto
    let tarjeta = document.createElement("div")
    tarjeta.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">precio: $${producto.precio}</p>
        </div>
    <button id=${producto.id}>Comprar</button>
    </div>`
    cards.append(tarjeta);

    const boton = document.getElementById(producto.id);
    boton.addEventListener("click", () => comprarProducto(producto));
}
))


actualizarcarrito = () => {
    carrito.innerHTML = "";
Carrito.forEach(prod=> {
    let carro = document.createElement("div")
    carro.innerHTML = `
    <p>${prod.nombre}</p>
    <p>${prod.precio}</p>
    <p>${prod.cantidad}</p>`
    carrito.append(carro);
    })
}


const comprarProducto = (producto) => {
    Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Agregado al carrito',
        imageUrl: `${producto.imagen}`,
        showConfirmButton: false,
        timer: 1500
    })
    let productoExiste = Carrito.find(item => item.id === producto.id);
    if(productoExiste === undefined){
        Carrito.push({
            id: producto.id,
            nombre:producto.nombre,
            precio:producto.precio,
            imagen:producto.imagen,
            cantidad: 1
        })
    }
    else {
        productoExiste.precio = productoExiste.precio + producto.precio;
        productoExiste.cantidad = productoExiste.cantidad + 1;
    }
    localStorage.setItem("carrito", JSON.stringify(Carrito));
}

mostcarrito.addEventListener("click" , () => actualizarcarrito());
    
limpiar.addEventListener("click", () => {
    Swal.fire({
        title: 'Esta seguro que desea borrar el carrito?',
        text: "No podra recuperarlo, y debera cargarlo nuevamente",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, seguro',
        cancelButtonText: 'cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire(
            'Borrado',
            'El carrito fue borrado exitosamente',
            'success'
        )
        Carrito.splice(0, Carrito.length);
        localStorage.clear();
        }
        else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire(
            'cancelado',
            'el carrito no fue borrado',
            'error'
            )
        }
    })
    actualizarcarrito();
})
