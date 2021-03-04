import './App.css';
import axios from "axios";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile"
import ForumPostPage from "./pages/ForumPostPage"
import Feed from "./pages/Feed"
import { useUser } from "./contexts/user";


function App() {

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>          
          <Route path="/feed">
            <Feed/>
          </Route>
          <PrivateRoute path="/profile">
            <Profile/>
          </PrivateRoute>
          <PrivateRoute path="/post">
            <ForumPostPage/>
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}


function PrivateRoute({ children, ...rest }) {
  let { user } = useUser();
  return (
    <Route
      {...rest}
      render={({ location }) => 
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}


export default App;
