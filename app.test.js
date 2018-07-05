const request = require("supertest");
const app = require("./app");
test("test /GET for kindergarden data", async () => {
  const response = await request(app).get("/kindergarden");
  expect(response.status).toEqual(200);
  expect(Array.isArray(response.body)).toEqual(true);
});

test("test /POST for adding new kindergarden", async () => {
  const TESTDATA = {
    "centre_code": "KG1234",
    "centre_name": "PCF SPARKLETOTS PAKVIEW",
    "levels_offered": "Playgroup"
  };
  const response = await request(app)
    .post("/kindergarden")
    .send(TESTDATA);
  expect(response.status).toEqual(200);
  console.log("-->", response.body);
  expect(response.body).toMatchObject(TESTDATA);
});
