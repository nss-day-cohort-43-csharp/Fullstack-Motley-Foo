import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext, UserProfileProvider } from "../providers/UserProfileProvider";
import Explore from "../pages/Explore";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostDetails from "../pages/PostDetails";
import CategoryManager from "../pages/CategoryManager";
import PostForm from "../pages/PostForm";
import TagManager from "../pages/TagManager"
import { TagProvider } from "../providers/TagProvider"
import MyPosts from "../pages/MyPosts"
import UserManager from "../pages/UserManager"

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
          <UserProfileProvider>
            <Route path="/users">
              <UserManager />
            </Route>
          </UserProfileProvider>
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
      <Route path="/myposts">
        {isLoggedIn ? <MyPosts /> : <Redirect to="/login" />}
      </Route>
      <Route path="/explore">
        {isLoggedIn ? <Explore /> : <Redirect to="/login" />}
      </Route>
      <Route path="/post/:postId">
        {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
      </Route>
      <Route path="/categories">
        {isLoggedIn ? <CategoryManager /> : <Redirect to="/login" />}
      </Route>
      <Route path="/newpost">
        {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
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