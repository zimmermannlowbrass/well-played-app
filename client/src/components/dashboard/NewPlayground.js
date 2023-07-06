import React, { useState} from "react";
import * as yup from "yup";
import { useFormik } from "formik";

function NewPlayground({ onAddPlayground }) {

    const [hasURL, setHasURL] = useState(true)
    const [submitted, setSubmitted] = useState(false)

    const formSchema = yup.object().shape({
        name: yup.string().required("Name is required.").typeError("Please make sure you are only using letters!").max(100),
        neighborhood: yup.string().required("Neighborhood is required.").typeError("Please make sure you are only using letters!").max(100),
    });

    const formik = useFormik({
        initialValues: {
        name: '',
        image: '',
        neighborhood: '',
        has_restroom: false,
        has_water_feature: false
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
        if (!hasURL) {
        values.image = "https://clipartix.com/wp-content/uploads/2018/03/school-play-clipart-2018-56.gif"
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
                    <br />
                    <p>Neighborhood</p>
                    <input
                    type="text"
                    name="neighborhood"
                    placeholder="Neighborhood..."
                    onChange={formik.handleChange}
                    value={formik.values.neighborhood}
                    />
                    <p style={{ color: "red" }}> {formik.errors.neighborhood}</p>
                    <br />
                    <p>Image Link</p>
                    <button type="button" onClick={() => setHasURL(!hasURL)}>{hasURL ? 'Need an image?' : 'Don\'t need an image?'}</button>
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
                    value="https://clipartix.com/wp-content/uploads/2018/03/school-play-clipart-2018-56.gif"
                    />}
                    <br />
                    {/* <input
                    type="text"
                    name="has_restroom"
                    placeholder="Has a restroom?"
                    onChange={formik.handleChange}
                    value={formik.values.has_restroom}
                    />
                    <br />
                    <input
                    type="text"
                    name="has_water_feature"
                    placeholder="Has a water feature?"
                    onChange={formik.handleChange}
                    value={formik.values.has_water_feature}
                    /> */}
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

export default NewPlayground;