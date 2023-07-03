import React from "react";
import { useFormik } from "formik";

function NewPlayground({ onAddPlayground }) {
    
    const formik = useFormik({
        initialValues: {
        name: '',
        image: "https://clipartix.com/wp-content/uploads/2018/03/school-play-clipart-2018-56.gif",
        neighborhood: '',
        has_restroom: false,
        has_water_feature: false
    },
    onSubmit: (values) => {
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
        .then(data => onAddPlayground(data))
    }
})


    return(
        <div>
            <h1>Here you can add a playground!</h1>
            <form onSubmit={formik.handleSubmit}>
                <input
                type="text"
                name="name"
                placeholder="Name..."
                onChange={formik.handleChange}
                value={formik.values.name}
                />
                <br />
                <input
                type="text"
                name="image"
                placeholder="Image URL..."
                onChange={formik.handleChange}
                value={formik.values.image}
                />
                <br />
                <input
                type="text"
                name="neighborhood"
                placeholder="Neighborhood..."
                onChange={formik.handleChange}
                value={formik.values.neighborhood}
                />
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
        </div>
    )
}

export default NewPlayground;