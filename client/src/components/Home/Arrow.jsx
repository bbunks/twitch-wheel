import { useRef } from "react";
import useWindowDimensions from "../../customHooks/WindowDimensions";

function Arrow(props) {
    const containerRef = useRef(null);
    const { height, width } = useWindowDimensions();
    const ArrowHeight = containerRef.current
        ? containerRef.current.clientHeight
        : 0;

    let left = -1000;

    if (containerRef.current) {
        if (props.spinning) {
            left = props.right - containerRef.current.width.baseVal.value;
        } else {
            left = -containerRef.current.width.baseVal.value;
        }
    }

    let arrowStyle = {
        zIndex: 100,
        position: "fixed",
        left: left + "px",
        top: height / 2 - ArrowHeight / 2 + "px",
        transitionDuration: ".5s",
    };

    console.log(
        containerRef.current ? containerRef.current.width.baseVal.value : 0
    );
    return (
        <svg
            viewBox="0 0 448 512"
            width="10em"
            height="10em"
            style={arrowStyle}
            ref={containerRef}
        >
            <path
                xmlns="http://www.w3.org/2000/svg"
                stroke="white"
                strokeWidth="15"
                d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
            />
        </svg>
    );
}

export default Arrow;
