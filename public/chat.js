let socket = io();
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-box')
const inputMessage = document.getElementById('input-message')

socket.on('chat-message', data => {
    addMessage(data);
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = inputMessage.value
    addMessage(message);
    socket.emit('send-chat-msg', message)
    inputMessage.value = ''
})

function addMessage(message) {
    const messageEl = document.createElement('div')
    messageEl.innerText = message;
    messageContainer.append(messageEl);
}
