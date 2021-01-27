import React from "react";
import PostList from "../components/PostList";

const MySubs = ({ subs }) => {
  for (const sub of subs) {
    for (const post of sub.providerUserProfile.post) {
      post.authorName = sub.providerUserProfile.displayName
    }
  }

  return (
    <div>
      {subs.map((sub) => (
        <div className="col-lg-10 col-xs-12 myposts-posts">
          <PostList posts={sub.providerUserProfile.post.filter(p => p.isApproved === true)} />
        </div>
      ))}
    </div>
  );
};

export default MySubs;
