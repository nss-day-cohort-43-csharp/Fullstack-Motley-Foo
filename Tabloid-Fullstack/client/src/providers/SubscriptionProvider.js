import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const SubscriptionContext = createContext();

export function SubscriptionProvider(props) {
  const apiUrl = "/api/subscription";

  const { getToken, getCurrentUser } = useContext(UserProfileContext);
  const [subs, setSubs] = useState([]);
  const userId = getCurrentUser().id;

  const getSubsByUser = () => {
    getToken().then((token) =>
      fetch(`${apiUrl}/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((subs) => {
          setSubs(subs);
        }
        )
    );
  };

  const addSub = (sub) => {
    getToken().then((token) =>
      fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sub),
      }).then(getSubsByUser)
    );
  };

  const updateSub = (sub) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/${sub.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sub),
      }
      )
    ).then(getSubsByUser);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        getSubsByUser,
        subs,
        setSubs,
        addSub,
        updateSub
      }}
    >
      {props.children}
    </SubscriptionContext.Provider>
  );
}
