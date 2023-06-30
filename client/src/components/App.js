import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import SignUp from "./SignUp";
import Home from "./Home";
import Dashboard from "./dashboard/Dashboard";

function App() {
  
  const [users, setUsers] = useState([])
  const [user, setUser] = useState()
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  useEffect(() => {
    console.log("FETCH! ")
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
      })
    }, [])

  function handleLogin(user) {
    setUser(user)
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
            <Home 
            users = {users}
            onLogin = {handleLogin}/>
        </Route>
        <Route exact path='/signup'>
          <SignUp 
          />
        </Route>
        <Route path='/dashboard'>
          <Dashboard
          user = {user}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
