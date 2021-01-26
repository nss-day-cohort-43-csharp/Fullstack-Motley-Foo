import React, { useEffect, useState, useContext } from "react";
import { Badge } from 'reactstrap';
import './PostReaction.css';
import { UserProfileContext } from "../providers/UserProfileProvider";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostReactions = ({ postReactions }) => {
  const { getToken } = useContext(UserProfileContext);
  const { postId } = useParams();
  const user = JSON.parse(localStorage.getItem('userProfile'));
  const [reactionCounts, setReactionCounts] = useState(postReactions);

  useEffect(() => {
    refreshReactions()
  }, []);

  const refreshReactions = () => {
    getToken().then((token) => {
      fetch(`/api/post/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 404) {
            toast.error("This isn't the post you're looking for");
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (data !== undefined) {
            setReactionCounts(data.reactionCounts);
          }
        });
    })
  }

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
      refreshReactions()
    })
  }

  return (
    <div className="center">
      {reactionCounts.map((postReaction) => (
        <div key={postReaction.reaction.id} className="d-inline-block mx-2">
          <Badge
            pill
            className="p-2 border border-dark post-reaction__pill"
            title={postReaction.reaction.name}
          >
            <div id={postReaction.reaction.id} onClick={(event) => (createReaction(event))}>{postReaction.reaction.emoji} {postReaction.count}</div>
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default PostReactions;
