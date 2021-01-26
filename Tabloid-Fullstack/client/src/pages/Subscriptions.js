import React, { useContext, useEffect, useState } from "react";
import { SubscriptionContext } from "../providers/SubscriptionProvider"
import MySubs from "./MySubs";


const Subscriptions = () => {
  const { subs, getSubsByUser } = useContext(SubscriptionContext);

  useEffect(() => {
    getSubsByUser()
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