import "./App.css";
import { useState,useContext } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import themeContext from "./context/themes/themeContext";

function App() {

  const [alert, setAlert] = useState(null);
  const contextForThemes = useContext(themeContext);
  const { theme } = contextForThemes;


  const showAlert = (message, type) => {
    setAlert({msg: message, type:type});
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  let bgColor = 'white';
  if(theme.light) {
    bgColor ='white';
  } 
  else if(theme.dark) {
    bgColor = '#2d2d2d';
  }
  else if(theme.anotherDark || theme.rainbow) {
    bgColor = 'black';
  }
  else if(theme.darkTeal) {
    bgColor = '#045b62'
  }
  



  return (
    <>
      <NoteState>
        <div style={{backgroundColor:bgColor, paddingBottom:'150px'}}>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert} />
              </Route>
              <Route exact path="/about">
                <About  />
              </Route>
              <Route exact path="/login" >
                <Login showAlert={showAlert}/>
              </Route>
              <Route exact path="/signup">
                <Signup showAlert={showAlert} />
              </Route>
            </Switch>
          </div>
        </Router>
        </div>
      </NoteState>
    </>
  );
}
//#00ff50;

export default App;
