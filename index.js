// creating a rest api requires a framework such as rest 
const express = require('express');
const users = require('./MOCK_DATA.json');
const app = express();
const PORT = 8001;
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
    return res.json({ status: "pending"});
});

//PATCH request -> edit user details 
app.patch("/api/users/:id" , (req,res) => {
    //todo: edit the user after receving its id 
    return res.json({ status: "pending"}); 
});

//DELETE request ->delete user with their id 
app.delete("/api/users/:id" , (req,res) => {
    //todo: delete that user after receving its id 
    return res.json({ status: "pending"});
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