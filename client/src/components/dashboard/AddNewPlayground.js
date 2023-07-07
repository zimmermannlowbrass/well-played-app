import React, { useState} from "react";
import * as yup from "yup";
import { useFormik } from "formik";

import "../../stylesheets/AddNewPlayground.css"

function AddNewPlayground({ onAddPlayground }) {

    const [hasURL, setHasURL] = useState(true)
    const [submitted, setSubmitted] = useState(false)
    const playgroundImageClipArt = "https://clipartix.com/wp-content/uploads/2018/03/school-play-clipart-2018-56.gif"

    const formSchema = yup.object().shape({
        name: yup.string().required("Name is required.").typeError("Please make sure you are only using letters!").max(100),
        neighborhood: yup.string().required("Neighborhood is required.").typeError("Please make sure you are only using letters!").max(100),
        image: yup.string().required("Image is required. Feel free to use ours!"),

    });

    const formik = useFormik({
        initialValues: {
        name: '',
        image: '',
        neighborhood: '',
        has_restroom: '',
        has_water_feature: ''
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
        if (!hasURL) {
        values.image = "https://clipartix.com/wp-content/uploads/2018/03/school-play-clipart-2018-56.gif"
        }
        if (values.has_restroom === 'Yes') {
            values.has_restroom = true
        } else {
            values.has_restroom = false
        }
        if (values.has_water_feature === 'Yes') {
            values.has_water_feature = true
        } else {
            values.has_water_feature = false
        }
        console.log(values)
        fetch("/playgrounds", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(values)
        })
        .then(r => r.json())
        .then(() => onAddPlayground())
        setSubmitted(!submitted)
        }
    })

    function handleChange() {
        setHasURL(!hasURL)
        formik.errors.image = ''
        if (formik.values.image !== playgroundImageClipArt) {
            formik.values.image = playgroundImageClipArt
        } else {
            formik.values.image = ''
        }
    }

    return(
        <div>
            {submitted ? 
            <div>
                <h2>Thanks for submitting!</h2>
                <button onClick={() => setSubmitted(!submitted)}>Submit a new playground</button>
            </div>
            :
            <div>
                <p>What playground would you like to add?</p>
            <div className="addPlaygroundContainer">
                <form onSubmit={formik.handleSubmit}>
                    <p>Name</p>
                    <input
                    type="text"
                    name="name"
                    placeholder="Name..."
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    />
                    <p style={{ color: "red" }}> {formik.errors.name}</p>
                    <p>Neighborhood</p>
                    <input
                    type="text"
                    name="neighborhood"
                    placeholder="Neighborhood..."
                    onChange={formik.handleChange}
                    value={formik.values.neighborhood}
                    />
                    <p style={{ color: "red" }}> {formik.errors.neighborhood}</p>
                    Does your playground:
                    <br />
                    have a bathroom? -
                    <input
                    type="radio"
                    name="has_restroom"
                    onChange={formik.handleChange}
                    value='Yes'
                    />
                    Yes
                    <input
                    type="radio"
                    name="has_restroom"
                    onChange={formik.handleChange}
                    value='No'
                    />
                    No
                    <br />
                    have a water feature? -
                    <input
                    type="radio"
                    name="has_water_feature"
                    onChange={formik.handleChange}
                    value='Yes'
                    />
                    Yes
                    <input
                    type="radio"
                    name="has_water_feature"
                    onChange={formik.handleChange}
                    value='No'
                    />
                    No
                    <br />
                    <p>Image Link</p>
                    <button type="button" onClick={() => handleChange()}>{hasURL ? 'Need an image?' : 'Don\'t need an image?'}</button>
                    <br />
                    {hasURL ? <input
                    type="text"
                    name="image"
                    placeholder="Image URL..."
                    onChange={formik.handleChange}
                    value={formik.values.image}
                    /> : <input
                    readOnly
                    style={{background: 'grey'}}
                    type="text"
                    name="image"
                    onChange={formik.handleChange}
                    value={formik.values.image}
                    />}
                    <p style={{ color: "red" }}> {formik.errors.image}</p>
                    <br />
                    <button type="submit">Submit</button>
                </form>
                <br />
            </div>
            </div>
            }
            
    </div>
    )    
}

export default AddNewPlayground;