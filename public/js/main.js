// const chatForm = document.getElementById('chat-form');
// const chatMessages = document.querySelector('.chat-messages');
// const roomName = document.getElementById('room-name');
// const userList = document.getElementById('users');

// const e = require("express");

// // Get username and room from URL
// const { username, room } = Qs.parse(location.search, {
//   ignoreQueryPrefix: true
// });

// const socket = io();

// // Join chatroom
// socket.emit('joinRoom', { username, room });

// // Get room and users
// socket.on('roomUsers', ({ room, users }) => {
//   outputRoomName(room);
//   outputUsers(users);
// });

// // Message from server
// socket.on('message', message => {
//   console.log(message);
//   outputMessage(message);

//   // Scroll down
//   chatMessages.scrollTop = chatMessages.scrollHeight;
// });

// // Message submit
// chatForm.addEventListener('submit', e => {
//   e.preventDefault();

//   // Get message text
//   const msg = e.target.elements.msg.value;

//   // Emit message to server
//   socket.emit('chatMessage', msg);

//   // Clear input
//   e.target.elements.msg.value = '';
//   e.target.elements.msg.focus();
// });

// // Output message to DOM
// function outputMessage(message) {
//   const div = document.createElement('div');
//   div.classList.add('message');
//   div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
//   <p class="text">
//     ${message.text}
//   </p>`;
//   document.querySelector('.chat-messages').appendChild(div);
// }

// // Add room name to DOM
// function outputRoomName(room) {
//   roomName.innerText = room;
// }

// // Add users to DOM
// function outputUsers(users) {
//   userList.innerHTML = `
//     ${users.map(user => `<li>${user.username}</li>`).join('')}
//   `;
// }

const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chatMessages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const {username,room} = Qs.parse(location.search, {
  ignoreQueryPrefix:true
});

socket.emit('joinroom',{username,room});

socket.on('roomUsers',({room,users})=>{
  outputRoomName(room)
  outputUsers(users)
})
socket.on('message', (message)=>{
  console.log(message);
  outputMessage(message);
  
  
});

chatForm.addEventListener('submit', e =>{
  e.preventDefault();
  
  const msg = e.target.elements.msg.value;
  
  socket.emit('chatMessage',msg);

  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();

})

function outputMessage(message){
  const Div = document.createElement('div');
  Div.classList.add('message');
  Div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
      <p class="text">
         ${message.text}
      </p>`;

    document.querySelector('.chat-messages').appendChild(Div);
}

function outputRoomName(room) {
    roomName.innerText = room;
  }

  function outputUsers(users) {
      userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
      `;
    }
