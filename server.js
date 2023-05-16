const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const controllers = require('./controllers');
const authRoutes = require('./controllers/users/authRoutes')


const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;


const hbs = exphbs.create({ });



app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(authRoutes)

app.use(controllers);

//connecting to the database then running the server
sequelize.sync({ force: false }).then(() => {

  app.listen(PORT, () => console.log('Server is up'));
});
