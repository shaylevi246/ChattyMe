import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Chat from "./components/Chat/Chat";
import PrivateRoute from "./components/Routing/PrivateRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={Chat} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          <Route render={() => <h1>404 Page Not Found</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
