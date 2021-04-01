require("dotenv").config();
const path = require("path");
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const hsts = require("hsts");
const permissionsPolicy = require("permissions-policy");
const frameguard = require("frameguard");
const nosniff = require("dont-sniff-mimetype");
const referrerPolicy = require("referrer-policy");

const app = express();

const {
  getParkingLotId,
  getAllBasicRouteInfo,
  getMoreData
} = require("./controllers/main");
// const e = require("express");

var whitelist = ["http://localhost:1234"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

const port = process.env.SERVER_PORT || 8887;

app.use(json());
app.use(nosniff());

app.use(
  permissionsPolicy({
    features: {
      fullscreen: ["self"], // fullscreen=()
      syncXhr: [], // syncXhr=()
    },
  })
);

app.use(
  hsts({
    maxAge: 31536000, // Must be at least 1 year to be approved
    includeSubDomains: true, // Must be enabled to be approved
    preload: true,
  })
);

app.use(frameguard({ action: "deny" }));

const dbConfig = {
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
};

app.use(referrerPolicy({ policy: "same-origin" }));

massive(dbConfig)
  .then((dbInstance) => {
    // console.log(dbInstance);
    app.set("db", dbInstance);
  })
  .catch((err) => console.log(err));

app.get(`/api/routes`, getAllBasicRouteInfo);
// app.get(`/api/trail/:trailid`, getTrailId);
app.get(`/api/routes/:routename`, getMoreData);
app.get(`/api/parkinglot/:parkinglotid`, getParkingLotId);

app.use(express.static(`${__dirname}/../build`));

app.listen(port, () => {
  console.log(`CORS-enabled web server listening on port: ${port}`);
});
