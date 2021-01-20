import React from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";

const PostTagCard = ({ postTag }) => {
  return (
    <div>{postTag.tag.name} <button>x</button></div>
  );
};

export default PostTagCard;