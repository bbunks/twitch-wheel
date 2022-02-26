function Card(props) {
  const style = {
    width: "50%",
    height: "160px",
    maxWidth: "20em",
    backgroundColor: props.color.background,
    color: props.color.text,
    borderRadius: ".5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "12px auto",
    transitionDuration: "1s",
    textAlign: "center",
  };

  if (props.large) {
    style.width = "60%";
    style.maxWidth = "30em";
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
