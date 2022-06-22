import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import CreateStudio from "./components/CreateStudio";
import Login from "./components/Login";
import Auth from "./components/Auth";
import MyPage from "./components/MyPage";
import TitlePage from "./components/TitlePage";
import NavBar from "./components/NavBar";





function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  console.log(user)
  console.log(isAuthenticated)

  return (
    <>
    <NavBar setIsAuthenticated={setIsAuthenticated} setUser={setUser} isAuthenticated={isAuthenticated} />
    <Switch>
      <Route exact path="/new" >
        <CreateStudio user={user} />
      </Route>
      <Route exact path="/login" >
        <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
      </Route>
      <Route exact path="/signup" >
        <Auth setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
      </Route>
      <Route exact path="/mypage">
        <MyPage user={user} />
      </Route>
      <Route exact path="/" >
        <TitlePage />
      </Route>
    </Switch>
    </>   
  );
}



export default App;
