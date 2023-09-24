require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logEvents");
const verifyJWT = require("./middleware/verifyJWT");
const port = process.env.PORT || 4500;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/register", require("./routers/register"));
app.use("/login", require("./routers/login"));
app.use("/logout", require("./routers/logout"));
app.use("/refresh", require("./routers/refreshToken"));

app.use(verifyJWT);
app.get("/checkAuth", (req, res) => res.send("protected route reached"));

app.listen(port, () => {
  console.log(`server listen on port: ${port}`);
});
