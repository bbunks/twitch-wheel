import React from "react";

function Card(props) {
    const style = {
        width: "20rem",
        height: "10rem",
        backgroundColor: props.color.background,
        color: props.color.text,
        borderRadius: ".5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: ".75rem",
        transitionDuration: "1s",
    };

    if (props.large) {
        style.width = "30rem";
        style.height = "15rem";
    }
    return <div style={style}>{props.children}</div>;
}

export default Card;
