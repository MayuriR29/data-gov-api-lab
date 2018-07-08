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
//GET by query parameters
app.get("/kindergarden/search", (req, res) => {
  let receivedLevel = req.query.levels;
  let receivedLang = req.query.second_language;
  console.log("in /kindergarden/search-->");
  // console.log("keys", res.body.keys);
  const centerDetails = kindergarden
    .filter(
      eachCenter =>
        receivedLevel ? eachCenter.levels_offered === receivedLevel : true
    )
    .filter(
      newArr =>
        receivedLang ? newArr.second_languages_offered === receivedLang : true
    );

  if (centerDetails.length > 0) {
    res.json(centerDetails);
    res.status(200).json();
  } else {
    res.status(204).json({ message: "No such data exists,try other input" });
  }
});

//GET by center_code
app.get("/kindergarden/:center_code", (req, res) => {
  const reqKinder = kindergarden.find(
    eachKinder => eachKinder.centre_code === req.params.center_code
  );
  res.json(reqKinder);
});

//post
app.post("/kindergarden", (req, res, next) => {
  if (req.body.centre_code) {
    let newKindergarden = {
      ...req.body
    };
    kindergarden = [...kindergarden, newKindergarden];
    res.status(201).json();
  }
  next();
  res.status(400).json();
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
