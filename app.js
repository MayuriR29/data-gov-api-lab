const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-sample.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
let kindergarden = require("./utils/data.json");

app.use(express.json());

app.get("/kindergarden", (req, res) => {
  res.json(kindergarden);
});
app.get("/kindergarden/:center_code", (req, res) => {
  const reqKinder = kindergarden.find(
    eachKinder => eachKinder.centre_code === req.params.center_code
  );
  res.json(reqKinder);
});
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
    ...req.body
  };
  kindergarden = [...kindergarden, newKindergarden];
  res.json(newKindergarden);
});
//put
app.put("/kindergarden/:center_code", (req, res) => {
  const kinderUpdate = kindergarden.find(
    eachKindergarden => eachKindergarden.centre_code === req.params.center_code
  );
  const updatedKinder = [...kinderUpdate, ...req.body];
});
//delete
app.delete("/:center_code", (req, res) => {
  kindergarden = kindergarden.filter(
    eachKindergarden => eachKindergarden.centre_code !== req.params.center_code
  );
  res.json("kindergarten deleted is deleted");
});

//middleware
app.use((req, res, next) => {
  if (res.status === 404) {
    res.send();
  }
  res.status(404).send("Sorry cant find");
});
// TODO: Create CRUD endpoints for your data!

module.exports = app;
