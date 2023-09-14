const randomString = require('randomstring')

const generateName = () => {
    return randomString.generate({
        length: 10,
        charset: 'alphanumeric',
    })
}

const generateCode = () => {
    return randomString.generate({
        length: 12,
        charset: 'alphanumeric',
    })
}

module.exports = {
    generateCode,
    generateName,
}
