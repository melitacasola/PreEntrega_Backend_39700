const socket = io();

socket.emit('message', 'anda desde ell indexJS!!!') //mando mensaje a la consola 

const timeReal = document.getElementById("containerProducts");

socket.on('messages', (data) =>{console.log(data)})

socket.on("message", async (routeProducts) => {
    console.log(routeProducts)//recibo mensaje a la csl del navegador
    let prodsList = "";
  await routeProducts.forEach((e) => {
    prodsList += `<ul>
        
            <li>Titulo:${e.title}, Id:${e.id}, Precio${e.price}, Stock:${e.stock}</li>
    
    </ul>`;
  });
  timeReal.innerHTML = prodsList; //ahora llega el mensaje al NAVEGADOR!!! 
});
