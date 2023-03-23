import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

function Profile() {
    const [token, setToken] = useState("");
    const [data, setData] = useState({});

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"));
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
                setData(response.data);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    // Clear token and redirect to login
                    localStorage.removeItem("accessToken");
                    window.location.href = "/login";
                } else {
                    console.log(error.response);
                }
            });
    };
    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        console.log("storedToken:", storedToken);
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);


    return <Button onClick={handleGetPlaylists}>View my Playlists</Button>;
}

export default Profile;
