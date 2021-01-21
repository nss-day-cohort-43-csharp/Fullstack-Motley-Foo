import React, { useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider"

const PostTagCard = ({ postTag }) => {

  const { getCurrentUser } = useContext(UserProfileContext);
  return (
    <div>{postTag.tag.name}</div>
  );
};

export default PostTagCard;