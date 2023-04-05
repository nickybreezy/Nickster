import React, {useEffect} from "react";
import {Button, Container} from "react-bootstrap";
import Profile from "./Profile";

const CLIENT_ID = "99e8f40ff31e4773afd9025afb9d63c2";
const CLIENT_SECRET = "a0c007ed7ada4e0aa5eabfeb02a6ffc9";
/*export const authEndpoint = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/searchsongs";*/
const REDIRECT_URI = "http://localhost:3000";
const ENCODED_REDIRECT_URI = encodeURIComponent(REDIRECT_URI);

const AUTH_URL =
    `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${ENCODED_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

/*
const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=99e8f40ff31e4773afd9025afb9d63c2&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
*/


export default function Login() {
    return (

        <div className="d-flex justify-content-center align-items-center">
            <a className="btn btn-success btn-lg" href={AUTH_URL}>
                Login With Spotify
            </a>
        </div>
    )
}