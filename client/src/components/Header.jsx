import React from "react"
import { Link } from "react-router-dom"
import logo from "./../assets/eth.png"

import Button from "react-bootstrap/Button";

import "../styles/Header.scss";

const Header = () => (
    <>
    <nav className="Header">
        <div className="Header__nav">
            <div className="Header__nav-left">
                <ul className="Header__nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/browse">Browse</Link>
                    </li>
                </ul>
            </div>
            <div className="Header__nav-center">
                <Link to="/"><img src={logo} alt="Logo" className="Header__image"/></Link>
            </div>
            <div className="Header__nav-right">
                <Link to="/create">
                    <Button variant="outline-light" size="sm">Start a Fundraiser</Button>
                </Link>
            </div>
        </div>
    </nav>
    </>
);

export default Header