import React from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import { Button, Card } from "react-bootstrap";
import Profile from "./Profile";
import './SearchAlbum.css'


export default function Player({ accessToken, trackUri }) {
    if (!accessToken) return null;
    return (
        <div className="bottom-bar">
            <SpotifyWebPlayer
                token={accessToken} />
            showSaveIcon
            uris={trackUri ? [trackUri] : []}
        </div>
    );
}