import EntryField from "./EntryField/EntryField";

function Login(props) {
  return (
    <div>
      <EntryField
        label="Username"
        value={props.username}
        onChange={props.setUsername}
      />
      <EntryField
        hideChars
        label="Oauth Token"
        value={props.oauthToken}
        onChange={props.setOauthToken}
      />
      <button onClick={() => props.setAuthenticated(true)}>Login</button>
      <p>
        Please get a OAuth token from{" "}
        <a href="https://twitchapps.com/tmi/" target="_blank">
          here
        </a>
      </p>
    </div>
  );
}

export default Login;
