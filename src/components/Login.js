import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import imgpath from "../assets/notepic.jpg";
import { motion } from "framer-motion";

const Login = (props) => {
  let history = useHistory();
  
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    //input mei value typed ho sake,jaise jaise value change ho vese-vese note me set ho jaye
  };

  const goToSignup = () => {
    history.push("/signup");
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://notes-next-backend.vercel.app:/api/auth/login`, {
    // const response = await fetch(`http://localhost:8999/api/auth/login`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success === true) {
      //storing the authtoken
      localStorage.setItem("token", json.authToken);
      props.showAlert("User logged in successfully", "info");
      history.push("/");
    } else {
      props.showAlert("invalid Credentials", "danger");
    }
    console.log(json);
  };

  return (
    <motion.div className="container" id="manku" animate={{scale:[0.5,1]}} transition={{times:[0.1,0.4], ease:'easeInOut'}}>
      <div id="picturebody">
        <img src={imgpath} alt="note-pic" width="100%" />
      </div>
      <div id="loginbody">
        <div className="mt-3">
          <h2 className="my-3"> Login to continue</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                aria-describedby="emailHelp"
                onChange={onChange}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
            </div>
            <div className="d-grid gap-2 my-5 col-6 mx-auto">
              <button type="submit" className="btn btn-success ">
                Log In
              </button>
            </div>
            <hr />
            <div className="mb-3 text-center">
              <div id="emailHelp" className="form-text center my-3">
                Didn't have an account ?
              </div>
              <div className="d-grid gap-2 my-3 col-6 mx-auto">
                <button onClick={goToSignup} className="btn btn-success ">
                  SignUp Here !
                </button>
              </div>
            </div>
          </form>
          <div className="text-center my-5" id="bottom-text">
            mynotebook
        </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
