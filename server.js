const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.use(require("./controllers/api-routes.js"));
app.use(require("./controllers/main-routes.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});