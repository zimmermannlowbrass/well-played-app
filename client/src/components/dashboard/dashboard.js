import React, { useEffect, useState } from "react";
import { useHistory, Route, Switch } from "react-router-dom";

import NavBar from "./NavBar";
import CheckIn from "./CheckIn";
import History from "./History";
import Profile from "./Profile";
import Suggestion from "./Suggestion";
import NewPlayground from "./NewPlayground";


function Dashboard({ user, onSignOut }) {
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
        const not_user_checkins = checkins.filter(checkin => checkin.user_id !== user.id)
        const visited_playground_ids = user_checkins.map(checkin => checkin.playground_id)
        const visited_playgrounds = playgrounds.filter(playground => visited_playground_ids.includes(playground.id))
        const imageOfNY =  <img src="https://media.istockphoto.com/id/635703212/vector/sketch-of-new-york-city-america-child-style-drawing.jpg?s=612x612&w=0&k=20&c=hDT-Tl91okpxJdYr8hvfh4X35TWjch40aGi0sK2m4ME=" alt="Manhattan"/>

        function handleAddCheckIn() {
            fetch("/checkins")
                .then(r => r.json())
                .then(setCheckins)
        }
        function handleAddPlayground() {
            fetch("/playgrounds")
            .then(r => r.json())
            .then(setPlaygrounds)
        }

        function handleDeleteCheckIn(delete_checkin) {
            fetch(`/checkins/${delete_checkin.id}`, {
                method : "DELETE"
                })
            .then(() =>{
                const filtererd_checkins = checkins.filter(checkin => checkin.id !== delete_checkin.id)
                setCheckins(filtererd_checkins)
            })
        }

        return (
            <div>
                <h1 className="textBox">Welcome to WellPlayed!</h1>
                <h3 className="textBox">Manhattan's premiere playground social network</h3>
                <h1 className="textBox">Welcome {user.name}!</h1>
                <NavBar />
                <Switch>
                    <Route exact path="/dashboard">
                        <div><h1>You have been logged in!</h1><br/>{imageOfNY}</div>
                    </Route>
                    <Route path="/dashboard/profile">
                        <Profile user={user} onSignOut={onSignOut}/>
                    </Route>
                    <Route path="/dashboard/history">
                        <History user_checkins={user_checkins} visited_playgrounds={visited_playgrounds} onDeleteCheckIn={handleDeleteCheckIn}/>
                    </Route>
                    <Route path="/dashboard/checkin">
                        <CheckIn user={user} playgrounds={playgrounds} onCheckIn={handleAddCheckIn}/>
                    </Route>
                    <Route path="/dashboard/addnewplayground">
                        <NewPlayground onAddPlayground={handleAddPlayground}/>
                    </Route>
                    <Route path="/dashboard/suggestion">
                        <Suggestion checkins={not_user_checkins} playgrounds={playgrounds}/>
                    </Route>
                </Switch>
                {window.location.href === 'http://localhost:4000/' ? <div><h1>Nice to see you again!</h1><br/>{imageOfNY}</div> : null}
            </div>
        )
    }
}


export default Dashboard;