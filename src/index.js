const path = require('path');
const express = require('express');
// const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const { urlencoded } = require('express');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    urlencoded({
        extended: true,
    }),
);

app.use(express.json());
app.use(methodOverride('_method'));
//HTTP logger
// app.use(morgan('combined'));

//templace engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        // số thứ tự bắt đầu từ số 1
        helpers : { 
            sum: (a,b) => a+b,
        } 
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
// console.log('PATH: ', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
