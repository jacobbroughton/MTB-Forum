import "./App.css";
import axios from "axios";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ForumPostPage from "./pages/ForumPostPage";
import ThreadFeed from "./pages/ThreadFeed";
import ForumWrapper from "./pages/ForumWrapper";
import SingleThread from "./pages/SingleThread";
import { useUser } from "./contexts/user";

function App() {
  const { user } = useUser();

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forum/:categoryUrl/:id">
            <ForumWrapper forumView={"single"} />
          </Route>

          <Route path="/forum/:categoryUrl">
            <ForumWrapper forumView={"category"} />
          </Route>

          <PrivateRoute path="/post/:category">
            <ForumPostPage />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <Profile />
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
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
