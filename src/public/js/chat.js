const socket = io();

let user;

Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingresa tu nombre de user',
    icon: 'success',
    inputValidator: (value) => {
        return !value && 'Es obligatorio introducir nombre de user'
    },
    allowOutsideClick: false,
}).then((res) => {
    user = res.value;
    socket.emit('new-user', user)
})


const chatInput = document.getElementById('chat-input');

chatInput.addEventListener('keyup', (ev) => {
    //si la tecla es enter Y mayor a 0 el msg EMITIMOS elmensaje!! y limpiamos el input! 
    if (ev.key === 'Enter') {
        const inputMsg = chatInput.value;

        if (inputMsg.trim().length > 0) {
            // let body = JSON.stringify({user: user.value, message: inputMsg})
            
            socket.emit('chat-message', { user, message: inputMsg });
            
            chatInput.value = "";
        }
    }
})




//recibimos la lsita actualizada de msg 
const msgChat = document.getElementById('messages-panel')
// socket.on('messages', async (data) => {
    
//     let messages = [];

//     await data.forEach((element) => {
//         messages += `<b> ${element.user}: </b> ${element.message} </br>`
//     });
//     msgChat.innerHTML = messages;
// })
socket.on("messages",async (data) => {
    console.log(data);
    let messages = "";
  
    await data.forEach((m) => {
      messages += `<b>${m.user}:</b> ${m.message}</br>`;
    });
    msgChat.innerHTML = messages;
  })

// modal "se unio nuevo usuario"
socket.on('new-user', (user) => {
    Swal.fire({
        title: `${user} se ha unido al chat `,
        toast: true,
        position: "top-end"
    })
})