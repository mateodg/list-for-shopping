//Variables
const lista_Mandados = document.getElementById('listaMandados');
const boton_Agregar = document.getElementById('agregarProducto');

//Eventos
eventListeners();
function eventListeners() {
    //Agregar producto a comprar en la lista
    document.querySelector('#formulario').addEventListener('submit', agregarProducto);
    //Borrar producto de la lista
    lista_Mandados.addEventListener('click', borrarProducto);
    //Contenido Cargado desde Local Storage
    document.addEventListener('DOMContentLoaded', localStorageCargado);
}

//Funciones
//Habilitar el boton de Agregar producto


//Agregar Producto a la lista
function agregarProducto(e) {
    e.preventDefault();
    //Tomar el valor del producto en el input  
    let producto = document.getElementById('producto').value;
    let boton_Agregar = document.getElementById('agregarProducto');
    //Creando la opcion de borrar el elemento de la lista
    const botonBorrar = document.createElement('a');
    botonBorrar.className = 'borrar-producto';
    botonBorrar.innerText = 'X';
    //Crear el elemento (producto) y añadir el producto a la lista
    const elementoLista = document.createElement('li');
    elementoLista.innerText = producto;
    elementoLista.className = 'list-group-item'
    //Añadir el boton de borrar
    elementoLista.appendChild(botonBorrar);
    //Añadir el producto a la lista
    listaMandados.appendChild(elementoLista);
    //Añadir a local storage
    agregarElementosLocalStorage(producto);
    //Dejar input vacio
    formulario = document.getElementById('formulario');
    formulario.reset();
    /*$(".form-control").val("")*/

}
//Borrar Producto de la lista
function borrarProducto(e) {
    e.preventDefault();
    if (e.target.className === 'borrar-producto') {
        e.target.parentElement.remove(); 
        borrarProductoLocalStorage(e.target.parentElement.innerText);
    }
}
//Buscar los elementos en el local storage
function revisarLocalStorage() {
    let productos;
    //Revisar Valores de local Storage
    if (localStorage.getItem('productos') === null) {
        productos = [];
    } else { 
        productos = JSON.parse(localStorage.getItem('productos') );
    }
    return productos;
}
//Agregar productos al local storage
function agregarElementosLocalStorage(producto) {
    let productos;
    productos = revisarLocalStorage();
    //Añadir el producto al Array de productos
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos) )

}
//Borrar Productos del local storage
function borrarProductoLocalStorage(producto) {
    let productos;
    let borrarProductos;
    productos = revisarLocalStorage();
    borrarProductos = producto.substring(0, producto.length-1);
    productos.forEach(function(producto , index) {
        if (borrarProductos === producto) {
            productos.splice(index, 1);
        }
    });
    localStorage.setItem('productos', JSON.stringify(productos) )
}
function localStorageCargado() {
   let productos;
   productos = revisarLocalStorage();
   productos.forEach(function(producto) {
    const botonBorrar = document.createElement('a');
    botonBorrar.className = 'borrar-producto';
    botonBorrar.innerText = 'X';
    //Crear el elemento (producto) y añadir el producto a la lista
    const elementoLista = document.createElement('li');
    elementoLista.innerText = producto;
    elementoLista.className = 'list-group-item'
    //Añadir el boton de borrar
    elementoLista.appendChild(botonBorrar);
    //Añadir el producto a la lista
    listaMandados.appendChild(elementoLista);
   }) ;
        
        
   
}
