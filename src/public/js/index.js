
const socket = io();

// socket.emit('message', 'anda desde ell indexJS!!!') //mando mensaje a la consola 

const timeReal = document.getElementById("containerProducts");

socket.on('products', (data) =>{
  console.log(data);
  render(data)
})


function render(data) {
  let html = data.map(function(elem, index){
    return `<div> <ul>
        
    <li><strong>Titulo: ${elem.title}</strong> </li>
    <li>ID: ${elem.id} </li>
    <li>Precio: ${elem.price} </li>
    <li>detalle: ${elem.description} </li>
    <li>stock: ${elem.stock} </li>
    
    </ul> </div>`
  }).join(" ")

  timeReal.innerHTML = html; //ahora llega el mensaje al NAVEGADOR!!! 
  };
  
    


