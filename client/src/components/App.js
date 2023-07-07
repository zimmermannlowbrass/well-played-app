import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Dashboard from "./dashboard/Dashboard";

function App() {
  
  const [users, setUsers] = useState([])
  const [user, setUser] = useState()
 
  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then(setUsers)}, [])
  
  useEffect(() => {
    fetch("/check_session")
      .then((response) => {
        if (response.ok) {
          response.json()
          .then((user) => setUser(user))
        }})
  }, []);

  function handleLogin(user) {
    setUser(user)
  }
  function handleSignUp() {
    fetch("/users")
      .then((res) => res.json())
      .then(setUsers)
  }

  function handleUserSignOut() {
    setUser(null)
  }

  console.log(users, user)

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <SignIn 
          user = {user}
          onLogin = {handleLogin}
          onSignOut = {handleUserSignOut}
          />
        </Route>
        <Route exact path='/signup'>
          <SignUp 
          onSignUp = {handleSignUp}
          />
        </Route>
        <Route path='/dashboard'>
          <Dashboard
          user = {user}
          onSignOut = {handleUserSignOut}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
