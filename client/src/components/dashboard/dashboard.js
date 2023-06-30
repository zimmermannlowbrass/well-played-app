import React, { useEffect, useState } from "react";
import { useHistory, Route, Switch } from "react-router-dom";

import NavBar from "./NavBar";
import CheckIn from "./CheckIn";
import History from "./History";
import Profile from "./Profile";
import Suggestion from "./Suggestion";


function Dashboard({ user }) {
    const history = useHistory()
    const [checkins, setCheckins] = useState([])
    const [playgrounds, setPlaygrounds] = useState([])
    useEffect(() => {
        fetch("/checkins")
            .then(r => r.json())
            .then(setCheckins)
        fetch("/playgrounds")
            .then(r => r.json())
            .then(setPlaygrounds)
    }, [])
    if (!user) {
        history.push('/')
    } else {
        const user_checkins = checkins.filter(checkin => checkin.user_id === user.id)
        const visited_playground_ids = user_checkins.map(checkin => checkin.playground_id)
        const visited_playgrounds = playgrounds.filter(playground => visited_playground_ids.includes(playground.id))
        console.log(visited_playgrounds)
        return (
            <div>
                <h1>Welcome back {user.name}!</h1>
                <NavBar />
                <Switch>
                    <Route path="/dashboard/profile">
                        <Profile />
                    </Route>
                    <Route path="/dashboard/history">
                        <History />
                    </Route>
                    <Route path="/dashboard/checkin">
                        <CheckIn />
                    </Route>
                    <Route path="/dashboard/suggestion">
                        <Suggestion />
                    </Route>
                </Switch>

            </div>
        )
    }
}


export default Dashboard;