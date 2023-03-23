import React from 'react'
import './Title.css';
import logo from "./logo.svg";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Title() {
    return (
        <Navbar className="navbar-custom" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand className="mx-auto" href="/">
                    <img
                        alt=""
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />{'  '}
                    Nickster
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Title