import React, { useEffect, useState } from "react";
const io = require("socket.io-client");

function Remote(props) {
    const [requests, setRequests] = useState([]);
    const [spinning, setSpin] = useState(false);
    const [winner, setWinner] = useState(0);
    const socket = io("http://localhost:3000");

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected");
        });
        socket.on("init", (data) => {
            setRequests(data);
        });
        socket.on("newRequest", (data) => {
            setRequests((prev) => {
                const filteredList = prev.filter(
                    (i) => i.username !== data.username
                );
                return [...filteredList, data];
            });
        });
    }, []);

    return (
        <div>
            <button onClick={() => socket.emit("spin")}>Spin</button>
        </div>
    );
}

export default Remote;
