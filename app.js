import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import https from 'https';
import  mailchimp from '@mailchimp/mailchimp_marketing';

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res){
    res.sendfile('signup.html');
})

app.post("/", function(req, res){
 
    const firstName = req.body.fname;
	const lastName = req.body.sname;
	const email = req.body.email;
 
    // *** Construct Requesting data ***
    const data = {
        members: [
            {
              email_address: email,
              status: 'subscribed',
              merge_fields: {
                  FNAME: firstName,
                  LNAME: lastName
              }
            }
          ]
    }
 
    // *** Stringify inputed data ***
    const jsonData = JSON.stringify(data);
 
    // *** url = "https://<data center>.api.mailchimp.com/3.0/lists/{listID}";
    const url = "https://us21.api.mailchimp.com/3.0/lists/4e26575915";
 
    const options = {
        method: "POST",
        auth: "text or name:94cc4880a9aaf788a23495b71a6ad92f-us21"
    };
    
    // *** Requesting and send back our data to mailchimp ***
    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendfile('success.html');
        }else{
            res.sendfile('failure.html');
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
 
    request.write(jsonData);
    request.end();
    
 
});
app.post("/failure",function(req, res){
    res.redirect("/");
})
app.listen(3000,function(){
    console.log('server is running on port 3000');
})
//94cc4880a9aaf788a23495b71a6ad92f-us21
//4e26575915