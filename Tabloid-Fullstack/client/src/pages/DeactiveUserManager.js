import React, { useEffect, useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom"
import {
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";
import DeactiveUserCard from "../components/DeactiveUserCard"
import WindowChecker from "../utils/WindowChecker";

const DeactiveUserManager = () => {
  const { isAdmin, getAllDeactiveUserProfiles, users } = useContext(UserProfileContext);
  const history = useHistory();
  const admin = isAdmin();

  useEffect(() => {
    WindowChecker();
    getAllDeactiveUserProfiles();
  }, []);


  return (
    <div className="container mt-5">
      <img
        height="100"
        src="/quill.png"
        alt="Quill Logo"
        className="bg-danger rounded-circle"
      />
      <h1>User Management</h1>
      <Button onClick={(e) => { history.push("/users") }}>Active Users</Button>
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-8 col-md-6">
          <ListGroup>
            {users.map((user) => {
              if (user.active === false) {
                return (
                  <ListGroupItem key={user.id}>
                    <DeactiveUserCard user={user} />
                  </ListGroupItem>)
              }
            })}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default DeactiveUserManager;
