import { addMessageListener } from "../connectors/twitch";
import { Request } from "../types/SpinnerTypes";
import { SocketIO } from "../connectors/socket";
import { ChatUserstate, Client as tmiClient } from "tmi.js";
import { Prisma } from "../connectors/prisma";

const requests: Request[] = [];

function deleteRequest(request: Request) {
  const requestIndex = requests.findIndex(
    (item) => item["username"] === request.username
  );

  if (requestIndex >= 0) {
    console.log(`Deleting ${request.username}'s request`);
  } else {
    console.log(`Nothign to remove`);
  }

  SocketIO.emit("delete_request", request);

  if (requestIndex >= 0) requests.splice(requestIndex, 1);
}

function addRequest(request: Request) {
  const requestIndex = requests.findIndex(
    (item) => item["username"] === request.username
  );

  if (requestIndex >= 0) {
    console.log(`Updating ${request.username}'s request, ${request.request}`);
  } else {
    console.log(`Adding a request, ${request.request}`);
  }

  SocketIO.emit("new_request", request);

  if (requestIndex >= 0) requests.splice(requestIndex, 1);
  requests.push(request);
}

function addSocketListners() {
  SocketIO.on("connection", function (socket) {
    console.log("user connected");

    socket.emit("init", requests);

    socket.on("disconnect", function () {
      console.log("user disconnected");
    });

    socket.on("spin", function () {
      SocketIO.emit("spin");
    });

    socket.on("add_request", function (request: Request) {
      addRequest({
        username: request.username,
        request: request.request,
      });
    });

    socket.on("delete_request", function (request: Request) {
      deleteRequest({
        username: request.username,
        request: request.request,
      });
    });
  });
}

function onMessageHandler(
  channel: string,
  userstate: ChatUserstate,
  msg: string,
  client: tmiClient
) {
  client.say(channel, `${userstate["display-name"]} I have added your request`);

  // Remove whitespace from chat message
  const commandSplitout = msg.trim().split(" ");
  const command = commandSplitout.shift() || [];

  // If the command is known, let's execute it
  if (command === "request") {
    const newRequest: Request = {
      username: userstate["display-name"] || "",
      request: commandSplitout.join(" ") || "",
    };
    addRequest(newRequest);
  } else {
    console.log(`* Unknown command ${command[0]}`);
  }
}

export function initSpinner() {
  addMessageListener(onMessageHandler);
  addSocketListners();
}
