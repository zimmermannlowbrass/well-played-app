import React from "react";
import { Switch, Route } from "react-router-dom";
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
      </Switch>
    </div>
  )
}

export default App;
