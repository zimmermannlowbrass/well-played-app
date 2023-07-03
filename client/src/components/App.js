import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";


import SignUp from "./SignUp";
import Home from "./Home";
import Dashboard from "./dashboard/Dashboard";

function App() {
  
  const [users, setUsers] = useState([])
  const [user, setUser] = useState()
  const history = useHistory()
 
  useEffect(() => {
    console.log("FETCH! ")
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
      })
    }, [])
  
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
  function handleSignUp(newUser) {
    setUsers([...users, newUser])
  }

  console.log(users, user)

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Home 
          user = {user}
          onLogin = {handleLogin}
          users = {users}
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
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
