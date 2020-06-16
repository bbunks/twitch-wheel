import React, { useState, useEffect, useRef } from "react";
import useStickyState from "./customHooks/StickyState";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Remote from "./components/Remote/Remote";
import io from "socket.io-client";

function App() {
    const [requests, setRequests] = useState([]);
    const [spin, setSpin] = useState(false);
    const socket = useRef(null);

    useEffect(() => {
        console.log("connected");
        socket.current = io("http://localhost:3000");
        socket.current.on("connect", () => {
            console.log("connected");
        });
        socket.current.on("init", (data) => {
            setRequests(data);
        });
        socket.current.on("spin", (data) => {
            setSpin((prev) => !prev);
        });
        socket.current.on("newRequest", (data) => {
            setRequests((prev) => {
                const filteredList = prev.filter(
                    (i) => i.username !== data.username
                );
                return [...filteredList, data];
            });
        });
    }, []);

    function sendSpin() {
        socket.current.emit("spin");
    }

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/viewer" exact>
                        <Home spin={spin} requests={requests} />
                    </Route>
                    <Route path="/remote">
                        <Remote requests={requests} sendSpin={sendSpin} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
