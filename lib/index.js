const Complier = require('./complier.js')
const options = require('../webpack.config.js')

new Complier(options).run()