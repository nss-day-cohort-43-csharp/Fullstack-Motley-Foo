import React, { useEffect, useState, useContext } from 'react';
import PostList from '../components/PostList';
import './MyPosts.css';
import { UserProfileContext } from '../providers/UserProfileProvider';

const UnapprovedPosts = () => {
  const [posts, setPosts] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  useEffect(() => {
    getToken()
      .then((token) =>
        fetch(`/api/post/UnapprovedPosts`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, []);

  return (
    <div className="row">
      <h1 className="myposts-title">Unapproved Posts</h1>
      <div className="col-lg-2 col-xs-12"></div>

      <div className="col-lg-10 col-xs-12 myposts-posts">
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default UnapprovedPosts;
