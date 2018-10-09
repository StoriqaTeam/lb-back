if (process.env.PORT == 3022) {
  module.exports = require('./configureStore.prod');
} else {
		console.log(process.env.PORT)

  module.exports = require('./configureStore.dev');
}
