const Sequelize = require('sequelize');
const sequelize = new Sequelize( process.env.DATABASE_URL  || `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/woodbase`,{
    host:'localhost',
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(
        function() {
            console.log('connected to woodbase');
        },
        function(err) {
            console.log(err)
        }
);

module.exports = sequelize