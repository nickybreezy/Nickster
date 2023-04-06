import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card} from "react-bootstrap";
import Player from "./Player";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

function Profile() {
    const [token, setToken] = useState("");
    const [data, setData] = useState([]);
    const [error, setError] = useState("");


    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleGetPlaylists = () => {
        axios
            .get(PLAYLISTS_ENDPOINT, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            })
            .then((response) => {
                setData(response.data.items);
                setError("");
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    // Clear token and redirect to login
                    localStorage.removeItem("accessToken");
                    window.location.href = "/login";
                } else {
                    setError("Failed to fetch playlists.");
                }
            });
    }
    //console.log(data);
    const handlePlayPlaylist = (playlistId) => {
        axios
            .get(
                `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=1&offset=0`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            )
            .then((response) => {
                const track = response.data.items[0].track;
                const audioElement = new Audio(track.preview_url);
                audioElement.play();
            })
            .catch((error) => {
                console.log(error);
            });
    };


    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        console.log("storedToken:", storedToken);
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);


    return (
        <>
            <Button onClick={handleGetPlaylists}>View my Playlists</Button>
            <div className="d-flex flex-wrap justify-content-center mt-3">
                {data.map((playlist) => (
                    <Card key={playlist.id} className="m-2" style={{width: "18rem"}}>
                        <Card.Img variant="top" src={playlist.images[0].url}/>
                        <Card.Body>
                            <Card.Title>{playlist.name}</Card.Title>
                            <Button onClick={() => handlePlayPlaylist(playlist.id)}>
                                Play
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <div><Player/></div>
            {error && <p>{error}</p>}
        </>
    );
}

export default Profile;
