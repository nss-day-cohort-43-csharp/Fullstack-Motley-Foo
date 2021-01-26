import React, { useEffect, useState, useContext } from "react";
import "./PostForm.css";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { useHistory, useParams } from "react-router-dom";

const PostEdit = () => {
    const [categories, setCategories] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const history = useHistory();
    const { postId } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        getCategories()
        getPost()
    }, []);

    const verifyUser = (data) => {
        const user = JSON.parse(localStorage.getItem('userProfile'));
        if (data.post.userProfileId !== user.id) {
            history.push("/myposts")
        }
    }

    const getPost = () => {
        getToken().then((token) => {
            fetch(`/api/post/${postId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setPost(data.post);
                    verifyUser(data)
                })
        });
    }

    const getCategories = () => {
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
    }

    const defaultCategoryName = () => {
        if (categories && post) {
            const thisCategory = categories.find((category) => {
                return post.categoryId === category.id
            })
            if (thisCategory !== undefined) {
                return thisCategory.name
            }
        }
    }

    const updatePost = (post) => {
        post.userProfile = null
        getToken().then((token) => {
            fetch(`/api/post/${post.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            })
                .then(history.push(`/myposts`))
        })
    }

    const handleControlledInputChange = (event) => {
        post[event.target.id] = event.target.value
    }

    const handleClickSubmitPost = (event) => {
        event.preventDefault()
        const user = JSON.parse(localStorage.getItem('userProfile'));
        if (user == null) {
            history.push("/login")
        }
        else {
            post.categoryId = parseInt(post.categoryId)
            updatePost(post)
        }
    }

    return (
        <section className="new-post-form-container">
            <div className="new-post-form-area">
                <h2 className="new-post-form-title">Edit Post</h2>
                <form id="newPostForm">
                    <fieldset>
                        <div className="form-group">
                            <label className="new-post-label" htmlFor="newTitle">Title</label>
                            <input type="text" defaultValue={post.title} className="newTitle" id="title" name="newTitle" onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label className="new-post-label" htmlFor="newImg">Image Location</label>
                            <input type="text" defaultValue={post.imageLocation} className="newImg" id="imageLocation" name="newImg" onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label className="new-post-label" htmlFor="newCategoryId">Category</label>
                            <select className="newCategoryId" id="categoryId" name="newCategoryId" onChange={handleControlledInputChange}>
                                <option value={post.categoryId}>{defaultCategoryName()} </option>
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
                            <textarea className="newBody" defaultValue={post.content} id="content" name="newBody" onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <button className="submitNewPostBtn" onClick={handleClickSubmitPost}> Save Edit </button>
                </form>
            </div>
        </section>
    );
};

export default PostEdit;