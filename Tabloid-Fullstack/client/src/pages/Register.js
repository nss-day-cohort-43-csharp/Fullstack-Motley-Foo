import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Login.css";
import "./Register.css"

const Register = () => {
  const { register } = useContext(UserProfileContext);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const history = useHistory();

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
    localStorage.setItem("image", image)

    setImageLoading(false)
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const imageLocation = localStorage.getItem("image")
    const profile = {
      firstName,
      lastName,
      displayName,
      email,
      imageLocation
    };
    register(profile, password)
      .then((user) => {
        setLoading(false);
        toast.info(`Welcome ${user.displayName}`);
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Invalid email");
      });
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="avatar bg-primary">
          <img src="/quill.png" alt="Avatar" />
        </div>
        <h2 className="text-center">User Register</h2>
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
        <div className="form-group">
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            className="form-control"
            name="firstName"
            placeholder="First Name"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            className="form-control"
            name="lastName"
            placeholder="Last Name"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setDisplayName(e.target.value)}
            type="text"
            className="form-control"
            name="displayName"
            placeholder="Display Name"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            required="required"
          />
        </div>
        <div className="form-group">
          <Input
            onChange={(e) => setConfirm(e.target.value)}
            type="password"
            className="form-control"
            name="confirmPassword"
            placeholder="Confirm Password"
            required="required"
          />
        </div>
        <div className="form-group">
          <Button type="submit" block color="danger" disabled={loading}>
            Sign Up
          </Button>
        </div>
        <div className="text-center small">
          Already have an account?
          <div>
            <Link to="/login">Log in here</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
