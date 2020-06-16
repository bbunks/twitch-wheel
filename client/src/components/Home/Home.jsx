import React from "react";
import Arrow from "./Arrow";
import Spinner from "./Spinner/Spinner";
//const io = require("socket.io-client");

function Home(props) {
    //Shuffle the requests and truncate the list to 100

    return (
        <>
            <Spinner requests={props.requests} spinning={props.spin} />
        </>
    );
}

export default Home;
