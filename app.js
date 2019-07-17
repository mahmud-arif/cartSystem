const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandlers = require('./handlers/errorHandlers');
// import routes
const products = require('./routes/products');
const cart = require('./routes/cart');
const promo = require('./routes/promo');

// create our Express app
const app = express();
app.use(cors());

require('dotenv').config({
  path: 'variables.env',
});

mongoose
  .connect(process.env.DATA_BASE, {
    useNewUrlParser: true,
  })
  .then(result => console.log('connect successfully'))
  .catch(err => console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// api routes
app.use('/api/products', products);
app.use('/api/cart', cart);
app.use('/api/promo', promo);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
