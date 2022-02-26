import { useState, useEffect, useRef } from "react";
import useWindowDimensions from "../../../customHooks/WindowDimensions";
import Card from "../Card/Card";
import Arrow from "../Arrow";

function Spinner(props) {
  const [currRequests, setCurrRequests] = useState([]);
  const [winner, setWinner] = useState(0);
  const { height, width } = useWindowDimensions();
  const containerRef = useRef(null);
  const winnerRef = useRef(null);

  useEffect(() => {
    spin();
  }, [props.spinning]);

  function spin() {
    if (props.spinning) {
      setCurrRequests([...props.requests]);
    } else {
      setWinner(() => Math.round(Math.random() * 30) + 7);
    }
  }

  let colorIndex = -1;

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

  let grownRequests = [...currRequests];
  while (currRequests.length > 0 && grownRequests.length < minArraySize) {
    grownRequests = [...currRequests, ...grownRequests];
  }

  let containerHeight = containerRef.current
    ? containerRef.current.clientHeight
    : 0;
  //console.log(height);
  let transitionDuration;

  if (currRequests.length === 0) {
    transitionDuration = 0;
  } else if (props.spinning) {
    transitionDuration = 7.5;
  } else {
    transitionDuration = 0.75;
  }

  let style = {
    display: "flex-inline",
    flexDirection: "column",
    alignItems: "center",
    transitionDuration: transitionDuration + "s",
    transform:
      "translate(0, " +
      (props.spinning
        ? -1 * (winnerRef.current ? winnerRef.current.offsetTop : 0) +
          height / 2 -
          (winnerRef.current ? winnerRef.current.clientHeight : 0) / 2 +
          "px"
        : -1 * containerHeight + "px") +
      ")",
  };

  return (
    <>
      <Arrow
        spinning={props.spinning}
        right={winnerRef.current ? winnerRef.current.offsetLeft : 0}
      />
      <div style={style} ref={containerRef}>
        {grownRequests.map((ele, index) => {
          colorIndex += 1;
          return colorIndex === winner ? (
            <Card
              key={index}
              color={colors[colorIndex % colors.length]}
              forwardRef={winnerRef}
              request={ele.request}
              username={ele.username}
              colorIndex={colorIndex}
              large={colorIndex === winner}
            />
          ) : (
            <Card
              key={index}
              color={colors[colorIndex % colors.length]}
              request={ele.request}
              username={ele.username}
              colorIndex={colorIndex}
              large={colorIndex === winner}
            />
          );
        })}
      </div>
    </>
  );
}

export default Spinner;
