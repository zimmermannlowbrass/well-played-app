import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";

function App() {
  
  const [users, setUsers] = useState([]);
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
    useEffect(() => {
    console.log("FETCH! ");
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
            <Home />
        </Route>
        <Route exact path='/signup'>
          <SignUp 
          />
        </Route>
        <Route exact path='/signin'>
          <SignIn 
          users = {users}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
