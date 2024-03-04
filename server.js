require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const port = process.env.PORT || 4500;

//-------------Middleware----------//
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

//------------Routers---------------//
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/register", require("./routers/register"));
app.use("/login", require("./routers/login"));
app.use("/logout", require("./routers/logout"));
app.use("/refresh", require("./routers/refreshToken"));
app.use("/verify-account", require("./routers/confirmAccount"));
app.use("/forgot-pwd", require("./routers/forgotPwd"));

app.use(verifyJWT);
app.use("/notes", require("./routers/notes"));

//-----------Error Handling--------//
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server listen on port: ${port}`);
});
