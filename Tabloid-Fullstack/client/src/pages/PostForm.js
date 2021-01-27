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

    const [imageLoading, setImageLoading] = useState(false)


    const uploadImage = async e => {
        const files = e.target.files
        setImageLoading(true)
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'vugr9ics')
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dddadzenw/image/upload',
            {
                method: "POST",
                body: data
            }
        )
        const file = await res.json()
        let image = file.secure_url
        const newImage = localStorage.setItem("image", image);

        setImageLoading(false)
    }

    const submitPost = (post) => {
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
                .then(localStorage.removeItem("image"))
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






            console.log(user)
            newPost.categoryId = parseInt(newPost.categoryId)

            if (user.userTypeId === 1) {
                newPost.isApproved = 1
            }

            if (user.userTypeId === 2) {
                newPost.isApproved = 0
            }





            newPost.imageLocation = localStorage.getItem("image");
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
                            <div className='defaultImage'>
                                <img className='defaultImage' src={localStorage.image ? localStorage.image : 'https://build.dfomer.com/wp-content/uploads/2016/04/dummy-post-horisontal-thegem-blog-default.jpg'} />
                            </div>
                            {imageLoading ? (
                                <h6 className="loadingImage">Loading...</h6>
                            ) : <></>}
                            <br />
                            <label htmlFor="embedpollfileinput" className="btn btn-block btn-info">
                                Upload image
                            </label>
                            <input hidden type="file" onChange={uploadImage} className="inputfile" id="embedpollfileinput" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label className="new-post-label" htmlFor="newTitle">Title</label>
                            <input type="text" className="newTitle" id="title" name="newTitle" onChange={(e) => { handleControlledInputChange(e) }} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label className="new-post-label" htmlFor="newCategoryId">Category</label>
                            <select className="newCategoryId" id="categoryId" name="newCategoryId" onChange={(e) => { handleControlledInputChange(e) }}>
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
                            <input type="date" className="newPublishDataTime" id="publishDateTime" name="newCreateDateTime" onChange={(e) => { handleControlledInputChange(e) }} />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label className="new-post-label" htmlFor="newBody">Body</label>
                            <textarea className="newBody" id="content" name="newBody" onChange={(e) => { handleControlledInputChange(e) }} />
                        </div>
                    </fieldset>
                    <button className="submitNewPostBtn" onClick={(e) => { handleClickSubmitPost(e) }}> Submit Post </button>
                </form>
            </div>
        </section>
    );
};

export default PostForm;