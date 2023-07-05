import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

function Profile({ user, onSignOut }){
    const history = useHistory()
    const [canEdit, setCanEdit] = useState(false)
    const [showPasword, setShowPassword] = useState(false)


    function handleSubmit(e) {
       e.preventDefault()
       const value = e.target[0].value
       if (user.password === value) {
        setCanEdit(true)
       } else {
        alert('Incorrect Password!')
       }
    }

    const cannotEditProfilePage = <div className="profileContainer">
        <form className='cardContainer' onSubmit={handleSubmit}>
            <h2>Password</h2>
            <input type={showPasword ? null : "password"}></input>
            <button type="button" onClick={() =>setShowPassword(!showPasword)}>
                {showPasword ? "hide password" : "show password"}
            </button>
            <br />
            <br />
            <button>Unlock Profile</button>
        </form>
        <h4>Name: {user.name}</h4>
        <h4>Rank: {user.rank}</h4>
        <h4>Age: {user.age}</h4>
        <h4>Email: {user.email}</h4>
    </div>

    const formSchema = yup.object().shape({
        name: yup.string().required("Name is required.").typeError("Please make sure you are only using letters!").max(100),
        email: yup.string().email().required("Email is required.").typeError("Please enter a valid email"),
        age: yup.number().positive().integer().typeError("Please enter a number").max(99).min(18),
        password: yup.string().required("Password is required.").min(8, "Password is too short - should be 8 chars minimum"),
      });
    
    function passwordHasNumber(password) {
    for (const x of password) {
        if (parseFloat(x)) {
        return true
        }
    }
    alert('Password needs to have a number!')
    return false
    }

    const formik = useFormik({
        initialValues: {
        name: user.name,
        age: user.age,
        email: user.email,
        password: user.password,
        rank: user.rank
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
        values.age = parseInt(values.age)
        if (passwordHasNumber(values.password)) {
            setCanEdit(false)
            console.log(values)
            fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
            })
            .then(r => r.json())
            .then(window.location.reload())
        }
        },
    })

    const canEditProfilePage = <div>
        <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            <label htmlFor="name">Name</label>
            <br />
            <input
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            />
            <p style={{ color: "red" }}> {formik.errors.name}</p>

            <label htmlFor="age">Age</label>
            <br />
            <input
            id="age"
            name="age"
            onChange={formik.handleChange}
            value={formik.values.age}
            />
            <p style={{ color: "red" }}> {formik.errors.age}</p>

            <label htmlFor="email">Email</label>
            <br />
            <input
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            />
            <p style={{ color: "red" }}> {formik.errors.email}</p>

            <label htmlFor="password">Password</label>
            <br />
            <input
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            />
            <p style={{ color: "red" }}> {formik.errors.password}</p>

            <button type="submit">Submit</button>
        </form>
    </div>

    function handleSignOut() {
        fetch("/logout", {
        method: "DELETE",
        })
        .then(() => onSignOut())
        .then(history.push('/'))
    }

    return(
        <div>
            <p>Enter your password below to unlock and change your information!</p>
            {canEdit ? canEditProfilePage : cannotEditProfilePage}
            <br/>
            <br/>
            <button onClick={() =>handleSignOut()}>Sign Out</button>
        </div>
    )
}

export default Profile;