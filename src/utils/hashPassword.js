const bcrypt = require('bcrypt');
async function hashpassword(password){
    let salt = await bcrypt.genSalt(5);
    return bcrypt.hash(password,salt);
}
module.exports = hashpassword;