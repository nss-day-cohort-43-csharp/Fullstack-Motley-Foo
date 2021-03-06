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

  const getActiveTags = () => {
    getToken().then((token) =>
      fetch(`/api/tag/active/`, {
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

  const getTagById = (id) => {
    return getToken().then((token) =>
      fetch(`/api/tag/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
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
        tags,
        setTags,
        getTagById,
        getActiveTags
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
}
