const cors = require("cors");

module.exports = (app) => {
  const corsOption = {
    origin: true,
    methods: "OPTION,GET,POST,PUT,DELETE",
  };
  app.use(cors(corsOption));
};
