import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import themeContext from "../context/themes/themeContext";
import Dencrypt from "./Dencrypt";
import { AnimateSharedLayout, motion } from "framer-motion";

const AddNote = (props) => {
  const contextForNotes = useContext(noteContext);
  const { addNote } = contextForNotes;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  //const user = useParams ;
  const contextForThemes = useContext(themeContext);
  const { theme } = contextForThemes;

  //adding a new note
  function handleClick(e) {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note added successfully!", "primary");
  }

  // console.log(" user - "+user)

  const onChange = (e) => {
    //setting the value of note.title/note.description to the input value
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  let formStyle = {
    backgroundColor: "white",
    color: "black",
  };
  let inputStyle = {
    color: "white",
  };
  let buttonStyle = {
    backgroundColor: "green",
    color: "black",
    fontWeight: 500,
  };

  if (theme.light) {
    formStyle = {
      backgroundColor: "white",
      color: "black",
    };
    inputStyle = {
      color: "black",
    };
    buttonStyle = {
      backgroundColor: "green",
      color: "black",
      fontWeight: 500,
    };
  } else if (theme.dark) {
    formStyle = {
      backgroundColor: "#2d2d2d",
      color: "whitesmoke",
    };
    inputStyle = {
      color: "whitesmoke",
    };
    buttonStyle = {
      backgroundColor: "#16a938",
      color: "black",
      fontWeight: 500,
    };
  } else if (theme.anotherDark) {
    formStyle = {
      backgroundColor: "black",
      color: "#00c548",
    };
    inputStyle = {
      color: "#00c548",
    };
    buttonStyle = {
      backgroundColor: "#00c548",
      color: "black",
      fontWeight: 500,
    };
  } else if (theme.darkTeal) {
    formStyle = {
      backgroundColor: "#045b62",
      color: "white",
    };
    inputStyle = {
      color: "white",
    };
    buttonStyle = {
      backgroundColor: "#3de8fb",
      color: "#045b62",
      fontWeight: 500,
    };
  } else if(theme.rainbow) {
    formStyle = {
      backgroundColor: "black",
      background: "conic-gradient( violet, indigo, blue, green, yellow, orange, red)"
    };
    inputStyle = {
      color: "linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)"
    };
    buttonStyle = {
      background:"linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)",
      color: "black",
      border:'3px solid black',
      fontWeight: 800,
    };
  }


  return (
    <>
      <div className="container my-5" style={formStyle}>
        <div>
          <motion.h1 
           animate={{ x:[120,60,45,30,21,12,6,2,-20]}}
           transition={{ease:'linear',duration:'2',times:[0,0.4,0.6,1,1.3,1.7,3,4,5]}}
          >
            Welcome chirag
          </motion.h1>
        </div>
        <motion.h2
          animate={{x:[0,60,120,240,600]}}
          transition={{delay:3, duration:3.8,times:[0,0.3,0.5,1,2],ease:'linear'}}
          >
          <Dencrypt/>
        </motion.h2>
        <AnimateSharedLayout>
        <form className="my-3">
          <motion.div layout className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              style={inputStyle}
              name="title"
              value={note.title}
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
              required
            />
          </motion.div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              style={inputStyle}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              style={inputStyle}
              value={note.tag}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">Enter tags seperated by <b>semicolon</b></div>
          </div>

          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn"
            onClick={handleClick}
            style={buttonStyle}
          >
            Submit
          </button>
        </form>
        </AnimateSharedLayout>
      </div>
    </>
  );
};

export default AddNote;
