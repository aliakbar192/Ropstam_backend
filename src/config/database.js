const { default: mongoose } = require('mongoose');
require('dotenv').config();

// eslint-disable-next-line new-cap
const mongodb = mongoose.connect(process.env.Database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
module.exports = { mongodb, mongoose };