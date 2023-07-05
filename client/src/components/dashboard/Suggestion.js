import React, { useState } from "react";

function Suggestion({ checkins, playgrounds }) {

    const [checkin, setCheckIn] = useState({})
    const star = '⭐'

    function handleClick() {
        const randomNumber = Math.floor(Math.random() * checkins.length)
        setCheckIn(checkins[randomNumber])
    }

    const playground = playgrounds.filter(playground => playground.id === checkin.playground_id)[0]
    let stars = ''
    for (let n = 0; n < checkin.rating; n++) {
        stars += star
    }
    
    return(
        <div>
            <h3>Curious on what else is happening in the area?</h3>
            <h3>See what other people are saying near you!</h3>
            <button onClick={() => handleClick()}>Shuffle Random CheckIn</button>
            <br/>
            <br/>
            {checkin.id ? 
            <div className="suggestionContainer">
                <br/>
                <img src={playground.image} alt={playground.name} style={{width: '200px', height: '200px'}}/>
                <p>Playground name: {playground.name}</p>
                <p>Rating: {checkin.rating} - {stars}</p>
                <p>Comment: {checkin.comment}</p>
             </div> 
             : null}
        </div>
    )
}

export default Suggestion;