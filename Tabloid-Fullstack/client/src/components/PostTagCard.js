import React, { useContext } from "react";

const PostTagCard = ({ postTag }) => {
  return (
    <div>{postTag.tag.name}</div>
  );
};

export default PostTagCard;