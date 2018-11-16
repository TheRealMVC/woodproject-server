require('dotenv').config();
var express=require('express')
var app = express();
var sequelize = require('./db');
var bodyParser = require('body-parser');


var user = require('./controllers/user-controller');
var login = require('./controllers/login-controller');
var project = require('./controllers/project-controller');


sequelize.sync(); 

app.use(bodyParser.json());

app.use(require('./middleware/headers'));


app.use('/api/user', user);  
app.use('/api', login);  


app.use(require('./middleware/validate-session'))


app.use('/api/project', project);



app.listen(process.env.PORT, () => {
    
    console.log(`App is listening on port ${process.env.PORT}`)
});