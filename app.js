const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')
const app = express()
const port = 3000


app.use(express.static(__dirname))

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/signup.html")
})


app.post('/',(req,res)=>{

    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;

    console.log(fName,lName,email);


    const data = {
        members: [{

            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fName,
                LNAME:lName,
            }
        }
     ] 
    };
    
    const jData = JSON.stringify(data);

    const apiKey = "4b48193cec98745b970d6a43aedd352c-us13"

    const listId = "5cfacef31b"

    const url = `https://us13.api.mailchimp.com/3.0/lists/${listId}`

    const options = {
        method:"POST",
        auth:`vicous:${apiKey}`
    }


 const request = https.request(url,options,(response)=>{

    if (response.statusCode===200) {
    
        res.sendFile(__dirname+"/success.html")
    } else {
        res.sendFile(__dirname+"/failure.html")
        
    }

    response.on("data",(data)=>{
        console.log(JSON.parse(data));
    })
 })

 


request.write(jData)
request.end()

})

app.post('/failure',(req,res)=>{
    res.redirect('/')
})



app.listen(process.env.PORT, () => {
  console.log(`App.js listening on port port`)
})