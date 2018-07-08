const request = require("supertest");
const app = require("./app");
let kindergarden = require("./utils/data.json");

test("test 1 /GET for kindergarden data", async () => {
  const response = await request(app).get("/kindergarden");
  expect(response.status).toEqual(200);
  expect(Array.isArray(response.body)).toEqual(true);
});

test.only("Test 2 /GET for search by query params", async () => {
  const level = "Playgroup";
  const secondLanguage = "Chinese|Malay";
  const response = await request(app).get(
    `/kindergarden/search?levels=${level}&&second_language=${secondLanguage}`
  );
  console.log('In test-->',response.body);
  // const requiredLength = kindergarden
  //   .filter(eachCenter => eachCenter.levels_offered === level)
  //   .filter(
  //     eachCenter => eachCenter.second_languages_offered === secondLanguage
  //   ).length;
  expect(response.status).toEqual(200);
  expect(response.body).toHaveProperty("levels_offered",level);
  expect(response.body).toHaveProperty("second_languages_offered",secondLanguage);
  // expect(response.body.length).toEqual(requiredLength);
});
test("Test 3 /GET for search by query params for invalid input", async () => {
  const level = "dfsdf";
  const secondLanguage = "dfsf";
  const response = await request(app).get(
    `/kindergarden/search?levels=${level}&&second_language=${secondLanguage}`
  );
  expect(response.status).toEqual(204);
  expect(response.body).toEqual({});
});

test("test 4 /POST for adding new kindergarden", async () => {
  const TESTDATA = {
    centre_code: "KG1234",
    centre_name: "PCF SPARKLETOTS PAKVIEW",
    levels_offered: "Playgroup"
  };
  const response = await request(app)
    .post("/kindergarden")
    .send(TESTDATA);
  expect(response.status).toEqual(201);
  console.log("-->", response.body);
  expect(response.body).toEqual("");
});
// test("Test /GET by query params",async ()=>{
//   const response = await request(app).get("/kindergarden/");
// })
