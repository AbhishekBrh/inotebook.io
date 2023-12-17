
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const JWT_SECRET = "aBHishek@321"
const fetchuser = require("../middleware/fetchuser")



// Route 1 : creating a user using POST : api/auth/createuser, No Login required                                                 
router.post('/createuser',[
    body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password','password must have atleast 5 characters').isLength({min:5})
], async (req, res) => {
  let success = false;
  //if there are errors re turn bad request with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }   

   const salt =   await bcrypt.genSalt(10);
   const secPass = await bcrypt.hash(req.body.password,salt);

try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,  
      password: secPass
    });
    //res.json
    // res.json(user);
    const data = {
      user : {
        id: user.id
      }
    }
    const authtoken = JWT.sign(data,JWT_SECRET);
    success = true;
    res.json({success, authtoken: authtoken});
  } catch (error) {
    // errors if user already exists
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ success, error: 'User already exists' });
    }
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


//Route 2 :  Authincating a user using POST : api/auth/login,

router.post('/login',[
  body('email','enter a valid email').isEmail(),
  body('password','password cannot be blank').exists({min:5})
], async (req, res) =>{
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
const{email,password} = req.body;
try {
  let user = await User.findOne({email})
  if(!user){
    return res.status(400).json({ errors: "Please login with correct credentials"});
  }

  const passCom = await bcrypt.compare(password,user.password);
  if(!passCom){
    success = false;
    return res.status(400).json({success, errors: "Please login with correct credentials"});
  }

  const data = {
    user : {
      id: user.id
    }
  }
  const authtoken = JWT.sign(data,JWT_SECRET);
  success = true;
  res.json({success, authtoken: authtoken});
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error'});
}

});

//Route 3 : Get logged in a user details using POST : api/auth/getuser,Login required
router.post('/getuser',fetchuser, async (req, res) =>{
try {
  userId = req.user.id;
  const user  = await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error'})
;}
});

module.exports = router;