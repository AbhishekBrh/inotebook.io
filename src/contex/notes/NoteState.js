import  { useState }  from "react";
import noteContex from "./NoteContex";
// import { json } from "react-router-dom";


const  NoteState = (props)=>{
  const host = "http://localhost:5000"
    const notesInitial = [ ]
    const [Notes, setNotes] = useState(notesInitial)

    //Get all note
    const getNote = async()=>{
      //API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem("token")
        }
      });
      const json = await response.json()
      console.log(json)
      setNotes(json)
    }

    //Add a note
    const addNote = async (title, description, tag)=>{
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, tag}), 
      });
      // const json = await response.json()
      // console.log(json)
      
      const note = await response.json()
        setNotes(Notes.concat(note))
    }
    //Delete a note
    const delNote = async(id)=>{    
      //API Call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem("token")
        },
      });
      const json = await response.json()
      console.log(json)

      console.log("Deleting note " + id);
      const newNotes= Notes.filter((note)=>{ return note._id !== id})
      setNotes(newNotes);
    }
    //Edit a note
    const editNote = async (id, title, description, tag) => {
      try {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU1NjNjYzQ0YWEzOTBjOTUxMWZlZjRlIn0sImlhdCI6MTcwMDE1MDQ5MX0.m3EN0e0u6crw2CVvqxO7oKdNrlPjIXkB8knI-wAzp8g"
          },
          body: JSON.stringify({ id, title, description, tag }),
        });
    
        if (!response.ok) {
          throw new Error("Failed to update note");
        }
    
        const updatedNote = await response.json();
    
        // Update the Notes state
        setNotes(prevNotes =>
          prevNotes.map(note => {
            if (note._id === id) {
              return {
                ...note,
                title: updatedNote.title,
                description: updatedNote.description,
                tag: updatedNote.tag
              };
            }
            return note;
          })
        );
      } catch (error) {
        console.error("Error updating note:", error);
        // Handle error scenario (e.g., display an error message)
      }
    };

    return(
        <noteContex.Provider value={{Notes,addNote,delNote,editNote,getNote}}>
                {props.children}
        </noteContex.Provider>
    )
}
export default NoteState;