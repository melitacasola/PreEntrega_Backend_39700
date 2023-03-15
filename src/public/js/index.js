const socket = io();

socket.emit('message', 'anda desde ell indexJS!!!') //mando mensaje a la consola 

const timeReal = document.getElementById("containerProducts");

socket.on("message", async (data) => {
    console.log(data)//recibo mensaje a la csl del navegador
  timeReal.innerText = data; //ahora llega el mensaje al NAVEGADOR!!! 
});