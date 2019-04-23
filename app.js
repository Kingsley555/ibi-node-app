const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

//Load routes 
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//passport config
require('./config/passport')(passport)

//DB config file
const db = require('./config/database');

//Connect to mongoose
mongoose.connect(db.mongoURI, {
    useNewUrlParser:true,
    useCreateIndex:true
}).then(() => {
    console.log("Mongodb Connected...")
}).catch((error) => {
    console.log(error);
});




// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


//Body-parser middleware 
app.use(bodyParser.urlencoded({extended: false}));
//parse application/json
app.use(bodyParser.json());

// static folder
app.use(express.static(path.join(__dirname, 'public')))

//Method override middleware
app.use(methodOverride('_method'));

//Expression Session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash middleware
app.use(flash());

//Global variables for messages 
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})


//Index route
app.get('/', (req, res) => {
    const title = 'Innovative Business Ideas';
    res.render('index', {
     title: title
    });
});

//About route
app.get('/about', (req, res) => {

    res.render('about');
});




// Use route
app.use('/ideas', ideas);

//User route
app.use('/users', users);

const port = process.env.PORT ||  8000;
app.listen(port,() => {
   console.log(`Server started on port ${port}`);
});