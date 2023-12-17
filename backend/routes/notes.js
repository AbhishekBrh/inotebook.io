const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes');
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');

// Route 1 : GET ALL THE NOTES USING : "/api/notes/fetchallnotes"
router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes)   
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error'});
      }
})

//Route 2 : CREATE A NEW NOTE USING POST : "/api/notes/addnote"

router.post('/addnote',fetchuser,[
    body('title','enter a valid Title').isLength({min:3}),
    body('description','enter a valid description').isLength({min:5})
  ], async (req, res) =>{
    try {
        const {title, description,tag} = req.body;
        //Errors if there are any bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Notes({
        title, description, tag, user : req.user.id
        }) 
        const savednotes = await notes.save()
        res.json(savednotes)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error 1'});
    }

  });

  //Route 3 :UPDATE NOTE USING PUT : "/api/notes/updatenote"

  router.put('/updatenote/:id',fetchuser, async (req, res) =>{
    const {title, description, tag} = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
    //find the new updated note and update it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send('Notes not found')};

    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new : true});
    res.json({note});
  });

  //Route 4 : Delete A NEW NOTE USING DELETE : "/api/notes/deletenote"

  router.delete('/deletenote/:id',fetchuser, async (req, res) =>{
    
    //find the note and delete it
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send('Not Found')};

    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success" : "Note has been deleted", note: note});
  });
module.exports = router