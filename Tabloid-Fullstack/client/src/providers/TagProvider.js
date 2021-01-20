import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const TagContext = createContext();

export function TagProvider(props) {
  const apiUrl = "/api/tag";

  const { getToken } = useContext(UserProfileContext);
  const [tags, setTags] = useState([]);

  const getTags = () => {
    getToken().then((token) =>
      fetch(`/api/tag`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((tags) => {
          setTags(tags);
        }
        )
    );
  };

  const editTag = (tag) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/${tag.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tag),
      }
      )
    ).then(getTags);
  };

  const deactivateTag = (tag) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/${tag.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tag),
      }).then(getTags)
    )
  };

  return (
    <TagContext.Provider
      value={{
        editTag,
        deactivateTag,
        getTags,
        tags
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
}
