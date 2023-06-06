import './App.css';
import './SearchAlbum.css'
import { useMediaQuery } from 'react-responsive';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import { Route, Link, Router, BrowserRouter, Routes } from "react-router-dom";
import axios from "axios";
import { saveAs } from 'file-saver';

const CLIENT_ID = "99e8f40ff31e4773afd9025afb9d63c2";
const CLIENT_SECRET = "a0c007ed7ada4e0aa5eabfeb02a6ffc9";


function SearchSongs() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);


    useEffect(() => {
        //API access token
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
    }, [])

    //Search
    async function search() {
        console.log("Search for " + searchInput);
        // Get request using search to get the Track IDs
        var searchParameters = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
        };
        var searchUrl = "https://api.spotify.com/v1/search?q=" + searchInput + "&type=track&limit=10";
        var trackIDs = await fetch(searchUrl, searchParameters)
            .then((response) => response.json())
            .then((data) => {
                return data.tracks.items.map((item) => item.id);
            });

        // Get request using the Track IDs to get the Track Details
        var trackDetails = await Promise.all(
            trackIDs.map(async (trackID) => {
                var trackParameters = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + accessToken,
                    },
                };
                var response = await fetch("https://api.spotify.com/v1/tracks/" + trackID, trackParameters);
                var data = await response.json();
                return data;
            })
        );

        console.log("Track Details", trackDetails);

        // Update the tracks state with the search result
        setTracks(trackDetails);

    }
    const isMobile = useMediaQuery({ maxWidth: 869 }); // Set the breakpoint for mobile devices

    async function downloadSong(trackId) {
        console.log("Download song with track ID: " + trackId);

        const url = `https://api.spotify.com/v1/tracks/${trackId}`;
        const config = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };

        try {
            const response = await axios.get(url, config);
            const data = response.data;
            const audioBlob = await fetch(data.preview_url).then(r => r.blob()); // Convert audio URL to blob
            const trackName = data.name;
            saveAs(audioBlob, `${trackName}.mp3`);
            alert(`Song "${trackName}" has been downloaded successfully!`);
        } catch (error) {
            console.error(error);
        }
    }

    const handlePlayTrack = (trackId) => {
        axios
            .get(`https://api.spotify.com/v1/tracks/${trackId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                },
            })
            .then((response) => {
                const track = response.data;
                const previewUrl = track.preview_url;

                if (!previewUrl) {
                    console.log("Preview not available");
                    return;
                }

                const audioElement = new Audio(previewUrl);

                if (audioElement.paused) {
                    audioElement.play();
                } else {
                    audioElement.pause();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const spotifyApi = new SpotifyWebApi({
        clientId: CLIENT_ID,
    });

    return (
        <div className="SearchAlbum">
            <h1 style={{ color: "white" }}>
                Search any song you like!
            </h1>

            <div className="search-container">
                <InputGroup className="mb-3 d-flex flex-grow-1">
                    <FormControl
                        placeholder="Search For Songs"
                        type="input"
                        onKeyPress={(event) => {
                            if (event.key == "Enter") {
                                search();
                            }
                        }}
                        onChange={(event) => setSearchInput(event.target.value)}
                    ></FormControl>
                    <Button onClick={search}>Search</Button>
                </InputGroup>
            </div>

            <Row className={`mx-2 ${isMobile ? '' : 'row-cols-4'}`}>
                {tracks.map((track, i) => {
                    return (
                        <Card key={i} >
                            {<Card.Img src={track.album.images[0].url} />}
                            <Card.Body className="custom-card-body">

                                <Card.Title>{track.name}</Card.Title>
                                <Button className="custom-button" onClick={() => handlePlayTrack(track.id)} >
                                    ▶
                                </Button>
                                <Button className="custom-button" onClick={() => downloadSong(track.id)}>Download ⬇️</Button>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Row>
        </div>

    );

}

export default SearchSongs;
