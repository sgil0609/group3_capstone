require("dotenv").config();

const express = require("express");
const router = require("vite-express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

//middleware
app.use(express.static("public"));

// const db = require("./db/client");
// db.connect();

//database connection
const apiRouter = require("./api"); 
app.use("/api", apiRouter); //server/api/index.js 

router.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

module.exports = router;
