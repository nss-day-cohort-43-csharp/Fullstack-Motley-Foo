import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const PostContext = createContext();

export function PostProvider(props) {
  const apiUrl = "/api/post";

  const { getToken } = useContext(UserProfileContext);
  const [posts, setPosts] = useState([]);

  const getPostsByUserId = (id) => {
    fetch(`/api/post/getbyuser/${id}`)
      .then((res) => res.json())
      .then((resp) => {
        setPosts(resp);
      });
  };

  return (
    <PostContext.Provider
      value={{
        getPostsByUserId,
        setPosts,
        posts
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
}