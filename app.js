const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
//initialize the app instance
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));


app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/public/pages/signup.html");
});
app.post("/",(req,res)=>{
    //our variables
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    const apiURL = "https://us21.api.mailchimp.com/3.0/lists/288714a94a";
    const formData = {
        members: [
            {
        email_address:email,
        status:"subscribed",
        merge_fields:{
            FNAME: fName,
            LNAME: lName
                    }
        }]
    };
    //converting the form object data into a string
    const jsonFormData = JSON.stringify(formData);
    const options = {
        method:"POST",
        auth: "4erben:6571877b96b8911abd1bfd300a1369d2-us21",
    };

    const request = https.request(apiURL,options,(response)=>{
   if(response.statusCode === 200){
    res.sendFile(__dirname+"/public/pages/success.html");    
   }else{
    res.sendFile(__dirname+"/public/pages/failure.html");
   }
    })

request.write(jsonFormData);
request.end()
});

app.post("/hPage",(req,res)=>{
    res.redirect("/");
})
app.listen(process.env.PORT || 3000, ()=>{
});


//6571877b96b8911abd1bfd300a1369d2-us21 API-Key mailchimp
//mailchimp unique id : 288714a94a
