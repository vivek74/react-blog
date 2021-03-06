const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const blogs = require("./routes/api/blogs");

const app = express();
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err)
);

app.use(passport.initialize());

require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/blog", blogs);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("server started");
// });