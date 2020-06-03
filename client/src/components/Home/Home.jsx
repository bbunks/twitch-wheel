import React, { useState, useEffect } from "react";
const io = require("socket.io-client");

function Home(props) {
    const [requests, setRequests] = useState([], "requests");

    useEffect(() => {
        const socket = io("http://localhost:3000");
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
            {requests.map((ele) => {
                return (
                    <div key={ele.username}>
                        <h2>{ele.username}</h2>
                        <p>{ele.request}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default Home;
