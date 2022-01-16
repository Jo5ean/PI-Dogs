import React from "react";
import { Link } from "react-router-dom";
import '../styles/Landing.css';


export default function Landing(){
    return (
        <div className="landing">
            <Link to="/home">
                <button className="button"><h1><span>Home</span></h1></button>
            </Link>
        </div>
    )
}