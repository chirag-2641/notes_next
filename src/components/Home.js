import { useContext } from "react";
import Notes from "./Notes";
import themeContext from "../context/themes/themeContext";

const Home = (props) => {
  const contextForThemes = useContext(themeContext);
  const { theme } = contextForThemes;
  let noteStyle = {
    backgroundColor: "white",
    color: "black",
  };

  if (theme.light) {
    noteStyle = { backgroundColor: "white", color: "black" };
  } else if (theme.dark) {
    noteStyle = {
      backgroundColor: "#2d2d2d",
      color: "whitesmoke",
    };
  } else if (theme.anotherDark) {
    noteStyle = {
      backgroundColor: "black",
      color: "#00c548",
    };
  } else if (theme.darkTeal) {
    noteStyle = {
      backgroundColor: "#045b62",
      color: "white",
    };
  }
    else if(theme.rainbow) {
      noteStyle = {
        backgroundColor: "black",
        color: "black"
      }
    }
  

  return (
    <div style={noteStyle}>
      <Notes showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
