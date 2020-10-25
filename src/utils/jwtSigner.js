const config = require('config');
const jwt = require('jsonwebtoken');
const { User } = require('../models/users');

function jwtSigner(user){
    console.log("here **"+user)
    let token = jwt.sign(user,config.get('jwtPrivateKey'));
    return token;
}

module.exports = jwtSigner;