/** Client-side of groupchat. */

const urlParts = document.URL.split("/");
const roomName = urlParts[urlParts.length - 1];
const ws = new WebSocket(`ws://localhost:3000/chat/${roomName}`);


const name = prompt("Username?");


/** called when connection opens, sends join info to server. */

ws.onopen = function(evt) {
  console.log("open", evt);

  let data = {type: "join", name: name};
  ws.send(JSON.stringify(data));
};


/** called when msg received from server; displays it. */

ws.onmessage = function(evt) {
  console.log("onmessage called");
  let msg = JSON.parse(evt.data);
  let item;

  if (msg.type === "note") {
    item = $(`<li><i>${msg.text}</i></li>`);
      $("#messages").append(item);

  }

  else if (msg.type === "chat") {
    item = $(`<li><b>${msg.name}: </b>${msg.text}</li>`);
      $("#messages").append(item);

  } else if (msg.type === "joke") {
    console.log("else if joke called")
    item = $(`<li><b>${msg.name}: </b>${msg.text}</li>`);
    `${msg.name}.append(${item})`

  } else {
    return console.error(`bad message: ${msg}`);
  }

  // $('#messages').append(item);
};


/** called on error; logs it. */

ws.onerror = function (evt) {
  console.error(`err ${evt}`);
};


/** called on connection-closed; logs it. */

ws.onclose = function (evt) {
  console.log("close", evt);
};


/** send message when button pushed. */

$('form').submit(function (evt) {
  evt.preventDefault();

    console.log("submit called");
  let data;

  let joke = "What do you call eight hobbits? A hob-byte!";

  if ($('#m').val() === '/joke') {
    data = { type: "chat", text: joke };
    console.log('type:', data.type)
  } else {
    data = { type: "chat", text: $("#m").val() };
  }

  // let data = { type: "chat", text: $("#m").val() };

  console.log("data after if", data);

  ws.send(JSON.stringify(data));
  console.log("data after ws.send", data);
  // console.log('submit called after send')

  $('#m').val('');
});

