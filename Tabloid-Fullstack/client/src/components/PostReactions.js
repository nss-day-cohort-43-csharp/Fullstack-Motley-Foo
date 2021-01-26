import React from 'react';
import { Badge } from 'reactstrap';
import './PostReaction.css';

const addReaction = (event) => {
  const reactionToAdd = event.target.id
  console.log(reactionToAdd)
}

const PostReactions = ({ postReactions }) => {
  return (
    <div className="center">
      {postReactions.map((postReaction) => (
        <div key={postReaction.reaction.id} className="d-inline-block mx-2">
          <Badge
            pill
            className="p-2 border border-dark post-reaction__pill"
            title={postReaction.reaction.name}
          >
            <div id={postReaction.reaction.id} onClick={(event) => (addReaction(event))}>{postReaction.reaction.emoji} {postReaction.count}</div>
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default PostReactions;
