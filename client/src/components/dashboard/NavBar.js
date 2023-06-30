import React from "react";
import { NavLink } from "react-router-dom";

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
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <NavLink to="/dashboard/profile" style={linkStyles} activeStyle={{background: "rgb(70, 42, 7)",}} >Profile</NavLink>
            <NavLink to="/dashboard/history" style={linkStyles} activeStyle={{background: "rgb(70, 42, 7)",}} >History</NavLink>
            <NavLink to="/dashboard/checkin" exact style={linkStyles} activeStyle={{background: "rgb(70, 42, 7)",}} >Add a CheckIn</NavLink>
            <NavLink to="/dashboard/suggestion" exact style={linkStyles} activeStyle={{background: "rgb(70, 42, 7)",}} >Suggestion</NavLink>
        </div>
        </div>
    )
}

export default NavBar;