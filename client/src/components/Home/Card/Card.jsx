import React from "react";

function Card(props) {
    const style = {
        width: "320px",
        height: "160px",
        backgroundColor: props.color.background,
        color: props.color.text,
        borderRadius: ".5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "12px",
        transitionDuration: "1s",
        textAlign: "center",
    };

    if (props.large) {
        style.width = "30rem";
        style.height = "15rem";
    }
    return (
        <div style={style} ref={props.forwardRef}>
            <h2>{props.request}</h2>
            <p>
                {props.username} {props.colorIndex}
            </p>
        </div>
    );
}

export default Card;
