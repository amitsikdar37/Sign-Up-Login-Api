const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public')));


const homepageRouter = require('./routers/homepageRouter.js');
const signUpRouter = require('./routers/signupRouter.js');
const loginRouter = require('./routers/loginRouter.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(homepageRouter);
app.use(signUpRouter);
app.use(loginRouter);

const PORT = 3001;
mongoose.connect("mongodb+srv://sikdara477:omikun@cluster0.qyjcazl.mongodb.net/voters", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT,() => {
        console.log(`Server Is Running On Port: http://localhost:${PORT}`);
    });
    })
.catch(err => console.log(err));
  