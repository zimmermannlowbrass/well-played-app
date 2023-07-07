import React from "react";
import { NavLink } from "react-router-dom";

import "../../stylesheets/NavBar.css"

function NavBar() {

    const linkStyles = {
        display: "inline-block",
        width: "200px",
        padding: "12px",
        margin: "0 6px 6px",
        background: "black",
        textDecoration: "none",
        color: "white",
        fontWeight: 'bold'
      };


    return (
        // <div style={{display: 'flex', justifyContent: 'center'}}>
        <div>
            <NavLink className="btn-three" to="/dashboard/profile" style={linkStyles} activeStyle={{background: "rgb(113, 100, 170)",}} >Profile</NavLink>
            <NavLink className="btn-three" to="/dashboard/history" style={linkStyles} activeStyle={{background: "rgb(113, 100, 170)",}} >History</NavLink>
            <NavLink className="btn-three" to="/dashboard/addcheckin" exact style={linkStyles} activeStyle={{background: "rgb(113, 100, 170)",}} >Add a CheckIn</NavLink>
            <NavLink className="btn-three" to="/dashboard/addnewplayground" exact style={linkStyles} activeStyle={{background: "rgb(113, 100, 170)",}} >Add a Playground</NavLink>
            <NavLink className="btn-three" to="/dashboard/suggestion" exact style={linkStyles} activeStyle={{background: "rgb(113, 100, 170)",}} >Suggestion</NavLink>
        </div>
    )
}

export default NavBar;