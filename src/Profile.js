import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Row } from "react-bootstrap";
import './SearchAlbum.css'
import { useMediaQuery } from 'react-responsive';

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists?limit=50";

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


    const handleAddPlaylist = (playlist) => {
        const data = {
            id: playlist.id,
            name: playlist.name,
            description: playlist.description,
        };

        console.log('Data:', data);

        fetch('http://localhost:3001/addPlaylist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Playlist added:', data);
            })
            .catch((error) => {
                console.error('Error adding playlist:', error);
                alert('Error adding playlist');
            });
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        console.log("storedToken:", storedToken);
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const isMobile = useMediaQuery({ maxWidth: 869 });
    return (
        <>
            <Button onClick={handleGetPlaylists}>View my Playlists</Button>
            <Row className={`mx-1 ${isMobile ? '' : 'row-cols-4'} g-4`}>
                {data.map((playlist) => (
                    <Col>
                        <Card key={playlist.id} className="custom-card" >
                            <Card.Img variant="top" src={playlist.images[0].url} />
                            <Card.Body>
                                <Card.Title>{playlist.name}</Card.Title>
                                <div className="d-flex justify-content-between">
                                    <Button className="custom-button" onClick={() => handlePlayPlaylist(playlist.id)}>
                                        Play
                                    </Button>
                                    <Button className="custom-button" onClick={() => handleAddPlaylist(playlist)}>+</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                ))}
            </Row>
            {error && <p>{error}</p>}
        </>
    );
}

export default Profile;
