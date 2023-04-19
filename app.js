// imports
const express = require("express");
const bodyparser = require("body-parser");
const satelize = require("satelize");
const ejs = require("ejs");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const saltrounds = 10;
const app = express();
// app creatiom
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
// database
mongoose.connect('mongodb://127.0.0.1:27017/usrDB ');
const userschema = new mongoose.Schema({
    name: String,
    password : String,
    email: String
});
const User = new mongoose.model("User", userschema);

const mechuserschema = new mongoose.Schema({
    name: String,
    password : String,
    email: String
});
const mechUser = new mongoose.model("mechUser", mechuserschema);


const mechanicSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    problemdesc: String,
    address:String,
    pincode:Number
});
const booking = new mongoose.model("booking", mechanicSchema);




// app.get("/logtype", function(req , res){
//     res.render("logandrejtype");
// });


// get and post for authentication
app.get("/", function(req , res){
    res.render("logandrejtype");
});
app.get("/index", function(req , res){
    res.render("index");
});
app.get("/jobtype", function(req , res){
    res.render("jobtype");
});
app.get("/mechanicbooking", function(req , res){
res.render("mechanicbook");
});
app.get("/waitingpage",function(req, res){
    res.render("waitingpage");
});
app.get("/mechjob",function(req, res){
   
    res.render("mechjob")
    
  
});
app.get("/usr", function(req , res){
    res.render("usr");
});
app.get("/mech", function(req , res){
    res.render("jobtype");
});
app.get("/register", function(req , res){
    res.render("register");
});
app.get("/loginusr", function(req , res){
    res.render("loginusr");
});
app.get("/loginmech", function(req , res){
    res.render("loginmech");
});
app.get("/registermech", function(req , res){
    res.render("registermech");
});

app.post("/mechanicbooking", function(req , res){
  
    const newbooking = new booking({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.number,
    date: req.body.date,
    time: req.body.time,
    problemdesc: req.body.description,
    address: req.body.address,
    pincode: req.body.pincode
    })
    newbooking.save()
    res.render("waitingpage")
 });
app.post("/mechanictype", function(req, res){
    booking.find({})
    .then((foundUser) => {
         res.render("mechjob",{name: foundUser, email: foundUser, address: foundUser, pincode: foundUser});
})
});
app.post("/calltype", function(req, res){
    res.render("calltype")
})
// app.post("/mechanicbook", function(req , res){
//     // navigator.geolocation.getCurrentPosition(function ( position) {
//     //     console.log(position)
//     //   })
//     // // const ip = 49.205.87.49;
//     // // satelize.satelize({ip: '49.205.87.49'},function(err,payload){
//     // //     console.log(payload);
    
// });


app.post("/register", function(req , res){
    bcrypt.hash(req.body.password, saltrounds, function(err, hash) {
        const newUser = new User({
        name: req.body.username,
        password: hash,
        email: req.body.email
    });
       newUser.save()
       .then(data => {
        res.render("index")
      })
      .catch(err => {
        console.error(err);
     });
   });
});
app.post("/registermech", function(req , res){
    bcrypt.hash(req.body.password, saltrounds, function(err, hash) {
        const newUserr = new mechUser({
        name: req.body.username,
        password: hash,
        email: req.body.email
    });
       newUserr.save()
       .then(data => {
        res.render("jobtype")
      })
      .catch(err => {
        console.error(err);
     });
   });
});
app.post("/usr", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ name:username})
    .then((foundUser) => {
        if(foundUser){
            bcrypt.compare(password, foundUser.password, function(err, result) {
                if(result === true){
                res.render("index")
                }
            });
            }
        })
.catch((err) => {
    console.log(err);
    res.send(3000, " bad rewq");
       });
    });
app.post("/mech", function(req, res){
    const username = req.body.username;
        const password = req.body.password;
    
        mechUser.findOne({ name:username})
      
        .then((foundUser) => {
            console.log(foundUser);
            if(foundUser){
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    if(result === true){
                    res.render("jobtype")
                    }
                });
                }
            })
    .catch((err) => {
        console.log(err);
        res.send(3000, " bad rewq");
           });
        });
    


app.listen(3000, function(){
    console.log("the server is running in port 3000");
});

