// creating a rest api requires a framework such as rest 
const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8001;
//we have to apply a middleware so that express gets to know what type of data we are returning

app.use(express.urlencoded({ extended: false}));
//this is our middleware/plugin
//jab bhi koi form data ayega yeh usko body mein daalne ka kaam karega 
//yeh plugin data ko uthayega and uska js object bana dega 
//like this 
// //Body [Object: null prototype] {
//     first_name: 'Siddhant ',
//     last_name: 'Jain',
//     email: 'siddhantjain027@gmail.com',
//     gender: 'male',
//     job_title: 'software dev'
//   }
  
//define your route paths here 
app.get('/users', (req,res) => {
    // if we have a lot of users hpw will the page look
    //there would be some html elements 
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    //here we dont need to return we need to send 
    res.send(html);

});
//REST API points 
//get users 
app.get('/api/users' , (req,res) => {
    return res.json(users);
})

app.get('/api/users/:id' , (req,res) => {
    //we first need that id 
    //convert that id to number
    const id = Number(req.params.id);
    //we need to find that id in the json file we have 
    const user = users.find( user => user.id === id);
    return res.json(user);
});

//POST request 
//create a new user 
app.post('/api/users', (req,res) => {
    //todo: create a new user 
    const body = req.body;
    //jo bhi data hum frontend se send karte h it is available in body 
    console.log("Body",body);
    //will print undefine 
    //because express have no idea what type of data is being parsed
    //we have to use a middleware 
    //... also known as spread operator , append stuff
    users.push({...body,id: users.length+1});
    //id we have to specify explicitly 
    //write this in the file 
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err, data) => {
        return res.json({ status: "success" , id: users});

    });

    //after appending we have to write this in the file as well
});

//PATCH request -> edit user details 
app.patch("/api/users/:id" , (req,res) => {
    //todo: edit the user after receving its id 
    //get the id 
    const id = parseInt(req.params.id);
    //find that user
    const user  = users.find(user => user.id === id);
    if(!user)
    {
        return res.json({status: "Errot" , message: "User not found"});
    }

    user.email = req.body.email;
    
    return res.json({ status: "updated"}); 
});

//DELETE request ->delete user with their id 

// const userFilePath = './MOCK_DATA.json';
// //read user from the file 
// const readUser = () => {
//     const data = fs.readFile(userFilePath, 'utf8');
//     return JSON.parse(data);
// }

// const writeUser = (users) => {
//     fs.writeFile(userFilePath , JSON.stringify(users,null,2),(err, data) => {
//         return res.json({status: "Success" , message: "User deleted successfully!"});
//     }); 
// };
app.delete("/api/users/:id" , (req,res) => {
    //todo: delete that user after receving its id 
    //extract its id 
    const id = parseInt(req.params.id);
    //read the user from the file 
    // const users = readUser();
    //find the id in the users in the users array 
    const user = users.find(user=>user.id === id);
    const userInd = users.findIndex(user => user.id === id);
    if(!user)
    {
        return res.status(404).json({message: 'User not found'});
    }
    else if(userInd != -1)
    {
        //remove the user from the array 
       const deletedUser = users.splice(userInd,1);
        //write the updated array in the file
        // writeUser(users);
        return res.json(deletedUser);
        // return res.json({status: "Success" , message: "User deleted successfully!"});

        //give a success response 
    }

      return res.json({ status: "Error" , message: "User not found"});

});


//if there is the same route insted of creating multiple requeest we can do like thus 
// app.route("/api/users/:id").get((req,res) => {
//     //we first need that id 
//     //convert that id to number
//     const id = Number(req.params.id);
//     //we need to find that id in the json file we have 
//     const user = users.find( user => user.id === id);
//     return res.json(user);
// }).put().patch().delete();
app.listen(PORT, () => console.log(`server started at ${PORT}`));