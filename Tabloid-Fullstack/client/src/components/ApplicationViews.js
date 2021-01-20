import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Explore from "../pages/Explore";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostDetails from "../pages/PostDetails";
import CategoryManager from "../pages/CategoryManager";
import TagManager from "../pages/TagManager"
import { TagProvider } from "../providers/TagProvider"
import { PostTagProvider } from "../providers/PostTagProvider"

const ApplicationViews = () => {
  const { isLoggedIn, isAdmin } = useContext(UserProfileContext);

  const authLevel = () => {

    if (isLoggedIn && isAdmin()) {
      return (
        <>
          <TagProvider>
            <Route path="/tags">
              <TagManager />
            </Route>
          </TagProvider>
        </>)
    } else if (isLoggedIn && !isAdmin()) {
      return (<Redirect to="/" />)
    } else {
      return (<Redirect to="/login" />)
    }
  };

  return (
    <Switch>
      <Route path="/" exact>
        {isLoggedIn ? <p>Home</p> : <Redirect to="/login" />}
      </Route>
      <Route path="/explore">
        {isLoggedIn ? <Explore /> : <Redirect to="/login" />}
      </Route>

      <Route path="/post/:postId">
        <PostTagProvider>
          <TagProvider>
            {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
          </TagProvider>
        </PostTagProvider>
      </Route>

      <Route path="/categories">
        {isLoggedIn ? <CategoryManager /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      {authLevel()}
    </Switch>
  );
};

export default ApplicationViews;