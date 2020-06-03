import React from "react";

function EntryField(props) {
    let labelStyle = {
        padding: "1rem",
    };

    return (
        <div>
            <label style={labelStyle}>{props.label}</label>
            <input
                type={props.hideChars ? "password" : "text"}
                value={props.value}
                onChange={(e) => {
                    props.onChange(e.target.value);
                }}
            />
        </div>
    );
}

export default EntryField;
