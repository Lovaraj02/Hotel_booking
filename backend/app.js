import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import login from './login.js';


import reservation from './reservation.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());
mongoose.connect('mongodb+srv://lovaraj4502:YDQ9OoIxHm0XSpAQ@cluster0.nexvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

  .then(() => {
    app.listen(4000, () => {
      console.log("Connected");
    });
  })
  .catch((err) => console.log(err));

app.post('/addlogin', (req, res, next) => {
  const { username, email, password } = req.body;
  const login1 = new login({
    username,
    email,
    password
  });
  
  login1.save()
    .then((result) => {
      return res.send({ msg: "inserted", result });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send({ error: 'Internal Server Error' });
    });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await login.findOne({ username, password });
      if (user) {
        
        res.status(200).send(user.username)
        
      } else {
        res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
});


app.post('/addreservation',(req,res,next) =>{
    const {username,name,phone,date,time,selectedTableType}=req.body;
    const reservation1=new reservation({
        username,
        name,
        phone,
        date,
        time,
        selectedTableType
    });
    reservation1.save()
    .then((result) => {
        return res.send({ msg: "inserted", result });
      })
});

app.get('/getdata',async(req,res,next)=>{
    let reservedata
    try{
        reservedata =await reservation.find()
    }
    catch(err){
        console.log(err)
    }
    if(!reservedata){
        console.log("no reservation details found");
    }
    return res.status(200).json({reservedata})
});















