import React, { useEffect, useState, useContext } from "react";
import PostList from "../components/PostList";
import TagSearch from "../components/TagSearch"
import { UserProfileContext } from "../providers/UserProfileProvider"
import { Container, Col, Row } from "reactstrap"

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  useEffect(() => {
    getToken().then((token) =>
      fetch("/api/post", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }))
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
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