import './App.css';
import './SearchAlbum.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { useMediaQuery } from 'react-responsive';

import { InputGroup, FormControl, Button, Row, Card, Col } from 'react-bootstrap';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from 'file-saver';


const CLIENT_ID = "99e8f40ff31e4773afd9025afb9d63c2";
const CLIENT_SECRET = "a0c007ed7ada4e0aa5eabfeb02a6ffc9";


function SearchAlbum() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);

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
        console.log("Search for " + searchInput); //Taylor Swift

        // Get request using search to get the Artist ID
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }
        var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
            .then(response => response.json())
            .then(data => {
                return data.artists.items[0].id
            })
        console.log("Artist ID is " + artistID);
        //Get request with Artist ID grab all the albums from that artist
        var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAlbums(data.items);
            })
        // Display those albums to the user
        console.log(albums);
    }

    const isMobile = useMediaQuery({ maxWidth: 869 });
    return (
        <div className="SearchAlbum">
            <h1 style={{ color: 'white' }}>Search any artists you like to see their albums!</h1>

            <div className="search-container">
                <InputGroup className="mb-3 d-flex flex-grow-1">
                    <FormControl placeholder="Search For Artist" type="input" onKeyPress={event => {
                        if (event.key === "Enter") {
                            search();
                        }
                    }} onChange={event => setSearchInput(event.target.value)}>
                    </FormControl>
                    <Button onClick={search}>Search</Button>
                </InputGroup>
            </div>


            <Row className={`mx-1 ${isMobile ? '' : 'row-cols-4'} g-4`}>
                {albums.map((album, i) => {
                    console.log(album);
                    return (
                        <Col>
                            <Card className="custom-card">
                                <Card.Img src={album.images[0].url} />
                                <Card.Body className="custom-card-body">
                                    <Card.Title>
                                        {album.name}
                                    </Card.Title>
                                    <Button className="custom-button" onClick={() => {
                                        axios({
                                            url: `https://api.spotify.com/v1/albums/${album.id}/tracks`,
                                            method: 'get',
                                            headers: {
                                                'Authorization': 'Bearer ' + accessToken
                                            },
                                            responseType: 'json'
                                        })
                                            .then(response => {
                                                const trackUrl = response.data.items[0].preview_url;
                                                axios({
                                                    url: trackUrl,
                                                    method: 'get',
                                                    responseType: 'blob'
                                                })
                                                    .then(response => {
                                                        const file = new File([response.data], `${album.name}.mp3`, { type: 'audio/mp3' });
                                                        saveAs(file);
                                                    });
                                            });
                                    }}>Download</Button>
                                </Card.Body>
                            </Card> </Col>
                    )
                })}
            </Row>
        </div>
    );
}

export default SearchAlbum;
