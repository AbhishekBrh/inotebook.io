import React, { useContext , useState} from "react";
import noteContex from "../contex/notes/NoteContex";

const AddNote = () => {
    const context = useContext(noteContex);
    const {addNote} = context;
    
    const [Note, setNote] = useState({title:"", description:"", tag:""});
    const handleClick = (e)=>{
        addNote(Note.title , Note.description , Note.tag);
        setNote({title:"", description:"", tag:""})
    }
    const onchange =(e)=>{
        setNote({...Note,[e.target.name] : e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
        <h2>Add a note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input  type="text" className="form-control" id="title" name="title" onChange={onchange} minLength={4} required/>   
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={onchange} minLength={4} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="Tag" name="Tag" onChange={onchange} minLength={4} required/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
