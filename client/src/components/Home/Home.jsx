import React, { useState, useEffect, useRef } from "react";
import Card from "./Card/Card";
import uuid from "uuid/v4";
import Arrow from "./Arrow";
const io = require("socket.io-client");

function Home(props) {
    const [requests, setRequests] = useState([]);
    const [currRequests, setCurrRequests] = useState([]);
    const currRequestsRef = useRef();
    currRequestsRef.current = currRequests;
    const [height, setHeight] = useState(0);
    const [spinning, setSpin] = useState(false);
    const [spinDuration, setSpinDuration] = useState(0);
    const [winner, setWinner] = useState(0);
    const [initLoad, setInitLoad] = useState(true);
    const containerRef = useRef(null);

    const colors = [
        { background: "orange", text: "black" },
        { background: "yellow", text: "black" },
        { background: "limegreen", text: "black" },
        { background: "deepskyblue", text: "black" },
        { background: "blue", text: "white" },
        { background: "rebeccapurple", text: "white" },
        { background: "red", text: "white" },
    ];
    const minArraySize = 100;
    let colorIndex = -1;

    useEffect(() => {
        const socket = io("http://localhost:3000");
        socket.on("connect", () => {
            console.log("connected");
        });
        socket.on("init", (data) => {
            setCurrRequests(data);
        });
        socket.on("spin", (data) => {
            spin();
        });
        socket.on("newRequest", (data) => {
            setCurrRequests((prev) => {
                const filteredList = prev.filter(
                    (i) => i.username !== data.username
                );
                return [...filteredList, data];
            });
        });
        setInitLoad(false);
    }, []);

    useEffect(() => {
        console.log(
            "translate(0, " +
                (spinning
                    ? -1 * winner * (height / grownRequests.length) + "px"
                    : -1 * height + "px") +
                ") Winner: " +
                winner
        );
    }, [spinning]);

    function spin() {
        setSpin((prev) => !prev);
        if (!spinning) {
            setWinner(() => Math.round(Math.random() * 30) + 7);
            setRequests([...currRequestsRef.current]);
        }
        setHeight(containerRef.current.clientHeight);
    }

    let grownRequests = [...requests];
    while (requests.length > 0 && grownRequests.length < minArraySize) {
        grownRequests = [...requests, ...grownRequests];
    }

    let style = {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        transitionDuration: (!spinning ? 0.75 : 7.5) + "s",
        transform:
            "translate(0, " +
            (spinning
                ? -1 * winner * (height / grownRequests.length) + "px"
                : -1 * height + "px") +
            ")",
        width: "465px",
    };

    const arrowStyle = {
        zIndex: 100,
        position: "fixed",
        left: spinning ? "-.5em" : "-10em",
        top: (2 * height) / grownRequests.length + "px",
        transitionDuration: ".5s",
    };
    //Shuffle the requests and truncate the list to 100

    return (
        <>
            <Arrow style={arrowStyle} />
            <div style={style} ref={containerRef}>
                {grownRequests.map((ele) => {
                    colorIndex += 1;
                    return (
                        <Card
                            key={uuid()}
                            color={colors[colorIndex % colors.length]}
                            //large={colorIndex === winner}
                        >
                            <h2>{ele.request}</h2>
                            <p>
                                {ele.username} {colorIndex}
                            </p>
                        </Card>
                    );
                })}
            </div>
        </>
    );
}

export default Home;
