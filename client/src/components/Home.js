import React from "react";
import { NavLink } from "react-router-dom";


function Home(){
    return(
        <div>
            <h1>Welcome to WellPlayed!</h1>
            <h3>Manhattan's premire playground social network</h3>
            <br/>
            <br/>
            <NavLink to="/signin"><button>Sign-In</button></NavLink>
            <NavLink to="/signup"><button>Register New User</button></NavLink>
        </div>
    )
}

export default Home;