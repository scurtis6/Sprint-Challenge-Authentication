const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../jokes/model');
const { jwtSecret } = require('../config/secrets');

router.get('/users', (req, res) => {
  db.find()
  .then(user => {
    res.status(200).json(user)
  })
  .catch(({name, code, message, stack}) => {
    console.log({name, code, message, stack})
    res.status(500).json({name, code, message, stack})
  })
});

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  db.add(user)
  .then(saved => {
    res.status(201).json(saved);
  })
  .catch(({name, code, message, stack}) => {
    console.log({name, code, message, stack})
    res.status(500).json({name, code, message, stack})
  })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  db.findBy({ username }).first()
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)) {
      const token = genToken(user)
      res.status(200).json({ message: `Welcome ${user.username}!`, token })
    } else {
      res.status(401).json({ message: 'Missing username and/or password' })
    }
  })
  .catch(({name, code, message, stack}) => {
    console.log({name, code, message, stack})
    res.status(500).json(({name, code, message, stack}))
  })
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
