import React, { useEffect, useState, useContext } from "react";
import "./PostForm.css";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { useHistory } from "react-router-dom";

const PostForm = () => {
    const [categories, setCategories] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const history = useHistory();

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/category`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
                .then((res) => res.json())
                .then((categories) => {
                    setCategories(categories);
                })
        );
    }, []);

    const submitPost = (post) => {
        debugger
        getToken().then((token) => {
            fetch(`/api/post`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            })
                .then((res) => res.json())
                .then((data) => history.push(`/post/${data.id}`))
        })
    }

    const newPost = {}

    const handleControlledInputChange = (event) => {
        newPost[event.target.id] = event.target.value
    }

    const handleClickSubmitPost = (event) => {
        event.preventDefault()
        const user = JSON.parse(localStorage.getItem('userProfile'));
        if (user == null) {
            history.push("/login")
        }
        else {
            newPost.categoryId = parseInt(newPost.categoryId)
            newPost.isApproved = 1
            if (isNaN(newPost.categoryId)) {
                window.alert("You must select a category for this post!")
            }
            else {
                submitPost(newPost)
            }


        }
    }

    return (
        <section className="new-post-form-container">
            <div className="new-post-form-area">
                <h2 className="new-post-form-title">Create A New Post</h2>
                <form id="newPostForm">
                    <fieldset>
                        <div className="form-group">
                            <label className="new-post-label" htmlFor="newTitle">Title</label>
                            <input type="text" className="newTitle" id="title" name="newTitle" onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label className="new-post-label" htmlFor="newImg">Image Location</label>
                            <input type="text" className="newImg" id="imageLocation" name="newImg" onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label className="new-post-label" htmlFor="newCategoryId">Category</label>
                            <select className="newCategoryId" id="categoryId" name="newCategoryId" onChange={handleControlledInputChange}>
                                <option>Select a category...</option>
                                {categories.map((category) => {

                                    return <option key={category.id} value={category.id}>{category.name}</option>
                                })}
                            </select>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label className="new-post-label" htmlFor="newPublishDateTime">Publishing Date</label>
                            <input type="date" className="newPublishDataTime" id="publishDateTime" name="newCreateDateTime" onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label className="new-post-label" htmlFor="newBody">Body</label>
                            <textarea className="newBody" id="content" name="newBody" onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <button className="submitNewPostBtn" onClick={handleClickSubmitPost}> Submit Post </button>
                </form>
            </div>
        </section>
    );
};

export default PostForm;