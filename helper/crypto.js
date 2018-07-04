const crypto = require('crypto')

const passwordGenerator = (plainPassword) => {
    const secret = "gdjnbj237!"
    const password = crypto.createHmac('sha256', secret)
    .update(plainPassword)
    .digest('hex')

    return password
}

module.exports = passwordGenerator