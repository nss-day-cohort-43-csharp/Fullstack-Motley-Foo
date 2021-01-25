import React, { useContext, useEffect, useState } from "react";
import { SubscriptionContext } from "../providers/SubscriptionProvider"
import MySubs from "./MySubs";
import { UserProfileContext } from "../providers/UserProfileProvider";

const Subscriptions = () => {
  const apiUrl = "/api/subscription";
  const [subs, setSubs] = useState([]);
  const { getToken } = useContext(UserProfileContext);
  const userProfileId = JSON.parse(localStorage.getItem('userProfile')).id;

  useEffect(() => {
    getToken().then((token) =>
      fetch(`${apiUrl}/getbyuser/${userProfileId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((subs) => {
          setSubs(subs);
        })
    );
  }, []);


  return (
    <div className="row">
      <div className="col-lg-2 col-xs-12"></div>
      <div className="col-lg-10 col-xs-12">
        <MySubs subs={subs} />
      </div>
    </div>
  );
};

export default Subscriptions;