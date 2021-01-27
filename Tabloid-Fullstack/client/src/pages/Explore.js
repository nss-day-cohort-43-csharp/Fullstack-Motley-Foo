import React, { useContext, useEffect, useState } from 'react';
import PostList from '../components/PostList';
import { UserProfileContext } from '../providers/UserProfileProvider';
import TagSearch from "../components/TagSearch"
import { Container, Col, Row } from "reactstrap"


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
    <>
      <Container>
        <Row>
          <Col className="col-xs-12"><TagSearch /></Col>
          <Col className="col-lg-10">
            <PostList posts={posts} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Explore;
