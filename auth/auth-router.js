const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Jokes = require('../jokes/model');
const { jwtSecret } = require('../config/secrets');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Jokes.add(user)
  .then(saved => {
    res.status(201).json(saved);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

router.post('/login', (req, res) => {
  // implement login
});

function genToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role || 'user',
  };
  const options = {
    expiresIn: '1h'
  };
  return jwt.sign(payload, jwtSecret, options)
}
module.exports = router;
