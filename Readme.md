# Details
This project contains an static server that serves the HTML/CSS/JS required for the chat app.
When a message is sent from a client,the message is broadcasted to the rest of the clients with the name of the user that sent it.

## Built with
- Node.js v10
- Socket.io
- HTML
- CSS
- JavaScript


## How to run
You can run this app locally with Node.js or with Docker:

### Run with Node.js
- Install dependencies with ` npm i `
- Start the static server with ` npm start `
- Visit localhost:3000 in your browser

### Run with Docker
- Create docker image: ` docker build --rm -f "Dockerfile" -t chatsocketio:latest . `
- Run image: ` docker run -rm -it -p 3000:3000/tcp socketio-chat:latest `
- Visit localhost:3000 in your browser


## Author
Antonio Ufano - [uf4no.com](https://uf4no.com)