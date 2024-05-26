import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import imgpath from "../assets/notepic.jpg";
import { motion } from 'framer-motion';

const Signup = (props) => {

    let history = useHistory();

    const [credentials, setCredentials] = useState({name:"", email:"", password:"",confmpassword:""});

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        //input mei value typed ho sake,jaise jaise value change ho vese-vese note me set ho jaye
      };

      const goToLogin = () => {
        history.push("/login")
      }

      const handleSubmit = async(e) => {
        e.preventDefault();
         const response = await fetch('https://notes-next-backend.vercel.app:/api/auth/createuser', {
                  
        // const response = await fetch('http://localhost:8999/api/auth/createuser', {

            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:credentials.name, email:credentials.email, password: credentials.password})
          });
          const json = await response.json();
          if(json.success === true){
            //storing the authtoken
            localStorage.setItem('token',json.authToken);
            history.push("/");
            console.log(json);
            props.showAlert("User registered succesfully!","info");
          } 
          else {
            props.showAlert("Invalid Credentials","danger");
          }
    }

    return (
      <motion.div className="container" id="manku" animate={{scale:[0.5,1]}} transition={{times:[0.1,0.4], ease:'easeInOut'}}>
      <div id="picturebody">
        <img src={imgpath} alt="note-pic" width="100%" />
      </div>
        <div id="loginbody">
        <div className="mt-3">
            <h2 className="my-2">Create your account here </h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} name="name" value={credentials.name} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email </label>
                    <input type="email" className="form-control" id="email" onChange={onChange} name="email" value={credentials.email} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} name="password" value={credentials.password} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="confmpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confmpassword" onChange={onChange} name="confmpassword" value={credentials.confmpassword} minLength={5} required />
                </div>
                <div className="d-grid gap-2 my-4 col-6 mx-auto">
              <button type="submit" className="btn btn-success ">
                SignUp
              </button>
            </div>
            <hr />
            <div className="mb-3 text-center">
              <div id="emailHelp" className="form-text center my-3">
                Already have an account ?
              </div>
              <div className="d-grid gap-2 my-3 col-6 mx-auto">
                <button onClick={goToLogin} className="btn btn-success ">
                   Login
                </button>
              </div>
            </div>
            </form>
            <div className="text-center my-3" id="bottom-text">
            mynotebook
        </div>
        </div>
        </div>
        </motion.div>
    )
}

export default Signup
