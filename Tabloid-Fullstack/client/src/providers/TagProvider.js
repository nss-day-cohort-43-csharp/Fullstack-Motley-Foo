import React, { createContext, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const TagContext = createContext();

export function TagProvider(props) {
  const apiUrl = "/api/tag";

  const { getToken } = useContext(UserProfileContext);

  const editTag = (tag) => {
    // getToken().then((token) =>
    fetch(`${apiUrl}/${tag.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tag),
    }
      //)
    );
  };

  const deleteTag = (tag) => {
    // getToken().then((token) =>
    fetch(`${apiUrl}/${tag.id}`, {
      method: "DELETE",
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    })
    //)
  };

  return (
    <TagContext.Provider
      value={{
        editTag,
        deleteTag
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
}
