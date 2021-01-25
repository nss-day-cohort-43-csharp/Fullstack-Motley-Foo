import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import './MyPosts.css';

const MySubs = ({ subs }) => {
  console.log("line 6", subs);

  const GetAllPosts = () => {
    const posts = [];
    if (subs.length >= 0) {
      subs.map(sub => {
        fetch(`/api/post/getbyuser/${sub.providerUserProfileId}`)
          .then((res) => res.json())
          .then((resp) => {
            console.log("resp", resp)
            for (const p of resp) {
              posts.push(p)
            }
          })
      })
      console.log("posts", posts)
      return (<PostList posts={posts} />)
    }
    else {
      return (<div>fhdgfjkdsf</div>)
    }
  }

  return (
    <div className="row">
      <h1 className="myposts-title">My Subscriptions</h1>
      <div className="col-lg-2 col-xs-12"></div>

      <div className="col-lg-10 col-xs-12 myposts-posts">

        <GetAllPosts />
      </div>
    </div>
  );
};

export default MySubs;