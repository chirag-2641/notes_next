import React, { useContext, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import themeContext from "../context/themes/themeContext";
import { motion } from "framer-motion";

const Noteitem = (props) => {
  const contextForNotes = useContext(noteContext);
  const { deleteNote } = contextForNotes;
  const { note, updateNote, copyNote } = props;
  // updatenote is used here by edit-icon
  const contextForThemes = useContext(themeContext);
  const { theme } = contextForThemes;

  const ref = useRef(null);
  const refClose = useRef(null);

  const handleDelete = () => {
    ref.current.click();
    //it calls the handle click of the delete button in modal which is used when we click icon of delete
  };

  

  const date = note.date;
  const day = date.slice(8,10)+"-"+date.slice(5,7)+"-"+date.slice(2,4);

  const handleClick = () => {
    deleteNote(note._id);
    props.showAlert("Note Deleted successfully!", "danger");
    refClose.current.click();
  };

  let cardStyle = {
    backgroundColor: "light",
    color: "black",
    border: "1px solid black",
  };
  let cardHeader = {
    backgroundColor: "#e5e5e5",
  };
  let tagBgColor = {
    backgroundColor: "#b2dbf7",
    color: "#39739d",
    fontWeight: "500",
  };
  let modalStyle = {
    backgroundColor: "white",
    color: "black",
  };

  if (theme.light) {
    cardStyle = {
      backgroundColor: "white",
      color: "black",
      border: "1px solid black",
    };
    cardHeader = {
      backgroundColor: "#e5e5e5",
    };
    tagBgColor = {
      backgroundColor: "#b2dbf7",
      color: "#39739d",
      fontWeight: "500",
    };
    modalStyle = {
      backgroundColor: "white",
      color: "black",
    };
  } else if (theme.dark) {
    cardStyle = {
      backgroundColor: "#2d2d2d",
      color: "whitesmoke",
      border: "1px solid whitesmoke",
    };
    cardHeader = {
      backgroundColor: "#181a1f",
    };
    tagBgColor = {
      backgroundColor: "#435460",
      color: "#cde1ee",
      borderColor: "#00000000",
      fontWeight: "500",
    };
    modalStyle = {
      backgroundColor: "#2d2d2d",
      color: "whitesmoke",
    };
  } else if (theme.anotherDark) {
    cardStyle = {
      backgroundColor: "black",
      color: "#00c548",
      border: "1px solid #00c548",
    };
    cardHeader = {
      backgroundColor: "black",
    };
    tagBgColor = {
      backgroundColor: "#3d3d3d",
      color: "#00c548",
      fontWeight: "500",
    };
    modalStyle = {
      backgroundColor: "black",
      color: "#00c548",
    };
  } else if (theme.darkTeal) {
    cardStyle = {
      backgroundColor: "#045b62",
      color: "white",
      border: "1px solid white",
    };
    cardHeader = {
      backgroundColor: "#0d393d",
    };
    tagBgColor = {
      backgroundColor: "#42959e",
      color: "#cde1ee",
      borderColor: "#00000000",
      fontWeight: "500",
    };
    modalStyle = {
      backgroundColor: "#045b62",
      color: "white",
    };
  } else if(theme.rainbow) {
    cardStyle = {
      background:"conic-gradient( violet, indigo, blue, green, yellow, orange, red)",
      backgroundColor:"black",
      color: "black",
      border:"1px solid transparent"
    };
    cardHeader = {
      backgroundColor: "transparent "
    };
    tagBgColor = {
      backgroundColor: "#42959e",
      color: "#cde1ee",
      borderColor: "#00000000",
      fontWeight: "500",
    };
    modalStyle = {
      color:'black',
      background:"conic-gradient( violet, indigo, blue, green, yellow, orange, red)"
    }
  }

  return (
    <div className="col-md-3">
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#deleteModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={modalStyle}>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="modal-body text-center">
              <h4>Delete Note ?</h4>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleClick}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className={`card text  mb-3 my-3`}
        id="notecard"
        style={cardStyle}
        //whileHover={{scale:'1.2'}}
        whileTap={{ scale: "0.9" }}
        animate={{
          scale: [1, 2, 2, 2, 1, 1],
          rotate: [0, 0, 270, -270, -120, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%", "0%"],
        }}
      >
        <div className="card-header " style={cardHeader}>
          NOTE
          <span className="d-flex justify-content-end">
            <i
              className="fas fa-trash-alt mx-2 "
              onClick={() => handleDelete()}
              title = "Delete Note"
            ></i>
            <i
              className="far fa-edit mx-2"
              onClick={() => updateNote(note)}
              title= "Update Note"
            ></i>
            <i className="far fa-clone mx-2" onClick={() => copyNote(note)} title="Copy Note"></i>
          </span>
        </div>
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title">{note.title}</h5>
          </div>
          <p className="card-text">{note.description} </p>
          <p className="card-text">
            <small className="text-muted" style={{display:"flex",justifyContent:"flex-end"}}>Created on {day }</small>
          </p>
        </div>
        <hr />

        <motion.div
          className="pb-3 mx-2"
          animate={{ scale: [2, 1] }}
          transition={{ duration: [0.5, 1] }}
        >
          {note.tag.split(";").map((item, key) => {
            return (
              <span
                key={key}
                className="badge  mx-1 px-2 py-1"
                style={tagBgColor}
              >
                {item}
              </span>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};
//note.date(2,4)+"/"+note.date(5,6)+"/"+note.date(8,9)

export default Noteitem;
