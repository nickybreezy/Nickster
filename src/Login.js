import React, {useEffect} from "react";
import {Button, Container} from "react-bootstrap";
import Profile from "./Profile";

const CLIENT_ID = "99e8f40ff31e4773afd9025afb9d63c2";
const CLIENT_SECRET = "a0c007ed7ada4e0aa5eabfeb02a6ffc9";
export const authEndpoint = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "https://nickster.vercel.app/login";
const SPACE_DELIMITER = "%20";
const redirectUri = "http://localhost:3000/login";
const scopes = ["user-read-currently-playing", "user-read-playback-state"];
const SCOPES_URL_PARAM = scopes.join(SPACE_DELIMITER);

const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
        console.log(currentValue);
        const [key, value] = currentValue.split("=");
        accumulater[key] = value;
        return accumulater;
    }, {});

    return paramSplitUp;
};

const handleLogin = () => {
    window.location = `${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true}`;
}
//Q:test this with logout button
//A; it works

function handleLogout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("tokenType");
  localStorage.removeItem("expiresIn");
  window.location.reload(); 
}

<<<<<<< HEAD

const handleSwitchAccounts = () => {
  localStorage.clear();
  window.location = `${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true}`;
};

=======
    const handleSwitchAccounts = () => {
      localStorage.clear();
      window.location = `${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true}`;
    };
  
>>>>>>> 16e286138b7647e34bf6316443b989d03507f24a

function Login() {
    useEffect(() => {
        if (window.location.hash) {
            const {access_token, expires_in, token_type} = getReturnedParamsFromSpotifyAuth(window.location.hash);
            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem("expiresIn", expires_in);
        }
    }, []);
    return (
      <div className="Login">
        <h1>Kom maar inloggen!</h1>
        {localStorage.getItem("accessToken") ? (
          <div>
            <Button onClick={handleLogout}>Log Out</Button>
            <Button onClick={handleSwitchAccounts}>Switch Accounts</Button>
          </div>
        ) : (
          <Button onClick={handleLogin}>Log In</Button>
        )}
        <Profile />
      </div>
    );
  }

export default Login;
