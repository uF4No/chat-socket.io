# use Node slim base image
FROM node:10.13-slim
WORKDIR /app
COPY client ./client/
COPY package*.json  server.js ./
RUN npm install
# COPY . .
EXPOSE 3000
CMD npm start