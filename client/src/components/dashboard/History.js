import React from "react";

function History({ user_checkins, visited_playgrounds, onDeleteCheckIn }){

    const star = '⭐'
    const happy = '👼 YES!'
    const angry = '🤬 no.'

    function handleDelete(checkin){
        onDeleteCheckIn(checkin)
    }

    const checkins = user_checkins.map(checkin => {
        const playground = visited_playgrounds.filter(playground => playground.id === checkin.playground_id)[0]
        let stars = ''
        for (let n = 0; n < checkin.rating; n++) {
            stars += star
        }
        return(
            <div className="checkInContainer" key={user_checkins.indexOf(checkin)}>
                <h3>{playground.name} -  {stars} - <button onClick={() => handleDelete(checkin)}>Delete checkIn</button></h3>
                <img className="playgroundImage" src={playground.image} alt={playground.name}/>
                <p>{checkin.comment}</p>
                <p>Water Feature: {playground.has_water_feature ? happy : angry}</p>
                <p>Restrooms: {playground.has_restroom ? happy : angry}</p>
            </div>
        )
    })


    return(
        <div>
            {checkins}
        </div>
    )
}

export default History;