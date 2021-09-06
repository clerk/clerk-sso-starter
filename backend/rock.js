const express = require("express");
const cors = require("cors");
const { ClerkExpressWithSession } = require("@clerk/clerk-sdk-node");
const app = express();
const port = 4001;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.get("/", (req, res) => {
  res.send({ msg: "Hello world!" });
});

app.use(ClerkExpressWithSession());

app.get("/api", (req, res) => {
  if (req.sessionClaims) {
    res.send({ instrument: "🎸" });
  } else {
    res.sendStatus(401);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
