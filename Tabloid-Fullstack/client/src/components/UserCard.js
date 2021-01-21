import React from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import formatDate from "../utils/dateFormatter";

const UserCard = ({ user }) => {

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
    <Card className="user-summary__card">
      <div className="row">
        <div className="col-lg-3 col-sm-12">
          <ImageCard />
        </div>
        <div className=" col-sm-12 py-3">
          <div>
            <h2>{user.displayName}</h2>
          </div>
          <p className="text-justify mx-5">{user.firstName} {user.lastName}</p>
        </div>
        <div className="col-lg-4 col-sm-12 mt-2 py-3 text-left">
          <p className="ml-5 text-info">Type: {user.userType.Name}</p>
          <p className="ml-5">
            Created on {formatDate(user.createDateTime)}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
