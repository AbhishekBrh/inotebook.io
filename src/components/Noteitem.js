import React, { useContext, useState } from "react";
import noteContex from "../contex/notes/NoteContex";
import RModal from "./RModal";

const Noteitem = (props) => {
  const context = useContext(noteContex);
    const {delNote } = context;
  const { note } = props;
  const delNotes = () => {
    delNote(note._id);
    props.showAlert("Deleted successfully", "success")
}

const [showModal, setShowModal] = useState(false);
const toggleModal = () => {
  setShowModal(!showModal); // Toggles the modal visibility
};

  return (
    <>
    <div className="card col-md-3" >
    
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}</p>
        <i className="fa-solid fa-trash mx-2" onClick={delNotes}></i>
        <RModal onClose={toggleModal} />
        
      </div>
    </div>
    </>
  );
};

export default Noteitem;
