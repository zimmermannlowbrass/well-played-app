import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";

function Home({ onLogin, users, user, onSignOut }){

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
                    fetch("/logins", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(values),
                    })
                      .then((r) => r.json())
                      .then(user => {
                          onLogin(user)
                          history.push('/dashboard')
                      });
                  } else {
                      console.log('Wrong password')
                  }
              }
          }
      },
    });
  
  if (user) {
    return(
      <Dashboard user = {user} onSignOut = {onSignOut}/>
    )
  }

  return(
      <div>
          <h1 className="textBox">Welcome to WellPlayed!</h1>
          <h3 className="textBox">Manhattan's premire playground social network</h3>
          <form onSubmit={formik.handleSubmit}>
              <label className="textBox" htmlFor="Email">Email</label>
              <input
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              />
              <br />
              <br />
              <label className="textBox" htmlFor="password">Password</label>
              <input
              type={showPasword ? null : "password"}
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              />
              <button type="button" onClick={() =>setShowPassword(!showPasword)}>
                  {showPasword ? "hide password" : "show password"}
              </button>
              <br />
              <br />
              <button type="submit">Sign In</button>
          </form>
          <br />
          <br />
          <h3>Don't have an account yet?</h3>
          <NavLink to="/signup"><button>Register New User</button></NavLink>
      </div>
  )
}

export default Home;