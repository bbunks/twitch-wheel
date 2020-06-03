const tmi = require("tmi.js");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const auth = require("./password.json");

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const requests = [];

const updateClientsProcesses = [];
const updateClients = (newRequest) => {
    console.log("Updating Client");
    updateClientsProcesses.forEach((func) => func(newRequest));
};

const addClient = (updateFunction) => {
    updateClientsProcesses.push(updateFunction);
};

// Define configuration options
const opts = {
    identity: {
        username: auth.username,
        password: auth.password,
    },
    channels: ["DankFudge"],
};

io.on("connection", function (socket) {
    console.log("user connected");

    socket.emit("init", requests);

    socket.on("disconnect", function () {
        console.log("user disconnected");
    });
});

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) {
        return;
    } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandSplitout = msg.trim().split(" ");
    const command = commandSplitout.shift();

    // If the command is known, let's execute it
    if (command === "!request") {
        request = null;
        requests.forEach((item) => {
            if (item["username"] === context["display-name"]) {
                request = item;
            }
        });

        let newRequest = {
            username: context["display-name"],
            request: commandSplitout.join(" "),
        };
        io.emit("newRequest", newRequest);

        if (request !== null) {
            client.say(
                target,
                `${context["display-name"]} I have updated your request`
            );

            requests[
                requests.findIndex((ele) => request.username === ele.username)
            ] = {
                ...newRequest,
            };

            console.log(
                `Updating ${
                    context["display-name"]
                }'s request, ${commandSplitout.join(" ")}`
            );
        } else {
            client.say(
                target,
                `${context["display-name"]} I have added your request`
            );
            requests.push(newRequest);

            console.log(`Adding a request, ${commandSplitout.join(" ")}`);
        }
    } else {
        console.log(`* Unknown command ${command[0]}`);
    }
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

const port = 3000;

http.listen(port, () =>
    console.log(`Twitch wheel listening at http://localhost:${port}`)
);
