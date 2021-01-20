import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const PostTagContext = createContext();

export function PostTagProvider(props) {
  const apiUrl = "/api/postTag";

  const { getToken } = useContext(UserProfileContext);
  const [postTags, setPostTags] = useState([]);

  const getAllPostTags = () => {
    getToken().then((token) =>
      fetch(`${apiUrl}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((postTags) => {
          setPostTags(postTags);
        }
        )
    );
  };

  const deletePostTag = (postTag) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/${postTag.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postTag),
      }).then(getAllPostTags)
    )
  };

  const addPostTag = (postTag) => {
    getToken().then((token) =>
      fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postTag),
      }).then(() => {
        getAllPostTags();
      }
      )
    );
  };

  const getPostsTags = (postId) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((postTags) => {
          setPostTags(postTags);
        }
        )
    );
  };

  return (
    <PostTagContext.Provider
      value={{
        postTags,
        getAllPostTags,
        deletePostTag,
        addPostTag,
        getPostsTags
      }}
    >
      {props.children}
    </PostTagContext.Provider>
  );
}
