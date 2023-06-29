import React from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";

function App() {
  // Code goes here!

  // const [playgrounds, setPlaygrounds] = useState([])

  // useEffect(() => {
  //   fetch('/playgrounds')
  //   .then(r => r.json())
  //   .then(setPlaygrounds)
  // }, [])

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
            <Home />
        </Route>
        <Route exact path='/signup'>
          <SignUp />
        </Route>
        <Route exact path='/signin'>
          <SignIn />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
