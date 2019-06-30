const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

router.post("/register", (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(200).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(200).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.status(201).json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
});


router.post("/login", (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {

      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {

          const payload = {
            id: user.id,
            name: user.name
          };

          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
});

//getting all the users
router.get("/get-users",(req,res)=>{
  User.find({}).then(users =>{
    res.json({
      data: users
    })
  })
})

//find one user
router.get("/get-users-by-id/:id",(req,res)=>{
  User.findById(req.params.id).then(user =>{
    res.status(200).json(user)
  })
})

module.exports = router;