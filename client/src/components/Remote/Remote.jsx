import React, { useEffect, useState } from "react";
const io = require("socket.io-client");

function Remote(props) {
    return (
        <div>
            <button onClick={props.sendSpin}>Spin</button>
            <ul>
                {props.requests.map((request) => {
                    return (
                        <li>
                            <h2>{request.request}</h2>
                            <p>{request.username}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Remote;
