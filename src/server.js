const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')('sk_test_7HqyyxTZ0XdOj0dVxfdD7Tcx');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.static(path.join(__dirname, '../build')));

const port = process.env.PORT || 7000;

app.post('/create-checkout-session', async (req, res) => {
  console.log('====================================');
  console.log(process.env.SECRET_KEY_STRIPE);
  console.log('====================================');
  console.log(require('dotenv').config());
  const { prodName, prodImg, prodPrice } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'alipay'],
    line_items: [
      {
        name: prodName,
        images: [prodImg],
        quantity: 1,
        currency: 'aud',
        amount: prodPrice * 100, // Keep the amount on the server to prevent customers from manipulating on client
      },
    ],
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/error`,
  });

  res.send({
    sessionId: session.id,
  });
});

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.listen(port, () => console.log(`server running on port ${port}`));
