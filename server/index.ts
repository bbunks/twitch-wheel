import { ChatUserstate, client as tmiClient } from "tmi.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import * as path from "path";
import "dotenv/config";
import { Request } from "./types/SpinnerTypes";
import { PrismaClient } from "@prisma/client";

const app = express();
const server = createServer(app);
const io = new Server(server, {});
const prisma = new PrismaClient();

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const requests: Request[] = [];

// Define configuration options
const opts = {
  identity: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  channels: ["DankFudge"],
};

io.on("connection", function (socket) {
  console.log("user connected");

  socket.emit("init", requests);

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });

  socket.on("spin", function () {
    io.emit("spin");
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

// Create a client with our options
const client = new tmiClient(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(
  channel: string,
  userstate: ChatUserstate,
  msg: string,
  self: boolean
) {
  if (self) {
    return;
  } // Ignore messages from the bot
  client.say(channel, `${userstate["display-name"]} I have added your request`);

  // Remove whitespace from chat message
  const commandSplitout = msg.trim().split(" ");
  const command = commandSplitout.shift() || [];

  // If the command is known, let's execute it
  if (command === "!r") {
    const newRequest: Request = {
      username: userstate["display-name"] || "",
      request: commandSplitout.join(" ") || "",
    };
    addRequest(newRequest);
  } else {
    console.log(`* Unknown command ${command[0]}`);
  }
}

function deleteRequest(request: Request) {
  console.log("Hello");
  const requestIndex = requests.findIndex(
    (item) => item["username"] === request.username
  );

  if (requestIndex >= 0) {
    console.log(`Deleting ${request.username}'s request`);
  } else {
    console.log(`Nothign to remove`);
  }

  io.emit("delete_request", request);

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

  io.emit("new_request", request);

  if (requestIndex >= 0) requests.splice(requestIndex, 1);
  requests.push(request);
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr: string, port: number) {
  console.log(`* Connected to ${addr}:${port}`);
}

const port = 3001;

server.listen(port, () =>
  console.log(`Twitch wheel listening at http://localhost:${port}`)
);
