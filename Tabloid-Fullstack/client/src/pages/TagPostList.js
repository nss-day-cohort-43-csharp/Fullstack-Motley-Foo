import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../providers/PostProvider"
import { useParams } from 'react-router-dom';
import PostList from "../components/PostList"

const TagPostList = () => {
  const { posts, getPostsByTagId } = useContext(PostContext);
  const { tagId } = useParams();

  useEffect(() => {
    getPostsByTagId(tagId)
  }, []);

  for (const post of posts) {
    post.authorName = post.userProfile.displayName
  }

  return (
    <div className="row" >
      <div className="col-lg-2 col-xs-12"></div>
      <div className="col-lg-10 col-xs-12">
        <PostList posts={posts} />
      </div>
    </div >
  );
};

export default TagPostList;