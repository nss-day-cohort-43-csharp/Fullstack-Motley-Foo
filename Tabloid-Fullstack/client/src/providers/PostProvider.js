import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const PostContext = createContext();

export function PostProvider(props) {
  const apiUrl = "/api/post";

  const { getToken } = useContext(UserProfileContext);
  const [posts, setPosts] = useState([]);

  const getPostsByUserId = (id) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/getbyuser/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((posts) => {
          setPosts(posts);
        }
        )
    );
  };

  const getPostsByTagId = (id) => {
    getToken().then((token) =>
      fetch(`${apiUrl}/getbytag/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          const postsToUse = res.map(r => { return r.post })
          setPosts(postsToUse)
        }
        )
    );
  };

  return (
    <PostContext.Provider
      value={{
        getPostsByUserId,
        setPosts,
        posts,
        getPostsByTagId
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
}