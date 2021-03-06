const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors())

const database = {
 users:[
  {
   id: '123',
   name: 'john',
   email: 'john@example.com',
   password: 'cooky',
   entries: 0,
   joined: new Date(),
  },
  {
   id: '124',
   name: 'sally',
   email: 'sally@example.com',
   password: 'banana',
   entries: 0,
   joined: new Date(),
  }
 ]
}

app.get('/', (req, res) =>{
 res.send(database.users)
})

app.post('/signin', (req, res) => {
 if (req.body.email === database.users[0].email &&
   req.body.password === database.users[0].password){
    res.json(database.users[0])
   }else{
    res.status(400).json('error')
   }
})

app.post('/register', (req, res) => {
 const {email, name} = req.body
 database.users.push({
   id: '124',
   name: name,
   email: email,
   entries: 0,
   joined: new Date(),
 })
 res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
 const { id } = req.params;
 let found = false;
 database.users.forEach(user =>{
  if(user.id === id){
   found = true;
   return res.json(user);
  }
 })
 if(!found){
  res.status(400).json('not found');
 }
})

app.put('/image', (req, res) => {
 const { id } = req.body;
 let found = false;
 database.users.forEach(user =>{
  if(user.id === id){
   found = true;
   user.entries++
   return res.json(user.entries);
  }
 })
 if(!found){
  res.status(400).json('not found');
 }
});

app.listen(3001);

