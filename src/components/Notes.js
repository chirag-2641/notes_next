import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useHistory } from "react-router-dom";
import themeContext from "../context/themes/themeContext";


function Notes(props) {
  const contextForNotes = useContext(noteContext);
  const { notes, getNotes, editNote, makecopyNote } = contextForNotes;
  const contextForThemes = useContext(themeContext);
  const {theme} = contextForThemes;

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const history = useHistory();
  const [listView, setlistView] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) { //if we get the token after login
      getNotes();
    }
    else {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //it sets the already present value to the modal's input field
  const updateNote = (currentNote) => {
    //console.log("current-"+currentNote)
    ref.current.click();  //it clicks the refered element i.e. button here
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const copyNote = (origNote) => {
    //console.log("orig - "+origNote)
    makecopyNote(origNote._id, origNote.title, origNote.description, origNote.tag);
    props.showAlert("Note Copied Successfully", "info");

  }

  const handleClick = (e) => {
    refClose.current.click();
    //console.log("Updating the note...", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Notes updated successfully!", "success");
    e.preventDefault();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    //modal ke input mei value typed ho sake,jaise jaise value change ho vese-vese note me set ho jaye
  };



  let modalStyle = {
    backgroundColor:'white',
    color:'black',
  }
  let inputStyle = {
    color: "black",
    background:'transparent'
  };

  if(theme.light) {
    modalStyle = {
      backgroundColor:'white',
      color:'black',
    }
    inputStyle = {
      color: "black",
      background:'transparent'
    };
  } else if(theme.dark) {
    modalStyle = {
      backgroundColor: "#2d2d2d",
      color: "whitesmoke",
    }
    inputStyle = {
      color: "whitesmoke",
      background:'transparent'
    };
  } else if(theme.anotherDark) {
    modalStyle = {
      backgroundColor: "black",
      color: "#00c548",
    }
    inputStyle = {
      color: "#00c548",
      background:'transparent'
    };
  } else if(theme.darkTeal) {
    modalStyle = {
      backgroundColor:'#045b62',
      color:'white',
    }
    inputStyle = {
      color:'white',
      background:'transparent'
    }
  } else if(theme.rainbow) {
    modalStyle = {
      backgroundColor: 'black',
      background:"conic-gradient( violet, indigo, blue, green, yellow, orange, red)",
      
    }
    inputStyle = {
      color:"black",
      background:'transparent',
    }
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"  //d-none = hiding the element
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit the note
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={modalStyle}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3 text">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label" >
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    style={inputStyle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    style={inputStyle}
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label" >
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    style={inputStyle}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5">
        <h2>Your Notes
          <span className="mx-5 fa-stack">
          <i className={listView?"fas fa-th fa-stack":"fas fa-list"} title="List View" onClick={()=>{setlistView(!listView)}} id="viewIcon"> 
          </i>
          </span>
        </h2>
        {
          listView ? (
            <div className="row">
              <div className= "">
                {notes.map((item, key) => {
                  return <Noteitem key={key} updateNote={updateNote} note={item} showAlert={props.showAlert} copyNote={copyNote} />; //note value is sent from props to noteitem
                })}
              </div>
            </div>
          ) : 
          (
            <div className="row">
                {notes.map((item, key) => {
                  return <Noteitem key={key} updateNote={updateNote} note={item} showAlert={props.showAlert} copyNote={copyNote} />; //note value is sent from props to noteitem
                })}
            </div>
          )
        }

      </div>
      
    </>
  );
}

export default Notes;
