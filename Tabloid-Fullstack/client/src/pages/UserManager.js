import React, { useEffect, useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom"
import {
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";
import UserCard from "../components/UserCard"

const UserManager = () => {
  const { isAdmin, getAllUserProfiles, users } = useContext(UserProfileContext);
  const history = useHistory();
  //const admin = isAdmin();

  useEffect(() => {
    getAllUserProfiles()
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
      <Button onClick={(e) => { history.push("/deactive") }}>Deactive Users</Button>
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-8 col-md-6">
          <ListGroup>
            {users.map((user) => {
              if (user.active === true) {
                return (
                  <ListGroupItem key={user.id}>
                    <UserCard user={user} users={users} />
                  </ListGroupItem>)
              }
            })}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default UserManager;
