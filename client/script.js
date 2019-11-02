/**
 * Use io (loaded earlier) to connect with the socket instance running in your server. 
 * IMPORTANT! By default, socket.io() connects to the host that 
 * served the page, so we dont have to pass the server url
 */
var socket = io();

//prompt to ask user's name 
const name = prompt('Welcome! Please enter your name:')

// emit event to server with the user's name
socket.emit('new-connection', {username: name})

// get elements of our html page
const chatContainer = document.getElementById('chat-container')
const messageInput = document.getElementById('messageInput')
const messageForm = document.getElementById('messageForm')

messageForm.addEventListener('submit', (e) => {
  // avoid submit the form and refresh the page
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

// removes error class from input
messageInput.addEventListener('keyup', (e) => {
  messageInput.classList.remove('error')
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
  // adds the new div to the message container div
  chatContainer.append(messageElement)
}