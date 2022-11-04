const express = require ('express');
const path = require('path');
const exphbs = require('express-handlebars');

//const moment = require('momnet');
const logger = require('./middleware/logger')
const members = require('./Members');
const app = express();

const { allowedNodeEnvironmentFlags } = require('process');




//init middleware
// app.use(logger); 

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//homwpage route
app.get('/',(req, res) => res.render('index',{
   title: 'Member App',
   members
}));
//set static folder
app.use(express.static(path.join(__dirname,'public')));

/* app.get('/', (req, res) => {
    res.sendFile(path.join (__dirname, 'public','index.html'));
}); */

//Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`Sever started on port ${PORT}`));

