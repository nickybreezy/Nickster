import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import {useState, useEffect} from "react";
import Home from './Home'
import Login from "./Login";
import SearchAlbum from "./SearchAlbum";
import Profile from "./Profile";
import {Route, Link, Router, BrowserRouter, Routes} from "react-router-dom";
import Title from './Title';
import React from 'react';
import Library from './Library';
import Player from './Player';
import logo from './logo.svg';
import Sidebar from './sidebar';
import "./fonts/Warownia.otf";
import './sidebar.css';
import SearchSongs from "./SearchSongs";
import Dashboard from "./Dashboard";

const CLIENT_ID = "99e8f40ff31e4773afd9025afb9d63c2";
const CLIENT_SECRET = "a0c007ed7ada4e0aa5eabfeb02a6ffc9";
const code = new URLSearchParams(window.location.search).get('code')

function App() {
    return (
        code ? <SearchSongs code={code}/> : /*<Login/>*/
            <div className="App">
                <Title/>
                <div className="box">

                    <BrowserRouter>
                        <Sidebar/>
                        <Routes className="routes">
                            <Route path="/" element={<Home/>}/>
                            <Route exact="true" path="/login" element={<Login/>}/>
                            <Route exact="true" path="/library" element={<Library/>}/>
                            <Route exact="true" path="/searchsongs" element={<SearchSongs/>}/>
                            <Route exact="true" path="/searchalbum" element={<SearchAlbum/>}/>
                            <Route exact="true" path="/profile" element={<Profile/>}/>
                        </Routes>

                    </BrowserRouter>


                </div>

            </div>
    );
}

export default App;
