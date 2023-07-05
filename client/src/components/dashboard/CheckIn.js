import React, { useState } from "react";

function CheckIn({ user, playgrounds, onCheckIn }){

    const star = '☆'
    const likedStar = '★'
    const happy = '👼 YES!'
    const angry = '🤬 no.'

    const [formData, setFormData] = useState({
        rating: '',
        comment: '',
        playground_id: '',
        user_id: user.id,
    })

    function handleChange(e) {
        const type = e.target.name
        if (type === 'rating') {
            const value = parseInt(e.target.value)
            setFormData({
                ...formData , 
                rating : value
            })
        } else {
            const value = e.target.value
            setFormData({
                ...formData , 
                [type] : value
            })
        }
    }

    const form = 
        <form onSubmit={handleSubmit}>
            <input
            type='text'
            name='comment'
            required
            value = {formData.comment}
            placeholder="Comment..."
            onChange={handleChange}/>
            <button>Submit</button> 
        </form>

    const ratingBar = 
        <div>
            <button onClick={handleChange} value='0' name="rating">reset</button>
            <button onClick={handleChange} value='1' name="rating">{formData.rating  < 1 ? star : likedStar}</button>
            <button onClick={handleChange} value='2' name="rating">{formData.rating < 2 ? star : likedStar}</button>
            <button onClick={handleChange} value='3' name="rating">{formData.rating < 3 ? star : likedStar}</button>
            <button onClick={handleChange} value='4' name="rating">{formData.rating < 4 ? star : likedStar}</button>
            <button onClick={handleChange} value='5' name="rating">{formData.rating < 5 ? star : likedStar}</button>
        </div>

    function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)
        fetch("/checkins", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        .then(r => r.json())
        .then(() => onCheckIn())
    }

    function handleClick(playgroundID) {
        if (playgroundID === formData.playground_id) {
            return
        }
        setFormData({
            rating: '',
            comment: '',
            playground_id: playgroundID,
            user_id: user.id,
        })
    }

    const playground_choices = playgrounds.map(playground => {
        return (
            <div className="playgroundChoiceCards" key={playground.id}>
                <div onClick={() => handleClick(playground.id)}>
                    <br />
                    <h3 style={{fontWeight: 'bold'}}>{playground.name}</h3>
                    <img src={playground.image} alt={playground.name} style={{width: '200px', height: '200px'}}/>
                    <p>Neighborhood: {playground.neighborhood}</p>
                    <p>Water Feature: {playground.has_water_feature ? happy : angry}</p>
                    <p>Restrooms: {playground.has_restroom ? happy : angry}</p>
                </div>
                {formData.playground_id === playground.id ? ratingBar : null}
                {formData.playground_id === playground.id ? form : null}
            </div>
        )
    })

    return(
        <div>
            <h1>Which park did you visit?</h1>
            {playground_choices}
        </div>

    )
}

export default CheckIn;