import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import SignUp from "./SignUp";
import Home from "./Home";
import Dashboard from "./dashboard/Dashboard";

function App() {
  
  const [users, setUsers] = useState([])
  const [user, setUser] = useState()
 
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
  function handleSignUp(newUser) {
    setUsers([...users, newUser])
  }

  console.log(users)

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Home 
          onLogin = {handleLogin}
          />
        </Route>
        <Route exact path='/signup'>
          <SignUp 
          onSignUp= {handleSignUp}
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
