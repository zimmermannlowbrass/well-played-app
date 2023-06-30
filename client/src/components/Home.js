import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";


function Home({ users, onLogin }){

    const [showPasword, setShowPassword] = useState(false)
    const history = useHistory()

    const formik = useFormik({
        initialValues: {
          email:"",
          password:""
        },
        onSubmit: (values) => {
            for (const user of users) {
                if (user.email === values.email) {
                    if (user.password === values.password) {
                        console.log('Welcome back!')
                        onLogin(user)
                        history.push('/dashboard')
                    } else {
                        console.log('Wrong password')
                    }
                }
            }
        },
      });
    
    return(
        <div>
            <h1>Welcome to WellPlayed!</h1>
            <h3>Manhattan's premire playground social network</h3>
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
                <label htmlFor="Email">Email</label>
                <br />
                <input
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                />
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input
                type={showPasword ? null : "password"}
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                />
                <button type="button" onClick={() =>setShowPassword(!showPasword)}>
                    {showPasword ? "hide password" : "view password"}
                </button>
                <br />
                <button type="submit">Submit</button>
            </form>
            <NavLink to="/signup"><button>Register New User</button></NavLink>
        </div>
    )
}

export default Home;