const jwt = require('jsonwebtoken')
const User = require('../db').import('../models/user')
require('dotenv').config();

module.exports = function (req, res, next) {
  if (req.method == 'OPTIONS') {
      next()
  } else {
      var sessionToken = req.headers.authorization;
      console.log(sessionToken)

      if (!sessionToken) return res.status(403).send({ auth: false, message: 'Missing Token.' })
      else {
          jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
              if (decoded) {
                  User
                      .findOne({ where: { id: decoded.id } })
                      .then(user => {
                          req.user = user;
                          next();
                      },

                          function () {
                              res.status(401)
                                  .send({ error: 'User not found' });
                          });
              } else {
                  res.status(400)
                      .send({ error: 'Not authorizaed' })
              }
          });
      }
  }
}