var crypto = require('crypto');

exports.createSalt = function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

exports.hashPwd = function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read();
}