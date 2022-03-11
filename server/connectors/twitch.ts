import { ChatUserstate, Client, client as tmiClient } from "tmi.js";

const opts = {
  identity: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  channels: ["DankFudge"],
};

// Create a client with our options
const client = new tmiClient(opts);

//onMessage Callbacks
type MeassageListener = (
  channel: string,
  userstate: ChatUserstate,
  message: string,
  client: Client
) => void;

let onMessageListeners: {
  id: number;
  callback: MeassageListener;
}[] = [];
function runMessageListeners(
  channel: string,
  userstate: ChatUserstate,
  message: string,
  self: boolean
): void {
  if (message.slice(0, 2) === "!w" && !self) {
    onMessageListeners.forEach((ele) => {
      ele.callback(channel, userstate, message.slice(3), client);
    });
  }
}

let messageListnerIndex = 1;
export function addMessageListener(callback: MeassageListener) {
  onMessageListeners.push({
    id: messageListnerIndex,
    callback: callback,
  });
  messageListnerIndex += 1;
}

export function removeMessageListener(index: number) {
  onMessageListeners = onMessageListeners.filter((ele) => index !== ele.id);
}

//onConnect Callbacks
type ConnectListener = (address: string, port: number, client: Client) => void;

let onConnectListeners: { id: number; callback: ConnectListener }[] = [];
function runConnectListeners(address: string, port: number): void {
  onConnectListeners.forEach((ele) => {
    ele.callback(address, port, client);
  });
}

let connectListnerIndex = 1;
export function addConnectListener(callback: ConnectListener) {
  onConnectListeners.push({
    id: connectListnerIndex,
    callback: callback,
  });
  connectListnerIndex += 1;
}

export function removeConnectListener(index: number) {
  onConnectListeners = onConnectListeners.filter((ele) => index !== ele.id);
}

addConnectListener(function (address: string, port: number): void {
  console.log(`* Connected to ${address}:${port}`);
});

// Called every time the bot connects to Twitch chat

export function initTwitch() {
  // Register our event handlers (defined below)
  client.on("message", runMessageListeners);
  client.on("connected", runConnectListeners);

  // Connect to Twitch:
  client.connect();
}
