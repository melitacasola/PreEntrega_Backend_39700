const socket = io();

let username;

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
    username = res.value;
    socket.emit('new-user', username)
})

const chatInput = document.getElementById('chat-input');
chatInput.addEventListener('keyup', (ev) => {
  
    if (ev.key === 'Enter') {
        const inputMsg = chatInput.value;

        if (inputMsg.trim().length > 0) {
            socket.emit('chat-message', { username, message: inputMsg });
            chatInput.value = "";
        }
    }
})


const msgChat = document.getElementById('messages-panel')

socket.on('messages', (data) => {
    let messages = "";
    data.forEach((element) => {
        messages += `<b> ${element.username}: </b> ${element.message} </br>`
    });
    msgChat.innerHTML = messages;
})

socket.on('new-user', (username) => {
    Swal.fire({
        title: `${username} se ha unido al chat `,
        toast: true,
        position: "top-end"
    })
})