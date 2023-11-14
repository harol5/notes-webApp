const whiteList = [
  "http://127.0.0.1:4500",
  "http://localhost:4500",
  "http://localhost:3000",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) callback(null, true);
    else callback(new Error("not allowed by CORS"));
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;
