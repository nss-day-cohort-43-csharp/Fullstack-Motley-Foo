import React, { useContext, useEffect, useState } from 'react';
import PostList from '../components/PostList';
import { UserProfileContext } from '../providers/UserProfileProvider';

const Explore = () => {
  const { getToken } = useContext(UserProfileContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getToken().then((token) => {
      fetch('/api/post', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((posts) => {
          setPosts(posts);
        });
    });
  }, []);

  return (
    <div className="row">
      <div className="col-lg-2 col-xs-12"></div>
      <div className="col-lg-10 col-xs-12">
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default Explore;
