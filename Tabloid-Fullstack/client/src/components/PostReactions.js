import React, { useEffect, useState, useContext } from "react";
import { Badge } from 'reactstrap';
import './PostReaction.css';
import { UserProfileContext } from "../providers/UserProfileProvider";
import { useParams, useHistory } from 'react-router-dom';



const PostReactions = ({ postReactions }) => {
  const { getToken } = useContext(UserProfileContext);
  const { postId } = useParams();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('userProfile'));


  const createReaction = (event) => {
    const reactionToAdd = event.target.id
    const newReaction = {
      reactionId: parseInt(reactionToAdd),
      userProfileId: user.id,
      postId: parseInt(postId)
    }
    addReaction(newReaction)

  }

  const addReaction = (newReaction) => {
    getToken().then((token) => {
      fetch(`/api/postReaction`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newReaction)
      })
      //.then(history.go(`/post/${postId}`))
    })
  }

  return (
    <div className="center">
      {postReactions.map((postReaction) => (
        <div key={postReaction.reaction.id} className="d-inline-block mx-2">
          <Badge
            pill
            className="p-2 border border-dark post-reaction__pill"
            title={postReaction.reaction.name}
          >
            <div id={postReaction.reaction.id} onClick={(event) => (createReaction(event), postReaction.count++)}>{postReaction.reaction.emoji} {postReaction.count}</div>
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default PostReactions;
