const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let kindergarden = require("./utils/data.json");

app.use(express.json());

app.get("/kindergarden", (req, res) => {
  res.json(kindergarden);
});
// app.get("/kindergarden/:id", () => {});
app.get("/kindergarden/search", (req, res) => {
  let receivedLevel = req.query.levels;
  let receivedLang = req.query.second_language;
  const centerDetails = kindergarden
    .filter(
      eachCenter =>
        receivedLevel ? eachCenter.levels_offered === receivedLevel : true
    )
    .filter(
      newArr =>
        receivedLang ? newArr.second_languages_offered === receivedLang : true
    );
  res.json(centerDetails);
});
//post
app.post("/kindergarden", (req, res) => {
  let newKindergarden = {
    ...res.body
  };
  kindergarden = [...kindergarden, newKindergarden];
  console.log("new", res.body);
  res.json(newKindergarden);
});
app.put("/kindergarden/:id", (req, res) => {
  const kinderUpdate = kindergarden.find(
    eachKindergarden => eachKindergarden.center
  );
});
app.use((req, res, next) => {
  if (res.status === 404) {
    res.send();
  }
  res.status(404).send("Sorry cant find");
});
// TODO: Create CRUD endpoints for your data!

module.exports = app;
