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
const Productos = [];
let Carrito = [];
let carritoStorage = JSON.parse(localStorage.getItem("carrito"));

if(carritoStorage){
    Carrito = carritoStorage;
}

class Producto{
    constructor (info){
        this.id = info.id;
        this.nombre = info.nombre;
        this.precio = info.precio;
        this.stock = info.stock;
        this.imagen = info.imagen;
    }
}

Productos.push(new Producto(
    {   
        id: 1,
        nombre: "remera",
        precio: 2000,
        stock: 17,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpzd6fy7juijZTShkY4SNIwIG_LYVuJxayn4232ax2_XVhqKCGcnJcbM6BIae5dh3gk2E&usqp=CAU"
    }
    )
)
Productos.push(new Producto(
    {   
        id: 2,
        nombre: "pantalon",
        precio: 2500,
        stock: 14,
        imagen: "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw04d7fefa/products/AD_GK8831/AD_GK8831-1.JPG"
    }
    )
)
Productos.push(new Producto(
    {   
        id: 3,
        nombre: "campera",
        precio: 4500,
        stock: 8,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYiUB-i7UtOjht5BXb2xBRlOiaxS-NMGBSYw&usqp=CAU"
    }
    )
)
Productos.push(new Producto(
    {
        id: 4,
        nombre: "buzo",
        precio: 4000,
        stock: 9,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ4BItZPETmpiogLa9A0h_5D1ET6adHW-9QA&usqp=CAU"
    }
    )
)
Productos.push(new Producto(
    {   
        id: 5,
        nombre: "zapatillas",
        precio: 15000,
        stock: 2,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF8zhqCVsXW2ymxwrQSUOO2RPamvyiS844Pw&usqp=CAU"
    }
    )
)
Productos.push(new Producto(
    {
        id: 6,
        nombre: "medias",
        precio: 500,
        stock: 10,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPqZcPAmz062v0gqIjFzT4a4qNWI9sdpIQQw&usqp=CAU"
    }
    )
)
Productos.push(new Producto(
    {
        id: 7,
        nombre: "guantes",
        precio: 700,
        stock: 7,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDxZaKIzPudtBvfRzISlFm6a7PGBb8jASQVA&usqp=CAU"
    }
    )
)

Productos.forEach(producto => {
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
})

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

mostcarrito.addEventListener("click" , () => {
    console.log(Carrito);
    actualizarcarrito();
})
    
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
