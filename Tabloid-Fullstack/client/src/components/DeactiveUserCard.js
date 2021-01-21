import React, { useState, useContext } from "react";
import { Card, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import formatDate from "../utils/dateFormatter";
import { UserProfileContext } from "../providers/UserProfileProvider"

const DeactiveUserCard = ({ user }) => {

  const [pendingDelete, setPendingDelete] = useState(false);
  const { activateUser } = useContext(UserProfileContext);

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
            Activate
            </Button>
        </div>
      </Card>
      {/* DELETE CONFIRM MODAL */}
      <Modal isOpen={pendingDelete}>
        <ModalHeader>Reactivate {user.displayName}?</ModalHeader>
        <ModalBody>
          Are you sure you want to reactivate this user?
        </ModalBody>
        <ModalFooter>
          <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
          <Button className="btn btn-outline-danger" onClick={(e) => {
            activateUser(user);
            setPendingDelete(false);
            Modal.isOpen = { pendingDelete }
          }}>Yes, Reactivate</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default DeactiveUserCard;
