import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import imgpath from "../assets/notepic.jpg";
import { motion } from "framer-motion";

const Login = (props) => {
  let history = useHistory();
  
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const goToSignup = () => {
    history.push("/signup");
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://notes-next-backend.vercel.app:/api/auth/login`, {
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
      localStorage.setItem("token", json.authToken);
      props.showAlert("User logged in successfully", "info");
      history.push("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  return (
    <motion.div 
      className="container" 
      id="manku" 
      animate={{ scale: [0.5, 1] }} 
      transition={{ times: [0.1, 0.4], ease: 'easeInOut' }}
      style={{ padding: '15px' }}
    >
      <div className="row justify-content-center">
        <div className="col-md-6 col-12 mb-3">
          <img src={imgpath} alt="note-pic" className="img-fluid" />
        </div>
        <div className="col-md-6 col-12">
          <div className="mt-3">
            <h2 className="my-3 text-center">Login to continue</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={credentials.email}
                  aria-describedby="emailHelp"
                  onChange={onChange}
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={onChange}
                />
              </div>
              <div className="d-grid gap-2 my-4">
                <button type="submit" className="btn btn-success btn-block">Log In</button>
              </div>
              <hr />
              <div className="mb-3 text-center">
                <div className="form-text my-3">Don't have an account?</div>
                <div className="d-grid gap-2">
                  <button type="button" onClick={goToSignup} className="btn btn-success btn-block">Sign Up Here!</button>
                </div>
              </div>
            </form>
            <div className="text-center my-5" id="bottom-text">myNotebook</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
