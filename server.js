const express = require('express');
const port = process.env.PORT ||5000 ;
const bodyparser = require('body-parser');
const fs = require('fs');
const  nodemailer = require("nodemailer")
const exphbs = require('express-handlebars');
const { addAbortSignal } = require('stream');
const dotenv = require('dotenv');
 
dotenv.config()
const app =express()

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.use(express.static('./public'))

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post("/send_email", function(req, response){
  
   const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>  
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h3>Message:${req.body.message}</h3>
  `


  console.log(req.body);



  var transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
  })

  var mailOptions = {
      from:  process.env.EMAIL ,
      to:  process.env.EMAIL ,
      subject:"from kovendan",
      html:output,
      
      }

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error)
          response.send("pls try again");
      } else {
          console.log("Email Sent: " + info.response)
                  
        }
      response.send("message sent sucuessfully");
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

