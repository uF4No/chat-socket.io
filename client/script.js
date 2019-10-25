const chatContainer = document.getElementById('chat-container')


// connects with the socket instance running in your server
var socket = io('http://localhost:3000');

const name = prompt('Welcome! Please enter your name:')

socket.emit('new-connection', {username: name})

// Adds event listener to button to send messages
const messageInput = document.getElementById('messageInput')
const messageForm = document.getElementById('messageForm')

// removes error class from input
messageInput.addEventListener('keyup', (e) => {
  messageInput.classList.remove('error')
})

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  // check if there is a message in the input
  if(messageInput.value !== ''){
    let newMessage = messageInput.value
    //sends message and our id to socket server
    socket.emit('new-message', {user: socket.id, message: newMessage})
    addMessage({message: newMessage}, 'my' )
    //resets input
    messageInput.value = ''
  }else{
    messageInput.classList.add('error')
  }
})

socket.on('welcome', function (data) {
  console.log(data);
  addMessage(data, 'server')
});

socket.on('broadcast-message', (data) => {
  console.log('broadcast message event')
  addMessage(data, 'others')
})


// receives two params, the message and if it was sent by you
// so we can style them differently
function addMessage(data, type = false){
  const messageElement = document.createElement('div')
  messageElement.classList.add('message')

  if(type === 'my'){
    messageElement.classList.add('my-message')
    messageElement.innerText = `${data.message}`

  }else if(type === 'others'){
    messageElement.classList.add('others-message')
    messageElement.innerText = `${data.user}: ${data.message}`

  }else{
    messageElement.innerText = `${data.message}`

  }
  chatContainer.append(messageElement)
}