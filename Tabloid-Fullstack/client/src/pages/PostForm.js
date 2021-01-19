import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Jumbotron } from "reactstrap";
import PostReactions from "../components/PostReactions";
import formatDate from "../utils/dateFormatter";
import "./PostForm.css";

const PostForm = () => {


    //   useEffect(() => {
    //     fetch(`/api/post/${postId}`)
    //       .then((res) => {
    //         if (res.status === 404) {
    //           toast.error("This isn't the post you're looking for");
    //           return;
    //         }
    //         return res.json();
    //       })
    //       .then((data) => {
    //         setPost(data.post);
    //         setReactionCounts(data.reactionCounts);
    //       });
    //   }, []);

    //if (!post) return null;

    return (
        <div className="new-post-form-container">
            <section className="new-post-form-area">



                <h2 className="new-post-form-title">Create A New Post</h2>
                <form id="newPostForm">

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="newTitle">Title</label>
                            <input type="text" id="title" name="newTitle" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="newImg">Image Location</label>
                            <input type="text" id="imageLocation" name="newImg" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="newBody">Body</label>
                            <textarea className="newContent" id="content" name="newBody" />
                        </div>
                    </fieldset>
                </form>



            </section>
        </div>
    );
};

export default PostForm;
