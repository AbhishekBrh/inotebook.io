import { useState,useContext, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import noteContex from "../contex/notes/NoteContex";

function RModal(props) {
  const context = useContext(noteContex);
  const {editNote} = context;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//   const editNotes = (e) => {
//     e.target.editNote(note._id);
// }
const ref = useRef(null)

  const [Note, setNote] = useState({id : "" , etitle:"", edescription:""});

  const updatenote = (currentnote)=>{
    ref.current.click()
    setNote({id : currentnote._id ,etitle : currentnote.title, edescription : currentnote.description, etag : currentnote.tag})
  }

    const handleClick = (e)=>{
      console.log("Updating the note", Note);
        editNote(Note.id, Note.etitle,Note.edescription)
        e.preventDefault();
    }
    const onchange =(e)=>{
        setNote({...Note,[e.target.name] : e.target.value})
    }

  return (
    <>
      <i className="fa-regular fa-pen-to-square mx-2" onClick={handleShow}></i>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        // updatenote={()=>{updatenote(Note)}}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container" ref={ref}>
          <form >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input  type="text" className="form-control" id="etitle" value={Note.etitle} name="etitle" onChange={onchange} minLength={4} required/>   
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="edescription" value={Note.edescription} name="edescription" onChange={onchange} minLength={4} required/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Update Note</button>
        </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RModal;