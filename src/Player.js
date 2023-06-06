import React from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import { Button, Card } from "react-bootstrap";
import Profile from "./Profile";


export default function Player({ accessToken, trackUri }) {
    if (!accessToken) return null;
    return (
        <>
            <h1>Player</h1>

        </>

    )

}