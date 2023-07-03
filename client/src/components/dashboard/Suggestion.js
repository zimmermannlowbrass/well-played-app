import React, { useState } from "react";

function Suggestion({ checkins, playgrounds }) {

    const [checkin, setCheckIn] = useState({})

    function handleClick() {
        const randomNumber = Math.floor(Math.random() * checkins.length)
        setCheckIn(checkins[randomNumber])
    }

    const playground = playgrounds.filter(playground => playground.id === checkin.playground_id)[0]
    
    return(
        <div>
            <h1>This is the suggestion section</h1>
            <button onClick={() => handleClick()}>Shuffle Random CheckIn</button>
            {checkin.id ? 
            <div>
                <img src={playground.image} alt={playground.name} style={{width: '200px', height: '200px'}}/>
                <p>Playground name: {playground.name}</p>
                <p>Rating: {checkin.rating}</p>
                <p>Comment: {checkin.comment}</p>
             </div> : null}
        </div>
    )
}

export default Suggestion;