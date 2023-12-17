import React, { useContext, useEffect} from "react";
import noteContex from "../contex/notes/NoteContex";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Note = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContex);
  const { Notes, getNote } = context;
  useEffect(() => {
    if(localStorage.getItem("token")){
      getNote();
    }else{
      navigate("/login")
    }
    
    // eslint-disable-next-line
  }, []);


  return (
    <>
      <AddNote />
      <div>
        <div className="row mt-3">
          <h2>Your notes</h2>
          <div className="container">
            {Notes.length === 0 && "No Notes to display"}
          </div>
          {Notes.map((note) => {
            return (
              <Noteitem key={note._id} showAlert={props.showAlert} note={note} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Note;
