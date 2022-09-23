let preciof = 0;
let seguir = true;
let usuario;
let preciofiltro;
let sigue;
let filtro;
let filtremos = false;

const Productos = [];

class Producto{
    constructor (info){
        this.id = info.id;
        this.nombre = info.nombre;
        this.precio = info.precio;
        this.stock = info.stock;
    }
}

Productos.push(new Producto(
    {   
        id: 1,
        nombre: "remera",
        precio: 2000,
        stock: 17
    }
    )
)
Productos.push(new Producto(
    {   
        id: 2,
        nombre: "pantalon",
        precio: 2500,
        stock: 14
    }
    )
)
Productos.push(new Producto(
    {   
        id: 3,
        nombre: "campera",
        precio: 4500,
        stock: 8
    }
    )
)
Productos.push(new Producto(
    {
        id: 4,
        nombre: "buzo",
        precio: 4000,
        stock: 9
    }
    )
)
Productos.push(new Producto(
    {   
        id: 5,
        nombre: "zapatillas",
        precio: 15000,
        stock: 2
    }
    )
)
Productos.push(new Producto(
    {
        id: 6,
        nombre: "medias",
        precio: 500,
        stock: 10
    }
    )
)
Productos.push(new Producto(
    {
        id: 7,
        nombre: "guantes",
        precio: 700,
        stock: 7
    }
    )
)

function calcularTotal(precioProducto){
    return preciof + precioProducto;
}

function continuar(){
    sigue = prompt("quiere seguir comprando?").toUpperCase();
        if (sigue != "SI"){
            seguir = false;
        }
}

function encontrarProducto(){
    if(filtremos == true){
        let filtrados = Productos.filter(producto => producto.precio < preciofiltro)
        let nombre = prompt("Ingrese el producto que esta buscando").toLowerCase();
        let encontrado = filtrados.find(producto => producto.nombre === nombre);
        const verif1 = filtrados.some(producto => producto.nombre === nombre);
        const verif2 = Productos.some(producto => producto.nombre === nombre);
        if(verif1 == true){
            if (encontrado.stock > 0){
                preciof = calcularTotal(encontrado.precio);
            }
            else{
                alert("no hay mas stock");
            }
        }
        else if (verif1 == false && verif2 == true){
            let conf = prompt("el producto deseado fue filtrado, desea añadirlo igualmente?").toUpperCase();
            if (conf == "SI"){
                encontrado = Productos.find(producto => producto.nombre === nombre);
                console.log(encontrado);
                if (encontrado.stock > 0){
                    preciof = calcularTotal(encontrado.precio);
                }
                else{
                    alert("no hay mas stock");
                }
            }
            else{}
        }
        console.log(encontrado.nombre);
        console.log(encontrado.precio);
    }
    else {
        let nombre = prompt("Ingrese el producto que esta buscando").toLowerCase();
        const encontrado = Productos.find(producto => producto.nombre === nombre);
        if (encontrado.stock > 0){
            preciof = calcularTotal(encontrado.precio);
        }
        else{
            alert("no hay mas stock");
        }
        console.log(encontrado.nombre);
        console.log(encontrado.precio);
    }
}

usuario = prompt("ingrese su nombre").toUpperCase();
let mensaje =   `hola ${usuario}, bienvenido a nuestra tienda, para agregar al carrito ingrese el nombre de lo que esta buscando, contamos con:`
alert(mensaje);
Productos.forEach((item) => {
    let mostrar = `
    nombre: ${item.nombre}
    a $${item.precio}
    `;    
    alert(mostrar);
    }
);
filtro = prompt("queres filtrar por precios?").toUpperCase();
    if (filtro == "SI"){
        filtremos = true;
        preciofiltro = Number(prompt("ingrese precio maximo"))
    }
while(usuario != "ESC" && seguir == true){
    encontrarProducto();
    continuar();
}

console.log(usuario);
console.log(preciof);
