import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

function CheckIn({ user, playgrounds, onCheckIn }){

    const star = '★'
    const happy = '👼 YES!'
    const angry = '🤬 no.'
    const [playgroundID, setplaygroundID] = useState('')
    const [submitted, setSubmitted] = useState('')

    function handleClick(ID) {
        setSubmitted('')
        if (playgroundID !== ID) {
            setplaygroundID(ID)
        }
    }
    const formSchema = yup.object().shape({
        rating: yup.number().required("Rating is required.").min(1).max(5),
        comment: yup.string().required("Comment is required.").min(1).max(250),
    });

    const formik = useFormik({
        initialValues: {
        rating: '',
        comment: '',
        user_id: user.id,
        playground_id: playgroundID
    },
    validationSchema: formSchema,
    onSubmit: (values, {resetForm}) => {
        values.rating = parseInt(values.rating)
        values.playground_id = playgroundID
        fetch("/checkins", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(values)
        })
        .then(r => r.json())
        .then(() => onCheckIn())
        .then(() => setSubmitted(playgroundID))
        resetForm()
        }
    })

    let stars = ''
    for (let n = 0; n < formik.values.rating; n++) {
        stars += star
    }

    const checkInForm = <form onSubmit={formik.handleSubmit}>
        <p>Comment:</p>
        <input
        type="text"
        name="comment"
        placeholder="Comment here"
        onChange={formik.handleChange}
        value={formik.values.comment}
        />
        <p>Rating:</p>
        <h2 style={{color: 'violet'}}>{stars}</h2>
        <br />
        <input
        type="radio"
        name="rating"
        onChange={formik.handleChange}
        value='1'
        />
        <input
        type="radio"
        name="rating"
        onChange={formik.handleChange}
        value='2'
        />
        <input
        type="radio"
        name="rating"
        onChange={formik.handleChange}
        value='3'
        />
        <input
        type="radio"
        name="rating"
        onChange={formik.handleChange}
        value='4'
        />
        <input
        type="radio"
        name="rating"
        onChange={formik.handleChange}
        value='5'
        />
        <button type="submit">Submit</button>
    </form>

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
                {(playground.id === playgroundID) && (!submitted) ? checkInForm : null}
                {playground.id === submitted ? <p style={{color: 'red'}}>Submitted!</p> : null}
            </div>
        )
    })

    return(
        <div>
            <p>Which park did you visit?</p>
            <p>Click on the image!</p>
            {playground_choices}
        </div>

    )
}

export default CheckIn;