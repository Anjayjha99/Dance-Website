const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
app.use(express.urlencoded())
app.use('/static', express.static('static')); // For Serving The Static Files


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactData', {useNewUrlParser: true, useUnifiedTopology: true});

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String, 
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

app.get("/" , (req,res) =>{
    res.render("home.pug");
});
app.get("/contact" , (req,res) =>{
    res.render("contact.pug");
});

app.post("/contact" , (req,res) =>{
    var mydata = new Contact(req.body);
    mydata.save().then(() => {
        res.send("The datas that you entered has been saved into the database successfully");
    }).catch(() =>{
        res.status(400).send("Error!! cannot save the data")
    })
});

app.listen(port , () => {
    console.log(`The application has been started successfully at Port ${port}`);
});