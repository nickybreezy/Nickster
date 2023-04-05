import React from "react";
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import useAuth from "./useAuth";

function SearchSongs({code}) {
    const accessToken = useAuth(code)
    return (
        <div className="d-flex justify-content-center align-items-center">
            {code}
        </div>


    );
}


export default SearchSongs;