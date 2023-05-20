const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");
const bodyParser = require("body-parser");
// const serverless = require('serverless-http')
const app = express();
// const router = express.Router();

//body-parse
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// cors
app.use(cors({ origin: true, credentials: true }));

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.json());

// link the router
app.use("/api/auth", require('./router/auth'));
app.use("/api/user", require('./router/user'));
app.use("/api/shop", require('./router/shop'));
app.use("/api/plan", require('./router/plan'));
app.use("/api/community", require('./router/community'));

app.get("/", (req, res) => {
  res.send("Hello VendorVortex!");
});

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

// module.exports.handler = serverless(app);
