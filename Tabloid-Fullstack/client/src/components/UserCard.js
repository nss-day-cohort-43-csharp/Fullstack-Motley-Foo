import React, { useState, useContext } from "react";
import { Card, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import formatDate from "../utils/dateFormatter";
import { UserProfileContext } from "../providers/UserProfileProvider"
import { useHistory } from "react-router-dom"

const UserCard = ({ user, users }) => {
  const history = useHistory();
  const [pendingDelete, setPendingDelete] = useState(false);
  const [pendingChange, setPendingChange] = useState(false);
  const { deactivateUser, restrictSelf, isAdmin } = useContext(UserProfileContext);
  const loggedInUserSting = localStorage.getItem("userProfile");
  const loggedInUser = JSON.parse(loggedInUserSting);





  const changeUserActivation = () => {
    user.Active = false;
  }

  const changeUserType = () => {
    let admins = []
    users.map((profile) => {
      if (profile.userTypeId === 1 && profile.active === true) {
        admins.push(profile)
      }
    })

    if (user.userTypeId === 1) {
      if (admins.length <= 1) {
        alert("This action would result in a loss of all admins. You must first designate a new admin before attempting this.")
        setPendingChange(false);
      }
      else {
        if (loggedInUser.id !== user.id) {
          user.userTypeId = 2
          deactivateUser(user);
          setPendingChange(false);
        }
        if (loggedInUser.id === user.id) {
          user.userTypeId = 2
          restrictSelf(user);
          setPendingChange(false);

          loggedInUser.userTypeId = 2
          console.log(loggedInUser)
          const userToSet = JSON.stringify(loggedInUser)
          localStorage.setItem("userProfile", userToSet)
          history.go("/explore")

        }
      }
    }
    else if (user.userTypeId == 2) {
      user.userTypeId = 1
      deactivateUser(user);
      setPendingChange(false);
    }
  }

  const ImageCard = () => {
    if (user.imageLocation === null) {
      return (
        <div
          className="user-summary__img"
          style={{
            backgroundImage: `url('https://build.dfomer.com/wp-content/uploads/2016/04/dummy-post-horisontal-thegem-blog-default.jpg')`,
          }}
        ></div>
      )
    }
    else {
      return (
        <div
          className="user-summary__img"
          style={{
            backgroundImage: `url(${user.imageLocation})`,
          }}
        ></div>
      )
    }
  }

  return (
    <>
      <Card className="user-summary__card">
        <div className="row">
          <div className="col-lg-3 col-sm-12">
            <ImageCard />
          </div>
          <div className="col-sm-12 py-3 text-left">
            <div className="mt-2 ml-4 text-center">
              <h2>{user.displayName}</h2>
            </div>
            <div className="text-justify ml-4">{user.firstName} {user.lastName}</div>
          </div>
          <div className="col-lg-6 col-sm-12 text-left">
            <p className="ml-4 text-info">Type: {user.userType.name}</p>
            <p className="ml-4">
              Created on {formatDate(user.createDateTime)}
            </p>
          </div>
          <Button
            className="btn btn-danger"
            onClick={(e) => setPendingDelete(true)}
          >
            Deactivate
            </Button>
          <Button
            className="btn btn-warning"
            onClick={(e) => setPendingChange(true)}
          >
            Change Type
            </Button>
        </div>
      </Card>
      {/* DELETE CONFIRM MODAL */}
      <Modal isOpen={pendingDelete}>
        <ModalHeader>Deactivate {user.displayName}?</ModalHeader>
        <ModalBody>
          Are you sure you want to deactivate this user?
        </ModalBody>
        <ModalFooter>
          <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
          <Button className="btn btn-outline-danger" onClick={(e) => {
            changeUserActivation();
            deactivateUser(user);
            setPendingDelete(false);
            Modal.isOpen = { pendingDelete }
          }}>Yes, Deactivate</Button>
        </ModalFooter>
      </Modal>
      {/* DELETE CONFIRM MODAL */}
      <Modal isOpen={pendingChange}>
        <ModalHeader>Change {user.displayName}'s user type?</ModalHeader>
        <ModalBody>
          Are you sure you want to change this user's privileges?
        </ModalBody>
        <ModalFooter>
          <Button onClick={(e) => setPendingChange(false)}>No, Cancel</Button>
          <Button className="btn btn-outline-danger" onClick={(e) => {
            changeUserType();
            deactivateUser(user);
            setPendingChange(false)
            Modal.isOpen = { pendingChange }
          }}>Yes, Change</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UserCard;